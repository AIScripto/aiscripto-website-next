/**
 * Canonical service names, shared by the service pages, Home, the Services hub and
 * structured data. Kept separate from src/data/services.ts so Home can use the names
 * without pulling the full service content into the initial bundle.
 */
export const SERVICE_TITLES = {
  ai: "AI Agents & Automation",
  devops: "DevOps & Site Reliability Engineering (SRE)",
  erp: "ERP & CRM Integration",
  software: "Custom Software Engineering",
  cloud: "Cloud Solutions & Migration",
  security: "Cybersecurity & Compliance Engineering",
} as const;

export type ServiceId = keyof typeof SERVICE_TITLES;
