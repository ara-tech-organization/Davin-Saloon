import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './premium.css';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook — fades + lifts children in with a gsap stagger */
/* ------------------------------------------------------------------ */
export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const targets = ref.current.hasAttribute('data-reveal-group')
      ? Array.from(ref.current.children)
      : [ref.current];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/* ------------------------------------------------------------------ */
/*  Full-bleed hero — always dark, matches the home/about page hero    */
/* ------------------------------------------------------------------ */
export function Hero({
  eyebrow,
  title,
  subline,
  image,
  imageAlt,
  ctaLabel = 'Book Now',
  ctaHref = 'tel:+918089069996',
}: {
  eyebrow: string;
  title: ReactNode;
  subline: string;
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
  glowSide?: 'left' | 'right';
}) {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' });
        gsap.to(imgRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
      }
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.3 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="p-dark" style={{ position: 'relative', height: '92vh', minHeight: 620, overflow: 'hidden' }}>
      <div ref={imgRef} style={{ position: 'absolute', inset: '-8% 0', opacity: 0 }}>
        <img
          src={image}
          alt={imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%) contrast(1.1)' }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)',
        }}
      />
      <CornerFrame />
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 40px 90px',
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ opacity: 0, marginBottom: 20 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          className="p-serif"
          style={{
            opacity: 0,
            fontSize: 'clamp(30px, 4.6vw, 66px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
            margin: '0 0 24px 0',
            maxWidth: 920,
            textWrap: 'balance',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            opacity: 0,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            letterSpacing: '0.03em',
            color: 'rgba(255,255,255,0.7)',
            margin: '0 0 32px 0',
            maxWidth: 720,
            lineHeight: '22px',
          }}
        >
          {subline}
        </p>
        <div style={{ opacity: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
          <GoldButton href={ctaHref}>{ctaLabel}</GoldButton>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            📞 +91 80890 69996 &nbsp;|&nbsp; 📍 Stadium Link Road, Kaloor, Kochi
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Eyebrow label — reads ancestor tone via CSS vars                   */
/* ------------------------------------------------------------------ */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="p-eyebrow">{children}</span>;
}

/* ------------------------------------------------------------------ */
/*  Solid / outline buttons — auto-invert with section tone            */
/* ------------------------------------------------------------------ */
export function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className="p-btn p-btn-gold"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className="p-btn p-btn-ghost"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  3D tilt card — real perspective/rotate transform, tone-aware fill  */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  style,
  float,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  float?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 14;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.015)`;
  }

  function handleLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  }

  return (
    <div className={`p-tilt-wrap${float ? ' p-float' : ''}`}>
      <div ref={cardRef} className="p-card" style={style} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div className="p-card-inner">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3D flip card — click/hover rotates 180° to reveal a back face       */
/* ------------------------------------------------------------------ */
export function FlipCard({ front, back }: { front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="p-flip-wrap"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
    >
      <div className={`p-flip-card${flipped ? ' is-flipped' : ''}`}>
        <div className="p-flip-face p-flip-front">{front}</div>
        <div className="p-flip-face p-flip-back">{back}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner bracket frame — decorative premium framing (dark hero only) */
/* ------------------------------------------------------------------ */
export function CornerFrame() {
  return (
    <>
      <div className="p-corner" style={{ top: 28, left: 28, borderLeft: '1px solid', borderTop: '1px solid' }} />
      <div className="p-corner" style={{ bottom: 28, right: 28, borderRight: '1px solid', borderBottom: '1px solid' }} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison table — tone-aware via CSS vars                         */
/* ------------------------------------------------------------------ */
export function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <>
      {/* Desktop/tablet: real table. Hidden below the p-table-cards breakpoint
          so mobile never needs horizontal scroll to read every column. */}
      <div className="p-table-wrap" style={{ overflowX: 'auto' }}>
        <table className="p-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: same data as stacked label/value cards, no scrolling needed. */}
      <div className="p-table-cards">
        {rows.map((row, i) => (
          <div className="p-table-card" key={i}>
            <div className="p-table-card-title">{row[0]}</div>
            {row.slice(1).map((cell, j) => (
              <div className="p-table-card-row" key={j}>
                <span className="p-table-card-label">{headers[j + 1]}</span>
                <span className="p-table-card-value">{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ accordion — tone-aware via CSS vars                            */
/* ------------------------------------------------------------------ */
function FaqRow({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    if (open && innerRef.current) {
      setMaxHeight(`${innerRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [open]);

  return (
    <div className="p-faq-item">
      <button className="p-faq-question" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{q}</span>
        <span className="p-faq-icon" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
      </button>
      <div className="p-faq-answer" style={{ maxHeight, opacity: open ? 1 : 0 }}>
        <div className="p-faq-answer-inner" ref={innerRef}>
          {a}
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <FaqRow key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Centered intro — heading + paragraphs + CTA, used under the hero   */
/* ------------------------------------------------------------------ */
export function CenteredIntro({
  eyebrow,
  title,
  paragraphs,
  ctaLabel = 'Book Now',
  ctaHref = 'tel:+918089069996',
}: {
  eyebrow: string;
  title: ReactNode;
  paragraphs: string[];
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-reveal-group style={{ width: '100%', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: 18 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 400, margin: '0 0 32px 0', textWrap: 'balance' }}>
        {title}
      </h2>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ fontSize: 14.5, lineHeight: '28px', color: 'var(--fg-soft)', margin: '0 0 20px 0' }}>
          {p}
        </p>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginTop: 12 }}>
        <GoldButton href={ctaHref}>{ctaLabel}</GoldButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Numbered section heading — large ghost numeral + display title     */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  numeral,
  title,
  center,
  compact,
  showNumber = true,
}: {
  numeral: string;
  title: ReactNode;
  center?: boolean;
  compact?: boolean;
  showNumber?: boolean;
}) {
  return (
    <div style={{ position: 'relative', marginBottom: compact ? 16 : 28, textAlign: center ? 'center' : 'left' }}>
      {showNumber && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: compact ? -22 : -56,
            left: center ? '50%' : -4,
            transform: center ? 'translateX(-50%)' : undefined,
            fontFamily: "'Geist Pixel', monospace",
            fontSize: compact ? 64 : 140,
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px var(--line)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {numeral}
        </span>
      )}
      <h3
        className="p-serif"
        style={{
          position: 'relative',
          fontSize: compact ? 'clamp(18px, 2.2vw, 26px)' : 'clamp(22px, 2.8vw, 34px)',
          fontWeight: 400,
          lineHeight: 1.15,
          margin: center ? '0 auto' : 0,
          textWrap: 'balance',
          maxWidth: 760,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section band — thin rules either side of a centered label          */
/* ------------------------------------------------------------------ */
export function SectionBand({ children }: { children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 40px 80px' }}>
      <span style={{ height: 1, flex: 1, maxWidth: 140, background: 'var(--line)' }} />
      <h2
        className="p-serif"
        style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', fontWeight: 400, margin: 0, textAlign: 'center', whiteSpace: 'nowrap' }}
      >
        {children}
      </h2>
      <span style={{ height: 1, flex: 1, maxWidth: 140, background: 'var(--line)' }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature grid — 3D tilt cards for a list of title/description items */
/* ------------------------------------------------------------------ */
export function FeatureGrid({ items, columns = 3 }: { items: { title: string; description: string }[]; columns?: number }) {
  return (
    <div
      className="p-grid-3"
      style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 22, marginTop: 36, alignItems: 'stretch' }}
    >
      {items.map((item) => (
        <TiltCard key={item.title}>
          <div style={{ height: '100%', boxSizing: 'border-box', padding: '26px 24px', display: 'flex', flexDirection: 'column' }}>
            <h4 className="p-serif" style={{ fontSize: 16, fontWeight: 400, margin: '0 0 10px 0' }}>
              {item.title}
            </h4>
            <p style={{ fontSize: 12.5, lineHeight: '21px', color: 'var(--fg-soft)', margin: 0 }}>{item.description}</p>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scattered, independently-tilted tag cluster — the same treatment   */
/*  About's Story.tsx uses for its stat tiles (rotate + 3D tilt).      */
/* ------------------------------------------------------------------ */
const TILT_ANGLES = [-4, 3, -3, 4, -2, 2] as const;

export function handleScatterTiltMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const base = Number(card.dataset.rotate ?? 0);
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(900px) rotate(${base}deg) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px) scale(1.05)`;
}

export function handleScatterTiltLeave(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const base = Number(card.dataset.rotate ?? 0);
  card.style.transform = `perspective(900px) rotate(${base}deg) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)`;
}

export function TiltTags({ label, tags, center }: { label?: string; tags: string[]; center?: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div>
      {label && (
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--fg-mute)',
            margin: '0 0 18px 0',
            textAlign: center ? 'center' : undefined,
          }}
        >
          {label}
        </p>
      )}
      <div
        ref={ref}
        data-reveal-group
        style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 16px', justifyContent: center ? 'center' : undefined }}
      >
        {tags.map((tag) => {
          return (
            <div
              key={tag}
              data-rotate={0}
              onMouseMove={handleScatterTiltMove}
              onMouseLeave={handleScatterTiltLeave}
              style={{
                transform: 'rotate(0deg)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transition: 'transform 0.25s ease-out, border-color 0.25s ease-out',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                padding: '10px 16px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.02em',
                color: 'var(--fg)',
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tag chips                                                          */
/* ------------------------------------------------------------------ */
export function TagChips({ label, tags }: { label?: string; tags: string[] }) {
  return (
    <div>
      {label && (
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--fg-mute)',
            margin: '0 0 16px 0',
          }}
        >
          {label}
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: 'inline-block',
              border: '1px solid var(--line-strong)',
              color: 'var(--fg)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '9px 16px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scattered tilt stat cards — same collage treatment as About's      */
/*  Story.tsx "4.8 Stars · 750+ Reviews" stat tiles.                   */
/* ------------------------------------------------------------------ */
export function TiltStatCards({ items }: { items: { title: string; body: string }[] }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-reveal-group style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px 32px' }}>
      {items.map((item, i) => {
        const rotate = TILT_ANGLES[i % TILT_ANGLES.length];
        return (
          <div
            key={item.title}
            data-rotate={rotate}
            onMouseMove={handleScatterTiltMove}
            onMouseLeave={handleScatterTiltLeave}
            style={{
              transform: `rotate(${rotate}deg)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              transition: 'transform 0.25s ease-out, border-color 0.25s ease-out',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--card-shadow)',
              padding: '30px 28px',
              minWidth: 220,
              maxWidth: 260,
              textAlign: 'left',
            }}
          >
            <h3 className="p-serif" style={{ fontSize: 17, fontWeight: 400, margin: '0 0 12px 0' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: 12.5, lineHeight: '21px', color: 'var(--fg-soft)', margin: 0 }}>{item.body}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Horizontal scroll-story — pins the section and drags a wide track  */
/*  sideways as the user scrolls vertically. Falls back to a plain     */
/*  stacked column below 861px (no scroll-jacking on touch).           */
/* ------------------------------------------------------------------ */
export function ScrollStory({
  children,
  eyebrow,
  title,
  tone = 'dark',
}: {
  children: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  tone?: 'light' | 'dark';
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const panels = Array.from(track.children) as HTMLElement[];
    const mm = gsap.matchMedia();

    mm.add('(min-width: 861px)', () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      const panelTimelines = panels.map((panel, i) => {
        // The first panel sits at the left edge from the moment the section
        // pins — it never scrolls in horizontally, so a containerAnimation
        // trigger tied to its "left" position never fires. Give it a normal
        // reveal tied to the section entering the viewport instead.
        if (i === 0) {
          gsap.set(panel, { transformPerspective: 1200, transformOrigin: '50% 50%' });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
          tl.fromTo(
            panel,
            { opacity: 0.3, scale: 0.88, rotateX: 10, z: -140 },
            { opacity: 1, scale: 1, rotateX: 0, z: 0, duration: 1, ease: 'power2.out' },
            0
          );
          const group = panel.querySelector('[data-reveal-group]');
          if (group) {
            const items = Array.from(group.children);
            tl.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 }, 0.2);
          }
          return tl;
        }

        const fromSide = i % 2 === 0 ? 26 : -26;
        gsap.set(panel, { transformPerspective: 1200, transformOrigin: '50% 50%' });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left 85%',
            end: 'left 30%',
            scrub: true,
          },
        });
        tl.fromTo(
          panel,
          { opacity: 0.25, scale: 0.86, rotateY: fromSide, rotateX: 6, z: -160 },
          { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, ease: 'power1.out' },
          0
        );
        const group = panel.querySelector('[data-reveal-group]');
        if (group) {
          const items = Array.from(group.children);
          tl.fromTo(items, { opacity: 0, y: 26 }, { opacity: 1, y: 0, ease: 'power1.out', stagger: 0.12 }, 0.25);
        }
        return tl;
      });

      return () => {
        panelTimelines.forEach((tl) => tl.scrollTrigger?.kill());
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add('(max-width: 860px)', () => {
      const ctx = gsap.context(() => {
        panels.forEach((panel) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          });
          tl.fromTo(panel, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0);
          const group = panel.querySelector('[data-reveal-group]');
          if (group) {
            const items = Array.from(group.children);
            tl.fromTo(items, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 }, 0.2);
          }
        });
      });
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapRef} className={`p-story p-story-${tone}`}>
      {(eyebrow || title) && (
        <div className="p-story-head">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="p-serif p-story-title" style={{ margin: '16px 0 0 0' }}>
              {title}
            </h2>
          )}
        </div>
      )}
      <div className="p-story-track-wrap">
        <div ref={trackRef} className="p-story-track">
          {children}
        </div>
      </div>
      <div className="p-story-progress">
        <div ref={progressRef} className="p-story-progress-bar" />
      </div>
      <span className="p-story-hint">Scroll →</span>
    </section>
  );
}

export function StoryPanel({
  children,
  width = '92vw',
  maxWidth = 1200,
}: {
  children: ReactNode;
  width?: string;
  maxWidth?: number;
}) {
  return (
    <div className="p-story-panel" style={{ width }}>
      <div className="p-story-panel-inner" style={{ width: '100%', maxWidth, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Swipe carousel — user-controlled horizontal scroller (drag/swipe/  */
/*  arrow buttons). No scroll-jacking, no pinning, no fixed viewport   */
/*  height — each slide is free to be as tall as its content needs,   */
/*  so nothing can overflow or clip.                                   */
/* ------------------------------------------------------------------ */
export function SwipeCarousel({
  children,
  eyebrow,
  title,
  tone = 'dark',
}: {
  children: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  tone?: 'light' | 'dark';
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByDir(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[data-carousel-slide]');
    const amount = slide ? slide.getBoundingClientRect().width + 28 : track.clientWidth * 0.85;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  return (
    <section className={`p-carousel p-carousel-${tone}`}>
      {(eyebrow || title) && (
        <div className="p-carousel-head">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="p-serif p-carousel-title" style={{ margin: '16px 0 0 0' }}>
              {title}
            </h2>
          )}
        </div>
      )}
      <div ref={trackRef} className="p-carousel-track">
        {children}
      </div>
      <div className="p-carousel-controls">
        <button type="button" aria-label="Previous" className="p-carousel-btn" onClick={() => scrollByDir(-1)}>
          ←
        </button>
        <span className="p-carousel-hint">Drag or swipe to explore</span>
        <button type="button" aria-label="Next" className="p-carousel-btn" onClick={() => scrollByDir(1)}>
          →
        </button>
      </div>
    </section>
  );
}

export function CarouselSlide({
  children,
  width = '86vw',
  maxWidth = 1000,
}: {
  children: ReactNode;
  width?: string;
  maxWidth?: number;
}) {
  return (
    <div data-carousel-slide className="p-carousel-slide" style={{ width, maxWidth }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab switcher — click a category, content below swaps instantly.    */
/*  No scroll/drag interaction; each tab's content is free-height so   */
/*  it can never overflow or clip.                                     */
/* ------------------------------------------------------------------ */
export function TabSwitcher({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="p-tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={active === tab.key}
          className={`p-tab-btn${active === tab.key ? ' is-active' : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function TabPanel({ children, maxWidth = 1180 }: { children: ReactNode; maxWidth?: number }) {
  return (
    <div className="p-tab-panel">
      <div style={{ width: '100%', maxWidth, margin: '0 auto' }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Split media block — offset framed image + heading/copy             */
/* ------------------------------------------------------------------ */
export function handleMediaTiltMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(1100px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.015)`;
  const img = card.querySelector('img');
  if (img) (img as HTMLElement).style.transform = 'scale(1.06)';
}

export function handleMediaTiltLeave(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg) scale(1)';
  const img = card.querySelector('img');
  if (img) (img as HTMLElement).style.transform = 'scale(1)';
}

/* ------------------------------------------------------------------ */
/*  Tilt frame — standalone 3D-tilt framed photo, reusable outside     */
/*  SplitMedia for one-off panels that need a single tilting image     */
/* ------------------------------------------------------------------ */
export function TiltFrame({
  image,
  imageAlt,
  badge,
  aspectRatio = '4 / 5',
  float,
}: {
  image: string;
  imageAlt: string;
  badge?: string;
  aspectRatio?: string;
  float?: boolean;
}) {
  return (
    <div className={float ? 'p-float' : undefined} style={{ position: 'relative' }}>
      <div
        aria-hidden
        style={{ position: 'absolute', top: 14, left: 14, right: -14, bottom: -14, border: '1px solid var(--line-strong)', zIndex: 0 }}
      />
      <div
        onMouseMove={handleMediaTiltMove}
        onMouseLeave={handleMediaTiltLeave}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio,
          overflow: 'hidden',
          border: '1px solid var(--line-strong)',
          zIndex: 1,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'transform 0.2s ease-out',
        }}
      >
        <img
          src={image}
          alt={imageAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)', transition: 'transform 0.5s ease' }}
        />
      </div>
      {badge && (
        <span
          style={{
            display: 'inline-block',
            marginTop: 16,
            transform: 'rotate(-2deg)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--btn-fg)',
            background: 'var(--btn-bg)',
            padding: '6px 12px',
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

export function SplitMedia({
  image,
  imageAlt,
  badge,
  children,
  reverse,
}: {
  image: string;
  imageAlt: string;
  badge?: string;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className="p-split"
      style={{
        display: 'grid',
        gridTemplateColumns: reverse ? 'minmax(320px, 1fr) minmax(280px, 40%)' : 'minmax(280px, 40%) minmax(320px, 1fr)',
        gap: 72,
        alignItems: 'center',
      }}
    >
      <div className="p-tilt-wrap" style={{ position: 'relative', order: reverse ? 2 : 0 }}>
        {/* Offset double-frame behind the print — same layered-depth treatment
            as About's Story.tsx photo column */}
        <div
          aria-hidden
          style={{ position: 'absolute', top: 18, left: 18, right: -18, bottom: -18, border: '1px solid var(--line-strong)', zIndex: 0 }}
        />
        <div
          onMouseMove={handleMediaTiltMove}
          onMouseLeave={handleMediaTiltLeave}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 5',
            overflow: 'hidden',
            border: '1px solid var(--line-strong)',
            zIndex: 1,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)', transition: 'transform 0.5s ease' }}
          />
        </div>
        {badge && (
          <span
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              zIndex: 2,
              transform: 'rotate(-2deg)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--btn-fg)',
              background: 'var(--btn-bg)',
              padding: '6px 12px',
              pointerEvents: 'none',
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div style={{ order: reverse ? 0 : 2 }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pull quote                                                         */
/* ------------------------------------------------------------------ */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p
      className="p-serif"
      style={{
        fontSize: 'clamp(16px, 1.5vw, 20px)',
        fontWeight: 400,
        lineHeight: 1.5,
        margin: '48px 0 0 0',
        paddingLeft: 24,
        borderLeft: '3px solid var(--line-strong)',
        textWrap: 'balance',
        maxWidth: 620,
        textTransform: 'none',
      }}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing CTA — always dark, matches home page's FinalCTA exactly    */
/* ------------------------------------------------------------------ */
export function ClosingCta({
  title,
  body,
  tagline,
  primaryLabel = 'Book Now',
  secondaryLabel = 'Call Us',
  phoneHref = 'tel:+918089069996',
  secondaryHref,
  crossLinks,
}: {
  title: ReactNode;
  body: string;
  tagline?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  phoneHref?: string;
  secondaryHref?: string;
  crossLinks: { label: string; href: string }[];
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-dark" style={{ padding: '120px 40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 className="p-serif" style={{ fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 400, lineHeight: 1.05, margin: '0 0 24px 0', textWrap: 'balance' }}>
          {title}
        </h2>
        <p style={{ fontSize: 14, lineHeight: '26px', color: 'rgba(255,255,255,0.65)', margin: '0 0 8px 0' }}>{body}</p>
        {tagline && (
          <p className="p-serif" style={{ fontSize: 15, margin: '18px 0 40px 0', color: 'rgba(255,255,255,0.8)' }}>
            {tagline}
          </p>
        )}
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: 'rgba(255,255,255,0.75)', lineHeight: '24px', margin: `${tagline ? 0 : 32}px 0 40px` }}>
          📍 1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu, Kaloor, Kochi – 682025
          <br />
          📞 +91 80890 69996 &nbsp;|&nbsp; 🕐 Open Daily: 9 AM – 9 PM
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          <GoldButton href={phoneHref}>{primaryLabel}</GoldButton>
          <GhostButton href={secondaryHref ?? phoneHref}>{secondaryLabel}</GhostButton>
        </div>
        <CrossLinks links={crossLinks} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Cross-link row (to other service pages)                            */
/* ------------------------------------------------------------------ */
export function CrossLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px', marginTop: 56 }}>
      {links.map((l) => (
        <Link
          key={l.href}
          to={l.href}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            textDecoration: 'none',
            borderBottom: '1px solid transparent',
            paddingBottom: 3,
            transition: 'color 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
