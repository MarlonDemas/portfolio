import type { PropsWithChildren } from 'react'
import { motion } from 'motion/react'
import { motionTokens } from '../data/motion'

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
}: PropsWithChildren<{
  className?: string
  delay?: number
  y?: number
}>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{
        duration: motionTokens.durations.reveal,
        ease: motionTokens.easing.out,
        delay,
      }}
      viewport={motionTokens.viewport}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}
