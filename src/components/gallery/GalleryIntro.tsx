import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryIntro() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);

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
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
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
          {galleryConfig.intro.h2[language]}
        </h2>

        <div className="reveal-up">
          {galleryConfig.intro.paragraphs[language].map((p, i) => (
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

        <a
          href={galleryConfig.intro.ctaHref}
          className="reveal-up"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: 'inline-block',
            marginTop: '44px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            color: hover ? '#fff' : '#000',
            background: hover ? '#000' : 'transparent',
            border: '1px solid #000',
            borderRadius: '26px',
            padding: '16px 36px',
            transition: 'all 0.3s ease',
          }}
        >
          {galleryConfig.intro.ctaText[language]}
        </a>
      </div>
    </section>
  );
}
