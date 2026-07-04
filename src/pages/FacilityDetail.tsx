import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { facilitiesConfig } from '../config';
import { useLanguage } from '../contexts/LanguageContext';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';

export default function FacilityDetail() {
  const { language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();

  const facility = useMemo(
    () => facilitiesConfig.items.find((item) => item.slug === slug) ?? null,
    [slug]
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = facility
      ? `${facility.article.title[language]} | DAVIN Beauty Salon`
      : `${facilitiesConfig.detailNotFoundText[language]} | DAVIN Beauty Salon`;

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
      document.title = prevTitle;
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [facility, language]);

  if (!facility) {
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
            padding: '160px 40px 40px',
          }}
        >
          <p>{facilitiesConfig.detailNotFoundText[language]}</p>
          <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>
            {facilitiesConfig.detailReturnText[language]}
          </Link>
        </div>
      </>
    );
  }

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
          paddingTop: '72px',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '60px 48px',
              borderRight: '1px solid #000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 400,
                lineHeight: '34px',
                textTransform: 'uppercase',
                margin: '0 0 40px 0',
                letterSpacing: '0.02em',
              }}
            >
              {facility.article.title[language]}
            </h1>
            <div style={{ maxWidth: '520px' }}>
              {facility.article.paragraphs[language].map((paragraph, index) => (
                <p
                  key={`${facility.slug}-${index}`}
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    margin: '0 0 20px 0',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <a
              href="tel:+918089069996"
              style={{
                display: 'inline-block',
                marginTop: '32px',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#000',
                textDecoration: 'none',
                borderBottom: '1px solid #000',
                paddingBottom: '3px',
                width: 'fit-content',
                transition: 'letter-spacing 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.letterSpacing = '0.18em';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.letterSpacing = '0.12em';
              }}
            >
              {facility.ctaText[language]}
            </a>
          </div>

          <div
            style={{
              flex: 1,
              position: 'relative',
              background: '#000',
              overflow: 'hidden',
            }}
          >
            {facility.image ? (
              <img
                src={facility.image}
                alt={facility.imageAlt[language]}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1)';
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                {language === 'ml' ? 'ചിത്രം ലഭ്യമല്ല' : 'No Image'}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
