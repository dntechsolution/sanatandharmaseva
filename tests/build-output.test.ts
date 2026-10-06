import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const dist = (...parts: string[]) => resolve(process.cwd(), 'dist', ...parts);

function readBuilt(path = 'index.html') {
  const file = dist(path);
  expect(existsSync(file), `expected ${path} to be generated`).toBe(true);
  return readFileSync(file, 'utf8');
}

describe('built site shell', () => {
  it('renders an accessible global structure and verified contact paths', () => {
    const html = readBuilt();

    expect(html).toContain('href="#main-content"');
    expect(html).toMatch(/<nav[^>]+aria-label="Primary navigation"/);
    expect(html).toMatch(/aria-controls="mobile-navigation"[^>]+aria-expanded="false"/);
    expect(html).toMatch(/<main[^>]+id="main-content"/);
    expect(html).toContain('<footer');
    expect(html).toContain('href="tel:+919999859666"');
    expect(html).toContain('https://wa.me/919999859666');
    expect(html).toContain('mailto:sanatandharamsewakendra@gmail.com');
  });

  it('ships the brand and organisation metadata without invented social links', () => {
    const html = readBuilt();

    expect(html).toContain('href="/favicon.svg"');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type":"NGO"');
    expect(html).not.toMatch(/facebook\.com|instagram\.com|x\.com|twitter\.com|youtube\.com/i);
    expect(existsSync(dist('favicon.svg'))).toBe(true);
    expect(existsSync(dist('robots.txt'))).toBe(true);
  });
});

describe('home narrative', () => {
  it('moves from mission through programs to participation without invented impact numbers', () => {
    const html = readBuilt();

    expect(html).toContain('SERVING COMMUNITIES • BUILDING FUTURES');
    expect(html).toContain('Building Stronger Communities Through Seva, Education &amp; Empowerment');
    expect(html).toContain('href="/programs"');
    expect(html).toContain('href="/donate"');
    expect(html).toContain('Education • Skills • Women Empowerment • Community Development');
    expect(html).toContain('began its journey in 2020');
    expect(html).toContain('One World. One Family.');
    expect(html).toContain('A Shared Responsibility.');

    for (const title of [
      'Education',
      'Skill Development',
      'Women Empowerment',
      'Health &amp; Family Welfare',
      'Environment',
      'Community Development',
      'Vocational Training',
      'Computer Education',
      'Non-Formal Education',
      'Mother &amp; Child Care',
      'Environmental Awareness',
      'Road Safety Awareness',
      'Science &amp; Technology Promotion',
      'Library &amp; Reading Promotion',
    ]) {
      expect(html).toContain(title);
    }

    for (const label of ['Opportunity', 'Empowerment', 'Community']) {
      expect(html).toContain(`>${label}<`);
    }

    for (const label of ['Beneficiary Story', 'Volunteer Experience', 'Community Partner']) {
      expect(html).toContain(label);
    }

    expect(html.match(/data-illustrative="true"/g)?.length).toBeGreaterThanOrEqual(3);
    expect(html).toContain('href="/get-involved#volunteer"');
    expect(html).toContain('href="/get-involved#partner"');
  });
});
