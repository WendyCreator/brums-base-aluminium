import { solutions } from '../../data/solutions'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SolutionCard } from './SolutionCard'

/**
 * Two independent columns with alternating proportions; the right column
 * starts lower. Column heights balance (tall + square + tall on each side),
 * so the stagger reads as intentional rather than leaving holes.
 */
const leftAspects = ['md:aspect-[4/5]', 'md:aspect-square', 'md:aspect-[4/5]']
const rightAspects = ['md:aspect-square', 'md:aspect-[4/5]', 'md:aspect-square']

export function SolutionsSection() {
  const half = Math.ceil(solutions.length / 2)
  const columns = [solutions.slice(0, half), solutions.slice(half)]

  return (
    <section id="solutions" className="scroll-mt-20 bg-ink-2 py-24 text-fog sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading index="03" eyebrow="Our solutions" lines={['Designed for', 'the way you live', 'and build.']}>
          Six families of aluminium and glass systems, each fabricated to the opening in front of us.
        </SectionHeading>

        <div className="mt-16 grid gap-5 sm:mt-24 sm:gap-6 md:grid-cols-2 lg:gap-8">
          {columns.map((col, c) => (
            <div key={c} className={`flex flex-col gap-5 sm:gap-6 lg:gap-8 ${c === 1 ? 'md:pt-40' : ''}`}>
              {col.map((s, i) => (
                <SolutionCard
                  key={s.id}
                  solution={s}
                  aspect={`aspect-[4/5] ${(c === 0 ? leftAspects : rightAspects)[i % 3]}`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  delay={c * 0.1}
                />
              ))}
            </div>
          ))}
        </div>

        <FadeIn className="mt-16 flex justify-center sm:mt-20">
          <Button to="/solutions" variant="outline-light">
            View all solutions
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
