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
  titleLines: string[]
  leadText: Record<Language, string>
  supportingNotes: Record<Language, string[]>
}

export interface ManifestoConfig {
  videoPath: string
  text: Record<Language, string>
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
  utcOffset: number
  article: FacilityArticle
}

export interface FacilitiesConfig {
  sectionLabel: Record<Language, string>
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
}

export interface ArchivesConfig {
  sectionLabel: Record<Language, string>
  vaultTitle: Record<Language, string>
  closeText: Record<Language, string>
  items: ArchiveItem[]
}

export interface FooterConfig {
  copyrightText: string
  statusText: Record<Language, string>
}

export interface FeaturedConfig {
  image: string
  eyebrow: Record<Language, string>
  title: Record<Language, string>
  subtitle: Record<Language, string>
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "DAVIN Beauty Salon",
  siteDescription: "DAVIN Beauty Salon is Kaloor's premier family destination for professional haircare, skincare, and grooming services.",
}

export const navigationConfig: NavigationConfig = {
  brandName: "DAVIN",
  links: [
    { label: "Services", href: "#facilities" },
    { label: "Gallery", href: "#archives" },
    { label: "Contact", href: "#observation" },
  ],
}

export const heroConfig: HeroConfig = {
  eyebrow: {
    en: "LUXURY HAIR \u00b7 SKIN \u00b7 GROOMING",
    ml: "\u0d32\u0d15\u0d4d\u0d37\u0d4d\u0d2f\u0d31\u0d3f \u0d39\u0d47\u0d3e\u0d7d\u0d30\u0d4d\u200d \u00b7 \u0d38\u0d4d\u0d15\u0d3f\u0d7b \u00b7 \u0d17\u0d4d\u0d30\u0d42\u0d2e\u0d3f\u0d02\u0d17\u0d4d",
  },
  titleLines: [
    "Redefining",
    "Your Look",
    "Every Visit",
  ],
  leadText: {
    en: "DAVIN BEAUTY SALON is Kaloor's premier family destination for professional haircare, skincare, and grooming services.",
    ml: "\u0d15\u0d3e\u0d32\u0d42\u0d7c \u0d2e\u0d47\u0d16\u0d32\u0d3e\u0d24\u0d4d\u0d24\u0d46 \u0d2a\u0d4d\u0d30\u0d2e\u0d3e\u0d23 \u0d2b\u0d3e\u0d2e\u0d3f\u0d32\u0d3f \u0d38\u0d3e\u0d32\u0d4b\u0d7a \u0d06\u0d2f\u0d3e\u0d23\u0d4d DAVIN. \u0d2a\u0d4d\u0d30\u0d2e\u0d3e\u0d23 \u0d39\u0d47\u0d3e\u0d7c\u0d15\u0d47\u0d3e\u0d7d, \u0d38\u0d4d\u0d15\u0d3f\u0d7b\u0d15\u0d47\u0d3e\u0d7d, \u0d17\u0d4d\u0d30\u0d42\u0d2e\u0d3f\u0d02\u0d17\u0d4d \u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e \u0d28\u0d32\u0d4d\u0d15\u0d3f \u0d28\u0d3f\u0d19\u0d4d\u0d19\u0d33\u0d4d\u200d\u0d15\u0d4d\u0d15\u0d4d \u0d32\u0d2d\u0d4d\u0d2f\u0d2e\u0d3e\u0d2f \u0d38\u0d02\u0d25\u0d3e\u0d28\u0d02.",
  },
  supportingNotes: {
    en: [
      "Haircuts \u00b7 Hair Color \u00b7 Hair Spa \u00b7 Keratin",
      "Bridal Makeup \u00b7 Nail Art \u00b7 Facials \u00b7 Waxing",
      "Stadium Link Road, Kaloor \u00b7 +91 80890 69996",
    ],
    ml: [
      "\u0d39\u0d47\u0d3e\u0d7c\u0d15\u0d31\u0d4d\u0d31\u0d4d \u00b7 \u0d39\u0d47\u0d3e\u0d7c \u0d15\u0d32\u0d7c \u00b7 \u0d39\u0d47\u0d3e\u0d7c \u0d38\u0d4d\u0d2a\u0d3e \u00b7 \u0d15\u0d47\u0d3e\u0d7d\u0d30\u0d1f\u0d3f\u0d7b",
      "\u0d2c\u0d4d\u0d30\u0d48\u0d21\u0d7d \u0d2e\u0d47\u0d15\u0d4d\u0d15\u0d2a\u0d4d\u0d2a\u0d4d \u00b7 \u0d28\u0d47\u0d3f\u0d7d \u0d06\u0d7c\u0d1f\u0d4d\u0d1f\u0d4d \u00b7 \u0d2b\u0d47\u0d37\u0d3f\u0d2f\u0d7d \u00b7 \u0d35\u0d3e\u0d15\u0d4d\u0d38\u0d3f\u0d02\u0d17\u0d4d",
      "\u0d38\u0d4d\u0d1f\u0d47\u0d21\u0d3f\u0d2f\u0d02 \u0d32\u0d3f\u0d19\u0d4d\u0d15\u0d4d \u0d30\u0d4b\u0d21\u0d4d, \u0d15\u0d3e\u0d32\u0d42\u0d7c \u00b7 +91 80890 69996",
    ],
  },
}

export const manifestoConfig: ManifestoConfig = {
  videoPath: "/videos/salon-ambience.mp4",
  text: {
    en: "At DAVIN, every visit is a transformation. Our experienced stylists and beauty professionals blend modern techniques with personalized care \u2014 creating looks that celebrate your unique beauty. From precision haircuts to bridal makeovers, we craft experiences that leave you radiant.",
    ml: "DAVIN-\u0d07\u0d32\u0d4d\u200d, \u0d0e\u0d32\u0d4d\u0d32\u0d3e \u0d35\u0d3f\u0d38\u0d3f\u0d24\u0d2e\u0d3e\u0d23\u0d4d \u0d12\u0d30\u0d41 \u0d2e\u0d3e\u0d31\u0d4d\u0d31\u0d02. \u0d2a\u0d4d\u0d30\u0d35\u0d43\u0d24\u0d4d\u0d24\u0d2e\u0d3e\u0d2f \u0d38\u0d4d\u0d1f\u0d48\u0d32\u0d3f\u0d38\u0d4d\u0d1f\u0d41\u0d15\u0d33\u0d41\u0d02 \u0d38\u0d4c\u0d28\u0d4d\u0d26\u0d30\u0d4d\u200d\u0d2f\u0d2e\u0d41\u0d33\u0d4d\u0d33 \u0d2e\u0d47\u0d16\u0d32\u0d3e \u0d06\u0d37\u0d3e\u0d7d\u0d15\u0d3e\u0d30\u0d41\u0d15\u0d33\u0d41\u0d02 \u0d28\u0d3f\u0d19\u0d4d\u0d19\u0d33\u0d3f\u0d32\u0d47\u0d15\u0d4d\u0d15\u0d3e\u0d2f\u0d3f \u0d15\u0d3e\u0d30\u0d4d\u0d2f\u0d2e\u0d41\u0d33\u0d4d\u0d33 \u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e \u0d28\u0d32\u0d4d\u0d15\u0d3f \u0d28\u0d3f\u0d19\u0d4d\u0d19\u0d33\u0d46 \u0d2a\u0d4d\u0d30\u0d24\u0d4d\u0d2f\u0d47\u0d15\u0d2e\u0d3e\u0d2f\u0d3f \u0d2e\u0d3e\u0d31\u0d4d\u0d31\u0d41\u0d28\u0d41.",
  },
}

export const facilitiesConfig: FacilitiesConfig = {
  sectionLabel: {
    en: "Our Services",
    ml: "\u0d08 \u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e",
  },
  detailBackText: {
    en: "Back to Services",
    ml: "\u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e\u0d15\u0d4d\u0d15\u0d4d \u0d24\u0d3f\u0d30\u0d3f\u0d1a\u0d4d\u0d1a\u0d41",
  },
  detailNotFoundText: {
    en: "Service not found.",
    ml: "\u0d38\u0d47\u0d35\u0d28\u0d02 ക\u0d23\u0d4d\u0d1f\u0d46\u0d24\u0d4d\u0d24\u0d3f\u0d32\u0d4d\u0d32.",
  },
  detailReturnText: {
    en: "Return to all services",
    ml: "\u0d0e\u0d32\u0d4d\u0d32\u0d3e \u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e\u0d15\u0d4d\u0d15\u0d4d \u0d2e\u0d31\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d15",
  },
  items: [
    {
      slug: "hair-care",
      name: {
        en: "Hair Care",
        ml: "\u0d39\u0d47\u0d3e\u0d7c \u0d15\u0d47\u0d3e\u0d7d",
      },
      code: "HC",
      address: {
        en: "Haircuts \u00b7 Styling \u00b7 Color \u00b7 Spa \u00b7 Keratin \u00b7 Botox",
        ml: "\u0d39\u0d47\u0d3e\u0d7c\u0d15\u0d31\u0d4d\u0d31\u0d4d \u00b7 \u0d38\u0d4d\u0d31\u0d4d\u0d31\u0d48\u0d32\u0d3f\u0d02\u0d17\u0d4d \u00b7 \u0d15\u0d32\u0d7c \u00b7 \u0d38\u0d4d\u0d2a\u0d3e \u00b7 \u0d15\u0d47\u0d3e\u0d7d\u0d30\u0d1f\u0d3f\u0d7b \u00b7 \u0d2c\u0d4b\u0d31\u0d4d\u0d38\u0d4d",
      },
      status: {
        en: "All hair types welcome",
        ml: "\u0d0e\u0d32\u0d4d\u0d32\u0d3e \u0d39\u0d47\u0d3e\u0d7c \u0d24\u0d30\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d02 \u0d38\u0d4d\u0d35\u0d3e\u0d17\u0d24\u0d02",
      },
      email: "",
      phone: "+91 80890 69996",
      ctaText: {
        en: "Book Now",
        ml: "\u0d2c\u0d41\u0d15\u0d4d\u0d15\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",
      },
      ctaHref: "tel:+918089069996",
      image: "/images/service-hair.jpg",
      utcOffset: 5.5,
      article: {
        title: {
          en: "Hair Care Services",
          ml: "\u0d39\u0d47\u0d3e\u0d7c \u0d15\u0d47\u0d3e\u0d7d \u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e",
        },
        paragraphs: {
          en: [
            "From precision cuts to transformative color, our hair experts craft styles that complement your personality and lifestyle. We use premium products and the latest techniques to ensure your hair looks and feels its absolute best.",
            "Our signature services include professional haircuts for men, women, and children, creative hair coloring with global and streak highlights, rejuvenating hair spa treatments, smoothing keratin therapy, and restorative hair botox treatments.",
          ],
          ml: [
            "\u0d2a\u0d4d\u0d30\u0d47\u0d15\u0d4d\u0d37\u0d23 \u0d15\u0d1f\u0d4d\u0d1f\u0d41\u0d15\u0d33\u0d3f\u0d32\u0d3e\u0d30\u0d02\u0d2d\u0d24\u0d4d \u0d28\u0d3f\u0d31\u0d02\u0d24\u0d30\u0d2e\u0d3e\u0d2f \u0d15\u0d32\u0d7c\u0d35\u0d30\u0d46\u0d15\u0d4d\u0d15\u0d41\u0d02. \u0d2a\u0d4d\u0d30\u0d2e\u0d3e\u0d23 \u0d09\u0d2a\u0d15\u0d30\u0d23\u0d15\u0d33\u0d41\u0d02 \u0d2e\u0d47\u0d16\u0d32\u0d3e \u0d09\u0d2a\u0d15\u0d30\u0d23\u0d15\u0d33\u0d41\u0d02 \u0d0e\u0d7d\u0d32\u0d4d\u0d32\u0d3e\u0d02 \u0d15\u0d3e\u0d23\u0d3f\u0d1a\u0d4d\u0d1a\u0d41\u0d35\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28\u0d41.",
            "\u0d35\u0d3f\u0d2e\u0d4d\u0d2e\u0d40\u0d15\u0d4d\u0d15\u0d41\u0d33\u0d4d\u0d33 \u0d12\u0d30\u0d41 \u0d15\u0d47\u0d38\u0d4d\u0d38\u0d41\u0d02 \u0d2a\u0d4b\u0d32\u0d46 \u0d15\u0d3e\u0d33\u0d4d\u0d15\u0d4d\u0d15\u0d42\u0d1f\u0d4d\u0d1f\u0d46 \u0d38\u0d46\u0d2f\u0d4d\u0d35\u0d28 \u0d0e\u0d23\u0d4d\u0d23\u0d4b \u0d15\u0d33\u0d4d\u0d33\u0d24\u0d4d \u0d15\u0d3e\u0d23\u0d41\u0d28\u0d4d\u0d28\u0d24\u0d4d.",
          ],
        },
      },
    },
    {
      slug: "skin-care",
      name: {
        en: "Skin Care",
        ml: "\u0d38\u0d4d\u0d15\u0d3f\u0d7b \u0d15\u0d47\u0d3e\u0d7d",
      },
      code: "SC",
      address: {
        en: "Facials \u00b7 Clean-ups \u00b7 Waxing \u00b7 Threading \u00b7 De-Tan",
        ml: "\u0d2b\u0d47\u0d37\u0d3f\u0d2f\u0d7d \u00b7 \u0d15\u0d4d\u0d32\u0d40\u0d7a-\u0d05\u0d2a\u0d4d\u0d38\u0d4d \u00b7 \u0d35\u0d3e\u0d15\u0d4d\u0d38\u0d3f\u0d02\u0d17\u0d4d \u00b7 \u0d24\u0d4d\u0d30\u0d46\u0d21\u0d3f\u0d02\u0d17\u0d4d \u00b7 \u0d21\u0d40-\u0d1f\u0d3e\u0d7b",
      },
      status: {
        en: "Glowing skin guaranteed",
        ml: "\u0d24\u0d3f\u0d33\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28 \u0d38\u0d4d\u0d15\u0d3f\u0d7b \u0d17\u0d3e\u0d30\u0d46\u0d23\u0d4d\u0d1f\u0d40",
      },
      email: "",
      phone: "+91 80890 69996",
      ctaText: {
        en: "Book Now",
        ml: "\u0d2c\u0d41\u0d15\u0d4d\u0d15\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",
      },
      ctaHref: "tel:+918089069996",
      image: "/images/service-skin.jpg",
      utcOffset: 5.5,
      article: {
        title: {
          en: "Skin Care Services",
          ml: "\u0d38\u0d4d\u0d15\u0d3f\u0d7b \u0d15\u0d47\u0d3e\u0d7d \u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e",
        },
        paragraphs: {
          en: [
            "Reveal your natural radiance with our comprehensive skincare treatments. Our experienced aestheticians analyze your skin type and customize each facial, cleanup, and treatment to address your specific concerns.",
            "We offer deep-cleansing facials, rejuvenating gold and diamond facials, gentle waxing for all body areas, precise eyebrow and upper-lip threading, and effective de-tan treatments to restore your natural complexion.",
          ],
          ml: [
            "\u0d24\u0d19\u0d4d\u0d19\u0d33\u0d41\u0d1f\u0d46 \u0d38\u0d4d\u0d35\u0d3e\u0d2d\u0d3e\u0d35\u0d3f\u0d15\u0d3e\u0d28\u0d02 \u0d15\u0d3e\u0d23\u0d3e\u0d28\u0d4d \u0d28\u0d2e\u0d4d\u0d2e\u0d41\u0d1f\u0d46 \u0d15\u0d47\u0d3e\u0d7d\u0d38\u0d4d\u0d38\u0d15\u0d33\u0d3f\u0d32\u0d42\u0d1f\u0d46 \u0d38\u0d39\u0d3e\u0d2f\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d02. \u0d2e\u0d47\u0d16\u0d32\u0d3e \u0d2a\u0d4d\u0d30\u0d4b\u0d21\u0d15\u0d4dറ\u0d4d\u0d31\u0d15\u0d7e \u0d09\u0d2a\u0d2f\u0d4b\u0d17\u0d3f\u0d1a\u0d4dച\u0d4d \u0d15\u0d42\u0d1f\u0d41\u0d24\u0d32\u0d4dല \u0d2b\u0d32\u0d19\u0d4dങ\u0d33\u0d3f\u0d32\u0d47\u0d15\u0d4dക\u0d4d \u0d15\u0d3e\u0d23\u0d3f\u0d1a്ച\u0d41\u0d35\u0d3f\u0d15്കുന്ന\u0d41.",
          ],
        },
      },
    },
    {
      slug: "nails-grooming",
      name: {
        en: "Nails & Grooming",
        ml: "\u0d28\u0d47\u0d3f\u0d7d\u0d38\u0d4d \u0d0e\u0d7a\u0d17\u0d4d \u0d17\u0d4d\u0d30\u0d42\u0d2e\u0d3f\u0d02\u0d17\u0d4d",
      },
      code: "NG",
      address: {
        en: "Manicure \u00b7 Pedicure \u00b7 Nail Art \u00b7 Extensions \u00b7 Beard",
        ml: "\u0d2e\u0d3e\u0d28\u0d3f\u0d15\u0d4d\u0d2f\u0d42\u0d7c \u00b7 \u0d2a\u0d47\u0d21\u0d3f\u0d15\u0d4d\u0d2f\u0d42\u0d7c \u00b7 \u0d28\u0d47\u0d3f\u0d7d \u0d06\u0d7c\u0d1f\u0d4d\u0d1f\u0d4d \u00b7 \u0d10\u0d15\u0d4d\u0d38\u0d4d\u0d31\u0d4d\u0d31\u0d46\u0d7b\u0d37\u0d28\u0d4d\u0d38\u0d4d \u00b7 \u0d24\u0d3e\u0d21\u0d3f",
      },
      status: {
        en: "Pamper your hands & feet",
        ml: "\u0d15\u0d48 \u0d0e\u0d23\u0d4d\u0d23\u0d02 \u0d15\u0d48 \u0d0e\u0d23\u0d4d\u0d23\u0d02 \u0d05\u0d7d\u0d2a\u0d4d\u0d2a\u0d02 \u0d15\u0d3e\u0d23\u0d3f\u0d15\u0d4dക\u0d41\u0d15",
      },
      email: "",
      phone: "+91 80890 69996",
      ctaText: {
        en: "Book Now",
        ml: "\u0d2c\u0d41\u0d15\u0d4d\u0d15\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",
      },
      ctaHref: "tel:+918089069996",
      image: "/images/service-nails.jpg",
      utcOffset: 5.5,
      article: {
        title: {
          en: "Nails & Grooming",
          ml: "\u0d28\u0d47\u0d3f\u0d7d\u0d38\u0d41\u0d02 \u0d0e\u0d7a\u0d17\u0d4d \u0d17\u0d4d\u0d30\u0d42\u0d2e\u0d3f\u0d02\u0d17\u0d41\u0d02",
        },
        paragraphs: {
          en: [
            "Indulge in our luxurious nail and grooming services designed to keep you looking polished from head to toe. Our nail technicians are artists, creating everything from classic manicures to elaborate nail art designs.",
            "Services include classic and spa manicures and pedicures, creative nail art with gel and acrylic options, nail extensions for added length and strength, and professional beard grooming and shaping for a refined look.",
          ],
          ml: [
            "\u0d15\u0d48\u0d2e\u0d3e\u0d24\u0d4d\u0d24 \u0d28\u0d47\u0d3f\u0d7d\u0d15\u0d33\u0d3f\u0d32\u0d47\u0d15\u0d4dക\u0d4d \u0d15\u0d32\u0d3e\u0d15\u0d3e\u0d30\u0d28\u0d46 \u0d2a\u0d4b\u0d32\u0d46 \u0d35\u0d30\u0d46 \u0d35\u0d3f\u0d2e\u0d4dമ\u0d40\u0d15\u0d4dക\u0d4d \u0d15\u0d3e\u0d23\u0d3f\u0d1a്ച\u0d41\u0d35\u0d3f\u0d15്കു\u0d28്ന\u0d24\u0d4d. \u0d17\u0d46\u0d7d\u0d32\u0d4d \u0d2e\u0d31\u0d4dറ\u0d41ം \u0d06\u0d15\u0d4dര\u0d3f\u0d32\u0d3f\u0d15\u0d4d \u0d2e\u0d31\u0d4dറ\u0d41ം \u0d15\u0d32\u0d3e\u0d15\u0d3e\u0d30 \u0d28\u0d47\u0d3f\u0d7d \u0d06\u0d7c\u0d1f\u0d4d\u0d1f\u0d41\u0d15\u0d33\u0d3f\u0d32\u0d47\u0d15\u0d4dക\u0d4d \u0d28\u0d2e\u0d4dമ\u0d41\u0d33\u0d4d\u0d33 \u0d2a\u0d30\u0d3f\u0d38\u0d30\u0d2e\u0d3e\u0d23\u0d4d.",
          ],
        },
      },
    },
    {
      slug: "makeup",
      name: {
        en: "Makeup",
        ml: "\u0d2e\u0d47\u0d15\u0d4d\u0d15\u0d2a\u0d4d\u0d2a\u0d4d",
      },
      code: "MU",
      address: {
        en: "Bridal \u00b7 Party \u00b7 HD Makeup \u00b7 Saree Draping",
        ml: "\u0d2c\u0d4d\u0d30\u0d48\u0d21\u0d7d \u00b7 \u0d2a\u0d3e\u0d7c\u0d1f\u0d4d\u0d1f\u0d3f \u00b7 HD \u0d2e\u0d47\u0d15\u0d4d\u0d15\u0d2a\u0d4d\u0d2a\u0d4d \u00b7 \u0d36\u0d3e\u0d30\u0d3f \u0d26\u0d4d\u0d30\u0d2a\u0d4d\u0d2a\u0d3f\u0d02\u0d17\u0d4d",
      },
      status: {
        en: "Look stunning for every occasion",
        ml: "\u0d0e\u0d32\u0d4d\u0d32\u0d3e \u0d05\u0d35\u0d38\u0d30\u0d19\u0d4d\u0d19\u0d33\u0d3f\u0d32\u0d41\u0d02 \u0d2e\u0d28\u0d4b\u0d39\u0d30\u0d2e\u0d3e\u0d2f\u0d3f \u0d15\u0d3e\u0d23\u0d3f\u0d15\u0d4dക\u0d41\u0d15",
      },
      email: "",
      phone: "+91 80890 69996",
      ctaText: {
        en: "Book Now",
        ml: "\u0d2c\u0d41\u0d15\u0d4d\u0d15\u0d4d \u0d1a\u0d46\u0d2f\u0d4d\u0d2f\u0d41\u0d15",
      },
      ctaHref: "tel:+918089069996",
      image: "/images/service-makeup.jpg",
      utcOffset: 5.5,
      article: {
        title: {
          en: "Makeup Services",
          ml: "\u0d2e\u0d47\u0d15\u0d4d\u0d15\u0d2a\u0d4d\u0d2a\u0d4d \u0d38\u0d47\u0d35\u0d28\u0d15\u0d7e",
        },
        paragraphs: {
          en: [
            "Our makeup artists are masters of transformation, creating looks that range from naturally beautiful to red-carpet glamorous. Whether it's your wedding day or a special celebration, we ensure you look and feel your absolute best.",
            "We specialize in bridal makeup with trial sessions, party makeup for any celebration, HD makeup for photography-perfect results, and expert saree draping to complete your elegant look. Every session begins with a personalized consultation.",
          ],
          ml: [
            "\u0d35\u0d3f\u0d35\u0d3e\u0d39\u0d24\u0d4dത\u0d3f\u0d28\u0d4dത\u0d47 \u0d05\u0d24\u0d4dയ\u0d3e\u0d35\u0d36\u0d4dയ\u0d2e\u0d3e\u0d2f\u0d3f \u0d35\u0d3f\u0d33\u0d3f\u0d1a്ച\u0d2e\u0d3e\u0d2f \u0d05\u0d32\u0d19്ക\u0d3e\u0d30\u0d3f\u0d15\u0d7e \u0d24\u0d2f\u0d4dയ\u0d3e\u0d30\u0d3e\u0d15\u0d41\u0d28്ന\u0d41. \u0d15\u0d32\u0d4dയ\u0d3e\u0d23\u0d7d \u0d2e\u0d47\u0d15\u0d4dക\u0d2a\u0d4d\u0d2a\u0d3f\u0d32\u0d42\u0d1f\u0d46 \u0d24\u0d3f\u0d30\u0d2e\u0d3f\u0d32\u0d41\u0d33\u0d4d\u0d33 \u0d05\u0d24\u0d4dഭ\u0d41\u0d24\u0d3e\u0d30\u0d02 \u0d2e\u0d46\u0d1a്ച \u0d0e\u0d35\u0d3f\u0d1f\u0d4dട\u0d4d \u0d12\u0d30\u0d41\u0d15\u0d4dക\u0d3f\u0d32\u0d41\u0d02.",
          ],
        },
      },
    },
  ],
}

export const observationConfig: ObservationConfig = {
  sectionLabel: {
    en: "Live Look",
    ml: "\u0d32\u0d3e\u0d2f\u0d3f\u0d35\u0d4d \u0d15\u0d3e\u0d23\u0d3f\u0d15\u0d4dക\u0d41\u0d15",
  },
  videoPath: "/videos/salon-live.mp4",
  statusText: {
    en: "NOW OPEN",
    ml: "\u0d07\u0d2a\u0d4dപ\u0d4b\u0d33\u0d4d \u0d24\u0d41\u0d31\u0d28\u0d4d\u0d28\u0d41",
  },
  latLabel: "LAT",
  lonLabel: "LON",
  initialLat: 9.99,
  initialLon: 76.29,
}

export const archivesConfig: ArchivesConfig = {
  sectionLabel: {
    en: "Gallery",
    ml: "\u0d1a\u0d3f\u0d24\u0d4d\u0d30\u0d19\u0d4d\u0d19\u0d33\u0d4d\u200d",
  },
  vaultTitle: {
    en: "View All Work",
    ml: "\u0d0e\u0d32\u0d4d\u0d32\u0d3e\u0d02 \u0d15\u0d3e\u0d23\u0d3e\u0d28\u0d4d\u200d",
  },
  closeText: {
    en: "Close",
    ml: "\u0d05\u0d1f\u0d15്ക\u0d41\u0d15",
  },
  items: [
    {
      src: "/images/service-makeup.jpg",
      label: {
        en: "Bridal Elegance",
        ml: "\u0d2c\u0d4d\u0d30\u0d48\u0d21\u0d7d \u0d2d\u0d19\u0d4d\u0d17\u0d3f",
      },
    },
    {
      src: "/images/service-hair.jpg",
      label: {
        en: "Hair Artistry",
        ml: "\u0d39\u0d47\u0d3e\u0d7c\u0d15\u0d33\u0d3e",
      },
    },
    {
      src: "/images/service-nails.jpg",
      label: {
        en: "Nail Masterpiece",
        ml: "\u0d28\u0d47\u0d3f\u0d7d \u0d15\u0d33\u0d3e",
      },
    },
    {
      src: "/images/service-skin.jpg",
      label: {
        en: "Glow & Glamour",
        ml: "\u0d2a\u0d4d\u0d30\u0d15\u0d3e\u0d36\u0d02",
      },
    },
  ],
}

export const footerConfig: FooterConfig = {
  copyrightText: "\u00a9 2025 DAVIN Beauty Salon",
  statusText: {
    en: "Stadium Link Road, Kaloor \u00b7 Open Daily \u00b7 +91 80890 69996",
    ml: "\u0d38\u0d4d\u0d1f\u0d47\u0d21\u0d3f\u0d2f\u0d02 \u0d32\u0d3f\u0d19\u0d4d\u0d15\u0d4d \u0d30\u0d4b\u0d21\u0d4d, \u0d15\u0d3e\u0d32\u0d42\u0d7c \u00b7 \u0d2a\u0d4d\u0d30\u0d24\u0d3f\u0d26\u0d3f\u0d28\u0d02 \u0d24\u0d41\u0d31\u0d28\u0d4d\u0d28\u0d41 \u00b7 +91 80890 69996",
  },
}

export const featuredConfig: FeaturedConfig = {
  image: "/images/featured-haircut.jpg",
  eyebrow: {
    en: "EXPERIENCE THE DAVIN DIFFERENCE",
    ml: "DAVIN \u0d05\u0d28\u0d41\u0d2d\u0d35\u0d02 \u0d05\u0d7d\u0d2a\u0d4d\u0d2a\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d15",
  },
  title: {
    en: "Where Beauty Meets Artistry",
    ml: "\u0d38\u0d4c\u0d28\u0d4d\u0d26\u0d30\u0d4d\u200d\u0d2f\u0d02 \u0d15\u0d32\u0d3e \u0d15\u0d33\u0d3f\u0d15\u0d4d\u0d15\u0d41\u0d28\u0d4d\u0d28 \u0d07\u0d1f\u0d02",
  },
  subtitle: {
    en: "Step into our world of luxury. From the moment you sit in our chair, every snip, every stroke, every detail is designed to reveal your most radiant self. Our stylists don't just cut hair \u2014 they sculpt confidence.",
    ml: "\u0d35\u0d3f\u0d2e\u0d4dമ\u0d40 \u0d15\u0d3e\u0d23\u0d3f\u0d1a്ച \u0d15\u0d3e\u0d23\u0d3f\u0d15\u0d4dക\u0d41\u0d28്ന \u0d38\u0d4d\u0d25\u0d33\u0d24\u0d4d\u0d24\u0d3f\u0d32\u0d47\u0d15\u0d4dക\u0d4d \u0d0e\u0d24\u0d4d\u0d24\u0d41\u0d15. \u0d24\u0d3f\u0d30\u0d3f\u0d1a്ച\u0d41\u0d15\u0d3e\u0d7d \u0d35\u0d30\u0d41\u0d28\u0d4d\u0d28 \u0d28\u0d3f\u0d19\u0d4dങ\u0d33\u0d46 \u0d15\u0d3e\u0d23\u0d3f\u0d15\u0d4dക\u0d41\u0d28്\u0d28 \u0d2e\u0d3e\u0d31\u0d4dറ\u0d4d\u0d2e\u0d3e\u0d21\u0d4d\u0d2f \u0d05\u0d25\u0d35\u0d3e\u0d38\u0d2e\u0d3e\u0d23\u0d4d.",
  },
}
