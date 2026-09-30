import { images, type SiteImage } from '../../data/images'
import { SlidingDoor } from '../door/SlidingDoor'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const qualities = [
  { title: 'Smooth', body: 'Panels glide on precision tracks with a light, even movement.' },
  { title: 'Precise', body: 'Frames are fabricated to the measured opening, not a standard size.' },
  { title: 'Seamless', body: 'Closed, the glass reads as one line. Open, the room meets the outdoors.' },
]

type Props = {
  id?: string
  index?: string
  view?: SiteImage
  cta?: { label: string; to: string } | null
}

/** Signature section: an interactive aluminium sliding door the visitor can open. */
export function SlidingDoorExperience({
  id = 'sliding-experience',
  index = '01',
  view = images.terrace,
  cta = { label: 'Discover sliding systems', to: '/solutions#sliding-systems' },
}: Props) {
  return (
    <section id={id} data-nav-tone="dark" className="relative scroll-mt-20 bg-ink py-24 text-fog sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading index={index} eyebrow="Aluminium sliding systems" lines={['Open up', 'your space.']}>
          Designed to connect interiors with the world outside while maintaining clean architectural lines. Drag the door, use the slider, or tap to open.
        </SectionHeading>

        <FadeIn className="mt-14 sm:mt-20" y={40}>
          <SlidingDoor view={view} />
        </FadeIn>

        <div className="mt-16 grid gap-10 border-t rule-dark pt-10 sm:mt-24 md:grid-cols-3 md:gap-8">
          {qualities.map((q, i) => (
            <FadeIn key={q.title} delay={i * 0.08}>
              <p className="font-mono text-xs text-champagne-2">0{i + 1}</p>
              <h3 className="mt-3 text-2xl font-extrabold uppercase tracking-[-0.02em] sm:text-3xl">{q.title}</h3>
              <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-alu">{q.body}</p>
            </FadeIn>
          ))}
        </div>

        {cta && (
          <FadeIn className="mt-14">
            <Button to={cta.to} variant="outline-light">
              {cta.label}
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
