# MASTER PROMPT — Build the Hair Care Service Page
`/services/hair-care` — DAVIN Beauty Salon, Kaloor, Kochi

Use this as the single build spec for the page (e.g. `src/pages/HairCare.tsx` + a `src/components/services/hair-care/` folder). It locks the design system to what already exists in this codebase (Home + About pages) so the new page feels native, not bolted on — and carries every word of the approved content so nothing gets dropped.

---

## 1. DESIGN SYSTEM — reuse exactly, do not invent a new style

This site's identity is **monochrome editorial brutalism with premium 3D touches** — not a typical pastel/pink salon site. Black-and-white, hairline borders, uppercase tracked type, grayscale photography that gains life on hover, GSAP scroll motion, and real 3D transforms (not drop-shadows dressed up as "3D").

### Fonts
- **Display / headings (H1, big statement type):** `'Geist Pixel'` (custom `@font-face`, loaded from `geist/dist/fonts/geist-pixel/GeistPixel-Line.woff2`), weight 400, uppercase, tight `line-height: 1.05`, fluid size via `clamp(30px, 4.6vw, 66px)` for H1. Falls back to monospace.
- **Everything else (body, labels, nav, buttons, eyebrows, FAQ, table):** `'IBM Plex Mono', monospace` — the whole site is set in this one workhorse mono font. Body text ~13px/24px line-height. Eyebrow/labels: 11px, `letter-spacing: 0.28em` (hero eyebrows) or `0.12em` (buttons/links), `text-transform: uppercase`.
- Do not introduce a serif or a script/display font anywhere — it breaks the system.

### Color
Strict two-tone monochrome, driven by CSS vars in `src/index.css` (`--background: 0 0% 100%`, `--foreground: 0 0% 0%`, `--primary: 0 0% 0%` on white, `--radius: 0px` — **zero border-radius anywhere**, everything is hard-edged).
- Base page: white background (`#fff`), black text (`#000`), OR full-bleed black hero sections with white text — no third color, no salon-pink/gold.
- Photography is **desaturated by default** (`filter: grayscale(100%)`), and reveals full color / clarity on hover/scroll-in (`transition: transform 0.6s ease` + optional color reveal). This "grayscale → alive" moment IS the premium cue — use it on every treatment photo.
- Borders: `1px solid #000` (light sections) or `1px solid rgba(255,255,255,0.35)` (dark sections) — hairline only, never a thick colored border.
- No drop shadows for "premium" — depth is created with real transforms (see 3D below), corner brackets, and grayscale/contrast, not box-shadow blur.

### Signature layout patterns already built — reuse these components/idioms
1. **Full-bleed image hero with corner brackets** (`AboutHero.tsx` pattern): 92vh black section, grayscale hero photo with `contrast(1.1)`, dark gradient overlay (`linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)`), two decorative 60×60px corner-bracket frames (top-left + bottom-right, 1px translucent white lines), eyebrow label top, big Geist Pixel H1 bottom-anchored. GSAP: hero image scales in from 1.15→1 with fade, then parallax-scrolls via `ScrollTrigger` (`yPercent: 12`, scrub). H1/eyebrow fade+slide up with `stagger: 0.12`.
2. **Split detail layout** (`FacilityDetail.tsx` pattern): 50/50 row — left = white panel, uppercase heading + copy + underline text-link CTA (letter-spacing widens on hover); right = full-bleed grayscale image on black that scales to `1.04` and de-grayscales slightly on hover. Use this for the "Your Hair. Our Expertise." intro section.
3. **3D tilt cards** (`components/about/tilt.ts`): on mouse move, `transform: perspective(900px) rotateY(Xdeg) rotateX(Ydeg) translateY(-4px) scale(1.02)`, resets smoothly on leave. Apply this exact handler (`handleTiltMove` / `handleTiltLeave`) to every service card in the "Our Expert Hair Care Services" grid (Haircuts, Styling, Coloring, Spa, Keratin, Botox) — this is the page's primary "3D premium" signature.
4. **3D perspective carousel utility classes** already defined in `index.css` (`.scene { perspective: 900px }`, `.carousel { transform-style: preserve-3d }`, `.carousel__cell { backface-visibility: hidden }`): use for an optional rotating showcase of before/after or hero shots inside the hair-treatment comparison section, OR skip if a static grid reads cleaner — tilt cards are the mandatory 3D element, the carousel is optional polish.
5. **Grid dot pattern** (`.header-pattern`) and **checkerboard pattern** (`.footer-pattern`) — use dot pattern behind any black section needing texture (e.g. behind the treatment-comparison table on dark background), checkerboard reserved for footer only.
6. **Shimmer text** (`.shimmer-text`) — reserve for one accent moment only (e.g. the "4.8 Stars / 750+ Reviews" trust line), animates a soft white gradient sweep across text every 4s. Don't overuse.
7. **Hover-lift / img-zoom utilities** (`.hover-lift`, `.img-zoom`) — apply to CTA buttons and any card image respectively.
8. **Custom cursor** — site hides the native cursor (`cursor: none`) in favor of a custom cursor component (see `FacilityDetail.tsx`); reuse `<CustomCursor />` + `<Header />` at the top of this page for consistency, with the coarse-pointer (mobile) fallback already implemented.
9. **FAQ accordion** — reuse the existing `components/home/accordion.tsx` (Radix-based, `accordion-down`/`accordion-up` keyframes) for the Hair Care FAQ block, styled monochrome/hairline to match.
10. **Final CTA band** — mirror `FinalCTA.tsx` structure: black section, address/phone/hours, two buttons (`BOOK NOW` solid, `CALL US` outline), Instagram handle, and a row of text links to the other three service pages.

### Motion rules
- GSAP + `ScrollTrigger` for entrance animation on every section (fade + `y: 40→0`, `power3.out`, staggered children) — same easing/timings as `AboutHero.tsx`.
- Respect `prefers-reduced-motion`: skip parallax/tilt transforms, keep simple fades, if a reduced-motion check already exists elsewhere in the codebase, reuse it; otherwise gate `ScrollTrigger`/tilt behind `window.matchMedia('(prefers-reduced-motion: reduce)')`.

### What "premium 3D" means here (be explicit with any AI/dev implementing this)
Not: gradients, neumorphism, colorful glows, glassmorphism, rounded pill everything.
Is: real CSS 3D transforms (`perspective`, `rotateX/Y`, `translateZ`) on interactive cards, parallax depth on scroll, hairline geometric framing (corner brackets, grid borders), and monochrome photography that "comes alive" on interaction. Restraint + precision = premium, in this system.

---

## 2. PAGE METADATA (verbatim)

- **URL Slug:** `/services/hair-care`
- **Meta Title:** `Hair Care Services in Kochi | DAVIN Beauty Salon Kaloor`
- **Meta Description:** `Get the hair you've always wanted at DAVIN Beauty Salon in Kaloor, Kochi. Professional hair care services tailored to your unique style and needs.`

---

## 3. PAGE CONTENT — every section, every word, mapped to layout

### Hero (pattern #1 above)
- **H1:** Expert Cuts, Color & Treatments at DAVIN Beauty Salon, Kaloor
- **Eyebrow / sub-line under H1:** HAIR CARE — HC  |  Haircuts · Styling · Color · Spa · Keratin · Botox  |  All hair types welcome
- **Contact row:** 📞 +91 80890 69996  |  📍 Stadium Link Road, Kaloor, Kochi
- **Button:** `BOOK NOW`

### Intro (pattern #2, split layout)
**H2:** Your Hair. Our Expertise. Kochi's Finest Hair Care in Kaloor.

> Great hair is never accidental, it takes the right skill, the right products, and a professional who genuinely understands your hair. At DAVIN Beauty Salon, Kochi's leading hair salon on Stadium Link Road, Kaloor, our team of professional hair stylists in Kochi brings technical mastery and creative passion to every service. Whether you need a sharp haircut in Kochi, a vibrant hair coloring makeover, a restorative hair spa treatment, or a transformative keratin treatment in Kochi, you'll walk out of DAVIN with hair that looks, moves, and feels exactly the way you've always wanted.
>
> We welcome every hair type such as straight, wavy, curly, coily, fine, or chemically treated tailoring every service to your hair's unique needs. At DAVIN, your hair isn't just our work. It's our artistry.

📞 +91 80890 69996  |  📍 Stadium Link Road, Kaloor, Kochi — **[ BOOK NOW ]**

### Services grid (pattern #3, mandatory 3D tilt cards — one card per H3)

**H2:** Our Expert Hair Care Services in Kochi

**Card 1 — H3: Haircuts & Precision Cuts — Professional Hair Stylist in Kochi**
> The perfect haircut in Kochi is the most impactful transformation you can make and our professional hair stylists in Kochi are trained to deliver exactly that. From precision women's cuts and fashion-forward bobs to modern men's fades, tapers, and textured styles, every cut begins with a personal consultation to understand your face shape, hair texture, and lifestyle. Clean, confident results crafted for you, not a template.
>
> Available at DAVIN, Kaloor: Women's cuts (layers, bob, fringe) · Men's haircuts in Kochi (fade, crop, taper) · Kids' haircuts · Dry & wet cuts · Face-framing trims

**Card 2 — H3: Hair Styling & Blowouts — Professional Hair Styling in Kochi**
> Walk out of our hair salon in Kaloor looking completely polished. Our stylists use premium heat-protective products and professional tools to deliver a flawless, long-lasting finish — whether it's a special occasion or an elevated everyday look. Every style is crafted to hold beautifully and photograph brilliantly.
>
> Available: Salon blow-dry · Occasion updos & braids · Curls, waves & blow-straight styling · Wedding & event hair setting · Traditional saree draping styles

**Card 3 — H3: Hair Coloring in Kochi — Balayage, Highlights & Global Color**
> Hair coloring in Kochi is one of the most powerful tools of self-expression and at DAVIN, our color specialists are among the most skilled in Ernakulam. Using globally trusted color systems with damage-minimizing techniques, we deliver rich, long-lasting results from soft balayage in Kochi and luminous highlights to dramatic global hair color and precise hair color correction in Kochi.
>
> Available: Global color · Highlights & lowlights · Balayage & hand-painted color · Ombre & sombre · Fashion shades · Grey coverage · Color correction & toning
>
> *Complimentary skin tone consultation included with every coloring service.*

**Card 4 — H3: Hair Spa Treatment in Kochi — Deep Nourishment at DAVIN**
> Heat styling, pollution, and chemical processes leave hair dry, dull, and damaged over time. DAVIN's professional hair spa treatment in Kochi is a multi-step restorative ritual that rebuilds moisture, strengthens strands, and stimulates a healthier scalp delivering a silky, luminous finish you'll feel for weeks. Every session includes a customized hair mask, a relaxing scalp massage, steam infusion, and a professional blowout finish.
>
> Available: Classic hair spa · Deep conditioning spa · Scalp treatment · Anti-hairfall spa · Protein repair spa · Post-color restoration spa

**Card 5 — H3: Keratin Treatment in Kochi — Frizz-Free, Silky Hair at DAVIN**
> DAVIN's keratin treatment in Kochi is our most in-demand hair therapy. This semi-permanent protein-based treatment seals the hair cuticle, eliminates frizz, cuts blow-dry time, and leaves hair noticeably smoother and more manageable for 3–6 months. Our keratin treatment near Stadium Link Road works on all hair types wavy, frizzy, coiled, or chemically processed. Looking for a frizz-free hair treatment in Kerala that truly lasts? DAVIN's keratin is the answer.
>
> Duration: 2.5–4 hrs  |  Longevity: 3–6 months  |  Best for: Frizzy, wavy, thick, or chemically treated hair
>
> *Post-treatment care kit and maintenance guide included.*

**Card 6 — H3: Hair Botox Treatment in Kochi — Repair, Restore & Revive**
> If your hair feels brittle, dull, or damaged despite regular care, DAVIN's hair botox treatment in Kochi is the solution. Unlike hair smoothening in Kochi, which chemically restructures hair bonds, hair botox is a chemical-free, filler-based therapy that fills micro-gaps in the hair cortex restoring shine, thickness, elasticity, and smoothness from the inside out. Ideal for colour-treated and heat-damaged hair.
>
> Duration: 1.5–3 hrs  |  Longevity: 2–4 months  |  Best for: Damaged, dull, or chemically processed hair

### Comparison table (dark section, dot-grid pattern background)

**H2:** Which Hair Treatment Is Right for You? — DAVIN's Expert Guide, Kochi

| Treatment | Key Effect | Best For | Duration |
|---|---|---|---|
| Hair Spa in Kochi | Deep moisture & nourishment | All hair types | 60–90 min |
| Keratin Treatment in Kochi | Frizz elimination + shine | Wavy, frizzy, thick hair | 3–4 hours |
| Hair Botox in Kochi | Repair, conditioning & shine | Damaged, color-treated hair | 2–3 hours |

> Every treatment at our hair salon in Kochi begins with a complimentary hair health assessment.

**Button:** `[ Get Quote ]`

Table styling: hairline `1px solid #000`/white borders, `IBM Plex Mono`, uppercase column headers, zero border-radius, no zebra-striping in color — use alternating opacity (e.g. `rgba(255,255,255,0.03)`) if row separation is needed on the dark background.

### Trust / why-choose band (shimmer-text accent here)

**H2:** Why Kochi's Hair Lovers Choose DAVIN — The Best Hair Salon in Kaloor

**Stat line (apply `.shimmer-text` here):** ⭐ 4.8 Stars  |  750+ Verified Google Reviews  |  Kochi's Most-Trusted Hair Salon

> From the precision haircut in Kochi that finally got it right, to the keratin treatment near Stadium Link Road that transformed a morning routine, to the hair coloring in Kochi that earned a hundred compliments. Our clients' reviews reflect the consistent excellence DAVIN delivers every day. We use only premium, salon-grade products, maintain impeccably hygienic workstations, and deliver a genuinely personalized experience every time.

### FAQ (reuse `accordion.tsx`)

**H2:** Hair Care FAQs

**H4: How often should I get a hair spa treatment in Kochi?**
A hair spa near you in Kochi every 3–4 weeks is ideal for healthy hair maintenance. For damaged or chemically treated hair, monthly sessions at DAVIN deliver the most visible improvement.

**H4: Is keratin treatment in Kochi safe for color-treated hair?**
Yes, our keratin treatment in Kochi is fully safe for color-treated hair and can even enhance your color's vibrancy and longevity. Our stylists customize the formula based on your hair's current condition.

**H4: How long does a keratin treatment near Stadium Link Road last?**
With proper aftercare, a keratin treatment at DAVIN, Kaloor lasts 3–6 months. Personalized aftercare guidance is provided after every session.

**H4: Do you offer a consultation before recommending a hair color?**
Absolutely. Every hair coloring service in Kochi at DAVIN begins with a one-on-one consultation reviewing your hair history, current health, and color goals, before we recommend any technique or shade.

**H4: Is hair smoothing different from a keratin treatment?**
Yes, hair smoothening in Kochi permanently restructures hair bonds for a straight result, while a keratin treatment in Kochi is semi-permanent and enhances manageability without altering your natural pattern. Our team will guide you to the right choice during your consultation.

**H4: Are your hair products safe for sensitive scalps?**
Yes. DAVIN uses dermatologist-tested, professionally certified products suitable for most scalp types. Please inform our team of any sensitivities during your consultation.

### Final CTA (pattern #10, mirror `FinalCTA.tsx`)

**H2:** Book Your Hair Care Appointment at Kochi's Best Hair Salon Today

> Great hair care in Kochi starts with one decision, choosing DAVIN. Our professional hair stylists in Kochi are ready to listen, create, and deliver results that exceed your expectations.
>
> Transform your hair. Elevate your look. Reclaim your confidence.

📍 1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu, Kaloor, Kochi – 682025
📞 +91 80890 69996  |  🕐 Open Daily: 9:00 AM – 9:00 PM

**Buttons:** `[ BOOK NOW ]`  |  `[ CALL US ]`

**Cross-links (text links, underline-on-hover style from `FacilityDetail.tsx`):**
`[Skin Care in Kochi →]` → `/services/skin-care`
`[Nails & Grooming →]` → `/services/nails-grooming`
`[Bridal & Party Makeup →]` → `/services/makeup`
`[View Gallery →]` → `/gallery`

---

## 4. IMPLEMENTATION CHECKLIST
- [ ] Reuse `<CustomCursor />` + `<Header />` at page top, matching `FacilityDetail.tsx`.
- [ ] All copy above is final — do not paraphrase, shorten, or drop any sentence, stat, duration, or FAQ.
- [ ] Set `document.title` / meta tags to the exact Meta Title / Description above (or wire through existing SEO/head helper if one exists in `src/lib`).
- [ ] H1/H2/H3/H4 hierarchy must match exactly as marked (important for SEO — do not flatten headings).
- [ ] Add this page's data to `config.ts` following the existing `Record<Language, string>` bilingual pattern (English content given here; Malayalam can follow the abbreviated style already used elsewhere in `facilitiesConfig`, or be added later — do not block launch on missing `ml` copy).
- [ ] Wire `/services/hair-care` route (React Router) and update `services.tsx` (currently a "Coming Soon" placeholder) to link here instead.
