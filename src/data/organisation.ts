import type { ComplianceItem } from './types';

export const organisation = {
  name: 'Sanatan Dharam Sewa Kendra',
  legalName: 'SANATAN DHARAM SEWA KENDRA',
  founded: 2020,
  phoneDisplay: '9999859666',
  phoneHref: 'tel:+919999859666',
  whatsappHref:
    'https://wa.me/919999859666?text=Namaste%2C%20I%20would%20like%20to%20know%20more%20about%20Sanatan%20Dharam%20Sewa%20Kendra%20and%20its%20initiatives.',
  email: 'sanatandharamsewakendra@gmail.com',
  website: 'sanatandharamsewakendra.org',
  address: {
    lines: ['H-475, Saketpuri Phase-2', 'Ranopali', 'Ayodhya', 'Uttar Pradesh – 224123'],
    locality: 'Ayodhya',
    region: 'Uttar Pradesh',
    postalCode: '224123',
    country: 'IN',
  },
  summary:
    'Working towards education, empowerment, harmony and sustainable community development.',
  vision:
    'A society where every person can learn, build confidence and participate in community life with dignity.',
  mission:
    'To strengthen educational access, practical skills, social awareness and community-led development through responsible service.',
  values: [
    { title: 'Seva', description: 'Service rooted in empathy, dignity and shared responsibility.' },
    { title: 'Integrity', description: 'Honest, accountable and careful action in every initiative.' },
    { title: 'Education', description: 'Learning as the foundation for possibility and participation.' },
    { title: 'Empowerment', description: 'Enabling people to build confidence, agency and opportunity.' },
    { title: 'Harmony', description: 'Working together across communities with mutual respect.' },
    { title: 'Inclusiveness', description: 'Creating space for people and perspectives to belong.' },
  ],
  reach: {
    states: ['Delhi', 'Uttar Pradesh', 'Haryana', 'Rajasthan', 'Uttarakhand', 'Chhattisgarh'],
    highlightedPlaces: ['New Delhi', 'Prayagraj', 'Purvanchal', 'Ayodhya'],
    resources: [
      'Project Offices',
      'Community Centres',
      'Vocational Training Facilities',
      'Non-Formal Education Centres',
      'Library',
      'Village Chaupals',
      'Community Outreach',
    ],
  },
  governanceHierarchy: [
    'Board of Trustees',
    'Executive Committee',
    'Management Committee',
    'Chief Executive',
    'Community Organisers',
    'Social Workers / Teachers / Instructors',
    'Volunteers',
    'Beneficiaries',
  ],
  board: [
    { name: 'Ravindra Patel', role: 'President' },
    { name: 'Ganesh Kumar Chaudhary', role: 'Vice-President' },
    { name: 'Vinod Sahani', role: 'Secretary' },
    { name: 'Virendra Kumar', role: 'Treasurer' },
  ],
  compliance: [
    { title: 'Trust Registration', value: '534/2022–2023' },
    { title: 'Registration Date', value: '31 August 2022' },
    { title: '12A Registration', value: 'Available' },
    { title: '80G Registration', value: 'Available' },
    { title: 'NGO Darpan', value: 'Registered' },
    { title: 'CSR-1', value: 'Registered' },
  ] as ComplianceItem[],
  socialLinks: [] as Array<{ label: string; href: string }>,
} as const;
