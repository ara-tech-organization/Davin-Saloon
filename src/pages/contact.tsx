import { useEffect } from 'react';
import { contactConfig } from '../config';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactHero from '../components/contact/ContactHero';
import ContactIntro from '../components/contact/ContactIntro';
import ContactDetails from '../components/contact/ContactDetails';
import BookingForm from '../components/contact/BookingForm';
import LocationMap from '../components/contact/LocationMap';
import ContactClosing from '../components/contact/ContactClosing';

export default function Contact() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = contactConfig.metaTitle;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDescription?.content ?? '';
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = contactConfig.metaDescription;

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      name: 'DAVIN Beauty Salon',
      url: 'https://davinsalon.com/contact',
      telephone: '+918089069996',
      email: 'davinsalonkochi@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu',
        addressLocality: 'Kaloor',
        addressRegion: 'Kochi, Kerala',
        postalCode: '682025',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '9.9897',
        longitude: '76.2995',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+918089069996',
        contactType: 'Customer Service',
        availableLanguage: ['English', 'Malayalam'],
      },
    });
    document.head.appendChild(schema);

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
      document.head.removeChild(schema);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />
      <div style={{ background: '#fff', color: '#000', fontFamily: "'IBM Plex Mono', monospace" }}>
        <ContactHero />
        <ContactIntro />
        <ContactDetails />
        <BookingForm />
        <LocationMap />
        <ContactClosing />
      </div>
      <Footer />
    </>
  );
}
