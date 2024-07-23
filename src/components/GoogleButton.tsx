import React from 'react'
import { Button } from './ui/button'
import { getGoogleOauthConsentUrl } from '@/app/auth/auth.action'
import { useToast } from './ui/use-toast';

type GoogleButtonProps = {
    content: string,
    isLoading: boolean
}

const GoogleButton = ({content, isLoading}: GoogleButtonProps) => {
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
    <Button disabled={isLoading} onClick={onClick} className='w-full mt-2' variant="outline">{content}</Button>
  )
}

export default GoogleButton