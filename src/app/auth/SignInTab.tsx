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
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import GoogleButton from '@/components/GoogleButton'

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
})

const SignInTab = () => {
    const { toast } = useToast();
    const router = useRouter()
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
      const { success, error } = await SignIn(data)
      if (success){
        toast({
          title: "Success",
          description: "You have successfully signed ip"
        })
        router.push('/home')
      }else if (error){
        toast({
          variant: "destructive",
          title: "Error",
          description: error.toString(),
        });
      }
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
            <Button disabled={isLoading} className='w-full' type="submit">Sign in</Button>
            
      </form>
    </Form>
    <GoogleButton isLoading={isLoading} />
    </CardContent>
  </Card>
  )
}

export default SignInTab