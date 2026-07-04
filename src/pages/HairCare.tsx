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
  FlipCard,
  ComparisonTable,
  FaqAccordion,
  ClosingCta,
  useReveal,
} from '../components/services/premium';

type Bi = { en: string; ml: string };

const META_TITLE = 'Hair Care Services in Kochi | DAVIN Beauty Salon Kaloor';
const META_DESCRIPTION =
  "Get the hair you've always wanted at DAVIN Beauty Salon in Kaloor, Kochi. Professional hair care services tailored to your unique style and needs.";
const META_KEYWORDS =
  'hair salon Kochi, haircut Kaloor, hair color Kochi, hair spa Kochi, keratin treatment Kochi, hair botox Kochi, hair styling Kaloor';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hair Care Services',
  provider: {
    '@type': 'BeautySalon',
    name: 'DAVIN Beauty Salon',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1st Floor, PM Square, Stadium Link Road, Above HDFC Bank',
      addressLocality: 'Kaloor, Kochi',
      addressRegion: 'Kerala',
      postalCode: '682025',
    },
    telephone: '+918089069996',
  },
  serviceType: ['Haircut', 'Hair Styling', 'Hair Coloring', 'Hair Spa', 'Keratin Treatment', 'Hair Botox', 'Balayage'],
  areaServed: 'Kochi, Ernakulam, Kerala',
};

const HERO = {
  eyebrow: { en: 'Hair Care — HC', ml: 'ഹെയർ കെയർ — HC' } as Bi,
  title: {
    en: 'Expert Cuts, Color & Treatments at DAVIN Beauty Salon, Kaloor',
    ml: 'DAVIN ബ്യൂട്ടി സലൂൺ, കാലൂരിൽ വിദഗ്ധ കട്ടുകൾ, കളർ & ട്രീറ്റ്മെന്റുകൾ',
  } as Bi,
  subline: {
    en: 'Haircuts · Styling · Color · Spa · Keratin · Botox — All hair types welcome',
    ml: 'ഹെയർകട്ടുകൾ · സ്റ്റൈലിംഗ് · കളർ · സ്പാ · കെരാറ്റിൻ · ബോട്ടോക്സ് — എല്ലാ തരം മുടിക്കും സ്വാഗതം',
  } as Bi,
  imageAlt: {
    en: 'Hair care services including haircuts, color and keratin at DAVIN Kochi',
    ml: 'DAVIN കൊച്ചിയിൽ ഹെയർകട്ടുകൾ, കളർ, കെരാറ്റിൻ ഉൾപ്പെടെയുള്ള ഹെയർ കെയർ സേവനങ്ങൾ',
  } as Bi,
};

const SERVICES: {
  n: string;
  title: Bi;
  kicker: Bi;
  body: Bi;
  available?: Bi;
  meta?: Bi;
  note?: Bi;
}[] = [
  {
    n: '01',
    title: { en: 'Haircuts & Precision Cuts', ml: 'ഹെയർകട്ടുകളും കൃത്യമായ കട്ടിംഗും' },
    kicker: { en: 'Professional Hair Stylist in Kochi', ml: 'കൊച്ചിയിലെ പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിസ്റ്റ്' },
    body: {
      en:
        "The perfect haircut in Kochi is the most impactful transformation you can make and our professional hair stylists in Kochi are trained to deliver exactly that. From precision women's cuts and fashion-forward bobs to modern men's fades, tapers, and textured styles, every cut begins with a personal consultation to understand your face shape, hair texture, and lifestyle. Clean, confident results crafted for you, not a template.",
      ml:
        'കൊച്ചിയിൽ ലഭിക്കുന്ന ഏറ്റവും മികച്ച ഹെയർകട്ട് നിങ്ങൾക്ക് ചെയ്യാൻ കഴിയുന്ന ഏറ്റവും സ്വാധീനമുള്ള മാറ്റമാണ്, ഞങ്ങളുടെ പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിസ്റ്റുകൾ അത് കൃത്യമായി നൽകാൻ പരിശീലനം നേടിയവരാണ്. കൃത്യതയാർന്ന വനിതാ കട്ടുകൾ, ഫാഷനബിൾ ബോബുകൾ മുതൽ ആധുനിക പുരുഷ ഫേഡുകൾ, ടേപ്പറുകൾ, ടെക്സ്ചർ സ്റ്റൈലുകൾ വരെ, ഓരോ കട്ടും നിങ്ങളുടെ മുഖഘടന, മുടിയുടെ ഘടന, ജീവിതശൈലി എന്നിവ മനസ്സിലാക്കുന്ന വ്യക്തിഗത കൺസൾട്ടേഷനോടെയാണ് ആരംഭിക്കുന്നത്. ഒരു ടെംപ്ലേറ്റ് അല്ല, നിങ്ങൾക്കായി രൂപകൽപ്പന ചെയ്ത വൃത്തിയുള്ളതും ആത്മവിശ്വാസം നിറഞ്ഞതുമായ ഫലങ്ങൾ.',
    },
    available: {
      en:
        "Women's cuts (layers, bob, fringe) · Men's haircuts in Kochi (fade, crop, taper) · Kids' haircuts · Dry & wet cuts · Face-framing trims",
      ml:
        'വനിതാ കട്ടുകൾ (ലെയേഴ്‌സ്, ബോബ്, ഫ്രിഞ്ച്) · കൊച്ചിയിലെ പുരുഷ ഹെയർകട്ടുകൾ (ഫേഡ്, ക്രോപ്പ്, ടേപ്പർ) · കുട്ടികളുടെ ഹെയർകട്ടുകൾ · ഡ്രൈ & വെറ്റ് കട്ടുകൾ · മുഖത്തിന് ചേരുന്ന ട്രിമ്മുകൾ',
    },
  },
  {
    n: '02',
    title: { en: 'Hair Styling & Blowouts', ml: 'ഹെയർ സ്റ്റൈലിംഗും ബ്ലോഔട്ടുകളും' },
    kicker: { en: 'Professional Hair Styling in Kochi', ml: 'കൊച്ചിയിലെ പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിംഗ്' },
    body: {
      en:
        "Walk out of our hair salon in Kaloor looking completely polished. Our stylists use premium heat-protective products and professional tools to deliver a flawless, long-lasting finish — whether it's a special occasion or an elevated everyday look. Every style is crafted to hold beautifully and photograph brilliantly.",
      ml:
        'കാലൂരിലെ ഞങ്ങളുടെ ഹെയർ സലൂണിൽ നിന്ന് പൂർണ്ണമായും മിനുക്കപ്പെട്ട രൂപത്തിൽ പുറത്തിറങ്ങൂ. പ്രത്യേക അവസരമായാലും ഉയർന്ന നിലവാരമുള്ള ദൈനംദിന ലുക്കായാലും, മികച്ചതും ദീർഘകാലം നിലനിൽക്കുന്നതുമായ ഫിനിഷ് നൽകാൻ ഞങ്ങളുടെ സ്റ്റൈലിസ്റ്റുകൾ പ്രീമിയം ഹീറ്റ്-പ്രൊട്ടക്റ്റീവ് ഉൽപ്പന്നങ്ങളും പ്രൊഫഷണൽ ഉപകരണങ്ങളും ഉപയോഗിക്കുന്നു. ഓരോ സ്റ്റൈലും മനോഹരമായി നിലനിൽക്കാനും ഗംഭീരമായി ഫോട്ടോയിൽ വരാനും രൂപകൽപ്പന ചെയ്തതാണ്.',
    },
    available: {
      en:
        'Salon blow-dry · Occasion updos & braids · Curls, waves & blow-straight styling · Wedding & event hair setting · Traditional saree draping styles',
      ml:
        'സലൂൺ ബ്ലോ-ഡ്രൈ · ആഘോഷ അപ്ഡോകളും ബ്രെയ്ഡുകളും · കേളുകൾ, വേവ്സ് & ബ്ലോ-സ്ട്രെയ്റ്റ് സ്റ്റൈലിംഗ് · വിവാഹ & ഇവന്റ് ഹെയർ സെറ്റിംഗ് · പരമ്പരാഗത സാരി ഡ്രേപ്പിംഗ് സ്റ്റൈലുകൾ',
    },
  },
  {
    n: '03',
    title: { en: 'Hair Coloring in Kochi', ml: 'കൊച്ചിയിലെ ഹെയർ കളറിംഗ്' },
    kicker: { en: 'Balayage, Highlights & Global Color', ml: 'ബലയാഷ്, ഹൈലൈറ്റുകൾ & ഗ്ലോബൽ കളർ' },
    body: {
      en:
        'Hair coloring in Kochi is one of the most powerful tools of self-expression and at DAVIN, our color specialists are among the most skilled in Ernakulam. Using globally trusted color systems with damage-minimizing techniques, we deliver rich, long-lasting results from soft balayage in Kochi and luminous highlights to dramatic global hair color and precise hair color correction in Kochi.',
      ml:
        'കൊച്ചിയിലെ ഹെയർ കളറിംഗ് സ്വയം പ്രകടിപ്പിക്കാനുള്ള ഏറ്റവും ശക്തമായ മാർഗ്ഗങ്ങളിലൊന്നാണ്, DAVIN-ൽ ഞങ്ങളുടെ കളർ സ്പെഷ്യലിസ്റ്റുകൾ എറണാകുളത്തെ ഏറ്റവും വൈദഗ്ധ്യമുള്ളവരിൽ ഉൾപ്പെടുന്നു. ആഗോളതലത്തിൽ വിശ്വസനീയമായ കളർ സിസ്റ്റങ്ങളും ഡാമേജ് കുറയ്ക്കുന്ന സാങ്കേതികവിദ്യകളും ഉപയോഗിച്ച്, കൊച്ചിയിലെ മൃദുവായ ബലയാഷ് മുതൽ തിളങ്ങുന്ന ഹൈലൈറ്റുകൾ, നാടകീയമായ ഗ്ലോബൽ ഹെയർ കളർ, കൊച്ചിയിലെ കൃത്യമായ ഹെയർ കളർ കറക്ഷൻ വരെ സമ്പന്നവും ദീർഘകാലം നിലനിൽക്കുന്നതുമായ ഫലങ്ങൾ ഞങ്ങൾ നൽകുന്നു.',
    },
    available: {
      en:
        'Global color · Highlights & lowlights · Balayage & hand-painted color · Ombre & sombre · Fashion shades · Grey coverage · Color correction & toning',
      ml:
        'ഗ്ലോബൽ കളർ · ഹൈലൈറ്റുകളും ലോലൈറ്റുകളും · ബലയാഷും ഹാൻഡ്-പെയിന്റഡ് കളറും · ഓംബ്രെയും സോംബ്രെയും · ഫാഷൻ ഷേഡുകൾ · ഗ്രേ കവറേജ് · കളർ കറക്ഷനും ടോണിംഗും',
    },
    note: {
      en: 'Complimentary skin tone consultation included with every coloring service.',
      ml: 'എല്ലാ കളറിംഗ് സേവനത്തിനും ഒപ്പം സൗജന്യ സ്കിൻ ടോൺ കൺസൾട്ടേഷൻ ഉൾപ്പെടുന്നു.',
    },
  },
  {
    n: '04',
    title: { en: 'Hair Spa Treatment', ml: 'ഹെയർ സ്പാ ട്രീറ്റ്മെന്റ്' },
    kicker: { en: 'Deep Nourishment at DAVIN', ml: 'DAVIN-ൽ ആഴത്തിലുള്ള പോഷണം' },
    body: {
      en:
        "Heat styling, pollution, and chemical processes leave hair dry, dull, and damaged over time. DAVIN's professional hair spa treatment in Kochi is a multi-step restorative ritual that rebuilds moisture, strengthens strands, and stimulates a healthier scalp delivering a silky, luminous finish you'll feel for weeks. Every session includes a customized hair mask, a relaxing scalp massage, steam infusion, and a professional blowout finish.",
      ml:
        'ഹീറ്റ് സ്റ്റൈലിംഗ്, മലിനീകരണം, രാസപ്രക്രിയകൾ എന്നിവ കാലക്രമേണ മുടിയെ വരണ്ടതും മങ്ങിയതും കേടുപറ്റിയതുമാക്കുന്നു. DAVIN-ന്റെ കൊച്ചിയിലെ പ്രൊഫഷണൽ ഹെയർ സ്പാ ട്രീറ്റ്മെന്റ് ഈർപ്പം പുനർനിർമ്മിക്കുകയും, മുടിയിഴകൾ ശക്തിപ്പെടുത്തുകയും, ആരോഗ്യകരമായ തലയോട്ടിയെ ഉത്തേജിപ്പിക്കുകയും ചെയ്യുന്ന ഒരു ബഹുഘട്ട പുനഃസ്ഥാപന ചടങ്ങാണ്, ആഴ്ചകളോളം അനുഭവപ്പെടുന്ന മിനുസമുള്ളതും തിളക്കമുള്ളതുമായ ഫിനിഷ് നൽകുന്നു. ഓരോ സെഷനിലും ഇഷ്ടാനുസൃതമായ ഹെയർ മാസ്ക്, ശാന്തമായ തലയോട്ടി മസാജ്, സ്റ്റീം ഇൻഫ്യൂഷൻ, പ്രൊഫഷണൽ ബ്ലോഔട്ട് ഫിനിഷ് എന്നിവ ഉൾപ്പെടുന്നു.',
    },
    available: {
      en:
        'Classic hair spa · Deep conditioning spa · Scalp treatment · Anti-hairfall spa · Protein repair spa · Post-color restoration spa',
      ml:
        'ക്ലാസിക് ഹെയർ സ്പാ · ഡീപ് കണ്ടീഷനിംഗ് സ്പാ · സ്കാൽപ് ട്രീറ്റ്മെന്റ് · ആന്റി-ഹെയർഫാൾ സ്പാ · പ്രോട്ടീൻ റിപ്പയർ സ്പാ · പോസ്റ്റ്-കളർ റെസ്റ്ററേഷൻ സ്പാ',
    },
  },
  {
    n: '05',
    title: { en: 'Keratin Treatment', ml: 'കെരാറ്റിൻ ട്രീറ്റ്മെന്റ്' },
    kicker: { en: 'Frizz-Free, Silky Hair at DAVIN', ml: 'DAVIN-ൽ ഫ്രിസ്-ഫ്രീ, സിൽക്കി ഹെയർ' },
    body: {
      en:
        "DAVIN's keratin treatment in Kochi is our most in-demand hair therapy. This semi-permanent protein-based treatment seals the hair cuticle, eliminates frizz, cuts blow-dry time, and leaves hair noticeably smoother and more manageable for 3–6 months. Our keratin treatment near Stadium Link Road works on all hair types wavy, frizzy, coiled, or chemically processed. Looking for a frizz-free hair treatment in Kerala that truly lasts? DAVIN's keratin is the answer.",
      ml:
        'DAVIN-ന്റെ കൊച്ചിയിലെ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് ഞങ്ങളുടെ ഏറ്റവും ആവശ്യപ്പെടുന്ന ഹെയർ തെറാപ്പിയാണ്. ഈ സെമി-പെർമനന്റ് പ്രോട്ടീൻ അധിഷ്ഠിത ട്രീറ്റ്മെന്റ് മുടിയുടെ ക്യൂട്ടിക്കിൾ സീൽ ചെയ്യുകയും, ഫ്രിസ് ഇല്ലാതാക്കുകയും, ബ്ലോ-ഡ്രൈ സമയം കുറയ്ക്കുകയും, 3–6 മാസത്തേക്ക് മുടി ശ്രദ്ധേയമായി മിനുസമുള്ളതും കൈകാര്യം ചെയ്യാൻ എളുപ്പവുമാക്കുകയും ചെയ്യുന്നു. സ്റ്റേഡിയം ലിങ്ക് റോഡിനടുത്തുള്ള ഞങ്ങളുടെ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് എല്ലാ തരം മുടിയിലും പ്രവർത്തിക്കുന്നു, വേവി, ഫ്രിസി, ചുരുണ്ട അല്ലെങ്കിൽ കെമിക്കലി പ്രോസസ് ചെയ്തത്. ശരിക്കും നിലനിൽക്കുന്ന കേരളത്തിലെ ഫ്രിസ്-ഫ്രീ ഹെയർ ട്രീറ്റ്മെന്റ് തിരയുകയാണോ? DAVIN-ന്റെ കെരാറ്റിൻ ആണ് ഉത്തരം.',
    },
    meta: {
      en: 'Duration: 2.5–4 hrs  |  Longevity: 3–6 months  |  Best for: Frizzy, wavy, thick, or chemically treated hair',
      ml: 'ദൈർഘ്യം: 2.5–4 മണിക്കൂർ  |  നിലനിൽപ്പ്: 3–6 മാസം  |  ഏറ്റവും അനുയോജ്യം: ഫ്രിസി, വേവി, കട്ടിയുള്ള അല്ലെങ്കിൽ കെമിക്കലി ട്രീറ്റ് ചെയ്ത മുടിക്ക്',
    },
    note: {
      en: 'Post-treatment care kit and maintenance guide included.',
      ml: 'ട്രീറ്റ്മെന്റിന് ശേഷമുള്ള കെയർ കിറ്റും മെയിന്റനൻസ് ഗൈഡും ഉൾപ്പെടുന്നു.',
    },
  },
  {
    n: '06',
    title: { en: 'Hair Botox Treatment', ml: 'ഹെയർ ബോട്ടോക്സ് ട്രീറ്റ്മെന്റ്' },
    kicker: { en: 'Repair, Restore & Revive', ml: 'റിപ്പയർ ചെയ്യുക, പുനഃസ്ഥാപിക്കുക, പുനരുജ്ജീവിപ്പിക്കുക' },
    body: {
      en:
        "If your hair feels brittle, dull, or damaged despite regular care, DAVIN's hair botox treatment in Kochi is the solution. Unlike hair smoothening in Kochi, which chemically restructures hair bonds, hair botox is a chemical-free, filler-based therapy that fills micro-gaps in the hair cortex restoring shine, thickness, elasticity, and smoothness from the inside out. Ideal for colour-treated and heat-damaged hair.",
      ml:
        'പതിവായി പരിചരിച്ചിട്ടും നിങ്ങളുടെ മുടി പൊട്ടുന്നതോ മങ്ങിയതോ കേടുപറ്റിയതോ ആയി തോന്നുന്നുവെങ്കിൽ, DAVIN-ന്റെ കൊച്ചിയിലെ ഹെയർ ബോട്ടോക്സ് ട്രീറ്റ്മെന്റ് ആണ് പരിഹാരം. മുടിയുടെ ബോണ്ടുകളെ രാസപരമായി പുനഃക്രമീകരിക്കുന്ന കൊച്ചിയിലെ ഹെയർ സ്മൂത്തനിംഗിൽ നിന്ന് വ്യത്യസ്തമായി, ഹെയർ ബോട്ടോക്സ് രാസവസ്തുക്കൾ ഇല്ലാത്ത, ഫില്ലർ അധിഷ്ഠിത തെറാപ്പിയാണ്, ഇത് മുടിയുടെ കോർട്ടെക്സിലെ സൂക്ഷ്മ വിടവുകൾ നികത്തി അകത്ത് നിന്ന് തിളക്കവും കട്ടിയും ഇലാസ്തികതയും മിനുസവും പുനഃസ്ഥാപിക്കുന്നു. നിറം നൽകിയതും ചൂടു കൊണ്ട് കേടുപറ്റിയതുമായ മുടിക്ക് അനുയോജ്യം.',
    },
    meta: {
      en: 'Duration: 1.5–3 hrs  |  Longevity: 2–4 months  |  Best for: Damaged, dull, or chemically processed hair',
      ml: 'ദൈർഘ്യം: 1.5–3 മണിക്കൂർ  |  നിലനിൽപ്പ്: 2–4 മാസം  |  ഏറ്റവും അനുയോജ്യം: കേടുപറ്റിയ, മങ്ങിയ അല്ലെങ്കിൽ കെമിക്കലി പ്രോസസ് ചെയ്ത മുടിക്ക്',
    },
  },
];

const FAQS: { q: Bi; a: Bi }[] = [
  {
    q: { en: 'How often should I get a hair spa treatment in Kochi?', ml: 'കൊച്ചിയിൽ എത്ര തവണ ഹെയർ സ്പാ ട്രീറ്റ്മെന്റ് ചെയ്യണം?' },
    a: {
      en:
        'A hair spa near you in Kochi every 3–4 weeks is ideal for healthy hair maintenance. For damaged or chemically treated hair, monthly sessions at DAVIN deliver the most visible improvement.',
      ml:
        'ആരോഗ്യകരമായ മുടി പരിപാലനത്തിന് കൊച്ചിയിൽ ഓരോ 3–4 ആഴ്ചയിലും ഒരു ഹെയർ സ്പാ അനുയോജ്യമാണ്. കേടുപറ്റിയതോ കെമിക്കലി ട്രീറ്റ് ചെയ്തതോ ആയ മുടിക്ക്, DAVIN-ലെ പ്രതിമാസ സെഷനുകൾ ഏറ്റവും ദൃശ്യമായ പുരോഗതി നൽകുന്നു.',
    },
  },
  {
    q: {
      en: 'Is keratin treatment in Kochi safe for color-treated hair?',
      ml: 'കൊച്ചിയിലെ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് നിറം നൽകിയ മുടിക്ക് സുരക്ഷിതമാണോ?',
    },
    a: {
      en:
        "Yes, our keratin treatment in Kochi is fully safe for color-treated hair and can even enhance your color's vibrancy and longevity. Our stylists customize the formula based on your hair's current condition.",
      ml:
        'അതെ, ഞങ്ങളുടെ കൊച്ചിയിലെ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് നിറം നൽകിയ മുടിക്ക് പൂർണ്ണമായും സുരക്ഷിതമാണ്, മാത്രമല്ല നിങ്ങളുടെ നിറത്തിന്റെ തിളക്കവും നിലനിൽപ്പും വർദ്ധിപ്പിക്കുകയും ചെയ്യും. ഞങ്ങളുടെ സ്റ്റൈലിസ്റ്റുകൾ നിങ്ങളുടെ മുടിയുടെ നിലവിലെ അവസ്ഥയ്ക്ക് അനുസരിച്ച് ഫോർമുല ഇഷ്ടാനുസൃതമാക്കുന്നു.',
    },
  },
  {
    q: {
      en: 'How long does a keratin treatment near Stadium Link Road last?',
      ml: 'സ്റ്റേഡിയം ലിങ്ക് റോഡിനടുത്തുള്ള കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് എത്രകാലം നിലനിൽക്കും?',
    },
    a: {
      en: 'With proper aftercare, a keratin treatment at DAVIN, Kaloor lasts 3–6 months. Personalized aftercare guidance is provided after every session.',
      ml:
        'ശരിയായ പരിചരണത്തോടെ, കാലൂരിലെ DAVIN-ലെ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് 3–6 മാസം നിലനിൽക്കും. ഓരോ സെഷനുശേഷവും വ്യക്തിഗതമായ പരിചരണ മാർഗ്ഗനിർദ്ദേശം നൽകുന്നു.',
    },
  },
  {
    q: {
      en: 'Do you offer a consultation before recommending a hair color?',
      ml: 'ഹെയർ കളർ ശുപാർശ ചെയ്യുന്നതിന് മുൻപ് നിങ്ങൾ കൺസൾട്ടേഷൻ നൽകുന്നുണ്ടോ?',
    },
    a: {
      en:
        'Absolutely. Every hair coloring service in Kochi at DAVIN begins with a one-on-one consultation reviewing your hair history, current health, and color goals, before we recommend any technique or shade.',
      ml:
        'തീർച്ചയായും. DAVIN-ലെ കൊച്ചിയിലെ ഓരോ ഹെയർ കളറിംഗ് സേവനവും നിങ്ങളുടെ മുടിയുടെ ചരിത്രം, നിലവിലെ ആരോഗ്യം, കളർ ലക്ഷ്യങ്ങൾ എന്നിവ അവലോകനം ചെയ്യുന്ന ഒറ്റയ്ക്കൊറ്റ കൺസൾട്ടേഷനോടെയാണ് ആരംഭിക്കുന്നത്, ഏതെങ്കിലും ടെക്നിക്കോ ഷേഡോ ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നതിന് മുൻപ്.',
    },
  },
  {
    q: { en: 'Is hair smoothing different from a keratin treatment?', ml: 'ഹെയർ സ്മൂത്തിംഗ് കെരാറ്റിൻ ട്രീറ്റ്മെന്റിൽ നിന്ന് വ്യത്യസ്തമാണോ?' },
    a: {
      en:
        'Yes, hair smoothening in Kochi permanently restructures hair bonds for a straight result, while a keratin treatment in Kochi is semi-permanent and enhances manageability without altering your natural pattern. Our team will guide you to the right choice during your consultation.',
      ml:
        'അതെ, കൊച്ചിയിലെ ഹെയർ സ്മൂത്തനിംഗ് നേരായ ഫലത്തിനായി മുടിയുടെ ബോണ്ടുകളെ സ്ഥിരമായി പുനഃക്രമീകരിക്കുന്നു, അതേസമയം കൊച്ചിയിലെ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് സെമി-പെർമനന്റ് ആണ്, നിങ്ങളുടെ സ്വാഭാവിക പാറ്റേൺ മാറ്റാതെ കൈകാര്യം ചെയ്യാനുള്ള എളുപ്പം വർദ്ധിപ്പിക്കുന്നു. നിങ്ങളുടെ കൺസൾട്ടേഷനിടെ ഞങ്ങളുടെ ടീം ശരിയായ തിരഞ്ഞെടുപ്പിലേക്ക് നിങ്ങളെ നയിക്കും.',
    },
  },
  {
    q: { en: 'Are your hair products safe for sensitive scalps?', ml: 'നിങ്ങളുടെ ഹെയർ ഉൽപ്പന്നങ്ങൾ സെൻസിറ്റീവ് സ്കാൽപ്പുകൾക്ക് സുരക്ഷിതമാണോ?' },
    a: {
      en: 'Yes. DAVIN uses dermatologist-tested, professionally certified products suitable for most scalp types. Please inform our team of any sensitivities during your consultation.',
      ml:
        'അതെ. DAVIN ഡെർമറ്റോളജിസ്റ്റ് പരീക്ഷിച്ചതും, മിക്ക സ്കാൽപ് തരങ്ങൾക്കും അനുയോജ്യമായ പ്രൊഫഷണലായി സർട്ടിഫൈ ചെയ്തതുമായ ഉൽപ്പന്നങ്ങൾ ഉപയോഗിക്കുന്നു. നിങ്ങളുടെ കൺസൾട്ടേഷനിടെ ഏതെങ്കിലും സെൻസിറ്റിവിറ്റികളെക്കുറിച്ച് ഞങ്ങളുടെ ടീമിനെ അറിയിക്കുക.',
    },
  },
];

function useMetaTags(title: string, description: string, schema?: object, keywords?: string) {
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

    let metaKeywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    const prevKeywords = metaKeywords?.content ?? '';
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

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
      if (keywords && metaKeywords) metaKeywords.content = prevKeywords;
      if (schemaTag) document.head.removeChild(schemaTag);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [title, description, schema, keywords]);
}

function Intro() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group className="p-split" style={{ display: 'flex', gap: 64, maxWidth: 1180, margin: '0 auto', alignItems: 'center' }}>
        <div style={{ flex: 1.1 }}>
          <div style={{ marginBottom: 18 }}>
            <Eyebrow>{language === 'ml' ? "കാലൂരിലെ ഹെയർ അതോറിറ്റി" : "Kaloor's Hair Authority"}</Eyebrow>
          </div>
          <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 26px 0' }}>
            {language === 'ml'
              ? 'നിങ്ങളുടെ മുടി. ഞങ്ങളുടെ വൈദഗ്ധ്യം. കാലൂരിലെ കൊച്ചിയുടെ ഏറ്റവും മികച്ച ഹെയർ കെയർ.'
              : "Your Hair. Our Expertise. Kochi's Finest Hair Care in Kaloor."}
          </h2>
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 20px 0' }}>
            {language === 'ml'
              ? 'മികച്ച മുടി ഒരിക്കലും യാദൃശ്ചികമല്ല, അതിന് ശരിയായ വൈദഗ്ധ്യവും, ശരിയായ ഉൽപ്പന്നങ്ങളും, നിങ്ങളുടെ മുടിയെ യഥാർത്ഥത്തിൽ മനസ്സിലാക്കുന്ന ഒരു പ്രൊഫഷണലും ആവശ്യമാണ്. സ്റ്റേഡിയം ലിങ്ക് റോഡ്, കാലൂരിലെ കൊച്ചിയുടെ പ്രമുഖ ഹെയർ സലൂണായ DAVIN ബ്യൂട്ടി സലൂണിൽ, ഞങ്ങളുടെ പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിസ്റ്റുകളുടെ സംഘം ഓരോ സേവനത്തിലും സാങ്കേതിക വൈദഗ്ധ്യവും സൃഷ്ടിപരമായ അഭിനിവേശവും കൊണ്ടുവരുന്നു. നിങ്ങൾക്ക് കൊച്ചിയിൽ ഒരു മൂർച്ചയുള്ള ഹെയർകട്ട്, ഊർജ്ജസ്വലമായ ഹെയർ കളറിംഗ് മേക്ക്ഓവർ, പുനഃസ്ഥാപനപരമായ ഹെയർ സ്പാ ട്രീറ്റ്മെന്റ്, അല്ലെങ്കിൽ കൊച്ചിയിലെ പരിവർത്തനാത്മകമായ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് ആവശ്യമായാലും, നിങ്ങൾ എപ്പോഴും ആഗ്രഹിച്ചതുപോലെ കാണപ്പെടുന്നതും ചലിക്കുന്നതും അനുഭവപ്പെടുന്നതുമായ മുടിയുമായി DAVIN-ൽ നിന്ന് പുറത്തിറങ്ങും.'
              : "Great hair is never accidental, it takes the right skill, the right products, and a professional who genuinely understands your hair. At DAVIN Beauty Salon, Kochi's leading hair salon on Stadium Link Road, Kaloor, our team of professional hair stylists in Kochi brings technical mastery and creative passion to every service. Whether you need a sharp haircut in Kochi, a vibrant hair coloring makeover, a restorative hair spa treatment, or a transformative keratin treatment in Kochi, you'll walk out of DAVIN with hair that looks, moves, and feels exactly the way you've always wanted."}
          </p>
          <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: '0 0 34px 0' }}>
            {language === 'ml'
              ? "സ്ട്രെയ്റ്റ്, വേവി, കേളി, കോയിലി, നേർത്തത് അല്ലെങ്കിൽ കെമിക്കലി ട്രീറ്റ് ചെയ്തത് എന്നിങ്ങനെ എല്ലാ തരം മുടിയെയും ഞങ്ങൾ സ്വാഗതം ചെയ്യുന്നു, ഓരോ സേവനവും നിങ്ങളുടെ മുടിയുടെ അതുല്യമായ ആവശ്യങ്ങൾക്ക് അനുസൃതമായി ക്രമീകരിക്കുന്നു. DAVIN-ൽ, നിങ്ങളുടെ മുടി ഞങ്ങളുടെ ജോലി മാത്രമല്ല. അത് ഞങ്ങളുടെ കലയാണ്."
              : "We welcome every hair type such as straight, wavy, curly, coily, fine, or chemically treated tailoring every service to your hair's unique needs. At DAVIN, your hair isn't just our work. It's our artistry."}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
            <GoldButton href="tel:+918089069996">{language === 'ml' ? 'ഇപ്പോൾ ബുക്ക് ചെയ്യുക' : 'Book Now'}</GoldButton>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: 'var(--fg-mute)' }}>
              {language === 'ml'
                ? '📞 +91 80890 69996  |  📍 സ്റ്റേഡിയം ലിങ്ക് റോഡ്, കാലൂർ, കൊച്ചി'
                : '📞 +91 80890 69996  |  📍 Stadium Link Road, Kaloor, Kochi'}
            </span>
          </div>
        </div>
        <div style={{ flex: 1, position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', border: '1px solid var(--line-strong)' }}>
          <img
            src={img("/images/featured-haircut.jpg")}
            alt={language === 'ml' ? 'DAVIN ബ്യൂട്ടി സലൂൺ കാലൂരിലെ പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിസ്റ്റ്' : 'Professional hair stylist at DAVIN Beauty Salon Kaloor'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)', transition: 'transform 0.6s ease' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          />
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const { language } = useLanguage();
  const headRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={headRef} data-reveal-group style={{ maxWidth: 1180, margin: '0 auto 56px' }}>
        <Eyebrow>{language === 'ml' ? 'ഞങ്ങളുടെ മെനു' : 'Our Menu'}</Eyebrow>
        <h2 className="p-serif" style={{ fontSize: 'clamp(28px, 3.4vw, 48px)', fontWeight: 400, margin: '18px 0 0' }}>
          {language === 'ml' ? 'കൊച്ചിയിലെ ഞങ്ങളുടെ വിദഗ്ധ ഹെയർ കെയർ സേവനങ്ങൾ' : 'Our Expert Hair Care Services in Kochi'}
        </h2>
      </div>
      <div ref={gridRef} data-reveal-group className="p-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1180, margin: '0 auto' }}>
        {SERVICES.map((s) => (
          <div key={s.n}>
            <FlipCard
              front={
                <div style={{ height: '100%', boxSizing: 'border-box', padding: '32px 26px', display: 'flex', flexDirection: 'column' }}>
                  <span className="p-serif" style={{ fontSize: 32, fontWeight: 400, marginBottom: 14, color: 'var(--fg-mute)' }}>
                    {s.n}
                  </span>
                  <h3 className="p-serif" style={{ fontSize: 18, fontWeight: 400, margin: '0 0 4px 0' }}>
                    {s.title[language]}
                  </h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: 0 }}>
                    {s.kicker[language]}
                  </p>
                  <span
                    style={{
                      marginTop: 'auto',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10.5,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--fg-mute)',
                      borderTop: '1px solid var(--line)',
                      paddingTop: 14,
                    }}
                  >
                    {language === 'ml' ? 'കൂടുതൽ അറിയാൻ ഹോവർ ചെയ്യുക →' : 'Hover to explore →'}
                  </span>
                </div>
              }
              back={
                <div style={{ height: '100%', boxSizing: 'border-box', padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 12.5, lineHeight: '21px', color: 'var(--fg-soft)', margin: '0 0 14px 0' }}>{s.body[language]}</p>
                  {s.available && (
                    <p style={{ fontSize: 11.5, lineHeight: '19px', color: 'var(--fg-mute)', margin: '0 0 10px 0', borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                      <strong style={{ color: 'var(--fg-soft)' }}>{language === 'ml' ? 'ലഭ്യമായവ: ' : 'Available: '}</strong>
                      {s.available[language]}
                    </p>
                  )}
                  {s.meta && (
                    <p style={{ fontSize: 11.5, lineHeight: '19px', color: 'var(--fg-mute)', margin: '0 0 10px 0', borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                      {s.meta[language]}
                    </p>
                  )}
                  {s.note && <p style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--fg-mute)', margin: 0 }}>{s.note[language]}</p>}
                </div>
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function CompareSection() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  const headers =
    language === 'ml'
      ? ['ട്രീറ്റ്മെന്റ്', 'പ്രധാന ഫലം', 'ഏറ്റവും അനുയോജ്യം', 'ദൈർഘ്യം']
      : ['Treatment', 'Key Effect', 'Best For', 'Duration'];
  const rows =
    language === 'ml'
      ? [
          ['കൊച്ചിയിലെ ഹെയർ സ്പാ', 'ആഴത്തിലുള്ള ഈർപ്പവും പോഷണവും', 'എല്ലാ തരം മുടിക്കും', '60–90 മിനിറ്റ്'],
          ['കൊച്ചിയിലെ കെരാറ്റിൻ ട്രീറ്റ്മെന്റ്', 'ഫ്രിസ് ഇല്ലാതാക്കൽ + തിളക്കം', 'വേവി, ഫ്രിസി, കട്ടിയുള്ള മുടി', '3–4 മണിക്കൂർ'],
          ['കൊച്ചിയിലെ ഹെയർ ബോട്ടോക്സ്', 'റിപ്പയർ, കണ്ടീഷനിംഗ് & തിളക്കം', 'കേടുപറ്റിയ, നിറം നൽകിയ മുടി', '2–3 മണിക്കൂർ'],
        ]
      : [
          ['Hair Spa in Kochi', 'Deep moisture & nourishment', 'All hair types', '60–90 min'],
          ['Keratin Treatment in Kochi', 'Frizz elimination + shine', 'Wavy, frizzy, thick hair', '3–4 hours'],
          ['Hair Botox in Kochi', 'Repair, conditioning & shine', 'Damaged, color-treated hair', '2–3 hours'],
        ];
  return (
    <section className="p-dark" style={{ borderTop: '1px solid var(--line)', padding: '110px 40px' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 980, margin: '0 auto' }}>
        <Eyebrow>{language === 'ml' ? 'നിങ്ങൾക്ക് ചേരുന്നത് കണ്ടെത്തുക' : 'Find Your Fit'}</Eyebrow>
        <h2 className="p-serif" style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 400, margin: '18px 0 40px', textWrap: 'balance' }}>
          {language === 'ml'
            ? 'ഏത് ഹെയർ ട്രീറ്റ്മെന്റ് നിങ്ങൾക്ക് ശരിയായത്? — DAVIN-ന്റെ വിദഗ്ധ ഗൈഡ്, കൊച്ചി'
            : "Which Hair Treatment Is Right for You? — DAVIN's Expert Guide, Kochi"}
        </h2>
        <ComparisonTable headers={headers} rows={rows} />
        <p style={{ fontSize: 13, lineHeight: '24px', color: 'var(--fg-soft)', margin: '32px 0' }}>
          {language === 'ml'
            ? 'ഞങ്ങളുടെ കൊച്ചിയിലെ ഹെയർ സലൂണിലെ ഓരോ ട്രീറ്റ്മെന്റും സൗജന്യ ഹെയർ ഹെൽത്ത് അസസ്മെന്റോടെ ആരംഭിക്കുന്നു.'
            : 'Every treatment at our hair salon in Kochi begins with a complimentary hair health assessment.'}
        </p>
        <GoldButton href="tel:+918089069996">{language === 'ml' ? 'ക്വോട്ട് വാങ്ങുക' : 'Get Quote'}</GoldButton>
      </div>
    </section>
  );
}

function TrustBand() {
  const { language } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="p-light" style={{ borderTop: '1px solid var(--line)', padding: '100px 40px', textAlign: 'center' }}>
      <div ref={ref} data-reveal-group style={{ maxWidth: 860, margin: '0 auto' }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-mute)', margin: '0 0 20px 0' }}>
          {language === 'ml'
            ? '⭐ 4.8 സ്റ്റാർ · 750+ പരിശോധിച്ച ഗൂഗിൾ റിവ്യൂകൾ · കൊച്ചിയിലെ ഏറ്റവും വിശ്വസനീയമായ ഹെയർ സലൂൺ'
            : "⭐ 4.8 Stars · 750+ Verified Google Reviews · Kochi's Most-Trusted Hair Salon"}
        </p>
        <p className="p-serif" style={{ fontSize: 'clamp(20px, 2.6vw, 32px)', fontWeight: 400, lineHeight: 1.4, margin: '0 0 26px 0' }}>
          {language === 'ml'
            ? 'എന്തുകൊണ്ട് കൊച്ചിയിലെ ഹെയർ പ്രേമികൾ DAVIN തിരഞ്ഞെടുക്കുന്നു — കാലൂരിലെ ഏറ്റവും മികച്ച ഹെയർ സലൂൺ'
            : "Why Kochi's Hair Lovers Choose DAVIN — The Best Hair Salon in Kaloor"}
        </p>
        <p style={{ fontSize: 14, lineHeight: '26px', color: 'var(--fg-soft)', margin: 0 }}>
          {language === 'ml'
            ? 'കൊച്ചിയിൽ ഒടുവിൽ ശരിയായി ലഭിച്ച കൃത്യമായ ഹെയർകട്ട് മുതൽ, ഒരു രാവിലത്തെ ദിനചര്യയെ മാറ്റിമറിച്ച സ്റ്റേഡിയം ലിങ്ക് റോഡിനടുത്തുള്ള കെരാറ്റിൻ ട്രീറ്റ്മെന്റ് വരെ, നൂറുകണക്കിന് പ്രശംസകൾ നേടിയ കൊച്ചിയിലെ ഹെയർ കളറിംഗ് വരെ. ഞങ്ങളുടെ ഉപഭോക്താക്കളുടെ അഭിപ്രായങ്ങൾ DAVIN എല്ലാ ദിവസവും നൽകുന്ന സ്ഥിരതയാർന്ന മികവിനെ പ്രതിഫലിപ്പിക്കുന്നു. ഞങ്ങൾ പ്രീമിയം, സലൂൺ-ഗ്രേഡ് ഉൽപ്പന്നങ്ങൾ മാത്രം ഉപയോഗിക്കുന്നു, കുറ്റമറ്റ ശുചിത്വമുള്ള വർക്ക്സ്റ്റേഷനുകൾ പരിപാലിക്കുന്നു, ഓരോ തവണയും യഥാർത്ഥത്തിൽ വ്യക്തിഗതമായ അനുഭവം നൽകുന്നു.'
            : "From the precision haircut in Kochi that finally got it right, to the keratin treatment near Stadium Link Road that transformed a morning routine, to the hair coloring in Kochi that earned a hundred compliments. Our clients' reviews reflect the consistent excellence DAVIN delivers every day. We use only premium, salon-grade products, maintain impeccably hygienic workstations, and deliver a genuinely personalized experience every time."}
        </p>
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
            {language === 'ml' ? 'ഹെയർ കെയർ പതിവ് ചോദ്യങ്ങൾ' : 'Hair Care FAQs'}
          </h2>
        </div>
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}

export default function HairCare() {
  const { language } = useLanguage();
  useMetaTags(META_TITLE, META_DESCRIPTION, SCHEMA, META_KEYWORDS);

  return (
    <>
      <CustomCursor />
      <Header />
      <div className="p-scope">
        <Hero
          eyebrow={HERO.eyebrow[language]}
          title={HERO.title[language]}
          subline={HERO.subline[language]}
          image={img("/images/service-hair.jpg")}
          imageAlt={HERO.imageAlt[language]}
        />
        <Intro />
        <ServicesGrid />
        <CompareSection />
        <TrustBand />
        <FaqSection />
        <ClosingCta
          title={
            language === 'ml'
              ? 'ഇന്ന് തന്നെ കൊച്ചിയിലെ ഏറ്റവും മികച്ച ഹെയർ സലൂണിൽ നിങ്ങളുടെ ഹെയർ കെയർ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക'
              : "Book Your Hair Care Appointment at Kochi's Best Hair Salon Today"
          }
          body={
            language === 'ml'
              ? 'കൊച്ചിയിലെ മികച്ച ഹെയർ കെയർ ആരംഭിക്കുന്നത് ഒരു തീരുമാനത്തിലാണ്, DAVIN തിരഞ്ഞെടുക്കുക എന്നത്. കൊച്ചിയിലെ ഞങ്ങളുടെ പ്രൊഫഷണൽ ഹെയർ സ്റ്റൈലിസ്റ്റുകൾ കേൾക്കാനും, സൃഷ്ടിക്കാനും, നിങ്ങളുടെ പ്രതീക്ഷകളെ കവിയുന്ന ഫലങ്ങൾ നൽകാനും തയ്യാറാണ്.'
              : 'Great hair care in Kochi starts with one decision, choosing DAVIN. Our professional hair stylists in Kochi are ready to listen, create, and deliver results that exceed your expectations.'
          }
          tagline={
            language === 'ml'
              ? 'നിങ്ങളുടെ മുടിയെ മാറ്റിമറിക്കൂ. നിങ്ങളുടെ ലുക്ക് ഉയർത്തൂ. നിങ്ങളുടെ ആത്മവിശ്വാസം വീണ്ടെടുക്കൂ.'
              : 'Transform your hair. Elevate your look. Reclaim your confidence.'
          }
          crossLinks={[
            { label: language === 'ml' ? 'കൊച്ചിയിലെ സ്കിൻ കെയർ →' : 'Skin Care in Kochi →', href: '/services/skin-care' },
            { label: language === 'ml' ? 'നെയിൽസ് & ഗ്രൂമിംഗ് →' : 'Nails & Grooming →', href: '/services/nails-grooming' },
            { label: language === 'ml' ? 'ബ്രൈഡൽ & പാർട്ടി മേക്കപ്പ് →' : 'Bridal & Party Makeup →', href: '/services/makeup' },
            { label: language === 'ml' ? 'ഗാലറി കാണുക →' : 'View Gallery →', href: '/gallery' },
          ]}
        />
      </div>
      <Footer />
    </>
  );
}
