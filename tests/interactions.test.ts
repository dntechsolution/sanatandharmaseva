import { describe, expect, it } from 'vitest';
import { galleryItems } from '../src/data/gallery';
import { validateContactForm, submissionMode, type ContactFormInput } from '../src/scripts/contact-form';
import { filterGallery } from '../src/scripts/gallery';

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

  it('uses remote submission only for a configured endpoint', () => {
    expect(submissionMode('https://forms.example.org/enquiry')).toBe('remote');
    expect(submissionMode('')).toBe('contact-alternatives');
    expect(submissionMode(undefined)).toBe('contact-alternatives');
  });
});
