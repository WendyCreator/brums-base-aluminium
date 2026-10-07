import { images, type SiteImage } from './images'

export type Solution = {
  id: string
  number: string
  title: string
  short: string
  description: string
  applications: string[]
  image: SiteImage
}

export const solutions: Solution[] = [
  {
    id: 'aluminium-windows',
    number: '01',
    title: 'Aluminium Windows',
    short: 'Slim sightlines, generous light.',
    description:
      'Casement, fixed and sliding window configurations fabricated to the measured opening, with frames kept slim so the glass does the work.',
    applications: ['Casement', 'Fixed light', 'Sliding', 'Projected', 'Tilt and turn', 'Vertical sliding'],
    image: images.windows,
  },
  {
    id: 'aluminium-doors',
    number: '02',
    title: 'Aluminium Doors',
    short: 'A strong first threshold.',
    description:
      'Entrance, hinged and frameless door systems that pair a solid frame with clean architectural detailing.',
    applications: ['Entrance doors', 'Single & double hinged', 'Frameless doors', 'Swing doors'],
    image: images.doors,
  },
  {
    id: 'sliding-systems',
    number: '03',
    title: 'Sliding Door Systems',
    short: 'Wide openings, quietly resolved.',
    description:
      'Large glass panels that open a room to the terrace, garden or balcony — and close it again in one smooth movement.',
    applications: ['Patio doors', 'Bi-fold doors', 'Terrace access', 'Balcony access'],
    image: images.sliding,
  },
  {
    id: 'curtain-wall',
    number: '04',
    title: 'Curtain Wall Systems',
    short: 'Facades built in line.',
    description:
      'Aluminium-framed glazed facades for commercial and multi-storey buildings, set out to a clear grid and rhythm.',
    applications: ['Glazed facades', 'Multi-storey buildings', 'Commercial buildings', 'Hotels & offices'],
    image: images.curtainWall,
  },
  {
    id: 'glass-aluminium',
    number: '05',
    title: 'Glass & Aluminium',
    short: 'Light held in a precise frame.',
    description:
      'Aluminium and glass working together as one element, with tempered, plain and reflective glass available. Finishes are chosen per project.',
    applications: ['Partition walls', 'Glass railings', 'Shower enclosures', 'Frameless glass doors'],
    image: images.glass,
  },
  {
    id: 'custom-fabrication',
    number: '06',
    title: 'Custom Fabrication',
    short: 'Made for the opening in front of us.',
    description:
      'When a standard configuration does not fit, we work from the dimensions and intended use to fabricate a solution for that specific space.',
    applications: ['Non-standard openings', 'Bespoke frames', 'Special details', 'Replacements'],
    image: images.fabrication,
  },
]
