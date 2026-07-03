import { useState } from 'react';
import AsciiCanvas from './AsciiCanvas';
import Header from '../Header';
import { heroConfig, navigationConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Hero() {
  const { language } = useLanguage();
  const notes = heroConfig.supportingNotes[language].slice(0, 3);
  const titleLines = heroConfig.titleLines[language];
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const hasHeroContent =
    navigationConfig.brandName ||
    navigationConfig.links.length > 0 ||
    heroConfig.eyebrow[language] ||
    titleLines.length > 0 ||
    heroConfig.leadText[language] ||
    notes.length > 0;

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
      {/* Full-section background (video, falling back to image, falling back to solid black) */}
      {heroConfig.backgroundImage && !imageFailed && (
        <img
          src={heroConfig.backgroundImage}
          alt="Expert stylist at work at DAVIN Beauty Salon Stadium Link Road Kochi"
          onError={() => setImageFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      )}
      {heroConfig.backgroundVideo && !videoFailed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={heroConfig.backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Navigation — a sibling of both panels, not nested inside either one's
          stacking context, so its position:fixed + z-index actually wins over
          the right panel's canvas instead of being painted over by it */}
      <Header transparentOnTop />

      {/* Left Panel */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '40%',
          minWidth: '320px',
          background: 'rgba(0,0,0,0.55)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Hero Content — flex-centered with a reserved top gap so the
            fixed header never has hero text scrolling up underneath it,
            even on short viewports where absolute+translate centering
            could push the title above the fold. */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '40px',
            paddingRight: '32px',
            paddingTop: '100px',
            paddingBottom: '80px',
            boxSizing: 'border-box',
            zIndex: 10,
            position: 'relative',
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
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < titleLines.length - 1 && <br />}
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
            {language === 'en' ? 'Est. 2020' : 'സ്ഥാപിതം 2020'}
          </span>
        </div>
      </div>

      {/* Right Panel - ASCII Canvas with Salon Image (unchanged) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
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
