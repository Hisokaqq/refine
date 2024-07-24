'use client';
import { useSignleWorkspaceStore } from '@/stores/useWorkspaceStore';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarLoader } from 'react-spinners';
type ContainerProps = {
  children: React.ReactNode;
  id: string;
};

const Container = ({ children, id }: ContainerProps) => {
  const { fetchSingleWorkspace, error, isLoading } = useSignleWorkspaceStore();

  useEffect(() => {
    fetchSingleWorkspace(id);
  }, [fetchSingleWorkspace, id]);

  if(error){
    return(
      <div className="absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[50%]">
        Error: {error}
      </div>)
  }

  if(isLoading){
    return(
      <div className="absolute right-1/2 top-1/2 translate-x-[50%] translate-y-[50%]">
        <BarLoader />
      </div>)
  }
   
  return  <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration: .4}}>
            {children}
        </motion.div>;
};

export default Container;
