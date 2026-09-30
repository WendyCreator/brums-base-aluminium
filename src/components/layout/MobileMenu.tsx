import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { company, telLink, whatsappLink } from '../../data/company'
import { mainNav } from '../../data/content'
import { easeInOutQuart, easeOutExpo } from '../../lib/motion'

export function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const wa = whatsappLink()
  const tel = telLink()

  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-40 flex flex-col bg-ink px-5 pt-28 pb-8 sm:px-8 lg:hidden"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.7, ease: easeInOutQuart }}
    >
      <nav aria-label="Mobile" className="flex-1">
        <ul className="border-t border-white/10">
          {mainNav.map((item, i) => (
            <li key={item.to} className="overflow-hidden border-b border-white/10">
              <motion.div initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.25 + i * 0.05 }}>
                <Link to={item.to} onClick={onClose} className="flex items-baseline justify-between py-4 sm:py-5">
                  <span className="text-[clamp(2rem,9vw,3.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em]">{item.label}</span>
                  <span className="font-mono text-xs text-mute-2">0{i + 1}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        className="grid gap-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <Link to="/contact#quote" onClick={onClose} className="flex min-h-14 items-center justify-center bg-fog text-sm font-semibold uppercase tracking-[0.16em] text-ink">
          Request a quote
        </Link>
        <div className="flex items-center justify-between pt-3 font-mono text-xs uppercase tracking-[0.2em] text-alu">
          {tel && <a href={tel}>{company.phone}</a>}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer">
              WhatsApp ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
