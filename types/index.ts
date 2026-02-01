// Navigation types
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

// Common component props
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Feature item for landing page
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Pricing plan
export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

// FAQ item
export interface FAQItem {
  question: string;
  answer: string;
}

// Testimonial
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}
