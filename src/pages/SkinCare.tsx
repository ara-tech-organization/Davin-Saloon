import { useEffect } from 'react';
import { assetUrl as img } from '../lib/asset';
import { useLanguage } from '../contexts/LanguageContext';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Hero,
  Eyebrow,
  GoldButton,
  SectionHeading,
  SplitMedia,
  TiltTags,
  FaqAccordion,
  ClosingCta,
  useReveal,
  handleScatterTiltMove,
  handleScatterTiltLeave,
} from '../components/services/premium';

type Bi = Record<'en' | 'ml', string>;

const META_TITLE = 'Skin Care Services in Kochi | DAVIN Beauty Salon';
const META_DESCRIPTION =
  'Reveal your best skin at DAVIN Beauty Salon, Kochi. Our skilled therapists provide personalized skin care treatments for a flawless, healthy glow.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Skin Care Services',
  provider: {
    '@type': 'BeautySalon',
    name: 'DAVIN Beauty Salon',
    telephone: '+918089069996',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu',
      addressLocality: 'Kaloor, Kochi',
      postalCode: '682025',
    },
  },
  serviceType: ['Facial', 'Clean-Up', 'Waxing', 'Threading', 'De-Tan Treatment', 'Skin Brightening', 'Gold Facial', 'Fruit Facial'],
  areaServed: 'Kochi, Ernakulam, Kerala',
};

const SERVICES: {
  n: string;
  title: Bi;
  kicker: Bi;
  image: string;
  imageAlt: Bi;
  body: Bi;
  available?: Bi;
  note?: Bi;
}[] = [
  {
    n: '01',
    title: { en: 'Facials in Kochi', ml: 'കൊച്ചിയിലെ ഫേഷ്യലുകൾ' },
    kicker: { en: 'Professional Facials for Every Skin Type at DAVIN', ml: 'DAVIN-ൽ എല്ലാ ചർമ്മ തരത്തിനും പ്രൊഫഷണൽ ഫേഷ്യലുകൾ' },
    image: img('/images/service-skin.jpg'),
    imageAlt: {
      en: 'Professional facial treatment at DAVIN Beauty Salon Kaloor',
      ml: 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ പ്രൊഫഷണൽ ഫേഷ്യൽ ട്രീറ്റ്മെന്റ്',
    },
    body: {
      en:
        "At DAVIN, the leading skin care salon in Kaloor, our professional facial menu is thoughtfully designed to address every concern from daily dullness and dehydration to pigmentation, premature ageing, and acne. Every facial in Kochi at DAVIN is a structured, multi-step ritual delivered by trained therapists using premium, clinically chosen formulations leaving skin refreshed, luminous, and visibly healthier after every session.\n\nWhether you're searching for a skin brightening facial near you in Kochi, a deep-cleansing skin detox facial in Kerala, or a targeted glow treatment in Kochi, our facial menu has the perfect option for your skin.",
      ml:
        'കാലൂരിലെ പ്രമുഖ സ്കിൻ കെയർ സലോണായ DAVIN-ൽ, ദിവസേനയുള്ള മടുപ്പും ജലാംശക്കുറവും മുതൽ പിഗ്മെന്റേഷൻ, അകാല വാർദ്ധക്യം, മുഖക്കുരു വരെ എല്ലാ പ്രശ്നങ്ങളും പരിഹരിക്കാൻ ശ്രദ്ധാപൂർവ്വം രൂപകൽപ്പന ചെയ്ത ഫേഷ്യൽ മെനു ഞങ്ങളുടെ പക്കലുണ്ട്. DAVIN-ലെ ഓരോ ഫേഷ്യലും പരിശീലനം സിദ്ധിച്ച തെറാപ്പിസ്റ്റുകൾ, ക്ലിനിക്കലായി തിരഞ്ഞെടുത്ത പ്രീമിയം ഫോർമുലേഷനുകൾ ഉപയോഗിച്ച് നടത്തുന്ന ഘടനാപരമായ, മൾട്ടി-സ്റ്റെപ്പ് ചടങ്ങാണ് — ഓരോ സെഷനുശേഷവും ചർമ്മം പുതുമയുള്ളതും തിളക്കമുള്ളതും കൂടുതൽ ആരോഗ്യകരവുമായി മാറും.\n\nകൊച്ചിയിൽ സ്കിൻ ബ്രൈറ്റനിംഗ് ഫേഷ്യൽ ആണോ, കേരളത്തിൽ ആഴത്തിലുള്ള ക്ലീൻസിംഗ് സ്കിൻ ഡിടോക്സ് ഫേഷ്യൽ ആണോ, അതോ കൊച്ചിയിൽ ലക്ഷ്യബോധത്തോടെയുള്ള ഗ്ലോ ട്രീറ്റ്മെന്റ് ആണോ നിങ്ങൾ തിരയുന്നത് — ഞങ്ങളുടെ ഫേഷ്യൽ മെനുവിൽ നിങ്ങളുടെ ചർമ്മത്തിന് അനുയോജ്യമായ ഓപ്ഷൻ ഉണ്ട്.',
    },
    available: {
      en:
        'Classic Clean-Up · Gold Facial · Fruit Facial · Pearl Facial · De-Pigmentation Facial · Anti-Aging Facial · Hydrating & Glow Facial · Acne & Oily Skin Facial',
      ml:
        'ക്ലാസിക് ക്ലീൻ-അപ്പ് · ഗോൾഡ് ഫേഷ്യൽ · ഫ്രൂട്ട് ഫേഷ്യൽ · പേൾ ഫേഷ്യൽ · ഡി-പിഗ്മെന്റേഷൻ ഫേഷ്യൽ · ആന്റി-ഏജിംഗ് ഫേഷ്യൽ · ഹൈഡ്രേറ്റിംഗ് & ഗ്ലോ ഫേഷ്യൽ · മുഖക്കുരു & എണ്ണമയമുള്ള ചർമ്മ ഫേഷ്യൽ',
    },
  },
  {
    n: '02',
    title: { en: 'Skin Clean-Ups in Kochi', ml: 'കൊച്ചിയിലെ സ്കിൻ ക്ലീൻ-അപ്പുകൾ' },
    kicker: { en: 'Quick, Effective Face Clean-Up at DAVIN', ml: 'DAVIN-ൽ വേഗത്തിലുള്ളതും ഫലപ്രദവുമായ ഫേസ് ക്ലീൻ-അപ്പ്' },
    image: img('/images/salon-interior.jpg'),
    imageAlt: {
      en: 'Skin clean-up treatment room at DAVIN Beauty Salon Kaloor',
      ml: 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ സ്കിൻ ക്ലീൻ-അപ്പ് ട്രീറ്റ്മെന്റ് റൂം',
    },
    body: {
      en:
        'A fast, effective face clean-up in Kaloor — skin that looks refreshed in under an hour.\n\nFor clients with a busy lifestyle, our professional skin clean-up in Kochi is the ideal way to keep skin consistently clear and healthy between deeper facial appointments. In just 30–40 minutes at our skin care salon in Kaloor, your skin is cleansed, exfoliated, extracted, toned, and moisturized leaving you looking noticeably fresh and put-together.\n\nSuitable for all skin types and equally popular with men and women, the face clean-up in Kochi at DAVIN is one of our most-booked treatments loved for its immediate results and unbeatable value.',
      ml:
        'കാലൂരിലെ വേഗത്തിലുള്ളതും ഫലപ്രദവുമായ ഫേസ് ക്ലീൻ-അപ്പ് — ഒരു മണിക്കൂറിനുള്ളിൽ പുതുമയുള്ള ചർമ്മം.\n\nതിരക്കേറിയ ജീവിതശൈലിയുള്ള ക്ലയന്റുകൾക്ക്, ആഴത്തിലുള്ള ഫേഷ്യൽ അപ്പോയിന്റ്മെന്റുകൾക്കിടയിൽ ചർമ്മം സ്ഥിരമായി വ്യക്തവും ആരോഗ്യകരവുമായി നിലനിർത്താൻ ഞങ്ങളുടെ പ്രൊഫഷണൽ സ്കിൻ ക്ലീൻ-അപ്പ് അനുയോജ്യമായ മാർഗ്ഗമാണ്. കാലൂരിലെ ഞങ്ങളുടെ സ്കിൻ കെയർ സലോണിൽ വെറും 30–40 മിനിറ്റിനുള്ളിൽ, നിങ്ങളുടെ ചർമ്മം ക്ലീൻസ് ചെയ്യുകയും, എക്സ്ഫോളിയേറ്റ് ചെയ്യുകയും, എക്സ്ട്രാക്റ്റ് ചെയ്യുകയും, ടോൺ ചെയ്യുകയും, മോയ്സ്ചറൈസ് ചെയ്യുകയും ചെയ്യുന്നു — ശ്രദ്ധേയമായി പുതുമയും ഒതുക്കവും തോന്നിക്കുന്ന രീതിയിൽ.\n\nഎല്ലാ ചർമ്മ തരത്തിനും അനുയോജ്യവും സ്ത്രീപുരുഷന്മാർക്കിടയിൽ ഒരുപോലെ പ്രിയപ്പെട്ടതുമായ DAVIN-ലെ ഫേസ് ക്ലീൻ-അപ്പ്, തൽക്ഷണ ഫലങ്ങളും മികച്ച മൂല്യവും കാരണം ഏറ്റവും കൂടുതൽ ബുക്ക് ചെയ്യപ്പെടുന്ന ട്രീറ്റ്മെന്റുകളിൽ ഒന്നാണ്.',
    },
  },
  {
    n: '03',
    title: { en: 'De-Tan Treatment in Kochi', ml: 'കൊച്ചിയിലെ ഡി-ടാൻ ട്രീറ്റ്മെന്റ്' },
    kicker: { en: 'Restore Your Natural Skin Tone at DAVIN', ml: "DAVIN-ൽ നിങ്ങളുടെ സ്വാഭാവിക ചർമ്മ നിറം വീണ്ടെടുക്കൂ" },
    image: img('/images/salon-aerial.jpg'),
    imageAlt: {
      en: 'De-tan treatment at DAVIN Beauty Salon Kaloor',
      ml: 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ ഡി-ടാൻ ട്രീറ്റ്മെന്റ്',
    },
    body: {
      en:
        "Kerala's sunshine is beautiful. Sun-damaged, uneven skin? We fix that.\n\nProlonged sun exposure from outdoor work, beach outings, or daily commuting can leave skin visibly darker and dull. DAVIN's professional de-tan treatment in Kochi is precisely formulated to reverse sun-induced pigmentation and uneven tone gently lightening tanned areas and restoring your skin's natural, healthy complexion. Using dermatologically approved formulations with kojic acid, turmeric extracts, and gentle AHAs, our de-tan treatment in Kaloor exfoliates pigmented cells, brightens the underlying skin, and reveals a fresher, more radiant finish.",
      ml:
        'കേരളത്തിന്റെ വെയിൽ മനോഹരമാണ്. വെയിലേറ്റ്, അസമമായ ചർമ്മമോ? ഞങ്ങൾ അത് പരിഹരിക്കും.\n\nപുറംജോലി, ബീച്ച് സന്ദർശനങ്ങൾ, അല്ലെങ്കിൽ ദിവസേനയുള്ള യാത്ര എന്നിവയിൽ നിന്നുള്ള ദീർഘനേരത്തെ വെയിലേൽക്കൽ ചർമ്മത്തെ പ്രകടമായി ഇരുണ്ടതും മ്ലാനവുമാക്കാം. DAVIN-ന്റെ പ്രൊഫഷണൽ ഡി-ടാൻ ട്രീറ്റ്മെന്റ് വെയിൽ മൂലമുള്ള പിഗ്മെന്റേഷനും അസമമായ നിറവും തിരിച്ചെടുക്കാൻ കൃത്യമായി രൂപകൽപ്പന ചെയ്തതാണ് — ടാൻ ബാധിച്ച ഭാഗങ്ങൾ സൌമ്യമായി തെളിയിച്ച് നിങ്ങളുടെ ചർമ്മത്തിന്റെ സ്വാഭാവിക, ആരോഗ്യകരമായ നിറം വീണ്ടെടുക്കുന്നു. കോജിക് ആസിഡ്, മഞ്ഞൾ സത്ത്, സൌമ്യമായ AHA-കൾ എന്നിവ അടങ്ങിയ ഡെർമറ്റോളജിക്കലി അംഗീകൃത ഫോർമുലേഷനുകൾ ഉപയോഗിച്ച്, കാലൂരിലെ ഞങ്ങളുടെ ഡി-ടാൻ ട്രീറ്റ്മെന്റ് പിഗ്മെന്റഡ് കോശങ്ങളെ എക്സ്ഫോളിയേറ്റ് ചെയ്യുകയും, അടിയിലുള്ള ചർമ്മത്തെ തിളക്കമുള്ളതാക്കുകയും, കൂടുതൽ പുതുമയും തിളക്കവുമുള്ള ഫിനിഷ് നൽകുകയും ചെയ്യുന്നു.',
    },
    available: {
      en: 'Face & neck · Arms (half/full) · Legs (half/full) · Full body de-tan near Stadium Link Road',
      ml: 'മുഖവും കഴുത്തും · കൈകൾ (പകുതി/മുഴുവൻ) · കാലുകൾ (പകുതി/മുഴുവൻ) · സ്റ്റേഡിയം ലിങ്ക് റോഡിനടുത്ത് ഫുൾ ബോഡി ഡി-ടാൻ',
    },
  },
  {
    n: '04',
    title: { en: 'Waxing in Kochi', ml: 'കൊച്ചിയിലെ വാക്സിംഗ്' },
    kicker: { en: 'Smooth, Long-Lasting Hair Removal at DAVIN', ml: 'DAVIN-ൽ മിനുസമുള്ളതും ദീർഘനേരം നിലനിൽക്കുന്നതുമായ ഹെയർ റിമൂവൽ' },
    image: img('/images/salon-tools.jpg'),
    imageAlt: {
      en: 'Waxing service tools at DAVIN Beauty Salon Kaloor',
      ml: 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ വാക്സിംഗ് സേവന ഉപകരണങ്ങൾ',
    },
    body: {
      en:
        "Professional waxing in Kochi — precise, comfortable, and beautifully smooth.\n\nAt DAVIN, one of Kochi's most trusted waxing salons near Stadium Link Road, our professional waxing services in Kochi use premium, skin-conditioning formulations to deliver clean, long-lasting hair removal leaving skin silky smooth for 3–5 weeks. We use both soft and hard (stripless) wax, selecting the best formula per area and skin type for optimal comfort and results.",
      ml:
        'കൊച്ചിയിലെ പ്രൊഫഷണൽ വാക്സിംഗ് — കൃത്യവും സൌകര്യപ്രദവും മനോഹരമായി മിനുസമുള്ളതും.\n\nസ്റ്റേഡിയം ലിങ്ക് റോഡിനടുത്ത് കൊച്ചിയിലെ ഏറ്റവും വിശ്വസനീയമായ വാക്സിംഗ് സലോണുകളിൽ ഒന്നായ DAVIN-ൽ, ഞങ്ങളുടെ പ്രൊഫഷണൽ വാക്സിംഗ് സേവനങ്ങൾ പ്രീമിയം, ചർമ്മ-സൌഹൃദ ഫോർമുലേഷനുകൾ ഉപയോഗിച്ച് 3–5 ആഴ്ചത്തേക്ക് പട്ടുപോലെ മിനുസമുള്ള, ദീർഘനേരം നിലനിൽക്കുന്ന ഹെയർ റിമൂവൽ നൽകുന്നു. മികച്ച സൌകര്യവും ഫലവും ലഭിക്കാൻ ഓരോ ഭാഗത്തിനും ചർമ്മ തരത്തിനും അനുയോജ്യമായ സോഫ്റ്റ്, ഹാർഡ് (സ്ട്രിപ്‌ലെസ്) വാക്സ് ഞങ്ങൾ ഉപയോഗിക്കുന്നു.',
    },
    available: {
      en:
        'Facial waxing (upper lip, chin, forehead, sideburns, full face) · Body waxing (arms, legs, underarms, back, stomach) · Full body waxing near Stadium Link Road',
      ml:
        'ഫേഷ്യൽ വാക്സിംഗ് (മുകളിലെ ചുണ്ട്, താടി, നെറ്റി, സൈഡ്ബേൺസ്, മുഴുവൻ മുഖം) · ബോഡി വാക്സിംഗ് (കൈകൾ, കാലുകൾ, കക്ഷം, മുതുക്, വയർ) · സ്റ്റേഡിയം ലിങ്ക് റോഡിനടുത്ത് ഫുൾ ബോഡി വാക്സിംഗ്',
    },
    note: {
      en: 'Single-use, hygienic wax application tools — for every client, every time.',
      ml: 'ഒറ്റത്തവണ ഉപയോഗിക്കുന്ന, ശുചിത്വമുള്ള വാക്സ് അപ്ലിക്കേഷൻ ഉപകരണങ്ങൾ — ഓരോ ക്ലയന്റിനും, എല്ലായ്പ്പോഴും.',
    },
  },
  {
    n: '05',
    title: { en: 'Threading in Kochi', ml: 'കൊച്ചിയിലെ ത്രെഡിംഗ്' },
    kicker: { en: 'Eyebrow Shaping & Facial Threading at DAVIN', ml: 'DAVIN-ൽ ഐബ്രോ ഷേപ്പിംഗും ഫേഷ്യൽ ത്രെഡിംഗും' },
    image: img('/images/gallery-grooming.jpg'),
    imageAlt: {
      en: 'Eyebrow threading service at DAVIN Beauty Salon Kaloor',
      ml: 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ ഐബ്രോ ത്രെഡിംഗ് സേവനം',
    },
    body: {
      en:
        "Precise brows. Defined features. Flawless results — every visit.\n\nThreading in Kochi offers unmatched precision for facial shaping and brow definition. At DAVIN, our expert eyebrow threading specialists in Kochi shape brows, remove fine facial hair, and define your features with a level of accuracy waxing simply can't match. Our eyebrow threading in Kochi is gentle on even the most sensitive skin — chemical-free, heat-free, and always leaving a crisp, clean finish.",
      ml:
        'കൃത്യമായ പുരികങ്ങൾ. വ്യക്തമായ ഫീച്ചറുകൾ. കുറ്റമറ്റ ഫലങ്ങൾ — ഓരോ സന്ദർശനത്തിലും.\n\nകൊച്ചിയിലെ ത്രെഡിംഗ് ഫേഷ്യൽ ഷേപ്പിംഗിനും പുരികം രൂപപ്പെടുത്തുന്നതിനും അതുല്യമായ കൃത്യത നൽകുന്നു. DAVIN-ൽ, ഞങ്ങളുടെ വിദഗ്ദ്ധ ഐബ്രോ ത്രെഡിംഗ് സ്പെഷ്യലിസ്റ്റുകൾ പുരികങ്ങൾ രൂപപ്പെടുത്തുകയും, നേർത്ത ഫേഷ്യൽ രോമങ്ങൾ നീക്കം ചെയ്യുകയും, വാക്സിംഗിന് പൊരുത്തപ്പെടുത്താൻ കഴിയാത്ത കൃത്യതയോടെ നിങ്ങളുടെ ഫീച്ചറുകൾ വ്യക്തമാക്കുകയും ചെയ്യുന്നു. ഏറ്റവും സെൻസിറ്റീവായ ചർമ്മത്തിനുപോലും ഇണങ്ങുന്നതാണ് കൊച്ചിയിലെ ഞങ്ങളുടെ ഐബ്രോ ത്രെഡിംഗ് — കെമിക്കൽ ഇല്ലാത്തതും, ചൂട് ഇല്ലാത്തതും, എപ്പോഴും വ്യക്തവും വൃത്തിയുള്ളതുമായ ഫിനിഷ് നൽകുന്നതും.',
    },
    available: {
      en: 'Eyebrow threading & shaping · Upper lip · Chin · Full face · Forehead',
      ml: 'ഐബ്രോ ത്രെഡിംഗ് & ഷേപ്പിംഗ് · മുകളിലെ ചുണ്ട് · താടി · മുഴുവൻ മുഖം · നെറ്റി',
    },
    note: {
      en:
        "Well-shaped brows transform your entire face — our eyebrow threading specialists in Kochi know exactly how to complement your unique features.",
      ml:
        'നന്നായി രൂപപ്പെടുത്തിയ പുരികങ്ങൾ നിങ്ങളുടെ മുഴുവൻ മുഖത്തെയും മാറ്റിമറിക്കുന്നു — കൊച്ചിയിലെ ഞങ്ങളുടെ ഐബ്രോ ത്രെഡിംഗ് സ്പെഷ്യലിസ്റ്റുകൾക്ക് നിങ്ങളുടെ അതുല്യമായ ഫീച്ചറുകൾ എങ്ങനെ പൂരകമാക്കാമെന്ന് കൃത്യമായി അറിയാം.',
    },
  },
];

const DIFFERENCE_PILLARS = {
  en: [
    {
      title: 'Skilled Therapists',
      description: 'Experienced hands who listen first — every session begins with a real conversation about your skin, not a generic routine.',
    },
    {
      title: 'Premium Products',
      description: 'Every formula on our shelves is chosen for safety and efficacy, never for margin, so results show without compromising your skin.',
    },
    {
      title: 'Personalized Protocols',
      description: "Your skin is assessed before treatment begins and every protocol is adapted to your specific type and concerns — visit by visit.",
    },
    {
      title: 'Consistent Visible Results',
      description: 'No shortcuts, no generic formulas — just a skin care experience in Kochi built around a long-term relationship with your skin.',
    },
  ],
  ml: [
    {
      title: 'വിദഗ്ദ്ധ തെറാപ്പിസ്റ്റുകൾ',
      description: 'ആദ്യം ശ്രദ്ധയോടെ കേൾക്കുന്ന പരിചയസമ്പന്നരായ കൈകൾ — ഓരോ സെഷനും നിങ്ങളുടെ ചർമ്മത്തെക്കുറിച്ചുള്ള യഥാർത്ഥ സംഭാഷണത്തിലാണ് ആരംഭിക്കുന്നത്, സാധാരണ രീതിയിലല്ല.',
    },
    {
      title: 'പ്രീമിയം ഉൽപ്പന്നങ്ങൾ',
      description: 'ഞങ്ങളുടെ ഷെൽഫിലെ ഓരോ ഫോർമുലയും സുരക്ഷയ്ക്കും ഫലപ്രാപ്തിക്കും വേണ്ടിയാണ് തിരഞ്ഞെടുത്തിരിക്കുന്നത്, ലാഭത്തിനല്ല — ചർമ്മത്തെ വിട്ടുവീഴ്ച ചെയ്യാതെ ഫലങ്ങൾ കാണിക്കുന്നു.',
    },
    {
      title: 'വ്യക്തിഗതമാക്കിയ പ്രോട്ടോക്കോളുകൾ',
      description: 'ട്രീറ്റ്മെന്റ് ആരംഭിക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ ചർമ്മം വിലയിരുത്തുന്നു, ഓരോ പ്രോട്ടോക്കോളും നിങ്ങളുടെ പ്രത്യേക തരത്തിനും ആശങ്കകൾക്കും അനുസരിച്ച് ക്രമീകരിക്കുന്നു — ഓരോ സന്ദർശനത്തിലും.',
    },
    {
      title: 'സ്ഥിരമായ ദൃശ്യ ഫലങ്ങൾ',
      description: 'കുറുക്കുവഴികളില്ല, സാധാരണ ഫോർമുലകളില്ല — നിങ്ങളുടെ ചർമ്മവുമായി ദീർഘകാല ബന്ധം കെട്ടിപ്പടുക്കുന്ന ഒരു സ്കിൻ കെയർ അനുഭവം മാത്രം.',
    },
  ],
};

const FAQS: { q: Bi; a: Bi }[] = [
  {
    q: { en: 'How often should I get a facial in Kochi?', ml: 'കൊച്ചിയിൽ എത്ര തവണ ഫേഷ്യൽ ചെയ്യണം?' },
    a: {
      en:
        "A facial at DAVIN in Kochi every 3–4 weeks aligns with your skin's natural renewal cycle, delivering cumulative improvements in tone, texture, and radiance. Regular facials at our skin care salon in Kaloor are the most effective foundation for long-term skin health.",
      ml:
        'കൊച്ചിയിലെ DAVIN-ൽ ഓരോ 3–4 ആഴ്ചയിലും ഒരു ഫേഷ്യൽ ചെയ്യുന്നത് നിങ്ങളുടെ ചർമ്മത്തിന്റെ സ്വാഭാവിക പുനരുജ്ജീവന ചക്രവുമായി യോജിക്കുകയും നിറം, ടെക്സ്ചർ, തിളക്കം എന്നിവയിൽ ക്രമാനുഗതമായ പുരോഗതി നൽകുകയും ചെയ്യുന്നു. കാലൂരിലെ ഞങ്ങളുടെ സ്കിൻ കെയർ സലോണിലെ പതിവ് ഫേഷ്യലുകൾ ദീർഘകാല ചർമ്മ ആരോഗ്യത്തിന് ഏറ്റവും ഫലപ്രദമായ അടിത്തറയാണ്.',
    },
  },
  {
    q: {
      en: 'Which facial is best for oily or acne-prone skin in Kochi?',
      ml: 'കൊച്ചിയിൽ എണ്ണമയമുള്ളതോ മുഖക്കുരു ഉള്ളതോ ആയ ചർമ്മത്തിന് ഏത് ഫേഷ്യൽ ആണ് ഏറ്റവും നല്ലത്?',
    },
    a: {
      en:
        'We recommend our Acne & Oily Skin Facial is our most targeted skin detox facial in Kochi or our Classic Clean-Up for regular maintenance. Our therapist at our facial salon in Kochi will assess your skin and recommend the right treatment.',
      ml:
        'ഞങ്ങളുടെ ഏറ്റവും ലക്ഷ്യബോധത്തോടെയുള്ള സ്കിൻ ഡിടോക്സ് ഫേഷ്യലായ മുഖക്കുരു & എണ്ണമയമുള്ള ചർമ്മ ഫേഷ്യൽ, അല്ലെങ്കിൽ പതിവ് പരിപാലനത്തിന് ക്ലാസിക് ക്ലീൻ-അപ്പ് ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു. കൊച്ചിയിലെ ഞങ്ങളുടെ ഫേഷ്യൽ സലോണിലെ തെറാപ്പിസ്റ്റ് നിങ്ങളുടെ ചർമ്മം വിലയിരുത്തി ശരിയായ ട്രീറ്റ്മെന്റ് ശുപാർശ ചെയ്യും.',
    },
  },
  {
    q: { en: 'Does waxing in Kochi hurt?', ml: 'കൊച്ചിയിലെ വാക്സിംഗ് വേദനിക്കുമോ?' },
    a: {
      en:
        'There is a brief sensation during waxing in Kochi, but our therapists use premium, skin-conditioning formulations and expert technique to minimize discomfort. Most clients find each subsequent waxing session at DAVIN, Kaloor progressively more comfortable.',
      ml:
        'കൊച്ചിയിലെ വാക്സിംഗ് സമയത്ത് ഒരു ചെറിയ അനുഭവം ഉണ്ടാകും, എന്നാൽ അസ്വസ്ഥത കുറയ്ക്കാൻ ഞങ്ങളുടെ തെറാപ്പിസ്റ്റുകൾ പ്രീമിയം, ചർമ്മ-സൌഹൃദ ഫോർമുലേഷനുകളും വിദഗ്ദ്ധ സാങ്കേതികതയും ഉപയോഗിക്കുന്നു. കാലൂരിലെ DAVIN-ൽ തുടർച്ചയായ ഓരോ വാക്സിംഗ് സെഷനും കൂടുതൽ സൌകര്യപ്രദമായി തോന്നുന്നു എന്ന് മിക്ക ക്ലയന്റുകളും പറയുന്നു.',
    },
  },
  {
    q: { en: 'How long does eyebrow threading last in Kochi?', ml: 'കൊച്ചിയിൽ ഐബ്രോ ത്രെഡിംഗ് എത്രകാലം നിലനിൽക്കും?' },
    a: {
      en:
        'Eyebrow threading in Kochi typically lasts 2–4 weeks. We recommend visiting our threading salon in Kaloor every 2–3 weeks to keep brows consistently defined and perfectly shaped.',
      ml:
        'കൊച്ചിയിലെ ഐബ്രോ ത്രെഡിംഗ് സാധാരണയായി 2–4 ആഴ്ച നിലനിൽക്കും. പുരികങ്ങൾ സ്ഥിരമായി വ്യക്തവും കൃത്യമായി രൂപപ്പെടുത്തിയതുമായി നിലനിർത്താൻ കാലൂരിലെ ഞങ്ങളുടെ ത്രെഡിംഗ് സലോൺ ഓരോ 2–3 ആഴ്ചയിലും സന്ദർശിക്കാൻ ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു.',
    },
  },
  {
    q: {
      en: 'Is the de-tan treatment in Kochi safe for all skin types?',
      ml: 'കൊച്ചിയിലെ ഡി-ടാൻ ട്രീറ്റ്മെന്റ് എല്ലാ ചർമ്മ തരത്തിനും സുരക്ഷിതമാണോ?',
    },
    a: {
      en:
        'Yes, our de-tan treatment in Kochi is safe for all skin tones, including wheatish and deeper complexions common across Kerala. Inform your therapist of any sensitivities before the session for the most appropriate formulation.',
      ml:
        'അതെ, കേരളത്തിലുടനീളം സാധാരണമായ ഗോതമ്പ് നിറവും കൂടുതൽ ഇരുണ്ട നിറവും ഉൾപ്പെടെ എല്ലാ ചർമ്മ നിറങ്ങൾക്കും ഞങ്ങളുടെ ഡി-ടാൻ ട്രീറ്റ്മെന്റ് സുരക്ഷിതമാണ്. ഏറ്റവും അനുയോജ്യമായ ഫോർമുലേഷനുവേണ്ടി സെഷനുമുമ്പ് എന്തെങ്കിലും സെൻസിറ്റിവിറ്റി ഉണ്ടെങ്കിൽ നിങ്ങളുടെ തെറാപ്പിസ്റ്റിനെ അറിയിക്കുക.',
    },
  },
  {
    q: {
      en: 'What is the difference between a facial and a skin clean-up?',
      ml: 'ഫേഷ്യലും സ്കിൻ ക്ലീൻ-അപ്പും തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?',
    },
    a: {
      en:
        'A skin clean-up in Kochi is a 30–40 minute maintenance treatment such as cleansing, exfoliating, and refreshing. A full facial in Kochi is a comprehensive, multi-step therapy targeting specific concerns like ageing, pigmentation, or acne. Our therapists at this skin care parlour in Ernakulam will guide you to the right choice.',
      ml:
        'കൊച്ചിയിലെ സ്കിൻ ക്ലീൻ-അപ്പ് ക്ലീൻസിംഗ്, എക്സ്ഫോളിയേറ്റിംഗ്, റിഫ്രഷിംഗ് പോലുള്ള 30–40 മിനിറ്റ് ദൈർഘ്യമുള്ള ഒരു മെയിന്റനൻസ് ട്രീറ്റ്മെന്റാണ്. കൊച്ചിയിലെ ഒരു മുഴുവൻ ഫേഷ്യൽ, വാർദ്ധക്യം, പിഗ്മെന്റേഷൻ, മുഖക്കുരു തുടങ്ങിയ പ്രത്യേക പ്രശ്നങ്ങളെ ലക്ഷ്യമിടുന്ന സമഗ്രവും മൾട്ടി-സ്റ്റെപ്പുമായ തെറാപ്പിയാണ്. എറണാകുളത്തെ ഈ സ്കിൻ കെയർ പാർലറിലെ ഞങ്ങളുടെ തെറാപ്പിസ്റ്റുകൾ ശരിയായ തിരഞ്ഞെടുപ്പിലേക്ക് നിങ്ങളെ നയിക്കും.',
    },
  },
];

function useMetaTags(title: string, description: string, schema?: object) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = metaDescription?.content ?? '';
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    let schemaTag: HTMLScriptElement | null = null;
    if (schema) {
      schemaTag = document.createElement('script');
      schemaTag.type = 'application/ld+json';
      schemaTag.text = JSON.stringify(schema);
      document.head.appendChild(schemaTag);
    }

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
      if (metaDescription) metaDescription.content = prevDescription;
      if (schemaTag) document.head.removeChild(schemaTag);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [title, description, schema]);
}

function Intro() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  const stripRef = useReveal<HTMLDivElement>();

  const strip = [
    {
      src: '/images/salon-tools.jpg',
      alt: {
        en: 'Professional skin care tools at DAVIN Beauty Salon Kaloor Kochi',
        ml: 'കൊച്ചി കാലൂരിലെ DAVIN ബ്യൂട്ടി സലോണിലെ പ്രൊഫഷണൽ സ്കിൻ കെയർ ഉപകരണങ്ങൾ',
      },
    },
    {
      src: '/images/salon-aerial.jpg',
      alt: {
        en: 'DAVIN Beauty Salon treatment space in Kaloor, Kochi',
        ml: 'കൊച്ചി കാലൂരിലെ DAVIN ബ്യൂട്ടി സലോണിന്റെ ട്രീറ്റ്മെന്റ് സ്പേസ്',
      },
    },
    {
      src: '/images/gallery-grooming.jpg',
      alt: {
        en: 'Waxing and threading services at DAVIN Beauty Salon Kaloor',
        ml: 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ വാക്സിംഗ്, ത്രെഡിംഗ് സേവനങ്ങൾ',
      },
    },
  ];

  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px 100px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          ref={ref}
          data-reveal-group
          className="p-grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 46%) minmax(320px, 1fr)',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className="img-zoom" style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', overflow: 'hidden' }}>
              <img
                src={img('/images/service-skin.jpg')}
                alt={language === 'ml' ? 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ സ്കിൻ കെയർ തെറാപ്പി റൂം' : 'Skin care therapy room at DAVIN Beauty Salon Kaloor'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
              />
            </div>
            <span
              style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--btn-fg)',
                background: 'var(--btn-bg)',
                padding: '6px 12px',
              }}
            >
              {language === 'ml' ? 'സ്ഥാപിതം 2020 · കാലൂർ' : 'Est. 2020 · Kaloor'}
            </span>
          </div>

          <div>
            <div style={{ marginBottom: 18 }}>
              <Eyebrow>{language === 'ml' ? 'കാലൂരിന്റെ സ്കിൻ അതോറിറ്റി' : "Kaloor's Skin Authority"}</Eyebrow>
            </div>
            <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 26px 0' }}>
              {language === 'ml'
                ? "കൊച്ചിയിലെ മികച്ച ഫേഷ്യൽ സലോണിൽ നിങ്ങളുടെ ഏറ്റവും തിളക്കമുള്ള ചർമ്മം കണ്ടെത്തൂ"
                : "Reveal Your Most Radiant Skin at Kochi's Best Facial Salon"}
            </h2>
            <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 20px 0', maxWidth: 560 }}>
              {language === 'ml'
                ? 'നിങ്ങളുടെ ചർമ്മം ലോകം ആദ്യം ശ്രദ്ധിക്കുന്ന കാര്യമാണ്, അതിന് വെറും അടിസ്ഥാന പരിചരണത്തിലും ഏറെ അർഹതയുണ്ട്. കൊച്ചിയിലെ ഏറ്റവും വിശ്വസനീയമായ സ്കിൻ കെയർ സലോണായ DAVIN ബ്യൂട്ടി സലോണിൽ, ഞങ്ങളുടെ വിദഗ്ദ്ധ സ്കിൻ തെറാപ്പിസ്റ്റുകൾ ഉപരിതല പരിചരണത്തിനും അപ്പുറം പോകുന്നു. കാലൂരിലെ ഞങ്ങളുടെ സലോണിലെ ഓരോ ഫേഷ്യലും, ഓരോ ഫേസ് ക്ലീൻ-അപ്പും, ഓരോ ഡി-ടാൻ ട്രീറ്റ്മെന്റും, ഓരോ വാക്സിംഗ്, ത്രെഡിംഗ് സേവനവും യഥാർത്ഥത്തിൽ ദൃശ്യമായതും നിലനിൽക്കുന്നതുമായ ഫലങ്ങൾ നൽകാൻ രൂപകൽപ്പന ചെയ്തതാണ് — തിളക്കമുള്ള ചർമ്മ നിറം, മിനുസമുള്ള ടെക്സ്ചർ, മെച്ചപ്പെട്ട പോറുകൾ, ഒരു ഫിൽട്ടറിനും പകർത്താനാവാത്ത സ്വാഭാവിക ഗ്ലോ.'
                : 'Your skin is the first thing the world sees and it deserves far better than a basic routine. At DAVIN Beauty Salon, the most trusted skin care salon in Kochi, our expert skin therapists go well beyond surface-level care. Every facial in Kochi, every face clean-up, every de-tan treatment, and every waxing and threading service in Kochi at our Kaloor salon is crafted to deliver genuinely visible, lasting results brighter skin tone, smoother texture, refined pores, and a natural glow treatment no filter can replicate.'}
            </p>
            <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 34px 0', maxWidth: 560 }}>
              {language === 'ml'
                ? 'എന്താണ് DAVIN-നെ കാലൂർ, കൊച്ചിയിലെ മികച്ച ഫേഷ്യൽ സലോൺ ആക്കുന്നത്? ഏതൊരു ട്രീറ്റ്മെന്റും ആരംഭിക്കുന്നതിന് മുമ്പ്, ഞങ്ങളുടെ തെറാപ്പിസ്റ്റുകൾ നിങ്ങളുടെ ചർമ്മ തരം വിലയിരുത്തുകയും, നിങ്ങളുടെ ആശങ്കകൾ മനസ്സിലാക്കുകയും, ഏറ്റവും ഫലപ്രദമായ പരിചരണ പ്രോട്ടോക്കോൾ വ്യക്തിപരമായി ശുപാർശ ചെയ്യുകയും ചെയ്യുന്നു — കാരണം ഒരു ക്ലയന്റിനും മറ്റൊരു ക്ലയന്റിന്റെ അതേ ചർമ്മം ഇല്ല, നിങ്ങളുടെ ട്രീറ്റ്മെന്റ് എപ്പോഴും അത് പ്രതിഫലിപ്പിക്കണം.'
                : 'What makes DAVIN the best facial salon in Kaloor, Kochi? Before any treatment begins, our therapists assess your skin type, understand your concerns, and personally recommend the most effective care protocol because no two clients have the same skin, and your treatment should always reflect that.'}
            </p>
            <GoldButton href="tel:+918089069996">{language === 'ml' ? 'ഇപ്പോൾ ബുക്ക് ചെയ്യൂ' : 'Book Now'}</GoldButton>
          </div>
        </div>

        <div
          ref={stripRef}
          data-reveal-group
          className="p-strip"
          style={{ width: '100%', marginTop: 72, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}
        >
          {strip.map((item) => (
            <div key={item.src} style={{ overflow: 'hidden' }}>
              <img
                src={img(item.src)}
                alt={item.alt[language]}
                className="img-zoom"
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ s, index }: { s: (typeof SERVICES)[number]; index: number }) {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  const tone = index % 2 === 0 ? 'p-light' : 'p-dark';
  const reverse = index % 2 === 1;
  const paragraphs = s.body[language].split('\n\n');
  return (
    <section className={tone} style={{ borderTop: index === 0 ? undefined : '1px solid var(--line)', padding: '90px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SplitMedia image={s.image} imageAlt={s.imageAlt[language]} badge={s.kicker[language]} reverse={reverse}>
          <SectionHeading numeral={s.n} title={s.title[language]} />
          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: i === paragraphs.length - 1 ? 0 : '0 0 16px 0', maxWidth: 560 }}>
              {p}
            </p>
          ))}
          {s.available && (
            <div style={{ marginTop: 24 }}>
              <TiltTags label={language === 'ml' ? 'ലഭ്യമായവ:' : 'Available:'} tags={s.available[language].split(' · ')} />
            </div>
          )}
          {s.note && <p style={{ fontSize: 11.5, fontStyle: 'italic', color: 'var(--fg-mute)', margin: '12px 0 0 0', maxWidth: 560 }}>{s.note[language]}</p>}
        </SplitMedia>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const { language } = useLanguage();
  const headRef = useReveal<HTMLDivElement>();
  return (
    <>
      <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px 0' }}>
        <div ref={headRef} data-reveal-group style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Eyebrow>{language === 'ml' ? 'ഞങ്ങളുടെ മെനു' : 'Our Menu'}</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', fontWeight: 400, margin: '18px 0 0' }}>
            {language === 'ml' ? 'കൊച്ചിയിലെ ഞങ്ങളുടെ വിദഗ്ദ്ധ സ്കിൻ കെയർ സേവനങ്ങൾ' : 'Our Expert Skin Care Services in Kochi'}
          </h2>
        </div>
      </section>
      {SERVICES.map((s, index) => (
        <ServiceRow key={s.n} s={s} index={index} />
      ))}
    </>
  );
}

const DIFFERENCE_TILT = [-5, 4, -4, 5] as const;

function DifferenceSection() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  const pillars = DIFFERENCE_PILLARS[language];
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <Eyebrow>{language === 'ml' ? 'വ്യത്യാസം' : 'The Difference'}</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 400, margin: '18px 0 0', textWrap: 'balance' }}>
            {language === 'ml'
              ? "DAVIN സ്കിൻ കെയർ വ്യത്യാസം — എന്തുകൊണ്ട് ഞങ്ങൾ കൊച്ചിയിലെ ഏറ്റവും വിശ്വസനീയമായ സ്കിൻ കെയർ സലോൺ ആണ്"
              : "The DAVIN Skin Care Difference — Why We're Kochi's Most Trusted Skin Care Salon"}
          </h2>
        </div>
        <div style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '28px 32px' }}>
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              data-rotate={DIFFERENCE_TILT[i % DIFFERENCE_TILT.length]}
              onMouseMove={handleScatterTiltMove}
              onMouseLeave={handleScatterTiltLeave}
              style={{
                background: '#000',
                color: '#fff',
                border: '1px solid #fff',
                padding: '28px 26px',
                width: 240,
                boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
                transform: `rotate(${DIFFERENCE_TILT[i % DIFFERENCE_TILT.length]}deg)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transition: 'transform 0.25s ease-out',
              }}
            >
              <h4
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  fontWeight: 400,
                  margin: '0 0 10px 0',
                }}
              >
                {pillar.title}
              </h4>
              <p style={{ fontSize: 12, lineHeight: '20px', margin: 0, color: 'rgba(255,255,255,0.65)' }}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  const items = FAQS.map((f) => ({ q: f.q[language], a: f.a[language] }));
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow>{language === 'ml' ? 'ഉത്തരങ്ങൾ' : 'Answers'}</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 400, margin: '18px 0 0' }}>
            {language === 'ml' ? 'സ്കിൻ കെയർ ചോദ്യങ്ങൾ' : 'Skin Care FAQs'}
          </h2>
        </div>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}

export default function SkinCare() {
  const { language } = useLanguage();
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA);

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow={language === 'ml' ? 'സ്കിൻ കെയർ — SC' : 'Skin Care — SC'}
          title={
            language === 'ml'
              ? 'ഗ്ലോ ചെയ്യൂ, പുനരുജ്ജീവിപ്പിക്കൂ, തിളങ്ങൂ — DAVIN ബ്യൂട്ടി സലോൺ, കാലൂരിൽ'
              : 'Glow, Revive & Radiate at DAVIN Beauty Salon, Kaloor'
          }
          subline={
            language === 'ml'
              ? "ഫേഷ്യലുകൾ · ക്ലീൻ-അപ്പുകൾ · വാക്സിംഗ് · ത്രെഡിംഗ് · ഡി-ടാൻ — തിളങ്ങുന്ന ചർമ്മം ഉറപ്പ്, കൊച്ചിയിലെ ഏറ്റവും വിശ്വസനീയമായ സ്കിൻ കെയർ സലോൺ"
              : "Facials · Clean-ups · Waxing · Threading · De-Tan — Glowing skin guaranteed, Kochi's most trusted skin care salon"
          }
          image={img("/images/service-skin.jpg")}
          imageAlt={
            language === 'ml'
              ? 'DAVIN ബ്യൂട്ടി സലോൺ കാലൂരിലെ ഫേഷ്യൽ, സ്കിൻ കെയർ സേവനങ്ങൾ'
              : 'Facial and skin care services at DAVIN Beauty Salon Kaloor'
          }
        />
        <Intro />
        <ServicesGrid />
        <DifferenceSection />
        <FaqSection />
        <ClosingCta
          title={language === 'ml' ? 'DAVIN-ൽ നിങ്ങളുടെ സ്കിൻ കെയർ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ' : 'Book Your Skin Care Appointment at DAVIN'}
          body={
            language === 'ml'
              ? 'കൊച്ചിയിലെ ഏറ്റവും വിശ്വസനീയമായ സ്കിൻ കെയർ സലോണിൽ, തിളക്കമുള്ള ചർമ്മം വെറും ഒരു അപ്പോയിന്റ്മെന്റ് അകലെയാണ്. കാലൂരിലെ നിങ്ങളുടെ ആദ്യ ഫേഷ്യൽ ആയാലും, കൊച്ചിയിലെ ഡി-ടാൻ ട്രീറ്റ്മെന്റ് ആയാലും, സ്റ്റേഡിയം ലിങ്ക് റോഡിനടുത്തുള്ള പ്രൊഫഷണൽ വാക്സിംഗും ത്രെഡിംഗും ആയാലും, ശരിക്കും ആകർഷിക്കുന്ന ഫലങ്ങൾ നൽകാൻ ഞങ്ങളുടെ വിദഗ്ദ്ധ തെറാപ്പിസ്റ്റുകൾ തയ്യാറാണ്.'
              : "Radiant, glowing skin is just one appointment away at the most trusted skin care salon in Kochi. Whether it's your first facial in Kaloor, a de-tan treatment in Kochi, or professional waxing and threading near Stadium Link Road, our expert therapists are ready to deliver results that genuinely impress."
          }
          crossLinks={[
            { label: language === 'ml' ? 'കൊച്ചിയിലെ ഹെയർ കെയർ →' : 'Hair Care in Kochi →', href: '/services/hair-care' },
            { label: language === 'ml' ? 'കാലൂരിലെ നെയിൽ ആർട്ട് & ഗ്രൂമിംഗ് →' : 'Nail Art & Grooming in Kaloor →', href: '/services/nails-grooming' },
            { label: language === 'ml' ? 'കൊച്ചിയിലെ ബ്രൈഡൽ & പാർട്ടി മേക്കപ്പ് →' : 'Bridal & Party Makeup in Kochi →', href: '/services/makeup' },
            { label: language === 'ml' ? 'ഞങ്ങളുടെ ഗാലറി കാണൂ →' : 'View Our Gallery →', href: '/gallery' },
          ]}
        />
      </div>
      <Footer />
    </>
  );
}
