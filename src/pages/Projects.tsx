import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState } from 'react'
import { PageHero } from '../components/layout/PageHero'
import { CTASection } from '../components/sections/CTASection'
import { ProjectCard } from '../components/sections/ProjectCard'
import { RepresentativeNote } from '../components/sections/ProjectsSection'
import { images } from '../data/images'
import { projects, type ProjectCategory } from '../data/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { easeOutExpo } from '../lib/motion'

type Filter = 'All' | ProjectCategory
const filters: Filter[] = ['All', 'Residential', 'Commercial', 'Renovation']

export default function Projects() {
  useDocumentMeta({
    title: 'Projects',
    description: "Selected residential, commercial and renovation projects featuring Brum's Base aluminium windows, doors and glazing.",
    path: '/projects',
  })
  const [filter, setFilter] = useState<Filter>('All')
  const visible = projects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <>
      <PageHero eyebrow="Selected projects" lines={['What we', 'build.']} intro="Openings, facades and complete glazing packages across residential, commercial and renovation work." image={images.pavilion} />

      <section data-nav-tone="light" className="bg-bone py-16 text-ink sm:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 border-b rule-light pb-8 sm:flex-row sm:items-center sm:justify-between">
            <LayoutGroup>
              <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-1">
                {filters.map((f) => {
                  const count = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length
                  if (count === 0) return null
                  return (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={filter === f}
                      onClick={() => setFilter(f)}
                      className={`relative min-h-11 px-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] transition-colors ${filter === f ? 'text-fog' : 'text-ink/60 hover:text-ink'}`}
                    >
                      {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 36 }} />}
                      <span className="relative">
                        {f} <span className="font-mono opacity-60">{count}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
            <RepresentativeNote />
          </div>

          <motion.ul layout className="mt-12 grid gap-x-6 gap-y-16 sm:mt-16 md:grid-cols-2 lg:gap-x-10 lg:gap-y-24">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  className={i % 2 === 1 ? 'md:mt-32' : ''}
                >
                  <ProjectCard project={p} index={projects.indexOf(p)} aspect={i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[5/6]'} sizes="(min-width: 768px) 50vw, 100vw" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <CTASection />
    </>
  )
}
