import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (...parts: string[]) => readFileSync(resolve(root, ...parts), 'utf8');

function sourceFiles(directory: string): string[] {
  return readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const relative = `${directory}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(relative) : [relative];
  });
}

describe('final review regressions', () => {
  it('uses the family names declared by the variable font packages', () => {
    const styles = sourceFiles('src')
      .filter((file) => /\.(astro|css)$/.test(file))
      .map((file) => read(file))
      .join('\n');

    expect(styles).toContain("font-family: 'Lora Variable'");
    expect(styles).toContain("font-family: 'Manrope Variable'");
    expect(styles).not.toMatch(/font-family:\s*['"](?:Lora|Manrope)['"]/);
  });

  it('reserves a mobile content gutter for fixed contact controls', () => {
    const css = read('src/styles/global.css');
    expect(css).toContain('--floating-contact-gutter:');
    expect(css).toMatch(/@media \(max-width: 640px\)[\s\S]+body[\s\S]+padding-inline-end:\s*var\(--floating-contact-gutter\)/);
  });

  it('keeps the mobile drawer scrollable and focus inside its dialog panel', () => {
    const header = read('src/components/Header.astro');
    const script = read('src/components/SiteScripts.astro');
    expect(header).toContain('data-drawer-panel');
    expect(header).toMatch(/menu-backdrop[^>]+tabindex="-1"/);
    expect(header).toMatch(/\.mobile-panel\s*\{[\s\S]+max-height:\s*100dvh[\s\S]+overflow-y:\s*auto/);
    expect(script).toContain("querySelector<HTMLElement>('[data-drawer-panel]')");
    expect(script).toContain("panel?.querySelectorAll<HTMLElement>");
    expect(script).toContain("querySelector<HTMLButtonElement>('[data-menu-close]')?.focus()");
  });

  it('uses dark text for normal-sized saffron CTA labels', () => {
    const globalCss = read('src/styles/global.css');
    const header = read('src/components/Header.astro');
    expect(globalCss).toMatch(/\.button--primary\s*\{[^}]+color:\s*var\(--ink\)/);
    expect(header).toMatch(/\.header-donate\s*\{[^}]+color:\s*var\(--ink\)/);
  });

  it('loads the configured site origin and generates robots from that same origin', () => {
    const config = read('astro.config.mjs');
    expect(config).toContain("import { loadEnv } from 'vite'");
    expect(config).toMatch(/loadEnv\([^,]+, process\.cwd\(\), ''\)/);
    expect(existsSync(resolve(root, 'public', 'robots.txt'))).toBe(false);
    const robots = read('src/pages/robots.txt.ts');
    expect(robots).toContain('site');
    expect(robots).toMatch(/new URL\('sitemap-index\.xml',\s*site/);
  });

  it('keeps native enquiry submission disabled until its safe handler is ready', () => {
    const form = read('src/components/ContactForm.astro');
    expect(form).toMatch(/<button[^>]+type="submit"[^>]+disabled/);
    expect(form).toContain('data-form-fallback');
    expect(form).toContain('<noscript>');
    expect(form).toContain("submit?.removeAttribute('disabled')");
  });

  it('leaves reveal content visible until enhancement initializes', () => {
    const css = read('src/styles/global.css');
    const script = read('src/components/SiteScripts.astro');
    expect(css).toMatch(/\.reveal\s*\{\s*opacity:\s*1/);
    expect(css).toMatch(/\.reveal-ready \.reveal\s*\{[^}]+opacity:\s*0/);
    expect(script).toContain("document.documentElement.classList.add('reveal-ready')");
  });
});
