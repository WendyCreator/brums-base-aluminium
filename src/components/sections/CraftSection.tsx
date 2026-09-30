import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { images, type SiteImage } from '../../data/images'
import { useDesktop } from '../../hooks/useMediaQuery'
import { easeInOutQuart } from '../../lib/motion'
import { Img } from '../ui/Img'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TechnicalDrawing, type DrawingKind } from '../ui/TechnicalDrawing'

type Stage = { title: string; body: string; visual: { drawing: DrawingKind } | { image: SiteImage } }

const stages: Stage[] = [
  { title: 'Aluminium profiles', body: 'Profiles and accessories are selected for their part in the complete system, from frame to closure.', visual: { drawing: 'profile' } },
  { title: 'Cutting', body: 'Lengths are cut to the measured opening, with clean mitres where frames meet.', visual: { drawing: 'mitre' } },
  { title: 'Fabrication', body: 'Frames are prepared for hardware, drainage and fixings before anything is assembled.', visual: { image: images.fabrication } },
  { title: 'Assembly', body: 'Corners are joined and squared so the frame holds its shape for years of use.', visual: { drawing: 'corner' } },
  { title: 'Glazing', body: 'Glass is set and sealed into the frame, with the finish protected throughout.', visual: { image: images.glass } },
  { title: 'Installation', body: 'Frames are fixed, levelled and adjusted on site until every panel moves correctly.', visual: { image: images.sliding } },
  { title: 'Finished architecture', body: 'A clean result and a responsible handover: openings that belong to the building.', visual: { image: images.whiteHouse } },
]

function StageVisual({ stage }: { stage: Stage }) {
  return 'drawing' in stage.visual ? <TechnicalDrawing kind={stage.visual.drawing} /> : <Img image={stage.visual.image} sizes="(min-width: 1024px) 50vw, 100vw" />
}

/** Fabrication story. Desktop: sticky visual that changes with the scrolled step. */
export function CraftSection() {
  const desktop = useDesktop()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  return (
    <section id="craft" className="bg-ink py-24 text-fog sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading index="08" eyebrow="Craftsmanship" lines={['Built with', 'purpose.']}>
          The quality of an opening begins before installation — in how each profile is chosen, cut, prepared and assembled.
        </SectionHeading>

        {desktop ? (
          <div className="mt-24 grid grid-cols-12 gap-12">
            <div className="col-span-6">
              <div className="sticky top-[12vh] aspect-[4/5] max-h-[76vh] w-full overflow-hidden bg-ink-3">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={reduced ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
                    animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ opacity: 0.999 }}
                    transition={{ duration: 0.9, ease: easeInOutQuart }}
                  >
                    <StageVisual stage={stages[active]} />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-5 right-5 font-mono text-xs tracking-[0.2em] text-fog/80">
                  {String(active + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
                </div>
              </div>
            </div>
            <ol className="col-span-5 col-start-8">
              {stages.map((s, i) => (
                <motion.li
                  key={s.title}
                  className="flex min-h-[62vh] flex-col justify-center border-t rule-dark first:border-t-0"
                  onViewportEnter={() => setActive(i)}
                  viewport={{ margin: '-45% 0px -45% 0px' }}
                  animate={{ opacity: active === i ? 1 : 0.28 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-mono text-sm tracking-[0.2em] text-champagne-2">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-4 text-[clamp(2rem,3.4vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-5 max-w-sm text-lg leading-relaxed text-alu">{s.body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        ) : (
          <ol className="mt-16 space-y-16">
            {stages.map((s, i) => (
              <FadeIn as="li" key={s.title}>
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                  <StageVisual stage={s} />
                </div>
                <p className="mt-6 font-mono text-sm tracking-[0.2em] text-champagne-2">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-3xl font-extrabold uppercase leading-none tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-alu">{s.body}</p>
              </FadeIn>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
