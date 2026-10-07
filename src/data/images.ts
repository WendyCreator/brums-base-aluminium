/**
 * Central image registry. Every photo on the site is referenced from here,
 * so swapping stock photography for real Brum's Base project photos is a
 * one-file change.
 *
 * `src` accepts either `unsplash:<photo-id>` (responsive srcset is generated)
 * or any normal URL / imported local asset, e.g.
 *   import frontDoor from '../assets/images/front-door.jpg'
 *   doors: { src: frontDoor, alt: '...' }
 */
import teamPhoto from '../assets/brand/team.jpg'
import installPhoto from '../assets/brand/install.jpg'

export type SiteImage = {
  src: string
  alt: string
  /** Focal point for object-position, e.g. '50% 40%' */
  focus?: string
}

const u = (id: string, alt: string, focus?: string): SiteImage => ({ src: `unsplash:${id}`, alt, focus })

export const images = {
  /** REAL photo — the crew fitting black aluminium frames on site; still from the company's own Instagram (@brums_aluminum, 29 Apr 2026). 640px source. */
  install: { src: installPhoto, alt: "Brum's Base crew fitting black aluminium frames on a building under scaffolding", focus: '40% 50%' } satisfies SiteImage,
  /** REAL photo — from the company profile (Oct 2026). Most other images here are still stock. */
  team: { src: teamPhoto, alt: "The Brum's Base team in branded hard hats and high-visibility vests in front of the company sign", focus: '50% 30%' } satisfies SiteImage,
  hero: u('1600585154340-be6161a56a0c', 'Contemporary house at dusk with floor-to-ceiling glazing glowing from within', '50% 55%'),
  terrace: u('1512917774080-9991f1c4c750', 'Sunlit terrace and pool beyond a wide glazed opening', '50% 60%'),
  terraceAlt: u('1602343168117-bb8ffe3e2e9f', 'Pool terrace in front of a two-storey house with large glazed openings', '50% 50%'),
  intro: u('1600573472592-401b489a3cdc', 'Modern facade with full-height glazing and a perforated screen', '50% 45%'),
  windows: u('1600047509807-ba8f99d2cdde', 'Modern house with dark-framed aluminium windows', '50% 45%'),
  doors: u('1600585154526-990dced4db0d', 'Dark facade with a glazed entrance lit warmly at night', '40% 50%'),
  sliding: u('1600573472550-8090b5e0745e', 'Interior opening onto a pool through wide sliding glass panels', '50% 50%'),
  curtainWall: u('1486406146926-c627a92ad1ab', 'Looking up at glass curtain-wall towers', '50% 50%'),
  glass: u('1600573472556-e636c2acda88', 'Glazed ground floor with slim frames beneath a timber facade', '50% 50%'),
  fabrication: u('1530124566582-a618bc2615dc', 'Workshop tools laid out ready for fabrication', '50% 50%'),
  residence: u('1600585153490-76fb20a32601', 'Two-storey dark residence with tall vertical glazing', '50% 55%'),
  pavilion: u('1600607688969-a5bfcd646154', 'Timber and black-framed house opening onto a lawn', '50% 50%'),
  villa: u('1580587771525-78b9dba3b914', 'White villa with continuous ribbon glazing above a pool', '50% 50%'),
  courtyard: u('1600566753190-17f0baa2a6c3', 'Courtyard house with timber screens and glazed openings', '50% 50%'),
  office: u('1497366216548-37526070297c', 'Office interior with glazed partitions', '50% 50%'),
  tower: u('1511818966892-d7d671e672a2', 'Glass towers rising into an overcast sky', '50% 50%'),
  interior: u('1600607687939-ce8a6c25118c', 'Living space with slim-framed glazing and warm timber', '50% 50%'),
  livingGlass: u('1600210492486-724fe5c67fb0', 'Bright living room with floor-to-ceiling windows', '50% 50%'),
  bedroom: u('1600607687644-c7171b42498f', 'Bedroom opening onto a garden through black-framed doors', '50% 50%'),
  whiteHouse: u('1613977257363-707ba9348227', 'White contemporary house with a glazed ground floor', '50% 55%'),
  facadeDetail: u('1545324418-cc1a3fa10c00', 'Apartment facade with a rhythm of aluminium-framed windows', '50% 50%'),
  cta: u('1431576901776-e539bd916ba2', 'Glass towers converging overhead', '50% 50%'),
} satisfies Record<string, SiteImage>
