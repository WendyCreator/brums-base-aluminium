import { Button } from '../components/ui/Button'
import { RevealLines } from '../components/ui/Reveal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found', path: '/404' })
  return (
    <section className="flex min-h-[80svh] items-end bg-ink pt-40 pb-20 text-fog">
      <div className="shell">
        <p className="eyebrow text-champagne-2">404</p>
        <RevealLines as="h1" immediate lines={['This opening', "isn't framed", 'yet.']} className="display-lg mt-6" />
        <div className="mt-10">
          <Button to="/" variant="light">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}
