import type { ServiceCategory } from "./service";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  serviceType: ServiceCategory | "otro";
  message: string;
}

export interface ContactSubmissionPayload extends ContactFormData {
  date: string;
  time: string;
  ip: string;
  source: string;
}
