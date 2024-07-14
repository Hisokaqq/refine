'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

type Props = {
   SignInTab: React.ReactNode,
   SignUpTab: React.ReactNode 
}
const TabSwitcher = ({SignInTab, SignUpTab}: Props) => {
  return (
    <Tabs defaultValue='signIn' className='max-w-[500px]'>
        <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value="signIn">Sign in</TabsTrigger>
            <TabsTrigger value="signUp">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">{SignInTab}</TabsContent>
        <TabsContent value="signUp">{SignUpTab}</TabsContent>
    </Tabs>
  )
}

export default TabSwitcher