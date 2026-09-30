import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons'
import { MagneticButton } from './MagneticButton'

type Variant = 'light' | 'dark' | 'outline-light' | 'outline-dark' | 'ghost-light' | 'ghost-dark'

const variants: Record<Variant, string> = {
  light: 'bg-fog text-ink hover:bg-paper',
  dark: 'bg-ink text-fog hover:bg-ink-3',
  'outline-light': 'border border-white/35 text-fog hover:border-white hover:bg-white/[0.06]',
  'outline-dark': 'border border-ink/30 text-ink hover:border-ink hover:bg-ink/[0.04]',
  'ghost-light': 'text-fog px-0!',
  'ghost-dark': 'text-ink px-0!',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  /** Show the trailing arrow (default true) */
  arrow?: boolean
  icon?: ReactNode
  magnetic?: boolean
  className?: string
  /** Custom-cursor label shown on hover */
  cursor?: string
}

type ButtonProps = CommonProps &
  (
    | { to: string; href?: never; onClick?: never; type?: never; external?: never }
    | { href: string; to?: never; external?: boolean; onClick?: never; type?: never }
    | { onClick?: () => void; type?: 'button' | 'submit'; to?: never; href?: never; external?: never; disabled?: boolean }
  )

/**
 * Primary call-to-action. Renders a router Link, external anchor or button.
 * The arrow nudges right on hover; everything else stays still.
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'light', arrow = true, icon, magnetic = false, className = '', cursor } = props
  const classes = `group relative inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${variants[variant]} ${className}`

  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <span className="relative inline-flex overflow-hidden">
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
        </span>
      )}
    </>
  )

  let el: ReactNode
  if ('to' in props && props.to) {
    el = (
      <Link to={props.to} className={classes} data-cursor={cursor}>
        {inner}
      </Link>
    )
  } else if ('href' in props && props.href) {
    el = (
      <a
        href={props.href}
        className={classes}
        data-cursor={cursor}
        {...(props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    )
  } else {
    const p = props as { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }
    el = (
      <button type={p.type ?? 'button'} onClick={p.onClick} disabled={p.disabled} className={`${classes} disabled:opacity-50`} data-cursor={cursor}>
        {inner}
      </button>
    )
  }

  return magnetic ? <MagneticButton>{el}</MagneticButton> : el
}
