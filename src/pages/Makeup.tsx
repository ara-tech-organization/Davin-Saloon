import { useEffect } from 'react';
import { assetUrl as img } from '../lib/asset';
import { useLanguage } from '../contexts/LanguageContext';
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
  PullQuote,
  ComparisonTable,
  FaqAccordion,
  ClosingCta,
  Eyebrow,
  useReveal,
  ScrollStory,
  StoryPanel,
  TiltCard,
  handleScatterTiltMove,
  handleScatterTiltLeave,
} from '../components/services/premium';

const META_TITLE = 'Makeup Artist in Kochi | DAVIN Beauty Salon';
const META_DESCRIPTION =
  'DAVIN Beauty Salon in Kochi is home to experienced makeup artists specializing in bridal, party & everyday looks. Step in and let us create your perfect look!';

const BRIDAL_STYLES = {
  en: [
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
  ],
  ml: [
    {
      title: 'പരമ്പരാഗത കേരള ബ്രൈഡൽ മേക്കപ്പ്',
      description:
        'ആഴത്തിൽ വരച്ച കണ്ണുകൾ, ഊഷ്മളമായ സ്വർണ്ണ നിറമുള്ള ചർമ്മം, കൃത്യമായ മാങ് തിക്കയും പൊട്ടും — ദക്ഷിണേന്ത്യൻ സംസ്കാരത്തിൽ ആഴത്തിൽ വേരൂന്നിയ ഒരു മനോഹര ലുക്ക്. കേരളത്തിന്റെ പരമ്പരാഗത ബ്രൈഡൽ പൈതൃകത്തെ ആദരിക്കുന്ന വധുക്കൾക്ക് അനുയോജ്യം.',
    },
    {
      title: 'സമകാലിക & ഇൻഡോ-വെസ്റ്റേൺ ബ്രൈഡൽ മേക്കപ്പ്',
      description: 'ശിൽപഭംഗിയുള്ള കണ്ടൂറിംഗ്, ധൈര്യമായ ഐ ആർട്ടിസ്ട്രി, തികവുറ്റ ചർമ്മ ഫിനിഷ്. പാരമ്പര്യത്തെ ഇന്നത്തെ ശൈലിയുമായി സമന്വയിപ്പിക്കുന്ന ആധുനിക വധുക്കൾക്ക് അനുയോജ്യം.',
    },
    {
      title: 'മലബാർ ബ്രൈഡൽ മേക്കപ്പ്',
      description:
        'ഞങ്ങളുടെ FTV ബ്രൈഡൽ മേക്ക്ഓവർ സഹകരണത്തിലൂടെ ആഘോഷിക്കപ്പെടുന്നത്. ആഴമേറിയ കണ്ണുകൾ, സ്വർണ്ണ ടച്ചുള്ള ചർമ്മം, വടക്കൻ കേരള വിവാഹങ്ങളുടെ പ്രൗഢി ജീവസുറ്റതാക്കുന്ന അലങ്കാര ശൈലി.',
    },
    {
      title: 'ഡെസ്റ്റിനേഷൻ & ക്രിസ്ത്യൻ ബ്രൈഡൽ മേക്കപ്പ്',
      description: 'തിളക്കമുള്ളതും, റൊമാന്റിക്കും, മിനുസമുള്ളതും — ഏതു ലൈറ്റിംഗിലും ഓരോ നിമിഷത്തിലും മികച്ചു നിൽക്കും വിധം രൂപകൽപ്പന ചെയ്തത്.',
    },
  ],
};

const PARTY_OCCASIONS = {
  en: [
    'Wedding Guest & Reception Makeup',
    'Engagement Makeup in Kochi',
    'Festive & Cultural Makeup (Onam, Vishu, Eid, Christmas)',
    'Birthday & Anniversary Glam',
    'Cocktail & Evening Event Makeup',
    'Photoshoot & Social Media Makeup',
  ],
  ml: [
    'വിവാഹ അതിഥി & റിസെപ്ഷൻ മേക്കപ്പ്',
    'കൊച്ചിയിലെ എൻഗേജ്മെന്റ് മേക്കപ്പ്',
    'ഉത്സവ & സാംസ്കാരിക മേക്കപ്പ് (ഓണം, വിഷു, ഈദ്, ക്രിസ്മസ്)',
    'ബർത്ത്ഡേ & ആനിവേഴ്സറി ഗ്ലാം',
    'കോക്ടെയിൽ & സായാഹ്ന ഇവന്റ് മേക്കപ്പ്',
    'ഫോട്ടോഷൂട്ട് & സോഷ്യൽ മീഡിയ മേക്കപ്പ്',
  ],
};

const HD_BEST_FOR = {
  en: ['Brides & bridesmaids', 'Professional photoshoots', 'Wedding films & reels', 'Any event with professional photography'],
  ml: ['വധുക്കളും ബ്രൈഡ്സ്മെയ്ഡുകളും', 'പ്രൊഫഷണൽ ഫോട്ടോഷൂട്ടുകൾ', 'വിവാഹ ചിത്രീകരണങ്ങളും റീലുകളും', 'പ്രൊഫഷണൽ ഫോട്ടോഗ്രഫിയുള്ള ഏതൊരു ഇവന്റും'],
};

const SAREE_STYLES = {
  en: [
    'Nivi Style',
    'Kerala Kasavu / Mundum Neriyathum',
    'Gujarati / Seedha Pallav',
    'Bengali Style',
    'Lehenga / Half-Saree Fusion Draping',
    'Contemporary & Designer Draping',
  ],
  ml: [
    'നിവി സ്റ്റൈൽ',
    'കേരള കസവ് / മുണ്ടും നേര്യതും',
    'ഗുജറാത്തി / സീധ പല്ലവ്',
    'ബംഗാളി സ്റ്റൈൽ',
    'ലെഹങ്ക / ഹാഫ്-സാരി ഫ്യൂഷൻ ഡ്രേപ്പിംഗ്',
    'സമകാലിക & ഡിസൈനർ ഡ്രേപ്പിംഗ്',
  ],
};

const PACKAGE_ROWS = {
  en: [
    ['Bridal / Party Makeup', 'Flawless face, perfectly matched to your look'],
    ['Bridal Hair Styling', 'Elegant updo, waves, or draping to complete the look'],
    ['Saree Draping in Kochi', 'Perfectly secured for all-day elegance'],
    ['Pre-Event Facial', 'Glowing, prepped skin that holds makeup beautifully'],
    ['Bridal Manicure & Pedicure', 'Polished hands and feet for every photograph'],
    ['Eyebrow Threading & Shaping', 'Defined brows that frame your made-up face'],
  ],
  ml: [
    ['ബ്രൈഡൽ / പാർട്ടി മേക്കപ്പ്', 'നിങ്ങളുടെ ലുക്കിനോട് പൂർണ്ണമായി യോജിക്കുന്ന കുറ്റമറ്റ മുഖം'],
    ['ബ്രൈഡൽ ഹെയർ സ്റ്റൈലിംഗ്', 'ലുക്ക് പൂർത്തിയാക്കാൻ മനോഹരമായ അപ്‌ഡു, വേവ്സ്, അല്ലെങ്കിൽ ഡ്രേപ്പിംഗ്'],
    ['കൊച്ചിയിലെ സാരി ഡ്രേപ്പിംഗ്', 'ദിവസം മുഴുവൻ ഭംഗിയോടെ നിലനിൽക്കുന്ന വിധം സുരക്ഷിതം'],
    ['പ്രീ-ഇവന്റ് ഫേഷ്യൽ', 'മേക്കപ്പ് ഭംഗിയായി നിലനിർത്തുന്ന തിളങ്ങുന്ന, ഒരുക്കിയ ചർമ്മം'],
    ['ബ്രൈഡൽ മാനിക്യൂർ & പെഡിക്യൂർ', 'ഓരോ ഫോട്ടോയിലും തിളങ്ങുന്ന കൈകളും കാലുകളും'],
    ['ഐബ്രോ ത്രെഡിംഗ് & ഷേപ്പിംഗ്', 'നിങ്ങളുടെ മേക്കപ്പ് മുഖത്തിന് ചട്ടക്കൂടിടുന്ന വ്യക്തമായ പുരികങ്ങൾ'],
  ],
};

const FAQS = {
  en: [
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
  ],
  ml: [
    {
      q: 'വിവാഹത്തിന് മുൻപ് ഒരു ട്രയൽ സെഷൻ നൽകുമോ?',
      a: 'അതെ, ഞങ്ങൾ അത് ശക്തമായി ശുപാർശ ചെയ്യുന്നു. വിവാഹത്തിന് 1–2 ആഴ്ച മുൻപ് ഒരു ബ്രൈഡൽ മേക്കപ്പ് ട്രയൽ നിങ്ങളുടെ ചർമ്മത്തിൽ ലുക്ക് പൂർണ്ണമാക്കാൻ ഞങ്ങളെ സഹായിക്കുന്നു. ചെറിയ ഒരു ട്രയൽ ഫീസ് ബാധകമാണ്, അത് നിങ്ങളുടെ അവസാന ബുക്കിംഗിൽ നിന്ന് ക്രമീകരിക്കും.',
    },
    {
      q: 'DAVIN-ൽ ബ്രൈഡൽ മേക്കപ്പിന് എത്ര സമയമെടുക്കും?',
      a: 'ലുക്കിന്റെ സങ്കീർണ്ണതയും ഉൾപ്പെടുത്തിയ സേവനങ്ങളും (ഹെയർ സ്റ്റൈലിംഗ്, കൊച്ചിയിലെ സാരി ഡ്രേപ്പിംഗ്) അനുസരിച്ച് ഒരു പൂർണ്ണ ബ്രൈഡൽ മേക്കപ്പിന് സാധാരണയായി 1.5–3 മണിക്കൂർ എടുക്കും.',
    },
    {
      q: 'HD മേക്കപ്പും സാധാരണ മേക്കപ്പും തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?',
      a: 'ക്യാമറ ലൈറ്റിംഗിൽ സാധാരണ മേക്കപ്പ് ഘനമായി തോന്നാം. കൊച്ചിയിലെ HD മേക്കപ്പ്, DSLR ഫ്ലാഷ്, റിംഗ് ലൈറ്റുകൾ, HD വീഡിയോ എന്നിവയിൽ കുറ്റമറ്റതായി കാണപ്പെടാൻ രൂപകൽപ്പന ചെയ്ത മൈക്രോ-മില്ലഡ് പിഗ്മെന്റുകൾ ഉപയോഗിക്കുന്നു, പ്രൊഫഷണലായി ചിത്രീകരിക്കുന്ന ഏതൊരു ഇവന്റിനും ഇഷ്ടപ്പെട്ട തിരഞ്ഞെടുപ്പ്.',
    },
    {
      q: 'കടുത്ത ചർമ്മ നിറങ്ങൾക്ക് മേക്കപ്പ് ചെയ്യുമോ?',
      a: 'തീർച്ചയായും. ഞങ്ങളുടെ കൊച്ചിയിലെ മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ എല്ലാ ബേസ് പ്രൊഡക്ടുകളിലും സമഗ്രമായ ഷേഡ് ശ്രേണിയോടെ ഇളം മുതൽ ഏറ്റവും ഇരുണ്ട നിറങ്ങൾ വരെ എല്ലാ ചർമ്മ നിറങ്ങളിലും മനോഹരമായി പ്രവർത്തിക്കുന്നു.',
    },
  ],
};

const CROSS_LINKS = {
  en: [
    { label: 'Hair Styling →', href: '/services/hair-care' },
    { label: 'Pre-Bridal Facials →', href: '/services/skin-care' },
    { label: 'Nails & Grooming →', href: '/services/nails-grooming' },
    { label: 'View Gallery →', href: '/gallery' },
  ],
  ml: [
    { label: 'ഹെയർ സ്റ്റൈലിംഗ് →', href: '/services/hair-care' },
    { label: 'പ്രീ-ബ്രൈഡൽ ഫേഷ്യലുകൾ →', href: '/services/skin-care' },
    { label: 'നഖങ്ങളും ഗ്രൂമിംഗും →', href: '/services/nails-grooming' },
    { label: 'ഗാലറി കാണുക →', href: '/gallery' },
  ],
};

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

function BridalPanel() {
  const { language } = useLanguage();
  return (
    <StoryPanel width="92vw" maxWidth={1100}>
      <div data-reveal-group>
        <div style={{ textAlign: 'center' }}>
          <Eyebrow>Bridal · FTV Collaboration</Eyebrow>
        </div>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <SectionHeading numeral="01" compact showNumber={false} title={language === 'ml' ? 'ബ്രൈഡൽ മേക്കപ്പ് — നിങ്ങളുടെ ഏറ്റവും മികച്ച കലാവിരുത്' : 'Bridal Makeup — Your Finest Artistry'} center />
        </div>
        <p style={{ fontSize: 13.5, lineHeight: '24px', color: 'var(--fg-soft)', margin: '0 auto 8px', maxWidth: 640, textAlign: 'center' }}>
          {language === 'ml'
            ? 'നിങ്ങളുടെ കാഴ്ചപ്പാട്, ചർമ്മ നിറം, വസ്ത്രം, ആഭരണങ്ങൾ എന്നിവ മനസ്സിലാക്കാൻ ഞങ്ങൾ സമയമെടുക്കുന്നു — അതിശയകരമാം വിധം, ആധികാരികമായി നിങ്ങളായ ഒരു ലുക്ക് സൃഷ്ടിക്കുന്നു.'
            : 'We take time to understand your vision, skin tone, outfit, and jewellery — crafting a look that is breathtakingly, authentically you.'}
        </p>
        <FeatureGrid items={BRIDAL_STYLES[language]} columns={4} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <PullQuote>
            {language === 'ml'
              ? '"ഞങ്ങളുടെ ക്ലയന്റുകൾ ഒരു പുഞ്ചിരിയോടെ പോകുന്നത് കാണുന്നതിനേക്കാൾ ഞങ്ങളെ സന്തോഷിപ്പിക്കുന്ന മറ്റൊന്നുമില്ല."'
              : '“Nothing makes us happier than seeing our clients leave with a smile.”'}
          </PullQuote>
        </div>
      </div>
    </StoryPanel>
  );
}

function PartyPanel() {
  const { language } = useLanguage();
  const ANGLES = [-6, 4, -3, 5, -4, 3] as const;
  return (
    <StoryPanel width="90vw" maxWidth={1000}>
      <div className="p-party-media" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', border: '1px solid var(--line-strong)' }}>
        <img
          className="p-kenburns"
          src={img('/images/service-makeup.jpg')}
          alt={language === 'ml' ? 'DAVIN ബ്യൂട്ടി സലോൺ കൊച്ചിയിലെ പാർട്ടി മേക്കപ്പ് ലുക്ക്' : 'Party makeup look at DAVIN Beauty Salon Kochi'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div data-reveal-group>
          <div className="p-party-heading" style={{ position: 'absolute', top: 32, left: 0, right: 0, textAlign: 'center' }}>
            <SectionHeading
              numeral="02" compact showNumber={false}
              title={<span style={{ color: '#fff' }}>{language === 'ml' ? 'പാർട്ടി മേക്കപ്പ് — മുറി കീഴടക്കൂ' : 'Party Makeup — Own the Room'}</span>}
              center
            />
          </div>
          <div className="p-party-tags">
            {PARTY_OCCASIONS[language].map((tag, i) => (
              <div
                key={tag}
                className="p-party-tag"
                data-rotate={ANGLES[i % ANGLES.length]}
                onMouseMove={handleScatterTiltMove}
                onMouseLeave={handleScatterTiltLeave}
                style={{
                  transform: `rotate(${ANGLES[i % ANGLES.length]}deg)`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: 'transform 0.25s ease-out',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </StoryPanel>
  );
}

function HdPanel() {
  const { language } = useLanguage();
  return (
    <StoryPanel width="90vw" maxWidth={1080}>
      <div data-reveal-group className="p-panel-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 36%) minmax(320px, 1fr)', gap: 56, alignItems: 'center' }}>
        <TiltCard float>
          <div style={{ height: '100%', minHeight: 220, boxSizing: 'border-box', padding: '30px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <span className="p-serif" style={{ fontSize: 52, fontWeight: 400, lineHeight: 1, margin: '0 0 8px 0' }}>12–16+</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>
              {language === 'ml' ? 'മണിക്കൂറുകളോളം കുറ്റമറ്റ ഹോൾഡ്' : 'Hours of Flawless Hold'}
            </span>
          </div>
        </TiltCard>
        <div>
          <SectionHeading numeral="03" compact showNumber={false} title={language === 'ml' ? 'HD മേക്കപ്പ് — ഏതു ക്യാമറയ്ക്കും കുറ്റമറ്റത്' : 'HD Makeup — Flawless for Every Camera'} />
          <p style={{ fontSize: 13.5, lineHeight: '24px', color: 'var(--fg-soft)', margin: '0 0 20px 0', maxWidth: 560 }}>
            {language === 'ml'
              ? 'മൈക്രോ-മില്ലഡ്, പ്രകാശം പ്രതിഫലിപ്പിക്കുന്ന പിഗ്മെന്റുകൾ യഥാർത്ഥമായ രണ്ടാം ചർമ്മ ഫിനിഷ് സൃഷ്ടിക്കുന്നു — ക്യാമറയിൽ അദൃശ്യം, കേക്കിംഗോ തിളക്കമോ ഇല്ല.'
              : 'Micro-milled, light-reflecting pigments create a genuine second-skin finish — invisible on camera, no caking, no shine.'}
          </p>
          <TagChips label={language === 'ml' ? 'അനുയോജ്യം:' : 'Best for:'} tags={[...HD_BEST_FOR[language]]} />
        </div>
      </div>
    </StoryPanel>
  );
}

function SareePanel() {
  const { language } = useLanguage();
  const SAREE_IMAGES = ['/images/salon-interior.jpg', '/images/salon-aerial.jpg', '/images/gallery-nails.jpg', '/images/salon-tools.jpg'];
  const styles = SAREE_STYLES[language];
  return (
    <StoryPanel width="94vw" maxWidth={1180}>
      <div data-reveal-group>
        <SectionHeading numeral="04" compact showNumber={false} title={language === 'ml' ? 'സാരി ഡ്രേപ്പിംഗ് — സാരി ഒരു കലയാണ്' : 'Saree Draping — The Saree Is Art'} center />
        <p style={{ fontSize: 13.5, lineHeight: '24px', color: 'var(--fg-soft)', margin: '0 auto 32px', maxWidth: 620, textAlign: 'center' }}>
          {language === 'ml'
            ? 'അതിശയകരമായ ഭംഗിയോടെ വീഴുന്നു, ദിവസം മുഴുവൻ സുരക്ഷിതമായി നിലനിൽക്കുന്നു, നിങ്ങളുടെ മേക്കപ്പിനെയും ആഭരണങ്ങളെയും തികച്ചും പൂരകമാക്കുന്നു.'
            : 'Falls with impeccable elegance, holds securely all day, and complements your makeup and jewellery perfectly.'}
        </p>
        <div className="p-strip" style={{ display: 'grid', gridTemplateColumns: `repeat(${styles.length}, 1fr)`, gap: 14 }}>
          {styles.map((style, i) => (
            <div key={style}>
              <div style={{ overflow: 'hidden', border: '1px solid var(--line-strong)', aspectRatio: '3 / 4' }}>
                <img
                  className="p-kenburns"
                  src={img(SAREE_IMAGES[i % SAREE_IMAGES.length])}
                  alt={
                    language === 'ml'
                      ? `DAVIN ബ്യൂട്ടി സലോൺ കൊച്ചിയിലെ ${style} സാരി ഡ്രേപ്പിംഗ് റഫറൻസ്`
                      : `${style} saree draping reference at DAVIN Beauty Salon Kochi`
                  }
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)', animationDelay: `${i * 1.4}s` }}
                />
              </div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.04em', color: 'var(--fg-soft)', margin: '10px 0 0 0', textAlign: 'center', lineHeight: '15px' }}>
                {style}
              </p>
            </div>
          ))}
        </div>
      </div>
    </StoryPanel>
  );
}

function PackagePanel() {
  const { language } = useLanguage();
  return (
    <StoryPanel width="86vw" maxWidth={860}>
      <div data-reveal-group>
        <h2 className="p-serif" style={{ fontSize: 'clamp(22px, 2.6vw, 34px)', fontWeight: 400, margin: '0 0 36px 0', textAlign: 'center', textWrap: 'balance' }}>
          {language === 'ml' ? 'നിങ്ങളുടെ ലുക്ക് പൂർത്തിയാക്കൂ — DAVIN ടോട്ടൽ ഒക്കേഷൻ പാക്കേജ്' : 'Complete Your Look — The DAVIN Total Occasion Package'}
        </h2>
        <ComparisonTable headers={language === 'ml' ? ['സേവനം', 'ഇത് നൽകുന്നത്'] : ['Service', 'What It Adds']} rows={PACKAGE_ROWS[language].map((r) => [...r])} />
      </div>
    </StoryPanel>
  );
}

function PhilosophyPanel() {
  const { language } = useLanguage();
  return (
    <StoryPanel width="78vw" maxWidth={760}>
      <div data-reveal-group style={{ textAlign: 'center' }}>
        <Eyebrow>{language === 'ml' ? 'ഞങ്ങളുടെ തത്വശാസ്ത്രം' : 'Our Philosophy'}</Eyebrow>
        <p className="p-serif" style={{ fontSize: 'clamp(17px, 1.8vw, 24px)', fontWeight: 400, lineHeight: 1.6, margin: '24px 0 0 0', textWrap: 'balance', textTransform: 'none' }}>
          {language === 'ml'
            ? 'ഓരോ മുഖവും അതുല്യമാണ്, ഞങ്ങൾ സൃഷ്ടിക്കുന്ന ഓരോ ലുക്കും അത് പ്രതിഫലിപ്പിക്കുന്നു — പരമ്പരാഗത ഇന്ത്യൻ കലാവിരുതിലും ആധുനിക അന്താരാഷ്ട്ര സാങ്കേതികതയിലും പരിശീലനം നേടിയത്, മിനിമലും സ്വാഭാവികവുമായതു മുതൽ പരമാവധി ഗ്ലാമറസ് ആയതു വരെയുള്ള ലുക്കുകൾ നൽകുന്നു.'
            : 'Every face is unique and every look we create reflects that trained across traditional Indian artistry and modern international techniques, delivering looks from minimal and natural to maximally glamorous.'}
        </p>
      </div>
    </StoryPanel>
  );
}

function FaqSection() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow>{language === 'ml' ? 'ഉത്തരങ്ങൾ' : 'Answers'}</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 400, margin: '18px 0 0' }}>
            {language === 'ml' ? 'മേക്കപ്പ് FAQ-കൾ' : 'Makeup FAQs'}
          </h2>
        </div>
        <FaqAccordion items={[...FAQS[language]]} />
      </div>
    </section>
  );
}

export default function Makeup() {
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA);
  const { language } = useLanguage();

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow="Makeup — MU"
          title={language === 'ml' ? 'DAVIN-ൽ ബ്രൈഡൽ, പാർട്ടി, HD & സാരി ഡ്രേപ്പിംഗ്' : 'Bridal, Party, HD & Saree Draping at DAVIN'}
          subline={
            language === 'ml'
              ? 'ബ്രൈഡൽ · പാർട്ടി · HD മേക്കപ്പ് · സാരി ഡ്രേപ്പിംഗ് — ഓരോ അവസരത്തിലും അതിശയകരമായി കാണപ്പെടൂ'
              : 'Bridal · Party · HD Makeup · Saree Draping — Look stunning for every occasion'
          }
          image={img("/images/service-makeup.jpg")}
          imageAlt={language === 'ml' ? 'DAVIN ബ്യൂട്ടി സലോൺ എറണാകുളത്തിലെ ബ്രൈഡൽ, പാർട്ടി മേക്കപ്പ്' : 'Bridal and party makeup at DAVIN Beauty Salon Ernakulam'}
          ctaLabel={language === 'ml' ? 'ട്രയൽ ബുക്ക് ചെയ്യുക' : 'Book A Trial'}
        />
        <section className="p-light" style={{ padding: '120px 40px' }}>
          <CenteredIntro
            eyebrow={language === 'ml' ? 'കാലൂരിന്റെ മേക്കപ്പ് അതോറിറ്റി' : "Kaloor's Makeup Authority"}
            title={language === 'ml' ? 'ഓരോ അവസരവും അർഹിക്കുന്നത് മുറി നിശ്ചലമാക്കുന്ന ഒരു ലുക്ക്' : 'Every Occasion Deserves a Look That Stops the Room'}
            paragraphs={
              language === 'ml'
                ? [
                    'ചില നിമിഷങ്ങൾ ഓർമ്മിക്കപ്പെടേണ്ടതാണ്, അതിൽ നിങ്ങൾ എങ്ങനെ കാണപ്പെടുന്നു എന്നത് പ്രധാനമാണ്. കാലൂരിലെ DAVIN ബ്യൂട്ടി സലോണിൽ, ഞങ്ങളുടെ കൊച്ചിയിലെ സർട്ടിഫൈഡ് മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ കുറ്റമറ്റതും, ആവിഷ്കാരപൂർണ്ണവും, പൂർണ്ണമായും നിങ്ങൾക്കുവേണ്ടി രൂപകൽപ്പന ചെയ്തതുമായ ലുക്കുകൾ സൃഷ്ടിക്കുന്നു. അത് നിങ്ങളുടെ വിവാഹ ദിവസമോ, ഗംഭീരമായ റിസെപ്ഷനോ, ഒരു പാർട്ടി മേക്കപ്പ് ഇവന്റോ, ഉയർന്ന-റെസലൂഷൻ ഫോട്ടോഷൂട്ടോ ആകട്ടെ, ആളുകളെ സ്പർശിക്കുകയും മനോഹരമായി ചിത്രീകരിക്കപ്പെടുകയും ചെയ്യുന്ന കലാവിരുത് ഞങ്ങൾ നൽകുന്നു.',
                    'പ്രീമിയം ബ്രൈഡൽ സേവനങ്ങൾക്കായി DAVIN അഭിമാനത്തോടെ FTV സലോണുമായി സഹകരിക്കുന്നു, ഇത് കൊച്ചിയിലെ സൗന്ദര്യത്തിന്റെ ഏറ്റവും ഉയർന്ന നിലവാരത്തോടുള്ള ഞങ്ങളുടെ പ്രതിബദ്ധത പ്രതിഫലിപ്പിക്കുന്നു. 750+ ക്ലയന്റുകളിൽ നിന്ന് 4.8-സ്റ്റാർ ഗൂഗിൾ റേറ്റിംഗും 10,800+ ഇൻസ്റ്റാഗ്രാം ഫോളോവേഴ്സും ഉള്ളതിനാൽ, ഞങ്ങളുടെ പോർട്ട്ഫോളിയോ സ്വയം സംസാരിക്കുന്നു.',
                  ]
                : [
                    "Some moments are meant to be remembered and how you look in them matters. At DAVIN Beauty Salon in Kaloor, our certified makeup artists in Kochi create looks that are flawless, expressive, and crafted entirely around you. Whether it's your wedding day, a glamorous reception, a party makeup event, or a high-definition photoshoot, we deliver artistry that moves people and photographs beautifully.",
                    'DAVIN is proudly associated with FTV Salon for premium bridal services, a collaboration that reflects our commitment to the highest standards of beauty in Kochi. With a 4.8-star Google rating from 750+ clients and 10,800+ Instagram followers, our portfolio speaks for itself.',
                  ]
            }
            ctaLabel={language === 'ml' ? 'ട്രയൽ ബുക്ക് ചെയ്യുക' : 'Book A Trial'}
          />
        </section>
        <section className="p-light">
          <SectionBand>{language === 'ml' ? 'ഞങ്ങളുടെ മേക്കപ്പ് സേവനങ്ങൾ' : 'Our Makeup Services'}</SectionBand>
        </section>
        <ScrollStory
          eyebrow={language === 'ml' ? 'ഞങ്ങളുടെ സേവനങ്ങളിലൂടെ സ്ക്രോൾ ചെയ്യൂ' : 'Scroll Through Our Services'}
          title={language === 'ml' ? 'മേക്കപ്പ്, ഓരോ അവസരവും' : 'Makeup, Occasion by Occasion'}
          tone="dark"
        >
          <BridalPanel />
          <PartyPanel />
          <HdPanel />
          <SareePanel />
          <PackagePanel />
          <PhilosophyPanel />
        </ScrollStory>
        <FaqSection />
        <ClosingCta
          title={language === 'ml' ? 'കൊച്ചിയിലെ DAVIN-ൽ നിങ്ങളുടെ മേക്കപ്പ് അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ' : 'Book Your Makeup Appointment at DAVIN, Kochi'}
          body={
            language === 'ml'
              ? 'കാലൂർ, കൊച്ചിയിലെ ഏറ്റവും മികച്ച ബ്രൈഡൽ മേക്കപ്പ് ആർട്ടിസ്റ്റിൽ നിങ്ങളുടെ ഏറ്റവും മനോഹരമായ ലുക്ക് കാത്തിരിക്കുന്നു.'
              : 'Your most beautiful look is waiting at the best bridal makeup artist in Kaloor, Kochi.'
          }
          secondaryLabel={language === 'ml' ? 'വിളിക്കുക / വാട്സ്ആപ്പ്' : 'Call / WhatsApp'}
          secondaryHref="https://wa.me/918089069996"
          crossLinks={[...CROSS_LINKS[language]]}
        />
      </div>
      <Footer />
    </>
  );
}
