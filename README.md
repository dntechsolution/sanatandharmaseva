# Sanatan Dharam Sewa Kendra Website

A fast, accessible, multi-page static website for Sanatan Dharam Sewa Kendra, built with Astro, Tailwind CSS, TypeScript and Lucide icons.

## Local development

Requirements: Node.js 22.12 or newer and npm 9.6.5 or newer.

```bash
npm install
npm run dev
```

Open the local address shown by Astro.

## Production checks

```bash
npm run check
npm run build
npm test
npm run preview
```

The static production output is written to `dist/`.

## Updating content

Verified organisation information is centralized in:

- `src/data/organisation.ts` — contact details, values, reach, governance and compliance
- `src/data/navigation.ts` — header, footer and policy links
- `src/data/programs.ts` — focus areas and the nine programme records
- `src/data/gallery.ts` — gallery categories and illustrative records
- `src/data/activities.ts` — activity and testimonial-placeholder content

Update these files instead of repeating facts inside page templates.

## Images

Images in `public/images/` are optimized WebP assets. The initial photographs are generated editorial representations because verified organisation photographs were not supplied. They must not be described as actual beneficiaries, staff members or programme events.

To replace an image:

1. obtain the organisation’s permission to publish it;
2. export an appropriately sized WebP or AVIF file;
3. replace the matching file in `public/images/`, or update its central data path;
4. update the alternative text so it describes the verified photograph accurately;
5. run the complete production checks.

## Environment configuration

Copy `.env.example` to `.env` for local configuration.

- `PUBLIC_SITE_URL` sets the canonical production origin and sitemap URLs.
- `PUBLIC_FORM_ENDPOINT` optionally enables remote contact-form delivery.

When `PUBLIC_FORM_ENDPOINT` is empty, the contact form validates locally and explicitly directs the visitor to phone, WhatsApp or email. It does not claim that an enquiry was transmitted.

## Trust and compliance safeguards

- Add certificate links only after authentic files are supplied and verified.
- Add social icons only after official profile URLs are supplied and verified.
- Add payment or bank details only after the organisation provides current verified information and explicitly approves publication.
- Add testimonials only with verified copy, identity details and publication consent.
- Do not add beneficiary totals, awards, affiliations, partners or programme results without a documented factual source.

## Deployment

The site is provider-neutral static output. Configure `PUBLIC_SITE_URL`, run `npm run build`, and deploy the contents of `dist/` to the chosen static hosting provider.
