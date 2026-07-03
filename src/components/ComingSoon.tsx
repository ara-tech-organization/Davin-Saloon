import { useEffect } from 'react';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ComingSoon({ title, subtitle }: { title: string; subtitle: string }) {
  useEffect(() => {
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `
      a, button { cursor: none !important; }
      @media (pointer: coarse) {
        body { cursor: auto !important; }
        a, button { cursor: auto !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />
      <div
        style={{
          minHeight: '100vh',
          background: '#fff',
          color: '#000',
          fontFamily: "'IBM Plex Mono', monospace",
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '160px 40px 80px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.4)',
              margin: '0 0 20px 0',
            }}
          >
            Coming Soon
          </p>
          <h1
            style={{
              fontFamily: "'Geist Pixel', monospace",
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 400,
              textTransform: 'uppercase',
              margin: '0 0 20px 0',
              textWrap: 'balance',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '13px',
              lineHeight: '24px',
              color: 'rgba(0,0,0,0.6)',
              maxWidth: '480px',
              margin: '0 0 32px 0',
              textTransform: 'none',
              letterSpacing: 'normal',
            }}
          >
            {subtitle}
          </p>
          <a
            href="tel:+918089069996"
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              textDecoration: 'none',
              borderBottom: '1px solid #000',
              paddingBottom: '3px',
              transition: 'letter-spacing 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.letterSpacing = '0.18em';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.letterSpacing = '0.12em';
            }}
          >
            Book Appointment
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
