/**
 * Single source of truth for AIScripto contact details and office locations.
 * Footer, Contact, Global, CTAs, WhatsApp button and Schema.org markup all read
 * from here — change a number once and it updates everywhere.
 */

export const COMPANY = {
  name: "AIScripto",
  email: "support@aiscripto.com",
  phone: "+1 (425) 554 1783",
  phoneHref: "tel:+14255541783",
  hours: "Mon-Fri: 9am - 6pm PT",
  headOfficeAddress: "7034 Sacramento Dr, Tracy, CA 95377, USA",
} as const;

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "+14255541783";
const WHATSAPP_MESSAGE =
  import.meta.env.VITE_WHATSAPP_MESSAGE ||
  "Hello! I would like to learn more about AIScripto services.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export interface Office {
  country: string;
  title: string;
  /** Short label for compact cards, e.g. "UK Office". */
  shortTitle: string;
  city: string;
  address: string;
  phone: string;
  role: string;
  flag: string;
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

export const OFFICES: Office[] = [
  {
    country: "United States",
    title: "US Head Office",
    shortTitle: "Head Office (USA)",
    city: "Tracy, California",
    address: COMPANY.headOfficeAddress,
    phone: COMPANY.phone,
    role: "Executive Leadership, Solution Architecture & Enterprise Client Management",
    flag: "🇺🇸",
    street: "7034 Sacramento Dr",
    locality: "Tracy",
    region: "CA",
    postalCode: "95377",
    countryCode: "US",
  },
  {
    country: "Italy",
    title: "Italy & European Operations",
    shortTitle: "Italy Office",
    city: "Fabriano, Ancona",
    address: "Via Giambattista Miliani, 21, 60044 Fabriano AN, Italy",
    phone: "+39 380 130 5231",
    role: "European Client Engagements, AI Architecture & Regional Partnerships",
    flag: "🇮🇹",
    street: "Via Giambattista Miliani, 21",
    locality: "Fabriano",
    region: "AN",
    postalCode: "60044",
    countryCode: "IT",
  },
  {
    country: "United Kingdom",
    title: "UK & European Operations",
    shortTitle: "UK Office",
    city: "Motherwell, Scotland",
    address: "4 Arnott Quadrant, Motherwell, ML1 3TQ, Scotland, UK",
    phone: "+44 798 843 0515",
    role: "European Client Engagements, Compliance & Business Solutions",
    flag: "🇬🇧",
    street: "4 Arnott Quadrant",
    locality: "Motherwell",
    region: "Scotland",
    postalCode: "ML1 3TQ",
    countryCode: "GB",
  },
  {
    country: "Pakistan",
    title: "Technology Delivery Center",
    shortTitle: "Pakistan Office",
    city: "Lahore, Punjab",
    address: "50-N Gurumangat Rd, Block N Gulberg 2, Lahore, Pakistan",
    phone: "+92 300 3081100",
    role: "Core Software Engineering, AI Research, SRE & Quality Assurance",
    flag: "🇵🇰",
    street: "50-N Gurumangat Rd, Block N Gulberg 2",
    locality: "Lahore",
    region: "Punjab",
    postalCode: "54660",
    countryCode: "PK",
  },
];
