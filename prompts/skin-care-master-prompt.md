# MASTER PROMPT — Build the Skin Care Service Page
`/services/skin-care` — DAVIN Beauty Salon, Kaloor, Kochi

Companion page to [hair-care-master-prompt.md](./hair-care-master-prompt.md) — **same design system, same component patterns**. This file does not repeat the full design-system rationale; it references it and focuses on Skin Care's content mapping. If building these independently, read the "DESIGN SYSTEM" section of the Hair Care prompt first — it is not restated in full here on purpose, to keep both pages pixel-consistent rather than two developers/AIs each drifting toward their own interpretation.

---

## 1. DESIGN SYSTEM — quick reference (full detail in hair-care-master-prompt.md §1)

- **Fonts:** `'Geist Pixel'` for H1/big statement type (uppercase, `clamp(30px, 4.6vw, 66px)`), `'IBM Plex Mono'` monospace for everything else (body 13px/24px, uppercase tracked labels 11px/`0.28em` for eyebrows, `0.12em` for links/buttons).
- **Color:** strict monochrome — white bg / black text sections, or full-bleed black sections with white text. Zero border-radius (`--radius: 0px`). No pink/gold/pastel — this is an editorial-brutalist system, not a typical salon palette.
- **Photography:** grayscale by default (`filter: grayscale(100%)`, hero adds `contrast(1.1)`), reveals clarity/scale (`transform: scale(1.04)`) on hover — this is the site's core "premium" visual cue, especially fitting for a Skin Care page (skin literally "revealed" on interaction).
- **Hero pattern:** full-bleed 92vh black section, grayscale image + dark gradient overlay, two 60×60px hairline corner brackets (top-left, bottom-right), eyebrow label, bottom-anchored Geist Pixel H1, GSAP scale-in + scroll parallax (`yPercent: 12`), staggered fade-up text (`AboutHero.tsx`).
- **Split intro pattern:** 50/50 row, white text panel (uppercase heading, copy, underline CTA link) + black panel with grayscale hover-zoom image (`FacilityDetail.tsx`).
- **3D tilt cards (mandatory 3D element):** `components/about/tilt.ts` — `perspective(900px) rotateY() rotateX() translateY(-4px) scale(1.02)` on mousemove, smooth reset on leave. Apply to every treatment card (Facials, Clean-Ups, De-Tan, Waxing, Threading).
- **Dot-grid pattern** (`.header-pattern`) for dark section texture; **checkerboard** (`.footer-pattern`) reserved for footer only.
- **Shimmer text** (`.shimmer-text`) — one accent use only, on the trust stat line.
- **FAQ:** reuse existing `components/home/accordion.tsx` (Radix accordion, `accordion-down`/`accordion-up`).
- **Final CTA:** mirror `FinalCTA.tsx` — black band, address/phone/hours, two buttons, cross-links to other service pages.
- **Cursor:** reuse `<CustomCursor />` + `<Header />`, hide native cursor on non-touch (see `FacilityDetail.tsx` implementation).
- **Motion:** GSAP + `ScrollTrigger` fade/stagger entrances everywhere, gate parallax/tilt behind `prefers-reduced-motion`.
- **"Premium 3D" = real transforms, not glow/glass/neumorphism:** perspective + rotate on cards, scroll parallax, hairline corner framing, monochrome-to-alive photography. No gradients-as-decoration, no drop-shadow-as-depth.

---

## 2. PAGE METADATA (verbatim)

- **URL Slug:** `/services/skin-care`
- **Meta Title:** `Skin Care Services in Kochi | DAVIN Beauty Salon`
- **Meta Description:** `Reveal your best skin at DAVIN Beauty Salon, Kochi. Our skilled therapists provide personalized skin care treatments for a flawless, healthy glow.`

---

## 3. PAGE CONTENT — every section, every word, mapped to layout

### Hero
- **H1:** Glow, Revive & Radiate at DAVIN Beauty Salon, Kaloor
- **Eyebrow / sub-line under H1:** SKIN CARE — SC  |  Facials · Clean-ups · Waxing · Threading · De-Tan  |  Glowing skin guaranteed — Kochi's most trusted skin care salon
- **Button:** `BOOK NOW`

### Intro (split layout)
**H2:** Reveal Your Most Radiant Skin at Kochi's Best Facial Salon

> Your skin is the first thing the world sees and it deserves far better than a basic routine. At DAVIN Beauty Salon, the most trusted skin care salon in Kochi, our expert skin therapists go well beyond surface-level care. Every facial in Kochi, every face clean-up, every de-tan treatment, and every waxing and threading service in Kochi at our Kaloor salon is crafted to deliver genuinely visible, lasting results brighter skin tone, smoother texture, refined pores, and a natural glow treatment no filter can replicate.
>
> What makes DAVIN the best facial salon in Kaloor, Kochi? Before any treatment begins, our therapists assess your skin type, understand your concerns, and personally recommend the most effective care protocol because no two clients have the same skin, and your treatment should always reflect that.

📞 +91 80890 69996  |  **[ BOOK NOW ]**

### Services grid (3D tilt cards, one per H3)

**H2:** Our Expert Skin Care Services in Kochi

**Card 1 — H3: Facials in Kochi — Professional Facials for Every Skin Type at DAVIN**
> At DAVIN, the leading skin care salon in Kaloor, our professional facial menu is thoughtfully designed to address every concern from daily dullness and dehydration to pigmentation, premature ageing, and acne. Every facial in Kochi at DAVIN is a structured, multi-step ritual delivered by trained therapists using premium, clinically chosen formulations leaving skin refreshed, luminous, and visibly healthier after every session.
>
> Whether you're searching for a skin brightening facial near you in Kochi, a deep-cleansing skin detox facial in Kerala, or a targeted glow treatment in Kochi, our facial menu has the perfect option for your skin.
>
> Our facial range: Classic Clean-Up · Gold Facial · Fruit Facial · Pearl Facial · De-Pigmentation Facial · Anti-Aging Facial · Hydrating & Glow Facial · Acne & Oily Skin Facial

**Card 2 — H3: Skin Clean-Ups in Kochi — Quick, Effective Face Clean-Up at DAVIN**
> A fast, effective face clean-up in Kaloor — skin that looks refreshed in under an hour.
>
> For clients with a busy lifestyle, our professional skin clean-up in Kochi is the ideal way to keep skin consistently clear and healthy between deeper facial appointments. In just 30–40 minutes at our skin care salon in Kaloor, your skin is cleansed, exfoliated, extracted, toned, and moisturized leaving you looking noticeably fresh and put-together.
>
> Suitable for all skin types and equally popular with men and women, the face clean-up in Kochi at DAVIN is one of our most-booked treatments loved for its immediate results and unbeatable value.

**Card 3 — H3: De-Tan Treatment in Kochi — Restore Your Natural Skin Tone at DAVIN**
> Kerala's sunshine is beautiful. Sun-damaged, uneven skin? We fix that.
>
> Prolonged sun exposure from outdoor work, beach outings, or daily commuting can leave skin visibly darker and dull. DAVIN's professional de-tan treatment in Kochi is precisely formulated to reverse sun-induced pigmentation and uneven tone gently lightening tanned areas and restoring your skin's natural, healthy complexion. Using dermatologically approved formulations with kojic acid, turmeric extracts, and gentle AHAs, our de-tan treatment in Kaloor exfoliates pigmented cells, brightens the underlying skin, and reveals a fresher, more radiant finish.
>
> Available for: Face & neck · Arms (half/full) · Legs (half/full) · Full body de-tan near Stadium Link Road

**Card 4 — H3: Waxing in Kochi — Smooth, Long-Lasting Hair Removal at DAVIN**
> Professional waxing in Kochi — precise, comfortable, and beautifully smooth.
>
> At DAVIN, one of Kochi's most trusted waxing salons near Stadium Link Road, our professional waxing services in Kochi use premium, skin-conditioning formulations to deliver clean, long-lasting hair removal leaving skin silky smooth for 3–5 weeks. We use both soft and hard (stripless) wax, selecting the best formula per area and skin type for optimal comfort and results.
>
> Waxing services at DAVIN, Kaloor:
> Facial waxing in Kochi — upper lip, chin, forehead, sideburns, full face
> Body waxing in Kochi — arms, legs, underarms, back, stomach
> Full body waxing near Stadium Link Road — complete top-to-toe smoothness
>
> Single-use, hygienic wax application tools — for every client, every time.

**Card 5 — H3: Threading in Kochi — Eyebrow Shaping & Facial Threading at DAVIN**
> Precise brows. Defined features. Flawless results — every visit.
>
> Threading in Kochi offers unmatched precision for facial shaping and brow definition. At DAVIN, our expert eyebrow threading specialists in Kochi shape brows, remove fine facial hair, and define your features with a level of accuracy waxing simply can't match. Our eyebrow threading in Kochi is gentle on even the most sensitive skin — chemical-free, heat-free, and always leaving a crisp, clean finish.
>
> Threading services at DAVIN, Kaloor: Eyebrow threading & shaping · Upper lip · Chin · Full face · Forehead
>
> Well-shaped brows transform your entire face — our eyebrow threading specialists in Kochi know exactly how to complement your unique features.

### Trust / difference band (shimmer-text on the stat line if reused from Hair Care pattern; this section has no stat line in the source copy, keep it a plain statement band)

**H2:** The DAVIN Skin Care Difference — Why We're Kochi's Most Trusted Skin Care Salon

> At DAVIN, the best skin care parlour in Ernakulam, Kochi, every outcome rests on three pillars: skilled therapists who listen before they treat, premium products chosen for safety and efficacy, and a sincere commitment to your individual skin. Every client's skin is assessed before treatment begins, every protocol is adapted to their specific type and concerns, and every result is optimized visit by visit. No generic formulas. No shortcuts. Just a skin care experience in Kochi that consistently delivers visible results and builds a long-term relationship between you and your best possible skin.

Suggested layout: three-column pillar grid (Skilled Therapists / Premium Products / Individual Commitment) each pulled visually from the paragraph, framed with hairline borders like the `facilities-grid` pattern already in `index.css`, rather than one dense paragraph block — improves scannability while keeping every word intact (paragraph can run above the pillars as the lead-in).

### FAQ (reuse `accordion.tsx`)

**H2:** Skin Care FAQs

**H4: How often should I get a facial in Kochi?**
A facial at DAVIN in Kochi every 3–4 weeks aligns with your skin's natural renewal cycle, delivering cumulative improvements in tone, texture, and radiance. Regular facials at our skin care salon in Kaloor are the most effective foundation for long-term skin health.

**H4: Which facial is best for oily or acne-prone skin in Kochi?**
We recommend our Acne & Oily Skin Facial is our most targeted skin detox facial in Kochi or our Classic Clean-Up for regular maintenance. Our therapist at our facial salon in Kochi will assess your skin and recommend the right treatment.

**H4: Does waxing in Kochi hurt?**
There is a brief sensation during waxing in Kochi, but our therapists use premium, skin-conditioning formulations and expert technique to minimize discomfort. Most clients find each subsequent waxing session at DAVIN, Kaloor progressively more comfortable.

**H4: How long does eyebrow threading last in Kochi?**
Eyebrow threading in Kochi typically lasts 2–4 weeks. We recommend visiting our threading salon in Kaloor every 2–3 weeks to keep brows consistently defined and perfectly shaped.

**H4: Is the de-tan treatment in Kochi safe for all skin types?**
Yes, our de-tan treatment in Kochi is safe for all skin tones, including wheatish and deeper complexions common across Kerala. Inform your therapist of any sensitivities before the session for the most appropriate formulation.

**H4: What is the difference between a facial and a skin clean-up?**
A skin clean-up in Kochi is a 30–40 minute maintenance treatment such as cleansing, exfoliating, and refreshing. A full facial in Kochi is a comprehensive, multi-step therapy targeting specific concerns like ageing, pigmentation, or acne. Our therapists at this skin care parlour in Ernakulam will guide you to the right choice.

### Final CTA (mirror `FinalCTA.tsx`)

**H2:** Book Your Skin Care Appointment at DAVIN

> Radiant, glowing skin is just one appointment away at the most trusted skin care salon in Kochi. Whether it's your first facial in Kaloor, a de-tan treatment in Kochi, or professional waxing and threading near Stadium Link Road, our expert therapists are ready to deliver results that genuinely impress.

📍 1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu, Kaloor, Kochi – 682025
📞 +91 80890 69996  |  🕐 Open Daily: 9:00 AM – 9:00 PM

**Buttons:** `[ BOOK NOW ]`  |  `[ CALL US ]`

**Cross-links:**
`[Hair Care in Kochi →]` → `/services/hair-care`
`[Nail Art & Grooming in Kaloor →]` → `/services/nails-grooming`
`[Bridal & Party Makeup in Kochi →]` → `/services/makeup`
`[View Our Gallery →]` → `/gallery`

---

## 4. NOTES SPECIFIC TO THIS PAGE

- Skin Care's source content has **no dedicated stat/trust line** (no "4.8 stars" callout) — do not fabricate one; if visual parity with the Hair Care page's shimmer-stat-line is wanted, ask before inventing new numbers not present in this copy. Pull the salon-wide "4.8 Stars · 750+ Google Reviews" figure from `manifestoConfig.statsLine` in `config.ts` if the client confirms reuse is fine.
- No comparison table exists in this content (unlike Hair Care's treatment-comparison table) — do not add one; keep the five services as a clean grid instead.
- Six H3-level headers in the FAQ list have inconsistent spacing in the source (`H4:How often...` with no space) — normalized here to `H4: How often...`; content unchanged.

## 5. IMPLEMENTATION CHECKLIST
- [ ] Reuse `<CustomCursor />` + `<Header />` at page top, matching `FacilityDetail.tsx`.
- [ ] All copy above is final — do not paraphrase, shorten, or drop any sentence, duration, or FAQ.
- [ ] Set meta tags to the exact Meta Title / Description above.
- [ ] H1/H2/H3/H4 hierarchy must match exactly as marked — do not flatten headings for styling convenience.
- [ ] Add this page's data to `config.ts` following the existing `Record<Language, string>` bilingual pattern; English content is final here, Malayalam can follow later per existing partial-translation precedent in `facilitiesConfig`.
- [ ] Wire `/services/skin-care` route and update `services.tsx` (currently a "Coming Soon" placeholder) to link here instead.
- [ ] Confirm with client before reusing the "4.8 Stars" stat (see §4) — not present in the Skin Care source copy.
