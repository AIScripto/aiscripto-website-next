/** Webinars & briefings. Upcoming vs. past is derived from isoDate automatically. */
export interface EventItem {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD). Upcoming vs. past is derived from this automatically. */
  isoDate: string;
  time: string;
  location: string;
  type: string;
  image: string;
}

/**
 * Add new events here. Anything dated today or later shows as "Upcoming";
 * older events move to "Past Sessions" on their own — no manual relabelling.
 */
export const events: EventItem[] = [
  {
    id: "ai-architecture-summit",
    title: "Enterprise AI Architecture Summit: Orchestrating Autonomous Agents in Production",
    isoDate: "2026-06-18",
    time: "11:00 AM ET / 4:00 PM UK",
    location: "Global Virtual Briefing",
    type: "Technical Briefing",
    image: "1540575861501-7cf05a4b125a",
  },
  {
    id: "erp-api-modernization",
    title: "Modernizing Core ERP Systems with Intelligent API Orchestration",
    isoDate: "2026-05-28",
    time: "12:00 PM ET / 5:00 PM UK",
    location: "Executive Roundtable & Live Q&A",
    type: "Executive Roundtable",
    image: "1460925895917-afdab827c52f",
  },
  {
    id: "cloud-sre-governance",
    title: "Zero-Downtime Cloud Migration & Kubernetes SRE Governance",
    isoDate: "2026-05-07",
    time: "10:00 AM ET / 3:00 PM UK",
    location: "Live Architecture Workshop",
    type: "Architecture Workshop",
    image: "1550751827-4bd374c3f58b",
  },
  {
    id: "voice-ai-latency",
    title: "Engineering Low-Latency Voice AI for the Enterprise",
    isoDate: "2026-04-16",
    time: "11:00 AM ET / 8:00 AM PT",
    location: "Interactive Virtual Briefing",
    type: "Technical Webinar",
    image: "1485827404703-89b55fcc595e",
  },
];

export const formatEventDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });


/** Events split relative to `now` (default: today). Upcoming soonest-first, past newest-first. */
export function splitEvents(now: Date = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return {
    upcoming: events.filter((e) => e.isoDate >= today).sort((a, b) => a.isoDate.localeCompare(b.isoDate)),
    past: events.filter((e) => e.isoDate < today).sort((a, b) => b.isoDate.localeCompare(a.isoDate)),
  };
}
