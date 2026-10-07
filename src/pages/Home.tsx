import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { AboutSection } from '../components/sections/AboutSection'
import { BeforeAfterSection } from '../components/sections/BeforeAfter'
import { CTASection } from '../components/sections/CTASection'
import { Hero } from '../components/sections/Hero'
import { MaterialsSection } from '../components/sections/MaterialsSection'
import { MeasureSection } from '../components/sections/MeasureSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { SlidingDoorExperience } from '../components/sections/SlidingDoorExperience'
import { SolutionsSection } from '../components/sections/SolutionsSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { WhyUsSection } from '../components/sections/WhyUsSection'

export default function Home() {
  useDocumentMeta({ path: '/' })
  return (
    <>
      <Hero />
      <AboutSection />
      <SlidingDoorExperience />
      <SolutionsSection />
      <MaterialsSection />
      <ProjectsSection />
      <ProcessSection />
      <MeasureSection />
      <WhyUsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
