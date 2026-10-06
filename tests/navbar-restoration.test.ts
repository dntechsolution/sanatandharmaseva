import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('previous navbar design', () => {
  it('renders all ten destinations as separate links without a dropdown', () => {
    const html = readFileSync(resolve(process.cwd(), 'dist', 'index.html'), 'utf8');
    const navigation = html.match(/<nav class="desktop-navigation"[\s\S]*?<\/nav>/)?.[0] ?? '';

    expect(navigation).not.toContain('<summary');
    for (const href of [
      '/',
      '/about',
      '/programs',
      '/education-skills',
      '/community-development',
      '/our-reach',
      '/governance',
      '/gallery',
      '/get-involved',
      '/contact',
    ]) {
      expect(navigation).toContain(`href="${href}"`);
    }
  });
});
