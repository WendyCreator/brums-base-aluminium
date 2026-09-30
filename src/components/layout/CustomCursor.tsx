import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'

type CursorState = { mode: 'idle' | 'hover' | 'label'; label?: string }

/**
 * Desktop-only cursor: a small dot that grows into a ring over interactive
 * elements, and into a labelled disc over anything with `data-cursor`.
 * Never rendered on touch devices.
 */
export function CustomCursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, reduced ? { stiffness: 2000, damping: 100 } : { stiffness: 700, damping: 45, mass: 0.35 })
  const sy = useSpring(y, reduced ? { stiffness: 2000, damping: 100 } : { stiffness: 700, damping: 45, mass: 0.35 })
  const [state, setState] = useState<CursorState>({ mode: 'idle' })
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!fine) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    let lastTarget: Element | null = null
    const read = (target: Element | null) => {
      const labelled = target?.closest<HTMLElement>('[data-cursor]')
      if (labelled?.dataset.cursor) {
        setState((s) => (s.mode === 'label' && s.label === labelled.dataset.cursor ? s : { mode: 'label', label: labelled.dataset.cursor }))
        return
      }
      const interactive = target?.closest('a, button, [role="button"], input, select, textarea, label')
      setState((s) => {
        const mode = interactive ? 'hover' : 'idle'
        return s.mode === mode ? s : { mode }
      })
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      lastTarget = e.target as Element | null
      read(lastTarget)
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    // Labels can change on click (e.g. the door: Open → Close), so re-read
    const onUp = () => {
      setPressed(false)
      window.setTimeout(() => read(lastTarget), 60)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [fine, x, y])

  if (!fine) return null

  const size = state.mode === 'label' ? 92 : state.mode === 'hover' ? 44 : 8
  const scale = pressed ? 0.85 : 1

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-normal"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          state.mode === 'label'
            ? 'bg-fog/95 text-ink backdrop-blur-sm'
            : state.mode === 'hover'
              ? 'border border-champagne-2/80 bg-transparent'
              : 'bg-fog mix-blend-difference'
        }`}
        animate={{ width: size, height: size, scale }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      >
        <AnimatePresence>
          {state.mode === 'label' && (
            <motion.span
              key={state.label}
              className="eyebrow px-2 text-center text-[0.6rem] leading-tight"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
