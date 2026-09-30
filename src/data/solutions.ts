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
    applications: ['Casement', 'Fixed lights', 'Sliding windows', 'Projected'],
    image: images.windows,
  },
  {
    id: 'aluminium-doors',
    number: '02',
    title: 'Aluminium Doors',
    short: 'A strong first threshold.',
    description:
      'Entrance, hinged and french door systems that pair a solid, secure frame with clean architectural detailing.',
    applications: ['Entrance doors', 'Hinged doors', 'French doors', 'Glazed partitions'],
    image: images.doors,
  },
  {
    id: 'sliding-systems',
    number: '03',
    title: 'Sliding Door Systems',
    short: 'Wide openings, quietly resolved.',
    description:
      'Large glass panels on precision tracks that open a room to the terrace, garden or balcony — and close it again in one smooth movement.',
    applications: ['Two-panel', 'Multi-track', 'Stacking', 'Balcony access'],
    image: images.sliding,
  },
  {
    id: 'curtain-wall',
    number: '04',
    title: 'Curtain Wall Systems',
    short: 'Facades built in line.',
    description:
      'Aluminium-framed glazed facades for commercial and multi-storey buildings, set out to a clear grid and rhythm.',
    applications: ['Glazed facades', 'Shopfronts', 'Stairwells', 'Atria'],
    image: images.curtainWall,
  },
  {
    id: 'glass-aluminium',
    number: '05',
    title: 'Glass & Aluminium',
    short: 'Light held in a precise frame.',
    description:
      'Partitions, balustrades, canopies and glazed screens where aluminium and glass work together as one architectural element.',
    applications: ['Partitions', 'Balustrades', 'Canopies', 'Screens'],
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
