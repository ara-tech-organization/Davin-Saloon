import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { GalleryCategoryData } from '../../config';
import { archivesConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';
import GalleryImage from './GalleryImage';

gsap.registerPlugin(ScrollTrigger);

interface MakeupShowcaseProps {
  category: GalleryCategoryData;
}

export default function MakeupShowcase({ category }: MakeupShowcaseProps) {
  const { language } = useLanguage();
  const wrapperRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const scrollTlRef = useRef<gsap.core.Timeline | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const items = category.items;

  const setupCarouselCells = useCallback(() => {
    if (!carouselRef.current) return;
    const cells = carouselRef.current.querySelectorAll<HTMLElement>('.carousel__cell');
    const count = cells.length;
    if (!count) return;
    const radius = 480;
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
    tl.fromTo(cards, { filter: 'brightness(220%) grayscale(100%) contrast(1.1)' }, { filter: 'brightness(85%) grayscale(100%) contrast(1.1)', ease: 'power3' }, 0);
    tl.fromTo(cards, { rotationZ: 10 }, { rotationZ: -10, ease: 'none' }, 0);

    scrollTlRef.current = tl;
  }, []);

  const burstGridIn = useCallback((elements: NodeListOf<HTMLElement> | HTMLElement[]) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    Array.from(elements).forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      const dx = centerX - elX;
      const dy = centerY - elY;
      const dist = Math.hypot(dx, dy);
      const delay = (dist / window.innerWidth) * 0.1;
      const isLeft = elX < centerX;

      gsap.fromTo(
        element,
        {
          autoAlpha: 0,
          y: dy * 0.5,
          scale: 0.5,
          rotationY: isLeft ? 100 : -100,
          z: -3500,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.4,
          ease: 'sine',
          delay: delay + 0.1,
        }
      );
    });
  }, []);

  const activatePreview = useCallback(() => {
    if (!carouselRef.current || !previewRef.current) return;

    const carousel = carouselRef.current;
    const cards = carousel.querySelectorAll<HTMLElement>('.carousel__cell img');
    const previewGridItems = previewRef.current.querySelectorAll<HTMLElement>('.grid__item');

    if (scrollTlRef.current) {
      scrollTlRef.current.scrollTrigger?.kill();
      scrollTlRef.current.kill();
    }

    setPreviewOpen(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'power2.inOut' },
    });

    tl.to(carousel, { rotationX: 90, rotationY: -360, z: -2000 }, 0);
    tl.to(carousel, { duration: 2.5, ease: 'power3.inOut', z: 1500, rotationZ: 270 }, 0.7);
    tl.to(cards, { rotationZ: 0 }, 0);
    tl.add(() => burstGridIn(previewGridItems), '<+=1.9');
  }, [burstGridIn]);

  const closePreview = useCallback(() => {
    if (!previewRef.current || !carouselRef.current) return;

    const previewGridItems = previewRef.current.querySelectorAll<HTMLElement>('.grid__item');

    gsap.to(Array.from(previewGridItems), {
      autoAlpha: 0,
      scale: 0.8,
      z: -1000,
      duration: 0.5,
      ease: 'power2.in',
      stagger: 0.03,
      onComplete: () => {
        setPreviewOpen(false);

        gsap.set(carouselRef.current, {
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          z: 0,
        });

        createScrollTimeline();
      },
    });
  }, [createScrollTimeline]);

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

  const vaultTitle = archivesConfig.vaultTitle[language];
  const closeText = archivesConfig.closeText[language];

  return (
    <>
      <section ref={wrapperRef} style={{ background: '#fff', color: '#000', minHeight: '200vh', position: 'relative' }}>
        <div style={{ padding: '100px 40px 40px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ width: '100%', maxWidth: '1200px' }}>
            <h2
              style={{
                fontFamily: "'Geist Pixel', monospace",
                fontSize: 'clamp(22px, 2.6vw, 36px)',
                fontWeight: 400,
                textTransform: 'uppercase',
                margin: 0,
                textWrap: 'balance',
              }}
            >
              {category.title[language]}
            </h2>
          </div>
        </div>

        <div
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
            background: '#000',
          }}
        >
          {vaultTitle && (
            <button
              onClick={activatePreview}
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
              {vaultTitle}
            </button>
          )}

          <div
            ref={carouselRef}
            className="carousel"
            style={{
              width: '340px',
              height: '440px',
              position: 'absolute',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              transform: 'translateZ(-520px) rotateY(0deg)',
            }}
          >
            {items.map((item) => (
              <div
                key={item.slug}
                className="carousel__cell"
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '380px',
                  left: '0',
                  top: '0',
                  transformStyle: 'preserve-3d',
                }}
              >
                <GalleryImage src={item.src} alt={item.alt[language]} label={item.label[language]} dark style={{ width: '100%', height: '100%' }} />
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
                    pointerEvents: 'none',
                  }}
                >
                  {item.label[language]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        ref={previewRef}
        className="preview"
        style={{
          position: 'fixed',
          inset: 0,
          padding: '0 15vw',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          alignContent: 'center',
          justifyItems: 'center',
          overflowY: 'auto',
          opacity: previewOpen ? 1 : 0,
          pointerEvents: previewOpen ? 'auto' : 'none',
          zIndex: 100,
          background: 'rgba(0,0,0,0.95)',
          transition: 'opacity 0.3s',
        }}
      >
        {closeText && (
          <button
            onClick={closePreview}
            style={{
              position: 'fixed',
              top: '32px',
              right: '40px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 400,
              textTransform: 'uppercase',
              color: '#fff',
              background: 'transparent',
              border: '1px solid #fff',
              borderRadius: '26px',
              padding: '8px 20px',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              zIndex: 110,
              transition: 'background 0.2s, color 0.2s',
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
            {closeText}
          </button>
        )}

        {items.map((item) => (
          <div
            key={item.slug}
            className="grid__item"
            style={{
              willChange: 'transform, clip-path',
              position: 'relative',
              transformStyle: 'preserve-3d',
              visibility: 'hidden',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <GalleryImage src={item.src} alt={item.alt[language]} label={item.label[language]} dark style={{ width: '100%', aspectRatio: '3 / 4' }} />
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 400,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '8px',
                letterSpacing: '0.05em',
              }}
            >
              {item.label[language]}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
