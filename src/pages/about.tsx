import { useEffect } from 'react';
import { aboutConfig } from '../config';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import Story from '../components/about/Story';
import Milestones from '../components/about/Milestones';
import Team from '../components/about/Team';

const META_KEYWORDS =
  'about DAVIN Beauty Salon, beauty salon Kaloor Kochi, best salon Ernakulam, salon since 2020 Kochi, unisex salon Kaloor, DAVIN Beauty Salon story, FTV Salon collaboration Kochi';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About DAVIN Beauty Salon',
  url: 'https://davinsalon.com/about-us',
  mainEntity: {
    '@type': 'BeautySalon',
    name: 'DAVIN Beauty Salon',
    telephone: '+918089069996',
    url: 'https://davinsalon.com',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu',
      addressLocality: 'Kaloor',
      addressRegion: 'Kochi, Kerala',
      postalCode: '682025',
      addressCountry: 'IN',
    },
    sameAs: ['https://www.instagram.com/davin.salon.kaloor/', 'https://www.facebook.com/profile.php?id=61590811551156'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '750',
    },
  },
};

export default function About() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = aboutConfig.metaTitle;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDescription?.content ?? '';
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = aboutConfig.metaDescription;

    let metaKeywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    const prevKeywords = metaKeywords?.content ?? '';
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = META_KEYWORDS;

    const schemaTag = document.createElement('script');
    schemaTag.type = 'application/ld+json';
    schemaTag.text = JSON.stringify(SCHEMA);
    document.head.appendChild(schemaTag);

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
      if (metaKeywords) metaKeywords.content = prevKeywords;
      document.head.removeChild(schemaTag);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />
      <div style={{ background: '#fff', color: '#000', fontFamily: "'IBM Plex Mono', monospace" }}>
        <AboutHero />
        <Story />
        <Milestones />
        <Team />
      </div>
      <Footer />
    </>
  );
}
