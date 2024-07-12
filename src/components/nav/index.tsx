'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import DropdownProfile from './DropdownProfile';
import NavigationWorkspaces from './NavigationWorkspaces';
import { motion } from 'framer-motion';
import { getLastWorkspaces } from '@/app/actions/workspace.action';

const user = {
  username: "alex",
  avatar: "https://github.com/shadcn.png",
};

const Nav = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const { workspaces, success } = await getLastWorkspaces({ n: 5 });

      if (success && workspaces) {
        setWorkspaces(workspaces);
      }
    };
    fetchWorkspaces();
  }, []);

  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.3 }} className='shadow-sm p-2 flex items-center justify-between px-3'>
      <div className='flex gap-3 items-center'>
        <Button variant="link">Home</Button>
        <NavigationWorkspaces workspaces={workspaces} />
      </div>
      <div className='flex items-center space-x-3'>
        <DropdownProfile username={user.username} avatar={user.avatar} />
        <Button>Upgrade</Button>
      </div>
    </motion.nav>
  );
};

export default Nav;
