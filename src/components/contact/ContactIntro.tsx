import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactIntro() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.utils.toArray<HTMLElement>(sectionRef.current.querySelectorAll('.reveal-up')).forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            }
          );
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        padding: '120px 40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '820px', textAlign: 'center' }}>
        <h2
          className="reveal-up"
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(26px, 3.2vw, 46px)',
            fontWeight: 400,
            lineHeight: 1.08,
            color: '#000',
            textTransform: 'uppercase',
            margin: '0 0 36px 0',
            textWrap: 'balance',
          }}
        >
          {contactConfig.intro.h2[language]}
        </h2>

        <div className="reveal-up">
          {contactConfig.intro.paragraphs[language].map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: '28px',
                color: 'rgba(0,0,0,0.85)',
                margin: i === 0 ? 0 : '20px 0 0 0',
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
