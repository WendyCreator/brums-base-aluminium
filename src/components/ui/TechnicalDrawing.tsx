import { motion, useReducedMotion } from 'framer-motion'

export type DrawingKind = 'profile' | 'mitre' | 'corner'

const STROKE = '#c9c7c1'
const ACCENT = '#e0a077'

const labels: Record<DrawingKind, string> = {
  profile: 'Fig. 01 — Profile section',
  mitre: 'Fig. 02 — 45° mitre cut',
  corner: 'Fig. 03 — Corner assembly',
}

/**
 * Line drawings used in the fabrication story. Illustrative only —
 * deliberately free of product dimensions or specifications.
 */
export function TechnicalDrawing({ kind, className = '' }: { kind: DrawingKind; className?: string }) {
  const reduced = useReducedMotion()
  const draw = {
    initial: reduced ? false : ({ pathLength: 0, opacity: 0 } as const),
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] as const },
  }

  return (
    <div className={`relative h-full w-full bg-ink-3 ${className}`}>
      {/* Drafting grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 m-auto h-[78%] w-[78%]" fill="none" role="img" aria-label={labels[kind]}>
        {kind === 'profile' && (
          <g strokeWidth="1.5" stroke={STROKE}>
            <motion.path {...draw} d="M90 110h220v200H90z" />
            <motion.path {...draw} d="M90 150h220M90 270h220M150 150v120M250 150v120" />
            <motion.path {...draw} d="M110 170h24v80h-24zM170 170h60v80h-60zM266 170h24v80h-24z" stroke={STROKE} opacity={0.7} />
            <motion.path {...draw} d="M110 110v-30h60v30M230 110v-30h60v30" />
            <motion.path {...draw} d="M170 80h60" stroke={ACCENT} />
            <motion.circle {...draw} cx="150" cy="96" r="6" stroke={ACCENT} />
            <motion.circle {...draw} cx="250" cy="96" r="6" stroke={ACCENT} />
            <motion.path {...draw} d="M70 110v200M64 110h12M64 310h12" strokeDasharray="3 4" opacity={0.6} />
            <motion.path {...draw} d="M90 340h220M90 334v12M310 334v12" strokeDasharray="3 4" opacity={0.6} />
          </g>
        )}
        {kind === 'mitre' && (
          <g strokeWidth="1.5" stroke={STROKE}>
            <motion.path {...draw} d="M60 140h200l60 60-60 60H60z" />
            <motion.path {...draw} d="M60 170h176M60 230h176" opacity={0.55} />
            <motion.path {...draw} d="M200 90l140 140" stroke={ACCENT} strokeDasharray="6 6" />
            <motion.path {...draw} d="M290 200a40 40 0 0 0-28-38" stroke={ACCENT} />
            <motion.path {...draw} d="M345 110l-30 30M330 95l30 30" stroke={ACCENT} opacity={0.8} />
          </g>
        )}
        {kind === 'corner' && (
          <g strokeWidth="1.5" stroke={STROKE}>
            <motion.path {...draw} d="M80 80h260v60H140v200H80z" />
            <motion.path {...draw} d="M80 80l60 60" />
            <motion.path {...draw} d="M100 100h110v24H124v110h-24z" stroke={ACCENT} strokeDasharray="5 5" />
            <motion.circle {...draw} cx="180" cy="112" r="4" stroke={ACCENT} />
            <motion.circle {...draw} cx="112" cy="180" r="4" stroke={ACCENT} />
            <motion.path {...draw} d="M340 110h30M140 340v30" opacity={0.5} />
          </g>
        )}
      </svg>
      <p className="absolute bottom-5 left-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-alu/70">{labels[kind]}</p>
    </div>
  )
}
