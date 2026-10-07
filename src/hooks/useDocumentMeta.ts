import { useEffect } from 'react'
import { siteUrl } from '../data/company'

const DEFAULT_TITLE = "Brum's Base Aluminium | Premium Aluminium Windows & Doors"
const DEFAULT_DESCRIPTION =
  'Premium aluminium windows, doors, sliding door systems and architectural aluminium solutions for modern residential and commercial spaces in Nigeria.'

const SITE_URL = siteUrl

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/** Per-route title, description, OG tags and (when a site URL is configured) canonical. */
export function useDocumentMeta({ title, description, path }: { title?: string; description?: string; path: string }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Brum's Base Aluminium` : DEFAULT_TITLE
    const desc = description ?? DEFAULT_DESCRIPTION
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', desc)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', desc)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', desc)

    if (SITE_URL) {
      const url = `${SITE_URL}${path}`
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = url
      setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    }
  }, [title, description, path])
}
