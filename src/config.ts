import { assetUrl as img } from './lib/asset';

export type Language = 'en' | 'ml';

export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  href: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  eyebrow: Record<Language, string>
  titleLines: Record<Language, string[]>
  leadText: Record<Language, string>
  supportingNotes: Record<Language, string[]>
  backgroundImage: string
  backgroundVideo: string
}

export interface ManifestoConfig {
  title: Record<Language, string>
  paragraphs: Record<Language, string[]>
  statsLine: Record<Language, string>
  image: string
  imageAlt: Record<Language, string>
  ctaText: Record<Language, string>
}

export interface FacilityArticle {
  title: Record<Language, string>
  paragraphs: Record<Language, string[]>
}

export interface FacilityItem {
  slug: string
  name: Record<Language, string>
  code: string
  address: Record<Language, string>
  status: Record<Language, string>
  email: string
  phone: string
  ctaText: Record<Language, string>
  ctaHref: string
  image: string
  imageAlt: Record<Language, string>
  description: Record<Language, string>
  exploreCtaText: Record<Language, string>
  utcOffset: number
  article: FacilityArticle
}

export interface FacilitiesConfig {
  sectionLabel: Record<Language, string>
  sectionTitle: Record<Language, string>
  sectionIntro: Record<Language, string>
  detailBackText: Record<Language, string>
  detailNotFoundText: Record<Language, string>
  detailReturnText: Record<Language, string>
  items: FacilityItem[]
}

export interface ObservationConfig {
  sectionLabel: Record<Language, string>
  videoPath: string
  statusText: Record<Language, string>
  latLabel: string
  lonLabel: string
  initialLat: number
  initialLon: number
}

export interface ArchiveItem {
  src: string
  label: Record<Language, string>
  alt: Record<Language, string>
}

export interface ArchivesConfig {
  sectionLabel: Record<Language, string>
  vaultTitle: Record<Language, string>
  closeText: Record<Language, string>
  items: ArchiveItem[]
}

export interface WhyChooseConfig {
  title: Record<Language, string>
  items: Record<Language, string[]>
}

export interface TestimonialItem {
  quote: Record<Language, string>
  author: Record<Language, string>
  tag: Record<Language, string>
}

export interface TestimonialsConfig {
  title: Record<Language, string>
  items: TestimonialItem[]
}

export interface FaqItem {
  question: Record<Language, string>
  answer: Record<Language, string>
}

export interface FaqConfig {
  title: Record<Language, string>
  items: FaqItem[]
}

export interface FinalCtaButton {
  label: Record<Language, string>
  href: string
}

export interface FinalCtaConfig {
  title: Record<Language, string>
  body: Record<Language, string>
  address: string
  phone: string
  hours: Record<Language, string>
  instagramHandle: string
  instagramHref: string
  buttons: FinalCtaButton[]
}

export interface FooterConfig {
  tagline: Record<Language, string>
  quickLinksLabel: Record<Language, string>
  servicesLabel: Record<Language, string>
  contactLabel: Record<Language, string>
  followLabel: Record<Language, string>
  instagramHandle: string
  instagramHref: string
  address: string
  phone: string
  hours: Record<Language, string>
  copyrightText: string
  statusText: Record<Language, string>
}

export interface FeaturedConfig {
  image: string
  eyebrow: Record<Language, string>
  title: Record<Language, string>
  subtitle: Record<Language, string>
}

export interface AboutStatItem {
  value: string
  label: Record<Language, string>
}

export interface AboutMilestone {
  year: string
  title: Record<Language, string>
  description: Record<Language, string>
}

export interface AboutImageItem {
  src: string
  alt: Record<Language, string>
}

export interface AboutConfig {
  urlSlug: string
  metaTitle: string
  metaDescription: string
  hero: {
    eyebrow: Record<Language, string>
    h1: Record<Language, string>
    image: string
    imageAlt: Record<Language, string>
  }
  story: {
    h2: Record<Language, string>
    paragraphs: Record<Language, string[]>
    stats: AboutStatItem[]
  }
  milestonesTitle: Record<Language, string>
  milestones: AboutMilestone[]
  team: {
    h3: Record<Language, string>
    paragraphs: Record<Language, string[]>
    images: AboutImageItem[]
  }
}

export interface GalleryTileItem {
  slug: string
  src: string
  label: Record<Language, string>
  alt: Record<Language, string>
}

export interface GalleryCategoryData {
  title: Record<Language, string>
  items: GalleryTileItem[]
}

export interface GalleryConfig {
  urlSlug: string
  metaTitle: string
  metaDescription: string
  hero: {
    eyebrow: Record<Language, string>
    subEyebrow: Record<Language, string>
    h1: Record<Language, string>
  }
  intro: {
    h2: Record<Language, string>
    paragraphs: Record<Language, string[]>
    ctaText: Record<Language, string>
    ctaHref: string
  }
  categories: GalleryCategoryData[]
}

export interface ContactHoursRow {
  day: Record<Language, string>
  hours: Record<Language, string>
}

export interface ContactOption {
  value: string
  label: Record<Language, string>
}

export interface ContactExploreLink {
  label: Record<Language, string>
  href: string
}

export interface ContactConfig {
  urlSlug: string
  metaTitle: string
  metaDescription: string
  hero: {
    eyebrow: Record<Language, string>
    subEyebrow: Record<Language, string>
    h1: Record<Language, string>
  }
  intro: {
    h2: Record<Language, string>
    paragraphs: Record<Language, string[]>
  }
  callCard: {
    title: Record<Language, string>
    description: Record<Language, string>
    phone: string
    availability: Record<Language, string>
    callText: Record<Language, string>
    whatsappText: Record<Language, string>
    note: Record<Language, string>
  }
  visitCard: {
    title: Record<Language, string>
    description: Record<Language, string>
    address: string
    landmark: Record<Language, string>
    ctaText: Record<Language, string>
    ctaHref: string
  }
  hours: {
    title: Record<Language, string>
    rows: ContactHoursRow[]
    note: Record<Language, string>
  }
  booking: {
    title: Record<Language, string>
    subtitle: Record<Language, string>
    nameLabel: Record<Language, string>
    namePlaceholder: Record<Language, string>
    phoneLabel: Record<Language, string>
    phonePlaceholder: Record<Language, string>
    serviceLabel: Record<Language, string>
    serviceOptions: ContactOption[]
    dateLabel: Record<Language, string>
    datePlaceholder: Record<Language, string>
    timeLabel: Record<Language, string>
    timeOptions: ContactOption[]
    submitText: Record<Language, string>
    consentText: Record<Language, string>
    instantNote: Record<Language, string>
    successText: Record<Language, string>
  }
  map: {
    title: Record<Language, string>
    note: Record<Language, string>
    embedSrc: string
  }
  closing: {
    title: Record<Language, string>
    body: Record<Language, string>
    address: string
    phone: string
    hours: Record<Language, string>
    buttons: FinalCtaButton[]
    exploreLabel: Record<Language, string>
    exploreLinks: ContactExploreLink[]
  }
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Hair, Skin, Nails & Makeup | DAVIN Beauty Salon Kochi",
  siteDescription: "DAVIN Beauty Salon in Kochi offers premium hair, skin, nails & makeup services. Experience professional beauty care that brings out your best look!",
}

export const navigationConfig: NavigationConfig = {
  brandName: "DAVIN",
  links: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}

export const heroConfig: HeroConfig = {
  eyebrow: {
    en: "LUXURY HAIR · SKIN · GROOMING",
    ml: "ലക്ഷ്യറി ഹോർ · സ്കിൻ · ഗ്രൂമിംഗ്",
  },
  titleLines: {
    en: ["Redefining", "Your Look", "Every Visit"],
    ml: ["പുനർനിർവചിക്കുന്നു", "നിങ്ങളുടെ ലുക്ക്", "ഓരോ സന്ദർശനത്തിലും"],
  },
  leadText: {
    en: "DAVIN BEAUTY SALON is Kaloor's premier destination for professional hair care, skin care, nail art, and makeup, where every service is crafted with expertise, care, and an eye for what makes you extraordinary.",
    ml: "കാലൂർ മേഖലാത്തെ പ്രമാണ ഫാമിലി സാലോൺ ആയാണ് DAVIN.",
  },
  supportingNotes: {
    en: [
      "Haircuts · Hair Color · Hair Spa · Keratin",
      "Bridal Makeup · Nail Art · Facials · Waxing",
      "Stadium Link Road, Kaloor · +91 80890 69996",
    ],
    ml: [
      "ഹോർകറ്റ് · ഹോർ കലർ · ഹോർ സ്പാ · കോൽരടിൻ",
      "ബ്രൈഡൽ മേക്കപ്പ് · നേിൽ ആർട്ട് · ഫേഷിയൽ · വാക്സിംഗ്",
      "സ്ടേഡിയം ലിങ്ക് രോഡ്, കാലൂർ · +91 80890 69996",
    ],
  },
  backgroundImage: "",
  backgroundVideo: "",
}

export const manifestoConfig: ManifestoConfig = {
  title: {
    en: "Every Visit Is a Transformation",
    ml: "ഓരോ സന്ദർശനവും ഒരു പരിവർത്തനമാണ്",
  },
  paragraphs: {
    en: [
      "At DAVIN, we believe beauty isn't about changing who you are, it's about revealing the best version of yourself. Since 2020, our experienced stylists, skin therapists, nail artists, and makeup professionals have been delivering luxury beauty experiences right in the heart of Kaloor, Kochi.",
      "We blend modern techniques with deeply personalized care listening first, creating always, so that every client leaves our doors looking and feeling genuinely extraordinary.",
      "From a precision haircut that perfectly frames your face, to a bridal makeover that takes your breath away, every service at DAVIN is crafted with skill, passion, and an unwavering commitment to your satisfaction.",
    ],
    ml: [
      "DAVIN-ൽ, സൗന്ദര്യം എന്നത് നിങ്ങൾ ആരാണെന്ന് മാറ്റുന്നതല്ല, മറിച്ച് നിങ്ങളുടെ ഏറ്റവും മികച്ച പതിപ്പ് വെളിപ്പെടുത്തുന്നതാണ് എന്ന് ഞങ്ങൾ വിശ്വസിക്കുന്നു. 2020 മുതൽ, ഞങ്ങളുടെ പരിചയസമ്പന്നരായ സ്റ്റൈലിസ്റ്റുകളും സ്കിൻ തെറാപ്പിസ്റ്റുകളും നെയിൽ ആർട്ടിസ്റ്റുകളും മേക്കപ്പ് പ്രൊഫഷണലുകളും കൊച്ചിയിലെ കാലൂരിന്റെ ഹൃദയഭാഗത്ത് ആഡംബര സൗന്ദര്യ അനുഭവങ്ങൾ നൽകിവരുന്നു.",
      "ആധുനിക സാങ്കേതികവിദ്യകളും ആഴത്തിലുള്ള വ്യക്തിഗത പരിചരണവും ഞങ്ങൾ സമന്വയിപ്പിക്കുന്നു — ആദ്യം ശ്രദ്ധിക്കുക, എപ്പോഴും സൃഷ്ടിക്കുക, അങ്ങനെ ഓരോ ക്ലയന്റും ഞങ്ങളുടെ വാതിൽ വിടുമ്പോൾ യഥാർത്ഥത്തിൽ അസാധാരണമായി തോന്നുന്നു.",
      "മുഖം മനോഹരമാക്കുന്ന കൃത്യമായ ഹെയർകട്ട് മുതൽ ശ്വാസം മുട്ടിക്കുന്ന ബ്രൈഡൽ മേക്കോവർ വരെ, DAVIN-ലെ ഓരോ സേവനവും വൈദഗ്ധ്യത്തോടെയും അഭിനിവേശത്തോടെയും നിങ്ങളുടെ സംതൃപ്തിയോടുള്ള അചഞ്ചലമായ പ്രതിബദ്ധതയോടെയും രൂപകൽപ്പന ചെയ്തതാണ്.",
    ],
  },
  statsLine: {
    en: "4.8 Stars · 750+ Google Reviews · 10,800+ Instagram Followers · Est. 2020",
    ml: "4.8 സ്റ്റാർ · 750+ ഗൂഗിൾ റിവ്യൂകൾ · 10,800+ ഇൻസ്റ്റാഗ്രാം ഫോളോവേഴ്സ് · സ്ഥാപിതം 2020",
  },
  image: img("/images/salon-interior.jpg"),
  imageAlt: {
    en: "DAVIN Beauty Salon Kaloor Kochi – premium luxury salon interior",
    ml: "DAVIN Beauty Salon Kaloor Kochi – premium luxury salon interior",
  },
  ctaText: {
    en: "Book Your Appointment",
    ml: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
  },
}

export const facilitiesConfig: FacilitiesConfig = {
  sectionLabel: {
    en: "Our Services",
    ml: "ഈ സേവനകൾ",
  },
  sectionTitle: {
    en: "What We Do Best",
    ml: "ഞങ്ങൾ ഏറ്റവും മികച്ചത് ചെയ്യുന്നത്",
  },
  sectionIntro: {
    en: "Four worlds of beauty. One exceptional salon. Every service at DAVIN is built on a foundation of expertise, premium products, and genuine care — so you always leave looking, and feeling, your absolute best.",
    ml: "സൗന്ദര്യത്തിന്റെ നാല് ലോകങ്ങൾ. ഒരു അസാധാരണ സലൂൺ. DAVIN-ലെ ഓരോ സേവനവും വൈദഗ്ധ്യം, മികച്ച ഉൽപ്പന്നങ്ങൾ, യഥാർത്ഥ കരുതൽ എന്നിവയുടെ അടിത്തറയിലാണ് നിർമ്മിച്ചിരിക്കുന്നത് — അതിനാൽ നിങ്ങൾ എപ്പോഴും ഏറ്റവും മികച്ചതായി കാണുകയും അനുഭവിക്കുകയും ചെയ്യും.",
  },
  detailBackText: {
    en: "Back to Services",
    ml: "സേവനകൾക്ക് തിരിച്ചു",
  },
  detailNotFoundText: {
    en: "Service not found.",
    ml: "സേവനം കണ്ടെത്തില്ല.",
  },
  detailReturnText: {
    en: "Return to all services",
    ml: "എല്ലാ സേവനകൾക്ക് മറിക്കുക",
  },
  items: [
    {
      slug: "hair-care",
      name: { en: "Hair Care", ml: "ഹോർ കോൽ" },
      code: "HC",
      address: {
        en: "Haircuts · Styling · Color · Spa · Keratin · Botox",
        ml: "ഹോർകറ്റ് · സ്റ്റൈലിംഗ് · കലർ · സ്പാ · കോൽരടിൻ · ബോറ്സ്",
      },
      status: { en: "All hair types welcome", ml: "എല്ലാ ഹോർ തരങ്ങളും സ്വാഗതം" },
      email: "",
      phone: "+91 80890 69996",
      ctaText: { en: "Book Now", ml: "ബുക്ക് ചെയ്യുക" },
      ctaHref: "tel:+918089069996",
      image: img("/images/service-hair.jpg"),
      imageAlt: {
        en: "Hair care services including haircuts, color and keratin at DAVIN Kochi",
        ml: "Hair care services including haircuts, color and keratin at DAVIN Kochi",
      },
      description: {
        en: "Your hair is your most expressive feature — and our hair specialists treat it like the art form it is. Whether you're in for a sharp everyday cut, a stunning color transformation, a nourishing hair spa ritual, or a frizz-eliminating keratin treatment, DAVIN's hair team delivers results you'll love every single time.",
        ml: "നിങ്ങളുടെ മുടിയാണ് നിങ്ങളുടെ ഏറ്റവും ആവിഷ്‌കാരപരമായ സവിശേഷത — ഞങ്ങളുടെ ഹെയർ വിദഗ്ധർ അതിനെ ഒരു കലാരൂപമായി കണക്കാക്കുന്നു. മൂർച്ചയുള്ള ദൈനംദിന കട്ട് ആയാലും, അതിശയകരമായ കളർ പരിവർത്തനം ആയാലും, പോഷകാഹാര ഹെയർ സ്പാ ആയാലും, ഫ്രിസ് ഇല്ലാതാക്കുന്ന കെരാറ്റിൻ ചികിത്സ ആയാലും, DAVIN-ന്റെ ഹെയർ ടീം എല്ലായ്പ്പോഴും നിങ്ങൾക്ക് ഇഷ്ടപ്പെടുന്ന ഫലങ്ങൾ നൽകുന്നു.",
      },
      exploreCtaText: { en: "Explore Hair Care", ml: "ഹെയർ കെയർ കാണുക" },
      utcOffset: 5.5,
      article: {
        title: { en: "Hair Care Services", ml: "ഹോർ കോൽ സേവനകൾ" },
        paragraphs: {
          en: [
            "From precision cuts to transformative color, our hair experts craft styles that complement your personality and lifestyle. We use premium products and the latest techniques to ensure your hair looks and feels its absolute best.",
            "Our signature services include professional haircuts for men, women, and children, creative hair coloring with global and streak highlights, rejuvenating hair spa treatments, smoothing keratin therapy, and restorative hair botox treatments.",
          ],
          ml: [
            "പ്രേക്ഷണ കട്ടുകളിലാരംഭത് നിറംതരമായ കലർവരെക്കും. പ്രമാണ ഉപകരണകളും മേഖലാ ഉപകരണകളും എൽല്ലാം കാണിച്ചുവിക്കുന്നു.",
          ],
        },
      },
    },
    {
      slug: "skin-care",
      name: { en: "Skin Care", ml: "സ്കിൻ കോൽ" },
      code: "SC",
      address: {
        en: "Facials · Clean-ups · Waxing · Threading · De-Tan",
        ml: "ഫേഷിയൽ · ക്ലീൺ-അപ്സ് · വാക്സിംഗ് · ത്രെഡിംഗ് · ഡീ-ടാൻ",
      },
      status: { en: "Glowing skin guaranteed", ml: "തിളക്കുന്ന സ്കിൻ ഗാരെണ്ടീ" },
      email: "",
      phone: "+91 80890 69996",
      ctaText: { en: "Book Now", ml: "ബുക്ക് ചെയ്യുക" },
      ctaHref: "tel:+918089069996",
      image: img("/images/service-skin.jpg"),
      imageAlt: {
        en: "Facial and skin care services at DAVIN Beauty Salon Kaloor",
        ml: "Facial and skin care services at DAVIN Beauty Salon Kaloor",
      },
      description: {
        en: "Healthy, glowing skin isn't luck, it's care. Our trained skin therapists tailor every facial, clean-up, and skin treatment to your unique skin type and concern, using premium formulations that deliver visible results from the very first session. Walk in with dull skin. Walk out with a glow.",
        ml: "ആരോഗ്യകരവും തിളങ്ങുന്നതുമായ ചർമ്മം ഭാഗ്യമല്ല, അത് പരിചരണമാണ്. ഞങ്ങളുടെ പരിശീലനം ലഭിച്ച സ്കിൻ തെറാപ്പിസ്റ്റുകൾ നിങ്ങളുടെ ചർമ്മ തരത്തിനും ആശങ്കയ്ക്കും അനുസരിച്ച് ഓരോ ഫേഷ്യലും ക്ലീൻ-അപ്പും ചികിത്സയും ക്രമീകരിക്കുന്നു, ആദ്യ സെഷനിൽ തന്നെ ദൃശ്യമായ ഫലങ്ങൾ നൽകുന്ന മികച്ച ഫോർമുലേഷനുകൾ ഉപയോഗിച്ച്. മങ്ങിയ ചർമ്മവുമായി വരൂ. തിളക്കത്തോടെ പോകൂ.",
      },
      exploreCtaText: { en: "Explore Skin Care", ml: "സ്കിൻ കെയർ കാണുക" },
      utcOffset: 5.5,
      article: {
        title: { en: "Skin Care Services", ml: "സ്കിൻ കോൽ സേവനകൾ" },
        paragraphs: {
          en: [
            "Reveal your natural radiance with our comprehensive skincare treatments. Our experienced aestheticians analyze your skin type and customize each facial, cleanup, and treatment to address your specific concerns.",
            "We offer deep-cleansing facials, rejuvenating gold and diamond facials, gentle waxing for all body areas, precise eyebrow and upper-lip threading, and effective de-tan treatments to restore your natural complexion.",
          ],
          ml: [
            "തങ്ങളുടെ സ്വാഭാവികാനം കാണാന് നമ്മുടെ കോൽസ്സകളിലൂടെ സഹായിക്കും.",
          ],
        },
      },
    },
    {
      slug: "nails-grooming",
      name: { en: "Nails & Grooming", ml: "നേിൽസ് എൺഗ് ഗ്രൂമിംഗ്" },
      code: "NG",
      address: {
        en: "Manicure · Pedicure · Nail Art · Extensions · Beard",
        ml: "മാനിക്യൂർ · പേഡിക്യൂർ · നേിൽ ആർട്ട് · ഐക്സ്റ്റെൻഷന്സ് · താഡി",
      },
      status: { en: "Pamper your hands & feet", ml: "കൈ എണ്ണം അൽപ്പം കാണിക്കുക" },
      email: "",
      phone: "+91 80890 69996",
      ctaText: { en: "Book Now", ml: "ബുക്ക് ചെയ്യുക" },
      ctaHref: "tel:+918089069996",
      image: img("/images/service-nails.jpg"),
      imageAlt: {
        en: "Nail art, manicure and pedicure at DAVIN Beauty Salon Kochi",
        ml: "Nail art, manicure and pedicure at DAVIN Beauty Salon Kochi",
      },
      description: {
        en: "Your hands are seen in every handshake, every selfie, every moment of your day, they deserve to look exceptional. From classic manicures and spa pedicures to intricate nail art and gel extensions, our nail technicians bring creativity and precision to every single set. And for the gentlemen, our grooming specialists deliver the sharpest beard styling and grooming in Kaloor.",
        ml: "ഓരോ ഹസ്തദാനത്തിലും സെൽഫിയിലും ദിവസത്തിലെ ഓരോ നിമിഷത്തിലും നിങ്ങളുടെ കൈകൾ കാണപ്പെടുന്നു — അവ അസാധാരണമായി കാണപ്പെടേണ്ടതുണ്ട്. ക്ലാസിക് മാനിക്യൂറുകൾ, സ്പാ പെഡിക്യൂറുകൾ മുതൽ സങ്കീർണ്ണമായ നെയിൽ ആർട്ട്, ജെൽ എക്സ്റ്റൻഷനുകൾ വരെ, ഞങ്ങളുടെ നെയിൽ ടെക്നീഷ്യൻമാർ ഓരോ സെറ്റിലും സർഗ്ഗാത്മകതയും കൃത്യതയും കൊണ്ടുവരുന്നു. പുരുഷന്മാർക്കായി, ഞങ്ങളുടെ ഗ്രൂമിംഗ് വിദഗ്ധർ കാലൂരിലെ ഏറ്റവും മികച്ച താടി സ്റ്റൈലിംഗും ഗ്രൂമിംഗും നൽകുന്നു.",
      },
      exploreCtaText: { en: "Explore Nails & Grooming", ml: "നെയിൽസ് & ഗ്രൂമിംഗ് കാണുക" },
      utcOffset: 5.5,
      article: {
        title: { en: "Nails & Grooming", ml: "നേിൽസും എൺഗ് ഗ്രൂമിംഗും" },
        paragraphs: {
          en: [
            "Indulge in our luxurious nail and grooming services designed to keep you looking polished from head to toe. Our nail technicians are artists, creating everything from classic manicures to elaborate nail art designs.",
            "Services include classic and spa manicures and pedicures, creative nail art with gel and acrylic options, nail extensions for added length and strength, and professional beard grooming and shaping for a refined look.",
          ],
          ml: [
            "കൈമാത്ത നേിൽകളിലേക്ക് കലാകാരനെ പോലെ വരെ വിമ്മീക്ക് കാണിച്ചുവിക്കുന്നത്.",
          ],
        },
      },
    },
    {
      slug: "makeup",
      name: { en: "Makeup", ml: "മേക്കപ്പ്" },
      code: "MU",
      address: {
        en: "Bridal · Party · HD Makeup · Saree Draping",
        ml: "ബ്രൈഡൽ · പാർട്ടി · HD മേക്കപ്പ് · ശാരി ദ്രപ്പിംഗ്",
      },
      status: { en: "Look stunning for every occasion", ml: "എല്ലാ അവസരങ്ങളിലും മനോഹരമായി കാണിക്കുക" },
      email: "",
      phone: "+91 80890 69996",
      ctaText: { en: "Book Now", ml: "ബുക്ക് ചെയ്യുക" },
      ctaHref: "tel:+918089069996",
      image: img("/images/service-makeup.jpg"),
      imageAlt: {
        en: "Bridal and party makeup at DAVIN Beauty Salon Ernakulam",
        ml: "Bridal and party makeup at DAVIN Beauty Salon Ernakulam",
      },
      description: {
        en: "For every occasion that matters, you deserve a look that matches its significance. Our certified makeup artists create flawless, personalized looks from breathtaking bridal makeovers and camera-perfect HD makeup to glamorous party looks and elegantly executed saree draping. DAVIN's makeup team, celebrated through our FTV collaboration and loved by brides across Kerala, brings artistry and precision to every application.",
        ml: "പ്രധാനപ്പെട്ട ഓരോ അവസരത്തിനും, അതിന്റെ പ്രാധാന്യത്തിന് അനുയോജ്യമായ ഒരു ലുക്ക് നിങ്ങൾക്ക് അർഹതയുണ്ട്. ഞങ്ങളുടെ സർട്ടിഫൈഡ് മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ ശ്വാസം മുട്ടിക്കുന്ന ബ്രൈഡൽ മേക്കോവറുകൾ മുതൽ ക്യാമറ-പെർഫെക്റ്റ് HD മേക്കപ്പ്, മനോഹരമായ പാർട്ടി ലുക്കുകൾ, മനോഹരമായി ചെയ്ത സാരി ഡ്രേപ്പിംഗ് വരെ കുറ്റമറ്റതും വ്യക്തിഗതവുമായ ലുക്കുകൾ സൃഷ്ടിക്കുന്നു. FTV സഹകരണത്തിലൂടെ ആഘോഷിക്കപ്പെടുകയും കേരളമെമ്പാടുമുള്ള വധുക്കൾ ഇഷ്ടപ്പെടുകയും ചെയ്യുന്ന DAVIN-ന്റെ മേക്കപ്പ് ടീം, ഓരോ അപ്ലിക്കേഷനിലും കലാസൃഷ്ടിയും കൃത്യതയും കൊണ്ടുവരുന്നു.",
      },
      exploreCtaText: { en: "Explore Makeup", ml: "മേക്കപ്പ് കാണുക" },
      utcOffset: 5.5,
      article: {
        title: { en: "Makeup Services", ml: "മേക്കപ്പ് സേവനകൾ" },
        paragraphs: {
          en: [
            "Our makeup artists are masters of transformation, creating looks that range from naturally beautiful to red-carpet glamorous. Whether it's your wedding day or a special celebration, we ensure you look and feel your absolute best.",
            "We specialize in bridal makeup with trial sessions, party makeup for any celebration, HD makeup for photography-perfect results, and expert saree draping to complete your elegant look. Every session begins with a personalized consultation.",
          ],
          ml: [
            "വിവാഹത്തിന്തേ അത്യാവശ്യമായി വിളിച്ചമായ അലങ്കാരികൾ തയ്യാരാകുന്നു.",
          ],
        },
      },
    },
  ],
}

export const observationConfig: ObservationConfig = {
  sectionLabel: { en: "Live Look", ml: "ലായിവ് കാണിക്കുക" },
  videoPath: img("/videos/salon-live.mp4"),
  statusText: { en: "NOW OPEN", ml: "ഇപ്പോള് തുറന്നു" },
  latLabel: "LAT",
  lonLabel: "LON",
  initialLat: 9.99,
  initialLon: 76.29,
}

export const archivesConfig: ArchivesConfig = {
  sectionLabel: {
    en: "Our Work Speaks for Itself",
    ml: "ഞങ്ങളുടെ പ്രവർത്തി സ്വയം സംസാരിക്കുന്നു",
  },
  vaultTitle: { en: "View All Work", ml: "എല്ലാം കാണാന്‍" },
  closeText: { en: "Close", ml: "അടക്കുക" },
  items: [
    {
      src: img("/images/service-makeup.jpg"),
      label: { en: "Bridal Elegance", ml: "ബ്രൈഡൽ ഭങ്ഗി" },
      alt: {
        en: "Bridal makeover transformation at DAVIN Beauty Salon Kochi",
        ml: "Bridal makeover transformation at DAVIN Beauty Salon Kochi",
      },
    },
    {
      src: img("/images/service-hair.jpg"),
      label: { en: "Hair Artistry", ml: "ഹോർകളാ" },
      alt: {
        en: "Professional hair styling at DAVIN Beauty Salon Stadium Link Road",
        ml: "Professional hair styling at DAVIN Beauty Salon Stadium Link Road",
      },
    },
    {
      src: img("/images/service-nails.jpg"),
      label: { en: "Nail Masterpiece", ml: "നേിൽ കളാ" },
      alt: {
        en: "Nail art, manicure and pedicure at DAVIN Beauty Salon Kochi",
        ml: "Nail art, manicure and pedicure at DAVIN Beauty Salon Kochi",
      },
    },
    {
      src: img("/images/service-skin.jpg"),
      label: { en: "Glow & Glamour", ml: "പ്രകാശം" },
      alt: {
        en: "Facial skin care treatment at DAVIN Salon Kaloor Kochi",
        ml: "Facial skin care treatment at DAVIN Salon Kaloor Kochi",
      },
    },
  ],
}

export const whyChooseConfig: WhyChooseConfig = {
  title: {
    en: "The DAVIN Difference — Why Kochi Chooses Us, Every Time",
    ml: "DAVIN വ്യത്യാസം — എന്തുകൊണ്ട് കൊച്ചി ഓരോ തവണയും ഞങ്ങളെ തിരഞ്ഞെടുക്കുന്നു",
  },
  items: {
    en: [
      "Expert Professionals, Genuinely Skilled",
      "Premium Products, No Exceptions",
      "Personalized Care, Every Single Visit",
      "Immaculate Hygiene & a Calming Ambiance",
      "A Welcoming Space for Everyone",
      "Open Late, Conveniently Located",
    ],
    ml: [
      "വിദഗ്ധ പ്രൊഫഷണലുകൾ, യഥാർത്ഥ വൈദഗ്ധ്യമുള്ളവർ",
      "മികച്ച ഉൽപ്പന്നങ്ങൾ, ഒരു ഒഴിവുകഴിവുമില്ല",
      "വ്യക്തിഗത പരിചരണം, ഓരോ സന്ദർശനത്തിലും",
      "കുറ്റമറ്റ ശുചിത്വവും ശാന്തമായ അന്തരീക്ഷവും",
      "എല്ലാവർക്കും സ്വാഗതം അരുളുന്ന ഇടം",
      "വൈകിയും തുറന്നിരിക്കുന്നു, സൗകര്യപ്രദമായ സ്ഥലം",
    ],
  },
}

export const testimonialsConfig: TestimonialsConfig = {
  title: {
    en: "Words from the people who matter most",
    ml: "ഏറ്റവും പ്രധാനപ്പെട്ട ആളുകളുടെ വാക്കുകൾ",
  },
  items: [
    {
      quote: {
        en: "Very good service. Wamis was very amiable and gave a really cool haircut.",
        ml: "വളരെ നല്ല സേവനം. വാമിസ് വളരെ സൗഹൃദപരനായിരുന്നു, ശരിക്കും ഒരു കൂൾ ഹെയർകട്ട് തന്നു.",
      },
      author: { en: "Google Review", ml: "ഗൂഗിൾ റിവ്യൂ" },
      tag: { en: "Hair Care Client", ml: "ഹെയർ കെയർ ക്ലയന്റ്" },
    },
    {
      quote: {
        en: "Superb customer service, very friendly staff, wonderful experience!",
        ml: "മികച്ച ഉപഭോക്തൃ സേവനം, വളരെ സൗഹൃദപരമായ ജീവനക്കാർ, അത്ഭുതകരമായ അനുഭവം!",
      },
      author: { en: "Google Review", ml: "ഗൂഗിൾ റിവ്യൂ" },
      tag: { en: "Skin Care Client", ml: "സ്കിൻ കെയർ ക്ലയന്റ്" },
    },
    {
      quote: {
        en: "Awesome experience — the service and ambience was so nice. Highly recommend!",
        ml: "അതിശയകരമായ അനുഭവം — സേവനവും അന്തരീക്ഷവും വളരെ നന്നായിരുന്നു. തീർച്ചയായും ശുപാർശ ചെയ്യുന്നു!",
      },
      author: { en: "Google Review", ml: "ഗൂഗിൾ റിവ്യൂ" },
      tag: { en: "General Client", ml: "ജനറൽ ക്ലയന്റ്" },
    },
  ],
}

export const faqConfig: FaqConfig = {
  title: {
    en: "Frequently Asked Questions",
    ml: "പതിവ് ചോദ്യങ്ങൾ",
  },
  items: [
    {
      question: { en: "Where is DAVIN Beauty Salon located?", ml: "DAVIN ബ്യൂട്ടി സലൂൺ എവിടെയാണ് സ്ഥിതി ചെയ്യുന്നത്?" },
      answer: {
        en: "DAVIN Beauty Salon is located at the 1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu, Kaloor, Kochi, Ernakulam, Kerala – 682025. We are easy to find, just above the HDFC Bank branch on Stadium Link Road.",
        ml: "DAVIN ബ്യൂട്ടി സലൂൺ ഒന്നാം നിലയിൽ, പി എം സ്ക്വയർ, സ്റ്റേഡിയം ലിങ്ക് റോഡ്, എച്ച്ഡിഎഫ്‌സി ബാങ്കിന് മുകളിൽ, കത്രിക്കടവ്, കാലൂർ, കൊച്ചി, എറണാകുളം, കേരളം – 682025 എന്നിവിടത്തിലാണ് സ്ഥിതി ചെയ്യുന്നത്. സ്റ്റേഡിയം ലിങ്ക് റോഡിലെ എച്ച്ഡിഎഫ്‌സി ബാങ്ക് ബ്രാഞ്ചിന് മുകളിൽ തന്നെയായതിനാൽ ഞങ്ങളെ കണ്ടെത്താൻ എളുപ്പമാണ്.",
      },
    },
    {
      question: { en: "What services does DAVIN Beauty Salon offer?", ml: "DAVIN ബ്യൂട്ടി സലൂൺ എന്ത് സേവനങ്ങളാണ് നൽകുന്നത്?" },
      answer: {
        en: "DAVIN offers a comprehensive range of premium beauty services across four categories: Hair Care (haircuts, styling, hair coloring, hair spa, keratin, and hair botox), Skin Care (facials, clean-ups, waxing, threading, and de-tan), Nails & Grooming (manicure, pedicure, nail art, nail extensions, and beard grooming), and Makeup (bridal makeup, party makeup, HD makeup, and saree draping).",
        ml: "DAVIN നാല് വിഭാഗങ്ങളിലായി സമഗ്രമായ പ്രീമിയം ബ്യൂട്ടി സേവനങ്ങൾ നൽകുന്നു: ഹെയർ കെയർ (ഹെയർകട്ട്, സ്റ്റൈലിംഗ്, ഹെയർ കളറിംഗ്, ഹെയർ സ്പാ, കെരാറ്റിൻ, ഹെയർ ബോട്ടോക്സ്), സ്കിൻ കെയർ (ഫേഷ്യൽ, ക്ലീൻ-അപ്പ്, വാക്സിംഗ്, ത്രെഡിംഗ്, ഡീ-ടാൻ), നെയിൽസ് & ഗ്രൂമിംഗ് (മാനിക്യൂർ, പെഡിക്യൂർ, നെയിൽ ആർട്ട്, നെയിൽ എക്സ്റ്റൻഷൻ, ബിയേഡ് ഗ്രൂമിംഗ്), മേക്കപ്പ് (ബ്രൈഡൽ മേക്കപ്പ്, പാർട്ടി മേക്കപ്പ്, HD മേക്കപ്പ്, സാരി ഡ്രേപ്പിംഗ്).",
      },
    },
    {
      question: { en: "What are DAVIN Beauty Salon's opening hours?", ml: "DAVIN ബ്യൂട്ടി സലൂണിന്റെ പ്രവർത്തന സമയം എന്താണ്?" },
      answer: {
        en: "DAVIN Beauty Salon is open every day from 9:00 AM to 9:00 PM, including weekends and public holidays. Walk-ins are welcome, and appointments can be booked by calling or WhatsApp-ing +91 80890 69996.",
        ml: "DAVIN ബ്യൂട്ടി സലൂൺ എല്ലാ ദിവസവും രാവിലെ 9:00 മുതൽ രാത്രി 9:00 വരെ തുറന്നിരിക്കും, വാരാന്ത്യങ്ങളും പൊതു അവധി ദിവസങ്ങളും ഉൾപ്പെടെ. വാക്ക്-ഇന്നുകൾക്ക് സ്വാഗതം, +91 80890 69996 എന്ന നമ്പറിൽ വിളിച്ചോ വാട്ട്‌സ്ആപ്പ് ചെയ്തോ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യാം.",
      },
    },
    {
      question: { en: "Is DAVIN a unisex salon?", ml: "DAVIN ഒരു യൂണിസെക്സ് സലൂൺ ആണോ?" },
      answer: {
        en: "Yes! DAVIN is a proud unisex, family-friendly salon serving men, women, and children. We offer dedicated services for all from precision men's haircuts and beard grooming to bridal makeup and nail art.",
        ml: "അതെ! DAVIN പുരുഷന്മാർക്കും സ്ത്രീകൾക്കും കുട്ടികൾക്കും സേവനം നൽകുന്ന അഭിമാനകരമായ യൂണിസെക്സ്, കുടുംബ-സൗഹൃദ സലൂൺ ആണ്. കൃത്യമായ പുരുഷന്മാരുടെ ഹെയർകട്ടും താടി ഗ്രൂമിംഗും മുതൽ ബ്രൈഡൽ മേക്കപ്പും നെയിൽ ആർട്ടും വരെ ഞങ്ങൾ എല്ലാവർക്കും പ്രത്യേക സേവനങ്ങൾ നൽകുന്നു.",
      },
    },
    {
      question: { en: "How do I book an appointment at DAVIN Beauty Salon in Kochi?", ml: "കൊച്ചിയിലെ DAVIN ബ്യൂട്ടി സലൂണിൽ എങ്ങനെ അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യാം?" },
      answer: {
        en: "You can book an appointment by calling or WhatsApp-ing us at +91 80890 69996. Walk-ins are also welcome subject to availability. For bridal and special occasion bookings, we recommend reaching out at least 4–6 weeks in advance.",
        ml: "+91 80890 69996 എന്ന നമ്പറിൽ വിളിച്ചോ വാട്ട്‌സ്ആപ്പ് ചെയ്തോ നിങ്ങൾക്ക് അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യാം. ലഭ്യതയ്ക്ക് അനുസരിച്ച് വാക്ക്-ഇന്നുകൾക്കും സ്വാഗതം. ബ്രൈഡൽ, പ്രത്യേക അവസര ബുക്കിംഗുകൾക്ക്, കുറഞ്ഞത് 4–6 ആഴ്ച മുൻപ് ബന്ധപ്പെടാൻ ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു.",
      },
    },
    {
      question: { en: "Does DAVIN offer bridal makeup services?", ml: "DAVIN ബ്രൈഡൽ മേക്കപ്പ് സേവനങ്ങൾ നൽകുന്നുണ്ടോ?" },
      answer: {
        en: "Absolutely. DAVIN's certified bridal makeup artists offer a full range of bridal services including traditional Kerala bridal makeup, HD bridal makeup, airbrush bridal makeup, Indo-Western bridal looks, and complete bridal packages that include hair styling, saree draping, and pre-bridal skin care.",
        ml: "തീർച്ചയായും. DAVIN-ന്റെ സർട്ടിഫൈഡ് ബ്രൈഡൽ മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ പരമ്പരാഗത കേരള ബ്രൈഡൽ മേക്കപ്പ്, HD ബ്രൈഡൽ മേക്കപ്പ്, എയർബ്രഷ് ബ്രൈഡൽ മേക്കപ്പ്, ഇൻഡോ-വെസ്റ്റേൺ ബ്രൈഡൽ ലുക്കുകൾ, ഹെയർ സ്റ്റൈലിംഗ്, സാരി ഡ്രേപ്പിംഗ്, പ്രീ-ബ്രൈഡൽ സ്കിൻ കെയർ എന്നിവ ഉൾപ്പെടുന്ന സമ്പൂർണ്ണ ബ്രൈഡൽ പാക്കേജുകൾ ഉൾപ്പെടെ പൂർണ്ണമായ ബ്രൈഡൽ സേവനങ്ങൾ നൽകുന്നു.",
      },
    },
  ],
}

export const finalCtaConfig: FinalCtaConfig = {
  title: {
    en: "Ready for Your Transformation?",
    ml: "നിങ്ങളുടെ പരിവർത്തനത്തിന് തയ്യാറാണോ?",
  },
  body: {
    en: "Whether it's an everyday refresh, a special occasion glam-up, or the bridal look of your dreams, DAVIN Beauty Salon is here to make it happen. Our doors are open, our team is ready, and your best look is just one appointment away.",
    ml: "ദൈനംദിന പുതുക്കൽ ആയാലും, പ്രത്യേക അവസര ഗ്ലാം-അപ്പ് ആയാലും, നിങ്ങളുടെ സ്വപ്ന ബ്രൈഡൽ ലുക്ക് ആയാലും, DAVIN ബ്യൂട്ടി സലൂൺ അത് സാധ്യമാക്കാൻ ഇവിടെയുണ്ട്. ഞങ്ങളുടെ വാതിലുകൾ തുറന്നിരിക്കുന്നു, ഞങ്ങളുടെ ടീം തയ്യാറാണ്, നിങ്ങളുടെ ഏറ്റവും മികച്ച ലുക്ക് ഒരു അപ്പോയിന്റ്മെന്റ് അകലെയാണ്.",
  },
  address: "1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu, Kaloor, Kochi – 682025",
  phone: "+91 80890 69996",
  hours: {
    en: "Open Daily: 9:00 AM – 9:00 PM",
    ml: "എല്ലാ ദിവസവും തുറന്നിരിക്കും: രാവിലെ 9:00 – രാത്രി 9:00",
  },
  instagramHandle: "@davin.salon.kaloor",
  instagramHref: "https://www.instagram.com/davin.salon.kaloor/",
  buttons: [
    { label: { en: "Book Appointment", ml: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക" }, href: "tel:+918089069996" },
    { label: { en: "Call Us", ml: "വിളിക്കുക" }, href: "tel:+918089069996" },
    { label: { en: "Get Directions", ml: "വഴി കാണിക്കുക" }, href: "https://www.google.com/maps/search/?api=1&query=DAVIN+Beauty+Salon+PM+Square+Stadium+Link+Road+Kaloor+Kochi" },
    { label: { en: "WhatsApp Us", ml: "വാട്ട്‌സ്ആപ്പ് ചെയ്യുക" }, href: "https://wa.me/918089069996" },
  ],
}

export const footerConfig: FooterConfig = {
  tagline: {
    en: "Luxury Hair · Skin · Grooming — Redefining Your Look Every Visit",
    ml: "ആഡംബര ഹെയർ · സ്കിൻ · ഗ്രൂമിംഗ് — ഓരോ സന്ദർശനത്തിലും നിങ്ങളുടെ ലുക്ക് പുനർനിർവചിക്കുന്നു",
  },
  quickLinksLabel: { en: "Quick Links", ml: "ക്വിക്ക് ലിങ്കുകൾ" },
  servicesLabel: { en: "Our Services", ml: "ഞങ്ങളുടെ സേവനങ്ങൾ" },
  contactLabel: { en: "Contact", ml: "ബന്ധപ്പെടുക" },
  followLabel: { en: "Follow Us", ml: "ഞങ്ങളെ പിന്തുടരുക" },
  instagramHandle: "@davin.salon.kaloor",
  instagramHref: "https://www.instagram.com/davin.salon.kaloor/",
  address: "1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu, Kaloor, Kochi – 682025",
  phone: "+91 80890 69996",
  hours: {
    en: "Open Daily: 9 AM – 9 PM",
    ml: "എല്ലാ ദിവസവും തുറന്നിരിക്കും: രാവിലെ 9 – രാത്രി 9",
  },
  copyrightText: "© 2025 DAVIN Beauty Salon. All rights reserved. Est. 2020 · Kaloor, Kochi, Kerala",
  statusText: {
    en: "Stadium Link Road, Kaloor · Open Daily · +91 80890 69996",
    ml: "സ്ടേഡിയം ലിങ്ക് രോഡ്, കാലൂർ · പ്രതിദിനം തുറന്നു · +91 80890 69996",
  },
}

export const featuredConfig: FeaturedConfig = {
  image: img("/images/featured-haircut.jpg"),
  eyebrow: {
    en: "EXPERIENCE THE DAVIN DIFFERENCE",
    ml: "DAVIN അനുഭവം അൽപ്പിക്കുക",
  },
  title: {
    en: "Where Beauty Meets Artistry",
    ml: "സൌന്ദര്‍യം കലാ കളിക്കുന്ന ഇടം",
  },
  subtitle: {
    en: "Step into our world of luxury. From the moment you sit in our chair, every snip, every stroke, every detail is designed to reveal your most radiant self. Our stylists don't just cut hair — they sculpt confidence.",
    ml: "ഞങ്ങളുടെ ആഡംബര ലോകത്തിലേക്ക് കടന്നുവരൂ. നിങ്ങൾ ഞങ്ങളുടെ കസേരയിൽ ഇരിക്കുന്ന നിമിഷം മുതൽ, ഓരോ കത്രിക്കൽ, ഓരോ സ്ട്രോക്ക്, ഓരോ വിശദാംശവും നിങ്ങളുടെ ഏറ്റവും തിളക്കമുള്ള സ്വത്വത്തെ വെളിപ്പെടുത്താൻ രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു. ഞങ്ങളുടെ സ്റ്റൈലിസ്റ്റുകൾ വെറും മുടി മുറിക്കുകയല്ല — ആത്മവിശ്വാസം കൊത്തിയെടുക്കുകയാണ്.",
  },
}

export const aboutConfig: AboutConfig = {
  urlSlug: "/about-us",
  metaTitle: "About Us |  DAVIN Beauty Salon",
  metaDescription: "Discover who we are at DAVIN Beauty Salon, Kochi. Years of expertise, a passion for beauty, and a welcoming space where you always come first.",
  hero: {
    eyebrow: {
      en: "OUR STORY",
      ml: "ഞങ്ങളുടെ കഥ",
    },
    h1: {
      en: "The Story Behind DAVIN Beauty Salon — Kaloor's Premier Beauty Destination",
      ml: "DAVIN ബ്യൂട്ടി സലൂണിന്റെ കഥ — കാലൂരിലെ പ്രമുഖ ബ്യൂട്ടി ഡെസ്റ്റിനേഷൻ",
    },
    image: img("/images/salon-interior.jpg"),
    imageAlt: {
      en: "Luxurious interior of DAVIN Beauty Salon Kaloor Kochi",
      ml: "Luxurious interior of DAVIN Beauty Salon Kaloor Kochi",
    },
  },
  story: {
    h2: {
      en: "Born in Kochi, Built on Passion",
      ml: "കൊച്ചിയിൽ പിറന്നു, അഭിനിവേശത്തിൽ പണിതുയർത്തി",
    },
    paragraphs: {
      en: [
        "It all started with a simple but powerful belief: every person deserves to look and feel extraordinary. Founded in 2020, DAVIN Beauty Salon opened its doors on Stadium Link Road, Kaloor, with a singular mission to bring luxury beauty experiences to the heart of Kochi that were previously only accessible in high-end metropolitan salons.",
        "What began as a neighborhood salon quickly grew into a community institution. Today, with a 4.8-star Google rating, over 767 glowing client reviews, and an Instagram community of 10,800+ loyal followers, DAVIN stands as one of the most trusted and celebrated beauty destinations in Ernakulam.",
        "We are not just a salon. We are a transformation studio where expertise meets artistry, and where every client is treated as an individual not a number.",
      ],
      ml: [
        "എല്ലാം തുടങ്ങിയത് ഒരു ലളിതവും ശക്തവുമായ വിശ്വാസത്തിലാണ്: ഓരോ വ്യക്തിക്കും അസാധാരണമായി കാണപ്പെടാനും അനുഭവപ്പെടാനും അർഹതയുണ്ട്. 2020-ൽ സ്ഥാപിതമായ DAVIN ബ്യൂട്ടി സലൂൺ, മുമ്പ് ഉന്നത നഗര സലൂണുകളിൽ മാത്രം ലഭ്യമായിരുന്ന ആഡംബര സൗന്ദര്യ അനുഭവങ്ങൾ കൊച്ചിയുടെ ഹൃദയഭാഗത്ത് എത്തിക്കുക എന്ന ഒറ്റ ലക്ഷ്യത്തോടെ കാലൂരിലെ സ്റ്റേഡിയം ലിങ്ക് റോഡിൽ അതിന്റെ വാതിലുകൾ തുറന്നു.",
        "ഒരു നാട്ടിൻപുറത്തെ സലൂണായി തുടങ്ങിയത് വേഗത്തിൽ ഒരു സമൂഹ സ്ഥാപനമായി വളർന്നു. ഇന്ന്, 4.8-സ്റ്റാർ ഗൂഗിൾ റേറ്റിംഗോടെയും 767-ലധികം മികച്ച ക്ലയന്റ് റിവ്യൂകളോടെയും 10,800+ വിശ്വസ്ത ഫോളോവേഴ്സുള്ള ഇൻസ്റ്റാഗ്രാം കമ്മ്യൂണിറ്റിയോടെയും, എറണാകുളത്തെ ഏറ്റവും വിശ്വസനീയവും ആഘോഷിക്കപ്പെടുന്നതുമായ ബ്യൂട്ടി ഡെസ്റ്റിനേഷനുകളിൽ ഒന്നായി DAVIN നിലകൊള്ളുന്നു.",
        "ഞങ്ങൾ വെറുമൊരു സലൂൺ അല്ല. വൈദഗ്ധ്യവും കലാവൈഭവവും ഒത്തുചേരുന്ന, ഓരോ ക്ലയന്റിനെയും ഒരു നമ്പറായിട്ടല്ല, ഒരു വ്യക്തിയായി പരിഗണിക്കുന്ന ഒരു പരിവർത്തന സ്റ്റുഡിയോ ആണ് ഞങ്ങൾ.",
      ],
    },
    stats: [
      { value: "4.8", label: { en: "Google Star Rating", ml: "ഗൂഗിൾ സ്റ്റാർ റേറ്റിംഗ്" } },
      { value: "767+", label: { en: "Client Reviews", ml: "ക്ലയന്റ് റിവ്യൂകൾ" } },
      { value: "10,800+", label: { en: "Instagram Followers", ml: "ഇൻസ്റ്റാഗ്രാം ഫോളോവേഴ്സ്" } },
      { value: "2020", label: { en: "Est. in Kaloor", ml: "കാലൂരിൽ സ്ഥാപിതം" } },
    ],
  },
  milestonesTitle: {
    en: "Our Milestones",
    ml: "ഞങ്ങളുടെ നാഴികക്കല്ലുകൾ",
  },
  milestones: [
    {
      year: "2020",
      title: { en: "The Beginning", ml: "തുടക്കം" },
      description: {
        en: "DAVIN Beauty Salon opens at Stadium Link Road, Kaloor, Kochi. Our doors open, and so does our commitment to excellence.",
        ml: "DAVIN ബ്യൂട്ടി സലൂൺ കൊച്ചിയിലെ കാലൂരിലുള്ള സ്റ്റേഡിയം ലിങ്ക് റോഡിൽ തുറക്കുന്നു. ഞങ്ങളുടെ വാതിലുകൾ തുറക്കുന്നു, മികവിനോടുള്ള ഞങ്ങളുടെ പ്രതിബദ്ധതയും അതോടൊപ്പം.",
      },
    },
    {
      year: "2021",
      title: { en: "Growing Trust", ml: "വളരുന്ന വിശ്വാസം" },
      description: {
        en: "Within just one year of operation, DAVIN earns a consistent 4.5+ star rating and begins building a loyal client base across Ernakulam.",
        ml: "പ്രവർത്തനം തുടങ്ങി ഒരു വർഷത്തിനുള്ളിൽ തന്നെ, DAVIN സ്ഥിരതയാർന്ന 4.5+ സ്റ്റാർ റേറ്റിംഗ് നേടുകയും എറണാകുളമെമ്പാടും വിശ്വസ്തരായ ക്ലയന്റുകളെ സൃഷ്ടിക്കാൻ തുടങ്ങുകയും ചെയ്യുന്നു.",
      },
    },
    {
      year: "2022",
      title: { en: "Community Connection", ml: "സമൂഹ ബന്ധം" },
      description: {
        en: "DAVIN's Instagram community grows to over 5,000 followers as our transformation videos and client testimonials resonate with beauty lovers across Kerala.",
        ml: "ഞങ്ങളുടെ പരിവർത്തന വീഡിയോകളും ക്ലയന്റ് അഭിപ്രായങ്ങളും കേരളമെമ്പാടുമുള്ള സൗന്ദര്യ പ്രേമികളിൽ സ്വാധീനം ചെലുത്തിയതോടെ DAVIN-ന്റെ ഇൻസ്റ്റാഗ്രാം കമ്മ്യൂണിറ്റി 5,000-ലധികം ഫോളോവേഴ്സായി വളരുന്നു.",
      },
    },
    {
      year: "2023",
      title: { en: "FTV Collaboration", ml: "FTV സഹകരണം" },
      description: {
        en: "DAVIN partners with FTV Salon for select bridal and premium services, reinforcing our reputation as a top-tier beauty destination in Kochi.",
        ml: "തിരഞ്ഞെടുത്ത ബ്രൈഡൽ, പ്രീമിയം സേവനങ്ങൾക്കായി DAVIN, FTV സലൂണുമായി പങ്കാളിത്തത്തിലേർപ്പെടുന്നു, കൊച്ചിയിലെ മികച്ച ബ്യൂട്ടി ഡെസ്റ്റിനേഷൻ എന്ന ഞങ്ങളുടെ പ്രശസ്തി ശക്തിപ്പെടുത്തുന്നു.",
      },
    },
    {
      year: "2024",
      title: { en: "Kochi's Most-Loved Salon", ml: "കൊച്ചിയിലെ ഏറ്റവും പ്രിയപ്പെട്ട സലൂൺ" },
      description: {
        en: "With 750+ Google reviews and a 4.8-star rating, DAVIN continues to grow, evolve, and serve as Kaloor's go-to salon for luxury beauty, hair, and grooming.",
        ml: "750+ ഗൂഗിൾ റിവ്യൂകളും 4.8-സ്റ്റാർ റേറ്റിംഗുമായി, ആഡംബര സൗന്ദര്യം, ഹെയർ, ഗ്രൂമിംഗ് എന്നിവയ്ക്കായി കാലൂരിന്റെ പ്രിയപ്പെട്ട സലൂണായി DAVIN വളർന്നും പരിണമിച്ചും തുടരുന്നു.",
      },
    },
  ],
  team: {
    h3: {
      en: "Skilled. Passionate. Dedicated to You.",
      ml: "വൈദഗ്ധ്യമുള്ളവർ. അഭിനിവേശമുള്ളവർ. നിങ്ങൾക്കായി സമർപ്പിതർ.",
    },
    paragraphs: {
      en: [
        "Our team is the heartbeat of DAVIN. Each of our professionals is selected not just for their technical skills, but for their warmth, attentiveness, and genuine care for every client who sits in their chair. Whether it's Wamis crafting a precision haircut or our makeup artists creating a flawless bridal look, you are always in expert hands.",
        "We believe in ongoing education, our stylists and therapists regularly participate in workshops and training programs to stay at the forefront of the beauty industry. This commitment means that when you visit DAVIN, you benefit from techniques that are current, innovative, and effective.",
      ],
      ml: [
        "ഞങ്ങളുടെ ടീമാണ് DAVIN-ന്റെ ഹൃദയമിടിപ്പ്. ഞങ്ങളുടെ ഓരോ പ്രൊഫഷണലും അവരുടെ സാങ്കേതിക വൈദഗ്ധ്യത്തിന് മാത്രമല്ല, അവരുടെ ഊഷ്മളതയ്ക്കും ശ്രദ്ധയ്ക്കും കസേരയിൽ ഇരിക്കുന്ന ഓരോ ക്ലയന്റിനോടുമുള്ള യഥാർത്ഥ കരുതലിനും വേണ്ടിയാണ് തിരഞ്ഞെടുക്കപ്പെടുന്നത്. വാമിസ് ഒരു കൃത്യമായ ഹെയർകട്ട് ചെയ്യുകയായാലും, ഞങ്ങളുടെ മേക്കപ്പ് ആർട്ടിസ്റ്റുകൾ കുറ്റമറ്റ ബ്രൈഡൽ ലുക്ക് സൃഷ്ടിക്കുകയായാലും, നിങ്ങൾ എപ്പോഴും വിദഗ്ധരുടെ കൈകളിലാണ്.",
        "തുടർച്ചയായ വിദ്യാഭ്യാസത്തിൽ ഞങ്ങൾ വിശ്വസിക്കുന്നു — ഞങ്ങളുടെ സ്റ്റൈലിസ്റ്റുകളും തെറാപ്പിസ്റ്റുകളും സൗന്ദര്യ വ്യവസായത്തിന്റെ മുൻനിരയിൽ തുടരാൻ പതിവായി വർക്ക്ഷോപ്പുകളിലും പരിശീലന പരിപാടികളിലും പങ്കെടുക്കുന്നു. ഇത് അർത്ഥമാക്കുന്നത്, നിങ്ങൾ DAVIN സന്ദർശിക്കുമ്പോൾ, ഏറ്റവും പുതിയതും നൂതനവും ഫലപ്രദവുമായ സാങ്കേതികവിദ്യകളുടെ പ്രയോജനം നിങ്ങൾക്ക് ലഭിക്കുന്നു എന്നാണ്.",
      ],
    },
    images: [
      {
        src: img("/images/service-hair.jpg"),
        alt: {
          en: "Professional hair stylist at work at DAVIN Salon Stadium Link Road",
          ml: "Professional hair stylist at work at DAVIN Salon Stadium Link Road",
        },
      },
      {
        src: img("/images/salon-interior.jpg"),
        alt: {
          en: "Luxurious interior of DAVIN Beauty Salon Kaloor Kochi",
          ml: "Luxurious interior of DAVIN Beauty Salon Kaloor Kochi",
        },
      },
      {
        src: img("/images/service-makeup.jpg"),
        alt: {
          en: "DAVIN Beauty Salon team of expert stylists and makeup artists Kochi",
          ml: "DAVIN Beauty Salon team of expert stylists and makeup artists Kochi",
        },
      },
    ],
  },
}

export const galleryConfig: GalleryConfig = {
  urlSlug: "/gallery",
  metaTitle: "Gallery | DAVIN Beauty Salon",
  metaDescription: "Explore real transformations at DAVIN Beauty Salon, Kaloor, Kochi. Browse our gallery of hair, skin, nails & bridal makeup looks. See why Kochi loves DAVIN.",
  hero: {
    eyebrow: {
      en: "GALLERY — DAVIN BEAUTY SALON",
      ml: "GALLERY — DAVIN BEAUTY SALON",
    },
    subEyebrow: {
      en: "Hair · Skin · Nails · Makeup",
      ml: "ഹോർ · സ്കിൻ · നേിൽസ് · മേക്കപ്പ്",
    },
    h1: {
      en: "Our Work — Real Transformations, Real Clients",
      ml: "ഞങ്ങളുടെ പ്രവർത്തി — യഥാർത്ഥ പരിവർത്തനങ്ങൾ, യഥാർത്ഥ ക്ലയന്റുകൾ",
    },
  },
  intro: {
    h2: {
      en: "Every Image Tells a Story",
      ml: "ഓരോ ചിത്രവും ഒരു കഥ പറയുന്നു",
    },
    paragraphs: {
      en: [
        "At DAVIN, we let our work speak. What you see in our gallery isn't filtered fantasy — it's real people, real results, and real transformations delivered by our expert team every single day at our salon on Stadium Link Road, Kaloor, Kochi.",
        "From stunning bridal makeovers and vibrant hair color transformations to creative nail art masterpieces and radiant skin glow-ups, this gallery is a window into the artistry, skill, and genuine care that define the DAVIN experience.",
        "Browse, be inspired and when you're ready, book your own transformation.",
      ],
      ml: [
        "DAVIN-ൽ, ഞങ്ങളുടെ പ്രവർത്തി സ്വയം സംസാരിക്കട്ടെ. ഞങ്ങളുടെ ഗാലറിയിൽ നിങ്ങൾ കാണുന്നത് ഫിൽട്ടർ ചെയ്ത ഭാവനയല്ല — ഇത് യഥാർത്ഥ ആളുകൾ, യഥാർത്ഥ ഫലങ്ങൾ, കാലൂരിലെ സ്റ്റേഡിയം ലിങ്ക് റോഡിലുള്ള ഞങ്ങളുടെ സലൂണിൽ ഞങ്ങളുടെ വിദഗ്ധ ടീം ദിവസവും നൽകുന്ന യഥാർത്ഥ പരിവർത്തനങ്ങളുമാണ്.",
        "അതിശയകരമായ ബ്രൈഡൽ മേക്കോവറുകളും ചടുലമായ ഹെയർ കളർ പരിവർത്തനങ്ങളും മുതൽ ക്രിയാത്മകമായ നെയിൽ ആർട്ട് മാസ്റ്റർപീസുകളും തിളക്കമുള്ള സ്കിൻ ഗ്ലോ-അപ്പുകളും വരെ, ഈ ഗാലറി DAVIN അനുഭവത്തെ നിർവചിക്കുന്ന കലാവൈഭവത്തിലേക്കും വൈദഗ്ധ്യത്തിലേക്കും യഥാർത്ഥ കരുതലിലേക്കുമുള്ള ഒരു ജാലകമാണ്.",
        "ബ്രൗസ് ചെയ്യുക, പ്രചോദനം ഉൾക്കൊള്ളുക, തയ്യാറാകുമ്പോൾ, നിങ്ങളുടെ സ്വന്തം പരിവർത്തനം ബുക്ക് ചെയ്യുക.",
      ],
    },
    ctaText: {
      en: "Book Your Transformation",
      ml: "നിങ്ങളുടെ പരിവർത്തനം ബുക്ക് ചെയ്യുക",
    },
    ctaHref: "tel:+918089069996",
  },
  categories: [
    {
      title: { en: "Hair Gallery", ml: "ഹോർ ഗാലറി" },
      items: [
        { slug: "haircut-1", src: img("/images/gallery/hair/haircut-1.jpg"), label: { en: "Haircut 1", ml: "Haircut 1" }, alt: { en: "Women's precision bob haircut at DAVIN Beauty Salon Kochi", ml: "Women's precision bob haircut at DAVIN Beauty Salon Kochi" } },
        { slug: "haircut-2", src: img("/images/gallery/hair/haircut-2.jpg"), label: { en: "Haircut 2", ml: "Haircut 2" }, alt: { en: "Men's fade haircut at DAVIN Salon Stadium Link Road Kaloor", ml: "Men's fade haircut at DAVIN Salon Stadium Link Road Kaloor" } },
        { slug: "balayage", src: img("/images/gallery/hair/balayage.jpg"), label: { en: "Balayage", ml: "Balayage" }, alt: { en: "Balayage hair color transformation at DAVIN Beauty Salon Ernakulam", ml: "Balayage hair color transformation at DAVIN Beauty Salon Ernakulam" } },
        { slug: "global-color", src: img("/images/gallery/hair/global-color.jpg"), label: { en: "Global Color", ml: "Global Color" }, alt: { en: "Global hair color before and after at DAVIN Salon Kochi", ml: "Global hair color before and after at DAVIN Salon Kochi" } },
        { slug: "highlights", src: img("/images/gallery/hair/highlights.jpg"), label: { en: "Highlights", ml: "Highlights" }, alt: { en: "Hair highlights and lowlights at DAVIN Beauty Salon Kochi", ml: "Hair highlights and lowlights at DAVIN Beauty Salon Kochi" } },
        { slug: "hair-spa", src: img("/images/gallery/hair/hair-spa.jpg"), label: { en: "Hair Spa", ml: "Hair Spa" }, alt: { en: "Deep conditioning hair spa treatment result at DAVIN Kochi", ml: "Deep conditioning hair spa treatment result at DAVIN Kochi" } },
        { slug: "keratin", src: img("/images/gallery/hair/keratin.jpg"), label: { en: "Keratin", ml: "Keratin" }, alt: { en: "Keratin treatment frizz-free hair result at DAVIN Kaloor Kochi", ml: "Keratin treatment frizz-free hair result at DAVIN Kaloor Kochi" } },
        { slug: "hair-botox", src: img("/images/gallery/hair/hair-botox.jpg"), label: { en: "Hair Botox", ml: "Hair Botox" }, alt: { en: "Hair botox before and after at DAVIN Beauty Salon Kochi", ml: "Hair botox before and after at DAVIN Beauty Salon Kochi" } },
      ],
    },
    {
      title: { en: "Skin Care Gallery", ml: "സ്കിൻ കെയർ ഗാലറി" },
      items: [
        { slug: "gold-facial", src: img("/images/gallery/skin/gold-facial.jpg"), label: { en: "Gold Facial", ml: "Gold Facial" }, alt: { en: "Gold facial glow result at DAVIN Beauty Salon Kaloor Kochi", ml: "Gold facial glow result at DAVIN Beauty Salon Kaloor Kochi" } },
        { slug: "clean-up", src: img("/images/gallery/skin/clean-up.jpg"), label: { en: "Clean-up", ml: "Clean-up" }, alt: { en: "Skin clean-up treatment radiant result at DAVIN Salon Kochi", ml: "Skin clean-up treatment radiant result at DAVIN Salon Kochi" } },
        { slug: "de-tan", src: img("/images/gallery/skin/de-tan.jpg"), label: { en: "De-tan", ml: "De-tan" }, alt: { en: "De-tan treatment before and after at DAVIN Beauty Salon Ernakulam", ml: "De-tan treatment before and after at DAVIN Beauty Salon Ernakulam" } },
        { slug: "waxing", src: img("/images/gallery/skin/waxing.jpg"), label: { en: "Waxing", ml: "Waxing" }, alt: { en: "Professional waxing service at DAVIN Salon Stadium Link Road", ml: "Professional waxing service at DAVIN Salon Stadium Link Road" } },
        { slug: "threading", src: img("/images/gallery/skin/threading.jpg"), label: { en: "Threading", ml: "Threading" }, alt: { en: "Expert eyebrow threading and shaping at DAVIN Beauty Salon Kochi", ml: "Expert eyebrow threading and shaping at DAVIN Beauty Salon Kochi" } },
        { slug: "hydrating-facial", src: img("/images/gallery/skin/hydrating-facial.jpg"), label: { en: "Hydrating Facial", ml: "Hydrating Facial" }, alt: { en: "Hydrating facial glowing skin at DAVIN Salon Kaloor", ml: "Hydrating facial glowing skin at DAVIN Salon Kaloor" } },
      ],
    },
    {
      title: { en: "Nails & Grooming Gallery", ml: "നെയിൽസ് & ഗ്രൂമിംഗ് ഗാലറി" },
      items: [
        { slug: "nail-art-1", src: img("/images/gallery/nails/nail-art-1.jpg"), label: { en: "Nail Art 1", ml: "Nail Art 1" }, alt: { en: "Floral nail art design at DAVIN Beauty Salon Kochi", ml: "Floral nail art design at DAVIN Beauty Salon Kochi" } },
        { slug: "nail-art-2", src: img("/images/gallery/nails/nail-art-2.jpg"), label: { en: "Nail Art 2", ml: "Nail Art 2" }, alt: { en: "Minimalist nail art at DAVIN Salon Kaloor Ernakulam", ml: "Minimalist nail art at DAVIN Salon Kaloor Ernakulam" } },
        { slug: "gel-extensions", src: img("/images/gallery/nails/gel-extensions.jpg"), label: { en: "Gel Extensions", ml: "Gel Extensions" }, alt: { en: "Gel nail extensions before and after at DAVIN Beauty Salon Kochi", ml: "Gel nail extensions before and after at DAVIN Beauty Salon Kochi" } },
        { slug: "french-manicure", src: img("/images/gallery/nails/french-manicure.jpg"), label: { en: "French Manicure", ml: "French Manicure" }, alt: { en: "Classic French manicure at DAVIN Salon Stadium Link Road", ml: "Classic French manicure at DAVIN Salon Stadium Link Road" } },
        { slug: "pedicure", src: img("/images/gallery/nails/pedicure.jpg"), label: { en: "Pedicure", ml: "Pedicure" }, alt: { en: "Spa pedicure glowing feet at DAVIN Beauty Salon Kochi", ml: "Spa pedicure glowing feet at DAVIN Beauty Salon Kochi" } },
        { slug: "beard-grooming", src: img("/images/gallery/nails/beard-grooming.jpg"), label: { en: "Beard Grooming", ml: "Beard Grooming" }, alt: { en: "Men's beard grooming and shaping at DAVIN Salon Kaloor", ml: "Men's beard grooming and shaping at DAVIN Salon Kaloor" } },
        { slug: "nail-art-festive", src: img("/images/gallery/nails/nail-art-festive.jpg"), label: { en: "Nail Art Festive", ml: "Nail Art Festive" }, alt: { en: "Festive Onam nail art at DAVIN Beauty Salon Ernakulam Kochi", ml: "Festive Onam nail art at DAVIN Beauty Salon Ernakulam Kochi" } },
      ],
    },
    {
      title: { en: "Makeup Gallery", ml: "മേക്കപ്പ് ഗാലറി" },
      items: [
        { slug: "bridal-kerala", src: img("/images/gallery/makeup/bridal-kerala.jpg"), label: { en: "Bridal Kerala", ml: "Bridal Kerala" }, alt: { en: "Traditional Kerala bridal makeup transformation at DAVIN Salon Kochi", ml: "Traditional Kerala bridal makeup transformation at DAVIN Salon Kochi" } },
        { slug: "bridal-hd", src: img("/images/gallery/makeup/bridal-hd.jpg"), label: { en: "Bridal HD", ml: "Bridal HD" }, alt: { en: "HD bridal makeup before and after at DAVIN Beauty Salon Kochi", ml: "HD bridal makeup before and after at DAVIN Beauty Salon Kochi" } },
        { slug: "bridal-modern", src: img("/images/gallery/makeup/bridal-modern.jpg"), label: { en: "Bridal Modern", ml: "Bridal Modern" }, alt: { en: "Indo-Western bridal makeup at DAVIN Salon Kaloor Ernakulam", ml: "Indo-Western bridal makeup at DAVIN Salon Kaloor Ernakulam" } },
        { slug: "party-makeup-1", src: img("/images/gallery/makeup/party-makeup-1.jpg"), label: { en: "Party Makeup 1", ml: "Party Makeup 1" }, alt: { en: "Reception party makeup look at DAVIN Beauty Salon Kochi", ml: "Reception party makeup look at DAVIN Beauty Salon Kochi" } },
        { slug: "party-makeup-2", src: img("/images/gallery/makeup/party-makeup-2.jpg"), label: { en: "Party Makeup 2", ml: "Party Makeup 2" }, alt: { en: "Engagement makeup look at DAVIN Salon Stadium Link Road Kochi", ml: "Engagement makeup look at DAVIN Salon Stadium Link Road Kochi" } },
        { slug: "saree-draping", src: img("/images/gallery/makeup/saree-draping.jpg"), label: { en: "Saree Draping", ml: "Saree Draping" }, alt: { en: "Professional saree draping service at DAVIN Beauty Salon Kochi", ml: "Professional saree draping service at DAVIN Beauty Salon Kochi" } },
        { slug: "groom-makeup", src: img("/images/gallery/makeup/groom-makeup.jpg"), label: { en: "Groom Makeup", ml: "Groom Makeup" }, alt: { en: "Groom grooming and party look at DAVIN Salon Kaloor Kochi", ml: "Groom grooming and party look at DAVIN Salon Kaloor Kochi" } },
        { slug: "festive-makeup", src: img("/images/gallery/makeup/festive-makeup.jpg"), label: { en: "Festive Makeup", ml: "Festive Makeup" }, alt: { en: "Festive occasion makeup look at DAVIN Beauty Salon Ernakulam", ml: "Festive occasion makeup look at DAVIN Beauty Salon Ernakulam" } },
      ],
    },
  ],
}

export const contactConfig: ContactConfig = {
  urlSlug: "/contact",
  metaTitle: "Contact Us | DAVIN Beauty Salon | Book Appointment Kochi",
  metaDescription: "Book an appointment at DAVIN Beauty Salon, Kaloor, Kochi. Call or WhatsApp +91 80890 69996. Located at Stadium Link Road, above HDFC Bank. Open daily 9AM–9PM.",
  hero: {
    eyebrow: {
      en: "CONTACT — DAVIN BEAUTY SALON",
      ml: "ബന്ധപ്പെടുക — DAVIN BEAUTY SALON",
    },
    subEyebrow: {
      en: "Kaloor, Kochi · Open Daily 9 AM – 9 PM",
      ml: "കാലൂർ, കൊച്ചി · എല്ലാ ദിവസവും രാവിലെ 9 – രാത്രി 9",
    },
    h1: {
      en: "Get in Touch — We're Here for You",
      ml: "ബന്ധപ്പെടുക — ഞങ്ങൾ നിങ്ങൾക്കായി ഇവിടെയുണ്ട്",
    },
  },
  intro: {
    h2: {
      en: "Your Transformation Starts with a Single Message",
      ml: "നിങ്ങളുടെ പരിവർത്തനം ഒറ്റ സന്ദേശത്തിൽ തുടങ്ങുന്നു",
    },
    paragraphs: {
      en: [
        "Whether you'd like to book an appointment, ask about a service, enquire about bridal packages, or simply find out more about what DAVIN has to offer, we'd love to hear from you. Our team is responsive, friendly, and genuinely happy to help you plan your perfect beauty experience.",
        "Reach us in whichever way works best for you. We're always just a call, a message, or a visit away.",
      ],
      ml: [
        "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യണോ, ഒരു സേവനത്തെക്കുറിച്ച് ചോദിക്കണോ, ബ്രൈഡൽ പാക്കേജുകളെക്കുറിച്ച് അന്വേഷിക്കണോ, അല്ലെങ്കിൽ DAVIN നൽകുന്നതിനെക്കുറിച്ച് കൂടുതൽ അറിയണോ — ഞങ്ങൾ നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ആഗ്രഹിക്കുന്നു. ഞങ്ങളുടെ ടീം വേഗത്തിൽ പ്രതികരിക്കുന്നവരും സൗഹൃദപരവുമാണ്, നിങ്ങളുടെ മികച്ച സൗന്ദര്യ അനുഭവം ആസൂത്രണം ചെയ്യാൻ സന്തോഷത്തോടെ സഹായിക്കും.",
        "നിങ്ങൾക്ക് ഏറ്റവും അനുയോജ്യമായ വഴിയിൽ ഞങ്ങളെ ബന്ധപ്പെടുക. ഒരു കോൾ, ഒരു സന്ദേശം, അല്ലെങ്കിൽ ഒരു സന്ദർശനം അകലെ മാത്രമേ ഞങ്ങളുള്ളൂ.",
      ],
    },
  },
  callCard: {
    title: {
      en: "Call or WhatsApp Us",
      ml: "വിളിക്കുക അല്ലെങ്കിൽ വാട്ട്‌സ്ആപ്പ് ചെയ്യുക",
    },
    description: {
      en: "The fastest and most direct way to reach us. Our team is available to answer calls and WhatsApp messages during salon hours. We typically respond within minutes during working hours.",
      ml: "ഞങ്ങളെ ബന്ധപ്പെടാനുള്ള ഏറ്റവും വേഗതയേറിയതും നേരിട്ടുള്ളതുമായ വഴി. സലൂൺ സമയങ്ങളിൽ കോളുകൾക്കും വാട്ട്‌സ്ആപ്പ് സന്ദേശങ്ങൾക്കും മറുപടി നൽകാൻ ഞങ്ങളുടെ ടീം സന്നദ്ധരാണ്. പ്രവർത്തി സമയങ്ങളിൽ സാധാരണയായി മിനിറ്റുകൾക്കുള്ളിൽ ഞങ്ങൾ മറുപടി നൽകും.",
    },
    phone: "+91 80890 69996",
    availability: {
      en: "Available daily: 9:00 AM – 9:00 PM",
      ml: "ദിവസവും ലഭ്യമാണ്: രാവിലെ 9:00 – രാത്രി 9:00",
    },
    callText: { en: "Call Now", ml: "ഇപ്പോൾ വിളിക്കുക" },
    whatsappText: { en: "WhatsApp Us", ml: "വാട്ട്‌സ്ആപ്പ് ചെയ്യുക" },
    note: {
      en: "Tap to call or send a WhatsApp message directly.",
      ml: "നേരിട്ട് വിളിക്കാനോ വാട്ട്‌സ്ആപ്പ് സന്ദേശം അയക്കാനോ ടാപ്പ് ചെയ്യുക.",
    },
  },
  visitCard: {
    title: {
      en: "Visit Us",
      ml: "ഞങ്ങളെ സന്ദർശിക്കുക",
    },
    description: {
      en: "We'd love to welcome you in person. DAVIN Beauty Salon is conveniently located in the heart of Kaloor, easy to find, easy to access.",
      ml: "നിങ്ങളെ നേരിട്ട് സ്വാഗതം ചെയ്യാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു. DAVIN ബ്യൂട്ടി സലൂൺ കാലൂരിന്റെ ഹൃദയഭാഗത്ത്, എളുപ്പത്തിൽ കണ്ടെത്താനും എത്തിച്ചേരാനും കഴിയുന്ന വിധത്തിൽ സ്ഥിതി ചെയ്യുന്നു.",
    },
    address: "DAVIN Beauty Salon 1st Floor, PM Square, Stadium Link Road, Above HDFC Bank, Kathrikadavu, Kaloor, Kochi, Ernakulam, Kerala – 682025",
    landmark: {
      en: "Directly above HDFC Bank, PM Square, Stadium Link Road, Kaloor.",
      ml: "സ്റ്റേഡിയം ലിങ്ക് റോഡ്, കാലൂർ, പി എം സ്ക്വയറിലെ എച്ച്ഡിഎഫ്‌സി ബാങ്കിന് നേരെ മുകളിൽ.",
    },
    ctaText: {
      en: "Get Directions on Google Maps",
      ml: "ഗൂഗിൾ മാപ്സിൽ വഴി കാണിക്കുക",
    },
    ctaHref: "https://www.google.com/maps/search/?api=1&query=DAVIN+Beauty+Salon+PM+Square+Stadium+Link+Road+Kaloor+Kochi",
  },
  hours: {
    title: {
      en: "Salon Hours",
      ml: "സലൂൺ സമയം",
    },
    rows: [
      { day: { en: "Monday", ml: "തിങ്കൾ" }, hours: { en: "9:00 AM – 9:00 PM", ml: "രാവിലെ 9:00 – രാത്രി 9:00" } },
      { day: { en: "Tuesday", ml: "ചൊവ്വ" }, hours: { en: "9:00 AM – 9:00 PM", ml: "രാവിലെ 9:00 – രാത്രി 9:00" } },
      { day: { en: "Wednesday", ml: "ബുധൻ" }, hours: { en: "9:00 AM – 9:00 PM", ml: "രാവിലെ 9:00 – രാത്രി 9:00" } },
      { day: { en: "Thursday", ml: "വ്യാഴം" }, hours: { en: "9:00 AM – 9:00 PM", ml: "രാവിലെ 9:00 – രാത്രി 9:00" } },
      { day: { en: "Friday", ml: "വെള്ളി" }, hours: { en: "9:00 AM – 9:00 PM", ml: "രാവിലെ 9:00 – രാത്രി 9:00" } },
      { day: { en: "Saturday", ml: "ശനി" }, hours: { en: "9:00 AM – 9:00 PM", ml: "രാവിലെ 9:00 – രാത്രി 9:00" } },
      { day: { en: "Sunday", ml: "ഞായർ" }, hours: { en: "9:00 AM – 9:00 PM", ml: "രാവിലെ 9:00 – രാത്രി 9:00" } },
    ],
    note: {
      en: "Walk-ins are welcome. For bridal, special occasion, and group bookings, we recommend calling ahead to confirm your preferred time slot.",
      ml: "വാക്ക്-ഇന്നുകൾക്ക് സ്വാഗതം. ബ്രൈഡൽ, പ്രത്യേക അവസര, ഗ്രൂപ്പ് ബുക്കിംഗുകൾക്ക്, നിങ്ങളുടെ ഇഷ്ട സമയം സ്ഥിരീകരിക്കാൻ മുൻകൂട്ടി വിളിക്കാൻ ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു.",
    },
  },
  booking: {
    title: {
      en: "Book an Appointment",
      ml: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
    },
    subtitle: {
      en: "Ready to visit DAVIN? Fill in the form below and our team will get back to you promptly to confirm your appointment.",
      ml: "DAVIN സന്ദർശിക്കാൻ തയ്യാറാണോ? താഴെയുള്ള ഫോം പൂരിപ്പിക്കുക, നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് സ്ഥിരീകരിക്കാൻ ഞങ്ങളുടെ ടീം ഉടൻ ബന്ധപ്പെടും.",
    },
    nameLabel: { en: "Your Name", ml: "നിങ്ങളുടെ പേര്" },
    namePlaceholder: { en: "Enter your full name", ml: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക" },
    phoneLabel: { en: "Phone Number", ml: "ഫോൺ നമ്പർ" },
    phonePlaceholder: { en: "Enter your mobile number", ml: "നിങ്ങളുടെ മൊബൈൽ നമ്പർ നൽകുക" },
    serviceLabel: { en: "Preferred Service", ml: "ഇഷ്ട സേവനം" },
    serviceOptions: [
      { value: "hair-care", label: { en: "Hair Care (Haircut / Color / Spa / Keratin / Botox)", ml: "ഹെയർ കെയർ (ഹെയർകട്ട് / കളർ / സ്പാ / കെരാറ്റിൻ / ബോട്ടോക്സ്)" } },
      { value: "skin-care", label: { en: "Skin Care (Facial / Clean-Up / Waxing / Threading / De-Tan)", ml: "സ്കിൻ കെയർ (ഫേഷ്യൽ / ക്ലീൻ-അപ്പ് / വാക്സിംഗ് / ത്രെഡിംഗ് / ഡീ-ടാൻ)" } },
      { value: "nails-grooming", label: { en: "Nails & Grooming (Manicure / Pedicure / Nail Art / Extensions / Beard)", ml: "നെയിൽസ് & ഗ്രൂമിംഗ് (മാനിക്യൂർ / പെഡിക്യൂർ / നെയിൽ ആർട്ട് / എക്സ്റ്റൻഷൻസ് / ബിയേഡ്)" } },
      { value: "makeup", label: { en: "Makeup (Bridal / Party / HD Makeup / Saree Draping)", ml: "മേക്കപ്പ് (ബ്രൈഡൽ / പാർട്ടി / HD മേക്കപ്പ് / സാരി ഡ്രേപ്പിംഗ്)" } },
      { value: "combo", label: { en: "Multiple Services / Combo", ml: "ഒന്നിലധികം സേവനങ്ങൾ / കോംബോ" } },
      { value: "other", label: { en: "Other / Not Sure Yet", ml: "മറ്റുള്ളവ / ഇതുവരെ ഉറപ്പില്ല" } },
    ],
    dateLabel: { en: "Preferred Date", ml: "ഇഷ്ട തീയതി" },
    datePlaceholder: { en: "Select your preferred date", ml: "നിങ്ങളുടെ ഇഷ്ട തീയതി തിരഞ്ഞെടുക്കുക" },
    timeLabel: { en: "Preferred Time", ml: "ഇഷ്ട സമയം" },
    timeOptions: [
      { value: "morning", label: { en: "Morning (9 AM – 12 PM)", ml: "രാവിലെ (9 – 12)" } },
      { value: "afternoon", label: { en: "Afternoon (12 PM – 4 PM)", ml: "ഉച്ചകഴിഞ്ഞ് (12 – 4)" } },
      { value: "evening", label: { en: "Evening (4 PM – 9 PM)", ml: "വൈകുന്നേരം (4 – 9)" } },
    ],
    submitText: { en: "Submit Booking Request", ml: "ബുക്കിംഗ് അഭ്യർത്ഥന സമർപ്പിക്കുക" },
    consentText: {
      en: "By submitting this form, you agree that DAVIN Beauty Salon may contact you via phone or WhatsApp to confirm your appointment.",
      ml: "ഈ ഫോം സമർപ്പിക്കുന്നതിലൂടെ, നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് സ്ഥിരീകരിക്കാൻ DAVIN ബ്യൂട്ടി സലൂൺ ഫോൺ വഴിയോ വാട്ട്‌സ്ആപ്പ് വഴിയോ നിങ്ങളെ ബന്ധപ്പെടാം എന്നതിന് നിങ്ങൾ സമ്മതിക്കുന്നു.",
    },
    instantNote: {
      en: "Prefer instant confirmation? Just call or WhatsApp us directly at +91 80890 69996.",
      ml: "തൽക്ഷണ സ്ഥിരീകരണം വേണോ? +91 80890 69996 എന്ന നമ്പറിൽ നേരിട്ട് വിളിക്കുകയോ വാട്ട്‌സ്ആപ്പ് ചെയ്യുകയോ ചെയ്യുക.",
    },
    successText: {
      en: "Thank you! We've opened WhatsApp with your request pre-filled — just hit send and our team will confirm shortly.",
      ml: "നന്ദി! നിങ്ങളുടെ അഭ്യർത്ഥനയോടെ വാട്ട്‌സ്ആപ്പ് തുറന്നിട്ടുണ്ട് — അയക്കുക ബട്ടൺ അമർത്തുക, ഞങ്ങളുടെ ടീം ഉടൻ സ്ഥിരീകരിക്കും.",
    },
  },
  map: {
    title: {
      en: "Find Us — Location Map",
      ml: "ഞങ്ങളെ കണ്ടെത്തുക — സ്ഥാന ഭൂപടം",
    },
    note: {
      en: "Search \"DAVIN Beauty Salon Kaloor\" on Google Maps to get live directions.",
      ml: "ലൈവ് വഴി ലഭിക്കാൻ ഗൂഗിൾ മാപ്സിൽ \"DAVIN Beauty Salon Kaloor\" എന്ന് തിരയുക.",
    },
    embedSrc: "https://www.google.com/maps?q=DAVIN+Beauty+Salon+PM+Square+Stadium+Link+Road+Kathrikadavu+Kaloor+Kochi+Ernakulam+Kerala+682025&output=embed",
  },
  closing: {
    title: {
      en: "We'd Love to See You",
      ml: "നിങ്ങളെ കാണാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു",
    },
    body: {
      en: "Every great beauty experience starts with a visit. Whether you've been planning a new look for months or decide on a whim — DAVIN Beauty Salon on Stadium Link Road, Kaloor is ready to welcome you. Our team is waiting to listen, to create, and to make sure you walk out feeling absolutely brilliant.",
      ml: "ഓരോ മികച്ച സൗന്ദര്യ അനുഭവവും ഒരു സന്ദർശനത്തിൽ തുടങ്ങുന്നു. മാസങ്ങളായി ഒരു പുതിയ ലുക്ക് ആസൂത്രണം ചെയ്യുകയായാലും പെട്ടെന്ന് തീരുമാനിക്കുകയായാലും — കാലൂരിലെ സ്റ്റേഡിയം ലിങ്ക് റോഡിലുള്ള DAVIN ബ്യൂട്ടി സലൂൺ നിങ്ങളെ സ്വാഗതം ചെയ്യാൻ തയ്യാറാണ്. ശ്രദ്ധിക്കാനും സൃഷ്ടിക്കാനും നിങ്ങൾ പൂർണ്ണമായും തിളക്കത്തോടെ പുറത്തിറങ്ങുന്നുവെന്ന് ഉറപ്പാക്കാനും ഞങ്ങളുടെ ടീം കാത്തിരിക്കുന്നു.",
    },
    address: "PM Square, Stadium Link Road, Kaloor, Kochi – 682025",
    phone: "+91 80890 69996",
    hours: {
      en: "Open Every Day: 9:00 AM – 9:00 PM",
      ml: "എല്ലാ ദിവസവും തുറന്നിരിക്കും: രാവിലെ 9:00 – രാത്രി 9:00",
    },
    buttons: [
      { label: { en: "Book Appointment", ml: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക" }, href: "tel:+918089069996" },
      { label: { en: "WhatsApp Us", ml: "വാട്ട്‌സ്ആപ്പ് ചെയ്യുക" }, href: "https://wa.me/918089069996" },
      { label: { en: "Get Directions", ml: "വഴി കാണിക്കുക" }, href: "https://www.google.com/maps/search/?api=1&query=DAVIN+Beauty+Salon+PM+Square+Stadium+Link+Road+Kaloor+Kochi" },
    ],
    exploreLabel: {
      en: "Explore our services:",
      ml: "ഞങ്ങളുടെ സേവനങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക:",
    },
    exploreLinks: [
      { label: { en: "Hair Care", ml: "ഹെയർ കെയർ" }, href: "/services/hair-care" },
      { label: { en: "Skin Care", ml: "സ്കിൻ കെയർ" }, href: "/services/skin-care" },
      { label: { en: "Nails & Grooming", ml: "നെയിൽസ് & ഗ്രൂമിംഗ്" }, href: "/services/nails-grooming" },
      { label: { en: "Makeup", ml: "മേക്കപ്പ്" }, href: "/services/makeup" },
    ],
  },
}
