import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { company, formEndpoint, whatsappLink } from '../../data/company'
import { frameFinishOptions, glassFinishOptions, interestOptions, projectTypes } from '../../data/content'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'

type FormState = {
  name: string
  phone: string
  email: string
  location: string
  projectType: string
  interests: string[]
  frameFinish: string
  glassFinish: string
  siteMeasurement: boolean
  description: string
}

const empty: FormState = { name: '', phone: '', email: '', location: '', projectType: '', interests: [], frameFinish: '', glassFinish: '', siteMeasurement: false, description: '' }

type Status = 'idle' | 'sending' | 'sent' | 'handed-off' | 'error'

/** Pre-select finishes chosen in the finishes section (?frame=…&glass=…&treatment=…). Only known option values are accepted. */
function fromSearch(params: URLSearchParams): FormState {
  const frame = params.get('frame') ?? ''
  const glass = params.get('glass') ?? ''
  const frameFinish = (frameFinishOptions as readonly string[]).includes(frame) ? frame : ''
  const glassFinish = (glassFinishOptions as readonly string[]).includes(glass) ? glass : ''
  // The frame list doesn't distinguish anodized from powder-coated Bronze/Black — keep that detail.
  const description = frameFinish && params.get('treatment') === 'Anodized' ? `Frame finish: Anodized ${frameFinish}.` : ''
  return { ...empty, frameFinish, glassFinish, description }
}

function buildMessage(f: FormState) {
  const lines = [`Hello ${company.name}, I'd like to request a quote.`, '', `Name: ${f.name}`, `Phone: ${f.phone}`]
  if (f.email) lines.push(`Email: ${f.email}`)
  if (f.location) lines.push(`Project location: ${f.location}`)
  if (f.projectType) lines.push(`Project type: ${f.projectType}`)
  if (f.interests.length > 0) lines.push(`Service required: ${f.interests.join(', ')}`)
  if (f.frameFinish) lines.push(`Preferred frame finish: ${f.frameFinish}`)
  if (f.glassFinish) lines.push(`Preferred glass finish: ${f.glassFinish}`)
  if (f.siteMeasurement) lines.push('I would like to book a free site measurement.')
  if (f.description.trim()) lines.push('', `Project details: ${f.description.trim()}`)
  return lines.join('\n')
}

/**
 * Quote request form.
 * - With VITE_FORM_ENDPOINT set (e.g. Formspree), it POSTs the enquiry.
 * - Without one, it never pretends to send: it opens WhatsApp with the
 *   enquiry pre-written so the visitor sends it themselves.
 */
export function QuoteForm() {
  const [params] = useSearchParams()
  const [form, setForm] = useState<FormState>(() => fromSearch(params))
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const canHandOff = !formEndpoint && Boolean(company.whatsapp)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Please tell us your name.'
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) e.phone = 'Please enter a phone number we can reach you on.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email address looks incomplete.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) {
      // Wait for the error state to render, then move focus to the first problem
      requestAnimationFrame(() => document.querySelector<HTMLElement>('form [aria-invalid="true"]')?.focus())
      return
    }

    if (formEndpoint) {
      setStatus('sending')
      try {
        const res = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, interests: form.interests.join(', '), siteMeasurement: form.siteMeasurement ? 'Yes' : 'No', _subject: `Quote request — ${form.name}` }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
        setForm(empty)
      } catch {
        setStatus('error')
      }
      return
    }

    const link = whatsappLink(buildMessage(form))
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
      setStatus('handed-off')
    } else {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <Confirmation title="Request received." body="Thank you — your project details have been sent. We'll be in touch to talk it through." onReset={() => setStatus('idle')} />
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
      <Field label="Name" required error={errors.name}>
        {(id, describedBy) => (
          <input id={id} aria-describedby={describedBy} aria-invalid={Boolean(errors.name)} autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} />
        )}
      </Field>
      <Field label="Phone" required error={errors.phone}>
        {(id, describedBy) => (
          <input id={id} aria-describedby={describedBy} aria-invalid={Boolean(errors.phone)} type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} />
        )}
      </Field>
      <Field label="Email" error={errors.email}>
        {(id, describedBy) => (
          <input id={id} aria-describedby={describedBy} aria-invalid={Boolean(errors.email)} type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} />
        )}
      </Field>
      <Field label="Project location">
        {(id) => <input id={id} placeholder="e.g. GRA, Port Harcourt" value={form.location} onChange={(e) => set('location', e.target.value)} className={inputClass} />}
      </Field>

      <ChipGroup legend="Project type" className="sm:col-span-2">
        {projectTypes.map((t) => (
          <Chip key={t} type="radio" name="projectType" label={t} checked={form.projectType === t} onChange={() => set('projectType', t)} />
        ))}
      </ChipGroup>

      <ChipGroup legend="Service required" hint="Select all that apply" className="sm:col-span-2">
        {interestOptions.map((opt) => (
          <Chip
            key={opt}
            type="checkbox"
            name="interests"
            label={opt}
            checked={form.interests.includes(opt)}
            onChange={() => set('interests', form.interests.includes(opt) ? form.interests.filter((i) => i !== opt) : [...form.interests, opt])}
          />
        ))}
      </ChipGroup>

      <Field label="Preferred frame finish">
        {(id) => (
          <select id={id} value={form.frameFinish} onChange={(e) => set('frameFinish', e.target.value)} className={selectClass}>
            <option value="">Select a finish</option>
            {frameFinishOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field label="Preferred glass finish">
        {(id) => (
          <select id={id} value={form.glassFinish} onChange={(e) => set('glassFinish', e.target.value)} className={selectClass}>
            <option value="">Select a finish</option>
            {glassFinishOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}
      </Field>

      <div className="sm:col-span-2">
        <Chip type="checkbox" name="siteMeasurement" label="Book a free site measurement" checked={form.siteMeasurement} onChange={() => set('siteMeasurement', !form.siteMeasurement)} />
      </div>

      <Field label="Project description" className="sm:col-span-2">
        {(id) => (
          <textarea
            id={id}
            rows={5}
            placeholder="Openings, approximate sizes, timeline — whatever you know so far."
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className={`${inputClass} resize-y`}
          />
        )}
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.82rem] leading-relaxed text-ink/55">
          {canHandOff
            ? 'Your request opens in WhatsApp, pre-written and ready for you to send.'
            : 'We use your details only to respond to this enquiry.'}
        </p>
        <Button type="submit" variant="dark" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Request my quote'}
        </Button>
      </div>

      <AnimatePresence>
        {status === 'handed-off' && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 border border-ink/15 bg-paper p-5 text-sm leading-relaxed sm:col-span-2"
          >
            <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#1f9d57]" />
            <p>
              WhatsApp should now be open with your request written out. <strong>Press send in WhatsApp</strong> to deliver it. If nothing opened,{' '}
              <a className="underline underline-offset-4" href={whatsappLink(buildMessage(form)) ?? undefined} target="_blank" rel="noopener noreferrer">
                open it here
              </a>
              .
            </p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[#a33a2a] sm:col-span-2">
            Something went wrong sending your request.{company.phone ? ` Please call us on ${company.phone} or message us on WhatsApp.` : ' Please try again.'}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

const selectClass =
  'block w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink transition-colors focus:border-ink focus:outline-none focus:ring-0'

const inputClass =
  'block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/35 transition-colors focus:border-ink focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#a33a2a]'

function Field({ label, required, error, className = '', children }: { label: string; required?: boolean; error?: string; className?: string; children: (id: string, describedBy?: string) => ReactNode }) {
  const id = useId()
  const errId = `${id}-err`
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow block text-mute">
        {label}
        {required && <span className="text-champagne"> *</span>}
      </label>
      <div className="mt-2">{children(id, error ? errId : undefined)}</div>
      {error && (
        <p id={errId} className="mt-2 text-[0.82rem] text-[#a33a2a]">
          {error}
        </p>
      )}
    </div>
  )
}

function ChipGroup({ legend, hint, className = '', children }: { legend: string; hint?: string; className?: string; children: ReactNode }) {
  return (
    <fieldset className={className}>
      <legend className="eyebrow text-mute">
        {legend}
        {hint && <span className="ml-3 normal-case tracking-normal text-ink/40">{hint}</span>}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

function Chip({ type, name, label, checked, onChange }: { type: 'radio' | 'checkbox'; name: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="relative cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex min-h-11 items-center border border-ink/20 px-4 text-sm font-medium transition-colors duration-300 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-fog peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne hover:border-ink/60">
        {label}
      </span>
    </label>
  )
}

function Confirmation({ title, body, onReset }: { title: string; body: string; onReset: () => void }) {
  return (
    <motion.div role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border-t border-ink/15 pt-10">
      <p className="display-md">{title}</p>
      <p className="lede mt-6 max-w-md text-ink/70">{body}</p>
      <button type="button" onClick={onReset} className="link-line eyebrow mt-8 text-ink">
        Send another request
      </button>
    </motion.div>
  )
}
