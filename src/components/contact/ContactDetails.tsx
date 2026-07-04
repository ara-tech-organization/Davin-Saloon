import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function handleCardTiltMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.015)`;
}

function handleCardTiltLeave(e: MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
}

const cardStyle: React.CSSProperties = {
  position: 'relative',
  border: '1px solid rgba(255,255,255,0.18)',
  background: 'rgba(255,255,255,0.03)',
  padding: '40px 36px',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.25s ease-out, border-color 0.25s ease-out',
  willChange: 'transform',
  overflow: 'hidden',
};

export default function ContactDetails() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(sectionRef.current!.querySelectorAll('.contact-card')).forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );
      });

      const hoursRows = sectionRef.current!.querySelectorAll('.hours-row');
      if (hoursRows.length) {
        gsap.fromTo(
          hoursRows,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current!.querySelector('.hours-table'), start: 'top 90%', toggleActions: 'play none none reverse' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const { callCard, visitCard, hours } = contactConfig;
  const telHref = `tel:${callCard.phone.replace(/\s/g, '')}`;
  const waHref = `https://wa.me/${callCard.phone.replace(/[^\d]/g, '')}`;

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
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            fontWeight: 400,
            color: '#fff',
            textTransform: 'uppercase',
            margin: '0 0 64px 0',
            textAlign: 'center',
            textWrap: 'balance',
          }}
        >
          {language === 'ml' ? 'ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ' : 'Contact Details'}
        </h2>

        {/* Call + Visit cards, 3D tilt on hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '32px',
            marginBottom: '80px',
          }}
        >
          <div
            className="contact-card"
            onMouseMove={handleCardTiltMove}
            onMouseLeave={handleCardTiltLeave}
            style={cardStyle}
          >
            <span
              style={{
                position: 'absolute',
                right: '20px',
                top: '-24px',
                fontFamily: "'Geist Pixel', monospace",
                fontSize: 'clamp(48px, 7vw, 84px)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              📞
            </span>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 14px 0' }}>
              {language === 'ml' ? 'വിളിക്കുക അല്ലെങ്കിൽ വാട്സ്ആപ്പ്' : 'Call or WhatsApp'}
            </p>
            <h3
              style={{
                fontFamily: "'Geist Pixel', monospace",
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 400,
                color: '#fff',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
                textWrap: 'balance',
              }}
            >
              {callCard.title[language]}
            </h3>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', lineHeight: '24px', color: 'rgba(255,255,255,0.7)', margin: '0 0 24px 0', maxWidth: '440px' }}>
              {callCard.description[language]}
            </p>
            <p style={{ fontFamily: "'Geist Pixel', monospace", fontSize: 'clamp(22px, 2.4vw, 30px)', color: '#fff', margin: '0 0 8px 0' }}>
              {callCard.phone}
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 28px 0' }}>
              {callCard.availability[language]}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
              <a
                href={telHref}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#000',
                  background: '#fff',
                  border: '1px solid #fff',
                  padding: '13px 26px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {callCard.callText[language]}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.4)',
                  padding: '13px 26px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {callCard.whatsappText[language]}
              </a>
            </div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', lineHeight: '20px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              {callCard.note[language]}
            </p>
          </div>

          <div
            className="contact-card"
            onMouseMove={handleCardTiltMove}
            onMouseLeave={handleCardTiltLeave}
            style={cardStyle}
          >
            <span
              style={{
                position: 'absolute',
                right: '20px',
                top: '-24px',
                fontFamily: "'Geist Pixel', monospace",
                fontSize: 'clamp(48px, 7vw, 84px)',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              📍
            </span>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 14px 0' }}>
              {language === 'ml' ? 'ഞങ്ങളെ സന്ദർശിക്കൂ' : 'Visit Us'}
            </p>
            <h3
              style={{
                fontFamily: "'Geist Pixel', monospace",
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 400,
                color: '#fff',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
                textWrap: 'balance',
              }}
            >
              {visitCard.title[language]}
            </h3>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', lineHeight: '24px', color: 'rgba(255,255,255,0.7)', margin: '0 0 24px 0', maxWidth: '440px' }}>
              {visitCard.description[language]}
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', lineHeight: '22px', color: '#fff', margin: '0 0 12px 0', maxWidth: '440px' }}>
              {visitCard.address}
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.5)', margin: '0 0 28px 0', maxWidth: '440px' }}>
              {visitCard.landmark[language]}
            </p>
            <a
              href={visitCard.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '13px 26px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {visitCard.ctaText[language]}
            </a>
          </div>
        </div>

        {/* Salon Hours table */}
        <div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px 0', textAlign: 'center' }}>
            🕐 {hours.title[language]}
          </p>
          <div className="hours-table" style={{ maxWidth: '560px', margin: '0 auto', border: '1px solid rgba(255,255,255,0.18)' }}>
            {hours.rows.map((row, i) => (
              <div
                key={i}
                className="hours-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '14px 24px',
                  borderBottom: i === hours.rows.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '13px',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>{row.day[language]}</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{row.hours[language]}</span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              lineHeight: '22px',
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '24px auto 0',
            }}
          >
            {hours.note[language]}
          </p>
        </div>
      </div>
    </section>
  );
}
