import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { hasRepresentativeProjects, projects } from '../../data/projects'
import { useDesktop } from '../../hooks/useMediaQuery'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'

export function RepresentativeNote({ className = '' }: { className?: string }) {
  if (!hasRepresentativeProjects) return null
  return <p className={`font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute-2 ${className}`}>Imagery shown is representative · Project photography to follow</p>
}

/**
 * Desktop: vertical scroll drives a horizontal track of projects (sticky).
 * Mobile / reduced motion: a simple stacked list.
 */
export function ProjectsSection() {
  const desktop = useDesktop()
  const reduced = useReducedMotion()
  const horizontal = desktop && !reduced

  return (
    <section data-nav-tone="light" id="projects" className="scroll-mt-20 bg-bone text-ink">
      <div className="shell pt-24 sm:pt-32 lg:pt-40">
        <SectionHeading index="05" eyebrow="Selected projects" lines={['A look at', 'what we build.']} tone="light">
          Residential, commercial and renovation work — from single openings to complete facades.
        </SectionHeading>
      </div>

      {horizontal ? <HorizontalTrack /> : <StackedList />}

      <div className="shell flex flex-col items-start justify-between gap-6 pb-24 sm:flex-row sm:items-center sm:pb-32 lg:pb-40">
        <RepresentativeNote />
        <Button to="/projects" variant="outline-dark">
          All projects
        </Button>
      </div>
    </section>
  )
}

function StackedList() {
  return (
    <div className="shell mt-14 grid gap-14 pb-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16">
      {projects.map((p, i) => (
        <FadeIn key={p.slug} delay={(i % 2) * 0.08}>
          <ProjectCard project={p} index={i} aspect={i % 3 === 0 ? 'aspect-[4/5] sm:aspect-[4/5]' : 'aspect-[4/5]'} sizes="(min-width: 640px) 50vw, 100vw" />
        </FadeIn>
      ))}
    </div>
  )
}

function HorizontalTrack() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} className="flex w-max items-end gap-8 pr-[8vw] pl-[max(48px,calc((100vw-1400px)/2+48px))]" style={{ x }}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              className={i % 2 === 0 ? 'w-[min(38vw,calc(60vh*0.8))]' : 'w-[min(30vw,calc(48vh*0.75))] self-start'}
              aspect={i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}
              sizes="40vw"
            />
          ))}
        </motion.div>
        <div className="shell mt-10">
          <div className="h-px w-full bg-ink/10">
            <motion.div className="h-px bg-ink" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </div>
  )
}
