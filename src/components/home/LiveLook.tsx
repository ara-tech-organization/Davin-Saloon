import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { observationConfig, finalCtaConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function LiveLook() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelector('.live-look-frame'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!observationConfig.sectionLabel[language] && !observationConfig.videoPath) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="live-look"
      style={{
        background: '#000',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '80px 40px 40px', position: 'relative', zIndex: 10 }}>
        <h2
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '17.5px',
            fontWeight: 400,
            lineHeight: '20px',
            textTransform: 'uppercase',
            color: '#fff',
            margin: 0,
          }}
        >
          {observationConfig.sectionLabel[language]}
        </h2>
      </div>

      <div
        className="live-look-frame"
        style={{
          position: 'relative',
          width: '100%',
          height: '70vh',
          minHeight: '420px',
        }}
      >
        {observationConfig.videoPath && (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={observationConfig.videoPath} type="video/mp4" />
          </video>
        )}

        {observationConfig.statusText[language] && (
          <span
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              background: '#fff',
              padding: '8px 16px',
              borderRadius: '999px',
              zIndex: 5,
            }}
          >
            {observationConfig.statusText[language]}
          </span>
        )}

        <a
          href={finalCtaConfig.instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#fff',
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.5)',
            padding: '10px 20px',
            textDecoration: 'none',
            zIndex: 5,
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.55)';
          }}
        >
          {finalCtaConfig.instagramHandle}
        </a>
      </div>
    </section>
  );
}
