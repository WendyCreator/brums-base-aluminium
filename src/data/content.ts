import type { SiteImage } from './images'

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
   Finishes for the materials visualiser. Gradient stops drive the SVG
   frame. Confirm with the client which finishes they offer and remove
   the rest.
   ------------------------------------------------------------------ */
export type Finish = {
  id: string
  name: string
  note: string
  frame: { hi: string; mid: string; lo: string }
  /** Text tone that reads on the swatch */
  onSwatch: 'light' | 'dark'
}

export const finishes: Finish[] = [
  { id: 'matte-black', name: 'Matte Black', note: 'Deep, low-sheen, graphic.', frame: { hi: '#3b3b3b', mid: '#1e1e1e', lo: '#0e0e0e' }, onSwatch: 'light' },
  { id: 'anodised-silver', name: 'Anodised Silver', note: 'Natural brushed aluminium.', frame: { hi: '#ecebe8', mid: '#bdbcb8', lo: '#8f8e8a' }, onSwatch: 'dark' },
  { id: 'white', name: 'White', note: 'Clean and light-reflective.', frame: { hi: '#ffffff', mid: '#f0efeb', lo: '#d4d2cc' }, onSwatch: 'dark' },
  { id: 'champagne', name: 'Champagne', note: 'Soft, warm metallic.', frame: { hi: '#e6d8bc', mid: '#c4ad84', lo: '#94805a' }, onSwatch: 'dark' },
  { id: 'dark-bronze', name: 'Dark Bronze', note: 'Rich architectural warmth.', frame: { hi: '#6c5947', mid: '#46382c', lo: '#2a211a' }, onSwatch: 'light' },
  { id: 'anthracite', name: 'Anthracite', note: 'Contemporary dark grey.', frame: { hi: '#606265', mid: '#3e4043', lo: '#26282a' }, onSwatch: 'light' },
]

/* ------------------------------------------------------------------
   Process + principles
   ------------------------------------------------------------------ */
export type ProcessStep = { number: string; title: string; body: string }

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Measure', body: 'Understanding the space and project requirements.' },
  { number: '02', title: 'Design', body: 'Developing the appropriate aluminium and glass configuration.' },
  { number: '03', title: 'Fabricate', body: 'Precision fabrication and preparation.' },
  { number: '04', title: 'Finish', body: 'Careful assembly and finishing.' },
  { number: '05', title: 'Install', body: 'Professional installation at the project site.' },
]

export const principles = [
  { title: 'Precision', body: 'Every measurement, frame and installation is approached with attention to detail.' },
  { title: 'Durability', body: 'Solutions designed for long-term everyday use.' },
  { title: 'Craftsmanship', body: 'Technical fabrication combined with thoughtful architectural detailing.' },
  { title: 'Custom Solutions', body: 'Every project can be adapted to its space and requirements.' },
]

/* ------------------------------------------------------------------
   Navigation + form options
   ------------------------------------------------------------------ */
export type NavItem = { label: string; to: string }

export const mainNav: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Projects', to: '/projects' },
  { label: 'Process', to: '/#process' },
  { label: 'Contact', to: '/contact' },
]

export const footerSolutions: NavItem[] = [
  { label: 'Windows', to: '/solutions#aluminium-windows' },
  { label: 'Doors', to: '/solutions#aluminium-doors' },
  { label: 'Sliding Systems', to: '/solutions#sliding-systems' },
  { label: 'Curtain Walls', to: '/solutions#curtain-wall' },
  { label: 'Glass & Aluminium', to: '/solutions#glass-aluminium' },
]

export const projectTypes = ['Residential', 'Commercial', 'Renovation', 'Other'] as const

export const interestOptions = [
  'Aluminium Windows',
  'Aluminium Doors',
  'Sliding Doors',
  'Curtain Wall',
  'Glass & Aluminium',
  'Custom Fabrication',
  'Other',
] as const
