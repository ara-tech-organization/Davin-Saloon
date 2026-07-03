import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { GalleryCategoryData } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';
import GalleryImage from './GalleryImage';

gsap.registerPlugin(ScrollTrigger);

interface FilmReelShowcaseProps {
  category: GalleryCategoryData;
}

export default function FilmReelShowcase({ category }: FilmReelShowcaseProps) {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const items = category.items;

  const subtitle = language === 'en'
    ? 'A glimpse into our world of transformation'
    : 'മാറ്റത്തിന്റെ ലോകത്തിലേക്കുള്ള ഒരു ചെറിയ ദർശനം';

  useEffect(() => {
    if (!sectionRef.current || !wheelRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
          }
        );
      }

      gsap.fromTo(
        wheelRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.to(wheelRef.current, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const count = items.length;
  const radius = 260;

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        color: '#000',
        padding: '120px 40px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '60px', opacity: 0, position: 'relative', zIndex: 10 }}>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            margin: '0 0 16px 0',
          }}
        >
          {subtitle}
        </p>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 400,
            lineHeight: 1.0,
            color: '#000',
            textTransform: 'uppercase',
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {category.title[language]}
        </h2>
      </div>

      <div style={{ position: 'relative', width: '640px', height: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: '20px', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.08)' }} />
        <div style={{ position: 'absolute', inset: '45px', borderRadius: '50%', border: '1px dashed rgba(0,0,0,0.1)' }} />

        <div ref={wheelRef} style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spin 40s linear infinite' }}>
          {items.map((item, index) => {
            const angle = (360 / count) * index;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <div
                key={item.slug}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                  width: '140px',
                  height: '180px',
                }}
              >
                <div style={{ width: '100%', height: '100%', background: '#000', padding: '6px 6px 24px 6px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                  <GalleryImage
                    src={item.src}
                    alt={item.alt[language]}
                    dark
                    style={{ height: '128px', filter: 'grayscale(100%)' }}
                  />
                  <p
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '8px',
                      fontWeight: 400,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                      textAlign: 'center',
                      margin: '6px 0 0 0',
                    }}
                  >
                    {item.label[language]}
                  </p>
                </div>

                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                  {[0, 1, 2].map((h) => (
                    <div key={h} style={{ width: '4px', height: '4px', background: 'rgba(0,0,0,0.15)', borderRadius: '1px' }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            boxShadow: '0 0 40px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Geist Pixel', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>D</span>
          </div>
        </div>

        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            style={{
              position: 'absolute',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.12)',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(55px)`,
            }}
          />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.15)' }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>
          {count} Frames
        </span>
        <div style={{ width: '40px', height: '1px', background: 'rgba(0,0,0,0.15)' }} />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
