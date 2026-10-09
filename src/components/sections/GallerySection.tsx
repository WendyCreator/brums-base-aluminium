import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
import { easeOutExpo, inView } from '../../lib/motion'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type PhotoItem = { kind: 'photo'; src: string; alt: string }
type VideoItem = { kind: 'video'; src: string; poster: string }
type GalleryItem = PhotoItem | VideoItem

const items: GalleryItem[] = [
  { kind: 'photo',  src: photo6,  alt: "Brum's Base aluminium installation project" },
  { kind: 'video',  src: video1,  poster: photo5 },
  { kind: 'photo',  src: photo3,  alt: "Brum's Base team installing aluminium frames on site" },
  { kind: 'video',  src: video3,  poster: photo1 },
  { kind: 'photo',  src: photo1,  alt: "Brum's Base completed aluminium project" },
  { kind: 'video',  src: video2,  poster: photo3 },
  { kind: 'photo',  src: photo4,  alt: "View through Brum's Base aluminium sliding door system" },
  { kind: 'video',  src: video4,  poster: photo2 },
  { kind: 'photo',  src: photo2,  alt: "Brum's Base aluminium glazing project" },
  { kind: 'video',  src: video5,  poster: photo4 },
  { kind: 'photo',  src: photo5,  alt: "Brum's Base aluminium windows and doors project" },
  { kind: 'video',  src: video6,  poster: photo6 },
]

/** Assign each item a span so the grid feels editorial, not uniform */
const spans = [
  'md:col-span-2 md:row-span-2', // large anchor
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2', // tall
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1', // wide
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-1',
  'md:col-span-2 md:row-span-1', // wide
  'md:col-span-1 md:row-span-1',
  'md:col-span-1 md:row-span-2', // tall
  'md:col-span-1 md:row-span-1',
]

function VideoTile({ src, poster }: { src: string; poster: string }) {
  return (
    <>
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog/80 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
        Video
      </span>
    </>
  )
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90svh] max-w-5xl w-full"
        initial={reduced ? false : { scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.kind === 'photo' ? (
          <img src={item.src} alt={item.alt} className="max-h-[90svh] w-full object-contain" />
        ) : (
          <video src={item.src} poster={item.poster} autoPlay controls loop playsInline className="max-h-[90svh] w-full" />
        )}
      </motion.div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="eyebrow absolute top-5 right-5 flex h-11 w-11 items-center justify-center border border-white/25 text-fog hover:border-white/70"
      >
        ✕
      </button>
    </motion.div>
  )
}

export function GallerySection() {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const reduced = useReducedMotion()

  return (
    <>
      <section data-nav-tone="dark" id="gallery" className="scroll-mt-20 bg-ink py-24 text-fog sm:py-32 lg:py-40">
        <div className="shell">
          <SectionHeading index="06" eyebrow="Our work" lines={['Built by', 'our hands.']}>
            A look at Brum&rsquo;s Base projects and installations — from the workshop floor to the finished opening.
          </SectionHeading>

          <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-[repeat(7,16vw)] sm:mt-20 lg:gap-4">
            {items.map((item, i) => (
              <FadeIn
                key={i}
                delay={i * 0.04}
                className={`relative overflow-hidden bg-ink-3 ${spans[i]} aspect-[4/3] md:aspect-auto`}
              >
                <motion.div
                  className="absolute inset-0 cursor-pointer"
                  whileHover={reduced ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.7, ease: easeOutExpo }}
                  onClick={() => setActive(item)}
                  whileInView={{ opacity: 1 }}
                  viewport={inView}
                >
                  {item.kind === 'photo' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <VideoTile src={item.src} poster={item.poster} />
                  )}
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 hover:bg-ink/20" />
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-8 border-t rule-dark pt-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute-2">
              Real project photography &amp; video · Brum&rsquo;s Base Aluminium, Port Harcourt
            </p>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}
