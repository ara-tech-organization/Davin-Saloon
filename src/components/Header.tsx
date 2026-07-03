import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { navigationConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  /** Only the home hero starts fully transparent over its video and turns
   *  solid on scroll. Every other page renders the solid (scrolled) look
   *  from the start, so the header reads identically everywhere. */
  transparentOnTop?: boolean;
}

export default function Header({ transparentOnTop = false }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const preToggleRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => {
      const shouldScroll = window.scrollY > window.innerHeight * 0.5;
      setScrolled((prev) => {
        if (prev !== shouldScroll && navLinksRef.current) {
          // FLIP "first": snapshot the links' position before the move happens.
          preToggleRectRef.current = navLinksRef.current.getBoundingClientRect();
        }
        return shouldScroll;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparentOnTop]);

  useLayoutEffect(() => {
    const el = navLinksRef.current;
    const first = preToggleRectRef.current;
    if (!el || !first) return;
    // FLIP "last" + "invert" + "play": measure the new position, offset the
    // element back to where it used to be, then animate that offset to zero
    // so the links visibly glide across instead of jumping.
    const last = el.getBoundingClientRect();
    const deltaX = first.left - last.left;
    preToggleRectRef.current = null;
    if (deltaX === 0) return;
    gsap.fromTo(el, { x: deltaX }, { x: 0, duration: 0.5, ease: 'power2.out' });
  }, [scrolled]);

  const navLinks = (
    <div ref={navLinksRef} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      {navigationConfig.links.map((item, index) => (
        <div
          key={`${item.label}-${item.href}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Link
            to={item.href}
            className="nav-link"
            style={{
              fontSize: '11px',
              fontWeight: 400,
              color: '#fff',
              textTransform: 'uppercase',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              padding: '4px 14px',
              transition: 'opacity 0.2s, letter-spacing 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = '0.6';
              (e.target as HTMLElement).style.letterSpacing = '0.16em';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = '1';
              (e.target as HTMLElement).style.letterSpacing = '0.1em';
            }}
          >
            {item.label}
          </Link>
          {index < navigationConfig.links.length - 1 && (
            <span
              style={{
                color: 'rgba(255,255,255,0.2)',
                fontSize: '10px',
                padding: '0 2px',
              }}
            >
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const languageToggle = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: '20px',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <button
        onClick={() => setLanguage('en')}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          fontWeight: language === 'en' ? 600 : 400,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: language === 'en' ? '#000' : 'rgba(255,255,255,0.55)',
          background: language === 'en' ? '#fff' : 'transparent',
          border: 'none',
          padding: '5px 12px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ml')}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          fontWeight: language === 'ml' ? 600 : 400,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: language === 'ml' ? '#000' : 'rgba(255,255,255,0.55)',
          background: language === 'ml' ? '#fff' : 'transparent',
          border: 'none',
          padding: '5px 12px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        മല
      </button>
    </div>
  );

  return (
    <nav
      className={scrolled ? 'header-pattern' : ''}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        minWidth: '320px',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: scrolled ? '12px 36px' : '20px 36px',
        background: scrolled ? '#000' : 'transparent',
        fontFamily: "'IBM Plex Mono', monospace",
        boxSizing: 'border-box',
        transition: 'width 0.4s ease, background 0.4s ease, padding 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
      }}
    >
      {/* Left side: Brand, joined by the nav links pre-scroll */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link
          to="/"
          style={{
            fontSize: scrolled ? '14px' : '18px',
            fontWeight: 400,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            flexShrink: 0,
            textDecoration: 'none',
            transition: 'font-size 0.4s ease',
          }}
        >
          {navigationConfig.brandName}
        </Link>
        {!scrolled && navLinks}
      </div>

      {/* Right side: menu moves here once scrolled, toggle always here */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {scrolled && navLinks}
        {languageToggle}
      </div>
    </nav>
  );
}
