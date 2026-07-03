import { useEffect } from 'react';
import { galleryConfig } from '../config';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryIntro from '../components/gallery/GalleryIntro';
import GalleryCategory from '../components/gallery/GalleryCategory';
import FilmReelShowcase from '../components/gallery/FilmReelShowcase';

export default function Gallery() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = galleryConfig.metaTitle;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDescription?.content ?? '';
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = galleryConfig.metaDescription;

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'DAVIN Beauty Salon Transformation Gallery',
      description: 'Real client transformation photos from DAVIN Beauty Salon in Kaloor, Kochi — showcasing hair care, skin care, nail art, and makeup services.',
      url: 'https://davinsalon.com/gallery',
      author: {
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
      <div style={{ background: '#000', color: '#fff', fontFamily: "'IBM Plex Mono', monospace" }}>
        <GalleryHero />
        <GalleryIntro />
        <GalleryCategory category={galleryConfig.categories[0]} dark variant="tilt" />
        <FilmReelShowcase category={galleryConfig.categories[1]} />
        <GalleryCategory category={galleryConfig.categories[2]} dark variant="mosaic" />
        <GalleryCategory category={galleryConfig.categories[3]} dark={false} variant="editorial" />
      </div>
      <Footer />
    </>
  );
}
