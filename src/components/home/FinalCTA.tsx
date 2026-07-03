import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finalCtaConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!finalCtaConfig.title[language]) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      style={{
        background: '#000',
        color: '#fff',
        padding: '120px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      <div ref={contentRef} style={{ width: '100%', maxWidth: '760px', opacity: 0 }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(30px, 4vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
            textTransform: 'uppercase',
            margin: '0 0 24px 0',
            textWrap: 'balance',
          }}
        >
          {finalCtaConfig.title[language]}
        </h2>

        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '26px',
            color: 'rgba(255,255,255,0.65)',
            margin: '0 0 40px 0',
          }}
        >
          {finalCtaConfig.body[language]}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '44px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.03em',
          }}
        >
          <span>{finalCtaConfig.address}</span>
          <span>{finalCtaConfig.phone}</span>
          <span>{finalCtaConfig.hours[language]}</span>
          <a
            href={finalCtaConfig.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}
          >
            {finalCtaConfig.instagramHandle}
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {finalCtaConfig.buttons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              target={button.href.startsWith('http') ? '_blank' : undefined}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-block',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: index === 0 ? '#000' : '#fff',
                background: index === 0 ? '#fff' : 'transparent',
                border: index === 0 ? '1px solid #fff' : '1px solid rgba(255,255,255,0.4)',
                padding: '12px 24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                if (index === 0) {
                  el.style.background = 'rgba(255,255,255,0.85)';
                } else {
                  el.style.background = '#fff';
                  el.style.color = '#000';
                }
                el.style.letterSpacing = '0.16em';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                if (index === 0) {
                  el.style.background = '#fff';
                } else {
                  el.style.background = 'transparent';
                  el.style.color = '#fff';
                }
                el.style.letterSpacing = '0.12em';
              }}
            >
              {button.label[language]}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
