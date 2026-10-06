# Sanatan Dharam Sewa Kendra Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally verify the complete, premium, accessible, multi-page Astro website defined in the approved design specification.

**Architecture:** Astro produces fully static HTML from typed central content modules and small reusable presentational components. Tailwind and a focused global stylesheet provide the design system, while framework-free browser scripts handle only the drawer, section reveals, gallery, lightbox, and contact-form states.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, Lucide Astro icons, Vitest, semantic HTML5, CSS transitions, Intersection Observer

**Spec:** `docs/superpowers/specs/2026-10-06-sanatan-dharam-sewa-kendra-design.md`

## Global Constraints

- Preserve the organisation name exactly as “Sanatan Dharam Sewa Kendra.”
- Use Astro static output, Tailwind CSS, reusable Astro components, and minimal vanilla JavaScript; do not add React, Bootstrap, jQuery, map libraries, sliders, or heavy animation libraries.
- Use only the verified facts in the supplied brief; never invent statistics, results, awards, partners, affiliations, testimonials, certificates, social accounts, bank details, or beneficiary identities.
- Representative imagery must not be described as authentic organisation activity; keep it replaceable through central data.
- Use `#E8751A`, `#7B2D26`, `#295D47`, `#FFFDF7`, `#F7F0E4`, `#242424`, `#66645F`, `#FFFFFF`, and `#E9E2D8` as the site palette.
- Use Lora for display text and Manrope for body/interface text with `font-display: swap`.
- Support 320, 375, 430, 768, 1024, and 1440+ pixel widths without horizontal overflow.
- Respect `prefers-reduced-motion`, visible keyboard focus, semantic heading order, and WCAG-aware color contrast.
- Use the verified phone `9999859666`, WhatsApp URL `https://wa.me/919999859666`, email `sanatandharamsewakendra@gmail.com`, and Ayodhya address exactly as supplied.
- The donation page must not expose unverified bank information, and inactive compliance documents must say “Document available on request.”
- The form must not claim a message was sent when no public form endpoint is configured.
- Output must remain a static `dist` directory with unique metadata, sitemap, robots, JSON-LD, and a custom SVG favicon.

## Review Focus

- A 320px viewport must show no horizontal overflow and must keep both floating contact buttons clear of content; Task 7 adds a browser-width verification for this condition.
- A visitor using only the keyboard must be able to open, traverse, and close the navigation drawer and gallery lightbox with focus restored correctly; Tasks 2 and 6 add interaction checks.
- A gallery category containing no matching items must announce zero results and leave a usable “All” filter; Task 6 tests the filtering utility and rendered live region.
- An invalid or endpoint-less contact submission must show actionable feedback without reporting delivery; Task 6 tests both validation branches.
- Missing certificates, social links, bank details, or real testimonials must not produce fake active controls or claims; Tasks 1, 5, and 7 add data and output assertions.

---

## File map

### Project and verification

- `package.json` — scripts and dependencies
- `astro.config.mjs` — static output, Tailwind Vite plugin, sitemap
- `tsconfig.json` — Astro TypeScript configuration
- `.env.example` — optional public canonical URL and form endpoint
- `.gitignore` — generated and local-only files
- `vitest.config.ts` — unit and output-test configuration
- `tests/data.test.ts` — content-integrity tests
- `tests/interactions.test.ts` — pure interaction and validation tests
- `tests/build-output.test.ts` — generated-route, metadata, policy, and asset checks

### Design system and shared shell

- `src/styles/global.css` — tokens, typography, layout primitives, motion, focus, and responsive rules
- `src/layouts/MainLayout.astro` — metadata, JSON-LD, skip link, header, footer, and floating actions
- `src/components/Header.astro` — desktop navigation and accessible mobile drawer
- `src/components/Footer.astro` — organisational, navigation, contact, and legal footer
- `src/components/FloatingContact.astro` — call and WhatsApp actions
- `src/components/SiteScripts.astro` — shared drawer, header, and reveal behavior
- `public/favicon.svg`, `public/robots.txt` — brand icon and crawl rules

### Typed content

- `src/data/types.ts` — shared content interfaces
- `src/data/navigation.ts` — primary, footer, involvement, and legal links
- `src/data/organisation.ts` — verified contact, governance, values, reach, and compliance facts
- `src/data/programs.ts` — nine program definitions and focus areas
- `src/data/gallery.ts` — illustrative gallery records and categories
- `src/data/activities.ts` — editable activity placeholder records

### Reusable sections

- `src/components/Hero.astro`, `PageHero.astro`, `Breadcrumb.astro`, `SectionHeading.astro`
- `src/components/ProgramCard.astro`, `FeatureCard.astro`, `ImpactCard.astro`, `StatsStrip.astro`
- `src/components/CTASection.astro`, `VolunteerCTA.astro`, `DonationCTA.astro`
- `src/components/TestimonialCard.astro`, `GalleryCard.astro`, `ComplianceCard.astro`, `ContactForm.astro`

### Pages and scripts

- `src/pages/index.astro`, `about.astro`, `programs.astro`, `education-skills.astro`
- `src/pages/community-development.astro`, `our-reach.astro`, `governance.astro`
- `src/pages/gallery.astro`, `get-involved.astro`, `donate.astro`, `contact.astro`
- `src/pages/privacy-policy.astro`, `terms.astro`, `donation-policy.astro`
- `src/scripts/gallery.ts` — gallery filtering state
- `src/scripts/contact-form.ts` — form validation and endpoint-independent submission result

## Task 1: Static project foundation and verified content model

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `vitest.config.ts`
- Create: `src/data/types.ts`
- Create: `src/data/navigation.ts`
- Create: `src/data/organisation.ts`
- Create: `src/data/programs.ts`
- Create: `src/data/gallery.ts`
- Create: `src/data/activities.ts`
- Create: `tests/data.test.ts`

**Interfaces:**
- Consumes: Approved specification and supplied organisation facts.
- Produces: `NavigationItem`, `Program`, `GalleryItem`, `ComplianceItem`, and `ActivityItem` types; exported `primaryNavigation`, `footerNavigation`, `organisation`, `programs`, `galleryCategories`, `galleryItems`, and `activities` constants.

- [ ] **Step 1: Scaffold the Astro/Tailwind project configuration**

Create scripts `dev`, `build`, `preview`, `check`, and `test`; configure Astro static output with sitemap and Tailwind's Vite integration; document `PUBLIC_SITE_URL` and optional `PUBLIC_FORM_ENDPOINT` in `.env.example`.

- [ ] **Step 2: Install the declared dependencies and preserve the generated lockfile**

Run: `npm install`

Expected: `package-lock.json` is created and installation exits 0.

- [ ] **Step 3: Write failing integrity tests for the central data**

Assert the exact ten primary navigation labels/routes, nine program titles, six verified reach states, four named board roles, six compliance facts, empty social-link collection, absent certificate URLs, and that no activity/testimonial record contains a person presented as a real beneficiary.

- [ ] **Step 4: Run the data test to verify it fails**

Run: `npm test -- tests/data.test.ts`

Expected: FAIL because content modules do not yet export the required records.

- [ ] **Step 5: Implement typed central content modules**

Encode only supplied facts. Mark representative gallery/activity media with `illustrative: true`, use replacement-friendly local asset paths, and use neutral labels for testimonial slots.

- [ ] **Step 6: Run tests and type checks**

Run: `npm test -- tests/data.test.ts`

Expected: PASS.

Run: `npm run check`

Expected: no Astro or TypeScript errors.

- [ ] **Step 7: Commit the foundation**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts .gitignore .env.example src/data tests/data.test.ts
git commit -m "feat: establish Astro project and verified content model"
```

## Task 2: Shared visual system, layout, navigation, and global contact actions

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/MainLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/FloatingContact.astro`
- Create: `src/components/SiteScripts.astro`
- Create: `public/favicon.svg`
- Create: `public/robots.txt`
- Test: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: `primaryNavigation`, `footerNavigation`, `organisation` from Task 1.
- Produces: `MainLayout` props `{ title: string; description: string; canonicalPath: string; image?: string }` and the site-wide structural/motion utility classes used by every page.

- [ ] **Step 1: Write failing shell-output tests**

After a build, assert the home output contains a skip link, labelled primary navigation, drawer trigger with expanded state, main landmark, footer, exact tel/WhatsApp/email links, custom favicon, organisation JSON-LD, and no social-profile links.

- [ ] **Step 2: Run the output test to verify it fails**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: FAIL because the shared layout and home route do not exist.

- [ ] **Step 3: Implement the Seva Editorial token system and shared shell**

Define palette, Lora/Manrope font loading, fluid type scale, spacing, focus, surface, card, button, container, reveal, image, reduced-motion, and mobile-safe-area utilities. Implement transparent-to-solid sticky header behavior, the desktop nav, the focus-managed mobile drawer, semantic footer, and global floating actions.

- [ ] **Step 4: Add SEO infrastructure and brand assets**

Implement canonical/OG text metadata and organisation JSON-LD in `MainLayout`; create a legible saffron/green circle-of-seva SVG favicon and crawl rules pointing to the sitemap.

- [ ] **Step 5: Add a minimal placeholder home route solely to exercise the shell**

Create `src/pages/index.astro` using `MainLayout` with the final home title and description, a single semantic `<h1>`, and no starter/demo content.

- [ ] **Step 6: Build and rerun shell tests**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: shell assertions PASS and `dist/index.html` is generated.

- [ ] **Step 7: Commit the shared shell**

```bash
git add src/styles src/layouts src/components/Header.astro src/components/Footer.astro src/components/FloatingContact.astro src/components/SiteScripts.astro src/pages/index.astro public tests/build-output.test.ts
git commit -m "feat: add Seva Editorial design system and shared shell"
```

## Task 3: Reusable storytelling components and complete home page

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/PageHero.astro`
- Create: `src/components/Breadcrumb.astro`
- Create: `src/components/SectionHeading.astro`
- Create: `src/components/ProgramCard.astro`
- Create: `src/components/FeatureCard.astro`
- Create: `src/components/ImpactCard.astro`
- Create: `src/components/StatsStrip.astro`
- Create: `src/components/CTASection.astro`
- Create: `src/components/VolunteerCTA.astro`
- Create: `src/components/DonationCTA.astro`
- Create: `src/components/TestimonialCard.astro`
- Modify: `src/pages/index.astro`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: typed data and `MainLayout` from Tasks 1–2.
- Produces: reusable section components with typed Astro props; finished home page and common hero/CTA patterns for later pages.

- [ ] **Step 1: Extend failing output tests for the home narrative**

Assert the final hero heading and eyebrow, both hero actions, trust line, 2020 story copy, philosophy heading, six focus titles, all nine program names, five qualitative impact labels, three neutral testimonial labels, activity records marked illustrative when required, and three final CTA links.

- [ ] **Step 2: Verify the new assertions fail**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: FAIL on missing home sections.

- [ ] **Step 3: Build the reusable section components**

Give each component one responsibility, typed props, semantic markup, sensible heading-level control, and no client hydration. Use Lucide Astro imports so icons render as static inline SVG.

- [ ] **Step 4: Build the complete home page**

Implement the hero, story collage, philosophy artwork, focus grid, alternating program preview, qualitative impact strip, illustrative latest activities, testimonial placeholders, and participation CTA in the approved narrative order.

- [ ] **Step 5: Verify home output and static build**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: all home narrative assertions PASS.

- [ ] **Step 6: Commit the home experience**

```bash
git add src/components src/pages/index.astro tests/build-output.test.ts
git commit -m "feat: build premium home storytelling experience"
```

## Task 4: About, programs, education, and community page family

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/programs.astro`
- Create: `src/pages/education-skills.astro`
- Create: `src/pages/community-development.astro`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: `MainLayout`, `PageHero`, shared cards/CTAs, `organisation`, and `programs`.
- Produces: four complete static routes with unique metadata and page-specific narrative layouts.

- [ ] **Step 1: Add failing route and content tests**

Assert the four output files exist; each has exactly one `<h1>`, a unique title/description/canonical; About contains six values and verified 2020/2022 journey facts; Programs contains all nine numbered program sections; Education contains the four-stage pathway and supplied vocational areas; Community contains all six program areas and eight supplied awareness topics.

- [ ] **Step 2: Verify route tests fail**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: FAIL because the four routes are absent.

- [ ] **Step 3: Implement About and Programs**

Use an editorial timeline and service cycle on About. Generate Program sections from the shared data and route every CTA to a relevant contact or program enquiry destination.

- [ ] **Step 4: Implement Education & Skills and Community Development**

Build the Learn → Practice → Build Confidence → Create Opportunity path and the supplied education/vocational content. Build community themes and icon-led awareness topics without unsupported outcome claims.

- [ ] **Step 5: Verify all four routes**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: all Task 4 assertions PASS.

- [ ] **Step 6: Commit the program page family**

```bash
git add src/pages/about.astro src/pages/programs.astro src/pages/education-skills.astro src/pages/community-development.astro tests/build-output.test.ts
git commit -m "feat: add organisation and program page family"
```

## Task 5: Reach, governance, participation, donation, and policy pages

**Files:**
- Create: `src/components/ComplianceCard.astro`
- Create: `src/pages/our-reach.astro`
- Create: `src/pages/governance.astro`
- Create: `src/pages/get-involved.astro`
- Create: `src/pages/donate.astro`
- Create: `src/pages/privacy-policy.astro`
- Create: `src/pages/terms.astro`
- Create: `src/pages/donation-policy.astro`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: organisation reach, board, compliance, shared layout, heroes, cards, and CTAs.
- Produces: seven complete routes, inline reach SVG, responsive hierarchy, and inactive-document compliance treatment.

- [ ] **Step 1: Add failing content-safety and route tests**

Assert all seven files render; reach names six states, four highlighted places, and seven resource types; governance contains the full eight-level hierarchy, four board members, and six compliance facts; no compliance card contains a certificate hyperlink; donate contains the supplied donation-details warning and no bank/account/IFSC values; policy pages expose contact routes and no invented legal registration claims.

- [ ] **Step 2: Verify the tests fail**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: FAIL because these routes are absent.

- [ ] **Step 3: Implement Our Reach and Governance**

Use an accessible schematic inline SVG with a text alternative and a DOM-based hierarchy that becomes vertical on mobile. Generate initials from board-member names and render compliance documents as request-only states.

- [ ] **Step 4: Implement Get Involved and Donate**

Create distinct volunteer, partner, and support pathways with only supplied participation categories. Keep donation actions limited to verified call, WhatsApp, and contact routes.

- [ ] **Step 5: Implement the three policy pages**

Use conservative informational copy, clear section headings, the supplied contact details, and no guarantees beyond the static site's actual behavior.

- [ ] **Step 6: Verify safety and route output**

Run: `npm run build && npm test -- tests/build-output.test.ts`

Expected: all Task 5 assertions PASS.

- [ ] **Step 7: Commit reach, governance, participation, and policies**

```bash
git add src/components/ComplianceCard.astro src/pages/our-reach.astro src/pages/governance.astro src/pages/get-involved.astro src/pages/donate.astro src/pages/privacy-policy.astro src/pages/terms.astro src/pages/donation-policy.astro tests/build-output.test.ts
git commit -m "feat: add transparency and participation pages"
```

## Task 6: Gallery, accessible lightbox, and configurable contact form

**Files:**
- Create: `src/components/GalleryCard.astro`
- Create: `src/components/ContactForm.astro`
- Create: `src/scripts/gallery.ts`
- Create: `src/scripts/contact-form.ts`
- Create: `src/pages/gallery.astro`
- Create: `src/pages/contact.astro`
- Create: `tests/interactions.test.ts`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: `galleryCategories`, `galleryItems`, and `organisation`.
- Produces: `filterGallery(items: GalleryItem[], category: string): GalleryItem[]`, `validateContactForm(input: ContactFormInput): ContactFormErrors`, and `submissionMode(endpoint?: string): 'remote' | 'contact-alternatives'` plus two complete pages.

- [ ] **Step 1: Write failing pure interaction tests**

Test that `filterGallery` returns all items for `All`, only exact-category items otherwise, and an empty array for unknown categories. Test required full name, valid Indian/international phone shape, optional-but-valid email, reason, non-empty message, agreement, and both submission modes.

- [ ] **Step 2: Verify interaction tests fail**

Run: `npm test -- tests/interactions.test.ts`

Expected: FAIL because the utility modules do not exist.

- [ ] **Step 3: Implement the pure filtering and form-state utilities**

Keep functions DOM-independent and typed; return field-keyed errors rather than rendered strings from validation.

- [ ] **Step 4: Run unit tests**

Run: `npm test -- tests/interactions.test.ts`

Expected: PASS.

- [ ] **Step 5: Add failing rendered-output assertions**

Assert Gallery contains seven `aria-pressed` filter controls, a live result count, lazy-loaded illustrative images, an accessible dialog/lightbox, and no claim that images depict actual beneficiaries. Assert Contact contains four contact cards, all specified labelled fields/options, the agreement checkbox, status live region, and no hardcoded form action.

- [ ] **Step 6: Implement Gallery and Contact pages**

Wire lightweight module scripts for filtering, dialog focus restoration, Escape handling, validation, remote submission only when configured, and an honest contact-alternatives result otherwise.

- [ ] **Step 7: Build and verify both pages**

Run: `npm run build && npm test`

Expected: all unit and rendered-output tests PASS.

- [ ] **Step 8: Commit interaction pages**

```bash
git add src/components/GalleryCard.astro src/components/ContactForm.astro src/scripts src/pages/gallery.astro src/pages/contact.astro tests
git commit -m "feat: add accessible gallery and contact experience"
```

## Task 7: Production verification, responsive review, and final polish

**Files:**
- Modify: `src/styles/global.css`
- Modify: affected `src/**/*.astro` files discovered during review
- Modify: `tests/build-output.test.ts`
- Create: `README.md`

**Interfaces:**
- Consumes: the complete site from Tasks 1–6.
- Produces: verified production build, documented editing/deployment workflow, and corrected responsive/accessibility behavior.

- [ ] **Step 1: Complete the final output test matrix**

Assert all fourteen HTML routes exist; titles, descriptions, and canonical URLs are present and unique; sitemap and robots exist; meaningful images have alt text; images below the first viewport are lazy-loaded; there are no empty `href` values, fake certificate links, bank-detail patterns, social links, real-person testimonials, or disabled-but-clickable controls.

- [ ] **Step 2: Run the complete automated verification**

Run: `npm run check`

Expected: no errors.

Run: `npm run build && npm test`

Expected: static build and all tests PASS.

- [ ] **Step 3: Start the local preview and inspect representative routes**

Run: `npm run preview -- --host 127.0.0.1`

Inspect Home, Programs, Our Reach, Governance, Gallery, and Contact at 320, 375, 430, 768, 1024, and 1440 pixels. Check overflow, heading fit, image crops, drawer behavior, floating-action clearance, hierarchy stacking, gallery columns, lightbox keyboard behavior, form errors, focus visibility, and reduced-motion behavior.

- [ ] **Step 4: Fix only issues observed during verification**

Apply targeted CSS, semantic, copy, or interaction corrections while preserving the approved design and central data model.

- [ ] **Step 5: Rerun verification after fixes**

Run: `npm run check && npm run build && npm test`

Expected: all commands exit 0 after the final edits.

- [ ] **Step 6: Document maintenance and configuration**

Write `README.md` with install/build/preview commands, central content-file locations, representative-image replacement guidance, `PUBLIC_SITE_URL`, optional `PUBLIC_FORM_ENDPOINT`, and the rule that verified certificate/social/payment links must be supplied before enabling them.

- [ ] **Step 7: Commit the verified site**

```bash
git add README.md src tests public package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts .env.example
git commit -m "feat: complete and verify Sanatan Dharam Sewa Kendra website"
```

