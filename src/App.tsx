import { AnimatePresence, MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CustomCursor } from './components/layout/CustomCursor'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { PageTransition } from './components/layout/PageTransition'
import { ScrollManager } from './components/layout/ScrollManager'
import { WhatsAppButton } from './components/layout/WhatsAppButton'
import { scrollToHash } from './lib/scroll'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="eyebrow fixed top-3 left-3 z-[60] -translate-y-24 bg-fog px-4 py-3 text-ink transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
          // The exiting page is still in the DOM during this callback, so a
          // section id it shares with the next page (e.g. #process) would
          // resolve to the wrong one — look it up once it has been removed.
          if (window.location.hash) scrollToHash(window.location.hash, 'smooth', 120)
        }}
      >
        <Suspense key={location.pathname} fallback={<div className="min-h-screen bg-ink" />}>
          <PageTransition>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
      <CustomCursor />
    </MotionConfig>
  )
}
