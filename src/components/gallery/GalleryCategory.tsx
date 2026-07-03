import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { GalleryCategoryData } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';
import GalleryTile, { type TileInteraction } from './GalleryTile';

gsap.registerPlugin(ScrollTrigger);

export type GalleryCategoryVariant = 'tilt' | 'editorial' | 'mosaic';

interface GalleryCategoryProps {
  category: GalleryCategoryData;
  dark: boolean;
  variant: GalleryCategoryVariant;
}

const VARIANT_CONFIG: Record<GalleryCategoryVariant, { columns: string; gap: string; tile: TileInteraction }> = {
  tilt: { columns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px', tile: 'tilt' },
  editorial: { columns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '26px', tile: 'lift' },
  mosaic: { columns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px', tile: 'flat' },
};

function tileAspect(variant: GalleryCategoryVariant): string {
  if (variant === 'editorial') return '4 / 5';
  if (variant === 'mosaic') return '3 / 4';
  return '3 / 4';
}

export default function GalleryCategory({ category, dark, variant }: GalleryCategoryProps) {
  const { language } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const cfg = VARIANT_CONFIG[variant];

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(gridRef.current!.children),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        background: dark ? '#000' : '#fff',
        color: dark ? '#fff' : '#000',
        padding: '100px 40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(22px, 2.6vw, 36px)',
            fontWeight: 400,
            textTransform: 'uppercase',
            margin: '0 0 40px 0',
            textWrap: 'balance',
          }}
        >
          {category.title[language]}
        </h2>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: cfg.columns,
            gap: cfg.gap,
          }}
        >
          {category.items.map((item) => (
            <GalleryTile
              key={item.slug}
              item={item}
              language={language}
              dark={dark}
              interactive={cfg.tile}
              aspect={tileAspect(variant)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
