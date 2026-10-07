import { whatsappLink } from '../../data/company'
import { quoteTerms } from '../../data/content'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { FadeIn, RevealLines } from '../ui/Reveal'
import { Eyebrow } from '../ui/SectionHeading'

export function MeasureSection() {
  const wa = whatsappLink()

  return (
    <section id="measure" data-nav-tone="dark" className="scroll-mt-20 border-t rule-dark bg-ink-2 py-24 text-fog sm:py-32 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Eyebrow index="07">Project quote</Eyebrow>
          <RevealLines lines={['Free site', 'measurement.']} className="display-lg mt-6" />
          <FadeIn delay={0.2} className="lede mt-8 max-w-sm text-alu">
            <p>Not sure what your project requires? Tell us about it and we&rsquo;ll come and measure.</p>
          </FadeIn>
          <FadeIn delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact#quote" variant="light" magnetic>
              Book a site measurement
            </Button>
            {wa && (
              <Button href={wa} external variant="outline-light" arrow={false} icon={<WhatsAppIcon className="h-4 w-4 text-[#6fd39a]" />}>
                Chat on WhatsApp
              </Button>
            )}
          </FadeIn>
        </div>

        <ul className="border-t rule-dark lg:col-span-5 lg:col-start-8 lg:self-end">
          {quoteTerms.map((t, i) => (
            <FadeIn as="li" key={t.title} delay={i * 0.08} className="border-b rule-dark py-8 sm:py-10">
              <p className="font-mono text-xs text-champagne-2">0{i + 1}</p>
              <h3 className="mt-3 text-2xl font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-3xl">{t.title}</h3>
              <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-alu">{t.body}</p>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
