import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import type { SiteImage } from '../../data/images'
import { easeOutExpo } from '../../lib/motion'
import { Img } from '../ui/Img'
import { FadeIn, RevealLines } from '../ui/Reveal'

type Props = {
  eyebrow: string
  lines: string[]
  intro?: ReactNode
  image?: SiteImage
  children?: ReactNode
}

/** Inner-page header: full-bleed photo (optional) with a large masked title. */
export function PageHero({ eyebrow, lines, intro, image, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} className={`grain relative flex flex-col justify-end overflow-hidden bg-ink text-fog ${image ? 'min-h-[82svh] pt-32' : 'pt-40 sm:pt-48'}`}>
      {image && (
        <>
          <motion.div className="absolute inset-0" style={reduced ? undefined : { y }}>
            <motion.div className="absolute inset-0" initial={reduced ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: easeOutExpo }}>
              <Img image={image} priority sizes="100vw" />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.55),rgba(11,11,11,0.2)_40%,rgba(11,11,11,0.9))]" />
        </>
      )}
      <div className="shell relative pb-14 sm:pb-20">
        <FadeIn immediate delay={0.15} y={12}>
          <p className="eyebrow flex items-center gap-3 text-alu">
            <span className="h-px w-8 bg-champagne" aria-hidden="true" />
            {eyebrow}
          </p>
        </FadeIn>
        <RevealLines as="h1" immediate delay={0.25} lines={lines} className="display-lg mt-6 max-w-[16ch]" />
        {intro && (
          <FadeIn immediate delay={0.7} className="lede mt-8 max-w-xl text-fog/75">
            {intro}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  )
}
