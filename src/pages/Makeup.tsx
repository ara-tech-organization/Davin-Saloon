import { useEffect } from 'react';
import { assetUrl as img } from '../lib/asset';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Hero,
  CenteredIntro,
  SectionBand,
  SectionHeading,
  FeatureGrid,
  TagChips,
  SplitMedia,
  PullQuote,
  ComparisonTable,
  FaqAccordion,
  ClosingCta,
  GoldButton,
  Eyebrow,
  useReveal,
} from '../components/services/premium';

const META_TITLE = 'Makeup Artist in Kochi | DAVIN Beauty Salon';
const META_DESCRIPTION =
  'DAVIN Beauty Salon in Kochi is home to experienced makeup artists specializing in bridal, party & everyday looks. Step in and let us create your perfect look!';

const BRIDAL_STYLES = [
  {
    title: 'Traditional Kerala Bridal Makeup',
    description:
      'Richly defined eyes, warm golden skin tones, precise maang tikka and bindi, a graceful look deeply rooted in South Indian culture. Ideal for brides honouring Kerala traditional bridal makeup heritage.',
  },
  {
    title: 'Contemporary & Indo-Western Bridal Makeup',
    description: 'Sculpted contouring, bold eye artistry, and a flawless skin finish. Perfect for modern brides blending tradition with today.',
  },
  {
    title: 'Malabar Bridal Makeup',
    description:
      'Celebrated through our FTV bridal makeover in Kochi collaboration. Deep-toned eyes, gold-accented skin, and ornate styling that brings the grandeur of North Kerala weddings to life.',
  },
  {
    title: 'Destination & Christian Bridal Makeup',
    description: 'Luminous, romantic, and polished — built to perform across every lighting condition and every aisle moment.',
  },
];

const PARTY_OCCASIONS = [
  'Wedding Guest & Reception Makeup',
  'Engagement Makeup in Kochi',
  'Festive & Cultural Makeup (Onam, Vishu, Eid, Christmas)',
  'Birthday & Anniversary Glam',
  'Cocktail & Evening Event Makeup',
  'Photoshoot & Social Media Makeup',
];

const HD_BEST_FOR = ['Brides & bridesmaids', 'Professional photoshoots', 'Wedding films & reels', 'Any event with professional photography'];

const SAREE_STYLES = [
  'Nivi Style',
  'Kerala Kasavu / Mundum Neriyathum',
  'Gujarati / Seedha Pallav',
  'Bengali Style',
  'Lehenga / Half-Saree Fusion Draping',
  'Contemporary & Designer Draping',
];

const PACKAGE_ROWS = [
  ['Bridal / Party Makeup', 'Flawless face, perfectly matched to your look'],
  ['Bridal Hair Styling', 'Elegant updo, waves, or draping to complete the look'],
  ['Saree Draping in Kochi', 'Perfectly secured for all-day elegance'],
  ['Pre-Event Facial', 'Glowing, prepped skin that holds makeup beautifully'],
  ['Bridal Manicure & Pedicure', 'Polished hands and feet for every photograph'],
  ['Eyebrow Threading & Shaping', 'Defined brows that frame your made-up face'],
];

const FAQS = [
  {
    q: 'Do you offer a trial session before the wedding?',
    a: 'Yes, We highly recommend it. A bridal makeup trial 1–2 weeks before your wedding lets us perfect your look on your skin. A small trial fee applies, adjusted against your final booking.',
  },
  {
    q: 'How long does bridal makeup take at DAVIN?',
    a: "A full bridal makeup in Kochi typically takes 1.5–3 hours depending on the look's complexity and services included (hair styling, saree draping in Kochi).",
  },
  {
    q: 'What is the difference between HD makeup and regular makeup?',
    a: 'Regular makeup can appear heavy under camera lighting. HD makeup in Kochi uses micro-milled pigments engineered to look flawless under DSLR flash, ring lights, and HD video, the preferred choice for any professionally photographed event.',
  },
  {
    q: 'Can you do makeup for darker skin tones?',
    a: 'Absolutely. Our makeup artists in Kochi work beautifully across every complexion from fair to the deepest tones with a comprehensive shade range in all base products.',
  },
];

const CROSS_LINKS = [
  { label: 'Hair Styling →', href: '/services/hair-care' },
  { label: 'Pre-Bridal Facials →', href: '/services/skin-care' },
  { label: 'Nails & Grooming →', href: '/services/nails-grooming' },
  { label: 'View Gallery →', href: '/gallery' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Makeup Services',
  provider: {
    '@type': 'BeautySalon',
    name: 'DAVIN Beauty Salon',
    telephone: '+918089069996',
    url: 'https://davinsalon.com',
    sameAs: 'https://www.instagram.com/davin.salon.kaloor/',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu',
      addressLocality: 'Kaloor',
      addressRegion: 'Kochi, Kerala',
      postalCode: '682025',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '767',
    },
  },
  serviceType: ['Bridal Makeup', 'Party Makeup', 'HD Makeup', 'Airbrush Makeup', 'Saree Draping', 'Engagement Makeup', 'Photoshoot Makeup'],
  areaServed: {
    '@type': 'City',
    name: 'Kochi',
    containedInPlace: {
      '@type': 'State',
      name: 'Kerala',
    },
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '2500',
    highPrice: '35000',
    description: 'Party makeup starting from ₹2,500. Bridal packages available on enquiry.',
  },
};

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

function BridalSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ padding: '20px 40px 90px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/service-makeup.jpg")} imageAlt="Bridal makeup artistry at DAVIN Beauty Salon Kochi" badge="Bridal · FTV Collaboration">
          <SectionHeading numeral="01" title="Bridal Makeup in Kochi — Your Most Beautiful Day, Our Finest Artistry" />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: 0, maxWidth: 560 }}>
            Your bridal makeup in Kochi will live in photographs and memories for a lifetime and at DAVIN, we approach every bridal makeover in Kochi with the reverence and creative excellence it deserves. Our experienced bridal makeup artists in Kochi take time to understand your vision, skin tone, outfit, jewellery, and the spirit of your celebration crafting a look that is breathtakingly, authentically you.
          </p>
        </SplitMedia>

        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '48px 0 0 0' }}>
          Bridal Makeup Styles at DAVIN
        </p>
        <FeatureGrid items={BRIDAL_STYLES} />

        <PullQuote>&ldquo;Nothing makes us happier than hearing our clients leave with a smile.&rdquo; — Team DAVIN</PullQuote>

        <div style={{ marginTop: 36 }}>
          <GoldButton href="tel:+918089069996">Book Now</GoldButton>
        </div>
      </div>
    </section>
  );
}

function PartySection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/service-makeup.jpg")} imageAlt="Party makeup look at DAVIN Beauty Salon Kochi" badge="Party · Glam Nights" reverse>
          <SectionHeading numeral="02" title="Party Makeup in Kochi — Glam Up. Walk In. Own the Room." />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 32px 0', maxWidth: 560 }}>
            Every celebration deserves a party makeup in Kochi that looks as memorable as the occasion. DAVIN's party makeup artists create stunning, personalized looks for receptions, engagements, festivals, birthdays, corporate events, and photoshoots crafted to complement your outfit, features, and the event's vibe. No templates, no repeats every look is made for you.
          </p>
        </SplitMedia>
        <TagChips label="Party Makeup Occasions at DAVIN" tags={PARTY_OCCASIONS} />
        <div style={{ marginTop: 36 }}>
          <GoldButton href="tel:+918089069996">Book Your Party Makeup</GoldButton>
        </div>
      </div>
    </section>
  );
}

function HdSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/salon-aerial.jpg")} imageAlt="HD makeup studio lighting setup at DAVIN Beauty Salon Kochi" badge="HD Makeup · Camera-Ready" reverse>
          <SectionHeading numeral="03" title="HD Makeup in Kochi — Flawless for Every Camera, Stunning in Every Light" />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: 0, maxWidth: 560 }}>
            In the age of 4K cameras and HD reels, your makeup must perform as brilliantly through a lens as it does in person. DAVIN's HD makeup in Kochi delivers an ultra-smooth, camera-optimized finish, flawless in every photograph, long-lasting through every event.
          </p>
        </SplitMedia>
        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '0 0 16px 0' }}>
            What Makes HD Makeup Different?
          </p>
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 28px 0', maxWidth: 700 }}>
            HD makeup uses micro-milled, light-reflecting pigments that blur imperfections and create a genuine second-skin finish invisible on camera. Unlike regular makeup, professional HD makeup for weddings in Kochi holds flawlessly under flash photography, ring lights, and studio setups with no caking, no patchiness, no shine.
          </p>
          <TagChips label="Best for:" tags={HD_BEST_FOR} />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '28px 0 0 0', maxWidth: 700 }}>
            Our HD makeup service in Kochi includes full skin prep, customized HD base, contouring, HD eye artistry, and a long-wear setting finish lasting 12–16+ hours.
          </p>
          <div style={{ marginTop: 36 }}>
            <GoldButton href="tel:+918089069996">Book Now</GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function SareeSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/salon-interior.jpg")} imageAlt="Saree draping styling session at DAVIN Beauty Salon Kochi" badge="Saree · Studio Draping">
          <SectionHeading numeral="04" title="Saree Draping in Kochi — The Saree Is Art. Let Us Perfect It." />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 12px 0', maxWidth: 560 }}>
            A perfectly draped saree transforms a beautiful garment into a breathtaking statement. At DAVIN, our saree draping service near Stadium Link Road ensures your saree falls with impeccable elegance, holds securely all day, and complements your makeup and jewellery perfectly.
          </p>
        </SplitMedia>
        <TagChips label="Saree Draping Styles at DAVIN" tags={SAREE_STYLES} />
        <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '28px 0 0 0', maxWidth: 700 }}>
          Our saree draping in Kochi is available as a standalone service or as part of our bridal beauty salon in Ernakulam packages, ensuring a seamlessly coordinated, complete occasion look.
        </p>
        <div style={{ marginTop: 36 }}>
          <GoldButton href="tel:+918089069996">Book Now</GoldButton>
        </div>
      </div>
    </section>
  );
}

function PackageSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 900 }}>
        <h2 className="p-serif" style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 400, margin: '0 0 48px 0', textAlign: 'center', textWrap: 'balance' }}>
          Complete Your Look — The DAVIN Total Occasion Package
        </h2>
        <ComparisonTable headers={['Service', 'What It Adds']} rows={PACKAGE_ROWS} />
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 820 }}>
        <Eyebrow>Our Philosophy</Eyebrow>
        <p className="p-serif" style={{ fontSize: 'clamp(17px, 1.7vw, 22px)', fontWeight: 400, lineHeight: 1.6, margin: '24px 0 0 0', textWrap: 'balance', textTransform: 'none' }}>
          At DAVIN's makeup studio in Kochi, every face is unique and every look we create reflects that. Our makeup artists in Kochi are trained across traditional Indian artistry and modern international techniques delivering looks from minimal and natural to maximally glamorous. We use premium, skin-tested, photographically optimized products safe for every skin tone and type. Your comfort and confidence are always our priority.
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow>Answers</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 400, margin: '18px 0 0' }}>
            Makeup FAQs
          </h2>
        </div>
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}

export default function Makeup() {
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA);

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow="Makeup — MU"
          title="Bridal, Party, HD & Saree Draping at DAVIN"
          subline="Bridal · Party · HD Makeup · Saree Draping — Look stunning for every occasion"
          image={img("/images/service-makeup.jpg")}
          imageAlt="Bridal and party makeup at DAVIN Beauty Salon Ernakulam"
          ctaLabel="Book A Trial"
        />
        <section className="p-light" style={{ padding: '120px 40px' }}>
          <CenteredIntro
            eyebrow="Kaloor's Makeup Authority"
            title="Every Occasion Deserves a Look That Stops the Room"
            paragraphs={[
              "Some moments are meant to be remembered and how you look in them matters. At DAVIN Beauty Salon in Kaloor, our certified makeup artists in Kochi create looks that are flawless, expressive, and crafted entirely around you. Whether it's your wedding day, a glamorous reception, a party makeup event, or a high-definition photoshoot, we deliver artistry that moves people and photographs beautifully.",
              'DAVIN is proudly associated with FTV Salon for premium bridal services, a collaboration that reflects our commitment to the highest standards of beauty in Kochi. With a 4.8-star Google rating from 750+ clients and 10,800+ Instagram followers, our portfolio speaks for itself.',
            ]}
            ctaLabel="Book A Trial"
          />
        </section>
        <section className="p-light">
          <SectionBand>Our Makeup Services</SectionBand>
        </section>
        <BridalSection />
        <PartySection />
        <HdSection />
        <SareeSection />
        <PackageSection />
        <PhilosophySection />
        <FaqSection />
        <ClosingCta
          title="Book Your Makeup Appointment at DAVIN, Kochi"
          body="Your most beautiful look is waiting at the best bridal makeup artist in Kaloor, Kochi."
          secondaryLabel="Call / WhatsApp"
          crossLinks={CROSS_LINKS}
        />
      </div>
      <Footer />
    </>
  );
}
