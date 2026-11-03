export const COMPANY_CONFIG = {
  name: 'INPAND Technologies',
  tagline: 'Digital Experiences. Built to Make an Impact.',
  description:
    'Explore websites and digital solutions crafted by INPAND Technologies. From business websites to advanced e-commerce platforms, discover what we\'ve built.',
  // Official contact information - configurable by management
  whatsappNumber: '+919876543210', // Configurable official business number
  whatsappDisplay: '+91 98765 43210',
  email: 'contact@inpandtechnologies.com', // Official enquiry email
  address: 'Digital Innovation Hub, India',
  
  // Brand & Meta
  foundingYear: '2024',
  copyrightText: '© INPAND Technologies. All rights reserved.',
  
  // Socials (verified)
  socials: {
    linkedin: 'https://linkedin.com/company/inpand-technologies',
    github: 'https://github.com/inpand-technologies',
    twitter: 'https://twitter.com/inpandtech',
  },
};

/**
 * Generate standard WhatsApp enquiry link for general contact
 */
export function generateGeneralWhatsAppLink(): string {
  const message = `Hi INPAND Technologies,\n\nI would like to discuss a new digital project requirement for my business.\n\nPlease share more details on how we can get started.\n\nThank you.`;
  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate project-specific WhatsApp enquiry link conforming to spec:
 * "Hi INPAND Technologies,
 * I viewed your [PROJECT NAME] project in the [CATEGORY] category.
 * I'm interested in developing a similar solution for my business.
 * Please share more details."
 */
export function generateProjectWhatsAppLink(projectTitle: string, category: string): string {
  const message = `Hi INPAND Technologies,\n\nI viewed your ${projectTitle} project in the ${category} category.\n\nI'm interested in developing a similar solution for my business.\n\nPlease share more details.`;
  return `https://wa.me/${COMPANY_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate project-specific Email enquiry link conforming to spec:
 * Subject: Enquiry About [PROJECT NAME]
 * Message:
 * "Hello INPAND Technologies,
 * I viewed your [PROJECT NAME] project and would like to discuss a similar development requirement.
 * Please contact me with further details.
 * Thank you."
 */
export function generateProjectEmailLink(projectTitle: string): string {
  const subject = `Enquiry About ${projectTitle}`;
  const body = `Hello INPAND Technologies,\n\nI viewed your ${projectTitle} project and would like to discuss a similar development requirement.\n\nPlease contact me with further details.\n\nThank you.`;
  return `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generate general email enquiry link
 */
export function generateGeneralEmailLink(): string {
  const subject = `Digital Project Enquiry - INPAND Technologies`;
  const body = `Hello INPAND Technologies,\n\nI would like to discuss a digital project requirement with your team.\n\nPlease contact me at your earliest convenience.\n\nThank you.`;
  return `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
