import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOutExpo } from '../../lib/motion'

/** Route wrapper: quick opacity + slight rise, ~450ms. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return (
    <motion.main
      id="main"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } }}
      exit={{ opacity: 0, y: reduced ? 0 : -8, transition: { duration: 0.3, ease: 'easeIn' } }}
    >
      {children}
    </motion.main>
  )
}
