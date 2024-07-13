'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import DropdownProfile from './DropdownProfile';
import NavigationWorkspaces from './NavigationWorkspaces';
import { motion } from 'framer-motion';
import { getLastWorkspaces } from '@/app/actions/workspace.action';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import HiddenAnimation from '@/app/helpers/HiddenAnimation';
const user = {
  username: "alex",
  avatar: "https://github.com/shadcn.png",
};

const Nav = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const pathname = usePathname();
  const isHome = pathname === '/home';
  const isLandingORauth = pathname === '/' || pathname === '/auth';
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchWorkspaces = async () => {
      setIsLoading(true)
      const { workspaces, success } = await getLastWorkspaces({ n: 5 });
      if (success && workspaces) {
        setWorkspaces(workspaces);
      }
      setIsLoading(false)
    };
    fetchWorkspaces();
  }, [pathname]);
  
  return (
    <nav  className='shadow-sm p-2 flex items-center justify-between px-7'>
      <div className='flex gap-3 items-center'>
        {
          isLandingORauth ?
          <Link href="/" className='flex flex-col items-center w-16'>
            <HiddenAnimation>
            <h3 
              className="font-semibold tracking-wider"
            >
              Refine
            </h3>
            </HiddenAnimation>
          <motion.div
            className="w-full h-[1px] bg-black"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut', bounce: 0.3 }}
          ></motion.div>
        </Link>
        :
        <>
        <Link href='/home'>
          <Button className='pl-0 font-medium	' variant="link">Home</Button>
        </Link>
        <NavigationWorkspaces isLoading = {isLoading} workspaces={workspaces} />
        </>
        }
      </div>
      
      {
          isLandingORauth ?
          <HiddenAnimation>
            <Link href={`${user ? "/home" : "/auth"}`}>
          <Button className="relative inline-flex items-center space-x-1 group">
            <span>Get Started</span>
            <ArrowRightIcon className="transform group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
          </Button>
          </Link>
          </HiddenAnimation>
        :
        <div className='flex items-center space-x-3'>
          <DropdownProfile username={user.username} avatar={user.avatar} />
          <Link href={"/"}>
            <Button>Upgrade</Button>
          </Link>
        </div>
        }
    </nav>
  );
};

export default Nav;
