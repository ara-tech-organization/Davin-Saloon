import { useEffect } from 'react';
import { assetUrl as img } from '../lib/asset';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Hero,
  Eyebrow,
  GoldButton,
  TiltCard,
  ComparisonTable,
  FaqAccordion,
  ClosingCta,
  useReveal,
} from '../components/services/premium';

const META_TITLE = 'Hair Care Services in Kochi | DAVIN Beauty Salon Kaloor';
const META_DESCRIPTION =
  "Get the hair you've always wanted at DAVIN Beauty Salon in Kaloor, Kochi. Professional hair care services tailored to your unique style and needs.";

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hair Care Services',
  provider: {
    '@type': 'BeautySalon',
    name: 'DAVIN Beauty Salon',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1st Floor, PM Square, Stadium Link Road, Above HDFC Bank',
      addressLocality: 'Kaloor, Kochi',
      addressRegion: 'Kerala',
      postalCode: '682025',
    },
    telephone: '+918089069996',
  },
  serviceType: ['Haircut', 'Hair Styling', 'Hair Coloring', 'Hair Spa', 'Keratin Treatment', 'Hair Botox', 'Balayage'],
  areaServed: 'Kochi, Ernakulam, Kerala',
};

const SERVICES = [
  {
    n: '01',
    title: 'Haircuts & Precision Cuts',
    kicker: 'Professional Hair Stylist in Kochi',
    body:
      "The perfect haircut in Kochi is the most impactful transformation you can make and our professional hair stylists in Kochi are trained to deliver exactly that. From precision women's cuts and fashion-forward bobs to modern men's fades, tapers, and textured styles, every cut begins with a personal consultation to understand your face shape, hair texture, and lifestyle. Clean, confident results crafted for you, not a template.",
    available:
      "Women's cuts (layers, bob, fringe) · Men's haircuts in Kochi (fade, crop, taper) · Kids' haircuts · Dry & wet cuts · Face-framing trims",
  },
  {
    n: '02',
    title: 'Hair Styling & Blowouts',
    kicker: 'Professional Hair Styling in Kochi',
    body:
      "Walk out of our hair salon in Kaloor looking completely polished. Our stylists use premium heat-protective products and professional tools to deliver a flawless, long-lasting finish — whether it's a special occasion or an elevated everyday look. Every style is crafted to hold beautifully and photograph brilliantly.",
    available:
      'Salon blow-dry · Occasion updos & braids · Curls, waves & blow-straight styling · Wedding & event hair setting · Traditional saree draping styles',
  },
  {
    n: '03',
    title: 'Hair Coloring in Kochi',
    kicker: 'Balayage, Highlights & Global Color',
    body:
      'Hair coloring in Kochi is one of the most powerful tools of self-expression and at DAVIN, our color specialists are among the most skilled in Ernakulam. Using globally trusted color systems with damage-minimizing techniques, we deliver rich, long-lasting results from soft balayage in Kochi and luminous highlights to dramatic global hair color and precise hair color correction in Kochi.',
    available:
      'Global color · Highlights & lowlights · Balayage & hand-painted color · Ombre & sombre · Fashion shades · Grey coverage · Color correction & toning',
    note: 'Complimentary skin tone consultation included with every coloring service.',
  },
  {
    n: '04',
    title: 'Hair Spa Treatment',
    kicker: 'Deep Nourishment at DAVIN',
    body:
      "Heat styling, pollution, and chemical processes leave hair dry, dull, and damaged over time. DAVIN's professional hair spa treatment in Kochi is a multi-step restorative ritual that rebuilds moisture, strengthens strands, and stimulates a healthier scalp delivering a silky, luminous finish you'll feel for weeks. Every session includes a customized hair mask, a relaxing scalp massage, steam infusion, and a professional blowout finish.",
    available:
      'Classic hair spa · Deep conditioning spa · Scalp treatment · Anti-hairfall spa · Protein repair spa · Post-color restoration spa',
  },
  {
    n: '05',
    title: 'Keratin Treatment',
    kicker: 'Frizz-Free, Silky Hair at DAVIN',
    body:
      "DAVIN's keratin treatment in Kochi is our most in-demand hair therapy. This semi-permanent protein-based treatment seals the hair cuticle, eliminates frizz, cuts blow-dry time, and leaves hair noticeably smoother and more manageable for 3–6 months. Our keratin treatment near Stadium Link Road works on all hair types wavy, frizzy, coiled, or chemically processed. Looking for a frizz-free hair treatment in Kerala that truly lasts? DAVIN's keratin is the answer.",
    meta: 'Duration: 2.5–4 hrs  |  Longevity: 3–6 months  |  Best for: Frizzy, wavy, thick, or chemically treated hair',
    note: 'Post-treatment care kit and maintenance guide included.',
  },
  {
    n: '06',
    title: 'Hair Botox Treatment',
    kicker: 'Repair, Restore & Revive',
    body:
      "If your hair feels brittle, dull, or damaged despite regular care, DAVIN's hair botox treatment in Kochi is the solution. Unlike hair smoothening in Kochi, which chemically restructures hair bonds, hair botox is a chemical-free, filler-based therapy that fills micro-gaps in the hair cortex restoring shine, thickness, elasticity, and smoothness from the inside out. Ideal for colour-treated and heat-damaged hair.",
    meta: 'Duration: 1.5–3 hrs  |  Longevity: 2–4 months  |  Best for: Damaged, dull, or chemically processed hair',
  },
];

const FAQS = [
  {
    q: 'How often should I get a hair spa treatment in Kochi?',
    a: 'A hair spa near you in Kochi every 3–4 weeks is ideal for healthy hair maintenance. For damaged or chemically treated hair, monthly sessions at DAVIN deliver the most visible improvement.',
  },
  {
    q: 'Is keratin treatment in Kochi safe for color-treated hair?',
    a: "Yes, our keratin treatment in Kochi is fully safe for color-treated hair and can even enhance your color's vibrancy and longevity. Our stylists customize the formula based on your hair's current condition.",
  },
  {
    q: 'How long does a keratin treatment near Stadium Link Road last?',
    a: 'With proper aftercare, a keratin treatment at DAVIN, Kaloor lasts 3–6 months. Personalized aftercare guidance is provided after every session.',
  },
  {
    q: 'Do you offer a consultation before recommending a hair color?',
    a: 'Absolutely. Every hair coloring service in Kochi at DAVIN begins with a one-on-one consultation reviewing your hair history, current health, and color goals, before we recommend any technique or shade.',
  },
  {
    q: 'Is hair smoothing different from a keratin treatment?',
    a: 'Yes, hair smoothening in Kochi permanently restructures hair bonds for a straight result, while a keratin treatment in Kochi is semi-permanent and enhances manageability without altering your natural pattern. Our team will guide you to the right choice during your consultation.',
  },
  {
    q: 'Are your hair products safe for sensitive scalps?',
    a: 'Yes. DAVIN uses dermatologist-tested, professionally certified products suitable for most scalp types. Please inform our team of any sensitivities during your consultation.',
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
      <div ref={ref} data-reveal-group className="p-split" style={{ display: 'flex', gap: 64, maxWidth: 1180, margin: '0 auto', alignItems: 'center' }}>
        <div style={{ flex: 1.1 }}>
          <div style={{ marginBottom: 18 }}>
            <Eyebrow>Kaloor's Hair Authority</Eyebrow>
          </div>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 26px 0' }}>
            Your Hair. Our Expertise. Kochi's Finest Hair Care in Kaloor.
          </h2>
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 20px 0' }}>
            Great hair is never accidental, it takes the right skill, the right products, and a professional who genuinely understands your hair. At DAVIN Beauty Salon, Kochi's leading hair salon on Stadium Link Road, Kaloor, our team of professional hair stylists in Kochi brings technical mastery and creative passion to every service. Whether you need a sharp haircut in Kochi, a vibrant hair coloring makeover, a restorative hair spa treatment, or a transformative keratin treatment in Kochi, you'll walk out of DAVIN with hair that looks, moves, and feels exactly the way you've always wanted.
          </p>
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 34px 0' }}>
            We welcome every hair type such as straight, wavy, curly, coily, fine, or chemically treated tailoring every service to your hair's unique needs. At DAVIN, your hair isn't just our work. It's our artistry.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
            <GoldButton href="tel:+918089069996">Book Now</GoldButton>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--fg-mute)' }}>
              📞 +91 80890 69996 &nbsp;|&nbsp; 📍 Stadium Link Road, Kaloor, Kochi
            </span>
          </div>
        </div>
        <div style={{ flex: 1, position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', border: '1px solid var(--line-strong)' }}>
          <img
            src={img("/images/featured-haircut.jpg")}
            alt="Professional hair stylist at DAVIN Beauty Salon Kaloor"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)', transition: 'transform 0.6s ease' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={headRef} data-reveal-group style={{ maxWidth: 1180, margin: '0 auto 56px' }}>
        <Eyebrow>Our Menu</Eyebrow>
        <h2 className="p-serif" style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', fontWeight: 400, margin: '18px 0 0' }}>
          Our Expert Hair Care Services in Kochi
        </h2>
      </div>
      <div ref={gridRef} data-reveal-group className="p-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1180, margin: '0 auto' }}>
        {SERVICES.map((s) => (
          <TiltCard key={s.n}>
            <div style={{ padding: '32px 26px', minHeight: 320, display: 'flex', flexDirection: 'column' }}>
              <span className="p-serif" style={{ fontSize: 32, fontWeight: 400, marginBottom: 14, color: 'var(--fg-mute)' }}>
                {s.n}
              </span>
              <h3 className="p-serif" style={{ fontSize: 18, fontWeight: 400, margin: '0 0 4px 0' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '0 0 16px 0' }}>
                {s.kicker}
              </p>
              <p style={{ fontSize: 13, lineHeight: '22px', color: 'var(--fg-soft)', margin: '0 0 16px 0', flex: 1 }}>{s.body}</p>
              {s.available && (
                <p style={{ fontSize: 12, lineHeight: '20px', color: 'var(--fg-mute)', margin: '0 0 10px 0', borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                  <strong style={{ color: 'var(--fg-soft)' }}>Available: </strong>
                  {s.available}
                </p>
              )}
              {s.meta && (
                <p style={{ fontSize: 12, lineHeight: '20px', color: 'var(--fg-mute)', margin: '0 0 10px 0', borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                  {s.meta}
                </p>
              )}
              {s.note && <p style={{ fontSize: 11.5, fontStyle: 'italic', color: 'var(--fg-mute)', margin: 0 }}>{s.note}</p>}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function CompareSection() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 980, margin: '0 auto' }}>
        <Eyebrow>Find Your Fit</Eyebrow>
        <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 400, margin: '18px 0 40px', textWrap: 'balance' }}>
          Which Hair Treatment Is Right for You? — DAVIN's Expert Guide, Kochi
        </h2>
        <ComparisonTable
          headers={['Treatment', 'Key Effect', 'Best For', 'Duration']}
          rows={[
            ['Hair Spa in Kochi', 'Deep moisture & nourishment', 'All hair types', '60–90 min'],
            ['Keratin Treatment in Kochi', 'Frizz elimination + shine', 'Wavy, frizzy, thick hair', '3–4 hours'],
            ['Hair Botox in Kochi', 'Repair, conditioning & shine', 'Damaged, color-treated hair', '2–3 hours'],
          ]}
        />
        <p style={{ fontSize: 13, lineHeight: '24px', color: 'var(--fg-soft)', margin: '32px 0' }}>
          Every treatment at our hair salon in Kochi begins with a complimentary hair health assessment.
        </p>
        <GoldButton href="tel:+918089069996">Get Quote</GoldButton>
      </div>
    </section>
  );
}

function TrustBand() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '100px 40px', textAlign: 'center' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 860, margin: '0 auto' }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '0 0 20px 0' }}>
          ⭐ 4.8 Stars · 750+ Verified Google Reviews · Kochi's Most-Trusted Hair Salon
        </p>
        <p className="p-serif" style={{ fontSize: 'clamp(20px, 2.6vw, 32px)', fontWeight: 400, lineHeight: 1.4, margin: '0 0 26px 0' }}>
          Why Kochi's Hair Lovers Choose DAVIN — The Best Hair Salon in Kaloor
        </p>
        <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: 0 }}>
          From the precision haircut in Kochi that finally got it right, to the keratin treatment near Stadium Link Road that transformed a morning routine, to the hair coloring in Kochi that earned a hundred compliments. Our clients' reviews reflect the consistent excellence DAVIN delivers every day. We use only premium, salon-grade products, maintain impeccably hygienic workstations, and deliver a genuinely personalized experience every time.
        </p>
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
            Hair Care FAQs
          </h2>
        </div>
        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
}

export default function HairCare() {
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA);

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow="Hair Care — HC"
          title="Expert Cuts, Color & Treatments at DAVIN Beauty Salon, Kaloor"
          subline="Haircuts · Styling · Color · Spa · Keratin · Botox — All hair types welcome"
          image={img("/images/service-hair.jpg")}
          imageAlt="Hair care services including haircuts, color and keratin at DAVIN Kochi"
        />
        <Intro />
        <ServicesGrid />
        <CompareSection />
        <TrustBand />
        <FaqSection />
        <ClosingCta
          title="Book Your Hair Care Appointment at Kochi's Best Hair Salon Today"
          body="Great hair care in Kochi starts with one decision, choosing DAVIN. Our professional hair stylists in Kochi are ready to listen, create, and deliver results that exceed your expectations."
          tagline="Transform your hair. Elevate your look. Reclaim your confidence."
          crossLinks={[
            { label: 'Skin Care in Kochi →', href: '/services/skin-care' },
            { label: 'Nails & Grooming →', href: '/services/nails-grooming' },
            { label: 'Bridal & Party Makeup →', href: '/services/makeup' },
            { label: 'View Gallery →', href: '/gallery' },
          ]}
        />
      </div>
      <Footer />
    </>
  );
}
