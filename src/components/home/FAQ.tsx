import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import { faqConfig } from '../../config';
import { useLanguage } from '../../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const items = faqConfig.items;

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!faqConfig.title[language] && items.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        background: '#ffffff',
        color: '#000000',
        borderTop: '1px solid #000',
        padding: '100px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: "'Geist Pixel', monospace",
          fontSize: 'clamp(26px, 3.2vw, 44px)',
          fontWeight: 400,
          lineHeight: 1.1,
          color: '#000',
          textTransform: 'uppercase',
          margin: '0 0 48px 0',
          textAlign: 'center',
          textWrap: 'balance',
        }}
      >
        {faqConfig.title[language]}
      </h2>

      <div ref={contentRef} style={{ width: '100%', maxWidth: '820px', opacity: 0 }}>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-black"
            >
              <AccordionTrigger
                className="font-mono uppercase tracking-wide text-sm text-black hover:no-underline"
              >
                {item.question[language]}
              </AccordionTrigger>
              <AccordionContent className="font-mono text-sm leading-6 text-black/70">
                {item.answer[language]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
