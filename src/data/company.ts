/**
 * Company facts. Only values the client has published are filled in —
 * phone + workshop address come from the client's existing site.
 * Anything set to `null` (or an empty list) is hidden from the UI until supplied.
 */
export const company = {
  name: "Brum's Base Aluminium",
  shortName: "Brum's Base",
  city: 'Port Harcourt',
  country: 'Nigeria',
  region: 'Rivers State',

  /** Display format */
  phone: '0702 657 6066' as string | null,
  /** Country code + number, digits only — used for tel: links */
  phoneIntl: '2347026576066' as string | null,
  /** Country code + number, digits only — used for wa.me links */
  whatsapp: '2347026576066' as string | null,
  whatsappMessage: "Hello, I'd like to discuss an aluminium project with Brum's Base Aluminium.",

  email: null as string | null, // "[CLIENT EMAIL]"

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
