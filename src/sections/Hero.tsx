import { useEffect, useState } from 'react';
import AsciiCanvas from '../components/AsciiCanvas';
import { heroConfig, navigationConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { language, setLanguage } = useLanguage();
  const notes = heroConfig.supportingNotes[language].slice(0, 3);
  const [scrolled, setScrolled] = useState(false);

  const hasHeroContent =
    navigationConfig.brandName ||
    navigationConfig.links.length > 0 ||
    heroConfig.eyebrow[language] ||
    heroConfig.titleLines.length > 0 ||
    heroConfig.leadText[language] ||
    notes.length > 0;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!hasHeroContent) {
    return null;
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          position: 'relative',
          width: '40%',
          minWidth: '320px',
          background: '#000',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Navigation */}
        <nav
          className={scrolled ? 'header-pattern' : ''}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: scrolled ? '100%' : '40%',
            minWidth: '320px',
            zIndex: 50,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 36px',
            background: scrolled ? '#000' : 'transparent',
            fontFamily: "'IBM Plex Mono', monospace",
            boxSizing: 'border-box',
            transition: 'width 0.4s ease, background 0.4s ease',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          }}
        >
          {/* Brand */}
          <span
            style={{
              fontSize: '18px',
              fontWeight: 400,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              flexShrink: 0,
              marginRight: '32px',
            }}
          >
            {navigationConfig.brandName}
          </span>

          {/* Right side: Links + Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginLeft: 'auto' }}>
            {/* Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {navigationConfig.links.map((item, index) => (
                <div
                  key={`${item.label}-${item.href}`}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <a
                    href={item.href}
                    className="nav-link"
                    style={{
                      fontSize: '11px',
                      fontWeight: 400,
                      color: '#fff',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      letterSpacing: '0.1em',
                      padding: '4px 14px',
                      transition: 'opacity 0.2s, letter-spacing 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.6';
                      (e.target as HTMLElement).style.letterSpacing = '0.16em';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.opacity = '1';
                      (e.target as HTMLElement).style.letterSpacing = '0.1em';
                    }}
                  >
                    {item.label}
                  </a>
                  {index < navigationConfig.links.length - 1 && (
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.2)',
                        fontSize: '10px',
                        padding: '0 2px',
                      }}
                    >
                      /
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Language Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '20px',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setLanguage('en')}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  fontWeight: language === 'en' ? 600 : 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: language === 'en' ? '#000' : 'rgba(255,255,255,0.55)',
                  background: language === 'en' ? '#fff' : 'transparent',
                  border: 'none',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  fontWeight: language === 'ml' ? 600 : 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: language === 'ml' ? '#000' : 'rgba(255,255,255,0.55)',
                  background: language === 'ml' ? '#fff' : 'transparent',
                  border: 'none',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                മല
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div
          style={{
            position: 'absolute',
            left: '40px',
            right: '32px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: 'calc(100% - 72px)',
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              fontWeight: 400,
              lineHeight: 1.6,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              margin: '0 0 20px 0',
            }}
          >
            {heroConfig.eyebrow[language]}
          </p>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Geist Pixel', monospace",
              fontSize: 'clamp(40px, 5.2vw, 76px)',
              fontWeight: 400,
              lineHeight: 0.95,
              color: '#fff',
              textTransform: 'uppercase',
              margin: 0,
              textWrap: 'balance',
              letterSpacing: '0.015em',
            }}
          >
            {heroConfig.titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < heroConfig.titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Lead Text */}
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.5)',
              margin: '40px 0 0 0',
              maxWidth: '38ch',
            }}
          >
            {heroConfig.leadText[language]}
          </p>

          {/* Supporting Notes - horizontal layout */}
          <div
            style={{
              marginTop: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {notes.map((note, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.38)',
                  margin: 0,
                  letterSpacing: '0.04em',
                }}
              >
                {note}
              </p>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="tel:+918089069996"
            className="hero-cta"
            style={{
              display: 'inline-block',
              marginTop: '40px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              background: '#fff',
              padding: '12px 28px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.85)';
              (e.currentTarget as HTMLElement).style.letterSpacing = '0.18em';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#fff';
              (e.currentTarget as HTMLElement).style.letterSpacing = '0.12em';
            }}
          >
            {language === 'en' ? 'Book Appointment' : 'അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക'}
          </a>
        </div>

        {/* Bottom decorative line */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '40px',
            right: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              height: '1px',
              flex: 1,
              background: 'linear-gradient(to right, rgba(255,255,255,0.2), transparent)',
            }}
          />
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
            }}
          >
            Est. 2020
          </span>
        </div>
      </div>

      {/* Right Panel - ASCII Canvas with Salon Image */}
      <div
        style={{
          position: 'relative',
          width: '60%',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        <AsciiCanvas />
      </div>
    </section>
  );
}
