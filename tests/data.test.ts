import { describe, expect, it } from 'vitest';
import { activities, testimonialPlaceholders } from '../src/data/activities';
import { galleryItems } from '../src/data/gallery';
import { primaryNavigation } from '../src/data/navigation';
import { organisation } from '../src/data/organisation';
import { programs } from '../src/data/programs';

describe('verified content model', () => {
  it('keeps the original ten-item primary navigation', () => {
    expect(primaryNavigation.map(({ label, href }) => [label, href])).toEqual([
      ['Home', '/'],
      ['About Us', '/about'],
      ['Our Programs', '/programs'],
      ['Education & Skills', '/education-skills'],
      ['Community Development', '/community-development'],
      ['Our Reach', '/our-reach'],
      ['Governance', '/governance'],
      ['Gallery', '/gallery'],
      ['Get Involved', '/get-involved'],
      ['Contact', '/contact'],
    ]);
  });

  it('exposes the supplied program areas', () => {
    expect(programs.map(({ title }) => title)).toEqual([
      'Vocational Training',
      'Computer Education',
      'Non-Formal Education',
      'Mother & Child Care',
      'Environmental Awareness',
      'Road Safety Awareness',
      'Science & Technology Promotion',
      'Library & Reading Promotion',
      'Women Empowerment',
      'Medical Camp',
      'Water Resources',
    ]);
  });

  it('contains only the supplied reach and governance facts', () => {
    expect(organisation.reach.states).toEqual([
      'Delhi',
      'Uttar Pradesh',
      'Haryana',
      'Rajasthan',
      'Uttarakhand',
      'Chhattisgarh',
    ]);
    expect(organisation.board.map(({ name, role }) => [name, role])).toEqual([
      ['Ravindra Patel', 'President'],
      ['Ganesh Kumar Chaudhary', 'Vice-President'],
      ['Vinod Sahani', 'Secretary'],
      ['Virendra Kumar', 'Treasurer'],
    ]);
    expect(organisation.compliance).toHaveLength(8);
    expect(organisation.compliance.every((item) => item.documentUrl === undefined)).toBe(true);
  });

  it('never presents social profiles or fictional people as verified', () => {
    expect(organisation.socialLinks).toEqual([]);
    expect(testimonialPlaceholders.map(({ label }) => label)).toEqual([
      'Beneficiary Story',
      'Volunteer Experience',
      'Community Partner',
    ]);
    expect(testimonialPlaceholders.every(({ quote, person }) => !quote && !person)).toBe(true);
  });

  it('marks every representative media record as illustrative', () => {
    expect(activities.length).toBeGreaterThan(0);
    expect(galleryItems.length).toBeGreaterThan(0);
    expect([...activities, ...galleryItems].every((item) => item.illustrative)).toBe(true);
  });
});
