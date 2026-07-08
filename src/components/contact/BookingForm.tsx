import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';
import { contactConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';
import './BookingForm.css';

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

interface CustomSelectOption {
  value: string;
  label: string;
}

function CustomSelect({
  id,
  value,
  options,
  onChange,
  icon,
}: {
  id: string;
  value: string;
  options: CustomSelectOption[];
  onChange: (value: string) => void;
  icon?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          ...inputStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected?.label}
        </span>
        <span aria-hidden="true" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon}
          <span style={{ fontSize: '13px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▾</span>
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="custom-select-list"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 20,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            background: '#fff',
            border: '1px solid #000',
            boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
            maxHeight: '260px',
            overflowY: 'auto',
          }}
        >
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  textAlign: 'left',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '13px',
                  color: opt.value === value ? '#fff' : '#000',
                  background: opt.value === value ? '#000' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  padding: '12px 16px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (opt.value !== value) e.currentTarget.style.background = 'rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  if (opt.value !== value) e.currentTarget.style.background = 'transparent';
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function polarPoint(radius: number, hour: number) {
  const angleDeg = (hour % 12) * 30;
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: 100 + radius * Math.cos(angleRad),
    y: 100 + radius * Math.sin(angleRad),
  };
}

const MINUTE_OPTIONS = [...Array(12).keys()].map((i) => i * 5);
const HOUR_OPTIONS = [...Array(12).keys()].map((i) => i + 1);

function ClockTimePicker({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: string;
  options: CustomSelectOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'hr' | 'min'>('hr');
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((opt) => opt.value === value);

  const [vh, vmStr] = value.split(':');
  const hour24 = parseInt(vh, 10);
  const period: 'AM' | 'PM' = hour24 < 12 ? 'AM' : 'PM';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minute = parseInt(vmStr, 10);

  const isValid = (h12: number, per: 'AM' | 'PM', min: number) => {
    const h24 = per === 'AM' ? (h12 === 12 ? 0 : h12) : h12 === 12 ? 12 : h12 + 12;
    const v = `${h24.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    return options.some((opt) => opt.value === v);
  };

  const hourEnabled = (h12: number, per: 'AM' | 'PM') => MINUTE_OPTIONS.some((m) => isValid(h12, per, m));

  const selectTime = (h12: number, per: 'AM' | 'PM', min: number) => {
    const h24 = per === 'AM' ? (h12 === 12 ? 0 : h12) : h12 === 12 ? 12 : h12 + 12;
    const v = `${h24.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    if (options.some((opt) => opt.value === v)) onChange(v);
  };

  const nearestValidMinute = (h12: number, per: 'AM' | 'PM', preferred: number) => {
    if (isValid(h12, per, preferred)) return preferred;
    return MINUTE_OPTIONS.find((m) => isValid(h12, per, m)) ?? preferred;
  };

  const handleHourClick = (h12: number) => {
    if (!hourEnabled(h12, period)) return;
    selectTime(h12, period, nearestValidMinute(h12, period, minute));
    setMode('min');
  };

  const handleMinuteClick = (min: number) => {
    if (!isValid(hour12, period, min)) return;
    selectTime(hour12, period, min);
    setMode('hr');
    setOpen(false);
  };

  const handlePeriodClick = (per: 'AM' | 'PM') => {
    if (per === period) return;
    let nextHour = hour12;
    if (!hourEnabled(nextHour, per)) {
      nextHour = HOUR_OPTIONS.find((h) => hourEnabled(h, per)) ?? hour12;
    }
    selectTime(nextHour, per, nearestValidMinute(nextHour, per, minute));
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setMode('hr');
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setMode('hr');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const hourHandRotation = (hour12 % 12) * 30 + minute * 0.5;
  const minuteHandRotation = minute * 6;

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{
          ...inputStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected?.label}
        </span>
        <span aria-hidden="true" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} strokeWidth={1.5} />
          <span style={{ fontSize: '13px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▾</span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose time"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 20,
            background: '#fff',
            border: '1px solid #000',
            boxShadow: '0 20px 48px rgba(0,0,0,0.16)',
            padding: '24px',
            width: '260px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
            {(['AM', 'PM'] as const).map((per) => (
              <button
                key={per}
                type="button"
                onClick={() => handlePeriodClick(per)}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  padding: '8px 18px',
                  border: '1px solid #000',
                  background: period === per ? '#000' : 'transparent',
                  color: period === per ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                {per}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 18px', borderRadius: '50%', border: '1px solid #000' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '2px',
                height: '58px',
                background: '#000',
                transformOrigin: 'bottom center',
                transform: `translate(-50%, -100%) rotate(${hourHandRotation}deg)`,
                transition: 'transform 0.25s ease',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '1.5px',
                height: '82px',
                background: 'rgba(0,0,0,0.45)',
                transformOrigin: 'bottom center',
                transform: `translate(-50%, -100%) rotate(${minuteHandRotation}deg)`,
                transition: 'transform 0.25s ease',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#000',
                transform: 'translate(-50%, -50%)',
              }}
            />
            {mode === 'hr'
              ? HOUR_OPTIONS.map((h) => {
                  const { x, y } = polarPoint(78, h);
                  const enabled = hourEnabled(h, period);
                  const active = h === hour12;
                  return (
                    <button
                      key={h}
                      type="button"
                      disabled={!enabled}
                      onClick={() => handleHourClick(h)}
                      style={{
                        position: 'absolute',
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: 'translate(-50%, -50%)',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: 'none',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '12px',
                        background: active ? '#000' : 'transparent',
                        color: !enabled ? 'rgba(0,0,0,0.25)' : active ? '#fff' : '#000',
                        cursor: enabled ? 'pointer' : 'default',
                      }}
                    >
                      {h}
                    </button>
                  );
                })
              : MINUTE_OPTIONS.map((m, i) => {
                  const slot = i === 0 ? 12 : i;
                  const { x, y } = polarPoint(78, slot);
                  const enabled = isValid(hour12, period, m);
                  const active = m === minute;
                  return (
                    <button
                      key={m}
                      type="button"
                      disabled={!enabled}
                      onClick={() => handleMinuteClick(m)}
                      style={{
                        position: 'absolute',
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: 'translate(-50%, -50%)',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: 'none',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '11px',
                        background: active ? '#000' : 'transparent',
                        color: !enabled ? 'rgba(0,0,0,0.25)' : active ? '#fff' : '#000',
                        cursor: enabled ? 'pointer' : 'default',
                      }}
                    >
                      {m.toString().padStart(2, '0')}
                    </button>
                  );
                })}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setMode('hr')}
              style={{
                flex: 1,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                letterSpacing: '0.05em',
                padding: '10px 12px',
                border: '1px solid #000',
                background: mode === 'hr' ? '#000' : 'transparent',
                color: mode === 'hr' ? '#fff' : '#000',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '9px', opacity: 0.6 }}>HR</span>
              <span>{hour12}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('min')}
              style={{
                flex: 1,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                letterSpacing: '0.05em',
                padding: '10px 12px',
                border: '1px solid #000',
                background: mode === 'min' ? '#000' : 'transparent',
                color: mode === 'min' ? '#fff' : '#000',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '9px', opacity: 0.6 }}>MIN</span>
              <span>{minute.toString().padStart(2, '0')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
            <CustomSelect
              id="contact-service"
              value={service}
              onChange={setService}
              options={booking.serviceOptions.map((opt) => ({ value: opt.value, label: opt.label[language] }))}
            />
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
              <label style={labelStyle} htmlFor="contact-time">{booking.timeLabel[language]}</label>
              <ClockTimePicker
                id="contact-time"
                value={time}
                onChange={setTime}
                options={booking.timeOptions.map((opt) => ({ value: opt.value, label: opt.label[language] }))}
              />
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
