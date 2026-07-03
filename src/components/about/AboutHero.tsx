import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' }
        );
        gsap.to(heroImageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      if (heroTextRef.current) {
        gsap.fromTo(
          heroTextRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        height: '92vh',
        minHeight: '560px',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <div ref={heroImageRef} style={{ position: 'absolute', inset: '-8% 0', opacity: 0 }}>
        <img
          src={aboutConfig.hero.image}
          alt={aboutConfig.hero.imageAlt[language]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(100%) contrast(1.1)',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Decorative corner brackets — premium framing */}
      <div style={{ position: 'absolute', top: '32px', left: '32px', width: '60px', height: '60px', borderLeft: '1px solid rgba(255,255,255,0.35)', borderTop: '1px solid rgba(255,255,255,0.35)' }} />
      <div style={{ position: 'absolute', bottom: '32px', right: '32px', width: '60px', height: '60px', borderRight: '1px solid rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.35)' }} />

      <div
        ref={heroTextRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 40px 90px',
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p style={{ opacity: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 20px 0' }}>
          {aboutConfig.hero.eyebrow[language]}
        </p>
        <h1
          style={{
            opacity: 0,
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(30px, 4.6vw, 66px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
            textTransform: 'uppercase',
            margin: 0,
            textWrap: 'balance',
            maxWidth: '920px',
          }}
        >
          {aboutConfig.hero.h1[language]}
        </h1>
      </div>
    </section>
  );
}
