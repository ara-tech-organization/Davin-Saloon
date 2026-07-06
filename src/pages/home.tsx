import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config';
import CustomCursor from '../components/CustomCursor';
import Hero from '../components/home/Hero';
import AboutIntro from '../components/home/AboutIntro';
import Facilities from '../components/home/Facilities';
import LiveLook from '../components/home/LiveLook';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Archives from '../components/home/Archives';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import FinalCTA from '../components/home/FinalCTA';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const META_KEYWORDS =
  "DAVIN Beauty Salon Kaloor, Kaloor's premier beauty salon, Beauty salon in Kaloor, Best beauty salon Kochi, Unisex salon in Kaloor, Bridal makeover Kerala";

export default function Home() {
  const { hash } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = siteConfig.siteTitle;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDescription?.content ?? '';
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription;

    let metaKeywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    const prevKeywords = metaKeywords?.content ?? '';
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = META_KEYWORDS;

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      name: 'DAVIN Beauty Salon',
      image: 'https://davinsalon.com/images/davin-beauty-salon-kochi.jpg',
      description:
        'Premium unisex beauty salon in Kaloor, Kochi offering hair care, bridal makeup, skincare, nail services and grooming.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu',
        addressLocality: 'Kaloor',
        addressRegion: 'Kochi',
        postalCode: '682025',
        addressCountry: 'IN',
      },
      telephone: '+918089069996',
      openingHours: 'Mo-Su 09:00-21:00',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '767',
      },
      url: 'https://davinsalon.com',
      sameAs: ['https://www.instagram.com/davin.salon.kaloor/'],
    });
    document.head.appendChild(schema);

    return () => {
      document.title = prevTitle;
      if (metaDescription) metaDescription.content = prevDescription;
      if (metaKeywords) metaKeywords.content = prevKeywords;
      document.head.removeChild(schema);
    };
  }, []);

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, [hash]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <main>
        <Hero />
        <AboutIntro />
        <Facilities />
        <LiveLook />
        <WhyChooseUs />
        <Archives />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
