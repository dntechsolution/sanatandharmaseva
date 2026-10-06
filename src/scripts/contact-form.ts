export interface ContactFormInput {
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  message: string;
  agreement: boolean;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormInput, string>>;

export function validateContactForm(input: ContactFormInput): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const phone = input.phone.replace(/[\s()-]/g, '');

  if (!input.fullName.trim()) errors.fullName = 'Enter your full name.';
  if (!input.phone.trim()) errors.phone = 'Enter a phone number.';
  else if (!/^\+?\d{10,15}$/.test(phone)) errors.phone = 'Enter a valid phone number.';
  if (input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!input.reason.trim()) errors.reason = 'Choose a reason for contact.';
  if (!input.message.trim()) errors.message = 'Enter a message.';
  if (!input.agreement) errors.agreement = 'Agree to be contacted before continuing.';

  return errors;
}

export function submissionMode(endpoint?: string): 'remote' | 'contact-alternatives' {
  return endpoint?.trim() ? 'remote' : 'contact-alternatives';
}
