import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Featured() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.08 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text stagger
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Decorative line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      id="featured"
      style={{
        background: '#000',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Main image */}
      <div
        ref={imageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '75vh',
          minHeight: '500px',
          overflow: 'hidden',
          opacity: 0,
        }}
      >
        <img
          src={featuredConfig.image}
          alt="Premium haircut at DAVIN"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(20%) contrast(1.05)',
            transition: 'transform 0.8s ease',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* Decorative corner lines */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            width: '60px',
            height: '60px',
            borderLeft: '1px solid rgba(255,255,255,0.3)',
            borderTop: '1px solid rgba(255,255,255,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '32px',
            width: '60px',
            height: '60px',
            borderRight: '1px solid rgba(255,255,255,0.3)',
            borderBottom: '1px solid rgba(255,255,255,0.3)',
          }}
        />

        {/* Text overlay */}
        <div
          ref={textRef}
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '48px',
            right: '48px',
            zIndex: 10,
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              fontWeight: 400,
              lineHeight: 1.6,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 16px 0',
            }}
          >
            {featuredConfig.eyebrow[language]}
          </p>
          <h2
            style={{
              fontFamily: "'Geist Pixel', monospace",
              fontSize: 'clamp(30px, 4vw, 58px)',
              fontWeight: 400,
              lineHeight: 0.98,
              color: '#fff',
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
              textWrap: 'balance',
              maxWidth: '680px',
            }}
          >
            {featuredConfig.title[language]}
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              maxWidth: '480px',
            }}
          >
            {featuredConfig.subtitle[language]}
          </p>
        </div>
      </div>

      {/* Decorative horizontal line */}
      <div
        ref={lineRef}
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
          transformOrigin: 'left center',
        }}
      />
    </section>
  );
}
