import type { MouseEvent } from 'react';
import type { GalleryTileItem, Language } from '../../config';
import { handleTiltMove, handleTiltLeave } from '../about/tilt';
import GalleryImage from './GalleryImage';

export type TileInteraction = 'tilt' | 'lift' | 'flat';

interface GalleryTileProps {
  item: GalleryTileItem;
  language: Language;
  dark: boolean;
  interactive?: TileInteraction;
  aspect?: string;
}

export default function GalleryTile({ item, language, dark, interactive = 'flat', aspect = '3 / 4' }: GalleryTileProps) {
  const lineColor = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
  const isTilt = interactive === 'tilt';
  const isLift = interactive === 'lift';

  const tiltHandlers = isTilt
    ? {
        onMouseMove: handleTiltMove as (e: MouseEvent<HTMLDivElement>) => void,
        onMouseLeave: handleTiltLeave as (e: MouseEvent<HTMLDivElement>) => void,
      }
    : {};

  return (
    <div
      className={isTilt ? 'scene' : isLift ? 'hover-lift' : undefined}
      {...tiltHandlers}
      style={{
        position: 'relative',
        aspectRatio: aspect,
        overflow: 'hidden',
        border: `1px solid ${lineColor}`,
        background: dark ? '#0a0a0a' : '#f2f2f2',
        transformStyle: isTilt ? 'preserve-3d' : undefined,
        transition: isTilt ? 'transform 0.25s ease-out' : undefined,
        willChange: 'transform',
      }}
    >
      <GalleryImage src={item.src} alt={item.alt[language]} label={item.label[language]} dark={dark} className="img-zoom" />

      <div
        style={{
          position: 'absolute',
          left: '8px',
          bottom: '8px',
          background: 'rgba(0,0,0,0.65)',
          padding: '4px 9px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#fff',
          pointerEvents: 'none',
        }}
      >
        {item.label[language]}
      </div>
    </div>
  );
}
