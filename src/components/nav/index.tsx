'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import HiddenAnimation from '@/app/helpers/HiddenAnimation';
import { usePathname } from 'next/navigation';
import DropdownProfile from './DropdownProfile';
import NavigationWorkspaces from './NavigationWorkspaces';
import { getLastWorkspaces } from '@/app/actions/workspace.action';

type UserProps = {
  user: User | null;
};

const Nav = ({ user }: UserProps) => {
  const pathname = usePathname();
  const [isValidPath, setIsValidPath] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsValidPath(!(pathname === '/' || pathname === '/auth') || pathname === '/' || pathname === '/auth');
  }, [pathname, user]);

  useEffect(() => {
    if (isValidPath && !(pathname === '/' || pathname === '/auth')) {
      const fetchWorkspaces = async () => {
        setIsLoading(true);
        const { workspaces, success } = await getLastWorkspaces({ n: 5 });
        if (success && workspaces) {
          setWorkspaces(workspaces);
        }
        setIsLoading(false);
      };
      fetchWorkspaces();
    }
  }, [pathname, isValidPath]);

  if (!isValidPath) return null;

  if (pathname === '/' || pathname === '/auth') {
    return (
      <nav className='shadow-sm p-2 flex items-center justify-between px-7'>
        <div className='flex gap-3 items-center'>
          <HiddenAnimation animate={pathname == '/'}>
            <Link href='/' className='flex flex-col items-center w-16'>
              <h3 className='font-semibold tracking-wider'>Refine</h3>
              <motion.div
                className='w-full h-[1px] bg-black'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut', bounce: 0.3 }}
              ></motion.div>
            </Link>
          </HiddenAnimation>
        </div>
        <HiddenAnimation animate={pathname == '/'}>
          <Link href={`${user ? '/home' : '/auth'}`}>
            <Button className='relative inline-flex items-center space-x-1 group'>
              <span>Get Started</span>
              <ArrowRightIcon className='transform group-hover:translate-x-1 transition-transform duration-200 ease-in-out' />
            </Button>
          </Link>
        </HiddenAnimation>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: pathname == '/home' ? 1.3 : 0, duration: 0.3 }}
      className='shadow-sm p-2 flex items-center justify-between px-7'
    >
      <div className='flex gap-3 items-center'>
        <Link href='/home'>
          <Button className='pl-0 font-medium' variant='link'>
            Home
          </Button>
        </Link>
        <NavigationWorkspaces isLoading={isLoading} workspaces={workspaces} />
      </div>
      <div className='flex items-center space-x-3'>
        <DropdownProfile name={user?.name ?? null} pictureUrl={user?.pictureUrl ?? null} />
        <Link href={'/'}>
          <Button>Upgrade</Button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Nav;
