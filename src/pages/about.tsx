import { useEffect } from 'react';
import { aboutConfig } from '../config';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import Story from '../components/about/Story';
import Milestones from '../components/about/Milestones';
import Team from '../components/about/Team';

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
