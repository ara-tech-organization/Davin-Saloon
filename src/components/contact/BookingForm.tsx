import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '14px',
  color: '#000',
  background: 'transparent',
  border: '1px solid #000',
  padding: '14px 16px',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(0,0,0,0.6)',
  margin: '0 0 10px 0',
};

export default function BookingForm() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { booking } = contactConfig;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(booking.serviceOptions[0].value);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(booking.timeOptions[0].value);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelector('.booking-panel'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceLabel = booking.serviceOptions.find((o) => o.value === service)?.label[language] ?? service;
    const timeLabel = booking.timeOptions.find((o) => o.value === time)?.label[language] ?? time;
    const message = [
      `New appointment request — DAVIN Beauty Salon`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${serviceLabel}`,
      `Preferred Date: ${date}`,
      `Preferred Time: ${timeLabel}`,
    ].join('\n');
    window.open(`https://wa.me/918089069996?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        color: '#000',
        borderTop: '1px solid #000',
        padding: '120px 40px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '760px' }}>
        <h2
          style={{
            fontFamily: "'Geist Pixel', monospace",
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            fontWeight: 400,
            color: '#000',
            textTransform: 'uppercase',
            margin: '0 0 20px 0',
            textAlign: 'center',
            textWrap: 'balance',
          }}
        >
          {booking.title[language]}
        </h2>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', lineHeight: '24px', color: 'rgba(0,0,0,0.7)', textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
          {booking.subtitle[language]}
        </p>

        <form
          className="booking-panel"
          onSubmit={handleSubmit}
          style={{
            opacity: 0,
            border: '1px solid #000',
            padding: '48px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <div>
            <label style={labelStyle} htmlFor="contact-name">{booking.nameLabel[language]}</label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={booking.namePlaceholder[language]}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="contact-phone">{booking.phoneLabel[language]}</label>
            <input
              id="contact-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={booking.phonePlaceholder[language]}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="contact-service">{booking.serviceLabel[language]}</label>
            <select
              id="contact-service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {booking.serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label[language]}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' }}>
            <div>
              <label style={labelStyle} htmlFor="contact-date">{booking.dateLabel[language]}</label>
              <input
                id="contact-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={labelStyle}>{booking.timeLabel[language]}</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {booking.timeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTime(opt.value)}
                    style={{
                      flex: '1 1 auto',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: time === opt.value ? '#fff' : '#000',
                      background: time === opt.value ? '#000' : 'transparent',
                      border: '1px solid #000',
                      padding: '12px 10px',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {opt.label[language]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '12px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#fff',
              background: '#000',
              border: '1px solid #000',
              padding: '18px 32px',
              cursor: 'pointer',
              transition: 'opacity 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            {booking.submitText[language]}
          </button>

          {submitted && (
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', lineHeight: '22px', color: '#000', background: 'rgba(0,0,0,0.05)', border: '1px solid #000', padding: '16px 20px', margin: 0 }}>
              {booking.successText[language]}
            </p>
          )}

          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', lineHeight: '20px', color: 'rgba(0,0,0,0.55)', margin: 0 }}>
            {booking.consentText[language]}
          </p>
        </form>

        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', lineHeight: '22px', color: 'rgba(0,0,0,0.7)', textAlign: 'center', margin: '32px 0 0 0' }}>
          {booking.instantNote[language]}
        </p>
      </div>
    </section>
  );
}
