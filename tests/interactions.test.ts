import { describe, expect, it } from 'vitest';
import { galleryItems } from '../src/data/gallery';
import * as contactFormModule from '../src/scripts/contact-form';
import type { ContactFormInput } from '../src/scripts/contact-form';
import { filterGallery } from '../src/scripts/gallery';

const { validateContactForm } = contactFormModule;

const validForm: ContactFormInput = {
  fullName: 'Asha Verma',
  phone: '+91 98765 43210',
  email: 'asha@example.org',
  reason: 'Volunteer',
  message: 'I would like to help with community learning.',
  agreement: true,
};

describe('gallery filtering', () => {
  it('returns every item for the All category', () => {
    expect(filterGallery(galleryItems, 'All')).toEqual(galleryItems);
  });

  it('returns only exact-category matches', () => {
    expect(filterGallery(galleryItems, 'Education').map(({ category }) => category)).toEqual(['Education']);
  });

  it('returns no results for an unknown category', () => {
    expect(filterGallery(galleryItems, 'Unknown')).toEqual([]);
  });
});

describe('contact form validation', () => {
  it('accepts a complete valid enquiry', () => {
    expect(validateContactForm(validForm)).toEqual({});
  });

  it('requires the name, phone, reason, message and agreement fields', () => {
    expect(validateContactForm({ fullName: '', phone: '', email: '', reason: '', message: '', agreement: false })).toEqual({
      fullName: 'Enter your full name.',
      phone: 'Enter a phone number.',
      reason: 'Choose a reason for contact.',
      message: 'Enter a message.',
      agreement: 'Agree to be contacted before continuing.',
    });
  });

  it('rejects malformed phone and email values', () => {
    expect(validateContactForm({ ...validForm, phone: '12-3', email: 'not-an-email' })).toMatchObject({
      phone: 'Enter a valid phone number.',
      email: 'Enter a valid email address.',
    });
  });

  it('allows an empty optional email', () => {
    expect(validateContactForm({ ...validForm, email: '' })).toEqual({});
  });

  it('builds an encoded WhatsApp enquiry containing the visitor details', () => {
    const buildWhatsAppEnquiryUrl = Reflect.get(contactFormModule, 'buildWhatsAppEnquiryUrl') as
      | ((baseUrl: string, input: ContactFormInput) => string)
      | undefined;

    expect(buildWhatsAppEnquiryUrl).toBeTypeOf('function');
    if (!buildWhatsAppEnquiryUrl) return;

    const url = buildWhatsAppEnquiryUrl('https://wa.me/919999859666', validForm);
    const message = decodeURIComponent(url.split('?text=')[1] ?? '');

    expect(url).toMatch(/^https:\/\/wa\.me\/919999859666\?text=/);
    expect(url).not.toContain('\n');
    expect(message).toBe(
      'Namaste, I would like to make an enquiry through the Sanatan Dharam Sewa Kendra website.\n\n' +
      'Full Name: Asha Verma\n' +
      'Phone: +91 98765 43210\n' +
      'Email: asha@example.org\n' +
      'Reason: Volunteer\n' +
      'Message: I would like to help with community learning.',
    );
  });
});
