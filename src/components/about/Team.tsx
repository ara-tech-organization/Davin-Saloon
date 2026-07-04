import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// A fanned "hand of photographs" — three prints pivoting from a shared
// base point at different angles, instead of a stacked/scattered grid.
const COLLAGE_LAYERS = [
  { top: '14%', left: '0%', width: '46%', height: '60%', z: 1, depth: 10, rotate: -11, tag: '01' },
  { top: '0%', left: '27%', width: '48%', height: '68%', z: 3, depth: 20, rotate: 0, tag: '02' },
  { top: '14%', left: '54%', width: '46%', height: '60%', z: 2, depth: 14, rotate: 11, tag: '03' },
] as const;

export default function Team() {
  const { language } = useLanguage();
  const teamRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const photoCount = aboutConfig.team.images.length;

  // Every few seconds, each photo does a full 3D flip (rotateY through its
  // edge, swapping to the next photo in the set at the midpoint) instead of
  // a flat crossfade — a genuine 3D rotation, not just an opacity swap.
  useEffect(() => {
    if (photoCount < 2) return;
    let tick = 0;
    const interval = setInterval(() => {
      tick += 1;
      imgRefs.current.forEach((el, slotIndex) => {
        if (!el) return;
        const nextImg = aboutConfig.team.images[(slotIndex + tick) % photoCount];

        gsap.timeline({ delay: slotIndex * 0.15 })
          .to(el, { rotateY: 90, duration: 0.4, ease: 'power1.in' })
          .call(() => {
            el.src = nextImg.src;
            el.alt = nextImg.alt[language];
          })
          .fromTo(el, { rotateY: -90 }, { rotateY: 0, duration: 0.4, ease: 'power1.out' });
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [photoCount, language]);

  const handleCollageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = collageRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    pointerRef.current = { x, y };

    container.style.setProperty('--collage-rx', `${-y * 6}deg`);
    container.style.setProperty('--collage-ry', `${x * 6}deg`);
  };

  const handleCollageLeave = () => {
    const container = collageRef.current;
    if (!container) return;
    pointerRef.current = { x: 0, y: 0 };
    container.style.setProperty('--collage-rx', '0deg');
    container.style.setProperty('--collage-ry', '0deg');
  };

  useEffect(() => {
    if (!teamRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(teamRef.current!.querySelectorAll('.team-img')).forEach((el, i) => {
        const baseRotate = Number(el.dataset.rotate ?? 0);
        const depth = Number(el.dataset.depth ?? 0);

        gsap.fromTo(
          el,
          { opacity: 0, y: 40, rotate: baseRotate + (i % 2 === 0 ? -6 : 6) },
          {
            opacity: 1,
            y: 0,
            rotate: baseRotate,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: teamRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
            onComplete: () => {
              // Gentle, perpetual auto-rotation once the entrance settles —
              // each photo drifts a few degrees off its resting angle and
              // back, on its own, at a slightly different pace per photo.
              const swing = { r: baseRotate };
              gsap.to(swing, {
                r: baseRotate + (i % 2 === 0 ? 6 : -6),
                duration: 3.2 + i * 0.6,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                onUpdate: () => {
                  const { x, y } = pointerRef.current;
                  el.style.transform = `translate3d(${x * depth}px, ${y * depth}px, ${depth}px) rotate(${swing.r}deg)`;
                },
              });
            },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(teamRef.current!.querySelectorAll('.reveal-up')).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [language]);

  return (
    <section
      ref={teamRef}
      style={{
        background: '#fff',
        padding: '120px 40px 140px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="team-grid"
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 46%)',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        <div>
          <h3
            className="reveal-up"
            style={{
              fontFamily: "'Geist Pixel', monospace",
              fontSize: 'clamp(24px, 2.8vw, 38px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#000',
              textTransform: 'uppercase',
              margin: '0 0 28px 0',
              textWrap: 'balance',
            }}
          >
            {aboutConfig.team.h3[language]}
          </h3>
          {aboutConfig.team.paragraphs[language].map((p, i) => (
            <p
              key={i}
              className="reveal-up"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '14px',
                lineHeight: '26px',
                color: '#000',
                margin: i === 0 ? 0 : '18px 0 0 0',
                maxWidth: '520px',
              }}
            >
              {p}
            </p>
          ))}

          <a
            href="tel:+918089069996"
            className="reveal-up"
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
            onMouseEnter={(e) => { (e.target as HTMLElement).style.letterSpacing = '0.18em'; (e.target as HTMLElement).style.opacity = '0.6'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.letterSpacing = '0.12em'; (e.target as HTMLElement).style.opacity = '1'; }}
          >
            {language === 'ml' ? 'നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക' : 'Book Your Appointment'}
          </a>
        </div>

        {/* 3D interactive photo collage — scattered, independently rotated
            mat-framed prints with numbered gallery tags for an editorial,
            curated-moodboard feel rather than a flat overlapping stack */}
        <div
          ref={collageRef}
          className="scene"
          onMouseMove={handleCollageMove}
          onMouseLeave={handleCollageLeave}
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '92%',
            margin: '20px 0',
            transformStyle: 'preserve-3d',
            transform: 'perspective(1400px) rotateX(var(--collage-rx, 0deg)) rotateY(var(--collage-ry, 0deg))',
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* Corner brackets framing the whole collage — echoes the hero treatment */}
          <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '32px', height: '32px', borderLeft: '1px solid rgba(0,0,0,0.25)', borderTop: '1px solid rgba(0,0,0,0.25)', zIndex: 5 }} />
          <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '32px', height: '32px', borderRight: '1px solid rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(0,0,0,0.25)', zIndex: 5 }} />

          {COLLAGE_LAYERS.map((pos, i) => {
            const img = aboutConfig.team.images[i % photoCount];
            const isFront = pos.z === 3;
            const isAnchor = isFront;
            return (
              <div
                key={`slot-${i}`}
                className="team-img"
                data-depth={pos.depth}
                data-rotate={pos.rotate}
                style={{
                  position: 'absolute',
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  height: pos.height,
                  zIndex: pos.z,
                  opacity: 0,
                  transform: `rotate(${pos.rotate}deg)`,
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* Anchor photo (01) gets a distinct treatment: an offset
                    double-frame behind it, pinned "tape" corners, and a
                    tab-style index label — sets it apart from 02 / 03 */}
                {isAnchor && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      right: '-14px',
                      bottom: '-14px',
                      border: '1px solid rgba(0,0,0,0.35)',
                      zIndex: -1,
                    }}
                  />
                )}

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: '#fff',
                    padding: '8px',
                    boxSizing: 'border-box',
                    border: isAnchor ? '2px solid #000' : '1px solid #000',
                    boxShadow: `0 ${10 + pos.z * 8}px ${24 + pos.z * 16}px rgba(0,0,0,${0.14 + pos.z * 0.03}), 0 2px 6px rgba(0,0,0,0.1)`,
                  }}
                >
                  {isAnchor ? (
                    <span
                      style={{
                        position: 'absolute',
                        top: '18px',
                        left: '-1px',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.14em',
                        color: '#fff',
                        background: '#000',
                        padding: '8px 5px',
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        zIndex: 1,
                      }}
                    >
                      {pos.tag}
                    </span>
                  ) : (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-11px',
                        left: '16px',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.14em',
                        color: '#fff',
                        background: '#000',
                        padding: '3px 8px',
                        zIndex: 1,
                      }}
                    >
                      {pos.tag}
                    </span>
                  )}

                  {/* Pinned tape accents — only on the anchor photo */}
                  {isAnchor && (
                    <>
                      <span
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '18px',
                          width: '44px',
                          height: '16px',
                          background: 'rgba(0,0,0,0.55)',
                          transform: 'rotate(3deg)',
                          zIndex: 2,
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-10px',
                          left: '30px',
                          width: '44px',
                          height: '16px',
                          background: 'rgba(0,0,0,0.55)',
                          transform: 'rotate(-4deg)',
                          zIndex: 2,
                        }}
                      />
                    </>
                  )}

                  <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000', perspective: '900px' }}>
                    <img
                      ref={(el) => { imgRefs.current[i] = el; }}
                      src={img.src}
                      alt={img.alt[language]}
                      className="img-zoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        filter: 'grayscale(100%)',
                        backfaceVisibility: 'hidden',
                        transformStyle: 'preserve-3d',
                      }}
                    />
                    {isFront && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '10px',
                          bottom: '10px',
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '9px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: '#000',
                          background: '#fff',
                          padding: '4px 8px',
                        }}
                      >
                        {language === 'ml' ? 'സ്ഥാപിതം 2020 · കാലൂർ' : 'Est. 2020 · Kaloor'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
