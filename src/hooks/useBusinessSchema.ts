import { useEffect } from 'react'
import { company, siteUrl } from '../data/company'

/**
 * Injects schema.org LocalBusiness JSON-LD so search engines can show the
 * workshop's address, hours and phone. Built only from verified company facts;
 * url/logo are added once a real site URL is configured.
 */
export function useBusinessSchema() {
  useEffect(() => {
    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: company.name,
      description: 'Aluminium windows, doors, sliding door systems, curtain walls, glass and aluminium work, and custom fabrication in Port Harcourt, Nigeria.',
      founder: { '@type': 'Person', honorificPrefix: 'Mr', name: company.founder.replace(/^Mr\s+/i, '') },
      ...(company.phoneIntl ? { telephone: `+${company.phoneIntl}` } : null),
      ...(company.email ? { email: company.email } : null),
      ...(company.address
        ? {
            address: {
              '@type': 'PostalAddress',
              streetAddress: `${company.address.line1}, ${company.address.line2}`,
              addressLocality: company.city,
              addressRegion: company.region,
              addressCountry: 'NG',
            },
          }
        : null),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
      ...(siteUrl ? { url: siteUrl, logo: `${siteUrl}/apple-touch-icon.png` } : null),
    }

    let el = document.getElementById('ld-business') as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = 'ld-business'
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
  }, [])
}
