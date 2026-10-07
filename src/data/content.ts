import type { SiteImage } from './images'
import { solutions } from './solutions'

/* ------------------------------------------------------------------
   Before / after — real project photo pairs.
   The section stays hidden while this list is empty.
   ------------------------------------------------------------------ */
export type BeforeAfterPair = {
  title: string
  before: SiteImage
  after: SiteImage
}

export const beforeAfterPairs: BeforeAfterPair[] = []

/* ------------------------------------------------------------------
   Finishes — confirmed by the Brum's Base team (Oct 2026).
   Availability can vary by project, so the UI says "we'll confirm".
   Gradient stops drive the SVG frame; colours on screen are indicative.
   ------------------------------------------------------------------ */
export type FrameTreatment = 'Powder-Coated' | 'Anodized' | 'Wood-Grain'

export type AluminiumFinish = {
  id: string
  name: string
  treatment: FrameTreatment
  /** Short caption under the name */
  type: string
  frame: { hi: string; mid: string; lo: string }
  /** Anodized reads as brushed metal; powder-coat as an even matte film */
  texture: 'matte' | 'brushed' | 'wood'
  /** Text tone that reads on the swatch */
  onSwatch: 'light' | 'dark'
}

export const aluminiumFinishes: AluminiumFinish[] = [
  // Powder-coated
  { id: 'pc-white', name: 'White', treatment: 'Powder-Coated', type: 'Powder-Coated', frame: { hi: '#ffffff', mid: '#f0efeb', lo: '#d4d2cc' }, texture: 'matte', onSwatch: 'dark' },
  { id: 'pc-black', name: 'Black', treatment: 'Powder-Coated', type: 'Powder-Coated', frame: { hi: '#3b3b3b', mid: '#1e1e1e', lo: '#0e0e0e' }, texture: 'matte', onSwatch: 'light' },
  { id: 'pc-bronze', name: 'Bronze', treatment: 'Powder-Coated', type: 'Powder-Coated', frame: { hi: '#6c5947', mid: '#46382c', lo: '#2a211a' }, texture: 'matte', onSwatch: 'light' },
  { id: 'pc-silver-grey', name: 'Silver Grey', treatment: 'Powder-Coated', type: 'Powder-Coated', frame: { hi: '#bcbfc2', mid: '#8f9396', lo: '#64686b' }, texture: 'matte', onSwatch: 'dark' },
  { id: 'pc-champagne-gold', name: 'Champagne Gold', treatment: 'Powder-Coated', type: 'Powder-Coated', frame: { hi: '#e6d8bc', mid: '#c4ad84', lo: '#94805a' }, texture: 'matte', onSwatch: 'dark' },
  // Anodized
  { id: 'an-natural-silver', name: 'Natural Silver', treatment: 'Anodized', type: 'Anodized', frame: { hi: '#ecebe8', mid: '#bdbcb8', lo: '#8f8e8a' }, texture: 'brushed', onSwatch: 'dark' },
  { id: 'an-bronze', name: 'Bronze', treatment: 'Anodized', type: 'Anodized', frame: { hi: '#947b5f', mid: '#6a553e', lo: '#3f3022' }, texture: 'brushed', onSwatch: 'light' },
  { id: 'an-black', name: 'Black', treatment: 'Anodized', type: 'Anodized', frame: { hi: '#55575a', mid: '#2c2d2f', lo: '#141516' }, texture: 'brushed', onSwatch: 'light' },
  // Wood-grain — confirmed available, but the team has not supplied a colour range
  { id: 'wood-grain', name: 'Wood-Grain', treatment: 'Wood-Grain', type: 'Available', frame: { hi: '#b08657', mid: '#8a6540', lo: '#5a3f26' }, texture: 'wood', onSwatch: 'light' },
]

export type GlassFinish = {
  id: string
  name: string
  /** Caption under the name, e.g. "Tinted" */
  type: string
  note: string
  /** Layer drawn over the view to show the finish */
  overlay: { background: string; blur?: number; inset?: string }
}

export const glassFinishes: GlassFinish[] = [
  { id: 'clear', name: 'Clear', type: 'Clear', note: 'Clean and transparent.', overlay: { background: 'transparent' } },
  { id: 'tint-bronze', name: 'Bronze', type: 'Tinted', note: 'A warm bronze tint.', overlay: { background: 'rgba(132, 92, 50, 0.42)' } },
  { id: 'tint-grey', name: 'Grey', type: 'Tinted', note: 'A neutral grey tint.', overlay: { background: 'rgba(72, 78, 84, 0.46)' } },
  { id: 'tint-green', name: 'Green', type: 'Tinted', note: 'A subtle green tint.', overlay: { background: 'rgba(52, 98, 78, 0.4)' } },
  { id: 'tint-blue', name: 'Blue', type: 'Tinted', note: 'A subtle blue tint.', overlay: { background: 'rgba(54, 92, 138, 0.4)' } },
  {
    id: 'reflective',
    name: 'Reflective',
    type: 'Reflective',
    note: 'A more reflective architectural finish.',
    overlay: { background: 'linear-gradient(135deg, rgba(226,234,242,0.62) 0%, rgba(120,138,158,0.4) 48%, rgba(214,224,234,0.58) 100%)' },
  },
  { id: 'frosted', name: 'Frosted / Obscure', type: 'Privacy', note: 'Greater visual privacy.', overlay: { background: 'rgba(255,255,255,0.38)', blur: 14 } },
  {
    id: 'laminated',
    name: 'Laminated',
    type: 'Project option',
    note: 'Available as a project option.',
    overlay: { background: 'rgba(206, 220, 230, 0.14)', inset: 'inset 0 0 0 3px rgba(255,255,255,0.28)' },
  },
]

/** Glass types supplied (distinct from the finishes above). */
export const glassTypes = ['Tempered Glass', 'Plain Glass', 'Reflective Glass'] as const

/* ------------------------------------------------------------------
   Process + principles
   ------------------------------------------------------------------ */
export type ProcessStep = { number: string; title: string; body: string }

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Measure', body: 'A free site measurement to understand the space and the project requirements.' },
  { number: '02', title: 'Design', body: 'Developing the appropriate aluminium and glass configuration.' },
  { number: '03', title: 'Fabricate', body: 'Aluminium frames fabricated in our workshop, with the glass supplied.' },
  { number: '04', title: 'Finish', body: 'Careful assembly and finishing in your chosen frame and glass finish.' },
  { number: '05', title: 'Install', body: 'Installation at the project site, followed by testing, adjustment and a final clean.' },
]

/** Only statements the Brum's Base team has confirmed. */
export const principles = [
  { title: 'Free site measurement', body: 'We measure the space on site before any quote is prepared, at no charge.' },
  { title: 'Quoted per project', body: 'Every quote reflects your dimensions, materials, finishes and scope.' },
  { title: 'Aluminium and glass', body: 'Frames and glazing from one workshop, with a choice of frame and glass finishes.' },
  { title: 'Made to fit', body: 'Custom fabrication for the opening in front of us, from windows and doors to sliding door systems and curtain walls.' },
]

/** Core values, as stated in the company profile. */
export const coreValues = ['Honesty', 'Integrity', 'Quality service', 'Excellent delivery'] as const

/** The two commercial facts confirmed by the team: measuring is free, pricing is per project. */
export const quoteTerms = [
  {
    title: 'Free site measurement',
    body: 'We provide free site measurements to help us understand your space and prepare an appropriate quotation for your project.',
  },
  {
    title: 'Quoted per project',
    body: 'Every project is assessed on its requirements, dimensions, materials, finishes and scope. A quote is prepared specifically for it.',
  },
]

/* ------------------------------------------------------------------
   Navigation + form options
   ------------------------------------------------------------------ */
export type NavItem = { label: string; to: string }

export const mainNav: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Finishes', to: '/#finishes' },
  { label: 'Projects', to: '/projects' },
  { label: 'Process', to: '/#process' },
  { label: 'Contact', to: '/contact' },
]

/** The six confirmed services, named exactly as on the Solutions page. */
export const footerSolutions: NavItem[] = solutions.map((s) => ({ label: s.title, to: `/solutions#${s.id}` }))

export const projectTypes = ['Residential', 'Commercial', 'Renovation', 'Other'] as const

/** Service required — same six names used everywhere else. */
export const interestOptions: string[] = solutions.map((s) => s.title)

export const frameFinishOptions = ['White', 'Black', 'Bronze', 'Silver Grey', 'Champagne Gold', 'Natural Silver', 'Wood-Grain', 'Not Sure Yet'] as const

export const glassFinishOptions = ['Clear', 'Bronze Tint', 'Grey Tint', 'Green Tint', 'Blue Tint', 'Reflective', 'Frosted / Obscure', 'Laminated', 'Not Sure Yet'] as const

/* ------------------------------------------------------------------
   Finishes → quote form. Lets the finishes section hand a visitor's
   selection to the quote form (via ?frame=…&glass=… on /contact).
   ------------------------------------------------------------------ */
export const frameQuoteOption: Record<string, (typeof frameFinishOptions)[number]> = {
  'pc-white': 'White',
  'pc-black': 'Black',
  'pc-bronze': 'Bronze',
  'pc-silver-grey': 'Silver Grey',
  'pc-champagne-gold': 'Champagne Gold',
  'an-natural-silver': 'Natural Silver',
  'an-bronze': 'Bronze',
  'an-black': 'Black',
  'wood-grain': 'Wood-Grain',
}

export const glassQuoteOption: Record<string, (typeof glassFinishOptions)[number]> = {
  clear: 'Clear',
  'tint-bronze': 'Bronze Tint',
  'tint-grey': 'Grey Tint',
  'tint-green': 'Green Tint',
  'tint-blue': 'Blue Tint',
  reflective: 'Reflective',
  frosted: 'Frosted / Obscure',
  laminated: 'Laminated',
}
