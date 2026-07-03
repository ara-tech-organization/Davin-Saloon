import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonialsConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const items = testimonialsConfig.items;

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(gridRef.current!.children),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!testimonialsConfig.title[language] && items.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background: '#fff',
        color: '#000',
        padding: '120px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: '1px solid #000',
      }}
    >
      <h2
        style={{
          fontFamily: "'Geist Pixel', monospace",
          fontSize: 'clamp(26px, 3.2vw, 44px)',
          fontWeight: 400,
          lineHeight: 1.1,
          color: '#000',
          textTransform: 'uppercase',
          margin: '0 0 56px 0',
          textAlign: 'center',
          textWrap: 'balance',
          maxWidth: '760px',
        }}
      >
        {testimonialsConfig.title[language]}
      </h2>

      <div
        ref={gridRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(0,0,0,0.15)',
          border: '1px solid rgba(0,0,0,0.15)',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              opacity: 0,
              minHeight: '220px',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: '#000',
                  margin: '0 0 16px 0',
                }}
              >
                ★★★★★
              </p>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: 'rgba(0,0,0,0.75)',
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                "{item.quote[language]}"
              </p>
            </div>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.45)',
                margin: '24px 0 0 0',
              }}
            >
              {item.author[language]} · {item.tag[language]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
