import type { Transition, Variants } from 'framer-motion'

/** Shared easing — a long, soft deceleration that reads as "precise". */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const

export const revealTransition: Transition = { duration: 1.1, ease: easeOutExpo }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Viewport config used by whileInView reveals */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
