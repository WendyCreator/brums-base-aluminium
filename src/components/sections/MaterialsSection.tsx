import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { finishes, type Finish } from '../../data/content'
import { images } from '../../data/images'
import { easeOutExpo } from '../../lib/motion'
import { Img } from '../ui/Img'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Interactive finish selector: choosing a swatch re-finishes the window elevation. */
export function MaterialsSection() {
  const [active, setActive] = useState<Finish>(finishes[0])
  const name = useId()

  return (
    <section data-nav-tone="light" id="finishes" className="bg-bone-2 py-24 text-ink sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading index="07" eyebrow="Materials & finishes" lines={['Finish', 'your space.']} tone="light">
          The frame finish changes how an opening reads — graphic and bold, or quiet and light. Select a finish to see it applied.
        </SectionHeading>

        <div className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Product visualisation */}
          <FadeIn className="lg:col-span-7" y={40}>
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#e2dfd7,#d3cfc5)] sm:aspect-[5/5]">
              <div className="absolute inset-x-0 bottom-0 h-[16%] bg-[linear-gradient(180deg,#c8c3b8,#bdb8ac)]" />
              <WindowElevation finish={active} />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink/60">
                <AnimatePresence mode="wait">
                  <motion.span key={active.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
                    {active.name}
                  </motion.span>
                </AnimatePresence>
                <span>Sliding window · Elevation</span>
              </div>
            </div>
          </FadeIn>

          {/* Swatches */}
          <fieldset className="lg:col-span-5">
            <legend className="eyebrow text-mute">Select a finish</legend>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {finishes.map((f) => {
                const checked = f.id === active.id
                return (
                  <label key={f.id} className="group relative block cursor-pointer" data-cursor={checked ? undefined : 'Apply'}>
                    <input type="radio" name={name} value={f.id} checked={checked} onChange={() => setActive(f)} className="peer sr-only" />
                    <span
                      className={`relative block aspect-[4/3] overflow-hidden transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-champagne ${
                        checked ? 'ring-2 ring-ink ring-offset-4 ring-offset-bone-2' : ''
                      }`}
                      style={{ background: `repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 3px), linear-gradient(160deg, ${f.frame.hi}, ${f.frame.mid} 55%, ${f.frame.lo})` }}
                    >
                      <span className={`absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] ${f.onSwatch === 'light' ? 'text-white/70' : 'text-ink/60'}`}>
                        {checked ? 'Selected' : ''}
                      </span>
                    </span>
                    <span className="mt-3 block text-sm font-bold uppercase tracking-[0.08em]">{f.name}</span>
                    <span className="mt-1 block text-[0.82rem] text-ink/55">{f.note}</span>
                  </label>
                )
              })}
            </div>
            <p className="mt-8 text-[0.82rem] leading-relaxed text-ink/55">
              Colours on screen are indicative. Finish availability is confirmed per project, and custom colours can be discussed on request.
            </p>
          </fieldset>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   SVG elevation of a two-sash sliding window. The frame is a single
   even-odd path filled with an animated brushed-metal gradient; the
   view behind the glass is a real photo.
   ------------------------------------------------------------------ */
const W = 600
const H = 760
const F = 34 // outer frame
const M = 300 // meeting stiles centre
const S = 16 // sash profile

const framePath = [
  `M0 0H${W}V${H}H0Z`,
  `M${F} ${F}H${M - 3}V${H - F}H${F}Z`,
  `M${M + 3} ${F}H${W - F}V${H - F}H${M + 3}Z`,
].join(' ')

const sashPath = (x0: number, x1: number) =>
  `M${x0} ${F}H${x1}V${H - F}H${x0}Z M${x0 + S} ${F + S}H${x1 - S}V${H - F - S}H${x0 + S}Z`

function WindowElevation({ finish }: { finish: Finish }) {
  const gid = useId().replace(/:/g, '')
  const stops = { duration: 0.8, ease: easeOutExpo }

  return (
    <div className="relative w-[64%] max-w-[440px]" style={{ aspectRatio: `${W} / ${H}` }}>
      {/* View through the glass */}
      <div className="absolute overflow-hidden" style={{ inset: `${(F / H) * 100}% ${(F / W) * 100}%` }}>
        <Img image={images.terraceAlt} sizes="(min-width: 1024px) 30vw, 60vw" alt="" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.28)_33%,transparent_41%,transparent_60%,rgba(255,255,255,0.12)_66%,transparent_72%)]" />
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]" role="img" aria-label={`Sliding window elevation in ${finish.name}`}>
        <defs>
          <linearGradient id={`${gid}-frame`} x1="0" y1="0" x2="1" y2="1">
            <motion.stop offset="0%" animate={{ stopColor: finish.frame.hi }} transition={stops} />
            <motion.stop offset="55%" animate={{ stopColor: finish.frame.mid }} transition={stops} />
            <motion.stop offset="100%" animate={{ stopColor: finish.frame.lo }} transition={stops} />
          </linearGradient>
          <linearGradient id={`${gid}-sash`} x1="1" y1="0" x2="0" y2="1">
            <motion.stop offset="0%" animate={{ stopColor: finish.frame.hi }} transition={stops} />
            <motion.stop offset="100%" animate={{ stopColor: finish.frame.lo }} transition={stops} />
          </linearGradient>
          <pattern id={`${gid}-brush`} width="3" height="10" patternUnits="userSpaceOnUse">
            <rect width="1" height="10" fill="#fff" opacity="0.09" />
          </pattern>
        </defs>

        <path d={framePath} fillRule="evenodd" fill={`url(#${gid}-frame)`} />
        <path d={sashPath(F, M + 10)} fillRule="evenodd" fill={`url(#${gid}-sash)`} />
        <path d={sashPath(M - 10, W - F)} fillRule="evenodd" fill={`url(#${gid}-sash)`} />
        {/* Brushed grain + edge highlights */}
        <path d={framePath} fillRule="evenodd" fill={`url(#${gid}-brush)`} />
        <path d={sashPath(F, M + 10)} fillRule="evenodd" fill={`url(#${gid}-brush)`} />
        <path d={sashPath(M - 10, W - F)} fillRule="evenodd" fill={`url(#${gid}-brush)`} />
        <rect x={F} y={F} width={W - F * 2} height={H - F * 2} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
        <rect x="0.75" y="0.75" width={W - 1.5} height={H - 1.5} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        {/* Handles on the meeting stiles */}
        <rect x={M - 22} y={H / 2 - 60} width="6" height="120" rx="3" fill="#d9d6cf" stroke="rgba(0,0,0,0.25)" />
        <rect x={M + 16} y={H / 2 - 60} width="6" height="120" rx="3" fill="#d9d6cf" stroke="rgba(0,0,0,0.25)" />
      </svg>
    </div>
  )
}
