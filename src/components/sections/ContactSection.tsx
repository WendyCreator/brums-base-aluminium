import { company, emailLink, mapsLink, telLink, whatsappLink } from '../../data/company'
import { ArrowUpRight } from '../ui/Icons'
import { FadeIn } from '../ui/Reveal'

type Row = { label: string; value: string; href: string | null; external?: boolean }

/** Contact details — only rows with verified values render. */
export function ContactDetails({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const rows: Row[] = []
  const tel = telLink()
  const wa = whatsappLink()
  const mail = emailLink()
  if (company.phone && tel) rows.push({ label: 'Phone', value: company.phone, href: tel })
  if (company.phone && wa) rows.push({ label: 'WhatsApp', value: company.phone, href: wa, external: true })
  if (company.email && mail) rows.push({ label: 'Email', value: company.email, href: mail })
  if (company.address)
    rows.push({ label: 'Workshop', value: `${company.address.line1}, ${company.address.line2}, ${company.address.city}`, href: mapsLink(), external: true })
  else rows.push({ label: 'Location', value: `${company.city}, ${company.country}`, href: null })

  const rule = tone === 'light' ? 'rule-light' : 'rule-dark'
  const muted = tone === 'light' ? 'text-mute' : 'text-mute-2'

  return (
    <ul className={`border-t ${rule}`}>
      {rows.map((r, i) => (
        <FadeIn as="li" key={r.label} delay={i * 0.05} className={`border-b ${rule}`}>
          {r.href ? (
            <a
              href={r.href}
              {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[9rem_1fr_auto]"
            >
              <span className={`eyebrow ${muted}`}>{r.label}</span>
              <span className={`font-semibold tracking-tight ${r.value.length > 30 ? 'text-base leading-snug sm:text-lg' : 'text-lg sm:text-xl'}`}>{r.value}</span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          ) : (
            <div className="grid grid-cols-[6.5rem_1fr] items-center gap-4 py-6 sm:grid-cols-[9rem_1fr]">
              <span className={`eyebrow ${muted}`}>{r.label}</span>
              <span className="text-lg font-semibold tracking-tight sm:text-xl">{r.value}</span>
            </div>
          )}
        </FadeIn>
      ))}
    </ul>
  )
}

/**
 * Location panel. A live Google embed was tried and rejected: it pins a
 * different business in the same plaza, so this shows the address on a
 * drafted site plan and links out to Google Maps instead.
 */
export function ContactMap() {
  const href = mapsLink()
  if (!company.address || !href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Open map ↗"
      className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden bg-ink-3 p-6 text-fog sm:aspect-[16/10] sm:p-8"
    >
      {/* Drafted street grid */}
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-60 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105" aria-hidden="true">
        <defs>
          <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect width="400" height="250" fill="url(#map-grid)" />
        <path d="M-10 170 C 90 150, 180 160, 410 110" stroke="rgba(255,255,255,0.22)" strokeWidth="10" fill="none" />
        <path d="M-10 170 C 90 150, 180 160, 410 110" stroke="#171717" strokeWidth="1" strokeDasharray="6 6" fill="none" />
        <path d="M150 -10 L 175 260" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
        <path d="M300 -10 L 290 260" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <path d="M-10 60 L 410 40" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <rect x="205" y="120" width="44" height="26" fill="none" stroke="#d4c2a2" strokeWidth="1.25" transform="rotate(-8 227 133)" />
        <circle cx="227" cy="133" r="3.5" fill="#d4c2a2" />
        <circle cx="227" cy="133" r="14" fill="none" stroke="#d4c2a2" strokeOpacity="0.4" />
        <text x="252" y="112" fill="rgba(255,255,255,0.4)" fontFamily="IBM Plex Mono, monospace" fontSize="7" letterSpacing="1.5">
          SARS ROAD
        </text>
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,23,0.2),rgba(23,23,23,0.85))]" />

      <p className="eyebrow relative text-champagne-2">Workshop</p>
      <div className="relative">
        <p className="text-2xl font-extrabold uppercase leading-none tracking-[-0.02em] sm:text-3xl">{company.address.line1}</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-alu">
          {company.address.line2}, {company.address.city}
        </p>
        <span className="eyebrow mt-6 inline-flex items-center gap-2 text-fog">
          Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  )
}
