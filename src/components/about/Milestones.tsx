import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';
import { handleTiltMove, handleTiltLeave } from './tilt';

gsap.registerPlugin(ScrollTrigger);

export default function Milestones() {
  const { language } = useLanguage();
  const milestonesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!milestonesRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(milestonesRef.current!.querySelectorAll('.milestone-card')).forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );
      });

      const line = milestonesRef.current!.querySelector('.milestone-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.6,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={milestonesRef}
      className="scene"
      style={{
        background: '#000',
        color: '#fff',
        padding: '120px 40px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            fontWeight: 400,
            color: '#fff',
            textTransform: 'uppercase',
            margin: '0 0 72px 0',
            textWrap: 'balance',
          }}
        >
          {aboutConfig.milestonesTitle[language]}
        </h2>

        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          {/* Timeline spine */}
          <div
            className="milestone-line"
            style={{
              position: 'absolute',
              left: '7px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(255,255,255,0.25)',
              transformOrigin: 'top center',
            }}
          />

          {aboutConfig.milestones.map((m, i) => (
            <div key={m.year} style={{ position: 'relative', marginBottom: i === aboutConfig.milestones.length - 1 ? 0 : '56px' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '-48px',
                  top: '6px',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  background: '#fff',
                }}
              />
              <div
                className="milestone-card"
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
                style={{
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '28px 32px',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.25s ease-out, border-color 0.25s ease-out',
                  willChange: 'transform',
                  overflow: 'hidden',
                }}
              >
                {/* Oversized year, layered behind text for depth */}
                <span
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '-18px',
                    fontFamily: "'Geist Pixel', monospace",
                    fontSize: 'clamp(48px, 7vw, 90px)',
                    fontWeight: 400,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.12)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {m.year}
                </span>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 10px 0' }}>
                  {m.year} — {m.title[language]}
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', lineHeight: '24px', color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: '540px' }}>
                  {m.description[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
