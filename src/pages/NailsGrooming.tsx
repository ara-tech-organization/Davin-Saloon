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
  FaqAccordion,
  ClosingCta,
  Eyebrow,
  useReveal,
} from '../components/services/premium';

const META_TITLE = 'Nail Art & Grooming in Kochi | DAVIN Beauty Salon';
const META_DESCRIPTION =
  'Get stunning nail art & grooming services at DAVIN Beauty Salon, Kochi. Manicures, pedicures, nail extensions & more for perfectly polished nails.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Nails & Grooming Services',
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
  serviceType: ['Manicure', 'Pedicure', 'Nail Art', 'Gel Extensions', 'Acrylic Nails', 'Beard Grooming', "Men's Grooming"],
  areaServed: 'Kochi, Ernakulam, Kerala',
};

const MANICURE_OPTIONS = [
  {
    title: 'Classic Manicure',
    description:
      'Nail shaping, cuticle care, moisturizing hand massage, and a polished colour finish. Clean, timeless, and perfectly executed.',
  },
  {
    title: 'Gel Manicure',
    description:
      'All the benefits of a classic manicure in Kochi, topped with a UV-cured gel polish that stays chip-resistant and high-gloss for 2–3 weeks.',
  },
  {
    title: 'French Manicure',
    description:
      'The eternally elegant, natural pink base with crisp white tips. A look that complements every outfit and every occasion.',
  },
  {
    title: 'Spa Manicure',
    description:
      'Our most indulgent option, adding a nourishing paraffin wax treatment or intensive hand mask for deeply conditioned, visibly softer skin.',
  },
  {
    title: 'Bridal Manicure',
    description: 'Crafted for brides and special occasions, this premium service ensures your hands look flawless in every photograph.',
  },
];

const PEDICURE_OPTIONS = [
  {
    title: 'Classic Pedicure',
    description:
      'Foot soak, exfoliation, nail shaping, cuticle care, callus removal, a rejuvenating foot massage, and a polished finish. Leaves feet soft and beautifully neat.',
  },
  {
    title: 'Gel Pedicure',
    description: 'Classic pedicure in Kochi with a long-lasting gel finish — glossy, chip-free toes for up to 3 weeks.',
  },
  {
    title: 'Spa Pedicure',
    description:
      'The ultimate foot pampering experience, adding a paraffin wax dip or intensive heel mask to target dryness and cracked heels.',
  },
  {
    title: 'Fish Pedicure (subject to availability)',
    description: 'A unique Garra Rufa fish exfoliation experience that leaves feet ultra-smooth and deeply refreshed.',
  },
];

const NAIL_ART_STYLES = [
  'Minimalist & line art',
  'Floral & botanical',
  'French with accents',
  'Ombre & gradient',
  'Geometric & abstract',
  'Festive & occasion-specific',
  '3D with gems & embellishments',
];

const EXTENSION_TYPES = [
  {
    title: 'Gel Extensions',
    description:
      'The most natural-looking option. Applied over a form or tip and UV-cured for strong, lightweight gel nail extensions near Stadium Link Road that pair perfectly with any nail art.',
  },
  {
    title: 'Acrylic Nails in Kochi',
    description: 'A classic choice for exceptional durability and dramatic length. Finished with any polish, gel, or nail art design.',
  },
  {
    title: 'Nail Repair',
    description: "Broken a nail? Our expert repair service uses gel or acrylic to seamlessly restore your nail's shape and strength.",
  },
];

const GROOMING_SERVICES = [
  {
    title: 'Beard Trim & Shape',
    description:
      'Precision beard trim in Kochi, following your natural growth pattern with clean jaw, cheek, and neck line definition.',
  },
  {
    title: 'Beard Styling & Design',
    description:
      'Intentional, personality-driven beard styles — ducktail, French cut, van dyke, and more — designed to frame your face and express your character.',
  },
  {
    title: 'Clean Shave',
    description: 'A traditional close shave with warm towel preparation, premium shaving cream, and smooth, precise razor work.',
  },
  {
    title: "Men's Facial Clean-Up",
    description:
      "A targeted men's grooming clean-up designed for men's skin concerns — oiliness, congestion, and roughness, resolved in one efficient session.",
  },
];

const FAQS = [
  {
    q: 'How long do gel nails last in Kochi?',
    a: 'With proper care, gel manicures at DAVIN in Kochi last 2–3 weeks. We recommend regular infill appointments to keep gel nail extensions near Stadium Link Road looking fresh and flawless.',
  },
  {
    q: 'Are nail extensions damaging to natural nails?',
    a: 'When applied and removed professionally, nail extensions in Kochi are completely safe. Damage typically results from improper DIY removal. At DAVIN, we always follow correct protocols and prioritize the health of your natural nail.',
  },
  {
    q: 'Can I choose a custom nail art design?',
    a: 'Absolutely, our nail art salon in Kaloor thrives on creative challenges. Bring a reference image, a Pinterest board, or simply describe your vision and our nail art specialists in Kochi will bring it to life.',
  },
  {
    q: 'How often should I get a pedicure in Kochi?',
    a: 'A pedicure at DAVIN in Kochi every 3–4 weeks maintains optimal foot health and cleanliness. Clients with active lifestyles may prefer more frequent visits to our nail studio in Ernakulam.',
  },
  {
    q: 'Do you offer nail services for men?',
    a: 'Yes, DAVIN offers clean-up manicures and pedicures for men who prefer a neat, natural finish. Grooming truly knows no gender at our unisex nail salon in Kochi.',
  },
];

const CROSS_LINKS = [
  { label: 'Hair Care in Kochi →', href: '/services/hair-care' },
  { label: 'Skin Care in Kaloor →', href: '/services/skin-care' },
  { label: 'Bridal & Party Makeup →', href: '/services/makeup' },
  { label: 'View Gallery →', href: '/gallery' },
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

function ManicureSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ padding: '20px 40px 90px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/gallery-nails.jpg")} imageAlt="Manicure and nail art detail at DAVIN Beauty Salon Kochi" badge="Manicure · Hand Care">
          <SectionHeading numeral="01" title="Manicure in Kochi — Beautiful, Healthy, Well-Maintained Hands" />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 12px 0', maxWidth: 560 }}>
            Our professional manicure in Kochi goes far beyond a simple polish change, It's a complete hand care ritual. Every session includes cleansing, exfoliation, nail shaping, cuticle care, a relaxing hand massage, and a flawless finish. At our nail salon in Kochi, we offer a full range of manicure styles for every preference and occasion.
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '24px 0 0 0' }}>
            Manicure options at DAVIN, Kaloor:
          </p>
        </SplitMedia>
        <FeatureGrid items={MANICURE_OPTIONS} />
      </div>
    </section>
  );
}

function PedicureSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/salon-interior.jpg")} imageAlt="Relaxing pedicure and foot spa station at DAVIN Beauty Salon Kochi" badge="Pedicure · Spa Ritual">
          <SectionHeading numeral="02" title="Pedicure in Kochi — Happy Feet, Healthy Skin, Total Relaxation" />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 12px 0', maxWidth: 560 }}>
            A great pedicure in Kochi is one of life's most satisfying luxuries and at DAVIN, we take foot care seriously. Our thorough, hygienic, and deeply relaxing pedicure treatments address everything from callused heels and rough skin to ingrown nails and tired, aching feet.
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '24px 0 0 0' }}>
            Pedicure options at DAVIN, Kaloor:
          </p>
        </SplitMedia>
        <FeatureGrid items={PEDICURE_OPTIONS} columns={4} />
      </div>
    </section>
  );
}

function NailArtSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/salon-tools.jpg")} imageAlt="Nail art tools and creative workstation at DAVIN Beauty Salon Kochi" badge="Nail Art · Studio Craft" reverse>
          <SectionHeading numeral="03" title="Nail Art in Kochi — Your Nails. Your Canvas. Our Artistry." />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 12px 0', maxWidth: 560 }}>
            DAVIN's nail art specialists in Kochi are among the most creative and technically accomplished in Ernakulam. From delicate minimalist line art and intricate floral patterns to geometric designs, ombre fades, and 3D embellishments our nail art salon in Kaloor brings every vision to life with genuine artistry and passion. Whether it's festive Onam nails, a bridal set, or a bold fashion statement, bring a reference, describe your idea, and we'll create it.
          </p>
        </SplitMedia>
        <div style={{ marginTop: 40 }}>
          <TagChips label="Nail art styles at DAVIN:" tags={NAIL_ART_STYLES} />
        </div>
      </div>
    </section>
  );
}

function ExtensionsSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/salon-aerial.jpg")} imageAlt="Nail extension studio setup at DAVIN Beauty Salon Kochi" badge="Extensions · Kaloor Studio">
          <SectionHeading numeral="04" title="Nail Extensions in Kochi — The Length & Shape You've Always Wanted" />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: 0, maxWidth: 560 }}>
            Not everyone is born with naturally long, strong nails and our professional nail extensions in Kochi give you exactly the length, shape, and durability you're looking for, with beautiful, natural-looking results.
          </p>
        </SplitMedia>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '40px 0 0 0' }}>
          Extension types at DAVIN, Kaloor:
        </p>
        <FeatureGrid items={EXTENSION_TYPES} />
      </div>
    </section>
  );
}

function GroomingSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px', display: 'flex', justifyContent: 'center' }}>
      <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 1200 }}>
        <SplitMedia image={img("/images/gallery-grooming.jpg")} imageAlt="Men's beard grooming and styling at DAVIN Beauty Salon Kochi" badge="Grooming · Men's Care" reverse>
          <SectionHeading numeral="05" title="Beard Grooming & Men's Grooming in Kochi — Sharp. Confidence. Impeccable." />
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 12px 0', maxWidth: 560 }}>
            DAVIN is a proud unisex salon, and our men's grooming services in Kochi reflect the same standard of excellence we deliver across every service. Our grooming specialists understand masculine aesthetics, precise beard shaping in Kochi, clean line definition, and expert shaving technique that leaves every man looking polished and confident.
          </p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '24px 0 0 0' }}>
            Men's grooming services at DAVIN, Kaloor:
          </p>
        </SplitMedia>
        <FeatureGrid items={GROOMING_SERVICES} />
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
            Nails & Grooming FAQs
          </h2>
        </div>
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}

export default function NailsGrooming() {
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA);

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow="Nails & Grooming — NG"
          title="Pamper Your Hands, Feet & Look at DAVIN"
          subline="Manicure · Pedicure · Nail Art · Extensions · Beard — Pamper your hands & feet"
          image={img("/images/service-nails.jpg")}
          imageAlt="Nail art, manicure and pedicure at DAVIN Beauty Salon Kochi"
        />
        <section className="p-light" style={{ padding: '120px 40px' }}>
          <CenteredIntro
            eyebrow="Kaloor's Nail Authority"
            title="Because the Details Make All the Difference"
            paragraphs={[
              "Your hands appear in every selfie, every handshake, and every moment of your day they deserve to look exceptional. At DAVIN Beauty Salon, Kaloor's most trusted nail salon in Kochi, we believe manicure, pedicure, nail art, and grooming services aren't optional extras, they're an essential part of looking and feeling your absolute best. Our nail technicians and grooming specialists in Kochi bring creative passion, technical precision, and strict hygiene standards to every service, delivering results that are as relaxing as they are impressive.",
            ]}
          />
        </section>
        <section className="p-light">
          <SectionBand>Our Nails & Grooming Services</SectionBand>
        </section>
        <ManicureSection />
        <PedicureSection />
        <NailArtSection />
        <ExtensionsSection />
        <GroomingSection />
        <FaqSection />
        <ClosingCta
          title="Book Your Nail & Grooming Appointment"
          body="Perfectly polished hands, beautifully groomed looks — at the best nail art salon in Kaloor, Kochi."
          crossLinks={CROSS_LINKS}
        />
      </div>
      <Footer />
    </>
  );
}
