import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { archivesConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Archives() {
  const { language } = useLanguage();
  const sceneRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const scrollTlRef = useRef<gsap.core.Timeline | null>(null);
  const vaultImages = archivesConfig.items;

  const setupCarouselCells = useCallback(() => {
    if (!carouselRef.current) return;
    const cells = carouselRef.current.querySelectorAll<HTMLElement>('.carousel__cell');
    const count = cells.length;
    if (!count) return;
    const radius = 500;
    const angleStep = 360 / count;

    cells.forEach((cell, index) => {
      cell.style.transform = `rotateY(${index * angleStep}deg) translateZ(${radius}px)`;
    });
  }, []);

  const createScrollTimeline = useCallback(() => {
    if (!wrapperRef.current || !carouselRef.current) return;

    const carousel = carouselRef.current;
    const cards = carousel.querySelectorAll<HTMLElement>('.carousel__cell img');

    const tl = gsap.timeline({
      defaults: { ease: 'sine.inOut' },
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.fromTo(carousel, { rotationY: 0 }, { rotationY: -180 }, 0);
    tl.fromTo(carousel, { rotationZ: 3, rotationX: 3 }, { rotationZ: -3, rotationX: -3 }, 0);
    tl.fromTo(cards, { filter: 'brightness(250%)' }, { filter: 'brightness(80%)', ease: 'power3' }, 0);
    tl.fromTo(cards, { rotationZ: 10 }, { rotationZ: -10, ease: 'none' }, 0);

    scrollTlRef.current = tl;
  }, []);

  useEffect(() => {
    setupCarouselCells();
    createScrollTimeline();

    return () => {
      if (scrollTlRef.current) {
        scrollTlRef.current.scrollTrigger?.kill();
        scrollTlRef.current.kill();
      }
    };
  }, [setupCarouselCells, createScrollTimeline]);

  if (!archivesConfig.sectionLabel[language] && !archivesConfig.vaultTitle[language] && vaultImages.length === 0) {
    return null;
  }

  return (
    <section
      ref={wrapperRef}
      id="archives"
      style={{
        background: '#000',
        color: '#fff',
        minHeight: '200vh',
        position: 'relative',
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
            margin: '0 0 24px 0',
          }}
        >
          {archivesConfig.sectionLabel[language]}
        </h2>
      </div>

      <div
        ref={sceneRef}
        className="scene"
        style={{
          perspective: '900px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {archivesConfig.vaultTitle[language] && (
          <Link
            to="/gallery"
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 400,
              textTransform: 'uppercase',
              color: '#fff',
              background: 'transparent',
              border: '1px solid #fff',
              borderRadius: '26px',
              padding: '10px 28px',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = '#fff';
              el.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'transparent';
              el.style.color = '#fff';
            }}
          >
            {archivesConfig.vaultTitle[language]}
          </Link>
        )}

        <div
          ref={carouselRef}
          className="carousel"
          style={{
            width: '400px',
            height: '500px',
            position: 'absolute',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: 'translateZ(-550px) rotateY(0deg)',
          }}
        >
          {vaultImages.map((item, index) => (
            <div
              key={`${item.label[language]}-${index}`}
              className="carousel__cell"
              style={{
                position: 'absolute',
                width: '350px',
                height: '420px',
                left: '0',
                top: '0',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src={item.src}
                alt={item.alt[language]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'grayscale(100%)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  color: '#fff',
                  letterSpacing: '0.05em',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '4px 8px',
                }}
              >
                {item.label[language]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
