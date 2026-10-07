import { Link } from 'react-router-dom'
import markSrc from '../../assets/brand/logo-mark.png'

/**
 * The client's handshake mark on a cream disc (the way their printed logo sits),
 * paired with a typeset wordmark — the logo's own lettering is too small to read at nav size.
 */
export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={`group flex items-center gap-3 ${className}`} aria-label="Brum's Base Aluminium — home">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f0ea] ring-1 ring-black/10 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110">
        <img src={markSrc} alt="" width={261} height={178} className="h-auto w-[74%]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-extrabold tracking-[0.08em] uppercase">Brum&rsquo;s Base</span>
        <span className="mt-1 font-mono text-[0.6rem] tracking-[0.42em] uppercase opacity-60">Aluminium</span>
      </span>
    </Link>
  )
}
