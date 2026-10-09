import { company } from '../../data/company'
import { images } from '../../data/images'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { Button } from '../ui/Button'
import { ImageReveal } from '../ui/ImageReveal'
import { FadeIn, RevealLines } from '../ui/Reveal'
import { Eyebrow } from '../ui/SectionHeading'

type Stat = { value: React.ReactNode; label: string }

/** Verified numbers when supplied; qualitative statements otherwise. */
function buildStats(): Stat[] {
  const stats: Stat[] = []
  if (company.established) stats.push({ value: company.established, label: 'Established' })
  if (company.projectsCompleted) stats.push({ value: <AnimatedCounter value={company.projectsCompleted} suffix="+" />, label: 'Projects' })
  // Verified facts only: free measurement, six services, per-project quoting, location
  const qualitative: Stat[] = [
    { value: 'Free', label: 'Site measurement' },
    { value: 'Six', label: 'Aluminium & glass services' },
    { value: 'Quoted', label: 'Per project' },
    { value: company.city, label: `Based in ${company.country}` },
  ]
  return [...stats, ...qualitative].slice(0, 4)
}

export function AboutSection({ showLink = true }: { showLink?: boolean }) {
  const stats = buildStats()

  return (
    <section data-nav-tone="light" id="about" className="scroll-mt-20 bg-bone py-24 text-ink sm:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow index="01" tone="light">
              Built for modern spaces
            </Eyebrow>
            <RevealLines lines={['Where craftsmanship', 'meets architecture.']} className="display-md mt-6" />
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <FadeIn className="lede text-ink/75">
              <p>
                Brum&rsquo;s Base Aluminium is a Port Harcourt workshop for aluminium and glass: windows, doors, sliding door systems, curtain walls and custom fabrication.
              </p>
            </FadeIn>
            <FadeIn delay={0.1} className="mt-5 text-[0.95rem] leading-relaxed text-ink/60">
              <p>
                We approach every opening as a material decision: the right profile, a clean measure, a reliable fit, and a finish that belongs to the building.
              </p>
            </FadeIn>
            <FadeIn delay={0.15} className="mt-8 border-t rule-light pt-5">
              <p className="eyebrow text-mute">Founded by</p>
              <p className="mt-2 text-xl font-extrabold uppercase tracking-[-0.01em] sm:text-2xl">{company.founder}</p>
            </FadeIn>
            {showLink && (
              <FadeIn delay={0.2} className="mt-8">
                <Button to="/about" variant="ghost-dark">
                  About Brum&rsquo;s Base
                </Button>
              </FadeIn>
            )}
          </div>
        </div>

        <ImageReveal image={images.intro} className="mt-16 aspect-[4/5] sm:mt-24 sm:aspect-[16/9] lg:aspect-[21/9]" sizes="(min-width: 1400px) 1300px, 100vw" parallax={10} />

        <dl className="mt-16 grid grid-cols-2 border-t rule-light sm:mt-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.07}
              className={`border-b rule-light py-8 pr-4 lg:border-b-0 ${i % 2 === 0 ? 'border-r' : ''} lg:border-r lg:last:border-r-0 ${i > 0 ? 'lg:pl-8' : ''} ${i % 2 === 1 ? 'pl-5 lg:pl-8' : ''}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-[clamp(1.05rem,2.6vw,2.4rem)] break-words font-extrabold uppercase leading-none tracking-[-0.03em]">{s.value}</span>
                <span className="eyebrow mt-3 block text-mute">{s.label}</span>
              </dd>
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  )
}
