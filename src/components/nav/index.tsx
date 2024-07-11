'use client';

import React from 'react';
import { Button } from '../ui/button';
import DropdownProfile from './DropdownProfile';
import NavigationWorkspaces from './NavigationWorkspaces';
import { motion } from 'framer-motion';

const workspaces = [
  { id: "1", title: 'Project 1', dateOfChange: new Date() },
  { id: "2", title: 'Project 2', dateOfChange: new Date() },
];

const user = {
  username: "alex",
  avatar: "https://github.com/shadcn.png",
}

const Nav = () => {

  if (user == null) return null;
  return (
    <motion.nav initial={{opacity: 0}} animate={{opacity:1}} transition={{delay:1.3, duration: 1}} className=' shadow-sm p-2 flex items-center justify-between px-3'>
      <div className='flex gap-3 items-center'>
        <Button variant="link">Home</Button>
        <NavigationWorkspaces workspaces={workspaces} />
      </div>
      <div className='flex items-center space-x-3'>
            <DropdownProfile username = {user.username} avatar={user.avatar}/>
            <Button>Upgrade</Button>
      </div>
    </motion.nav>
  );
}



export default Nav;
