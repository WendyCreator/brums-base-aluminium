import { motion, useReducedMotion } from 'framer-motion'
import { principles } from '../../data/content'
import { easeOutExpo, inView } from '../../lib/motion'
import { RevealLines } from '../ui/Reveal'
import { Eyebrow } from '../ui/SectionHeading'

/** Editorial statement list — no icon cards. Each row lights up on hover. */
export function WhyUsSection() {
  const reduced = useReducedMotion()
  return (
    <section data-nav-tone="light" id="why" className="bg-bone py-24 text-ink sm:py-32 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index="08" tone="light">
              Why us
            </Eyebrow>
            <RevealLines lines={['Why', 'Brum’s Base.']} className="display-lg mt-6" />
            <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ink/60">
              Aluminium and glass from one Port Harcourt workshop — measured on site at no charge and quoted for your project.
            </p>
          </div>
        </div>

        <ol className="border-t rule-light lg:col-span-7">
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              className="group grid grid-cols-[auto_1fr] gap-x-6 border-b rule-light py-9 sm:gap-x-10 sm:py-12"
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.06 }}
            >
              <span className="pt-2 font-mono text-sm text-champagne">0{i + 1}</span>
              <div>
                <h3 className="text-[clamp(1.6rem,min(3vw,5.5vh),3rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/65 sm:text-lg">{p.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
