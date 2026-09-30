import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { ArrowRight } from '../ui/Icons'
import { Img } from '../ui/Img'

type Props = {
  project: Project
  index: number
  className?: string
  aspect?: string
  sizes?: string
}

/** Portfolio tile. Details slide up on hover (always visible on touch). */
export function ProjectCard({ project, index, className = '', aspect = 'aspect-[4/5]', sizes = '(min-width: 1024px) 40vw, 100vw' }: Props) {
  return (
    <Link to={`/projects/${project.slug}`} className={`group block ${className}`} data-cursor="View project →">
      <div className={`relative overflow-hidden bg-ink-3 ${aspect}`}>
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
          <Img image={project.cover} sizes={sizes} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(11,11,11,0.75))] opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute top-5 left-5 rounded-full border border-white/25 bg-ink/30 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fog backdrop-blur-sm">
          {project.category}
        </span>
        <p className="absolute inset-x-5 bottom-5 max-w-sm translate-y-3 text-sm leading-relaxed text-fog/85 opacity-100 transition-all duration-700 ease-[var(--ease-out-expo)] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
          {project.summary}
        </p>
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-mute-2">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-2 text-[clamp(1.4rem,2.2vw,2.1rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">{project.title}</h3>
          <p className="eyebrow mt-3 text-mute-2">
            {project.location} · {project.category}
          </p>
        </div>
        <span className="mt-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/25 transition-colors duration-500 group-hover:border-current">
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
