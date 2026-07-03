import { useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Hero,
  Eyebrow,
  GoldButton,
  SectionHeading,
  SplitMedia,
  TiltTags,
  TiltStatCards,
  FaqAccordion,
  ClosingCta,
  useReveal,
} from '../components/services/premium';

const META_TITLE = 'Skin Care Services in Kochi | DAVIN Beauty Salon';
const META_DESCRIPTION =
  'Reveal your best skin at DAVIN Beauty Salon, Kochi. Our skilled therapists provide personalized skin care treatments for a flawless, healthy glow.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Skin Care Services',
  provider: {
    '@type': 'BeautySalon',
    name: 'DAVIN Beauty Salon',
    telephone: '+918089069996',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stadium Link Road, Kathrikadavu',
      addressLocality: 'Kaloor, Kochi',
      postalCode: '682025',
    },
  },
  serviceType: ['Facial', 'Clean-Up', 'Waxing', 'Threading', 'De-Tan Treatment', 'Skin Brightening', 'Gold Facial', 'Fruit Facial'],
  areaServed: 'Kochi, Ernakulam, Kerala',
};

const SERVICES = [
  {
    n: '01',
    title: 'Facials in Kochi',
    kicker: 'Professional Facials for Every Skin Type at DAVIN',
    image: '/images/service-skin.jpg',
    imageAlt: 'Professional facial treatment at DAVIN Beauty Salon Kaloor',
    body:
      "At DAVIN, the leading skin care salon in Kaloor, our professional facial menu is thoughtfully designed to address every concern from daily dullness and dehydration to pigmentation, premature ageing, and acne. Every facial in Kochi at DAVIN is a structured, multi-step ritual delivered by trained therapists using premium, clinically chosen formulations leaving skin refreshed, luminous, and visibly healthier after every session.\n\nWhether you're searching for a skin brightening facial near you in Kochi, a deep-cleansing skin detox facial in Kerala, or a targeted glow treatment in Kochi, our facial menu has the perfect option for your skin.",
    available:
      'Classic Clean-Up · Gold Facial · Fruit Facial · Pearl Facial · De-Pigmentation Facial · Anti-Aging Facial · Hydrating & Glow Facial · Acne & Oily Skin Facial',
  },
  {
    n: '02',
    title: 'Skin Clean-Ups in Kochi',
    kicker: 'Quick, Effective Face Clean-Up at DAVIN',
    image: '/images/salon-interior.jpg',
    imageAlt: 'Skin clean-up treatment room at DAVIN Beauty Salon Kaloor',
    body:
      'A fast, effective face clean-up in Kaloor — skin that looks refreshed in under an hour.\n\nFor clients with a busy lifestyle, our professional skin clean-up in Kochi is the ideal way to keep skin consistently clear and healthy between deeper facial appointments. In just 30–40 minutes at our skin care salon in Kaloor, your skin is cleansed, exfoliated, extracted, toned, and moisturized leaving you looking noticeably fresh and put-together.\n\nSuitable for all skin types and equally popular with men and women, the face clean-up in Kochi at DAVIN is one of our most-booked treatments loved for its immediate results and unbeatable value.',
  },
  {
    n: '03',
    title: 'De-Tan Treatment in Kochi',
    kicker: 'Restore Your Natural Skin Tone at DAVIN',
    image: '/images/salon-aerial.jpg',
    imageAlt: 'De-tan treatment at DAVIN Beauty Salon Kaloor',
    body:
      "Kerala's sunshine is beautiful. Sun-damaged, uneven skin? We fix that.\n\nProlonged sun exposure from outdoor work, beach outings, or daily commuting can leave skin visibly darker and dull. DAVIN's professional de-tan treatment in Kochi is precisely formulated to reverse sun-induced pigmentation and uneven tone gently lightening tanned areas and restoring your skin's natural, healthy complexion. Using dermatologically approved formulations with kojic acid, turmeric extracts, and gentle AHAs, our de-tan treatment in Kaloor exfoliates pigmented cells, brightens the underlying skin, and reveals a fresher, more radiant finish.",
    available: 'Face & neck · Arms (half/full) · Legs (half/full) · Full body de-tan near Stadium Link Road',
  },
  {
    n: '04',
    title: 'Waxing in Kochi',
    kicker: 'Smooth, Long-Lasting Hair Removal at DAVIN',
    image: '/images/salon-tools.jpg',
    imageAlt: 'Waxing service tools at DAVIN Beauty Salon Kaloor',
    body:
      "Professional waxing in Kochi — precise, comfortable, and beautifully smooth.\n\nAt DAVIN, one of Kochi's most trusted waxing salons near Stadium Link Road, our professional waxing services in Kochi use premium, skin-conditioning formulations to deliver clean, long-lasting hair removal leaving skin silky smooth for 3–5 weeks. We use both soft and hard (stripless) wax, selecting the best formula per area and skin type for optimal comfort and results.",
    available:
      'Facial waxing (upper lip, chin, forehead, sideburns, full face) · Body waxing (arms, legs, underarms, back, stomach) · Full body waxing near Stadium Link Road',
    note: 'Single-use, hygienic wax application tools — for every client, every time.',
  },
  {
    n: '05',
    title: 'Threading in Kochi',
    kicker: 'Eyebrow Shaping & Facial Threading at DAVIN',
    image: '/images/gallery-grooming.jpg',
    imageAlt: 'Eyebrow threading service at DAVIN Beauty Salon Kaloor',
    body:
      "Precise brows. Defined features. Flawless results — every visit.\n\nThreading in Kochi offers unmatched precision for facial shaping and brow definition. At DAVIN, our expert eyebrow threading specialists in Kochi shape brows, remove fine facial hair, and define your features with a level of accuracy waxing simply can't match. Our eyebrow threading in Kochi is gentle on even the most sensitive skin — chemical-free, heat-free, and always leaving a crisp, clean finish.",
    available: 'Eyebrow threading & shaping · Upper lip · Chin · Full face · Forehead',
    note: 'Well-shaped brows transform your entire face — our eyebrow threading specialists in Kochi know exactly how to complement your unique features.',
  },
];

const PILLARS = [
  {
    title: 'Skilled Therapists',
    body: 'Skilled therapists who listen before they treat — every client is assessed before treatment begins.',
  },
  {
    title: 'Premium Products',
    body: 'Premium products chosen for safety and efficacy — no generic formulas, no shortcuts.',
  },
  {
    title: 'Individual Commitment',
    body: 'A sincere commitment to your individual skin — every protocol adapted, every result optimized visit by visit.',
  },
];

const FAQS = [
  {
    q: 'How often should I get a facial in Kochi?',
    a: "A facial at DAVIN in Kochi every 3–4 weeks aligns with your skin's natural renewal cycle, delivering cumulative improvements in tone, texture, and radiance. Regular facials at our skin care salon in Kaloor are the most effective foundation for long-term skin health.",
  },
  {
    q: 'Which facial is best for oily or acne-prone skin in Kochi?',
    a: 'We recommend our Acne & Oily Skin Facial is our most targeted skin detox facial in Kochi or our Classic Clean-Up for regular maintenance. Our therapist at our facial salon in Kochi will assess your skin and recommend the right treatment.',
  },
  {
    q: 'Does waxing in Kochi hurt?',
    a: 'There is a brief sensation during waxing in Kochi, but our therapists use premium, skin-conditioning formulations and expert technique to minimize discomfort. Most clients find each subsequent waxing session at DAVIN, Kaloor progressively more comfortable.',
  },
  {
    q: 'How long does eyebrow threading last in Kochi?',
    a: 'Eyebrow threading in Kochi typically lasts 2–4 weeks. We recommend visiting our threading salon in Kaloor every 2–3 weeks to keep brows consistently defined and perfectly shaped.',
  },
  {
    q: 'Is the de-tan treatment in Kochi safe for all skin types?',
    a: 'Yes, our de-tan treatment in Kochi is safe for all skin tones, including wheatish and deeper complexions common across Kerala. Inform your therapist of any sensitivities before the session for the most appropriate formulation.',
  },
  {
    q: 'What is the difference between a facial and a skin clean-up?',
    a: 'A skin clean-up in Kochi is a 30–40 minute maintenance treatment such as cleansing, exfoliating, and refreshing. A full facial in Kochi is a comprehensive, multi-step therapy targeting specific concerns like ageing, pigmentation, or acne. Our therapists at this skin care parlour in Ernakulam will guide you to the right choice.',
  },
];

function useMetaTags(title: string, description: string, schema?: object) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDescription?.content ?? '';
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    let schemaTag: HTMLScriptElement | null = null;
    if (schema) {
      schemaTag = document.createElement('script');
      schemaTag.type = 'application/ld+json';
      schemaTag.text = JSON.stringify(schema);
      document.head.appendChild(schemaTag);
    }

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `
      a, button { cursor: none !important; }
      @media (pointer: coarse) {
        body { cursor: auto !important; }
        a, button { cursor: auto !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.title = prevTitle;
      if (metaDescription) metaDescription.content = prevDescription;
      if (schemaTag) document.head.removeChild(schemaTag);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [title, description, schema]);
}

function Intro() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SplitMedia
          image="/images/salon-interior.jpg"
          imageAlt="Skin care therapy room at DAVIN Beauty Salon Kaloor"
          badge="Est. 2020 · Kaloor"
          reverse
        >
          <div style={{ marginBottom: 18 }}>
            <Eyebrow>Kaloor's Skin Authority</Eyebrow>
          </div>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 26px 0' }}>
            Reveal Your Most Radiant Skin at Kochi's Best Facial Salon
          </h2>
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 20px 0' }}>
            Your skin is the first thing the world sees and it deserves far better than a basic routine. At DAVIN Beauty Salon, the most trusted skin care salon in Kochi, our expert skin therapists go well beyond surface-level care. Every facial in Kochi, every face clean-up, every de-tan treatment, and every waxing and threading service in Kochi at our Kaloor salon is crafted to deliver genuinely visible, lasting results brighter skin tone, smoother texture, refined pores, and a natural glow treatment no filter can replicate.
          </p>
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 34px 0' }}>
            What makes DAVIN the best facial salon in Kaloor, Kochi? Before any treatment begins, our therapists assess your skin type, understand your concerns, and personally recommend the most effective care protocol because no two clients have the same skin, and your treatment should always reflect that.
          </p>
          <GoldButton href="tel:+918089069996">Book Now</GoldButton>
        </SplitMedia>
      </div>
    </section>
  );
}

function ServiceRow({ s, index }: { s: (typeof SERVICES)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  const tone = index % 2 === 0 ? 'p-light' : 'p-dark';
  const reverse = index % 2 === 1;
  const paragraphs = s.body.split('\n\n');
  return (
    <section className={tone} style={{ borderTop: index === 0 ? undefined : '1px solid var(--line)', padding: '90px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SplitMedia image={s.image} imageAlt={s.imageAlt} badge={s.kicker} reverse={reverse}>
          <SectionHeading numeral={s.n} title={s.title} />
          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: i === paragraphs.length - 1 ? 0 : '0 0 16px 0', maxWidth: 560 }}>
              {p}
            </p>
          ))}
          {s.available && (
            <div style={{ marginTop: 24 }}>
              <TiltTags label="Available:" tags={s.available.split(' · ')} />
            </div>
          )}
          {s.note && <p style={{ fontSize: 11.5, fontStyle: 'italic', color: 'var(--fg-mute)', margin: '12px 0 0 0', maxWidth: 560 }}>{s.note}</p>}
        </SplitMedia>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const headRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px 0' }}>
        <div ref={headRef} data-reveal-group style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Eyebrow>Our Menu</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', fontWeight: 400, margin: '18px 0 0' }}>
            Our Expert Skin Care Services in Kochi
          </h2>
        </div>
      </section>
      {SERVICES.map((s, index) => (
        <ServiceRow key={s.n} s={s} index={index} />
      ))}
    </>
  );
}

function DifferenceSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow>The Difference</Eyebrow>
        <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 400, margin: '18px 0 26px', textWrap: 'balance' }}>
          The DAVIN Skin Care Difference — Why We're Kochi's Most Trusted Skin Care Salon
        </h2>
        <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', maxWidth: 820, margin: '0 auto 60px' }}>
          At DAVIN, the best skin care parlour in Ernakulam, Kochi, every outcome rests on three pillars: skilled therapists who listen before they treat, premium products chosen for safety and efficacy, and a sincere commitment to your individual skin. Every client's skin is assessed before treatment begins, every protocol is adapted to their specific type and concerns, and every result is optimized visit by visit. No generic formulas. No shortcuts. Just a skin care experience in Kochi that consistently delivers visible results and builds a long-term relationship between you and your best possible skin.
        </p>
        <TiltStatCards items={PILLARS} />
      </div>
    </section>
  );
}

function FaqSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow>Answers</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 400, margin: '18px 0 0' }}>
            Skin Care FAQs
          </h2>
        </div>
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}

export default function SkinCare() {
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA);

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow="Skin Care — SC"
          title="Glow, Revive & Radiate at DAVIN Beauty Salon, Kaloor"
          subline="Facials · Clean-ups · Waxing · Threading · De-Tan — Glowing skin guaranteed, Kochi's most trusted skin care salon"
          image="/images/service-skin.jpg"
          imageAlt="Facial and skin care services at DAVIN Beauty Salon Kaloor"
        />
        <Intro />
        <ServicesGrid />
        <DifferenceSection />
        <FaqSection />
        <ClosingCta
          title="Book Your Skin Care Appointment at DAVIN"
          body="Radiant, glowing skin is just one appointment away at the most trusted skin care salon in Kochi. Whether it's your first facial in Kaloor, a de-tan treatment in Kochi, or professional waxing and threading near Stadium Link Road, our expert therapists are ready to deliver results that genuinely impress."
          crossLinks={[
            { label: 'Hair Care in Kochi →', href: '/services/hair-care' },
            { label: 'Nail Art & Grooming in Kaloor →', href: '/services/nails-grooming' },
            { label: 'Bridal & Party Makeup in Kochi →', href: '/services/makeup' },
            { label: 'View Our Gallery →', href: '/gallery' },
          ]}
        />
      </div>
      <Footer />
    </>
  );
}
