const WIDTHS = [480, 768, 1080, 1440, 1920, 2560]

const isUnsplash = (src: string) => src.startsWith('unsplash:')

/** Resolve a registry `src` to a concrete URL at a given width. */
export function imageUrl(src: string, width = 1440, quality = 72) {
  if (!isUnsplash(src)) return src
  const id = src.slice('unsplash:'.length)
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** Responsive srcset for registry images; undefined for plain URLs. */
export function imageSrcSet(src: string, maxWidth = 2560) {
  if (!isUnsplash(src)) return undefined
  return WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${imageUrl(src, w)} ${w}w`)
    .join(', ')
}
