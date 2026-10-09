import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import photo1 from '../../assets/brand/1001624015.jpg'
import photo2 from '../../assets/brand/1001624021.jpg'
import photo3 from '../../assets/brand/1001624023.jpg'
import photo4 from '../../assets/brand/1001624025.jpg'
import photo5 from '../../assets/brand/1001624035.jpg'
import photo6 from '../../assets/brand/1001624037.jpg'
import video1 from '../../assets/brand/1001624017.mp4'
import video2 from '../../assets/brand/1001624031.mp4'
import video3 from '../../assets/brand/1001624399.mp4'
import video4 from '../../assets/brand/1001624403.mp4'
import video5 from '../../assets/brand/1001624405.mp4'
import video6 from '../../assets/brand/1001624407.mp4'
import { easeInOutQuart, easeOutExpo, inView } from '../../lib/motion'
import { FadeIn, RevealLines } from '../ui/Reveal'
import { Eyebrow } from '../ui/SectionHeading'

/* ─── Types ─────────────────────────────────────────────────────────── */
type PhotoItem = { kind: 'photo'; src: string; alt: string }
type VideoItem = { kind: 'video'; src: string; poster: string }
type GalleryItem = PhotoItem | VideoItem

/* ─── Data ───────────────────────────────────────────────────────────── */
const items: GalleryItem[] = [
  { kind: 'photo', src: photo6,  alt: 'Brum\'s Base aluminium installation — Port Harcourt' },
  { kind: 'video', src: video1,  poster: photo5 },
  { kind: 'photo', src: photo3,  alt: 'Brum\'s Base crew fitting aluminium frames on site' },
  { kind: 'video', src: video3,  poster: photo1 },
  { kind: 'photo', src: photo1,  alt: 'Completed aluminium project by Brum\'s Base' },
  { kind: 'video', src: video2,  poster: photo3 },
  { kind: 'photo', src: photo4,  alt: 'Aluminium sliding door system — Brum\'s Base' },
  { kind: 'video', src: video4,  poster: photo2 },
  { kind: 'photo', src: photo2,  alt: 'Aluminium glazing project — Rivers State' },
  { kind: 'video', src: video5,  poster: photo4 },
  { kind: 'photo', src: photo5,  alt: 'Aluminium windows and doors — Brum\'s Base' },
  { kind: 'video', src: video6,  poster: photo6 },
]

/*
  Desktop masonry layout — 3-column CSS grid with explicit row spans.
  Each cell has a defined aspect so the grid rows are driven by content,
  not a fixed row height. The pattern creates a deliberate visual rhythm:
  large anchor → tall portrait → wide landscape → repeat.

  col-span / row-span / aspect
  ─────────────────────────────
  0  photo6   2×2  square-ish  ← large anchor, top-left
  1  video1   1×1  landscape
  2  photo3   1×2  portrait    ← tall, right column
  3  video3   1×1  landscape
  4  photo1   2×1  landscape   ← wide
  5  video2   1×1  landscape
  6  photo4   1×2  portrait    ← tall, left column
  7  video4   2×1  landscape   ← wide
  8  photo2   1×1  landscape
  9  video5   1×1  landscape
  10 photo5   2×1  landscape   ← wide anchor, bottom
  11 video6   1×1  landscape
*/
type CellDef = { col: string; row: string; aspect: string }
const cells: CellDef[] = [
  { col: 'md:col-span-2', row: 'md:row-span-2', aspect: 'aspect-[1/1]'   },
  { col: 'md:col-span-1', row: 'md:row-span-1', aspect: 'aspect-[4/3]'   },
  { col: 'md:col-span-1', row: 'md:row-span-2', aspect: 'aspect-[3/4]'   },
  { col: 'md:col-span-1', row: 'md:row-span-1', aspect: 'aspect-[4/3]'   },
  { col: 'md:col-span-2', row: 'md:row-span-1', aspect: 'aspect-[16/7]'  },
  { col: 'md:col-span-1', row: 'md:row-span-1', aspect: 'aspect-[4/3]'   },
  { col: 'md:col-span-1', row: 'md:row-span-2', aspect: 'aspect-[3/4]'   },
  { col: 'md:col-span-2', row: 'md:row-span-1', aspect: 'aspect-[16/7]'  },
  { col: 'md:col-span-1', row: 'md:row-span-1', aspect: 'aspect-[4/3]'   },
  { col: 'md:col-span-1', row: 'md:row-span-1', aspect: 'aspect-[4/3]'   },
  { col: 'md:col-span-2', row: 'md:row-span-1', aspect: 'aspect-[16/7]'  },
  { col: 'md:col-span-1', row: 'md:row-span-1', aspect: 'aspect-[4/3]'   },
]

/* ─── Tile ───────────────────────────────────────────────────────────── */
function Tile({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer overflow-hidden bg-ink-3"
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 1, ease: easeOutExpo, delay: (index % 3) * 0.07 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={item.kind === 'photo' ? item.alt : 'Play video'}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Media with parallax */}
      <motion.div
        className="absolute inset-x-0"
        style={reduced ? { top: 0, bottom: 0 } : { y, top: '-6%', bottom: '-6%' }}
      >
        {item.kind === 'photo' ? (
          <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <video
            src={item.src}
            poster={item.poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        )}
      </motion.div>

      {/* Hover scrim */}
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/30" />

      {/* Bottom meta strip — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/90 to-transparent px-5 pb-5 pt-10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-fog/70">
          {item.kind === 'video' ? '▶ Video' : `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`}
        </p>
      </div>

      {/* Video badge — always visible */}
      {item.kind === 'video' && (
        <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/50 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog/80 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-champagne-2" />
          Video
        </span>
      )}

      {/* Expand icon */}
      <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-fog">
          <path d="M1 1h5M1 1v5M13 13H8M13 13V8M13 1H8M13 1v5M1 13h5M1 13V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    </motion.div>
  )
}

/* ─── Lightbox ───────────────────────────────────────────────────────── */
function Lightbox({ index: initial, onClose }: { index: number; onClose: () => void }) {
  const [index, setIndex] = useState(initial)
  const [dir, setDir] = useState(0)
  const reduced = useReducedMotion()
  const item = items[index]

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1)
    setIndex((next + items.length) % items.length)
  }, [index])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, go, index])

  const variants = {
    enter: (d: number) => ({ x: reduced ? 0 : d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduced ? 0 : d * -60, opacity: 0 }),
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-ink/97 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between px-6 py-5 sm:px-10">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-alu">
          <span className="text-fog">{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-2 opacity-40">/</span>
          {String(items.length).padStart(2, '0')}
          <span className="ml-4 opacity-60">{item.kind === 'video' ? 'Video' : 'Photo'}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="eyebrow flex h-10 w-10 items-center justify-center border border-white/20 text-fog/70 transition-colors hover:border-white/60 hover:text-fog"
        >
          ✕
        </button>
      </div>

      {/* Media */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: easeInOutQuart }}
            className="flex max-h-full max-w-5xl w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {item.kind === 'photo' ? (
              <img src={item.src} alt={item.alt} className="max-h-[75svh] w-full object-contain" />
            ) : (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                autoPlay
                controls
                loop
                playsInline
                className="max-h-[75svh] w-full"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next hit areas */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/15 bg-ink/40 text-fog/60 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-fog sm:left-4"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/15 bg-ink/40 text-fog/60 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-fog sm:right-4"
        >
          →
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 overflow-x-auto px-6 py-5 sm:px-10">
        <div className="flex gap-2">
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to item ${i + 1}`}
              className={`relative h-14 w-20 shrink-0 overflow-hidden transition-opacity duration-300 ${i === index ? 'opacity-100 ring-1 ring-champagne-2' : 'opacity-40 hover:opacity-70'}`}
            >
              <img
                src={it.kind === 'photo' ? it.src : it.poster}
                alt=""
                className="h-full w-full object-cover"
              />
              {it.kind === 'video' && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/40 font-mono text-[0.55rem] text-fog/80">▶</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Mobile horizontal strip ────────────────────────────────────────── */
function MobileStrip({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 md:hidden" style={{ scrollSnapType: 'x mandatory' }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="relative aspect-[4/5] w-[72vw] max-w-[320px] shrink-0 cursor-pointer overflow-hidden bg-ink-3"
          style={{ scrollSnapAlign: 'start' }}
          onClick={() => onOpen(i)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpen(i)}
          aria-label={item.kind === 'photo' ? item.alt : 'Play video'}
        >
          <img
            src={item.kind === 'photo' ? item.src : item.poster}
            alt={item.kind === 'photo' ? item.alt : ''}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {item.kind === 'video' && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-ink/50 text-fog backdrop-blur-sm">▶</span>
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-4 pt-8">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fog/70">
              {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────────────── */
export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <section data-nav-tone="dark" id="gallery" className="scroll-mt-20 bg-ink py-24 text-fog sm:py-32 lg:py-40">
        <div className="shell">

          {/* Header */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="06" tone="dark">Our work</Eyebrow>
              <RevealLines
                lines={['From the workshop', 'to the opening.']}
                className="display-lg mt-6 text-fog"
              />
            </div>
            <FadeIn delay={0.2} className="lede max-w-sm text-alu lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <p>
                Real projects. Real installations. Every frame measured, fabricated and fitted by the Brum&rsquo;s Base team in Port Harcourt.
              </p>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mute-2">
                {items.length} items &mdash; click any to expand
              </p>
            </FadeIn>
          </div>

          {/* Mobile: horizontal scroll strip */}
          <div className="mt-12 md:hidden">
            <MobileStrip onOpen={(i) => setLightboxIndex(i)} />
          </div>

          {/* Desktop: masonry grid */}
          <div className="mt-14 hidden md:grid md:grid-cols-3 md:gap-3 lg:gap-4">
            {items.map((item, i) => (
              <div key={i} className={`${cells[i].col} ${cells[i].row} ${cells[i].aspect}`}>
                <Tile item={item} index={i} onClick={() => setLightboxIndex(i)} />
              </div>
            ))}
          </div>

          {/* Footer rule */}
          <FadeIn className="mt-10 flex items-center justify-between border-t rule-dark pt-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mute-2">
              Brum&rsquo;s Base Aluminium &mdash; Port Harcourt, Rivers State
            </p>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-mute-2">
              {items.filter(i => i.kind === 'photo').length} photos &nbsp;&middot;&nbsp; {items.filter(i => i.kind === 'video').length} videos
            </p>
          </FadeIn>

        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
