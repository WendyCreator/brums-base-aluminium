/**
 * Only real client testimonials, added with the client's permission.
 * The testimonials section stays hidden while this list is empty.
 */
export type Testimonial = {
  quote: string
  name: string
  /** e.g. "Residential · Port Harcourt" */
  context?: string
}

export const testimonials: Testimonial[] = []
