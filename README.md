# Kasi Bakes — Website Project

**Module:** Web Development (Introduction) — WEDE5020  
**Student Name:** Amukelani Mkhari  
**Institution:** IIE Rosebank College  
**GitHub Repository:** https://github.com/amukelanimkhari19-a11y/kasi-bakes  
**Live Site:** https://amukelanimkhari19-a11y.github.io/kasi-bakes/

---

## Project Overview

Kasi Bakes is a fictional artisan bakery based in Mofolo, Soweto, Johannesburg. This project involves the design and development of a five-page professional website for the bakery, built across three parts of the WEDE5020 Portfolio of Evidence (POE).

The website showcases the bakery's products, history, and contact information, while implementing HTML5 semantic structure, CSS styling with responsive design, JavaScript interactivity, SEO best practices, and accessible web development principles.

---

## Website Goals and Objectives

- Establish an online presence for Kasi Bakes in the Soweto/Johannesburg area
- Allow customers to browse products and place bulk/custom order enquiries online
- Provide contact information and interactive maps for both bakery locations
- Optimise the site for search engines to increase organic discoverability
- Ensure the site is accessible and usable across desktop, tablet, and mobile devices

### Key Performance Indicators (KPIs)

| KPI | Target |
|-----|--------|
| Pages indexed by search engines | All 5 pages |
| Mobile responsiveness | Fully responsive (3 breakpoints) |
| Form completion rate | Enquiry and contact forms functional |
| Page load speed | Optimised images and minimal dependencies |
| Accessibility | Semantic HTML, ARIA labels, keyboard navigation |

---

## Key Features and Functionality

### Part 1 — HTML Foundation
- Five fully structured HTML pages using semantic HTML5 elements
- Consistent navigation menu linking all pages
- Real bakery content (products, team, history, contact info)
- Organised file and folder structure

### Part 2 — CSS Styling
- External stylesheet (`css/styles.css`) linked to all pages
- CSS custom properties (variables) for consistent theming
- Flexbox and CSS Grid layout for all sections
- Responsive design with breakpoints at 768px (tablet) and 480px (mobile)
- Pseudo-classes: `:hover`, `:focus`, `:active`, `:focus-visible`
- Mobile hamburger navigation menu

### Part 3 — JavaScript and SEO
- **Accordion FAQ** — expandable/collapsible FAQ panels on the homepage
- **Mobile navigation toggle** — hamburger menu controlled by JavaScript
- **Product search and filter** — live search and category filter on products page
- **Gallery lightbox** — full-screen image viewer with keyboard navigation
- **Enquiry form** — full validation + bulk pricing calculator with discount logic
- **Contact form** — full validation + mailto email compilation
- **Interactive maps** — Leaflet.js maps for two bakery locations with tab switching
- **Character counter** — real-time character count on contact textarea
- **SEO meta tags** — title tags, meta descriptions, keywords on all 5 pages
- **robots.txt** — search engine crawler instructions
- **sitemap.xml** — full XML sitemap for all 5 pages
- **Deployed** on GitHub Pages

---

## File and Folder Structure

```
kasi-bakes/
│
├── index.html          # Homepage
├── about.html          # About Us page
├── products.html       # Products page
├── enquiry.html        # Order Enquiry page
├── contact.html        # Contact page
│
├── css/
│   └── styles.css      # External stylesheet (Part 2 + Part 3)
│
├── javascript/
│   └── main.js         # All JavaScript functionality (Part 3)
│
├── images/             # All website images
│   ├── vetkoek.jpg
│   ├── koeksisters.jpg
│   ├── white-bread.jpg
│   ├── brown-bread.jpg
│   ├── seeded-bread.jpg
│   ├── rusks.jpg
│   ├── doughnuts.jpg
│   ├── scones.jpg
│   ├── custom-cake.jpg
│   ├── bulk-order.jpg
│   ├── about-bakery.jpg
│   ├── team-nomsa.jpg
│   ├── team-sipho.jpg
│   ├── team-thandi.jpg
│   └── team-bongani.jpg
│
├── robots.txt          # Search engine crawler instructions
├── sitemap.xml         # XML sitemap for SEO
└── README.md           # This file
```

---

## Sitemap

```
Kasi Bakes Website
│
├── Home (index.html)
│   ├── Hero section
│   ├── Features / Why Choose Us
│   ├── Featured Products (3 cards)
│   ├── FAQ Accordion
│   └── Find Us
│
├── About (about.html)
│   ├── Our Story
│   ├── Mission & Vision
│   ├── Meet the Team
│   └── Our Journey (Timeline)
│
├── Products (products.html)
│   ├── Search Bar
│   ├── Category Filter
│   ├── Product Grid (10 products)
│   └── Gallery Lightbox
│
├── Enquiry (enquiry.html)
│   ├── Order Enquiry Form
│   │   ├── Personal details
│   │   ├── Product type & quantity
│   │   ├── Delivery/collection selection
│   │   └── Date and special instructions
│   ├── JS Validation + Bulk Pricing Response
│   └── Pricing Guide
│
└── Contact (contact.html)
    ├── Contact Info (2 branches)
    ├── Contact Message Form
    │   └── Mailto email compilation
    └── Interactive Maps (Leaflet.js — 2 locations)
```

---

## Timeline and Milestones

| Milestone | Description | Submission |
|-----------|-------------|------------|
| Part 1 | HTML structure, project proposals, sitemap, GitHub setup | Semester 1 |
| Part 2 | CSS styling, responsive design, README update | Semester 2 |
| Part 3 | JavaScript, SEO, forms, deployment | June 2026 |

---

## Responsive Design Breakpoints

| Breakpoint | Screen Width | Layout |
|------------|-------------|--------|
| Desktop | > 768px | 3–4 column grid, full navigation |
| Tablet | ≤ 768px | 2 column grid, hamburger nav |
| Mobile | ≤ 480px | Single column, stacked layout |

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, layout (Flexbox/Grid), responsive design |
| JavaScript (ES6) | Interactivity, form validation, DOM manipulation |
| Leaflet.js v1.9.4 | Interactive maps (open source) |
| Git / GitHub | Version control and hosting |
| GitHub Pages | Free website deployment |

---

## SEO Implementation

| Page | Title Tag | Meta Description | Keywords |
|------|-----------|-----------------|----------|
| index.html | Kasi Bakes \| Artisan Bakery in Mofolo, Soweto | Freshly baked breads, traditional SA bakes... | bakery Soweto, artisan bread... |
| about.html | About Us \| Kasi Bakes – Our Story... | Learn about Kasi Bakes, founded in 2018... | Kasi Bakes story, about Soweto bakery... |
| products.html | Our Products \| Kasi Bakes... | Browse Kasi Bakes full product catalogue... | bread Soweto, vetkoek order... |
| enquiry.html | Place an Order \| Kasi Bakes... | Place a bulk or custom order with Kasi Bakes... | order bread Soweto, bulk order bakery... |
| contact.html | Contact Us \| Kasi Bakes... | Contact Kasi Bakes for general enquiries... | contact Kasi Bakes, bakery Soweto location... |

Additional SEO files:
- `robots.txt` — instructs all crawlers to index the full site
- `sitemap.xml` — lists all 5 pages with priority and change frequency

---

## Deployment

The website is deployed on **GitHub Pages**.

**Live URL:** https://amukelanimkhari19-a11y.github.io/kasi-bakes/

### Deployment Steps
1. Push all files to the `main` branch of the GitHub repository
2. Go to **Settings → Pages** in the repository
3. Set source to **Deploy from a branch → main → / (root)**
4. GitHub Pages automatically builds and publishes the site

---

## Changelog

All changes are recorded in reverse chronological order (newest first).

---

### Part 3 — June 2026

**[2026-06-19] — Part 3: JavaScript, SEO, Forms, Deployment**

- Added `javascript/main.js` with all JavaScript functionality
- Implemented mobile navigation hamburger toggle with ARIA support
- Implemented FAQ accordion with keyboard accessibility on `index.html`
- Implemented product search (live text filter) on `products.html`
- Implemented category filter buttons (All, Breads, Traditional, Pastry, Bulk) on `products.html`
- Implemented gallery lightbox on `products.html` with keyboard navigation (Escape, Arrow keys) and previous/next buttons
- Implemented enquiry form on `enquiry.html` with full JavaScript client-side validation:
  - Required field checks
  - Email format validation
  - SA phone number format validation (10-digit)
  - Minimum 48-hour advance date validation
  - Checkbox confirmation validation
- Implemented bulk pricing calculator on `enquiry.html`:
  - Calculates unit price based on product type
  - Applies bulk discounts (10% for 50–99, 15% for 100–199, 20% for 200+)
  - Adds delivery fee where applicable
  - Displays itemised price breakdown after submission
- Implemented contact form on `contact.html` with full JavaScript validation
- Implemented mailto email compilation on `contact.html` — compiles form data into a structured email and opens the user's email client
- Implemented real-time character counter on contact message textarea
- Implemented interactive Leaflet.js maps on `contact.html` for two branch locations (Mofolo and Pimville)
- Implemented map tab switching between the two branch maps
- Added SEO meta tags (title, description, keywords, author, Open Graph) to all 5 pages
- Created `robots.txt` with sitemap reference
- Created `sitemap.xml` with all 5 pages, priorities, and change frequencies
- Updated `css/styles.css` with Part 3 styles: accordion, search/filter, lightbox, forms, maps, response panels
- Added `onerror` fallback placeholder images on all product and team images

**[2026-06-19] — Part 3: Corrections from Part 2 Feedback**

- **Feedback for Part 1 (lost 6/10):** Rebuilt all HTML pages from scratch with fully correct semantic structure — `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` used correctly throughout. Added detailed HTML comments to all code blocks. Fixed `<link>` stylesheet placement inside `<head>`. Removed all content placed outside `<body>`.
- **CSS Pseudo-classes (lost 3/10):** Extended pseudo-class usage across all interactive elements including `:hover`, `:focus`, `:focus-visible`, `:active`, `:nth-child`, `::before`, `::after`. Added decorative `::after` underlines on all section headings.
- **CSS Layout structure (lost 1/5):** Fixed element alignment inconsistencies in the footer and product grid. Ensured all grid and flex layouts have consistent `gap` and `align-items` values.
- **Commits (lost 1/5):** Improved commit message format to include type prefix (e.g. `feat:`, `fix:`, `docs:`, `style:`) and descriptive body.

---

### Part 2 — Semester 2, 2026

**[2026] — Part 2: CSS Styling and Responsive Design**

- Created external stylesheet `css/styles.css` and linked to all 5 HTML pages
- Defined CSS custom properties (variables) for colours, fonts, spacing, and shadows
- Applied CSS reset (box-sizing, margin, padding reset)
- Styled header with sticky positioning, logo, and navigation
- Styled hero section with gradient background
- Applied Flexbox to header, hero buttons, contact info, and navigation
- Applied CSS Grid to features (4-col), products (3-col), footer (4-col), team (4-col)
- Styled product cards with hover transform and box-shadow
- Styled footer with dark background and gold headings
- Added pseudo-classes: `:hover` on nav links, cards, buttons; `:focus` on all interactive elements; `:active` on buttons
- Implemented responsive design — tablet breakpoint at 768px: 2-column grids, hamburger nav shown
- Implemented responsive design — mobile breakpoint at 480px: single-column, reduced padding
- Added responsive image styles (`max-width: 100%`, `object-fit: cover`)
- Updated README with Part 2 information, responsive screenshots, and references

---

### Part 1 — Semester 1, 2026

**[2026] — Part 1: HTML Foundation**

- Set up private GitHub repository
- Created initial file and folder structure (root HTML files, css/, js/, images/)
- Created 5 HTML pages: `index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`
- Added HTML boilerplate with `DOCTYPE`, `html`, `head`, `body` on all pages
- Added navigation menu linking all 5 pages consistently
- Added homepage hero section, features grid, and featured products
- Added About page with organisation history and team members
- Added Products page with product listings
- Added basic Enquiry form fields (HTML only)
- Added Contact page with address, phone, email, and two location addresses
- Committed initial project structure with descriptive messages
- Added `README.md` with project overview, sitemap, and Part 1 details

---

## References

Duckett, J. 2011. *HTML and CSS: Design and Build Websites*. Indianapolis: John Wiley & Sons.

Duckett, J. 2014. *JavaScript and jQuery: Interactive Front-End Web Development*. Indianapolis: John Wiley & Sons.

Leaflet.js. 2024. *Leaflet: An open-source JavaScript library for mobile-friendly interactive maps*. [Online]. Available at: https://leafletjs.com [Accessed: 15 June 2026].

MDN Web Docs. 2024. *HTML: HyperText Markup Language*. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML [Accessed: 10 June 2026].

MDN Web Docs. 2024. *CSS: Cascading Style Sheets*. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS [Accessed: 10 June 2026].

MDN Web Docs. 2024. *JavaScript Guide*. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide [Accessed: 12 June 2026].

OpenStreetMap. 2024. *OpenStreetMap*. [Online]. Available at: https://www.openstreetmap.org [Accessed: 15 June 2026].

Sitemaps.org. 2024. *Sitemaps XML format*. [Online]. Available at: https://www.sitemaps.org/protocol.html [Accessed: 15 June 2026].

W3Schools. 2024. *HTML Tutorial*. [Online]. Available at: https://www.w3schools.com/html [Accessed: 8 June 2026].

W3Schools. 2024. *CSS Tutorial*. [Online]. Available at: https://www.w3schools.com/css [Accessed: 8 June 2026].

W3Schools. 2024. *JavaScript Tutorial*. [Online]. Available at: https://www.w3schools.com/js [Accessed: 12 June 2026].

Web.dev. 2024. *Learn SEO*. [Online]. Available at: https://web.dev/learn/seo [Accessed: 14 June 2026].

---

*README last updated: 19 June 2026 — Part 3 submission*
