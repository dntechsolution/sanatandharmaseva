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
