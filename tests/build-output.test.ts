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
    expect(html).toMatch(/<section[^>]+class="[^"]*philosophy-section[^"]*"[^>]+aria-labelledby="philosophy-title"/);
    expect(html).toContain('id="philosophy-title"');

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

  it('presents all eight supplied health-camp photographs as verified event media', () => {
    const html = readBuilt();
    const section = html.match(/<section[^>]+class="[^"]*health-camp-section[^"]*"[\s\S]*?<\/section>/)?.[0] ?? '';

    expect(section).toContain('aria-labelledby="health-camp-title"');
    expect(section).toContain('id="health-camp-title"');
    expect(section).toContain('Health Check-up Camp');
    expect(section.match(/data-event-photo="true"/g)).toHaveLength(8);

    for (let index = 1; index <= 8; index += 1) {
      expect(section).toContain(`src="/images/health-camp/health-camp-${index}.jpg"`);
      expect(existsSync(dist('images', 'health-camp', `health-camp-${index}.jpg`))).toBe(true);
    }

    expect(section).not.toContain('data-illustrative="true"');
  });

  it('allows the health-camp description to wrap beside its desktop gallery link', () => {
    const css = readdirSync(dist('_astro'))
      .filter((file) => file.endsWith('.css'))
      .map((file) => readFileSync(resolve(dist('_astro'), file), 'utf8'))
      .join('\n');

    expect(css).toMatch(/\.health-camp-heading[^}]*?\.section-subtitle\{[^}]*white-space:normal/);
  });

  it('introduces the patron profile between the organisation story and philosophy', () => {
    const html = readBuilt();
    const profile = html.match(/<section[^>]+class="[^"]*patron-section[^"]*"[\s\S]*?<\/section>/)?.[0] ?? '';

    expect(profile).toContain('aria-labelledby="patron-title"');
    expect(profile).toContain('id="patron-title"');
    expect(profile).toContain('Patron, Mentor &amp; Trustee');
    expect(profile).toContain('Shri Arun Kumar Sinha');
    expect(profile).toContain('Retired IAS Officer');
    expect(profile).toContain('1983 Batch');
    expect(profile).toContain('Uttar Pradesh Cadre');
    expect(profile).toContain('Additional Chief Secretary, Government of Uttar Pradesh');
    expect(profile).toContain('Uttar Pradesh Subordinate Services Selection Commission (UPSSSC)');
    expect(profile).toContain('Independent Director, Hindustan Aeronautics Limited (HAL)');
    expect(profile).not.toContain('Â');
    expect(profile).toMatch(/<img[^>]+src="\/images\/arun-kumar-sinha\.jpg"[^>]+alt="Portrait of Shri Arun Kumar Sinha"[^>]+loading="lazy"/);
    expect(existsSync(dist('images', 'arun-kumar-sinha.jpg'))).toBe(true);

    expect(html.indexOf('story-section')).toBeLessThan(html.indexOf('patron-section'));
    expect(html.indexOf('patron-section')).toBeLessThan(html.indexOf('philosophy-section'));
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

  it('preserves shared heading presentation outside the requested sections', () => {
    const about = readBuilt('about/index.html');
    const home = readBuilt();

    expect(about).toContain('class="page-hero-title"');
    expect(about).toContain('class="page-hero-subtitle"');
    expect(about).toContain('data-content-width="balanced"');
    expect(home).toContain('class="section-title"');
    expect(home).toContain('class="section-subtitle"');
    expect(about).toMatch(/\.page-hero-title[^}]*white-space:nowrap/);
    expect(home).toMatch(/\.section-title[^}]*white-space:nowrap/);
  });

  it('keeps split-layout content inside its grid tracks', () => {
    const routes = ['community-development', 'our-reach', 'contact', 'programs'];

    for (const route of routes) {
      const html = readBuilt(`${route}/index.html`);
      expect(html, route).toContain('data-layout-safe="true"');
      expect(html, route).toContain('data-heading-wrap="local"');
    }
  });

  it('keeps the about story to verified values and milestones', () => {
    const html = readBuilt('about/index.html');
    for (const value of ['Seva', 'Integrity', 'Education', 'Empowerment', 'Harmony', 'Inclusiveness']) {
      expect(html).toContain(`>${value}<`);
    }
    expect(html).toContain('>2020<');
    expect(html).toContain('>2022<');
  });

  it('presents the organisation journey as one labelled two-card timeline', () => {
    const html = readBuilt('about/index.html');
    const journey = html.match(/<section[^>]+class="[^"]*journey-section[^"]*"[\s\S]*?<\/section>/)?.[0] ?? '';

    expect(journey).toContain('aria-labelledby="journey-title"');
    expect(journey).toContain('id="journey-title"');
    expect(journey.match(/<li[^>]+class="[^"]*timeline-card[^"]*"/g)).toHaveLength(2);
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
    expect(html.match(/Document available on request\./g)).toHaveLength(8);
    expect(html).not.toMatch(/<a[^>]+data-certificate/);
  });

  it('publishes the confirmed bank details with verification contacts', () => {
    const html = readBuilt('donate/index.html');
    expect(html).toContain('data-bank-details');
    expect(html).toContain('State Bank of India');
    expect(html).toContain('052350007841345698983');
    expect(html).toContain('SBIN0018689');
    expect(html).toContain('href="tel:+919999859666"');
    expect(html).toContain('https://wa.me/919999859666');
    expect(html).toContain('href="/contact"');
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
    expect(html).toContain('Illustrative images stay labelled until verified organisation photographs become available.');
    expect(html).toContain('page-hero-subtitle--compact');
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

  it('contains no empty or fabricated trust links and keeps payment credentials on the donation page only', () => {
    const allHtml = routeFiles.map(readBuilt).join('\n');
    const nonDonationHtml = routeFiles.filter((file) => file !== 'donate/index.html').map(readBuilt).join('\n');
    expect(allHtml).not.toMatch(/href="(?:\s*|#)"/);
    expect(allHtml).not.toMatch(/<a[^>]+data-certificate/);
    expect(nonDonationHtml).not.toMatch(/account\s*(number|no\.)|a\/c\s*no|\b[A-Z]{4}0[A-Z0-9]{6}\b/i);
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
