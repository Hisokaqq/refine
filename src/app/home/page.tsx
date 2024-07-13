"use client"
import Loader from '@/components/Loader'
import React from 'react'
import { motion } from 'framer-motion'
import { WorkspaceTable } from '@/components/Workspaces'

const Home = () => {
  return (
    <div>
      <Loader />
      <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay:1.3, duration: .3}} className="px-7">
        <WorkspaceTable/>
      </motion.div>
    </div>
  )
}

export default Home