# Sanatan Dharam Sewa Kendra Website Design Specification

## 1. Purpose and success criteria

Build a premium, production-ready public website for Sanatan Dharam Sewa Kendra that explains its mission, programs, reach, governance, compliance, and ways to participate. The primary audience includes community members, volunteers, donors, CSR teams, institutions, and people seeking trustworthy information about the organisation.

The site succeeds when it:

- feels credible, warm, distinctly Indian, and professionally governed;
- tells a coherent story from mission to programs, community, transparency, and participation;
- works comfortably from 320px mobile screens through large desktops;
- avoids fabricated claims, people, statistics, partnerships, certificates, or financial details;
- remains fast, accessible, searchable, and easy to maintain;
- provides direct call, WhatsApp, volunteer, partner, donation-information, and enquiry paths.

## 2. Approved creative direction: Seva Editorial

The visual direction combines documentary-style community storytelling with the restraint of a premium institutional publication.

### Visual thesis

The website should feel like an open, carefully edited record of service rather than a fundraising template. Large editorial imagery creates emotional connection; generous cream space and structured typography establish trust; green anchors community-development content; saffron signals action; maroon adds cultural depth.

### Signature element

A fine-line “circle of seva” motif will recur sparingly across page heroes, dividers, and CTA backgrounds. It combines concentric rings, radial lines, and small connection points to suggest a mandala, a community gathering, and expanding social impact without using overt religious symbols.

### Design tokens

- Warm Cream: `#FFFDF7` — primary background
- Secondary Cream: `#F7F0E4` — section contrast
- Charcoal: `#242424` — primary text
- Muted Text: `#66645F` — secondary text
- Forest Green: `#295D47` — community, environment, structural accents
- Saffron: `#E8751A` — controlled action accent
- Deep Maroon: `#7B2D26` — display details and footer
- Soft Border: `#E9E2D8` — borders and separators

Typography uses Lora for editorial display headings and Manrope for body copy, navigation, labels, and controls. Fonts will be self-hosted or loaded with a performance-conscious strategy and `font-display: swap`.

The interface uses rounded image frames and cards, but avoids excessive pill shapes. Thin rules, cropped photographic panels, small section labels, and asymmetric editorial compositions provide character without clutter.

## 3. Image policy

No authentic organisation photographs were supplied. The first version will use carefully selected royalty-free photographs of Indian education, skills, women-led activity, environmental care, and community contexts as representative editorial imagery. Copy and alt text must not imply that people shown are actual beneficiaries, staff, or program participants.

The content architecture will make each image easy to replace with verified trust photographs later. Images must be stored locally, resized for their rendered use, and delivered through Astro's image pipeline as responsive AVIF/WebP where supported. Hero imagery loads eagerly; non-critical images use lazy loading.

The gallery will use representative imagery only when an item is explicitly labelled as illustrative. If suitable images cannot be verified for reuse, gallery categories will use tasteful editorial placeholders rather than misrepresenting real activities.

## 4. Information architecture

Primary routes:

- `/` — Home
- `/about` — About Us
- `/programs` — Our Programs
- `/education-skills` — Education & Skills
- `/community-development` — Community Development
- `/our-reach` — Our Reach
- `/governance` — Governance and compliance
- `/gallery` — Filterable gallery
- `/get-involved` — Volunteer, partner, and support pathways
- `/donate` — Verified donation-information pathway
- `/contact` — Contact details and enquiry form
- `/privacy-policy` — Privacy Policy
- `/terms` — Terms & Conditions
- `/donation-policy` — Donation Policy

The header exposes the ten requested navigation destinations and a distinct Donate Now action. On smaller screens, navigation becomes an accessible off-canvas drawer with focus management, Escape-to-close, backdrop dismissal, and body-scroll locking.

The footer provides organisational context, quick links, participation links, verified contact details, and legal links. Social icons are omitted until verified URLs are supplied.

## 5. Story and page design

### Home

The home page establishes the full narrative:

1. Immersive editorial hero with mission statement, two calls to action, trust-line topics, and a restrained scroll cue.
2. Asymmetric story preview with an overlapping image composition.
3. Vasudhaiv Kutumbukam philosophy statement framed by the circle-of-seva artwork.
4. Six focus-area cards with meaningful Lucide icons and restrained hover movement.
5. Alternating program stories drawn from the central programs dataset.
6. Qualitative impact-philosophy strip using Education, Opportunity, Empowerment, Community, and Environment—never invented numbers.
7. Latest-activity cards backed by editable placeholder data and visibly labelled as illustrative where appropriate.
8. Testimonial framework with neutral labels only; no fictional quotes or identities.
9. A broad participation CTA for donation, volunteering, and partnership.

### About

An editorial narrative presents the organisation's 2020 beginning, vision, mission, philosophy, working model, values, and journey. The journey contains only verified milestones: work beginning in 2020 and trust registration in 2022. Values appear as a quiet six-card system, while “How We Work” uses a simple service cycle rather than invented metrics.

### Programs

Nine program sections are generated from a central dataset. Each contains its supplied sequence number, representative image, plain-language description, objectives, and a relevant enquiry link. The design alternates composition to avoid a repetitive card grid. No impact results are claimed.

### Education & Skills

The page unifies non-formal education, vocational skills, digital learning, library and reading, learning support, and employment-oriented skill development. A responsive four-stage pathway—Learn, Practice, Build Confidence, Create Opportunity—acts as the page's organizing visual.

### Community Development

This page focuses on women empowerment, mother and child care, health awareness, environment, road safety, and community outreach. Nutrition, seasonal diseases, clean drinking water, ORS, parenting, savings, and shared responsibility appear as scannable awareness-topic cards.

### Our Reach

A lightweight inline SVG offers a schematic North India representation rather than a precise GIS map. It names the verified states—Delhi, Uttar Pradesh, Haryana, Rajasthan, Uttarakhand, and Chhattisgarh—and highlights New Delhi, Prayagraj, Purvanchal, and Ayodhya. An accompanying resource grid lists project offices, community centres, vocational facilities, non-formal education centres, a library, village chaupals, and outreach without implying quantities.

### Governance

A responsive semantic hierarchy runs vertically on mobile and as a centered stepped diagram on larger screens. Board-member cards use generated initials rather than invented portraits. Compliance cards display the supplied registration facts and show “Document available on request” because no certificate files exist.

### Gallery

The gallery uses an editorial masonry-style CSS layout with category filters. Vanilla JavaScript applies filtering, maintains `aria-pressed`, and updates a live result message. The lightbox uses a native dialog where supported, keeps controls keyboard-accessible, supports Escape, and restores focus to the originating image.

### Get Involved, Donate, and Contact

Get Involved presents three clear pathways: volunteer, partner, and support. Donation explains supported areas while directing visitors to verified phone, WhatsApp, and contact channels instead of exposing unverified bank details. Contact combines verified contact cards with a configurable static enquiry form.

### Policy pages

Privacy, terms, and donation policy pages use clear, conservative language appropriate for an informational static site. They avoid legal promises beyond the supplied operational facts and direct visitors to the organisation for questions.

## 6. Component and data architecture

Astro components remain presentational and receive typed props. Shared content lives in `src/data` so contact details, navigation, programs, organisation facts, activities, and gallery items can be updated without editing page layouts.

Required shared components:

- `Header.astro`, `Footer.astro`, `FloatingContact.astro`
- `Hero.astro`, `PageHero.astro`, `Breadcrumb.astro`, `SectionHeading.astro`
- `ProgramCard.astro`, `FeatureCard.astro`, `ImpactCard.astro`
- `CTASection.astro`, `VolunteerCTA.astro`, `DonationCTA.astro`
- `TestimonialCard.astro`, `GalleryCard.astro`, `ComplianceCard.astro`
- `StatsStrip.astro`, `ContactForm.astro`

`MainLayout.astro` owns global metadata, header/footer composition, structured organisation data, focus skip-link, and shared script loading. Pages provide unique title, description, canonical path, and page-specific content.

Lucide icons are imported at build time through Astro-compatible components, producing inline SVG without a client-side icon bundle.

## 7. Interaction and form behavior

Client-side JavaScript is limited to:

- sticky-header state and mobile-drawer behavior;
- Intersection Observer reveal classes;
- gallery filtering and accessible lightbox;
- contact-form validation and configurable submission behavior.

The contact form has visible labels, autocomplete attributes, helpful inline validation, an agreement checkbox, and announced success/error states. Its action is configured through a public environment variable. When no endpoint is configured, valid submission presents a clear message with direct email/phone alternatives and does not pretend the enquiry was transmitted.

Floating call and WhatsApp controls appear across all pages, remain above mobile safe areas, include desktop tooltips, and never obscure primary content. WhatsApp uses the supplied number and prefilled message.

## 8. Motion and responsive behavior

Motion is purposeful and restrained: a composed hero entrance, reveal-on-scroll sections, small icon/arrow shifts, card elevation, and image scale on hover. All animation is removed or reduced when `prefers-reduced-motion` is enabled.

Breakpoints are designed and verified at 320, 375, 430, 768, 1024, and 1440 pixels. Mobile typography uses fluid `clamp()` sizing. CTA groups stack when needed, wide diagrams become vertical, gallery columns reduce progressively, and all tap targets remain at least approximately 44 pixels.

## 9. SEO, accessibility, and performance

Every route receives a unique title, meta description, canonical URL, Open Graph title/description, and crawlable semantic content. The build includes `robots.txt`, generated sitemap support, an organisation JSON-LD block, and a custom SVG favicon. Social-preview image metadata is omitted until a verified or explicitly requested asset exists.

Accessibility targets WCAG-aware contrast, logical headings, landmarks, alt text, skip navigation, keyboard-operable controls, visible focus styles, accessible drawer/lightbox behavior, descriptive links, and status announcements.

Performance strategy:

- Astro static output with no hydration framework;
- minimal inline or deferred JavaScript;
- optimized responsive local images;
- no autoplay video, large animation libraries, map libraries, or sliders;
- critical hero image prioritization and lazy loading elsewhere;
- minimal font families and weights;
- reusable CSS tokens and component styles without a heavy runtime.

## 10. Project configuration

The project will use Astro, Tailwind CSS, TypeScript data modules, and Lucide icons. Build output is static in `dist`. The package scripts include development, build, and preview. A `.env.example` documents the optional form endpoint and public canonical site URL without containing credentials.

No publishing provider is assumed. The final result will be built and verified locally; deployment can be added when the user specifies a provider or explicitly requests publication.

## 11. Verification and acceptance criteria

Before completion:

- install dependencies and run the production build successfully;
- check that all fourteen routes render and internal links resolve;
- inspect representative pages at mobile, tablet, and desktop widths;
- verify navigation drawer, floating contact actions, gallery filters/lightbox, and form states with keyboard and pointer input;
- verify there is no horizontal overflow at the requested widths;
- confirm reduced-motion behavior and focus visibility;
- scan rendered pages for missing alt text, duplicate page titles, accidental placeholder claims, fake data, fake links, or unverified financial information;
- confirm sitemap, robots, favicon, canonical metadata, and organisation structured data are present;
- confirm no certificate buttons are active without real files.

## 12. Explicit assumptions

- The supplied brief is the factual source of truth.
- The organisation name is preserved exactly as supplied: “Sanatan Dharam Sewa Kendra.”
- No logo, certificate, social profile, bank detail, form endpoint, or authentic programme photography currently exists in the workspace.
- Representative stock/editorial imagery may be replaced later through the central data files.
- The current year is generated at build time for the footer.
- The contact form is locally validated but does not claim successful delivery without a configured endpoint.

