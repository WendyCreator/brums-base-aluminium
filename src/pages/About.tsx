import { PageHero } from '../components/layout/PageHero'
import { AboutSection } from '../components/sections/AboutSection'
import { CraftSection } from '../components/sections/CraftSection'
import { CTASection } from '../components/sections/CTASection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { TeamSection } from '../components/sections/TeamSection'
import { WhyUsSection } from '../components/sections/WhyUsSection'
import { FadeIn, RevealLines } from '../components/ui/Reveal'
import { coreValues } from '../data/content'
import { images } from '../data/images'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function About() {
  useDocumentMeta({
    title: 'About',
    description: "Brum's Base Aluminium fabricates and installs aluminium windows, doors and glazing systems from its workshop in Port Harcourt, Nigeria.",
    path: '/about',
  })

  return (
    <>
      <PageHero
        eyebrow="About Brum’s Base"
        lines={['A material', 'decision,', 'made well.']}
        intro="Aluminium windows, doors and architectural glazing — measured with care, fabricated in Port Harcourt and installed to fit the building they belong to."
        image={images.interior}
      />

      <AboutSection showLink={false} />

      {/* Statement */}
      <section className="bg-ink py-28 text-fog sm:py-40">
        <div className="shell">
          <p className="eyebrow text-champagne-2">Our standard</p>
          <RevealLines lines={['Quality is', 'everyone’s', 'responsibility.']} className="display-lg mt-8" />
          <FadeIn className="mt-12 grid gap-8 border-t rule-dark pt-10 md:grid-cols-2">
            <p className="lede text-alu">
              From the first discussion through final fit, the focus stays on a clean result and a responsible handover.
            </p>
            <p className="lede text-alu">Dimensions, sightlines and intended use guide the fabrication — not a one-size-fits-all template.</p>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-12 flex flex-col gap-4 border-t rule-dark pt-6 sm:flex-row sm:items-baseline sm:gap-10">
            <p className="eyebrow shrink-0 text-alu">Our values</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-xl font-extrabold uppercase tracking-[-0.01em] sm:text-2xl">
              {coreValues.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <TeamSection />
      <WhyUsSection />
      <ProcessSection />
      <CraftSection />
      <CTASection />
    </>
  )
}
