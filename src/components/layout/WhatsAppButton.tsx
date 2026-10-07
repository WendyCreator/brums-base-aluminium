import { motion } from 'framer-motion'
import { whatsappLink } from '../../data/company'
import { WhatsAppIcon } from '../ui/Icons'

/** Small floating WhatsApp link; label expands on hover/focus. Hidden if no number is configured. */
export function WhatsAppButton() {
  const href = whatsappLink()
  if (!href) return null

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-cursor="Chat"
      className="group fixed right-4 bottom-4 z-30 flex h-12 items-center overflow-hidden rounded-full border border-white/15 bg-ink/85 pr-0 text-fog shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[padding,background-color] duration-500 hover:bg-ink focus-visible:pr-5 sm:right-6 sm:bottom-6 sm:hover:pr-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center text-[#6fd39a]">
        <WhatsAppIcon className="h-5 w-5" />
      </span>
      <span className="eyebrow grid grid-cols-[0fr] text-[0.65rem] transition-[grid-template-columns] duration-500 group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden leading-tight whitespace-nowrap">
          <span className="block">Chat on WhatsApp</span>
          <span className="mt-0.5 block text-[0.58rem] text-alu">Discuss your project →</span>
        </span>
      </span>
    </motion.a>
  )
}
