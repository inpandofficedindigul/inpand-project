import { useEffect } from 'react';
import { COMPANY_CONFIG } from '../../lib/config';

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
}

export function SEOHead({
  title,
  description = 'Explore websites and digital solutions developed by INPAND Technologies. Transform Ideas Into Business Growth.',
  image = '/images/inpand-logo.svg',
  path = '',
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} | INPAND Technologies`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(attr);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Only set canonical URL if an approved deployment domain is configured
    if (COMPANY_CONFIG.showcaseDomain) {
      const canonicalUrl = `${COMPANY_CONFIG.showcaseDomain.replace(/\/$/, '')}${path}`;
      setMeta('og:url', canonicalUrl, true);
      
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, image, path]);

  return null;
}
