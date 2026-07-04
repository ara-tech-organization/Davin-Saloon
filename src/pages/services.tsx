import { useEffect } from 'react';
import { assetUrl as img } from '../lib/asset';
import { useLanguage } from '../contexts/LanguageContext';
import { faqConfig } from '../config';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Facilities from '../components/home/Facilities';
import { Hero, CenteredIntro, SectionBand, TagChips, FaqAccordion, ClosingCta, Eyebrow } from '../components/services/premium';

const META_TITLE = 'Our Services | Hair, Skin, Nails & Makeup | DAVIN Beauty Salon Kochi';
const META_DESCRIPTION =
  'Explore every service at DAVIN Beauty Salon, Kaloor, Kochi — Hair Care, Skin Care, Nails & Grooming, and Makeup. Premium products, expert therapists, one address.';
const META_KEYWORDS =
  'DAVIN Beauty Salon services, beauty salon Kaloor Kochi, hair care skin care nails makeup Kochi, unisex salon services Kochi, salon price list Kaloor';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'DAVIN Beauty Salon Services',
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
      reviewCount: '750',
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Salon Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hair Care' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skin Care' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nails & Grooming' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Makeup' } },
    ],
  },
};

const DIFFERENTIATORS = {
  en: ['Expert, certified professionals', 'Premium salon-grade products only', 'Personalized care for every client', 'Immaculate hygiene standards', 'Welcoming, inclusive environment'],
  ml: ['വിദഗ്ധരും സർട്ടിഫൈഡുമായ പ്രൊഫഷണലുകൾ', 'മികച്ച സലൂൺ-ഗ്രേഡ് ഉൽപ്പന്നങ്ങൾ മാത്രം', 'ഓരോ ക്ലയന്റിനും വ്യക്തിഗത പരിചരണം', 'കുറ്റമറ്റ ശുചിത്വ നിലവാരം', 'സ്വാഗതാർഹവും ഉൾക്കൊള്ളുന്നതുമായ അന്തരീക്ഷം'],
};

const CROSS_LINKS = {
  en: [
    { label: 'Hair Care →', href: '/services/hair-care' },
    { label: 'Skin Care →', href: '/services/skin-care' },
    { label: 'Nails & Grooming →', href: '/services/nails-grooming' },
    { label: 'Makeup →', href: '/services/makeup' },
    { label: 'View Gallery →', href: '/gallery' },
  ],
  ml: [
    { label: 'ഹെയർ കെയർ →', href: '/services/hair-care' },
    { label: 'സ്കിൻ കെയർ →', href: '/services/skin-care' },
    { label: 'നഖങ്ങളും ഗ്രൂമിംഗും →', href: '/services/nails-grooming' },
    { label: 'മേക്കപ്പ് →', href: '/services/makeup' },
    { label: 'ഗാലറി കാണുക →', href: '/gallery' },
  ],
};

const FAQ_SLUGS_EN = [
  'What services does DAVIN Beauty Salon offer?',
  'What are DAVIN Beauty Salon\'s opening hours?',
  'How do I book an appointment at DAVIN Beauty Salon in Kochi?',
  'Is DAVIN a unisex salon?',
];

function useMetaTags(title: string, description: string, schema?: object, keywords?: string) {
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

    let metaKeywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    const prevKeywords = metaKeywords?.content ?? '';
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

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
      if (keywords && metaKeywords) metaKeywords.content = prevKeywords;
      if (schemaTag) document.head.removeChild(schemaTag);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [title, description, schema, keywords]);
}

export default function Services() {
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA, META_KEYWORDS);
  const { language } = useLanguage();

  const faqItems = faqConfig.items
    .filter((item) => FAQ_SLUGS_EN.includes(item.question.en))
    .map((item) => ({ q: item.question[language], a: item.answer[language] }));

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow="Services"
          title={language === 'ml' ? 'ഹെയർ, സ്കിൻ, നഖങ്ങൾ & മേക്കപ്പ് — ഒരൊറ്റ വിലാസത്തിൽ' : 'Hair, Skin, Nails & Makeup — All Under One Roof'}
          subline={
            language === 'ml'
              ? 'കാലൂരിലെ DAVIN ബ്യൂട്ടി സലൂണിൽ നാല് ലോകങ്ങളിലായുള്ള സൗന്ദര്യ സേവനങ്ങൾ. ഒരു ടീം, ഒരു നിലവാരം.'
              : "Four categories of premium beauty care at DAVIN Beauty Salon, Kaloor — one team, one standard of excellence."
          }
          image={img('/images/salon-interior.jpg')}
          imageAlt={language === 'ml' ? 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂർ കൊച്ചിയിലെ അകത്തള കാഴ്ച' : 'Interior of DAVIN Beauty Salon Kaloor Kochi'}
          ctaLabel={language === 'ml' ? 'അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക' : 'Book An Appointment'}
        />
        <section className="p-light" style={{ padding: '120px 40px 60px' }}>
          <CenteredIntro
            eyebrow={language === 'ml' ? 'DAVIN-ലെ സേവനങ്ങൾ' : "What's on Offer at DAVIN"}
            title={language === 'ml' ? 'നാല് ലോകങ്ങൾ. ഒരു അസാധാരണ സലൂൺ.' : 'Four Worlds of Beauty. One Exceptional Salon.'}
            paragraphs={
              language === 'ml'
                ? [
                    'കാലൂരിലെ DAVIN ബ്യൂട്ടി സലൂൺ 2020 മുതൽ ഒരു പ്രീമിയം, യൂണിസെക്സ് ബ്യൂട്ടി ഡെസ്റ്റിനേഷനാണ്. ഹെയർ കെയർ, സ്കിൻ കെയർ, നെയിൽസ് & ഗ്രൂമിംഗ്, മേക്കപ്പ് എന്നീ നാല് പ്രധാന വിഭാഗങ്ങളിലായി ഞങ്ങൾ സേവനങ്ങൾ നൽകുന്നു — ഓരോന്നും വൈദഗ്ധ്യം, മികച്ച ഉൽപ്പന്നങ്ങൾ, യഥാർത്ഥ കരുതൽ എന്നിവയുടെ അടിത്തറയിലാണ് നിർമ്മിച്ചിരിക്കുന്നത്.',
                    'താഴെയുള്ള ഏതെങ്കിലും വിഭാഗത്തിൽ ക്ലിക്ക് ചെയ്ത് പൂർണ്ണ വിവരണം കാണുക, അല്ലെങ്കിൽ നേരിട്ട് വിളിച്ചോ വാട്ട്‌സ്ആപ്പ് ചെയ്തോ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക.',
                  ]
                : [
                    'DAVIN Beauty Salon in Kaloor has been a premium, unisex beauty destination since 2020. We offer services across four core categories — Hair Care, Skin Care, Nails & Grooming, and Makeup — each built on a foundation of expertise, premium products, and genuine care.',
                    'Click into any category below for the full service menu, or call/WhatsApp us directly to book.',
                  ]
            }
            ctaLabel={language === 'ml' ? 'ട്രയൽ ബുക്ക് ചെയ്യുക' : 'Book A Trial'}
          />
        </section>
        <Facilities />
        <section className="p-light" style={{ padding: '100px 40px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <Eyebrow>{language === 'ml' ? 'DAVIN എന്തുകൊണ്ട്' : 'Why DAVIN'}</Eyebrow>
            <h2 className="p-serif" style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 400, margin: '18px 0 32px' }}>
              {language === 'ml' ? 'എല്ലാ സേവനത്തിലും ഒരേ നിലവാരം' : 'The Same Standard, Across Every Service'}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <TagChips tags={DIFFERENTIATORS[language]} />
            </div>
          </div>
        </section>
        <section className="p-light">
          <SectionBand>{language === 'ml' ? 'പതിവ് ചോദ്യങ്ങൾ' : 'Services FAQ'}</SectionBand>
        </section>
        <section className="p-light" style={{ padding: '0 40px 130px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <FaqAccordion items={faqItems} />
          </div>
        </section>
        <ClosingCta
          title={language === 'ml' ? 'ഏത് സേവനമാണ് നിങ്ങൾക്ക് വേണ്ടത്?' : 'Which Service Is Calling Your Name?'}
          body={
            language === 'ml'
              ? 'ഹെയർ, സ്കിൻ, നഖങ്ങൾ, മേക്കപ്പ് — കാലൂരിലെ DAVIN ബ്യൂട്ടി സലൂണിൽ എല്ലാം ഒരിടത്ത്.'
              : 'Hair, skin, nails, or makeup — DAVIN Beauty Salon in Kaloor has it covered, all under one roof.'
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
