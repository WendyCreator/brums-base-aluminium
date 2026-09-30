import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { beforeAfterPairs, type BeforeAfterPair } from '../../data/content'
import { Img } from '../ui/Img'
import { SectionHeading } from '../ui/SectionHeading'

/** Section wrapper — renders nothing until real before/after pairs are supplied. */
export function BeforeAfterSection() {
  if (beforeAfterPairs.length === 0) return null
  return (
    <section className="bg-ink py-24 text-fog sm:py-32">
      <div className="shell">
        <SectionHeading eyebrow="Before / after" lines={['The difference', 'a frame makes.']} size="md" />
        <div className="mt-14 space-y-16">
          {beforeAfterPairs.map((pair) => (
            <BeforeAfterSlider key={pair.title} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Drag the vertical divider (or use arrow keys) to compare two photos. */
export function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    update(e.clientX)
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
  }

  return (
    <figure>
      <div
        ref={ref}
        className="relative aspect-[16/10] select-none overflow-hidden bg-ink-3"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onDown}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        data-cursor="Drag"
      >
        <Img image={pair.after} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Img image={pair.before} />
        </div>
        <span className="eyebrow absolute top-4 left-4 bg-ink/60 px-3 py-1.5 text-fog">Before</span>
        <span className="eyebrow absolute top-4 right-4 bg-ink/60 px-3 py-1.5 text-fog">After</span>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKey}
          className="absolute inset-y-0 w-px bg-fog"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fog font-mono text-xs text-ink">↔</span>
        </div>
      </div>
      <figcaption className="eyebrow mt-4 text-alu">{pair.title}</figcaption>
    </figure>
  )
}
