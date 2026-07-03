import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const STAT_TILT = [-4, 3, -3, 4] as const;

function handleStatTiltMove(e: React.MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const base = Number(card.dataset.rotate ?? 0);
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(900px) rotate(${base}deg) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px) scale(1.03)`;
}

function handleStatTiltLeave(e: React.MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const base = Number(card.dataset.rotate ?? 0);
  card.style.transform = `perspective(900px) rotate(${base}deg) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)`;
}

export default function Story() {
  const { language } = useLanguage();
  const storyRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: storyRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
          }
        );
      }

      if (textRef.current) {
        gsap.utils.toArray<HTMLElement>(textRef.current.querySelectorAll('.reveal-up')).forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: storyRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
            }
          );
        });
      }

      if (statsListRef.current) {
        gsap.utils.toArray<HTMLElement>(statsListRef.current.children).forEach((el, i) => {
          const rotate = STAT_TILT[i % STAT_TILT.length];
          gsap.fromTo(
            el,
            { opacity: 0, y: 30, rotate: rotate * 3 },
            {
              opacity: 1,
              y: 0,
              rotate,
              duration: 0.9,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: { trigger: statsListRef.current, start: 'top 82%', toggleActions: 'play none none reverse' },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={storyRef}
      style={{
        background: '#fff',
        padding: '120px 40px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 44%) minmax(320px, 1fr)',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Photo column — a double-exposed frame: an offset black
              rectangle sits behind the print for layered depth, plus a
              rotated "Since 2020" tag stamped over the corner */}
          <div
            ref={imageRef}
            style={{ position: 'relative', opacity: 0 }}
          >
            <div
              style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                right: '-18px',
                bottom: '-18px',
                border: '1px solid #000',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                background: '#000',
                border: '1px solid #000',
                zIndex: 1,
              }}
            >
              <img
                src={aboutConfig.hero.image}
                alt={aboutConfig.hero.imageAlt[language]}
                className="img-zoom"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(100%)',
                }}
              />
            </div>
            <span
              style={{
                position: 'absolute',
                bottom: '-14px',
                left: '28px',
                zIndex: 2,
                transform: 'rotate(-4deg)',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#fff',
                background: '#000',
                padding: '6px 12px',
              }}
            >
              Since 2020 · Kaloor
            </span>
          </div>

          {/* Text column — oversized ghost section number behind the
              heading, and the closing line pulled out as a bold statement */}
          <div ref={textRef} style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                top: '-64px',
                left: '-8px',
                fontFamily: "'Geist Pixel', monospace",
                fontSize: '160px',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(0,0,0,0.08)',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0,
              }}
            >
              01
            </span>

            <h2
              className="reveal-up"
              style={{
                position: 'relative',
                fontFamily: "'Geist Pixel', monospace",
                fontSize: 'clamp(26px, 3.2vw, 46px)',
                fontWeight: 400,
                lineHeight: 1.08,
                color: '#000',
                textTransform: 'uppercase',
                margin: '0 0 32px 0',
                textWrap: 'balance',
              }}
            >
              {aboutConfig.story.h2[language]}
            </h2>

            <div className="reveal-up" style={{ position: 'relative', maxWidth: '620px' }}>
              {aboutConfig.story.paragraphs[language].map((p, i) => {
                const isLast = i === aboutConfig.story.paragraphs[language].length - 1;
                return isLast ? (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Geist Pixel', monospace",
                      fontSize: 'clamp(17px, 1.6vw, 22px)',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: '#000',
                      margin: '32px 0 0 0',
                      paddingLeft: '24px',
                      borderLeft: '3px solid #000',
                      textWrap: 'balance',
                    }}
                  >
                    {p}
                  </p>
                ) : (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: '28px',
                      margin: i === 0 ? 0 : '20px 0 0 0',
                    }}
                  >
                    {p}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scattered, independently tilted stat tags — echoes the photo
            collage's gallery-tag treatment instead of a flat box grid */}
        <div
          ref={statsListRef}
          style={{
            marginTop: '96px',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '28px 40px',
          }}
        >
          {aboutConfig.story.stats.map((stat, i) => (
            <div
              key={i}
              data-rotate={STAT_TILT[i % STAT_TILT.length]}
              onMouseMove={handleStatTiltMove}
              onMouseLeave={handleStatTiltLeave}
              style={{
                background: '#fff',
                border: '1px solid #000',
                padding: '26px 30px',
                textAlign: 'center',
                minWidth: '150px',
                boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.25s ease-out',
                willChange: 'transform',
              }}
            >
              <div
                style={{
                  fontFamily: "'Geist Pixel', monospace",
                  fontSize: 'clamp(24px, 2.6vw, 36px)',
                  fontWeight: 400,
                  color: '#000',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  marginTop: '10px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.55)',
                }}
              >
                {stat.label[language]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
