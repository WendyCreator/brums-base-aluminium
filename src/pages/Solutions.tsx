import { Fragment } from 'react'
import { PageHero } from '../components/layout/PageHero'
import { CTASection } from '../components/sections/CTASection'
import { MaterialsSection } from '../components/sections/MaterialsSection'
import { SlidingDoorExperience } from '../components/sections/SlidingDoorExperience'
import { Button } from '../components/ui/Button'
import { ImageReveal } from '../components/ui/ImageReveal'
import { FadeIn, RevealLines } from '../components/ui/Reveal'
import { images } from '../data/images'
import { solutions, type Solution } from '../data/solutions'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Solutions() {
  useDocumentMeta({
    title: 'Solutions',
    description: 'Aluminium windows, doors, sliding door systems, curtain walls, glass and aluminium, and custom fabrication for residential and commercial projects in Nigeria.',
    path: '/solutions',
  })

  return (
    <>
      <PageHero
        eyebrow="Our solutions"
        lines={['Systems for', 'every opening.']}
        intro="Six families of aluminium and glass systems — each one fabricated to the measured opening rather than a standard size."
        image={images.sliding}
      >
        <FadeIn immediate delay={0.9} className="mt-10">
          <nav aria-label="Solutions" className="flex flex-wrap gap-2">
            {solutions.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="eyebrow border border-white/20 px-4 py-3 text-fog/85 transition-colors hover:border-white/70 hover:text-fog">
                {s.number} {s.title}
              </a>
            ))}
          </nav>
        </FadeIn>
      </PageHero>

      <div data-nav-tone="light" className="bg-bone text-ink">
        {solutions.map((s, i) => (
          <Fragment key={s.id}>
            <SolutionRow solution={s} flip={i % 2 === 1} />
            {s.id === 'sliding-systems' && (
              <SlidingDoorExperience id="sliding-demo" index="Try it" view={images.terraceAlt} cta={{ label: 'Request a sliding door quote', to: '/contact#quote' }} />
            )}
          </Fragment>
        ))}
      </div>

      <MaterialsSection />
      <CTASection />
    </>
  )
}

function SolutionRow({ solution, flip }: { solution: Solution; flip: boolean }) {
  return (
    <section id={solution.id} className="scroll-mt-20 border-b rule-light py-20 sm:py-28 lg:py-36">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <ImageReveal
          image={solution.image}
          className={`aspect-[4/5] sm:aspect-[16/11] lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}
          sizes="(min-width: 1024px) 58vw, 100vw"
          from={flip ? 'bottom' : 'left'}
        />
        <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : 'lg:col-start-8 lg:pl-4'}`}>
          <p className="font-mono text-sm tracking-[0.2em] text-champagne">{solution.number}</p>
          <RevealLines lines={[solution.title]} className="display-md mt-4" />
          <FadeIn className="mt-6">
            <p className="text-xl font-semibold tracking-tight">{solution.short}</p>
            <p className="mt-4 max-w-md leading-relaxed text-ink/65">{solution.description}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="mt-8 grid grid-cols-2 border-t rule-light">
              {solution.applications.map((a) => (
                <li key={a} className="border-b rule-light py-3 text-sm font-medium uppercase tracking-[0.08em]">
                  {a}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-8">
            <Button to={`/contact#quote`} variant="ghost-dark">
              Enquire about {solution.title.toLowerCase()}
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
