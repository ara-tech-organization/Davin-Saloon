import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { map } = contactConfig;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelector('.map-frame'),
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        color: '#fff',
        padding: '120px 40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1100px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            fontWeight: 400,
            color: '#fff',
            textTransform: 'uppercase',
            margin: '0 0 40px 0',
            textWrap: 'balance',
          }}
        >
          {map.title[language]}
        </h2>

        <div
          className="map-frame"
          style={{
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '10px',
            background: '#000',
          }}
        >
          <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '28px', height: '28px', borderLeft: '1px solid rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.5)' }} />
          <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '28px', height: '28px', borderRight: '1px solid rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.5)' }} />
          <iframe
            src={map.embedSrc}
            width="100%"
            height="450"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DAVIN Beauty Salon Location Map – Stadium Link Road, Kaloor, Kochi"
          />
        </div>

        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.5)', marginTop: '28px' }}>
          {map.note[language]}
        </p>
      </div>
    </section>
  );
}
