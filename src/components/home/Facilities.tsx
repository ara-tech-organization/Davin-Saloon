import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { facilitiesConfig, type FacilityItem } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function AnalogClock({ utcOffset = 0 }: { utcOffset?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 48;
    canvas.width = size * 2;
    canvas.height = size * 2;

    const draw = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const localTime = new Date(utc + utcOffset * 3600000);

      ctx.clearRect(0, 0, size * 2, size * 2);
      ctx.save();
      ctx.translate(size, size);
      ctx.scale(2, 2);

      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        const inner = 18;
        const outer = 21;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      const hr = localTime.getHours() % 12;
      const hrAngle = ((hr + localTime.getMinutes() / 60) * Math.PI) / 6 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(hrAngle) * 11, Math.sin(hrAngle) * 11);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const minAngle = ((localTime.getMinutes() + localTime.getSeconds() / 60) * Math.PI) / 30 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(minAngle) * 15, Math.sin(minAngle) * 15);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();

      const secAngle = (localTime.getSeconds() * Math.PI) / 30 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(secAngle) * 17, Math.sin(secAngle) * 17);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [utcOffset]);

  return <canvas ref={canvasRef} style={{ width: '48px', height: '48px', marginBottom: '16px' }} />;
}

function FacilityColumn({ facility, isLast, lang }: { facility: FacilityItem; isLast: boolean; lang: Language }) {
  const [imgHover, setImgHover] = useState(false);

  return (
    <div
      style={{
        borderRight: isLast ? 'none' : '1px solid #000',
        padding: '40px 24px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <Link
        to={`/services/${facility.slug}`}
        style={{
          textDecoration: 'none',
          color: '#000',
        }}
      >
        <h3
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '25px',
            textTransform: 'uppercase',
            margin: '0 0 4px 0',
            color: '#000',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.6';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
        >
          {facility.name[lang]}
          {facility.code ? `, ${facility.code}` : ''}
        </h3>
      </Link>

      <div style={{ marginTop: '20px' }}>
        <AnalogClock utcOffset={facility.utcOffset} />
      </div>

      {facility.address[lang] && (
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '20px',
            textTransform: 'uppercase',
            color: '#000',
            margin: '0 0 12px 0',
          }}
        >
          {facility.address[lang]}
        </p>
      )}

      {facility.status[lang] && (
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '20px',
            color: '#000',
            margin: '0 0 12px 0',
            fontStyle: 'italic',
          }}
        >
          {facility.status[lang]}
        </p>
      )}

      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '20px',
          color: '#000',
          margin: '0 0 4px 0',
        }}
      >
        {facility.email}
      </p>
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '20px',
          color: '#000',
          margin: '0 0 24px 0',
        }}
      >
        {facility.phone}
      </p>

      {facility.ctaText[lang] && (
        <a
          href={facility.ctaHref || '#'}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: '#000',
            textDecoration: 'none',
            borderBottom: '1px solid #000',
            paddingBottom: '2px',
            display: 'inline-block',
            marginBottom: '32px',
            transition: 'border-bottom-width 0.2s',
          }}
          onClick={(e) => {
            if (!facility.ctaHref || facility.ctaHref === '#') e.preventDefault();
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.borderBottomWidth = '2px';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.borderBottomWidth = '1px';
          }}
        >
          {facility.ctaText[lang]}
        </a>
      )}

      {facility.description[lang] && (
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '20px',
            color: '#000',
            margin: '0 0 24px 0',
          }}
        >
          {facility.description[lang]}
        </p>
      )}

      {facility.exploreCtaText[lang] && (
        <Link
          to={`/services/${facility.slug}`}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '12px',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: '#000',
            textDecoration: 'none',
            borderBottom: '1px solid #000',
            paddingBottom: '2px',
            display: 'inline-block',
            marginBottom: '32px',
            transition: 'border-bottom-width 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.borderBottomWidth = '2px';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.borderBottomWidth = '1px';
          }}
        >
          {facility.exploreCtaText[lang]}
        </Link>
      )}

      {facility.image && (
        <div style={{ marginTop: 'auto', overflow: 'hidden' }}>
          <img
            src={facility.image}
            alt={facility.imageAlt[lang]}
            onMouseEnter={() => setImgHover(true)}
            onMouseLeave={() => setImgHover(false)}
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              display: 'block',
              opacity: imgHover ? 0.8 : 1,
              transition: 'opacity 0.2s',
              filter: 'grayscale(100%)',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function Facilities() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const facilities = facilitiesConfig.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const scrollToIndex = (index: number) => {
    const length = facilities.length;
    if (!length) return;
    const clamped = ((index % length) + length) % length;
    const grid = gridRef.current;
    const child = grid?.children[clamped] as HTMLElement | undefined;
    if (grid && child) {
      grid.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
    }
    setActiveIndex(clamped);
  };

  useEffect(() => {
    if (!isMobile || facilities.length < 2) return;
    const interval = setInterval(() => {
      scrollToIndex(activeIndexRef.current + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMobile, facilities.length]);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const cols = gridRef.current.children;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(cols),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!facilitiesConfig.sectionLabel[language] && facilities.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="facilities"
      style={{
        background: '#ffffff',
        color: '#000000',
        borderTop: '1px solid #000',
      }}
    >
      <div
        style={{
          padding: '40px 40px 20px',
        }}
      >
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '17.5px',
            fontWeight: 400,
            lineHeight: '20px',
            textTransform: 'uppercase',
            color: '#000',
            margin: '0 0 24px 0',
          }}
        >
          {facilitiesConfig.sectionLabel[language]}
        </p>

        {facilitiesConfig.sectionTitle[language] && (
          <h2
            style={{
              fontFamily: "'Geist Pixel', monospace",
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.0,
              color: '#000',
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
              textWrap: 'balance',
            }}
          >
            {facilitiesConfig.sectionTitle[language]}
          </h2>
        )}

        {facilitiesConfig.sectionIntro[language] && (
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '24px',
              color: 'rgba(0,0,0,0.6)',
              maxWidth: '640px',
              margin: '0 0 40px 0',
            }}
          >
            {facilitiesConfig.sectionIntro[language]}
          </p>
        )}
      </div>

      <div className="facilities-grid-wrap" style={{ position: 'relative' }}>
        <div
          ref={gridRef}
          className="facilities-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid #000',
          }}
        >
          {facilities.map((facility, index) => (
            <FacilityColumn
              key={facility.slug || `${facility.name[language]}-${index}`}
              facility={facility}
              isLast={index === facilities.length - 1}
              lang={language}
            />
          ))}
        </div>

        {facilities.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              className="facilities-arrow facilities-arrow-left"
              onClick={() => scrollToIndex(activeIndex - 1)}
            >
              &#8592;
            </button>
            <button
              type="button"
              aria-label="Next"
              className="facilities-arrow facilities-arrow-right"
              onClick={() => scrollToIndex(activeIndex + 1)}
            >
              &#8594;
            </button>
          </>
        )}
      </div>
    </section>
  );
}
