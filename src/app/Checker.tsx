"use client";
import { redirect, usePathname } from 'next/navigation';

type UserProps = {
    user: User | null;
  };
const Checker = ({user}: UserProps) => {
    const pathname = usePathname();
    if (user === null && !(pathname === '/' || pathname === '/auth')) {
        redirect('/auth')
    }
    if(user && (pathname === "/auth")){
      redirect('/home')
    }
  return (
    null
  )
}

export default Checker