# Dr. Kathuria's Dentistry — Website

Premium dental clinic website for **Dr. Kathuria's Dentistry**, East of Kailash, New Delhi. NABH Accredited, ISO Certified, trusted by 15,000+ patients from 44+ countries.

## Live Preview

[https://dkd-omega.vercel.app](https://dkd-omega.vercel.app)

## Tech Stack

- **HTML5** — Semantic markup, 90+ pages
- **CSS3** — Custom properties, Grid, Flexbox, animations, scroll reveal, responsive design
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Font Awesome 6.5** — Icons
- **Google Fonts** — Playfair Display + DM Sans
- **Vercel** — Hosting & deployment

## Project Structure

```
dkd/
├── index.html                    # Homepage
├── css/
│   └── style.css                 # Complete design system + responsive breakpoints
├── js/
│   └── main.js                   # Interactive features & animations
├── images/
│   ├── cases/                    # Before & after case photos (white mask)
│   ├── implants/                 # Dental implant case photos
│   ├── treatment-cases/          # Per-treatment case photo folders (53 treatments)
│   ├── treatments/               # Treatment hero images
│   └── staff-*.jpg/png           # Doctor profile photos
│
├── # ── TREATMENT CATEGORY PAGES ──
├── dental-implants.html          # Dental Implants (category)
├── cosmetic-dentistry.html       # Cosmetic Dentistry (category)
├── gum-treatment.html            # Gums Treatment (category)
├── kids-dentistry.html           # Kids Dentistry (category)
├── orthodontics.html             # Orthodontics (category)
├── maxillofacial-surgery.html    # Maxillofacial Surgery (category)
│
├── # ── TREATMENT SUB-PAGES (53 pages) ──
├── single-tooth-implants.html
├── multiple-tooth-implants.html
├── all-on-4-dental-implants.html
├── smile-makeover.html
├── teeth-whitening.html
├── root-canal-treatment.html
├── clear-aligners.html
├── braces.html
├── ... (and 45+ more treatment pages)
│
├── # ── BLOG / ARTICLES ──
├── articles.html                 # Articles listing page
├── blog-dental-implant-cost.html # Blog: Dental Implant Costs in India
├── blog-dental-implant-longevity.html  # Blog: How Long Do Implants Last
├── blog-pediatric-dentist.html   # Blog: Finding a Pediatric Dentist
│
├── # ── COUNTRY TESTIMONIAL PAGES (10 pages) ──
├── usa-testimonials.html         # USA patient reviews (16 reviews)
├── uk-testimonials.html          # UK patient reviews (16 reviews)
├── canada-testimonials.html      # Canada patient reviews (15 reviews)
├── australia-testimonials.html   # Australia patient reviews (16 reviews)
├── new-zealand-testimonials.html # New Zealand patient reviews (8 reviews)
├── europe-testimonials.html      # Europe patient reviews (11 reviews)
├── asia-testimonials.html        # Asia patient reviews (7 reviews)
├── india-testimonials.html       # India patient reviews (14 reviews)
├── africa-testimonials.html      # Africa patient reviews (12 reviews)
├── embassy-testimonials.html     # Embassy patient reviews (4 reviews)
│
├── # ── OTHER PAGES ──
├── about.html                    # About the clinic
├── staff.html                    # Team (Medica-style Instagram cards)
├── cases.html                    # Before & After gallery (masonry + marquee)
├── contact.html                  # Contact page
├── dental-tourism.html           # Dental Tourism (international patients)
├── testimonials.html             # Patient testimonials (country selector)
├── video-testimonials.html       # Video testimonials
├── awards.html                   # Awards & recognition
├── charges.html                  # Treatment pricing
├── services.html                 # All treatments directory
├── smile-analysis.html           # Smile confidence quiz
├── clinic-tour.html              # Clinic tour gallery
├── technology.html               # Advanced technology showcase
└── README.md
```

## Key Features

### Homepage Sections
- Hero swipe slider with touch support & auto-rotation (6 custom banners 1920x1080)
- Why Choose Us infographic
- Meet Your Doctor section (Dr. Sween & Dr. Puneet Kathuria)
- Auto-scrolling before & after cases marquee (21 Instagram case photos)
- Treatments horizontal auto-scroll (9 treatment cards)
- Celebrity Smiles section (Kuldeep Yadav, Krushna Abhishek, Nita Mehta, Prashant Bhushan, Aashi Bagga)
- Google Reviews bounce-scroll (right-to-left)
- Transparent pricing cards (dark olive design, clickable)
- Countries served (44+ flags linking to country testimonial pages)
- Latest Technologies horizontal scroll
- Teledentistry video consultation section
- Instagram Feed section
- Latest blog articles
- Full footer with 4 phone numbers, social links, Click Semrus branding

### Treatment Pages (53 pages)
- Page hero with dark gradient overlay
- Two-column intro (image stack + text)
- Process steps (4-step cards with hover effects)
- Pricing section with gold-bordered cards
- Auto-scroll patient testimonials section (10 international reviews on every page)
- FAQ accordion (click to expand/collapse)
- Before & After cases section
- CTA banner with consultation buttons
- Each category page links to sub-treatment pages

### Country Testimonial Pages (10 pages)
- Separate page per region: USA, UK, Canada, Australia, NZ, Europe, Asia, India, Africa, Embassy
- 119 total patient reviews with real photos from original delhidental.com
- Patient photo, name, country flag, treatment type, star rating, verified badge
- Clean SEO-friendly URLs (e.g. /usa-testimonials)

### Staff Page
- Founders section (premium split-hero layout for Dr. Sween & Dr. Puneet)
- Specialist team in Instagram-style cards
- Real doctor photos, qualifications, social links

### Cases / Gallery Page
- Auto-scrolling marquee with real case photos
- Dental implant cases horizontal scroll (4 real cases)
- Pinterest-style masonry gallery (16 cases)
- Instagram CTA section

### Blog System
- 3 full-length articles (800+ words each)
- Auto-generated Table of Contents (JavaScript reads H2/H3 headings)
- Author info, related articles, CTA
- Full-width responsive layout

### Dental Tourism Page
- International price comparison table
- Concierge services (airport, hotel, translator)
- Countries served (44+ with flags)
- YouTube video testimonials (real videos)
- Treatment Day timeline (5-step procedure)
- Patient testimonials with country flags

### Interactive Components
- **Before/After Slider** — Drag to compare results
- **Smile Quiz** — 5-question interactive quiz with score animation
- **Lightbox** — Click-to-zoom gallery
- **Floating Appointment Panel** — Slide-in booking form
- **Animated Counters** — Number animation on scroll
- **Scroll Reveal** — Fade-in animations
- **Sticky Navigation** — Shrinks on scroll
- **Mega Menu** — Multi-column dropdown with category links
- **FAQ Accordion** — Expand/collapse with icon rotation
- **FAB Buttons** — WhatsApp, Call, Scroll-to-top (mobile)

### Responsive Design
| Breakpoint | Target |
|------------|--------|
| 960px | Tablets — 2-column grids |
| 700px | Mobile — single column, stacked buttons, smaller text |
| 480px | Small phones — compact hero, smaller chips |
| 420px | Extra small — minimal padding |

## Color Palette

| Color | Variable | Hex | Usage |
|-------|----------|-----|-------|
| Olive Dark | `--olive-dark` | `#2D4A14` | Dark backgrounds, buttons |
| Olive | `--olive` | `#5B7B3A` | Primary accent |
| Gold | `--gold` | `#B8963E` | CTA buttons, highlights |
| White | `--white` | `#FFFFFF` | Cards, text |
| Cream | `--cream` | `#FAF8F5` | Alternating section backgrounds |
| Ink | `--ink` | `#0B1220` | Dark text |

## Typography

- **Headlines:** Playfair Display (serif)
- **Body:** DM Sans (sans-serif)

## Contact Information

- **Address:** E-143, East of Kailash, New Delhi 110065
- **India Toll Free:** 1800-11-7272
- **WhatsApp:** +91 98109 36360
- **USA/Canada:** +1 888 981 2145
- **UK:** +44 1970 450032
- **Australia:** +61 3840 04931
- **Email:** dentistdelhi@gmail.com

## Designed & Developed by

[Click Semrus](https://clicksemrus.com)

## License

All rights reserved. © 2026 U and K Oral Wellness LLP — Dr. Kathuria's Dentistry.
