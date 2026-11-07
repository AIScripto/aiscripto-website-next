/**
 * Spotlight hero content for each product page (ProductSpotlightHero).
 *
 * Kept separate from products.ts so the hero can stay short and outcome-led while the
 * long-form product data stays as reference copy. Every claim here restates a capability
 * already described in products.ts; no new numbers or certifications.
 *
 * `art` is an optional hero photo (a self-hosted stock photo id or a site path), shown as a
 * round photo on the stage. When it is missing, the hero shows the product's dashboard
 * screenshot (product.image) instead.
 */
export interface SpotlightCard {
  title: string;
  description: string;
}

export interface ProductSpotlight {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  /** Hex accent used for the glow, accent text and primary button. */
  accent: string;
  /** Readable text colour on a filled accent button. */
  accentInk: string;
  cards: [SpotlightCard, SpotlightCard, SpotlightCard];
  /** Stock photo id (see utils/images) or a site path. Shown as a round photo on the stage. */
  art?: string;
  artAlt?: string;
}

export const productSpotlights: Record<string, ProductSpotlight> = {
  'business-analytics-ai': {
    eyebrow: 'Retail loss prevention',
    titleLead: 'Find the margin',
    titleAccent: "you're losing",
    lead: 'MarginGuard reads the CSV and PDF reports you already export, flags unusual drops in margin and returns, and shows you what to check first.',
    accent: '#34d399',
    accentInk: '#022c22',
    cards: [
      { title: 'Works with your exports', description: 'Upload POS, returns and dispatch reports. No ERP change or data migration.' },
      { title: 'Daily anomaly alerts', description: 'Statistical checks flag stores, products and shifts with unusual losses.' },
      { title: 'Clear next steps', description: 'Get a plain-English summary and recovery playbook you can share with your team.' },
    ],
    art: '1753161029353-f6bb0ff2ad3c',
    artAlt: 'Store manager checking stock and sales on a tablet',
  },
  'nexus-agent': {
    eyebrow: 'AI voice receptionist',
    titleLead: 'Never miss',
    titleAccent: 'another customer call',
    lead: "NexusAgent answers every call day and night, captures the caller's details and request, and escalates complaints to the right manager.",
    accent: '#38bdf8',
    accentInk: '#082f49',
    cards: [
      { title: 'Answers on the first ring', description: 'Natural voice conversations in English, Urdu or Hindi, around the clock.' },
      { title: 'Captures every lead', description: 'Name, number and request are logged automatically, no paper notes.' },
      { title: 'Escalates what matters', description: 'Urgent issues reach managers by email with the full call summary.' },
    ],
    art: '1626863905121-3b0c0ed7b94c',
    artAlt: 'Customer support agent wearing a headset',
  },
  'ai-voice-booking': {
    eyebrow: 'AI appointment booking',
    titleLead: 'Bookings that',
    titleAccent: 'fill themselves',
    lead: 'AetherVoice answers calls, checks live availability and books appointments straight into your calendar, without double-bookings.',
    accent: '#a78bfa',
    accentInk: '#1e1b4b',
    cards: [
      { title: 'Books while you work', description: 'Callers choose a time by voice; the slot is held and confirmed by SMS.' },
      { title: 'No double-bookings', description: 'Each slot is locked while it is being booked, so two callers cannot take it.' },
      { title: 'Syncs your calendar', description: 'Works with Google Calendar and CalDAV calendars you already use.' },
    ],
    art: '1759143545924-beb85b33c0f1',
    artAlt: 'Receptionist booking an appointment on a tablet',
  },
  'pos-fast-food': {
    eyebrow: 'Quick-service POS',
    titleLead: 'Faster counters,',
    titleAccent: 'fewer lost orders',
    lead: 'OmniPOS is a touch-first register for fast food and cafés that keeps taking orders even when the internet drops.',
    accent: '#fbbf24',
    accentInk: '#422006',
    cards: [
      { title: 'Built for speed', description: 'A touch menu designed for rapid counter checkouts and modifiers.' },
      { title: 'Keeps working offline', description: 'Orders queue on the device and sync once the connection is back.' },
      { title: 'Kitchen in sync', description: 'Tickets reach the kitchen over your local network, with ageing alerts.' },
    ],
    art: '1556740738-b6a63e27c4df',
    artAlt: 'Customer paying at a counter tablet POS',
  },
  'pos-restaurant': {
    eyebrow: 'Full-service restaurant POS',
    titleLead: 'Run every table',
    titleAccent: 'from one screen',
    lead: 'CulinaryPOS brings floor plans, table ordering, course pacing and kitchen display screens together for full-service restaurants.',
    accent: '#fb7185',
    accentInk: '#4c0519',
    cards: [
      { title: 'Live floor plan', description: "See every table's status at a glance and seat guests faster." },
      { title: 'Course pacing', description: 'Send each course to the kitchen at the right moment, table by table.' },
      { title: 'Kitchen display', description: 'Replace paper tickets with clear, timed kitchen screens.' },
    ],
    art: '1777679883845-6e1b732e2063',
    artAlt: 'Waiter taking an order on a handheld POS at a restaurant table',
  },
  'ai-agent-web': {
    eyebrow: 'AI website assistant',
    titleLead: 'Turn visitors into',
    titleAccent: 'qualified leads',
    lead: 'ConciergeWeb greets visitors on your site, answers questions from your own content by voice or text, and captures qualified leads.',
    accent: '#818cf8',
    accentInk: '#1e1b4b',
    cards: [
      { title: 'Answers from your content', description: 'Replies come from your approved knowledge base, with hand-off when unsure.' },
      { title: 'Voice and text', description: 'Visitors can type or talk, on desktop or mobile.' },
      { title: 'Lightweight embed', description: 'One snippet on your site, built to load without slowing pages down.' },
    ],
    art: '1763810021881-49b45b0717d5',
    artAlt: 'Phone showing a chat conversation with an assistant',
  },
  'erp-financials': {
    eyebrow: 'Finance & ERP',
    titleLead: 'Books that balance,',
    titleAccent: 'every single day',
    lead: 'ScriptoERP is a double-entry accounting core that keeps every voucher balanced, numbers it automatically and keeps a full audit trail.',
    accent: '#2dd4bf',
    accentInk: '#042f2e',
    cards: [
      { title: 'Double-entry by design', description: 'Every transaction posts balanced debits and credits.' },
      { title: 'Automatic numbering', description: 'Vouchers are numbered by type and financial year.' },
      { title: 'Full audit trail', description: 'Posted entries are locked; corrections are made by reversal.' },
    ],
    art: '1772588627327-1eeddcf73c11',
    artAlt: 'Finance professional reviewing documents with a calculator and laptop',
  },
};
