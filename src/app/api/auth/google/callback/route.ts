import { googleOauthClient } from "@/lib/googleOauth";
import { lucia } from "@/lib/lucia";
import prisma from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

//http://localhost:3000/api/auth/google/callback
export async function GET(req: NextRequest) {
    const url = req.nextUrl;
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if(!code || !state){
        console.error("Invalid code or state")
        return new Response("An error occurred", {status: 400})
    }

    const codeVerifier = cookies().get("codeVerifier")?.value
    const savedState = cookies().get("state")?.value

    if (!codeVerifier || !savedState){
        console.error("Invalid code verifier or state")
        return new Response("An error occurred", {status: 400})
    }
    if (state !== savedState){
        console.error("Invalid state")
        return new Response("An error occurred", {status: 400})
    }

    const {accessToken} = await googleOauthClient.validateAuthorizationCode(code, codeVerifier)
    const googleResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", 
        {headers:{
            Authorization: `Bearer ${accessToken}`
        }}
    )
    const googleData = (await googleResponse.json()) as {
        id: string,
        email: string,
        name: string
        picture: string
     }
    let userId: string = ""

    const existingUser = await prisma.user.findUnique({
        where: {
            email: googleData.email
        }
    })
    if (existingUser){
        userId = existingUser.id
    }else{
        const newUser = await prisma.user.create({
            data: {
                email: googleData.email,
                name: googleData.name,
                pictureUrl: googleData.picture
            }
        })
        userId = newUser.id
    }

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return redirect("/home")
}
  