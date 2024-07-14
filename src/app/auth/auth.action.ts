"use server"
import {z} from 'zod'
import { SignInSchema } from './SignInTab'
import { SignUpSchema } from './SignUpTab'

export const SignIn = async (data: z.infer<typeof SignInSchema>) => {
    console.log(data)
}

export const SignUp = async (data: z.infer<typeof SignUpSchema>) => {
    console.log(data)
}