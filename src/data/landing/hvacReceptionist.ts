/** Content for /solutions/ai-receptionist-for-hvac (rendered by src/pages/HvacAiReceptionist.tsx). */
import { PhoneCall, ShieldAlert, Clock, Calendar, Wrench, DollarSign } from 'lucide-react';
import type { Feature } from '../../components/landing/FeatureGrid';

export const serviceMeta = {
  "path": "/solutions/ai-receptionist-for-hvac",
  "name": "24/7 AI Receptionist & Answering Service for HVAC Companies",
  "serviceType": "HVAC AI Voice Receptionist",
  "description": "24/7 AI receptionist for HVAC contractors. Sub-second conversational voice scheduling, after-hours emergency call answering, and on-call technician alerts.",
  "areaServed": [
    "United States",
    "Canada"
  ]
};

export const faqs = [
  {
    q: "How does an AI receptionist for HVAC companies handle urgent emergency calls?",
    a: "Our AI receptionist is trained to immediately detect high-urgency phrases such as 'furnace blowing cold air', 'no heat', 'gas odor', or 'AC leaking water'. The system tags the call as critical, captures the homeowner's verified street address, locks an emergency dispatch window, and instantly transmits an SMS alert and call recording to your on-call technician."
  },
  {
    q: "How is an AI answering service for HVAC different from a traditional human call center?",
    a: "Traditional human answering services often put callers on hold, misspell technical equipment brands, fail to schedule appointments directly, and charge by the minute. AIScripto's HVAC AI voice agent answers on the first ring with sub-second responses, speaks with a natural conversational cadence, checks live calendar availability, and books appointments directly into your calendar 24/7."
  },
  {
    q: "Can the HVAC AI voice agent work with our field-service software or HVAC CRM?",
    a: "It syncs with Google Calendar and CalDAV calendars out of the box, and can integrate with your field-service software via API. It checks technician availability in real time, places a database lock on open slots to prevent double-booking, and logs call transcripts automatically."
  },
  {
    q: "What happens during HVAC after-hours answering when no technicians are available?",
    a: "The AI virtual receptionist answers the caller politely, explains your standard after-hours emergency diagnostic rates, collects verified homeowner contact details and equipment symptoms, and books priority first-call slots for the next morning. If the customer insists on emergency service, the AI routes the call to your emergency on-call forwarding number."
  },
  {
    q: "How quickly can an HVAC contractor deploy this AI phone receptionist?",
    a: "Deployment typically takes under 48 hours. We configure your business hours, pricing parameters, service territories, and dispatch rules. You then forward your main business phone line or after-hours overflow to the dedicated AI telephony number provided."
  }
];

export const features: Feature[] = [
  {
    icon: Clock,
    title: "24/7 After-Hours Call Answering",
    desc: "Answers evening, weekend, and holiday emergency calls when your office is closed, capturing high-margin jobs that competitors miss."
  },
  {
    icon: ShieldAlert,
    title: "Intelligent HVAC Emergency Triage",
    desc: "Distinguishes routine AC maintenance tune-ups from critical freezing-weather furnace breakdowns and dispatches priority notifications."
  },
  {
    icon: Calendar,
    title: "Anti-Double-Booking Calendar Sync",
    desc: "Pessimistic database transaction locks hold open appointment slots in real time, preventing concurrent booking collisions across dispatchers."
  },
  {
    icon: Wrench,
    title: "Field-Service Software Integration",
    desc: "Can integrate with your field-service software via API to sync customer records, equipment notes, and booked diagnostic visits."
  },
  {
    icon: DollarSign,
    title: "Transparent Diagnostic Rate Quotes",
    desc: "Quotes your standard trip fees, after-hours diagnostic surcharges, and maintenance plan discounts to pre-qualify customers."
  },
  {
    icon: PhoneCall,
    title: "Instant SMS & Technician Dispatch Alerts",
    desc: "Sends instant SMS notifications with caller name, address, equipment brand, and audio playback links directly to on-call technicians."
  }
];
