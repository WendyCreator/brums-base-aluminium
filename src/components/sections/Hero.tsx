import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { company } from '../../data/company'
import { heroVideo, images } from '../../data/images'
import { easeOutExpo } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { ArrowDown } from '../ui/Icons'
import { FadeIn, RevealLines } from '../ui/Reveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-fog">
      {/* Background: video on capable devices, real photo fallback */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: imageY }}>
        {reduced ? (
          <Img image={images.realHero} priority sizes="100vw" />
        ) : (
          <>
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            {/* Fallback poster shown while video loads */}
            <Img image={images.realHero} priority sizes="100vw" className="absolute inset-0 -z-10" />
          </>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.45)_0%,rgba(11,11,11,0.1)_35%,rgba(11,11,11,0.3)_62%,rgba(11,11,11,0.88)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,11,0.55),transparent_60%)]" />

      <motion.div className="shell relative flex flex-1 flex-col justify-end pt-32 pb-28 sm:pb-32" style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}>
        <FadeIn immediate delay={0.3} y={16}>
          <p className="eyebrow flex items-center gap-3 text-fog/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.6)]">
            <span className="h-px w-8 bg-champagne" aria-hidden="true" />
            Aluminium &amp; Architectural Solutions
          </p>
        </FadeIn>

        <RevealLines
          as="h1"
          immediate
          delay={0.45}
          stagger={0.11}
          lines={['Precision', 'in every', 'frame.']}
          className="display-xl mt-6 max-w-[12ch]"
        />

        <div className="mt-8 flex flex-col gap-8 lg:mt-10 xl:flex-row xl:items-end xl:justify-between">
          <FadeIn immediate delay={1.05} className="lede max-w-md text-fog/80">
            <p>Premium aluminium windows, doors and architectural solutions designed for modern spaces.</p>
          </FadeIn>
          <FadeIn immediate delay={1.25} className="flex flex-col gap-3 sm:flex-row">
            <Button to="/solutions" variant="light" magnetic>
              Explore our solutions
            </Button>
            <Button to="/contact#quote" variant="outline-light" arrow={false}>
              Request a quote
            </Button>
          </FadeIn>
        </div>
      </motion.div>

      {/* Bottom metadata bar */}
      <div className="shell absolute inset-x-0 bottom-0 left-1/2 -translate-x-1/2">
        <motion.div
          className="flex items-center justify-between border-t border-white/15 py-5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-alu"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span>
            {company.city}, {company.country}
          </span>
          <a href="#sliding-experience" className="flex items-center gap-3 hover:text-fog">
            <span className="hidden sm:inline">Scroll to explore</span>
            <span className="relative flex h-8 w-5 justify-center overflow-hidden rounded-full border border-white/30">
              <motion.span
                className="absolute top-1.5"
                animate={reduced ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-3 w-3" />
              </motion.span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
