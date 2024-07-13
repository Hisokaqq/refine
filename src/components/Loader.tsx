'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  
  return (
      <motion.div initial={{opacity: 1}} animate={{opacity: 0}} transition={{delay: 1.3}} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='flex flex-col items-center  w-24'>
        <div className="overflow-hidden  h-[2rem]">
          <motion.h3 
            className="scroll-m-20 text-2xl font-semibold tracking-wider"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Refine
          </motion.h3>
        </div>
        <motion.div
          className="w-full h-[1px] bg-black"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.3, ease: 'easeOut', bounce: 0.3 }}
        ></motion.div>
      </div>
    </motion.div>
  );
}

export default Loader;
