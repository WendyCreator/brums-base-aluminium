import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { company, socialHandle, socialNames, whatsappLink } from '../../data/company'
import { images } from '../../data/images'
import { Button } from '../ui/Button'
import { WorkshopHours } from './ContactSection'
import { Img } from '../ui/Img'
import { SocialIcon, WhatsAppIcon } from '../ui/Icons'
import { FadeIn, RevealLines } from '../ui/Reveal'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1])
  const wa = whatsappLink()

  return (
    <section ref={ref} className="grain relative flex min-h-[92svh] items-center overflow-hidden bg-ink text-fog">
      <motion.div className="absolute inset-0" style={reduced ? undefined : { scale }}>
        <Img image={images.cta} sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_30%_60%,rgba(11,11,11,0.55),rgba(11,11,11,0.88))]" />

      <div className="shell relative py-32">
        <FadeIn>
          <p className="eyebrow flex items-center gap-3 text-alu">
            <span className="h-px w-8 bg-champagne" aria-hidden="true" />
            Start a project
          </p>
        </FadeIn>
        <RevealLines lines={["Let's build", 'something', 'beautiful.']} className="display-xl mt-6" stagger={0.1} />
        <div className="mt-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <FadeIn delay={0.2} className="lede max-w-sm text-fog/80">
            <p>Have a project in mind? Tell us what you&rsquo;re working on. Site measurements are free.</p>
          </FadeIn>
          <FadeIn delay={0.3} className="flex flex-col gap-3 sm:flex-row">
            <Button to="/contact#quote" variant="light" magnetic>
              Request a quote
            </Button>
            {wa && (
              <Button href={wa} external variant="outline-light" arrow={false} icon={<WhatsAppIcon className="h-4 w-4 text-[#6fd39a]" />}>
                Chat on WhatsApp
              </Button>
            )}
          </FadeIn>
        </div>

        {/* Workshop — quiet, secondary */}
        <FadeIn delay={0.4} className="mt-16 grid gap-6 border-t rule-dark pt-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-12">
          <div>
            <p className="eyebrow text-alu">Visit our workshop</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.1em]">
              {company.city}, {company.country}
            </p>
          </div>
          <div className="space-y-5">
            <WorkshopHours className="text-fog/90" />
            {company.socials.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {company.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Brum's Base on ${socialNames[s.platform]}`}
                    className="link-line inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fog/90"
                  >
                    <SocialIcon platform={s.platform} className="h-4 w-4" />
                    {socialHandle(s)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
