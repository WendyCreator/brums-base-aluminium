import { images } from '../../data/images'
import { ImageReveal } from '../ui/ImageReveal'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** The team photo comes from the company profile — the only real photograph on the site so far. */
export function TeamSection() {
  return (
    <section data-nav-tone="dark" id="team" className="scroll-mt-20 border-t rule-dark bg-ink-2 py-24 text-fog sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading index="10" eyebrow="Our team" lines={['The people', 'behind the frames.']}>
          Our fitters and installers produce and install aluminium windows and doors for homes, hotels and corporate offices.
        </SectionHeading>

        <FadeIn className="mt-14 sm:mt-20" y={30}>
          <ImageReveal image={images.team} className="aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9]" sizes="(min-width: 1400px) 1300px, 100vw" parallax={4} />
          <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-mute-2">The Brum&rsquo;s Base team</p>
        </FadeIn>
      </div>
    </section>
  )
}
