export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location?: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}
