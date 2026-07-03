import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { siteConfig } from './config';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/home';
import FacilityDetail from './pages/FacilityDetail';
import About from './pages/about';
import Services from './pages/services';
import Gallery from './pages/gallery';
import Contact from './pages/contact';
import NailsGrooming from './pages/NailsGrooming';
import Makeup from './pages/Makeup';
import HairCare from './pages/HairCare';
import SkinCare from './pages/SkinCare';

function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    document.title = siteConfig.siteTitle || 'Davin Beauty Salon';
    document.documentElement.lang = siteConfig.language || 'en';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';

    // Hide default cursor
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
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/hair-care" element={<HairCare />} />
        <Route path="/services/skin-care" element={<SkinCare />} />
        <Route path="/services/nails-grooming" element={<NailsGrooming />} />
        <Route path="/services/makeup" element={<Makeup />} />
        <Route path="/services/:slug" element={<FacilityDetail />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
