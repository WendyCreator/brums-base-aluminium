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
    slug: 'port-harcourt-residence',
    title: 'Port Harcourt Residence',
    location: 'Port Harcourt',
    category: 'Residential',
    scope: ['Aluminium windows', 'Entrance door', 'Sliding door systems'],
    summary: 'Custom aluminium windows and doors fabricated and installed for a modern Port Harcourt home.',
    description: [
      'A residential project in Port Harcourt where every opening was measured on site and fabricated to fit. Slim black aluminium frames keep the sightlines clean across the facade.',
      'From the entrance door through to the sliding panels at the rear, each element was built in the Brum\u2019s Base workshop and installed by the team.',
    ],
    cover: images.realProject1,
    gallery: [images.realProject2, images.realInstallWork, images.install, images.team],
    representative: false,
  },
  {
    slug: 'glazing-project',
    title: 'Aluminium Glazing Project',
    location: 'Rivers State',
    category: 'Commercial',
    scope: ['Curtain wall', 'Aluminium windows', 'Custom fabrication'],
    summary: 'Aluminium and glass installation across a commercial building in Rivers State.',
    description: [
      'A commercial glazing project requiring precise fabrication across multiple openings. Frames were cut and assembled in the workshop before being transported and installed on site.',
      'The brief called for a consistent aluminium finish across the facade, with each panel set to the same sightline depth.',
    ],
    cover: images.realProject2,
    gallery: [images.realProject1, images.realInstallWork, images.realIntro, images.install],
    representative: false,
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
