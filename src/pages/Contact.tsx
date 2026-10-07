import { PageHero } from '../components/layout/PageHero'
import { ContactDetails, ContactMap } from '../components/sections/ContactSection'
import { QuoteAnatomy } from '../components/sections/QuoteAnatomy'
import { QuoteForm } from '../components/sections/QuoteForm'
import { quoteTerms } from '../data/content'
import { FadeIn, RevealLines } from '../components/ui/Reveal'
import { Eyebrow } from '../components/ui/SectionHeading'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Contact() {
  useDocumentMeta({
    title: 'Contact & Quote',
    description: "Request a quote for aluminium windows, doors, sliding door systems or glazing from Brum's Base Aluminium in Port Harcourt.",
    path: '/contact',
  })

  return (
    <>
      <PageHero eyebrow="Contact" lines={["Let's talk", 'about your', 'project.']} intro="Call, message on WhatsApp, or send your project details below. Site measurements are free, and every project is quoted individually." />

      <section className="bg-ink pb-24 text-fog sm:pb-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ContactDetails tone="dark" />
          </div>
          <FadeIn className="lg:col-span-6" y={30}>
            <ContactMap />
          </FadeIn>
        </div>
      </section>

      <QuoteAnatomy />

      <section data-nav-tone="light" id="quote" className="scroll-mt-16 bg-bone py-24 text-ink sm:py-32 lg:py-40">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow index="→" tone="light">
                Request a quote
              </Eyebrow>
              <RevealLines lines={['Get a', 'project quote.']} className="display-md mt-6" />
              <FadeIn className="mt-6 max-w-sm leading-relaxed text-ink/65">
                <p>Tell us about your project and we&rsquo;ll help you determine the right aluminium and glass solution. Approximate is fine — we&rsquo;ll confirm measurements on site.</p>
              </FadeIn>
              <ul className="mt-10 max-w-sm border-t rule-light">
                {quoteTerms.map((t) => (
                  <FadeIn as="li" key={t.title} className="border-b rule-light py-5">
                    <p className="eyebrow text-ink">{t.title}</p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-ink/60">{t.body}</p>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  )
}
