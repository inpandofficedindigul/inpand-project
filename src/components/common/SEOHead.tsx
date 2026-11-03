import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEOHead({
  title,
  description = 'Explore websites and digital solutions crafted by INPAND Technologies. From business websites to advanced platforms.',
  image = '/images/inpand-logo.svg',
  url,
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} | INPAND Technologies`;
    document.title = fullTitle;

    // Helper to update meta tag content
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
    if (url) {
      setMeta('og:url', url, true);
    }
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
  }, [title, description, image, url]);

  return null;
}
