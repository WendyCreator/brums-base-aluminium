import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { easeOutExpo, inView } from '../../lib/motion'

type RevealLinesProps = {
  lines: string[]
  as?: ElementType
  className?: string
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean
  delay?: number
  stagger?: number
}

/**
 * Masked line-by-line reveal for display headings. Each line slides up from
 * behind its own clip. The full heading text stays in the DOM for screen readers.
 */
export function RevealLines({ lines, as: Tag = 'h2', className = '', immediate = false, delay = 0, stagger = 0.09 }: RevealLinesProps) {
  const reduced = useReducedMotion()
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: inView }

  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      <motion.span aria-hidden="true" initial={reduced ? false : 'hidden'} {...trigger} className="block">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
            <motion.span
              className="block will-change-transform"
              variants={{
                hidden: { y: '105%' },
                show: { y: '0%', transition: { duration: 1.05, ease: easeOutExpo, delay: delay + i * stagger } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'p' | 'li' | 'span'
  immediate?: boolean
}

/** Simple fade + rise, used for supporting copy and UI. */
export function FadeIn({ children, className = '', delay = 0, y = 24, as = 'div', immediate = false }: FadeInProps) {
  const reduced = useReducedMotion()
  const M = motion[as]
  const trigger = immediate ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: inView }
  return (
    <M
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </M>
  )
}
