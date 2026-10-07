import { Link } from 'react-router-dom'
import logoSrc from '../../assets/brand/logo-full.png'
import { company, emailLink, mapsLink, telLink, whatsappLink } from '../../data/company'
import { footerSolutions, mainNav } from '../../data/content'
import { WorkshopHours } from '../sections/ContactSection'
import { ArrowUpRight } from '../ui/Icons'

export function Footer() {
  const tel = telLink()
  const wa = whatsappLink()
  const mail = emailLink()
  const maps = mapsLink()

  return (
    <footer className="relative overflow-hidden bg-ink pt-24 text-fog sm:pt-32">
      <div className="shell">
        <div className="grid gap-14 border-b rule-dark pb-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-5">
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#f2f0ea]">
                <img src={logoSrc} alt="Brum's Base Aluminium logo" width={267} height={236} className="h-auto w-[76%]" />
              </span>
              <p className="max-w-[11rem] font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.2em] text-alu">Quality is everyone&rsquo;s responsibility</p>
            </div>
            <p className="eyebrow text-alu">Port Harcourt, Nigeria</p>
            <p className="mt-6 max-w-sm text-2xl font-semibold leading-snug tracking-tight text-fog sm:text-3xl">
              Aluminium windows, doors and architectural systems for modern spaces.
            </p>
            <Link to="/contact#quote" className="link-line mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em]">
              Start a project <ArrowUpRight />
            </Link>
          </div>

          <FooterColumn title="Navigate" className="lg:col-span-2">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-line">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Solutions" className="lg:col-span-2">
            {footerSolutions.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-line">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="lg:col-span-3">
            {tel && (
              <li>
                <a href={tel} className="link-line">
                  {company.phone}
                </a>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="link-line">
                  WhatsApp
                </a>
              </li>
            )}
            {mail && (
              <li>
                <a href={mail} className="link-line normal-case tracking-normal">
                  {company.email}
                </a>
              </li>
            )}
            {company.address && (
              <li className="normal-case tracking-normal">
                <a href={maps ?? undefined} target="_blank" rel="noopener noreferrer" className="block leading-relaxed text-alu hover:text-fog">
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                  <br />
                  {company.address.city}
                </a>
              </li>
            )}
            <li className="normal-case tracking-normal">
              <WorkshopHours className="text-alu" />
            </li>
            {company.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>
      </div>

      {/* Wordmark sign-off: one line, never wraps. Fills the width on phones; on larger screens it is
          capped (and scaled by viewport height too) so it stays smaller than the page headings. */}
      <div className="shell pt-12 sm:pt-16" aria-hidden="true">
        <p className="select-none whitespace-nowrap text-[clamp(2.1rem,13vw,3.5rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.05em] text-fog sm:text-[clamp(3.5rem,min(8vw,14vh),5.5rem)]">
          Brum&rsquo;s Base
        </p>
        <p className="mt-2 select-none whitespace-nowrap bg-[linear-gradient(90deg,#8e8c86,#e6e4de_40%,#9d9a93_70%,#d8d4ca)] bg-clip-text text-[clamp(1rem,6vw,1.75rem)] font-extrabold uppercase leading-none tracking-[0.34em] text-transparent sm:text-[clamp(1.25rem,min(3.2vw,5.5vh),2.5rem)]">
          Aluminium
        </p>
      </div>

      <div className="shell mt-12 flex flex-col gap-3 border-t rule-dark py-8 pr-20 sm:pr-24 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Brum&rsquo;s Base Aluminium. All rights reserved.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="link-line self-start sm:self-auto">
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

function FooterColumn({ title, className = '', children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="eyebrow text-mute-2">{title}</h2>
      <ul className="mt-6 space-y-3 text-sm font-medium uppercase tracking-[0.12em]">{children}</ul>
    </div>
  )
}
