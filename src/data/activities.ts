import type { ActivityItem, TestimonialPlaceholder } from './types';

export const activities: ActivityItem[] = [
  {
    title: 'Learning support in community settings',
    category: 'Education',
    description: 'A flexible model for bringing books, guidance and learning conversations closer to communities.',
    image: '/images/non-formal-education.webp',
    imageAlt: 'Illustrative community education scene',
    illustrative: true,
  },
  {
    title: 'Practice-led vocational learning',
    category: 'Skills',
    description: 'Practical sessions can help learners build familiarity, patience and confidence with useful skills.',
    image: '/images/vocational-training.webp',
    imageAlt: 'Illustrative vocational training scene',
    illustrative: true,
  },
  {
    title: 'Everyday awareness, shared locally',
    category: 'Community',
    description: 'Clear conversations around health, safety and responsibility can support more informed choices.',
    image: '/images/community-outreach.webp',
    imageAlt: 'Illustrative community outreach scene',
    illustrative: true,
  },
];

export const testimonialPlaceholders: TestimonialPlaceholder[] = [
  {
    label: 'Beneficiary Story',
    description: 'A verified beneficiary story can be shared here when permission and final copy are available.',
  },
  {
    label: 'Volunteer Experience',
    description: 'A verified volunteer reflection can be added here with the contributor’s consent.',
  },
  {
    label: 'Community Partner',
    description: 'A verified partner perspective can be published here after organisational approval.',
  },
];
