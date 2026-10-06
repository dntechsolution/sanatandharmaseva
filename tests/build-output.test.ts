import { existsSync, readFileSync, readdirSync } from 'node:fs';
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

  it('renders the supplied organisation logo at the start of the navigation brand', () => {
    const html = readBuilt();
    const brand = html.match(/<a class="brand"[\s\S]*?<\/a>/)?.[0] ?? '';

    expect(brand).toContain('src="/images/sanatan-dharma-sewa-kendra-logo.webp"');
    expect(brand.indexOf('<img')).toBeLessThan(brand.indexOf('<span class="brand-copy"'));
    expect(existsSync(dist('images', 'sanatan-dharma-sewa-kendra-logo.webp'))).toBe(true);
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

describe('organisation and program page family', () => {
  const routes = ['about', 'programs', 'education-skills', 'community-development'];

  it('builds every route with one h1 and unique page metadata', () => {
    const records = routes.map((route) => {
      const html = readBuilt(`${route}/index.html`);
      expect(html.match(/<h1(?:\s[^>]*)?>/g)).toHaveLength(1);
      const title = html.match(/<title>(.*?)<\/title>/)?.[1];
      const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      expect(title).toBeTruthy();
      expect(description).toBeTruthy();
      expect(canonical).toBe(`https://sanatandharamsewakendra.org/${route}`);
      return { title, description, canonical };
    });

    expect(new Set(records.map(({ title }) => title)).size).toBe(routes.length);
    expect(new Set(records.map(({ description }) => description)).size).toBe(routes.length);
  });

  it('keeps the about story to verified values and milestones', () => {
    const html = readBuilt('about/index.html');
    for (const value of ['Seva', 'Integrity', 'Education', 'Empowerment', 'Harmony', 'Inclusiveness']) {
      expect(html).toContain(`>${value}<`);
    }
    expect(html).toContain('>2020<');
    expect(html).toContain('>2022<');
  });

  it('renders all nine numbered program sections from shared content', () => {
    const html = readBuilt('programs/index.html');
    expect(html.match(/data-program-number="0[1-9]"/g)).toHaveLength(9);
    for (const number of ['01', '02', '03', '04', '05', '06', '07', '08', '09']) {
      expect(html).toContain(`data-program-number="${number}"`);
    }
  });

  it('shows the complete education pathway and supplied vocational areas', () => {
    const html = readBuilt('education-skills/index.html');
    for (const item of ['Learn', 'Practice', 'Build Confidence', 'Create Opportunity', 'Tailoring', 'Screen Printing', 'Creative Skills', 'Employment-Oriented Training']) {
      expect(html).toContain(`>${item}<`);
    }
  });

  it('shows all community themes and the seven supplied awareness topics', () => {
    const html = readBuilt('community-development/index.html');
    for (const item of ['Women Empowerment', 'Mother &amp; Child Care', 'Health Awareness', 'Environmental Awareness', 'Road Safety', 'Community Outreach']) {
      expect(html).toContain(item);
    }
    for (const topic of ['Nutrition', 'Seasonal diseases', 'Clean drinking water', 'ORS awareness', 'Parenting', 'Savings awareness', 'Community responsibility']) {
      expect(html).toContain(`>${topic}<`);
    }
  });
});

describe('transparency and participation pages', () => {
  const routes = ['our-reach', 'governance', 'get-involved', 'donate', 'privacy-policy', 'terms', 'donation-policy'];

  it('builds the complete transparency and participation route set', () => {
    for (const route of routes) {
      const html = readBuilt(`${route}/index.html`);
      expect(html.match(/<h1(?:\s[^>]*)?>/g)).toHaveLength(1);
      expect(html).toContain(`<link rel="canonical" href="https://sanatandharamsewakendra.org/${route}">`);
    }
  });

  it('states reach without unsupported totals', () => {
    const html = readBuilt('our-reach/index.html');
    for (const item of ['Delhi', 'Uttar Pradesh', 'Haryana', 'Rajasthan', 'Uttarakhand', 'Chhattisgarh', 'New Delhi', 'Prayagraj', 'Purvanchal', 'Ayodhya', 'Project Offices', 'Community Centres', 'Vocational Training Facilities', 'Non-Formal Education Centres', 'Library', 'Village Chaupals', 'Community Outreach']) {
      expect(html).toContain(item);
    }
    expect(html).not.toMatch(/\d+[,+]?\s*(beneficiaries|people reached|centres)/i);
    expect(html).toContain('role="img"');
  });

  it('renders the complete governance chain and request-only compliance cards', () => {
    const html = readBuilt('governance/index.html');
    for (const item of ['Board of Trustees', 'Executive Committee', 'Management Committee', 'Chief Executive', 'Community Organisers', 'Social Workers / Teachers / Instructors', 'Volunteers', 'Beneficiaries', 'Ravindra Patel', 'Ganesh Kumar Chaudhary', 'Vinod Sahani', 'Virendra Kumar', '534/2022–2023', '31 August 2022', '12A Registration', '80G Registration', 'NGO Darpan', 'CSR-1']) {
      expect(html).toContain(item);
    }
    expect(html.match(/Document available on request\./g)).toHaveLength(6);
    expect(html).not.toMatch(/<a[^>]+data-certificate/);
  });

  it('keeps donation information verified and excludes payment credentials', () => {
    const html = readBuilt('donate/index.html');
    expect(html).toContain('For current donation and bank details, please contact Sanatan Dharam Sewa Kendra directly or use the verified payment information displayed by the organisation.');
    expect(html).toContain('href="tel:+919999859666"');
    expect(html).toContain('https://wa.me/919999859666');
    expect(html).toContain('href="/contact"');
    expect(html).not.toMatch(/account\s*(number|no\.)|a\/c\s*no|\b[A-Z]{4}0[A-Z0-9]{6}\b/i);
  });

  it('keeps policy pages informational and contactable', () => {
    for (const route of ['privacy-policy', 'terms', 'donation-policy']) {
      const html = readBuilt(`${route}/index.html`);
      expect(html).toContain('href="/contact"');
      expect(html).not.toMatch(/government[ -]affiliated|government[ -]approved|guaranteed tax benefit/i);
    }
  });
});

describe('gallery and contact experiences', () => {
  it('renders eight gallery filters, a live result count and an accessible lightbox', () => {
    const html = readBuilt('gallery/index.html');
    expect(html.match(/<button[^>]+data-gallery-filter=/g)).toHaveLength(8);
    expect(html).toContain('aria-live="polite"');
    expect(html.match(/loading="lazy"/g)?.length).toBeGreaterThanOrEqual(7);
    expect(html.match(/data-illustrative="true"/g)).toHaveLength(7);
    expect(html).toMatch(/<dialog[^>]+aria-labelledby="lightbox-title"/);
    expect(html).not.toMatch(/actual beneficiaries|our beneficiaries pictured|programme participants pictured/i);
  });

  it('renders complete labelled contact fields and honest static submission state', () => {
    const html = readBuilt('contact/index.html');
    expect(html.match(/data-contact-card/g)).toHaveLength(4);
    for (const label of ['Full Name', 'Phone', 'Reason for Contact', 'Message']) {
      expect(html).toContain(`>${label}<`);
    }
    expect(html).toMatch(/<label[^>]+for="email"[^>]*>Email/);
    for (const option of ['General Enquiry', 'Volunteer', 'Donation', 'CSR Partnership', 'Institutional Partnership', 'Community Program', 'Other']) {
      expect(html).toContain(`>${option}<`);
    }
    expect(html).toContain('I agree to be contacted regarding my enquiry.');
    expect(html).toContain('data-whatsapp-base="https://wa.me/919999859666"');
    expect(html).toContain('Send via WhatsApp');
    expect(html).toContain('role="status" aria-live="polite"');
    expect(html).not.toMatch(/<form[^>]+action=/);
  });
});

describe('explore hub', () => {
  it('keeps every removed navigation destination accessible from one page', () => {
    const html = readBuilt('explore/index.html');

    for (const [label, href] of [
      ['Education &amp; Skills', '/education-skills'],
      ['Community Development', '/community-development'],
      ['Governance', '/governance'],
      ['Gallery', '/gallery'],
      ['Contact', '/contact'],
    ]) {
      expect(html).toContain(`href="${href}"`);
      expect(html).toContain(label);
    }
  });
});

describe('production output matrix', () => {
  const routeFiles = [
    'index.html',
    'about/index.html',
    'programs/index.html',
    'education-skills/index.html',
    'community-development/index.html',
    'our-reach/index.html',
    'governance/index.html',
    'gallery/index.html',
    'get-involved/index.html',
    'donate/index.html',
    'contact/index.html',
    'explore/index.html',
    'privacy-policy/index.html',
    'terms/index.html',
    'donation-policy/index.html',
  ];

  it('ships fifteen routes with unique titles, descriptions and canonicals', () => {
    const metadata = routeFiles.map((file) => {
      const html = readBuilt(file);
      return {
        title: html.match(/<title>(.*?)<\/title>/)?.[1],
        description: html.match(/<meta name="description" content="([^"]+)"/)?.[1],
        canonical: html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
      };
    });
    for (const key of ['title', 'description', 'canonical'] as const) {
      expect(metadata.every((item) => Boolean(item[key]))).toBe(true);
      expect(new Set(metadata.map((item) => item[key])).size).toBe(routeFiles.length);
    }
  });

  it('ships crawl assets and complete alternative text', () => {
    expect(existsSync(dist('robots.txt'))).toBe(true);
    expect(existsSync(dist('sitemap-index.xml'))).toBe(true);
    for (const file of routeFiles) {
      const html = readBuilt(file);
      for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
        if (tag.includes('data-lightbox-image')) continue;
        expect(tag).toMatch(/alt="[^"]+"/);
        if (!tag.includes('fetchpriority="high"')) expect(tag).toContain('loading="lazy"');
      }
    }
  });

  it('contains no empty or fabricated trust links and no payment credentials', () => {
    const allHtml = routeFiles.map(readBuilt).join('\n');
    expect(allHtml).not.toMatch(/href="(?:\s*|#)"/);
    expect(allHtml).not.toMatch(/<a[^>]+data-certificate/);
    expect(allHtml).not.toMatch(/account\s*(number|no\.)|a\/c\s*no|\b[A-Z]{4}0[A-Z0-9]{6}\b/i);
    expect(allHtml).not.toMatch(/facebook\.com|instagram\.com|x\.com|twitter\.com|youtube\.com/i);
    expect(allHtml).not.toMatch(/<a[^>]+aria-disabled="true"/);
  });

  it('keeps testimonial placeholders anonymous and resolves internal route links', () => {
    const home = readBuilt();
    for (const name of ['Ravindra Patel', 'Ganesh Kumar Chaudhary', 'Vinod Sahani', 'Virendra Kumar']) {
      expect(home).not.toContain(name);
    }

    for (const file of routeFiles) {
      const html = readBuilt(file);
      const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1]);
      for (const href of hrefs) {
        const pathname = href.split(/[?#]/)[0];
        if (pathname.startsWith('/_astro/') || pathname.startsWith('/images/') || pathname === '/favicon.svg') continue;
        const target = pathname === '/' ? dist('index.html') : dist(pathname.slice(1), 'index.html');
        expect(existsSync(target), `expected internal route ${pathname} from ${file}`).toBe(true);
      }
    }
  });

  it('preserves mobile-safe contact spacing and reduced-motion behavior in built CSS', () => {
    const cssDirectory = dist('_astro');
    const css = readdirSync(cssDirectory)
      .filter((file) => file.endsWith('.css'))
      .map((file) => readFileSync(resolve(cssDirectory, file), 'utf8'))
      .join('\n');
    expect(css).toContain('min-width:320px');
    expect(css).toContain('overflow-x:hidden');
    expect(css).toContain('safe-area-inset-bottom');
    expect(css).toContain('prefers-reduced-motion:reduce');
  });
});
