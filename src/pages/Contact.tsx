import { PageHero } from '../components/layout/PageHero'
import { ContactDetails, ContactMap } from '../components/sections/ContactSection'
import { QuoteForm } from '../components/sections/QuoteForm'
import { FadeIn, RevealLines } from '../components/ui/Reveal'
import { Eyebrow } from '../components/ui/SectionHeading'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Contact() {
  useDocumentMeta({
    title: 'Contact & Quote',
    description: "Request a quote for aluminium windows, doors, sliding systems or glazing from Brum's Base Aluminium in Port Harcourt.",
    path: '/contact',
  })

  return (
    <>
      <PageHero eyebrow="Contact" lines={["Let's talk", 'about your', 'project.']} intro="Call, message on WhatsApp, or send your project details below. We'll help you define the right aluminium system for the opening." />

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

      <section data-nav-tone="light" id="quote" className="scroll-mt-16 bg-bone py-24 text-ink sm:py-32 lg:py-40">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow index="→" tone="light">
                Request a quote
              </Eyebrow>
              <RevealLines lines={["We'll frame", 'the solution.']} className="display-md mt-6" />
              <FadeIn className="mt-6 max-w-sm leading-relaxed text-ink/65">
                <p>Share a few practical details about your project. Approximate is fine — we&rsquo;ll confirm measurements on site.</p>
              </FadeIn>
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
