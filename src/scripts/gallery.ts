import type { GalleryItem } from '../data/types';

export function filterGallery(items: GalleryItem[], category: string): GalleryItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}
