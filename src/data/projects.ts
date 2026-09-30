import { images, type SiteImage } from './images'

/**
 * PLACEHOLDER PORTFOLIO.
 * Titles are descriptive (not real project names) and imagery is
 * representative stock. Replace each entry with the client's real projects,
 * keeping the same shape, and set `representative: false`.
 */
export type ProjectCategory = 'Residential' | 'Commercial' | 'Renovation'

export type Project = {
  slug: string
  title: string
  location: string
  category: ProjectCategory
  scope: string[]
  summary: string
  description: string[]
  cover: SiteImage
  gallery: SiteImage[]
  representative: boolean
}

export const projects: Project[] = [
  {
    slug: 'modern-residence',
    title: 'Modern Residence',
    location: 'Port Harcourt',
    category: 'Residential',
    scope: ['Sliding door systems', 'Aluminium windows', 'Entrance door'],
    summary: 'Tall vertical glazing and wide sliding openings for a contemporary family home.',
    description: [
      'A two-storey home designed around light. Full-height sliding panels open the ground floor to the garden, while tall fixed windows bring daylight deep into the stair and upper rooms.',
      'Frames are kept slim and dark so the glazing reads as one continuous surface across the facade.',
    ],
    cover: images.residence,
    gallery: [images.interior, images.bedroom, images.livingGlass, images.windows],
    representative: true,
  },
  {
    slug: 'garden-pavilion',
    title: 'Garden Pavilion',
    location: 'Port Harcourt',
    category: 'Residential',
    scope: ['Multi-track sliding doors', 'Fixed glazing'],
    summary: 'A ground floor that opens completely onto the lawn.',
    description: [
      'A living space that becomes part of the garden. Multi-track sliding panels stack to one side, leaving the opening almost entirely clear.',
      'Closed, the same panels form a single glass line with minimal interruption.',
    ],
    cover: images.pavilion,
    gallery: [images.sliding, images.terrace, images.interior, images.glass],
    representative: true,
  },
  {
    slug: 'commercial-facade',
    title: 'Commercial Facade',
    location: 'Rivers State',
    category: 'Commercial',
    scope: ['Curtain wall', 'Shopfront', 'Glazed partitions'],
    summary: 'A glazed commercial frontage set out to a clear, repeating grid.',
    description: [
      'A commercial frontage where the facade grid aligns with the floors, columns and signage zones behind it.',
      'Aluminium mullions and transoms follow a consistent rhythm, with glazed partitions continuing the same language inside.',
    ],
    cover: images.tower,
    gallery: [images.curtainWall, images.office, images.facadeDetail, images.cta],
    representative: true,
  },
  {
    slug: 'poolside-villa',
    title: 'Poolside Villa',
    location: 'Port Harcourt',
    category: 'Residential',
    scope: ['Sliding door systems', 'Ribbon windows', 'Balcony glazing'],
    summary: 'Ribbon glazing and sliding openings that frame the pool terrace.',
    description: [
      'Continuous ribbon windows on the upper floor and wide sliding panels below connect every main room to the terrace and pool.',
      'Balcony glazing keeps views open while providing a secure edge.',
    ],
    cover: images.villa,
    gallery: [images.terraceAlt, images.whiteHouse, images.sliding, images.livingGlass],
    representative: true,
  },
  {
    slug: 'courtyard-renovation',
    title: 'Courtyard Renovation',
    location: 'Port Harcourt',
    category: 'Renovation',
    scope: ['Window replacement', 'Glazed doors', 'Custom fabrication'],
    summary: 'Existing openings refitted with new aluminium frames and glazing.',
    description: [
      'An existing home refitted with new aluminium windows and glazed doors, each fabricated to the measured opening rather than a standard size.',
      'Non-standard openings around the courtyard are resolved with custom frames.',
    ],
    cover: images.courtyard,
    gallery: [images.glass, images.intro, images.bedroom, images.interior],
    representative: true,
  },
]

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)

export const hasRepresentativeProjects = projects.some((p) => p.representative)
