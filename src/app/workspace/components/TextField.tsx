'use client';

import { useSignleWorkspaceStore } from '@/stores/useWorkspaceStore';
import React from 'react'

const TextField = () => {
  const {selectedTab} = useSignleWorkspaceStore();
  if(selectedTab === null) return null;
  return (
    <div>{selectedTab.content + selectedTab.id}</div>
  )
}

export default TextField