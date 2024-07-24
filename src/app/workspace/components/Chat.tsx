'use client';

import { useSignleWorkspaceStore } from '@/stores/useWorkspaceStore';
import React from 'react'

const Chat = () => {
  const { workspace } = useSignleWorkspaceStore();

  return (
    <div className='w-1/5 h-full shadow-md '>
        {workspace?.title}
    </div>
  )
}

export default Chat