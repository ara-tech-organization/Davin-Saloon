import { Link } from 'react-router-dom';
import { footerConfig, navigationConfig, facilitiesConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../Assets/Logo.png';

export default function Footer() {
  const { language } = useLanguage();

  if (!footerConfig.copyrightText && !footerConfig.statusText[language]) {
    return null;
  }

  const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    display: 'block',
    margin: '0 0 10px 0',
    fontSize: '11px',
    letterSpacing: '0.05em',
  } as const;

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
          padding: '56px 40px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          position: 'relative',
        }}
      >
        <div>
          <img
            src={logo}
            alt={navigationConfig.brandName}
            style={{
              height: '48px',
              width: 'auto',
              display: 'block',
              margin: '0 0 12px 0',
              filter: 'invert(1)',
            }}
          />
          <p
            style={{
              fontSize: '11px',
              lineHeight: '18px',
              color: 'rgba(0,0,0,0.6)',
              margin: 0,
              textTransform: 'none',
              letterSpacing: 'normal',
            }}
          >
            {footerConfig.tagline[language]}
          </p>
        </div>

        <div>
          <p style={{ fontSize: '11px', margin: '0 0 16px 0', color: 'rgba(0,0,0,0.45)' }}>
            {footerConfig.quickLinksLabel[language]}
          </p>
          {navigationConfig.links.map((link) => (
            <Link key={link.href} to={link.href} style={linkStyle}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <p style={{ fontSize: '11px', margin: '0 0 16px 0', color: 'rgba(0,0,0,0.45)' }}>
            {footerConfig.servicesLabel[language]}
          </p>
          {facilitiesConfig.items.map((item) => (
            <Link key={item.slug} to={`/services/${item.slug}`} style={linkStyle}>
              {item.name[language]}
            </Link>
          ))}
        </div>

        <div>
          <p style={{ fontSize: '11px', margin: '0 0 16px 0', color: 'rgba(0,0,0,0.45)' }}>
            {footerConfig.contactLabel[language]}
          </p>
          <p style={{ fontSize: '11px', lineHeight: '18px', margin: '0 0 10px 0', textTransform: 'none', letterSpacing: 'normal' }}>
            {footerConfig.address}
          </p>
          <a href={`tel:${footerConfig.phone.replace(/\s/g, '')}`} style={linkStyle}>
            {footerConfig.phone}
          </a>
          <p style={{ fontSize: '11px', margin: '0 0 16px 0' }}>{footerConfig.hours[language]}</p>

          <p style={{ fontSize: '11px', margin: '0 0 8px 0', color: 'rgba(0,0,0,0.45)' }}>
            {footerConfig.followLabel[language]}
          </p>
          <a
            href={footerConfig.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {footerConfig.instagramHandle}
          </a>
        </div>
      </div>

      <div
        style={{
          padding: '20px 40px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          fontSize: '10px',
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
