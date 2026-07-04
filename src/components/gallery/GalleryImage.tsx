import { useState, type CSSProperties } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface GalleryImageProps {
  src: string;
  alt: string;
  label?: string;
  dark?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function GalleryImage({ src, alt, label, dark = true, className, style }: GalleryImageProps) {
  const [errored, setErrored] = useState(false);
  const { language } = useLanguage();

  if (errored) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px',
          textAlign: 'center',
          background: dark
            ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 14px)'
            : 'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0 2px, transparent 2px 14px)',
          ...style,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)'} strokeWidth="1.2">
          <rect x="3" y="6" width="18" height="14" rx="1" />
          <circle cx="12" cy="13" r="3.4" />
          <path d="M8 6l1.2-2h5.6L16 6" />
        </svg>
        {label && (
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)' }}>
            {label}
          </span>
        )}
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
          {language === 'ml' ? 'ചിത്രം ഉടൻ വരുന്നു' : 'Image coming soon'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%) contrast(1.1)', ...style }}
    />
  );
}
