import { Link } from 'react-router-dom'
import { BrandMark } from '../ui/Icons'

/** Wordmark. Replace with the client's logo file when supplied. */
export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={`group flex items-center gap-3 ${className}`} aria-label="Brum's Base Aluminium — home">
      <BrandMark className="h-7 w-7 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-90" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-extrabold tracking-[0.08em] uppercase">Brum&rsquo;s Base</span>
        <span className="mt-1 font-mono text-[0.6rem] tracking-[0.42em] uppercase opacity-60">Aluminium</span>
      </span>
    </Link>
  )
}
