import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { processSteps, type ProcessStep } from '../../data/content'
import { useDesktop } from '../../hooks/useMediaQuery'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function ProcessSection() {
  const desktop = useDesktop()
  const reduced = useReducedMotion()

  return (
    <section id="process" className="scroll-mt-0 bg-ink text-fog">
      {desktop && !reduced ? <PinnedTimeline /> : <VerticalTimeline />}
    </section>
  )
}

const Heading = () => (
  <SectionHeading index="06" eyebrow="Our process" lines={['From profile', 'to project.']}>
    Five stages, one standard. Every opening moves through the same sequence, from the free site measurement to the final fit.
  </SectionHeading>
)

/* ---------------- Desktop: pinned, scroll draws the timeline ---------------- */
function PinnedTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Reaches each step's dot (≈ i/5 across) exactly as that step activates
  const line = useTransform(scrollYProgress, [0.12, 0.9, 1], ['0%', '80%', '100%'])

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-24">
        <div className="shell">
          <Heading />
          <div className="relative mt-20 xl:mt-28">
            <div className="absolute top-[7px] right-0 left-0 h-px bg-white/12" />
            <motion.div className="absolute top-[7px] left-0 h-px bg-champagne" style={{ width: line }} />
            <ol className="relative grid grid-cols-5 gap-8">
              {processSteps.map((step, i) => (
                <PinnedStep key={step.number} step={step} index={i} progress={scrollYProgress} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

function PinnedStep({ step, index, progress }: { step: ProcessStep; index: number; progress: MotionValue<number> }) {
  // Ranges stay inside [0, 1]: framer hands scroll-linked ranges to WAAPI as
  // keyframe offsets, which reject anything outside that interval.
  const at = 0.12 + (index / (processSteps.length - 1)) * 0.78
  const opacity = useTransform(progress, [at - 0.1, at], [0.22, 1])
  const y = useTransform(progress, [at - 0.1, at], [24, 0])
  const dot = useTransform(progress, [at - 0.02, at], ['rgba(255,255,255,0.18)', '#c0602a'])

  return (
    <motion.li style={{ opacity, y }}>
      <motion.span className="block h-[15px] w-[15px] rounded-full border-4 border-ink" style={{ backgroundColor: dot }} />
      <p className="mt-10 font-mono text-sm tracking-[0.2em] text-champagne-2">{step.number}</p>
      <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.6rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">{step.title}</h3>
      <p className="mt-4 max-w-[16rem] text-[0.95rem] leading-relaxed text-alu">{step.body}</p>
    </motion.li>
  )
}

/* ---------------- Mobile / reduced motion: vertical timeline ---------------- */
function VerticalTimeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="shell py-24 sm:py-32">
      <Heading />
      <ol ref={ref} className="relative mt-16 space-y-14 pl-10 sm:mt-20 sm:pl-14">
        <span className="absolute top-2 bottom-2 left-[7px] w-px bg-white/12" aria-hidden="true" />
        <motion.span
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-champagne"
          style={{ scaleY: reduced ? 1 : scaleY }}
          aria-hidden="true"
        />
        {processSteps.map((step, i) => (
          <FadeIn as="li" key={step.number} className="relative" delay={i * 0.04}>
            <span className="absolute top-1.5 -left-10 h-[15px] w-[15px] rounded-full border-4 border-ink bg-champagne sm:-left-14" aria-hidden="true" />
            <p className="font-mono text-sm tracking-[0.2em] text-champagne-2">{step.number}</p>
            <h3 className="mt-2 text-4xl font-extrabold uppercase leading-none tracking-[-0.03em] sm:text-5xl">{step.title}</h3>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-alu">{step.body}</p>
          </FadeIn>
        ))}
      </ol>
    </div>
  )
}
