"use server"
import {z} from 'zod'
import { SignInSchema } from './SignInTab'
import { SignUpSchema } from './SignUpTab'
import prisma from '@/utils/prisma'
import { Argon2id } from "oslo/password"
import { lucia } from '@/lib/lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { generateCodeVerifier, generateState } from 'arctic'
import { googleOauthClient } from '@/lib/googleOauth'
export const SignIn = async (data: z.infer<typeof SignInSchema>) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (!user || !user.hashedPassword){
            return { error: "Invalid email or password", success: false}
        }

        const passwordMatch = await new Argon2id().verify(user.hashedPassword, data.password)
        if (!passwordMatch){
            return { error: "Invalid email or password", success: false}
        }
        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        return {success: true}
        
    }catch(err){
        return { error: "Something went wrong", success: false}
    }
}

export const SignUp = async (data: z.infer<typeof SignUpSchema>) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        }) 
        if (existingUser) {
            return {"error": "User with given email already exists", "success": false}
        }

        const hashedPassword = await new Argon2id().hash(data.password)
        const user = await prisma.user.create({
            data:{
                name: data.name,
                email: data.email.toLocaleLowerCase(),
                hashedPassword
            }
        })
        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        return {success: true}

    }catch(err){
        return { error: "Something went wrong", success: false}
    }
}

export const SignOut = async () => {
    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect('/auth')
}

export const getGoogleOauthConsentUrl = async () => {
    try{
        const state = generateState()
        const codeVerifier = generateCodeVerifier()
        
        cookies().set('codeVerifier', codeVerifier, { secure: process.env.NODE_ENV === "production"})
        cookies().set('state', state, { secure: process.env.NODE_ENV === "production"})
        const authUrl = await googleOauthClient.createAuthorizationURL(state, codeVerifier, {
            scopes: ['email', 'profile']
        })
        return { success: true, url: authUrl.toString()}
    }catch(err){
        return { error: "Something went wrong", success: false}
    }
}