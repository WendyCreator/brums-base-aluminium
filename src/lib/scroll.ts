/**
 * Scroll to `#id` once it exists — the incoming page may still be mounting
 * (lazy chunk). `delay` lets a just-exited page leave the DOM first.
 */
export function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth', delay = 0) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  let tries = 0
  const tick = () => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior, block: 'start' })
    else if (tries++ < 30) window.setTimeout(tick, 80)
  }
  if (delay) window.setTimeout(tick, delay)
  else tick()
}
