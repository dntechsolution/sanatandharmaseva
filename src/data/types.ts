export interface NavigationItem {
  label: string;
  href: string;
}

export interface FocusArea {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface Program {
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  objectives: string[];
  image: string;
  imageAlt: string;
  icon: string;
  href: string;
}

export type GalleryCategory =
  | 'All'
  | 'Education'
  | 'Skill Training'
  | 'Community'
  | 'Health'
  | 'Environment'
  | 'Women Empowerment'
  | 'Events';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  image: string;
  alt: string;
  caption: string;
  illustrative: true;
}

export interface ComplianceItem {
  title: string;
  value: string;
  documentUrl?: string;
}

export interface ActivityItem {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  illustrative: true;
}

export interface TestimonialPlaceholder {
  label: string;
  description: string;
  quote?: never;
  person?: never;
}
