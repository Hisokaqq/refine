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
  return (
    null
  )
}

export default Checker