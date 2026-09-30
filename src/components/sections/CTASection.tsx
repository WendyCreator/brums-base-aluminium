import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { whatsappLink } from '../../data/company'
import { images } from '../../data/images'
import { Button } from '../ui/Button'
import { Img } from '../ui/Img'
import { WhatsAppIcon } from '../ui/Icons'
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
            <p>Have a project in mind? Tell us what you&rsquo;re working on.</p>
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
      </div>
    </section>
  )
}
