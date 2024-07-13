'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import HiddenAnimation from '@/app/helpers/HiddenAnimation';
import { usePathname } from 'next/navigation';

const user = {
  username: "alex",
  avatar: "https://github.com/shadcn.png",
};

const NavLandingAuth = () => {
  const pathname = usePathname();
  const [isValidPath, setIsValidPath] = useState(false);

  useEffect(() => {
    setIsValidPath(pathname === '/' || pathname === '/auth');
  }, [pathname]);

  if (!isValidPath) return null;

  return (
    
    <nav className='shadow-sm p-2 flex items-center justify-between px-7'>
        
      <div className='flex gap-3 items-center'>
        <HiddenAnimation>
        <Link href="/" className='flex flex-col items-center w-16'>
            <h3 className="font-semibold tracking-wider">Refine</h3>
          <motion.div
            className="w-full h-[1px] bg-black"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut', bounce: 0.3 }}
          ></motion.div>
        </Link>
        </HiddenAnimation>
      </div>
        <HiddenAnimation>
        <Link href={`${user ? "/home" : "/auth"}`}>
          <Button className="relative inline-flex items-center space-x-1 group">
            <span>Get Started</span>
            <ArrowRightIcon className="transform group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
          </Button>
        </Link>
        </HiddenAnimation>
    </nav>
  );
};

export default NavLandingAuth;
