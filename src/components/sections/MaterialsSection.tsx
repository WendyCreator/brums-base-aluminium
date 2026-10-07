import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { aluminiumFinishes, frameQuoteOption, glassFinishes, glassQuoteOption, glassTypes, type AluminiumFinish, type GlassFinish } from '../../data/content'
import { images } from '../../data/images'
import { easeOutExpo } from '../../lib/motion'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Tab = 'frame' | 'glass'

const tabs: { id: Tab; label: string }[] = [
  { id: 'frame', label: 'Aluminium frame' },
  { id: 'glass', label: 'Glass' },
]

const defaultFrame = aluminiumFinishes.find((f) => f.id === 'pc-black') ?? aluminiumFinishes[0]
const defaultGlass = glassFinishes[0]

const glassLabel = (g: GlassFinish) => (g.type === 'Tinted' ? `${g.name} tint` : g.name)

/**
 * Interactive finish selector. Two categories — aluminium frame finishes and
 * glass finishes — both applied live to the window elevation.
 */
export function MaterialsSection() {
  const [tab, setTab] = useState<Tab>('frame')
  const [frame, setFrame] = useState<AluminiumFinish>(defaultFrame)
  const [glass, setGlass] = useState<GlassFinish>(defaultGlass)
  const uid = useId()

  // Hand the current selection to the quote form
  const quoteTo = `/contact?${new URLSearchParams({
    frame: frameQuoteOption[frame.id],
    glass: glassQuoteOption[glass.id],
    ...(frame.treatment === 'Anodized' ? { treatment: 'Anodized' } : null),
  }).toString()}#quote`

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next: Tab = tab === 'frame' ? 'glass' : 'frame'
    setTab(next)
    document.getElementById(`${uid}-tab-${next}`)?.focus()
  }

  return (
    <section data-nav-tone="light" id="finishes" className="scroll-mt-20 bg-bone-2 py-24 text-ink sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading index="04" eyebrow="Materials & finishes" lines={['Finish', 'your space.']} tone="light">
          The frame finish and the glass change how an opening reads. Choose one of each to see them applied to the window.
        </SectionHeading>

        <div className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Product visualisation */}
          <FadeIn className="lg:col-span-7" y={40}>
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#e2dfd7,#d3cfc5)] sm:aspect-[5/5]">
              <div className="absolute inset-x-0 bottom-0 h-[16%] bg-[linear-gradient(180deg,#c8c3b8,#bdb8ac)]" />
              <WindowElevation finish={frame} glass={glass} />
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/60">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${frame.id}-${glass.id}`}
                    className="block"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="block">
                      {frame.name} · {frame.type}
                    </span>
                    <span className="mt-1 block text-ink/45">Glass · {glassLabel(glass)}</span>
                  </motion.span>
                </AnimatePresence>
                <span className="hidden shrink-0 sm:block">Sliding window · Elevation</span>
              </div>
            </div>
          </FadeIn>

          {/* Controls */}
          <div className="lg:col-span-5">
            <div role="tablist" aria-label="Finish category" className="grid grid-cols-2 border-b border-ink/15">
              {tabs.map((t) => {
                const selected = tab === t.id
                return (
                  <button
                    key={t.id}
                    id={`${uid}-tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`${uid}-panel-${t.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={onTabKey}
                    className={`eyebrow relative min-h-12 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${selected ? 'text-ink' : 'text-mute hover:text-ink'}`}
                  >
                    {t.label}
                    {selected && <motion.span layoutId={`${uid}-tab-line`} className="absolute inset-x-0 -bottom-px h-0.5 bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                  </button>
                )
              })}
            </div>

            <div id={`${uid}-panel-frame`} role="tabpanel" aria-labelledby={`${uid}-tab-frame`} hidden={tab !== 'frame'} className="mt-8">
              <fieldset>
                <legend className="sr-only">Aluminium frame finish</legend>
                <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-3">
                  {aluminiumFinishes.map((f) => (
                    <Swatch key={f.id} name={`${uid}-frame`} id={f.id} checked={f.id === frame.id} onSelect={() => setFrame(f)} title={f.name} caption={f.type}>
                      <span className="absolute inset-0" style={frameSwatchStyle(f)} />
                    </Swatch>
                  ))}
                </div>
              </fieldset>
            </div>

            <div id={`${uid}-panel-glass`} role="tabpanel" aria-labelledby={`${uid}-tab-glass`} hidden={tab !== 'glass'} className="mt-8">
              <fieldset>
                <legend className="sr-only">Glass finish</legend>
                <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-3">
                  {glassFinishes.map((g) => (
                    <Swatch key={g.id} name={`${uid}-glass`} id={g.id} checked={g.id === glass.id} onSelect={() => setGlass(g)} title={g.name} caption={g.type}>
                      <span className="absolute inset-0" style={{ background: GLASS_SCENE }} />
                      <span
                        className="absolute inset-0"
                        style={{
                          background: g.overlay.background,
                          boxShadow: g.overlay.inset,
                          ...(g.overlay.blur ? { backdropFilter: `blur(${g.overlay.blur * 0.5}px)`, WebkitBackdropFilter: `blur(${g.overlay.blur * 0.5}px)` } : null),
                        }}
                      />
                    </Swatch>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8 border-t border-ink/15 pt-5">
                <p className="eyebrow text-mute">Glass types</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {glassTypes.map((t) => (
                    <li key={t} className="border border-ink/20 px-3 py-2 text-sm font-medium">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 text-[0.82rem] leading-relaxed text-ink/55">
              Available finishes may vary by project. Let us know your preferred colour and we&rsquo;ll confirm availability. Colours on screen are indicative.
            </p>
            <div className="mt-8">
              <Button to={quoteTo} variant="dark" cursor="Quote">
                Request a quote in these finishes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Swatches
   ------------------------------------------------------------------ */

/** A simple horizon scene so tints, reflections and frosting are visible on a small swatch. */
const GLASS_SCENE =
  'radial-gradient(circle at 72% 64%, #4d6043 0 17%, transparent 18%), radial-gradient(circle at 30% 68%, #6a7c57 0 13%, transparent 14%), linear-gradient(180deg, #c9d6df 0%, #e8e5db 58%, #8d9a7c 59%, #66744f 100%)'

function frameSwatchStyle(f: AluminiumFinish): CSSProperties {
  const base = `linear-gradient(160deg, ${f.frame.hi}, ${f.frame.mid} 55%, ${f.frame.lo})`
  const grain =
    f.texture === 'brushed'
      ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.13) 0 1px, transparent 1px 3px)'
      : f.texture === 'wood'
        ? 'repeating-linear-gradient(90deg, rgba(0,0,0,0.16) 0 2px, transparent 2px 7px, rgba(255,255,255,0.07) 7px 8px, transparent 8px 13px), repeating-linear-gradient(88deg, rgba(0,0,0,0.1) 0 1px, transparent 1px 11px)'
        : 'repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px)'
  return { background: `${grain}, ${base}` }
}

function Swatch({
  name,
  id,
  checked,
  onSelect,
  title,
  caption,
  children,
}: {
  name: string
  id: string
  checked: boolean
  onSelect: () => void
  title: string
  caption: string
  children: React.ReactNode
}) {
  return (
    <label className="group relative block cursor-pointer" data-cursor={checked ? undefined : 'Apply'}>
      <input type="radio" name={name} value={id} checked={checked} onChange={onSelect} className="peer sr-only" />
      <span
        className={`relative block aspect-[4/3] overflow-hidden border border-ink/10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-champagne ${
          checked ? 'ring-2 ring-ink ring-offset-4 ring-offset-bone-2' : ''
        }`}
      >
        {children}
      </span>
      <span className="mt-3 block text-[0.72rem] leading-tight font-bold uppercase tracking-[0.08em] sm:text-[0.78rem]">{title}</span>
      <span className="mt-1 block text-[0.72rem] text-ink/55">{caption}</span>
    </label>
  )
}

/* ------------------------------------------------------------------
   SVG elevation of a two-sash sliding window. The frame is a single
   even-odd path filled with an animated gradient; the view behind the
   glass is a real photo with the selected glass finish laid over it.
   ------------------------------------------------------------------ */
const W = 600
const H = 760
const F = 34 // outer frame
const M = 300 // meeting stiles centre
const S = 16 // sash profile

const framePath = [`M0 0H${W}V${H}H0Z`, `M${F} ${F}H${M - 3}V${H - F}H${F}Z`, `M${M + 3} ${F}H${W - F}V${H - F}H${M + 3}Z`].join(' ')

const sashPath = (x0: number, x1: number) => `M${x0} ${F}H${x1}V${H - F}H${x0}Z M${x0 + S} ${F + S}H${x1 - S}V${H - F - S}H${x0 + S}Z`

function WindowElevation({ finish, glass }: { finish: AluminiumFinish; glass: GlassFinish }) {
  const gid = useId().replace(/:/g, '')
  const stops = { duration: 0.8, ease: easeOutExpo }
  const grainOpacity = finish.texture === 'brushed' ? 0.14 : finish.texture === 'wood' ? 0 : 0.04

  return (
    <div className="relative w-[64%] max-w-[440px]" style={{ aspectRatio: `${W} / ${H}` }}>
      {/* View through the glass */}
      <div className="absolute overflow-hidden" style={{ inset: `${(F / H) * 100}% ${(F / W) * 100}%` }}>
        <Img image={images.terraceAlt} sizes="(min-width: 1024px) 30vw, 60vw" alt="" />
        <AnimatePresence initial={false}>
          <motion.div
            key={glass.id}
            className="absolute inset-0"
            style={{
              background: glass.overlay.background,
              boxShadow: glass.overlay.inset,
              ...(glass.overlay.blur ? { backdropFilter: `blur(${glass.overlay.blur}px)`, WebkitBackdropFilter: `blur(${glass.overlay.blur}px)` } : null),
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.28)_33%,transparent_41%,transparent_60%,rgba(255,255,255,0.12)_66%,transparent_72%)]" />
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]" role="img" aria-label={`Sliding window elevation, ${finish.name} ${finish.type} frame with ${glassLabel(glass)} glass`}>
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
            <rect width="1" height="10" fill="#fff" opacity={grainOpacity} />
          </pattern>
          <pattern id={`${gid}-wood`} width="22" height="40" patternUnits="userSpaceOnUse">
            <rect x="2" width="2" height="40" fill="#000" opacity="0.16" />
            <rect x="9" width="1" height="40" fill="#fff" opacity="0.08" />
            <rect x="14" width="3" height="40" fill="#000" opacity="0.1" />
          </pattern>
        </defs>

        <path d={framePath} fillRule="evenodd" fill={`url(#${gid}-frame)`} />
        <path d={sashPath(F, M + 10)} fillRule="evenodd" fill={`url(#${gid}-sash)`} />
        <path d={sashPath(M - 10, W - F)} fillRule="evenodd" fill={`url(#${gid}-sash)`} />
        {/* Surface grain: brushed for anodized, faint for powder-coat, streaked for wood-grain */}
        {[framePath, sashPath(F, M + 10), sashPath(M - 10, W - F)].map((d, i) => (
          <path key={i} d={d} fillRule="evenodd" fill={`url(#${gid}-${finish.texture === 'wood' ? 'wood' : 'brush'})`} />
        ))}
        <rect x={F} y={F} width={W - F * 2} height={H - F * 2} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
        <rect x="0.75" y="0.75" width={W - 1.5} height={H - 1.5} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        {/* Handles on the meeting stiles */}
        <rect x={M - 22} y={H / 2 - 60} width="6" height="120" rx="3" fill="#d9d6cf" stroke="rgba(0,0,0,0.25)" />
        <rect x={M + 16} y={H / 2 - 60} width="6" height="120" rx="3" fill="#d9d6cf" stroke="rgba(0,0,0,0.25)" />
      </svg>
    </div>
  )
}
