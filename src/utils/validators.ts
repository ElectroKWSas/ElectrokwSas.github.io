export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^(\+57\s?)?3\d{9}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value.trim().replace(/[\s-]/g, ""));
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function minLength(value: string, length: number): boolean {
  return value.trim().length >= length;
}
