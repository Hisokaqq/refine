'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import DropdownProfile from './DropdownProfile';
import NavigationWorkspaces from './NavigationWorkspaces';
import { getLastWorkspaces } from '@/app/actions/workspace.action';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
const user = {
  username: "alex",
  avatar: "https://github.com/shadcn.png",
};

const NavOther = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPath, setIsValidPath] = useState(false);

  useEffect(() => {
    setIsValidPath(!(pathname === '/' || pathname === '/auth'));
  }, [pathname]);

  useEffect(() => {
    if (isValidPath) {
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

  return (
    <motion.nav initial={{opacity: 0}} animate={{opacity:1}} transition={{delay:1.3, duration: .3}} className='shadow-sm p-2 flex items-center justify-between px-7'>
      <div className='flex gap-3 items-center'>
        <Link href='/home'>
          <Button className='pl-0 font-medium' variant="link">Home</Button>
        </Link>
        <NavigationWorkspaces isLoading={isLoading} workspaces={workspaces} />
      </div>
      <div className='flex items-center space-x-3'>
        <DropdownProfile username={user.username} avatar={user.avatar} />
        <Link href={"/"}>
          <Button>Upgrade</Button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default NavOther;
