import { quoteParts, quoteScope, quoteTermsList } from '../../data/content'
import { FadeIn, RevealLines } from '../ui/Reveal'
import { Eyebrow } from '../ui/SectionHeading'

/** Shows what a visitor will receive after enquiring — structure only, never prices. */
export function QuoteAnatomy() {
  return (
    <section data-nav-tone="dark" id="whats-in-a-quote" className="scroll-mt-20 border-t rule-dark bg-ink-2 py-24 text-fog sm:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Eyebrow>What you&rsquo;ll receive</Eyebrow>
            <RevealLines lines={['What’s in a', 'Brum’s Base', 'quote.']} className="display-md mt-6" />
            <FadeIn delay={0.2} className="lede mt-6 max-w-sm text-alu">
              <p>Every quote is prepared for your project. Here is how it is laid out, so you know what to expect.</p>
            </FadeIn>
          </div>

          <ol className="border-t rule-dark lg:col-span-7">
            {quoteParts.map((p, i) => (
              <FadeIn as="li" key={p.title} delay={i * 0.05} className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b rule-dark py-6 sm:grid-cols-[3rem_1fr] sm:py-7">
                <span className="pt-1.5 font-mono text-sm text-champagne-2">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-extrabold uppercase leading-tight tracking-[-0.02em] sm:text-2xl">{p.title}</h3>
                  <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-alu">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-12 border-t rule-dark pt-10 md:grid-cols-2 lg:mt-20 lg:gap-8">
          <FadeIn>
            <p className="eyebrow text-alu">Scope of work can include</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {quoteScope.map((s) => (
                <li key={s} className="border border-white/20 px-3 py-2 text-sm font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow text-alu">Terms</p>
            <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-fog/85">
              {quoteTermsList.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-champagne-2" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
