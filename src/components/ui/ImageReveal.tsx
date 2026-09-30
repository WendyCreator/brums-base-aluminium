import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { SiteImage } from '../../data/images'
import { easeInOutQuart, inView } from '../../lib/motion'
import { Img } from './Img'

type ImageRevealProps = {
  image: SiteImage
  className?: string
  sizes?: string
  /** Vertical parallax travel in % of the image height (0 disables) */
  parallax?: number
  priority?: boolean
  /** Direction the mask opens from */
  from?: 'bottom' | 'left'
}

/**
 * Image that unmasks as it enters the viewport, then drifts with a light
 * parallax while scrolling. Static when reduced motion is requested.
 */
export function ImageReveal({ image, className = '', sizes = '100vw', parallax = 8, priority, from = 'bottom' }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  const hidden = from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-ink-3 ${className}`}
      initial={reduced ? false : { clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={inView}
      transition={{ duration: 1.4, ease: easeInOutQuart }}
    >
      <motion.div
        className="absolute inset-x-0"
        style={reduced || !parallax ? { top: 0, bottom: 0 } : { y, top: `-${parallax}%`, bottom: `-${parallax}%` }}
        initial={reduced ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 1.8, ease: easeInOutQuart }}
      >
        <Img image={image} sizes={sizes} priority={priority} />
      </motion.div>
    </motion.div>
  )
}
