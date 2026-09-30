import { useState } from 'react'
import type { SiteImage } from '../../data/images'
import { imageSrcSet, imageUrl } from '../../lib/image'

type ImgProps = {
  image: SiteImage
  /** `sizes` attribute — describe how wide the image renders */
  sizes?: string
  /** Above-the-fold images load eagerly with high priority */
  priority?: boolean
  className?: string
  /** Override the alt text (e.g. '' for decorative repeats) */
  alt?: string
}

/** Responsive, lazy-loaded image that fades in once decoded. */
export function Img({ image, sizes = '100vw', priority = false, className = '', alt }: ImgProps) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={imageUrl(image.src)}
      srcSet={imageSrcSet(image.src)}
      sizes={sizes}
      alt={alt ?? image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      ref={(el) => {
        // Cached images may finish before React attaches onLoad
        if (el?.complete && el.naturalWidth > 0 && !loaded) setLoaded(true)
      }}
      style={{ objectPosition: image.focus }}
      className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}
