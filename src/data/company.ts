/**
 * Company facts. Only values the client has published are filled in —
 * phone + workshop address come from the client's existing site.
 * Anything set to `null` (or an empty list) is hidden from the UI until supplied.
 */
export const company = {
  name: "Brum's Base Aluminium",
  shortName: "Brum's Base",
  /** Verified by the Brum's Base team */
  founder: 'Mr Brume Edema',
  city: 'Port Harcourt',
  country: 'Nigeria',
  region: 'Rivers State',

  /** Calls. Display format */
  phone: '0702 657 6066' as string | null,
  /** Country code + number, digits only — used for tel: links */
  phoneIntl: '2347026576066' as string | null,
  /** WhatsApp number supplied by the team (Oct 2026). Digits only — used for wa.me links */
  whatsapp: '2349162624051' as string | null,
  /** Display format. Shown sparingly — the UI prefers a "WhatsApp" label over the raw number. */
  whatsappDisplay: '+234 916 262 4051' as string | null,
  whatsappMessage: "Hello, I'd like to enquire about an aluminium project with Brum's Base Aluminium.",

  /**
   * Published on the back page of the company profile and approved for the site
   * by Wendy (Oct 2026). Do not invent other addresses (hello@, info@) — set
   * null to hide every email line in the UI.
   */
  email: 'brume.ed@brumsbase.com' as string | null,

  workshopHours: {
    days: 'Monday – Saturday',
    daysShort: 'Mon – Sat',
    time: '8:00 AM – 5:00 PM',
    sunday: 'Closed',
  },

  address: {
    line1: 'Mall Flora Plaza',
    line2: 'Opposite PHED transmission center, Sars Road',
    city: 'Port Harcourt, Rivers State',
    mapsQuery: 'Mall Flora Plaza, opposite PHED transmission center, Sars Road, Port Harcourt, Rivers State, Nigeria',
  } as { line1: string; line2: string; city: string; mapsQuery: string } | null,

  /** Verified figures only. While null, qualitative statements are shown instead. */
  established: null as number | null,
  projectsCompleted: null as number | null,

  /** Only add real, client-supplied profile links. */
  socials: [] as { label: string; href: string }[],
}

/** Real domain, no trailing slash — set VITE_SITE_URL at build time. Empty = no canonical/OG url tags. */
export const siteUrl = ((import.meta.env.VITE_SITE_URL as string | undefined) || '').replace(/\/$/, '')

export const formEndpoint = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || null

export function whatsappLink(message: string = company.whatsappMessage) {
  if (!company.whatsapp) return null
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}

export function telLink() {
  return company.phoneIntl ? `tel:+${company.phoneIntl}` : null
}

export function emailLink() {
  return company.email ? `mailto:${company.email}` : null
}

export function mapsLink() {
  return company.address ? `https://maps.google.com/?q=${encodeURIComponent(company.address.mapsQuery)}` : null
}
