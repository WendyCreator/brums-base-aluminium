import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CTASection } from '../components/sections/CTASection'
import { RepresentativeNote } from '../components/sections/ProjectsSection'
import { ArrowRight } from '../components/ui/Icons'
import { ImageReveal } from '../components/ui/ImageReveal'
import { Img } from '../components/ui/Img'
import { FadeIn, RevealLines } from '../components/ui/Reveal'
import { getProject, projects } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { easeOutExpo } from '../lib/motion'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  useDocumentMeta({
    title: project?.title ?? 'Project not found',
    description: project?.summary,
    path: `/projects/${slug ?? ''}`,
  })

  if (!project) return <NotFound />

  const idx = projects.indexOf(project)
  const next = projects[(idx + 1) % projects.length]
  const [first, second, ...rest] = project.gallery

  return (
    <>
      {/* Hero */}
      <section ref={ref} className="grain relative flex min-h-[600px] h-[92svh] flex-col justify-end overflow-hidden bg-ink text-fog">
        <motion.div className="absolute inset-0" style={reduced ? undefined : { y }}>
          <motion.div className="absolute inset-0" initial={reduced ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: easeOutExpo }}>
            <Img image={project.cover} priority sizes="100vw" />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.5),transparent_40%,rgba(11,11,11,0.9))]" />
        <div className="shell relative pb-14 sm:pb-20">
          <FadeIn immediate delay={0.15}>
            <Link to="/projects" className="eyebrow link-line text-alu">
              ← All projects
            </Link>
          </FadeIn>
          <RevealLines as="h1" immediate delay={0.25} lines={project.title.split(' ')} className="display-xl mt-6" />
        </div>
      </section>

      {/* Facts + description */}
      <section data-nav-tone="light" className="bg-bone py-20 text-ink sm:py-28">
        <div className="shell">
          <dl className="grid grid-cols-2 border-t rule-light lg:grid-cols-4">
            {[
              ['Project', project.title],
              ['Location', project.location],
              ['Category', project.category],
              ['Scope', project.scope.join(', ')],
            ].map(([k, v], i) => (
              <FadeIn key={k} delay={i * 0.05} className="border-b rule-light py-6 pr-4">
                <dt className="eyebrow text-mute">{k}</dt>
                <dd className="mt-3 text-base font-semibold leading-snug sm:text-lg">{v}</dd>
              </FadeIn>
            ))}
          </dl>

          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
            <FadeIn className="lg:col-span-5">
              <p className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em]">{project.summary}</p>
            </FadeIn>
            <div className="space-y-5 lg:col-span-5 lg:col-start-8">
              {project.description.map((para, i) => (
                <FadeIn key={i} delay={0.08 * i} className="lede text-ink/70">
                  <p>{para}</p>
                </FadeIn>
              ))}
              <RepresentativeNote className="pt-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery: one full-bleed, one offset pair, then masonry */}
      <section data-nav-tone="light" className="bg-bone pb-24 text-ink sm:pb-32" aria-label="Project gallery">
        {first && <ImageReveal image={first} className="aspect-[4/5] sm:aspect-[21/10]" sizes="100vw" parallax={10} />}
        <div className="shell mt-6 sm:mt-10">
          {second && (
            <div className="grid gap-6 sm:grid-cols-12 sm:gap-10">
              <ImageReveal image={second} className="aspect-[4/5] sm:col-span-7" sizes="(min-width: 640px) 58vw, 100vw" />
              <FadeIn className="flex items-end sm:col-span-4 sm:col-start-9">
                <p className="eyebrow text-mute">{project.scope.join(' · ')}</p>
              </FadeIn>
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-6 columns-1 gap-6 sm:mt-10 sm:columns-2 sm:gap-10 [&>*]:mb-6 sm:[&>*]:mb-10">
              {rest.map((img, i) => (
                <ImageReveal key={img.src + i} image={img} className={`break-inside-avoid ${i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}`} sizes="(min-width: 640px) 50vw, 100vw" parallax={6} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Next project */}
      <Link to={`/projects/${next.slug}`} className="group relative block overflow-hidden bg-ink text-fog" data-cursor="Next →">
        <div className="absolute inset-0 opacity-40 transition-all duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-60">
          <Img image={next.cover} sizes="100vw" alt="" />
        </div>
        <div className="absolute inset-0 bg-ink/40" />
        <div className="shell relative flex min-h-[48vh] flex-col justify-center py-20">
          <p className="eyebrow text-alu">Next project</p>
          <p className="display-lg mt-5 flex items-center gap-6">
            {next.title}
            <ArrowRight className="hidden h-[0.6em] w-[0.6em] transition-transform duration-700 group-hover:translate-x-4 sm:block" />
          </p>
        </div>
      </Link>

      <CTASection />
    </>
  )
}
