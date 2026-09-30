import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { testimonials } from '../../data/testimonials'
import { easeOutExpo } from '../../lib/motion'
import { Eyebrow } from '../ui/SectionHeading'

/** One large quote at a time. Hidden entirely until real testimonials exist. */
export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  if (testimonials.length === 0) return null
  const t = testimonials[index]

  return (
    <section data-nav-tone="light" className="bg-bone py-24 text-ink sm:py-32 lg:py-40" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="shell">
        <Eyebrow tone="light">Client words</Eyebrow>
        <div className="mt-10 min-h-[18rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: easeOutExpo }}>
              <blockquote className="max-w-5xl text-[clamp(1.6rem,3.6vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.025em]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-10">
                <span className="block text-sm font-bold uppercase tracking-[0.14em]">{t.name}</span>
                {t.context && <span className="eyebrow mt-2 block text-mute">{t.context}</span>}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {testimonials.length > 1 && (
          <div className="mt-12 flex items-center gap-6">
            <span className="font-mono text-xs tracking-[0.2em] text-mute">
              {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button type="button" className="eyebrow min-h-11 border border-ink/25 px-4 hover:border-ink" onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}>
              ← Prev
            </button>
            <button type="button" className="eyebrow min-h-11 border border-ink/25 px-4 hover:border-ink" onClick={() => setIndex((i) => (i + 1) % testimonials.length)}>
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
