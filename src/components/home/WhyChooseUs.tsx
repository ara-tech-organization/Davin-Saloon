import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyChooseConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const items = whyChooseConfig.items[language];

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(listRef.current!.children),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
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

  if (!whyChooseConfig.title[language] && items.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      style={{
        background: '#ffffff',
        color: '#000000',
        borderTop: '1px solid #000',
        padding: '100px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#000',
            textTransform: 'uppercase',
            margin: '0 0 48px 0',
            textWrap: 'balance',
          }}
        >
          {whyChooseConfig.title[language]}
        </h2>

        <ul
          ref={listRef}
          className="why-choose-list"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px 48px',
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                opacity: 0,
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                paddingBottom: '20px',
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '14px',
                  color: '#000',
                  flexShrink: 0,
                }}
              >
                ✦
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  color: '#000',
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
