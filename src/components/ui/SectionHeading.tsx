import type { ReactNode } from 'react'
import { FadeIn, RevealLines } from './Reveal'

type Tone = 'light' | 'dark'

/** "01 / OUR SOLUTIONS" style label with a short rule. */
export function Eyebrow({ index, children, tone = 'dark', className = '' }: { index?: string; children: ReactNode; tone?: Tone; className?: string }) {
  const color = tone === 'dark' ? 'text-alu' : 'text-mute'
  return (
    <FadeIn className={`eyebrow flex items-center gap-3 ${color} ${className}`}>
      {index && <span className={tone === 'dark' ? 'text-champagne-2' : 'text-champagne'}>{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />}
      <span>{children}</span>
    </FadeIn>
  )
}

type SectionHeadingProps = {
  index?: string
  eyebrow: string
  lines: string[]
  tone?: Tone
  size?: 'lg' | 'md'
  as?: 'h1' | 'h2'
  className?: string
  children?: ReactNode
}

/** Eyebrow + large masked display heading (+ optional intro copy on the side). */
export function SectionHeading({ index, eyebrow, lines, tone = 'dark', size = 'lg', as = 'h2', className = '', children }: SectionHeadingProps) {
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className={children ? 'lg:col-span-8' : 'lg:col-span-12'}>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <RevealLines
          as={as}
          lines={lines}
          className={`${size === 'lg' ? 'display-lg' : 'display-md'} mt-6 ${tone === 'dark' ? 'text-fog' : 'text-ink'}`}
        />
      </div>
      {children && (
        <FadeIn delay={0.2} className={`lede max-w-md lg:col-span-4 lg:justify-self-end ${tone === 'dark' ? 'text-alu' : 'text-ink/70'}`}>
          {children}
        </FadeIn>
      )}
    </div>
  )
}
