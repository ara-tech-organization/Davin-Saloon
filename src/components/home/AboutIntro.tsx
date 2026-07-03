import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { manifestoConfig } from '../../config';
import { assetUrl as img } from '../../lib/asset';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const imageStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (imageStripRef.current) {
        gsap.fromTo(
          imageStripRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      style={{
        background: '#ffffff',
        color: '#000000',
        padding: '140px 40px 100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1360px',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 46%) minmax(320px, 1fr)',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {manifestoConfig.image ? (
          <div
            ref={videoRef}
            style={{
              opacity: 0,
              overflow: 'hidden',
            }}
          >
            <div
              className="img-zoom"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                background: '#000',
              }}
            >
              <img
                src={manifestoConfig.image}
                alt={manifestoConfig.imageAlt[language]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(100%)',
                }}
              />
            </div>
          </div>
        ) : (
          <div ref={videoRef} />
        )}

        <div>
          <h2
            style={{
              fontFamily: "'Geist Pixel', monospace",
              fontSize: 'clamp(26px, 2.8vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#000',
              textTransform: 'uppercase',
              margin: '0 0 24px 0',
              textWrap: 'balance',
            }}
          >
            {manifestoConfig.title[language]}
          </h2>

          <div ref={textRef} style={{ opacity: 0 }}>
            {manifestoConfig.paragraphs[language].map((paragraph, index) => (
              <p
                key={index}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  maxWidth: '680px',
                  textAlign: 'left',
                  margin: index === 0 ? 0 : '20px 0 0 0',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {manifestoConfig.statsLine[language] && (
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.55)',
                margin: '28px 0 0 0',
              }}
            >
              {manifestoConfig.statsLine[language]}
            </p>
          )}

          {/* CTA Link */}
          <a
            href="tel:+918089069996"
            style={{
              display: 'inline-block',
              marginTop: '32px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              textDecoration: 'none',
              borderBottom: '1px solid #000',
              paddingBottom: '3px',
              transition: 'letter-spacing 0.3s, opacity 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.letterSpacing = '0.18em';
              (e.target as HTMLElement).style.opacity = '0.6';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.letterSpacing = '0.12em';
              (e.target as HTMLElement).style.opacity = '1';
            }}
          >
            {manifestoConfig.ctaText[language]}
          </a>
        </div>
      </div>

      {/* Decorative Image Strip */}
      <div
        ref={imageStripRef}
        style={{
          width: '100%',
          maxWidth: '1360px',
          marginTop: '100px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '16px',
          opacity: 0,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <img
            src={img("/images/salon-tools.jpg")}
            alt="Professional salon tools at DAVIN Beauty Salon Kaloor Kochi"
            className="img-zoom"
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              display: 'block',
              filter: 'grayscale(100%)',
            }}
          />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <img
            src={img("/images/service-hair.jpg")}
            alt="Professional hair styling at DAVIN Beauty Salon Stadium Link Road"
            className="img-zoom"
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              display: 'block',
              filter: 'grayscale(100%)',
            }}
          />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <img
            src={img("/images/gallery-hair-color.jpg")}
            alt="Hair coloring services including balayage and highlights at DAVIN Kochi"
            className="img-zoom"
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              display: 'block',
              filter: 'grayscale(100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
