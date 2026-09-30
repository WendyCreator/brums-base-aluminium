import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Solution } from '../../data/solutions'
import { easeOutExpo, inView } from '../../lib/motion'
import { ArrowUpRight } from '../ui/Icons'
import { Img } from '../ui/Img'

type Props = {
  solution: Solution
  className?: string
  /** Aspect classes for the image */
  aspect?: string
  sizes?: string
  delay?: number
}

/** Editorial solution tile: large image, persistent number, title that lifts on hover. */
export function SolutionCard({ solution, className = '', aspect = 'aspect-[4/5]', sizes = '(min-width: 1024px) 45vw, 100vw', delay = 0 }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 1, ease: easeOutExpo, delay }}
    >
      <Link to={`/solutions#${solution.id}`} className="group relative block overflow-hidden bg-ink-3" data-cursor="Explore">
        <div className={`relative ${aspect}`}>
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
            <Img image={solution.image} sizes={sizes} />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.35)_0%,transparent_30%,transparent_45%,rgba(11,11,11,0.85)_100%)] transition-opacity duration-700 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />

          <span className="absolute top-5 left-5 font-mono text-xs tracking-[0.2em] text-fog/90 sm:top-6 sm:left-6">{solution.number}</span>
          <span className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-fog transition-all duration-500 group-hover:border-fog group-hover:bg-fog group-hover:text-ink sm:top-5 sm:right-5">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>

          <div className="absolute inset-x-5 bottom-5 text-fog transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 sm:inset-x-6 sm:bottom-6">
            <h3 className="text-[clamp(1.5rem,2.4vw,2.35rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">{solution.title}</h3>
            <p className="mt-3 max-w-xs text-sm text-fog/75">{solution.short}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
