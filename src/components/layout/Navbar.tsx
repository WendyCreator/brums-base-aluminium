import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { mainNav } from '../../data/content'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

/** Tone of the section currently under the bar, via `data-nav-tone` markers. */
function toneBehindNav(): 'dark' | 'light' {
  const stack = document.elementsFromPoint(window.innerWidth / 2, 40)
  const under = stack.find((el) => !el.closest('header'))
  return under?.closest('[data-nav-tone]')?.getAttribute('data-nav-tone') === 'light' ? 'light' : 'dark'
}

export function Navbar() {
  const { pathname, hash } = useLocation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [tone, setTone] = useState<'dark' | 'light'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
    setTone(toneBehindNav())
  })

  // Close the menu on navigation (render-phase reset avoids an effect)
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  // Re-sample after route transitions settle
  useEffect(() => {
    const t = window.setTimeout(() => setTone(toneBehindNav()), 700)
    return () => window.clearTimeout(t)
  }, [pathname])

  const light = tone === 'light' && scrolled && !menuOpen

  const isActive = (to: string) => {
    if (to.includes('#')) return pathname === '/' && hash === to.slice(1)
    return pathname === to || pathname.startsWith(`${to}/`)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={{ y: '-120%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-sm border px-4 transition-all duration-500 sm:px-6 ${
            !(scrolled || menuOpen)
              ? 'h-16 border-transparent bg-transparent text-fog sm:h-[72px]'
              : light
                ? 'h-14 border-ink/10 bg-bone/75 text-ink backdrop-blur-xl backdrop-saturate-150'
                : 'h-14 border-white/10 bg-ink/70 text-fog backdrop-blur-xl backdrop-saturate-150'
          }`}
        >
          <Logo onClick={() => setMenuOpen(false)} />

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative block px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-current/75 transition-colors hover:text-current"
                  aria-current={isActive(item.to) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(item.to) && (
                    <motion.span layoutId="nav-active" className="absolute inset-x-4 -bottom-0.5 h-px bg-champagne" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Button to="/contact#quote" variant={light ? 'dark' : 'light'} arrow={false} className="min-h-10! px-5! text-[0.7rem]!">
                Request a quote
              </Button>
            </div>
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${menuOpen ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${menuOpen ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}
