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
import { SignUp } from './auth.action'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import GoogleButton from '@/components/GoogleButton'

export const SignUpSchema = z.object({
  name: z.string().min(5, {message: 'name must be at least 5 characters long'}),
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {message: 'Passwords do not match', path: ['confirmPassword']})

const SignUpTab = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const { toast } = useToast();
    const router = useRouter()
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    

    const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
        setIsLoading(true)
        const { success, error } = await SignUp(data)
        if (success){
          toast({
            title: "Success",
            description: "You have successfully signed up"
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
      <CardTitle>Oh, are you new here?</CardTitle>
      <CardDescription>Create your brand new account</CardDescription>
    </CardHeader>
    <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder='Type in your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type='password' placeholder='Re-type your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button disabled={isLoading} className='w-full' type="submit">Sign up</Button>
      </form>
    </Form>
    <GoogleButton content='Sign up with Google' isLoading={isLoading} />
    </CardContent>
  </Card>
  )
}

export default SignUpTab