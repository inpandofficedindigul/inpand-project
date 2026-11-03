/**
 * INPAND TECHNOLOGIES — OFFICIAL CONFIGURATION
 * Verified against official website: https://www.inpand.com/
 */
export const COMPANY_CONFIG = {
  name: 'INPAND Technologies',
  tagline: 'Transform Ideas Into Business Growth',
  description:
    'Explore websites and digital solutions developed by INPAND Technologies for businesses across different industries.',
  officialWebsite: 'https://www.inpand.com/',
  
  // Official Contact Details from https://www.inpand.com/
  email: 'info@inpand.com',
  phone: '9080394828',
  phoneDisplay: '+91 90803 94828',
  phoneTel: 'tel:9080394828',
  whatsappNumber: '919080394828', // E.164 format for https://wa.me/
  address: 'MRC Complex, Guziliamparai, Dindigul – 624703',
  workingHours: 'Monday–Saturday, 9:00 AM–6:00 PM',

  // Configurable showcase canonical domain (empty until finalized by management)
  showcaseDomain: '',
};

/**
 * Generate standard WhatsApp enquiry link for general contact
 */
export function generateGeneralWhatsAppLink(): string {
  const message = `Hello INPAND Technologies, I would like to discuss a digital project requirement with your team.`;
  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate project-specific WhatsApp enquiry link conforming to spec:
 * "Hello INPAND Technologies, I viewed [approved project name] on your project showcase and would like to discuss a similar project."
 */
export function generateProjectWhatsAppLink(projectTitle: string): string {
  const message = `Hello INPAND Technologies, I viewed ${projectTitle} on your project showcase and would like to discuss a similar project.`;
  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate project-specific Email enquiry link
 */
export function generateProjectEmailLink(projectTitle: string, category?: string): string {
  const subject = `Project Enquiry: ${projectTitle}${category ? ` (${category})` : ''}`;
  const body = `Hello INPAND Technologies,\n\nI viewed ${projectTitle} on your project showcase and would like to discuss a similar development requirement.\n\nPlease share further details regarding your process, timeline, and availability.\n\nThank you.`;
  return `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generate general email enquiry link
 */
export function generateGeneralEmailLink(): string {
  const subject = `Digital Project Enquiry — INPAND Technologies`;
  const body = `Hello INPAND Technologies,\n\nI would like to discuss a digital project requirement with your team.\n\nPlease contact me with further details.\n\nThank you.`;
  return `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Validate external URL before rendering
 */
export function isValidUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
