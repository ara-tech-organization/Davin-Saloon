import { footerConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  if (!footerConfig.copyrightText && !footerConfig.statusText[language]) {
    return null;
  }

  return (
    <footer
      className="footer-pattern"
      style={{
        background: '#ffffff',
        color: '#000000',
        borderTop: '1px solid #000',
        padding: '0',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '12px',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pattern overlay strip */}
      <div
        style={{
          height: '40px',
          width: '100%',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          overflow: 'hidden',
        }}
      >
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            style={{
              color: 'rgba(255,255,255,0.15)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              whiteSpace: 'nowrap',
            }}
          >
            +
          </span>
        ))}
      </div>

      {/* Footer content */}
      <div
        style={{
          padding: '32px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <span>{footerConfig.copyrightText}</span>
        <span>{footerConfig.statusText[language]}</span>
      </div>

      {/* Bottom pattern strip */}
      <div
        style={{
          height: '8px',
          width: '100%',
          backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 4px, transparent 4px, transparent 8px)',
          opacity: 0.15,
        }}
      />
    </footer>
  );
}
