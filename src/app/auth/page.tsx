import TabSwitcher from '@/components/TabSwitcher'
import React from 'react'
import SignInTab from './SignInTab'
import SignUpTab from './SignUpTab'
import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'

const Auth = async () => {
  const user = await getUser()
  if (user){
    redirect('/home')
  }
  
  return (
    <div className=' h-[calc(100vh-3rem)] w-full overflow-hidden relative'>
      <div className='max-w-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
       <TabSwitcher SignInTab={<SignInTab/>} SignUpTab={<SignUpTab/>} />
      </div>
    </div>
  )
}

export default Auth
