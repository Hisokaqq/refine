import React from 'react'
import { motion } from 'framer-motion'
const HiddenAnimation = ({children, animate}:{children: React.ReactNode, animate: boolean}) => {
  if (!animate) return <>{children}</>
  return (
    <div  className="overflow-hidden">
    <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {children}
    </motion.div>
    </div>
  )
}

export default HiddenAnimation