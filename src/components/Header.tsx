import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { navigationConfig, facilitiesConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../Assets/Logo.png';

interface HeaderProps {
  /** Only the home hero starts fully transparent over its video and turns
   *  solid on scroll. Every other page renders the solid (scrolled) look
   *  from the start, so the header reads identically everywhere. */
  transparentOnTop?: boolean;
}

export default function Header({ transparentOnTop = false }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const preToggleRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => {
      // A small fixed threshold — solidify as soon as the user starts
      // scrolling, well before hero content scrolls up underneath the
      // fixed header (a viewport-relative threshold left it transparent
      // too long on short viewports, letting hero text show through).
      const shouldScroll = window.scrollY > 60;
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
    <div ref={navLinksRef} className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
      {navigationConfig.links.map((item, index) => {
        const isServices = item.href === '/services';
        const servicesHref = isServices
          ? `/services/${facilitiesConfig.items[0].slug}`
          : item.href;
        const isActive = isServices
          ? location.pathname.startsWith('/services')
          : item.href === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.href);
        return (
          <div
            key={`${item.label.en}-${item.href}`}
            className={isServices ? 'group' : undefined}
            style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <Link
              to={servicesHref}
              className="nav-link"
              style={{
                fontSize: '11px',
                fontWeight: 400,
                color: '#fff',
                textTransform: 'uppercase',
                textDecoration: isActive ? 'underline' : 'none',
                textUnderlineOffset: '4px',
                letterSpacing: '0.1em',
                padding: '4px 14px',
                transition: 'opacity 0.2s, letter-spacing 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.opacity = '0.6';
                (e.target as HTMLElement).style.letterSpacing = '0.16em';
                (e.target as HTMLElement).style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.opacity = '1';
                (e.target as HTMLElement).style.letterSpacing = '0.1em';
                (e.target as HTMLElement).style.textDecoration = isActive ? 'underline' : 'none';
              }}
            >
              {item.label[language]}
            </Link>

            {isServices && (
              <div
                className="absolute left-0 top-full opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto"
                style={{ paddingTop: '14px', minWidth: '240px', zIndex: 60 }}
              >
                <div
                  style={{
                    background: '#000',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                  }}
                >
                  {facilitiesConfig.items.map((service, serviceIndex) => {
                    const isActive = location.pathname === `/services/${service.slug}`;
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        style={{
                          display: 'block',
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 400,
                          color: '#fff',
                          textTransform: 'uppercase',
                          textDecoration: isActive ? 'underline' : 'none',
                          textUnderlineOffset: '4px',
                          letterSpacing: '0.08em',
                          padding: '14px 20px',
                          borderBottom: serviceIndex === facilitiesConfig.items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                          transition: 'letter-spacing 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = 'underline';
                          e.currentTarget.style.letterSpacing = '0.12em';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = isActive ? 'underline' : 'none';
                          e.currentTarget.style.letterSpacing = '0.08em';
                        }}
                      >
                        {service.name[language]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

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
        );
      })}
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
      className={`nav-bar${scrolled ? ' header-pattern' : ''}`}
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
        background: scrolled
          ? '#000'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 65%, transparent 100%)',
        fontFamily: "'IBM Plex Mono', monospace",
        boxSizing: 'border-box',
        transition: 'width 0.4s ease, background 0.4s ease, padding 0.4s ease',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
      }}
    >
      {/* Left side: Brand, joined by the nav links pre-scroll */}
      <div className="nav-brand-group" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            textDecoration: 'none',
          }}
        >
          <img
            src={logo}
            alt={navigationConfig.brandName}
            className="nav-logo"
            style={{
              height: scrolled ? '38px' : '48px',
              width: 'auto',
              display: 'block',
              transition: 'height 0.4s ease',
            }}
          />
        </Link>
        {!scrolled && navLinks}
      </div>

      {/* Right side: menu moves here once scrolled, toggle always here */}
      <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {scrolled && navLinks}
        {languageToggle}
        <button
          type="button"
          className="nav-hamburger"
          aria-label={
            language === 'ml'
              ? mobileOpen
                ? 'മെനു അടയ്ക്കുക'
                : 'മെനു തുറക്കുക'
              : mobileOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            width: '34px',
            height: '34px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            padding: 0,
          }}
        >
          <span
            style={{
              width: '20px',
              height: '1.5px',
              background: '#fff',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              width: '20px',
              height: '1.5px',
              background: '#fff',
              opacity: mobileOpen ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          />
          <span
            style={{
              width: '20px',
              height: '1.5px',
              background: '#fff',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile drawer — full-width dropdown below the fixed header */}
      <div
        className="nav-mobile-drawer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          background: '#000',
          zIndex: 49,
          paddingTop: '78px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: mobileOpen ? 1 : 0,
          visibility: mobileOpen ? 'visible' : 'hidden',
          transition: 'transform 0.35s ease, opacity 0.35s ease, visibility 0.35s',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '12px 28px 40px' }}>
          {navigationConfig.links.map((item) => {
            const isServices = item.href === '/services';
            const href = isServices ? `/services/${facilitiesConfig.items[0].slug}` : item.href;
            const isActive = isServices
              ? location.pathname.startsWith('/services')
              : item.href === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.href);
            return (
              <div key={item.href}>
                <Link
                  to={href}
                  style={{
                    display: 'block',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '18px 0',
                    borderBottom: isServices ? 'none' : '1px solid rgba(255,255,255,0.12)',
                    textDecoration: isActive ? 'underline' : 'none',
                    textUnderlineOffset: '5px',
                  }}
                >
                  {item.label[language]}
                </Link>

                {isServices && (
                  <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '6px' }}>
                    {facilitiesConfig.items.map((service) => {
                      const isServiceActive = location.pathname === `/services/${service.slug}`;
                      return (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '12px',
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.65)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            padding: '12px 0 12px 18px',
                            textDecoration: isServiceActive ? 'underline' : 'none',
                          }}
                        >
                          {service.name[language]}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
