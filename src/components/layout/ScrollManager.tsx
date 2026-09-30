import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToHash } from '../../lib/scroll'

/**
 * Handles hash scrolling on first load and for same-page hash links.
 * Cross-page navigation is handled by App once the outgoing page has
 * finished its exit — otherwise a section id shared by both pages
 * (e.g. #process) would resolve against the page that is leaving.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    const firstRender = lastPath.current === null
    const samePage = lastPath.current === pathname
    lastPath.current = pathname
    if (hash && (firstRender || samePage)) scrollToHash(hash, firstRender ? 'auto' : 'smooth')
  }, [pathname, hash])

  return null
}
