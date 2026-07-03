import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
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
}: {
  children: ReactNode;
  style?: React.CSSProperties;
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
    <div className="p-tilt-wrap">
      <div ref={cardRef} className="p-card" style={style} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div className="p-card-inner">{children}</div>
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
    <div style={{ overflowX: 'auto' }}>
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
export function SectionHeading({ numeral, title, center }: { numeral: string; title: ReactNode; center?: boolean }) {
  return (
    <div style={{ position: 'relative', marginBottom: 28, textAlign: center ? 'center' : 'left' }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: -56,
          left: center ? '50%' : -4,
          transform: center ? 'translateX(-50%)' : undefined,
          fontFamily: "'Geist Pixel', monospace",
          fontSize: 140,
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
      <h3
        className="p-serif"
        style={{
          position: 'relative',
          fontSize: 'clamp(22px, 2.8vw, 34px)',
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
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 40px 80px' }}>
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

function handleScatterTiltMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const base = Number(card.dataset.rotate ?? 0);
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(900px) rotate(${base}deg) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px) scale(1.05)`;
}

function handleScatterTiltLeave(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const base = Number(card.dataset.rotate ?? 0);
  card.style.transform = `perspective(900px) rotate(${base}deg) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)`;
}

export function TiltTags({ label, tags }: { label?: string; tags: string[] }) {
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
          }}
        >
          {label}
        </p>
      )}
      <div ref={ref} data-reveal-group style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 16px' }}>
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
/*  Split media block — offset framed image + heading/copy             */
/* ------------------------------------------------------------------ */
function handleMediaTiltMove(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(1100px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.015)`;
  const img = card.querySelector('img');
  if (img) (img as HTMLElement).style.transform = 'scale(1.06)';
}

function handleMediaTiltLeave(e: MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg) scale(1)';
  const img = card.querySelector('img');
  if (img) (img as HTMLElement).style.transform = 'scale(1)';
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
  crossLinks,
}: {
  title: ReactNode;
  body: string;
  tagline?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  phoneHref?: string;
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
          📞 +91 80890 69996 &nbsp;|&nbsp; 🕐 Open Daily: 9:00 AM – 9:00 PM
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          <GoldButton href={phoneHref}>{primaryLabel}</GoldButton>
          <GhostButton href={phoneHref}>{secondaryLabel}</GhostButton>
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
        <a
          key={l.href}
          href={l.href}
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
        </a>
      ))}
    </div>
  );
}
