'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { SignIn } from './auth.action'

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
})

const SignInTab = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        setIsLoading(true)
        await SignIn(data)
        setIsLoading(false)
    }
  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Welcome back!</CardTitle>
      <CardDescription>Sign in into your account</CardDescription>
    </CardHeader>
    <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder='Type in your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type='password' placeholder='Type in your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 pt-3 ">
            <Button disabled={isLoading} className='w-full' type="submit">Sign in</Button>
            <Button disabled={isLoading} className='w-full' variant="outline">Sign in with Google</Button>
        </div>
      </form>
    </Form>
    </CardContent>
  </Card>
  )
}

export default SignInTab