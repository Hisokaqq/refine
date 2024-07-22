import React from 'react'
import { Button } from './ui/button'
import { getGoogleOauthConsentUrl } from '@/app/auth/auth.action'
import { useToast } from './ui/use-toast';

const GoogleButton = ({isLoading}: {isLoading: boolean}) => {
    const { toast } = useToast();
    const onClick = async () => {
        const res = await getGoogleOauthConsentUrl()
        if(res && res.url){
            window.location.href= res.url
        }
        else{
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred",
              });
        }

    }
  return (
    <Button disabled={isLoading} onClick={onClick} className='w-full mt-2' variant="outline">Sign in with Google</Button>
  )
}

export default GoogleButton