import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { galleryConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GalleryHero() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="header-pattern scene"
      style={{
        position: 'relative',
        minHeight: '64vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#000',
        padding: '140px 40px 90px',
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative corner brackets — premium framing, echoes About hero */}
      <div style={{ position: 'absolute', top: '32px', left: '32px', width: '60px', height: '60px', borderLeft: '1px solid rgba(255,255,255,0.35)', borderTop: '1px solid rgba(255,255,255,0.35)' }} />
      <div style={{ position: 'absolute', bottom: '32px', right: '32px', width: '60px', height: '60px', borderRight: '1px solid rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.35)' }} />

      <div
        ref={textRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <p style={{ opacity: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 20px 0' }}>
          {galleryConfig.hero.eyebrow[language]}
        </p>
        <h1
          style={{
            opacity: 0,
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
            textTransform: 'uppercase',
            margin: 0,
            textWrap: 'balance',
            maxWidth: '960px',
          }}
        >
          {galleryConfig.hero.h1[language]}
        </h1>
        <p style={{ opacity: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', margin: '28px 0 0 0' }}>
          {galleryConfig.hero.subEyebrow[language]}
        </p>
      </div>
    </section>
  );
}
