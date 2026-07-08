import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactClosing() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { closing } = contactConfig;

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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        color: '#000',
        borderTop: '1px solid #000',
        padding: '120px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div ref={contentRef} style={{ width: '100%', maxWidth: '760px', opacity: 0 }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(30px, 4vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#000',
            textTransform: 'uppercase',
            margin: '0 0 24px 0',
            textWrap: 'balance',
          }}
        >
          {closing.title[language]}
        </h2>

        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '26px',
            color: 'rgba(0,0,0,0.7)',
            margin: '0 0 40px 0',
          }}
        >
          {closing.body[language]}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '44px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            color: 'rgba(0,0,0,0.75)',
            letterSpacing: '0.03em',
          }}
        >
          <span>📍 {closing.address}</span>
          <span>📞 {closing.phone}</span>
          <span>🕐 {closing.hours[language]}</span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '4px' }}>
            <a
              href={closing.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: '#000', display: 'inline-flex' }}
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href={closing.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: '#000', display: 'inline-flex' }}
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '56px',
          }}
        >
          {closing.buttons.map((button, index) => (
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
                color: index === 0 ? '#fff' : '#000',
                background: index === 0 ? '#000' : 'transparent',
                border: index === 0 ? '1px solid #000' : '1px solid rgba(0,0,0,0.4)',
                padding: '12px 24px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                if (index === 0) {
                  el.style.background = 'rgba(0,0,0,0.8)';
                } else {
                  el.style.background = '#000';
                  el.style.color = '#fff';
                }
                el.style.letterSpacing = '0.16em';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                if (index === 0) {
                  el.style.background = '#000';
                } else {
                  el.style.background = 'transparent';
                  el.style.color = '#000';
                }
                el.style.letterSpacing = '0.12em';
              }}
            >
              {button.label[language]}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', margin: '0 0 16px 0' }}>
          {closing.exploreLabel[language]}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {closing.exploreLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#000',
                textDecoration: 'none',
                borderBottom: '1px solid #000',
                paddingBottom: '2px',
                transition: 'letter-spacing 0.3s, opacity 0.2s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.letterSpacing = '0.14em'; (e.target as HTMLElement).style.opacity = '0.6'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.letterSpacing = '0.08em'; (e.target as HTMLElement).style.opacity = '1'; }}
            >
              {link.label[language]} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
