import { useEffect, useState } from 'react';
import { assetUrl as img } from '../lib/asset';
import { useLanguage } from '../contexts/LanguageContext';
import CustomCursor from '../components/CustomCursor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Hero,
  CenteredIntro,
  SectionBand,
  SectionHeading,
  TiltTags,
  TiltFrame,
  FlipCard,
  FaqAccordion,
  ClosingCta,
  Eyebrow,
  useReveal,
  TabSwitcher,
  TabPanel,
} from '../components/services/premium';

type Lang = 'en' | 'ml';

const META_TITLE = 'Nail Art & Grooming in Kochi | DAVIN Beauty Salon';
const META_DESCRIPTION =
  'Get stunning nail art & grooming services at DAVIN Beauty Salon, Kochi. Manicures, pedicures, nail extensions & more for perfectly polished nails.';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Nails & Grooming Services',
  provider: {
    '@type': 'BeautySalon',
    name: 'DAVIN Beauty Salon',
    telephone: '+918089069996',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stadium Link Road, Kathrikadavu',
      addressLocality: 'Kaloor, Kochi',
      postalCode: '682025',
    },
  },
  serviceType: ['Manicure', 'Pedicure', 'Nail Art', 'Gel Extensions', 'Acrylic Nails', 'Beard Grooming', "Men's Grooming"],
  areaServed: 'Kochi, Ernakulam, Kerala',
};

const HERO_TEXT = {
  eyebrow: { en: 'Nails & Grooming — NG', ml: 'നെയിൽസ് & ഗ്രൂമിംഗ് — NG' },
  title: { en: 'Pamper Your Hands, Feet & Look at DAVIN', ml: 'DAVIN-ൽ നിങ്ങളുടെ കൈകളും കാലുകളും ലുക്കും പരിപാലിക്കൂ' },
  subline: {
    en: 'Manicure · Pedicure · Nail Art · Extensions · Beard — Pamper your hands & feet',
    ml: 'മാനിക്യൂർ · പെഡിക്യൂർ · നെയിൽ ആർട്ട് · എക്സ്റ്റൻഷനുകൾ · ബിയേഡ് — നിങ്ങളുടെ കൈകളും കാലുകളും പരിപാലിക്കൂ',
  },
  imageAlt: {
    en: 'Nail art, manicure and pedicure at DAVIN Beauty Salon Kochi',
    ml: 'കൊച്ചിയിലെ DAVIN ബ്യൂട്ടി സലോണിലെ നെയിൽ ആർട്ട്, മാനിക്യൂർ, പെഡിക്യൂർ',
  },
};

const INTRO_TEXT = {
  eyebrow: { en: "Kaloor's Nail Authority", ml: 'കാലൂരിലെ നെയിൽ അതോറിറ്റി' },
  title: { en: 'Because the Details Make All the Difference', ml: 'കാരണം വിശദാംശങ്ങളാണ് എല്ലാ വ്യത്യാസവും സൃഷ്ടിക്കുന്നത്' },
  paragraphs: {
    en: [
      "Your hands appear in every selfie, every handshake, and every moment of your day they deserve to look exceptional. At DAVIN Beauty Salon, Kaloor's most trusted nail salon in Kochi, we believe manicure, pedicure, nail art, and grooming services aren't optional extras, they're an essential part of looking and feeling your absolute best. Our nail technicians and grooming specialists in Kochi bring creative passion, technical precision, and strict hygiene standards to every service, delivering results that are as relaxing as they are impressive.",
    ],
    ml: [
      'നിങ്ങളുടെ കൈകൾ ഓരോ സെൽഫിയിലും, ഓരോ ഹസ്തദാനത്തിലും, ദിവസത്തിലെ ഓരോ നിമിഷത്തിലും കാണപ്പെടുന്നു — അവ മികച്ചതായി കാണപ്പെടേണ്ടതാണ്. കൊച്ചിയിലെ കാലൂരിലുള്ള ഏറ്റവും വിശ്വസനീയമായ നെയിൽ സലോൺ ആയ DAVIN Beauty Salon-ൽ, മാനിക്യൂർ, പെഡിക്യൂർ, നെയിൽ ആർട്ട്, ഗ്രൂമിംഗ് സേവനങ്ങൾ ഐച്ഛികമായ അധിക കാര്യങ്ങളല്ല, മറിച്ച് നിങ്ങൾക്ക് ഏറ്റവും മികച്ചതായി കാണപ്പെടാനും അനുഭവപ്പെടാനും അത്യന്താപേക്ഷിതമായ ഭാഗമാണെന്ന് ഞങ്ങൾ വിശ്വസിക്കുന്നു. കൊച്ചിയിലെ ഞങ്ങളുടെ നെയിൽ ടെക്നീഷ്യൻമാരും ഗ്രൂമിംഗ് വിദഗ്ധരും ഓരോ സേവനത്തിലും സർഗ്ഗാത്മക അഭിനിവേശം, സാങ്കേതിക കൃത്യത, കർശനമായ ശുചിത്വ നിലവാരം എന്നിവ ഉറപ്പാക്കുന്നു, ഫലങ്ങൾ ആശ്വാസകരവും അതിശയിപ്പിക്കുന്നതുമായിരിക്കും.',
    ],
  },
};

const SECTION_BAND_TEXT = { en: 'Our Nails & Grooming Services', ml: 'ഞങ്ങളുടെ നെയിൽസ് & ഗ്രൂമിംഗ് സേവനങ്ങൾ' };

const SCROLL_STORY_TEXT = {
  eyebrow: { en: 'Choose a Service', ml: 'ഒരു സേവനം തിരഞ്ഞെടുക്കൂ' },
  title: { en: 'Nails & Grooming, Service by Service', ml: 'നെയിൽസ് & ഗ്രൂമിംഗ്, ഓരോ സേവനവും' },
};

const TABS_TEXT = [
  { key: 'manicure', label: { en: 'Manicure', ml: 'മാനിക്യൂർ' } },
  { key: 'pedicure', label: { en: 'Pedicure', ml: 'പെഡിക്യൂർ' } },
  { key: 'nailart', label: { en: 'Nail Art', ml: 'നെയിൽ ആർട്ട്' } },
  { key: 'extensions', label: { en: 'Extensions', ml: 'എക്സ്റ്റൻഷനുകൾ' } },
  { key: 'grooming', label: { en: 'Grooming', ml: 'ഗ്രൂമിംഗ്' } },
] as const;

const MANICURE_PANEL_TEXT = {
  imageAlt: {
    en: 'Manicure and nail art detail at DAVIN Beauty Salon Kochi',
    ml: 'കൊച്ചിയിലെ DAVIN ബ്യൂട്ടി സലോണിലെ മാനിക്യൂർ, നെയിൽ ആർട്ട് വിശദാംശം',
  },
  badge: { en: 'Manicure', ml: 'മാനിക്യൂർ' },
  title: { en: 'Manicure — Beautiful, Well-Maintained Hands', ml: 'മാനിക്യൂർ — സുന്ദരവും നന്നായി പരിപാലിക്കപ്പെട്ടതുമായ കൈകൾ' },
  paragraph: {
    en: 'A complete hand care ritual — cleansing, exfoliation, nail shaping, cuticle care, a relaxing massage, and a flawless finish.',
    ml: 'സമ്പൂർണ്ണ ഹാൻഡ് കെയർ ചടങ്ങ് — ക്ലെൻസിംഗ്, എക്സ്ഫോളിയേഷൻ, നെയിൽ ഷേപ്പിംഗ്, ക്യൂട്ടിക്കിൾ കെയർ, ആശ്വാസകരമായ മസാജ്, കുറ്റമറ്റ ഫിനിഷ്.',
  },
};

const MANICURE_OPTIONS = [
  {
    title: { en: 'Classic Manicure', ml: 'ക്ലാസിക് മാനിക്യൂർ' },
    description: {
      en: 'Nail shaping, cuticle care, moisturizing hand massage, and a polished colour finish. Clean, timeless, and perfectly executed.',
      ml: 'നെയിൽ ഷേപ്പിംഗ്, ക്യൂട്ടിക്കിൾ കെയർ, മോയ്സ്ചറൈസിംഗ് ഹാൻഡ് മസാജ്, മിനുക്കിയ കളർ ഫിനിഷ്. വൃത്തിയുള്ളതും കാലാതീതവും തികവുറ്റതും.',
    },
  },
  {
    title: { en: 'Gel Manicure', ml: 'ജെൽ മാനിക്യൂർ' },
    description: {
      en: 'All the benefits of a classic manicure in Kochi, topped with a UV-cured gel polish that stays chip-resistant and high-gloss for 2–3 weeks.',
      ml: 'കൊച്ചിയിലെ ക്ലാസിക് മാനിക്യൂറിന്റെ എല്ലാ ഗുണങ്ങളും, 2–3 ആഴ്ചത്തേക്ക് ചിപ്പ്-റെസിസ്റ്റന്റും ഹൈ-ഗ്ലോസും നിലനിൽക്കുന്ന UV-ക്യൂർഡ് ജെൽ പോളിഷോടെ.',
    },
  },
  {
    title: { en: 'French Manicure', ml: 'ഫ്രഞ്ച് മാനിക്യൂർ' },
    description: {
      en: 'The eternally elegant, natural pink base with crisp white tips. A look that complements every outfit and every occasion.',
      ml: 'എന്നും മനോഹരമായ, സ്വാഭാവിക പിങ്ക് ബേസും വ്യക്തമായ വൈറ്റ് ടിപ്പുകളും. ഏതു വസ്ത്രത്തിനും അവസരത്തിനും ചേരുന്ന ലുക്ക്.',
    },
  },
  {
    title: { en: 'Spa Manicure', ml: 'സ്പാ മാനിക്യൂർ' },
    description: {
      en: 'Our most indulgent option, adding a nourishing paraffin wax treatment or intensive hand mask for deeply conditioned, visibly softer skin.',
      ml: 'ആഴത്തിൽ പോഷിപ്പിക്കുന്ന പാരഫിൻ വാക്സ് ട്രീറ്റ്മെന്റോ ഇന്റൻസീവ് ഹാൻഡ് മാസ്കോ ചേർത്ത്, ദൃശ്യപരമായി മൃദുവായ ചർമ്മത്തിന് — ഞങ്ങളുടെ ഏറ്റവും ആഡംബരപൂർണ്ണമായ ഓപ്ഷൻ.',
    },
  },
  {
    title: { en: 'Bridal Manicure', ml: 'ബ്രൈഡൽ മാനിക്യൂർ' },
    description: {
      en: 'Crafted for brides and special occasions, this premium service ensures your hands look flawless in every photograph.',
      ml: 'വധുക്കൾക്കും പ്രത്യേക അവസരങ്ങൾക്കുമായി രൂപകൽപ്പന ചെയ്ത ഈ പ്രീമിയം സേവനം ഓരോ ഫോട്ടോയിലും നിങ്ങളുടെ കൈകൾ കുറ്റമറ്റതായി കാണപ്പെടുന്നുവെന്ന് ഉറപ്പാക്കുന്നു.',
    },
  },
];

const PEDICURE_PANEL_TEXT = {
  imageAlt: {
    en: 'Relaxing pedicure and foot spa station at DAVIN Beauty Salon Kochi',
    ml: 'കൊച്ചിയിലെ DAVIN ബ്യൂട്ടി സലോണിലെ ആശ്വാസകരമായ പെഡിക്യൂർ, ഫുട്ട് സ്പാ സ്റ്റേഷൻ',
  },
  title: { en: 'Pedicure — Happy Feet, Total Relaxation', ml: 'പെഡിക്യൂർ — സന്തുഷ്ടമായ കാലുകൾ, സമ്പൂർണ്ണ വിശ്രമം' },
  paragraph: {
    en: 'Thorough, hygienic, deeply relaxing treatments — from callused heels to tired, aching feet.',
    ml: 'സമഗ്രവും ശുചിത്വമുള്ളതും ആഴത്തിൽ ആശ്വാസകരവുമായ ട്രീറ്റ്മെന്റുകൾ — കട്ടിയായ കുതികാൽ മുതൽ ക്ഷീണിച്ച, വേദനിക്കുന്ന കാലുകൾ വരെ.',
  },
};

const PEDICURE_OPTIONS = [
  {
    title: { en: 'Classic Pedicure', ml: 'ക്ലാസിക് പെഡിക്യൂർ' },
    description: {
      en: 'Foot soak, exfoliation, nail shaping, cuticle care, callus removal, a rejuvenating foot massage, and a polished finish. Leaves feet soft and beautifully neat.',
      ml: 'ഫുട്ട് സോക്ക്, എക്സ്ഫോളിയേഷൻ, നെയിൽ ഷേപ്പിംഗ്, ക്യൂട്ടിക്കിൾ കെയർ, കാളസ് നീക്കം ചെയ്യൽ, പുനരുജ്ജീവന ഫുട്ട് മസാജ്, മിനുക്കിയ ഫിനിഷ്. കാലുകൾ മൃദുവും മനോഹരവുമാക്കുന്നു.',
    },
  },
  {
    title: { en: 'Gel Pedicure', ml: 'ജെൽ പെഡിക്യൂർ' },
    description: {
      en: 'Classic pedicure in Kochi with a long-lasting gel finish — glossy, chip-free toes for up to 3 weeks.',
      ml: '3 ആഴ്ച വരെ തിളക്കമുള്ളതും ചിപ്പില്ലാത്തതുമായ കാൽവിരലുകൾക്കായി ദീർഘകാലം നിലനിൽക്കുന്ന ജെൽ ഫിനിഷോടെയുള്ള കൊച്ചിയിലെ ക്ലാസിക് പെഡിക്യൂർ.',
    },
  },
  {
    title: { en: 'Spa Pedicure', ml: 'സ്പാ പെഡിക്യൂർ' },
    description: {
      en: 'The ultimate foot pampering experience, adding a paraffin wax dip or intensive heel mask to target dryness and cracked heels.',
      ml: 'ഉണക്കവും വിണ്ട കുതികാലുകളും പരിഹരിക്കാൻ പാരഫിൻ വാക്സ് ഡിപ്പോ ഇന്റൻസീവ് ഹീൽ മാസ്കോ ചേർത്ത അന്തിമമായ ഫുട്ട് പാമ്പറിംഗ് അനുഭവം.',
    },
  },
  {
    title: { en: 'Fish Pedicure (subject to availability)', ml: 'ഫിഷ് പെഡിക്യൂർ (ലഭ്യതയ്ക്ക് വിധേയം)' },
    description: {
      en: 'A unique Garra Rufa fish exfoliation experience that leaves feet ultra-smooth and deeply refreshed.',
      ml: 'കാലുകൾ അതീവ മൃദുവും ആഴത്തിൽ ഉന്മേഷദായകവുമാക്കുന്ന അതുല്യമായ ഗാറ റൂഫ ഫിഷ് എക്സ്ഫോളിയേഷൻ അനുഭവം.',
    },
  },
];

const NAIL_ART_PANEL_TEXT = {
  title: { en: 'Nail Art — Your Canvas. Our Artistry.', ml: 'നെയിൽ ആർട്ട് — നിങ്ങളുടെ ക്യാൻവാസ്. ഞങ്ങളുടെ കലാവൈദഗ്ധ്യം.' },
  paragraph: {
    en: 'From minimalist line art to 3D embellishments — bring a reference, describe your idea, and our artists bring it to life.',
    ml: 'മിനിമലിസ്റ്റ് ലൈൻ ആർട്ട് മുതൽ 3D അലങ്കാരങ്ങൾ വരെ — ഒരു റഫറൻസ് കൊണ്ടുവരൂ, നിങ്ങളുടെ ആശയം വിവരിക്കൂ, ഞങ്ങളുടെ കലാകാരന്മാർ അത് ജീവസുറ്റതാക്കും.',
  },
  tagsLabel: { en: 'Nail art styles at DAVIN:', ml: 'DAVIN-ലെ നെയിൽ ആർട്ട് സ്റ്റൈലുകൾ:' },
};

const NAIL_ART_STYLES = [
  { en: 'Minimalist & line art', ml: 'മിനിമലിസ്റ്റ് & ലൈൻ ആർട്ട്' },
  { en: 'Floral & botanical', ml: 'ഫ്ലോറൽ & ബൊട്ടാണിക്കൽ' },
  { en: 'French with accents', ml: 'ആക്സന്റുകളോടെ ഫ്രഞ്ച്' },
  { en: 'Ombre & gradient', ml: 'ഓംബ്രെ & ഗ്രേഡിയന്റ്' },
  { en: 'Geometric & abstract', ml: 'ജ്യാമിതീയ & അമൂർത്ത' },
  { en: 'Festive & occasion-specific', ml: 'ഉത്സവപരവും അവസര-നിർദ്ദിഷ്ടവും' },
  { en: '3D with gems & embellishments', ml: 'ജെമ്സ് & അലങ്കാരങ്ങളോടെ 3D' },
];

const EXTENSIONS_PANEL_TEXT = {
  title: {
    en: "Nail Extensions — The Length & Shape You've Always Wanted",
    ml: 'നെയിൽ എക്സ്റ്റൻഷനുകൾ — നിങ്ങൾ എപ്പോഴും ആഗ്രഹിച്ച നീളവും ആകൃതിയും',
  },
  hint: { en: 'Hover or tap a card to flip it', ml: 'കാർഡ് ഫ്ലിപ്പ് ചെയ്യാൻ ഹോവർ ചെയ്യൂ അല്ലെങ്കിൽ ടാപ്പ് ചെയ്യൂ' },
};

const EXTENSION_TYPES = [
  {
    title: { en: 'Gel Extensions', ml: 'ജെൽ എക്സ്റ്റൻഷനുകൾ' },
    description: {
      en: 'The most natural-looking option. Applied over a form or tip and UV-cured for strong, lightweight gel nail extensions near Stadium Link Road that pair perfectly with any nail art.',
      ml: 'ഏറ്റവും സ്വാഭാവികമായി തോന്നിക്കുന്ന ഓപ്ഷൻ. ഒരു ഫോമിലോ ടിപ്പിലോ പ്രയോഗിച്ച് UV-ക്യൂർ ചെയ്ത്, ഏതു നെയിൽ ആർട്ടിനും യോജിക്കുന്ന, ശക്തവും ഭാരം കുറഞ്ഞതുമായ ജെൽ നെയിൽ എക്സ്റ്റൻഷനുകൾ.',
    },
  },
  {
    title: { en: 'Acrylic Nails in Kochi', ml: 'കൊച്ചിയിലെ അക്രിലിക് നെയിൽസ്' },
    description: {
      en: 'A classic choice for exceptional durability and dramatic length. Finished with any polish, gel, or nail art design.',
      ml: 'അസാധാരണമായ ഈടുനിൽപ്പിനും നാടകീയമായ നീളത്തിനുമുള്ള ക്ലാസിക് ചോയ്സ്. ഏതു പോളിഷ്, ജെൽ, അല്ലെങ്കിൽ നെയിൽ ആർട്ട് ഡിസൈൻ കൊണ്ടും പൂർത്തിയാക്കാം.',
    },
  },
  {
    title: { en: 'Nail Repair', ml: 'നെയിൽ റിപ്പയർ' },
    description: {
      en: "Broken a nail? Our expert repair service uses gel or acrylic to seamlessly restore your nail's shape and strength.",
      ml: 'നഖം പൊട്ടിയോ? ഞങ്ങളുടെ വിദഗ്ധ റിപ്പയർ സേവനം ജെൽ അല്ലെങ്കിൽ അക്രിലിക് ഉപയോഗിച്ച് നിങ്ങളുടെ നഖത്തിന്റെ ആകൃതിയും ബലവും തടസ്സമില്ലാതെ പുനഃസ്ഥാപിക്കുന്നു.',
    },
  },
];

const GROOMING_PANEL_TEXT = {
  imageAlt: {
    en: "Men's beard grooming and styling at DAVIN Beauty Salon Kochi",
    ml: 'കൊച്ചിയിലെ DAVIN ബ്യൂട്ടി സലോണിലെ പുരുഷന്മാരുടെ ബിയേഡ് ഗ്രൂമിംഗും സ്റ്റൈലിംഗും',
  },
  title: { en: 'Grooming — Sharp. Confident. Impeccable.', ml: 'ഗ്രൂമിംഗ് — മൂർച്ചയുള്ളത്. ആത്മവിശ്വാസമുള്ളത്. കുറ്റമറ്റത്.' },
  menuLabel: { en: "Men's Grooming Menu", ml: 'പുരുഷന്മാരുടെ ഗ്രൂമിംഗ് മെനു' },
};

const GROOMING_SERVICES = [
  {
    title: { en: 'Beard Trim & Shape', ml: 'ബിയേഡ് ട്രിം & ഷേപ്പ്' },
    description: {
      en: 'Precision beard trim in Kochi, following your natural growth pattern with clean jaw, cheek, and neck line definition.',
      ml: 'നിങ്ങളുടെ സ്വാഭാവിക വളർച്ചാ രീതി പിന്തുടർന്ന്, വൃത്തിയുള്ള ജോ, ചീക്ക്, നെക്ക് ലൈൻ എന്നിവയോടെയുള്ള കൃത്യതയാർന്ന ബിയേഡ് ട്രിം കൊച്ചിയിൽ.',
    },
  },
  {
    title: { en: 'Beard Styling & Design', ml: 'ബിയേഡ് സ്റ്റൈലിംഗ് & ഡിസൈൻ' },
    description: {
      en: 'Intentional, personality-driven beard styles — ducktail, French cut, van dyke, and more — designed to frame your face and express your character.',
      ml: 'ഡക്ക്ടെയിൽ, ഫ്രഞ്ച് കട്ട്, വാൻ ഡൈക്ക് എന്നിവയുൾപ്പെടെ, നിങ്ങളുടെ മുഖത്തിന് ചേരുന്നതും വ്യക്തിത്വം പ്രകടിപ്പിക്കുന്നതുമായ ഉദ്ദേശ്യപൂർവ്വമായ ബിയേഡ് സ്റ്റൈലുകൾ.',
    },
  },
  {
    title: { en: 'Clean Shave', ml: 'ക്ലീൻ ഷേവ്' },
    description: {
      en: 'A traditional close shave with warm towel preparation, premium shaving cream, and smooth, precise razor work.',
      ml: 'ചൂടുള്ള ടവൽ തയ്യാറെടുപ്പ്, പ്രീമിയം ഷേവിംഗ് ക്രീം, മിനുസമാർന്ന കൃത്യതയാർന്ന റേസർ വർക്ക് എന്നിവയോടെയുള്ള പരമ്പരാഗത ക്ലോസ് ഷേവ്.',
    },
  },
  {
    title: { en: "Men's Facial Clean-Up", ml: 'പുരുഷന്മാരുടെ ഫേഷിയൽ ക്ലീൻ-അപ്പ്' },
    description: {
      en: "A targeted men's grooming clean-up designed for men's skin concerns — oiliness, congestion, and roughness, resolved in one efficient session.",
      ml: 'എണ്ണമയം, കട്ടിയായ പോറസ്, പരുപരുപ്പ് തുടങ്ങിയ പുരുഷന്മാരുടെ ചർമ്മ പ്രശ്നങ്ങൾക്കായി രൂപകൽപ്പന ചെയ്ത, ഒറ്റ സെഷനിൽ പരിഹാരം നൽകുന്ന ലക്ഷ്യബോധമുള്ള ഗ്രൂമിംഗ് ക്ലീൻ-അപ്പ്.',
    },
  },
];

const FAQ_SECTION_TEXT = {
  eyebrow: { en: 'Answers', ml: 'ഉത്തരങ്ങൾ' },
  heading: { en: 'Nails & Grooming FAQs', ml: 'നെയിൽസ് & ഗ്രൂമിംഗ് പതിവ് ചോദ്യങ്ങൾ' },
};

const FAQS = [
  {
    q: { en: 'How long do gel nails last in Kochi?', ml: 'കൊച്ചിയിൽ ജെൽ നെയിൽസ് എത്ര കാലം നിലനിൽക്കും?' },
    a: {
      en: 'With proper care, gel manicures at DAVIN in Kochi last 2–3 weeks. We recommend regular infill appointments to keep gel nail extensions near Stadium Link Road looking fresh and flawless.',
      ml: 'ശരിയായ പരിചരണത്തോടെ, കൊച്ചിയിലെ DAVIN-ലെ ജെൽ മാനിക്യൂറുകൾ 2–3 ആഴ്ച നിലനിൽക്കും. സ്റ്റേഡിയം ലിങ്ക് റോഡിന് സമീപമുള്ള ജെൽ നെയിൽ എക്സ്റ്റൻഷനുകൾ പുതുമയോടെയും കുറ്റമറ്റതായും നിലനിർത്താൻ ഞങ്ങൾ പതിവായ ഇൻഫിൽ അപ്പോയിന്റ്മെന്റുകൾ ശുപാർശ ചെയ്യുന്നു.',
    },
  },
  {
    q: { en: 'Are nail extensions damaging to natural nails?', ml: 'നെയിൽ എക്സ്റ്റൻഷനുകൾ സ്വാഭാവിക നഖങ്ങൾക്ക് ദോഷകരമാണോ?' },
    a: {
      en: 'When applied and removed professionally, nail extensions in Kochi are completely safe. Damage typically results from improper DIY removal. At DAVIN, we always follow correct protocols and prioritize the health of your natural nail.',
      ml: 'പ്രൊഫഷണലായി പ്രയോഗിക്കുകയും നീക്കം ചെയ്യുകയും ചെയ്യുമ്പോൾ, കൊച്ചിയിലെ നെയിൽ എക്സ്റ്റൻഷനുകൾ പൂർണ്ണമായും സുരക്ഷിതമാണ്. തെറ്റായ DIY നീക്കം ചെയ്യൽ മൂലമാണ് സാധാരണയായി കേടുപാടുകൾ സംഭവിക്കുന്നത്. DAVIN-ൽ, ഞങ്ങൾ എപ്പോഴും ശരിയായ പ്രോട്ടോക്കോളുകൾ പിന്തുടരുകയും നിങ്ങളുടെ സ്വാഭാവിക നഖത്തിന്റെ ആരോഗ്യത്തിന് മുൻഗണന നൽകുകയും ചെയ്യുന്നു.',
    },
  },
  {
    q: { en: 'Can I choose a custom nail art design?', ml: 'എനിക്ക് ഒരു കസ്റ്റം നെയിൽ ആർട്ട് ഡിസൈൻ തിരഞ്ഞെടുക്കാമോ?' },
    a: {
      en: 'Absolutely, our nail art salon in Kaloor thrives on creative challenges. Bring a reference image, a Pinterest board, or simply describe your vision and our nail art specialists in Kochi will bring it to life.',
      ml: 'തീർച്ചയായും, കാലൂരിലെ ഞങ്ങളുടെ നെയിൽ ആർട്ട് സലോൺ സർഗ്ഗാത്മക വെല്ലുവിളികളിൽ വിജയിക്കുന്നു. ഒരു റഫറൻസ് ചിത്രം, പിന്ററെസ്റ്റ് ബോർഡ്, അല്ലെങ്കിൽ വെറും നിങ്ങളുടെ കാഴ്ചപ്പാട് വിവരിക്കൂ — കൊച്ചിയിലെ ഞങ്ങളുടെ നെയിൽ ആർട്ട് സ്പെഷ്യലിസ്റ്റുകൾ അത് ജീവസുറ്റതാക്കും.',
    },
  },
  {
    q: { en: 'How often should I get a pedicure in Kochi?', ml: 'കൊച്ചിയിൽ എത്ര തവണ പെഡിക്യൂർ ചെയ്യണം?' },
    a: {
      en: 'A pedicure at DAVIN in Kochi every 3–4 weeks maintains optimal foot health and cleanliness. Clients with active lifestyles may prefer more frequent visits to our nail studio in Ernakulam.',
      ml: 'എറണാകുളത്തെ കൊച്ചിയിലെ DAVIN-ൽ ഓരോ 3–4 ആഴ്ചയിലും പെഡിക്യൂർ ചെയ്യുന്നത് ഒപ്റ്റിമൽ ഫുട്ട് ആരോഗ്യവും ശുചിത്വവും നിലനിർത്തുന്നു. സജീവമായ ജീവിതശൈലിയുള്ള ക്ലയന്റുകൾ ഞങ്ങളുടെ എറണാകുളത്തെ നെയിൽ സ്റ്റുഡിയോയിൽ കൂടുതൽ തവണ സന്ദർശിക്കാൻ ഇഷ്ടപ്പെടാം.',
    },
  },
  {
    q: { en: 'Do you offer nail services for men?', ml: 'പുരുഷന്മാർക്ക് നെയിൽ സേവനങ്ങൾ ലഭ്യമാണോ?' },
    a: {
      en: 'Yes, DAVIN offers clean-up manicures and pedicures for men who prefer a neat, natural finish. Grooming truly knows no gender at our unisex nail salon in Kochi.',
      ml: 'അതെ, വൃത്തിയുള്ളതും സ്വാഭാവികവുമായ ഫിനിഷ് ഇഷ്ടപ്പെടുന്ന പുരുഷന്മാർക്കായി DAVIN ക്ലീൻ-അപ്പ് മാനിക്യൂറുകളും പെഡിക്യൂറുകളും വാഗ്ദാനം ചെയ്യുന്നു. കൊച്ചിയിലെ ഞങ്ങളുടെ യൂണിസെക്സ് നെയിൽ സലോണിൽ ഗ്രൂമിംഗിന് ലിംഗഭേദമില്ല.',
    },
  },
];

const CROSS_LINKS = [
  { label: { en: 'Hair Care in Kochi →', ml: 'കൊച്ചിയിലെ ഹെയർ കെയർ →' }, href: '/services/hair-care' },
  { label: { en: 'Skin Care in Kaloor →', ml: 'കാലൂരിലെ സ്കിൻ കെയർ →' }, href: '/services/skin-care' },
  { label: { en: 'Bridal & Party Makeup →', ml: 'ബ്രൈഡൽ & പാർട്ടി മേക്കപ്പ് →' }, href: '/services/makeup' },
  { label: { en: 'View Gallery →', ml: 'ഗാലറി കാണുക →' }, href: '/gallery' },
];

const CLOSING_CTA_TEXT = {
  title: { en: 'Book Your Nail & Grooming Appointment', ml: 'നിങ്ങളുടെ നെയിൽ & ഗ്രൂമിംഗ് അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യൂ' },
  body: {
    en: 'Perfectly polished hands, beautifully groomed looks — at the best nail art salon in Kaloor, Kochi.',
    ml: 'കൊച്ചിയിലെ കാലൂരിലെ ഏറ്റവും മികച്ച നെയിൽ ആർട്ട് സലോണിൽ — കുറ്റമറ്റ പോളിഷ് ചെയ്ത കൈകളും മനോഹരമായി ഒരുക്കിയ ലുക്കും.',
  },
};

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

function ManicurePanel({ language }: { language: Lang }) {
  return (
    <TabPanel maxWidth={1180}>
      <div className="p-panel-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 32%) minmax(320px, 1fr)', gap: 56, alignItems: 'center' }}>
        <TiltFrame image={img('/images/gallery-nails.jpg')} imageAlt={MANICURE_PANEL_TEXT.imageAlt[language]} badge={MANICURE_PANEL_TEXT.badge[language]} aspectRatio="3 / 4" float />
        <div>
          <SectionHeading numeral="01" compact showNumber={false} title={MANICURE_PANEL_TEXT.title[language]} />
          <p style={{ fontSize: 13.5, lineHeight: '24px', color: 'var(--fg-soft)', margin: '0 0 28px 0', maxWidth: 520 }}>
            {MANICURE_PANEL_TEXT.paragraph[language]}
          </p>
          <div>
            {MANICURE_OPTIONS.map((item, i) => (
              <div
                key={item.title.en}
                style={{ display: 'flex', gap: 18, padding: '16px 0', borderTop: i === 0 ? '1px solid var(--line)' : undefined, borderBottom: '1px solid var(--line)' }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--fg-mute)', paddingTop: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="p-serif" style={{ fontSize: 14, fontWeight: 400, margin: '0 0 4px 0' }}>{item.title[language]}</h4>
                  <p style={{ fontSize: 12, lineHeight: '19px', color: 'var(--fg-soft)', margin: 0, maxWidth: 460 }}>{item.description[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabPanel>
  );
}

function PedicurePanel({ language }: { language: Lang }) {
  return (
    <TabPanel maxWidth={1100}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', border: '1px solid var(--line-strong)' }}>
        <img
          src={img('/images/salon-interior.jpg')}
          alt={PEDICURE_PANEL_TEXT.imageAlt[language]}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)',
          }}
        />
        <div style={{ position: 'absolute', top: 28, left: 28, right: 28 }}>
          <SectionHeading numeral="02" compact showNumber={false} title={<span style={{ color: '#fff' }}>{PEDICURE_PANEL_TEXT.title[language]}</span>} />
          <p style={{ fontSize: 13, lineHeight: '23px', color: 'rgba(255,255,255,0.75)', margin: 0, maxWidth: 480 }}>
            {PEDICURE_PANEL_TEXT.paragraph[language]}
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {PEDICURE_OPTIONS.map((item) => (
            <span
              key={item.title.en}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '9px 14px',
                background: 'rgba(0,0,0,0.35)',
              }}
            >
              {item.title[language]}
            </span>
          ))}
        </div>
      </div>
    </TabPanel>
  );
}

function NailArtPanel({ language }: { language: Lang }) {
  return (
    <TabPanel maxWidth={860}>
      <div style={{ textAlign: 'center' }}>
        <SectionHeading numeral="03" compact showNumber={false} title={NAIL_ART_PANEL_TEXT.title[language]} center />
        <p style={{ fontSize: 13.5, lineHeight: '24px', color: 'var(--fg-soft)', margin: '0 auto 32px', maxWidth: 620 }}>
          {NAIL_ART_PANEL_TEXT.paragraph[language]}
        </p>
        <TiltTags label={NAIL_ART_PANEL_TEXT.tagsLabel[language]} tags={NAIL_ART_STYLES.map((tag) => tag[language])} />
      </div>
    </TabPanel>
  );
}

function ExtensionsPanel({ language }: { language: Lang }) {
  return (
    <TabPanel maxWidth={1100}>
      <SectionHeading numeral="04" compact showNumber={false} title={EXTENSIONS_PANEL_TEXT.title[language]} center />
      <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--fg-mute)', textAlign: 'center', margin: '8px 0 36px' }}>
        {EXTENSIONS_PANEL_TEXT.hint[language]}
      </p>
      <div
        className="p-strip"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${EXTENSION_TYPES.length}, 1fr)`,
          gap: 24,
        }}
      >
        {EXTENSION_TYPES.map((item, i) => (
          <FlipCard
            key={item.title.en}
            front={
              <div style={{ height: '100%', minHeight: 200, boxSizing: 'border-box', padding: '28px 22px', display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <span className="p-serif" style={{ fontSize: 36, fontWeight: 400, color: 'var(--fg-mute)', margin: '0 0 14px 0' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="p-serif" style={{ fontSize: 16, fontWeight: 400, margin: 0 }}>{item.title[language]}</h4>
              </div>
            }
            back={
              <div style={{ height: '100%', minHeight: 200, boxSizing: 'border-box', padding: '28px 22px', display: 'flex', alignItems: 'center' }}>
                <p style={{ fontSize: 12.5, lineHeight: '21px', color: 'var(--fg-soft)', margin: 0 }}>{item.description[language]}</p>
              </div>
            }
          />
        ))}
      </div>
    </TabPanel>
  );
}

function GroomingPanel({ language }: { language: Lang }) {
  return (
    <TabPanel maxWidth={1000}>
      <div className="p-panel-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 34%) minmax(280px, 1fr)', gap: 48, alignItems: 'start' }}>
        <TiltFrame image={img('/images/gallery-grooming.jpg')} imageAlt={GROOMING_PANEL_TEXT.imageAlt[language]} aspectRatio="1 / 1" float />
        <div>
          <SectionHeading numeral="05" compact showNumber={false} title={GROOMING_PANEL_TEXT.title[language]} />
          <div style={{ border: '1px dashed var(--line-strong)', padding: '20px 22px' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '0 0 14px 0' }}>
              {GROOMING_PANEL_TEXT.menuLabel[language]}
            </p>
            {GROOMING_SERVICES.map((item, i) => (
              <div
                key={item.title.en}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '10px 0',
                  borderTop: i === 0 ? undefined : '1px dashed var(--line)',
                }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: 'var(--fg)' }}>{item.title[language]}</span>
                <span style={{ flex: '0 0 auto', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--fg-mute)' }}>·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabPanel>
  );
}

function ServicesTabs({ language }: { language: Lang }) {
  const [active, setActive] = useState<(typeof TABS_TEXT)[number]['key']>('manicure');

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIndex = TABS_TEXT.findIndex((tab) => tab.key === active);
      const nextIndex = (currentIndex + 1) % TABS_TEXT.length;
      setActive(TABS_TEXT[nextIndex].key);
    }, 5500);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section className="p-dark" style={{ padding: '90px 0 70px' }}>
      <div style={{ textAlign: 'center', padding: '0 40px 40px' }}>
        <Eyebrow>{SCROLL_STORY_TEXT.eyebrow[language]}</Eyebrow>
        <h2 className="p-serif" style={{ fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: 400, margin: '16px 0 0 0', textWrap: 'balance' }}>
          {SCROLL_STORY_TEXT.title[language]}
        </h2>
      </div>
      <TabSwitcher
        tabs={TABS_TEXT.map((tab) => ({ key: tab.key, label: tab.label[language] }))}
        active={active}
        onChange={(key) => setActive(key as (typeof TABS_TEXT)[number]['key'])}
      />
      {active === 'manicure' && <ManicurePanel language={language} />}
      {active === 'pedicure' && <PedicurePanel language={language} />}
      {active === 'nailart' && <NailArtPanel language={language} />}
      {active === 'extensions' && <ExtensionsPanel language={language} />}
      {active === 'grooming' && <GroomingPanel language={language} />}
    </section>
  );
}

function FaqSection({ language }: { language: Lang }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '130px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow>{FAQ_SECTION_TEXT.eyebrow[language]}</Eyebrow>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 400, margin: '18px 0 0' }}>
            {FAQ_SECTION_TEXT.heading[language]}
          </h2>
        </div>
        <FaqAccordion items={FAQS.map((item) => ({ q: item.q[language], a: item.a[language] }))} />
      </div>
    </section>
  );
}

export default function NailsGrooming() {
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA);
  const { language } = useLanguage();

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow={HERO_TEXT.eyebrow[language]}
          title={HERO_TEXT.title[language]}
          subline={HERO_TEXT.subline[language]}
          image={img("/images/service-nails.jpg")}
          imageAlt={HERO_TEXT.imageAlt[language]}
        />
        <section className="p-light" style={{ padding: '120px 40px' }}>
          <CenteredIntro
            eyebrow={INTRO_TEXT.eyebrow[language]}
            title={INTRO_TEXT.title[language]}
            paragraphs={INTRO_TEXT.paragraphs[language]}
          />
        </section>
        <section className="p-light">
          <SectionBand>{SECTION_BAND_TEXT[language]}</SectionBand>
        </section>
        <ServicesTabs language={language} />
        <FaqSection language={language} />
        <ClosingCta
          title={CLOSING_CTA_TEXT.title[language]}
          body={CLOSING_CTA_TEXT.body[language]}
          crossLinks={CROSS_LINKS.map((link) => ({ label: link.label[language], href: link.href }))}
        />
      </div>
      <Footer />
    </>
  );
}
