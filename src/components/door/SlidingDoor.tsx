import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import type { SiteImage } from '../../data/images'
import { Img } from '../ui/Img'

/* ------------------------------------------------------------------
   Geometry. Three telescopic panels on three tracks, stacking right.
   Panel width is a third of the opening plus a small overlap so the
   meeting stiles interlock when closed.
   ------------------------------------------------------------------ */
const PANEL_W = 34.4 // % of opening
const PANEL_LEFT = [0, 32.8, 65.6] // closed positions, % of opening
const OPEN_LEFT = 65.6 // every sliding panel ends stacked over the fixed one
/** translateX in % of the panel's own width, per unit of progress */
const TRAVEL = PANEL_LEFT.map((l) => ((OPEN_LEFT - l) / PANEL_W) * 100)
/** Fraction of opening width the front panel travels — used for drag mapping */
const FRONT_TRAVEL = (OPEN_LEFT - PANEL_LEFT[0]) / 100

type FrameFinish = { hi: string; mid: string; lo: string }
const MATTE_BLACK: FrameFinish = { hi: '#3b3b3b', mid: '#1e1e1e', lo: '#0e0e0e' }

type SlidingDoorProps = {
  view: SiteImage
  finish?: FrameFinish
  className?: string
  /** Aspect ratio classes for the stage */
  aspect?: string
  label?: string
}

export function SlidingDoor({
  view,
  finish = MATTE_BLACK,
  className = '',
  aspect = 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/9]',
  label = 'Aluminium sliding door',
}: SlidingDoorProps) {
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const openingRef = useRef<HTMLDivElement>(null)

  /** Where the user wants the door; the spring chases it for inertia. */
  const target = useMotionValue(0)
  const progress = useSpring(target, reduced ? { stiffness: 900, damping: 90 } : { stiffness: 110, damping: 22, mass: 0.9 })

  const [percent, setPercent] = useState(0)
  const [touched, setTouched] = useState(false)
  useMotionValueEvent(target, 'change', (v) => setPercent(Math.round(v * 100)))

  /* ---- Visual bindings ------------------------------------------------ */
  const xFront = useTransform(progress, (p) => `${p * TRAVEL[0]}%`)
  const xMiddle = useTransform(progress, (p) => `${p * TRAVEL[1]}%`)
  const viewScale = useTransform(progress, [0, 1], [1.1, 1.0])
  const viewBrightness = useTransform(progress, [0, 1], [0.62, 1.04])
  const viewSaturate = useTransform(progress, [0, 1], [0.75, 1.05])
  const viewFilter = useMotionTemplate`brightness(${viewBrightness}) saturate(${viewSaturate})`
  const spill = useTransform(progress, [0, 1], [0.12, 0.95])
  const spillWidth = useTransform(progress, (p) => `${34 + p * 58}%`)
  const roomLift = useTransform(progress, [0, 1], [0.6, 0.18])
  const readout = useTransform(progress, (p) => `${Math.round(p * 100)}`)

  /* ---- Gentle "it moves" cue the first time it's seen ---------------- */
  const seen = useInView(stageRef, { once: true, amount: 0.6 })
  useEffect(() => {
    if (!seen || reduced || touched) return
    const t = setTimeout(() => {
      if (target.get() !== 0) return
      animate(target, [0, 0.16, 0], { duration: 2.2, ease: 'easeInOut' })
    }, 500)
    return () => clearTimeout(t)
  }, [seen, reduced, touched, target])

  /* ---- Pointer drag with velocity-based throw ------------------------ */
  const drag = useRef<{ x: number; p: number; moved: boolean; lastX: number; lastT: number; v: number } | null>(null)

  const setTarget = (v: number) => target.set(Math.min(1, Math.max(0, v)))

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    drag.current = { x: e.clientX, p: target.get(), moved: false, lastX: e.clientX, lastT: performance.now(), v: 0 }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const opening = openingRef.current
    if (!d || !opening) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) < 6) return
    if (!d.moved) {
      d.moved = true
      setTouched(true)
    }
    const width = opening.getBoundingClientRect().width * FRONT_TRAVEL
    setTarget(d.p + dx / width)
    const now = performance.now()
    const dt = Math.max(1, now - d.lastT)
    d.v = (e.clientX - d.lastX) / width / dt // progress per ms
    d.lastX = e.clientX
    d.lastT = now
  }

  const onPointerUp = () => {
    const d = drag.current
    drag.current = null
    if (!d) return
    setTouched(true)
    if (!d.moved) {
      toggle()
      return
    }
    // Throw: project the release velocity forward, then settle near an end.
    let next = target.get() + d.v * 220
    if (next > 0.9) next = 1
    if (next < 0.1) next = 0
    setTarget(next)
  }

  const toggle = () => {
    setTouched(true)
    setTarget(target.get() > 0.5 ? 0 : 1)
  }

  const isOpen = percent > 50
  const frameVars = { '--alu-hi': finish.hi, '--alu-mid': finish.mid, '--alu-lo': finish.lo } as CSSProperties

  return (
    <div className={className}>
      {/* ------------------------------ Stage ------------------------------ */}
      <div
        ref={stageRef}
        className={`relative w-full select-none overflow-hidden bg-[#1b1a18] ${aspect}`}
        style={{ touchAction: 'pan-y', ...frameVars }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        data-cursor={isOpen ? 'Close' : 'Open'}
        data-cursor-variant="door"
        aria-hidden="true"
      >
        {/* Plaster wall + ceiling wash */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,#2c2a26_0%,#1b1a18_55%,#121110_100%)]" />
        {[18, 50, 82].map((left) => (
          <div
            key={left}
            className="absolute top-[1.5%] h-[10%] w-[18%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,236,205,0.22),transparent)]"
            style={{ left: `${left}%` }}
          />
        ))}

        {/* ------------------------- Opening ------------------------- */}
        <div ref={openingRef} className="absolute inset-x-[5%] top-[7%] bottom-[15%] sm:inset-x-[7%]">
          {/* Outdoor view */}
          <div className="absolute inset-0 overflow-hidden bg-ink-3">
            <motion.div className="absolute inset-0 origin-bottom" style={{ scale: viewScale, filter: viewFilter }}>
              <Img image={view} sizes="(min-width: 1400px) 1300px, 90vw" alt="" />
            </motion.div>
            {/* Sky glare that intensifies as light enters */}
            <motion.div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,235,0.35),transparent_45%)]" style={{ opacity: spill }} />
          </div>

          {/* Panels: rear (fixed) → middle → front */}
          <div className="absolute inset-0">
            <Panel left={PANEL_LEFT[2]} depth={0} />
            <Panel left={PANEL_LEFT[1]} depth={1} x={xMiddle} handle />
            <Panel left={PANEL_LEFT[0]} depth={2} x={xFront} handle hint={!touched} />
          </div>

          {/* Outer frame: head, jambs and a three-rail sill track */}
          <div className="brushed pointer-events-none absolute -inset-x-[10px] -top-[12px] h-[12px] shadow-[0_6px_14px_rgba(0,0,0,0.45)]" />
          <div className="brushed pointer-events-none absolute -left-[10px] -top-[12px] -bottom-[16px] w-[10px]" />
          <div className="brushed pointer-events-none absolute -right-[10px] -top-[12px] -bottom-[16px] w-[10px]" />
          <div className="brushed pointer-events-none absolute -inset-x-[10px] -bottom-[16px] h-[16px]">
            <div className="absolute inset-x-0 top-[4px] h-px bg-white/15" />
            <div className="absolute inset-x-0 top-[8px] h-px bg-white/10" />
            <div className="absolute inset-x-0 top-[12px] h-px bg-white/[0.07]" />
          </div>
        </div>

        {/* Floor + daylight spill through the opening */}
        <div className="absolute inset-x-0 bottom-0 h-[15%] bg-[linear-gradient(180deg,#24221f,#141312)]" />
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[15%] -translate-x-1/2 bg-[radial-gradient(50%_120%_at_50%_0%,rgba(255,238,210,0.34),rgba(255,238,210,0.08)_55%,transparent_80%)]"
          style={{ opacity: spill, width: spillWidth }}
        />

        {/* Room darkness that lifts as the door opens */}
        <motion.div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_90%_at_50%_45%,transparent_40%,rgba(0,0,0,0.9))]" style={{ opacity: roomLift }} />

        {/* Technical readout */}
        <div className="eyebrow pointer-events-none absolute left-4 top-4 flex items-center gap-2 text-white/60 sm:left-6 sm:top-6">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
          <span className="hidden sm:inline">{label}</span>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 font-mono text-[0.72rem] tracking-[0.2em] text-white/60 sm:right-6 sm:top-6">
          <motion.span>{readout}</motion.span>% OPEN
        </div>
      </div>

      {/* ----------------------------- Controls ---------------------------- */}
      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex flex-1 items-center gap-4">
          <span className="eyebrow shrink-0 text-alu" aria-hidden="true">
            Close ←
          </span>
          <label className="sr-only" htmlFor="door-position">
            Door position, percent open
          </label>
          <input
            id="door-position"
            type="range"
            min={0}
            max={100}
            step={1}
            value={percent}
            onChange={(e) => {
              setTouched(true)
              setTarget(Number(e.target.value) / 100)
            }}
            aria-valuetext={`${percent}% open`}
            className="door-range"
          />
          <span className="eyebrow shrink-0 text-alu" aria-hidden="true">
            → Open
          </span>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={isOpen}
          className="eyebrow inline-flex min-h-11 shrink-0 items-center justify-center gap-3 border border-white/25 px-5 text-fog transition-colors hover:border-white/70"
        >
          <span className="relative mr-1 h-3 w-5 shrink-0 border border-current">
            <span className={`absolute inset-y-0 w-1/2 bg-current transition-transform duration-500 ${isOpen ? 'translate-x-full' : ''}`} />
          </span>
          {isOpen ? 'Close door' : 'Open door'}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   One glazed panel: brushed stiles and rails, tinted glass with two
   reflection bands, a pull handle on the leading stile, and a cast
   shadow on the panel behind it.
   ------------------------------------------------------------------ */
function Panel({ left, depth, x, handle, hint }: { left: number; depth: number; x?: MotionValue<string>; handle?: boolean; hint?: boolean }) {
  // Rear tracks sit fractionally higher/narrower to read as depth
  const inset = (2 - depth) * 0.6
  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: `${left}%`,
        width: `${PANEL_W}%`,
        top: `${inset}%`,
        bottom: `${inset * 0.4}%`,
        x,
        zIndex: depth + 1,
        boxShadow: depth > 0 ? '-18px 0 28px -10px rgba(0,0,0,0.55)' : undefined,
      }}
    >
      {/* Frame: a masked ring, so the glass area stays genuinely transparent */}
      <div className="brushed frame-ring absolute inset-0 p-[9px] pb-[12px] sm:p-[12px] sm:pb-[16px]" />
      {/* Glass */}
      <div className="absolute inset-x-[9px] top-[9px] bottom-[12px] overflow-hidden sm:inset-x-[12px] sm:top-[12px] sm:bottom-[16px]">
        {/* Low-iron tint, a soft top-down falloff, two sheen bands and an edge catch-light */}
        <div className="absolute inset-0 bg-[rgba(28,46,44,0.26)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),transparent_28%,transparent_72%,rgba(0,0,0,0.22))]" />
        <div className="absolute inset-0 bg-[linear-gradient(112deg,transparent_18%,rgba(255,255,255,0.16)_26%,rgba(255,255,255,0.04)_31%,transparent_36%,transparent_60%,rgba(255,255,255,0.08)_65%,transparent_70%)]" />
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_48px_rgba(0,0,0,0.3)]" />
      </div>
      {/* Pull handle */}
      {handle && (
        <div className="absolute left-[3px] top-1/2 h-[22%] w-[3px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#8d8a84,#e4e1da,#8d8a84)] shadow-[1px_0_3px_rgba(0,0,0,0.6)] sm:left-[4px] sm:w-[4px]">
          {/* Own presence scope: keeps this exit out of the page-transition wait */}
          <AnimatePresence>
            {hint && (
              <motion.span
                className="eyebrow absolute left-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap border border-white/25 bg-black/40 px-3 py-2 text-[0.62rem] text-white/80 backdrop-blur-sm sm:block"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 1.2, duration: 0.6 } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
              >
                Drag to open →
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
