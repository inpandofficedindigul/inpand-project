import { useEffect } from 'react';
import { COMPANY_CONFIG } from '../../lib/config';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  exactTitle?: boolean;
  description?: string;
  image?: string;
  path?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  robots?: string;
  noindex?: boolean;
  keywords?: string | string[];
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SEOHead({
  title,
  exactTitle = false,
  description = "Explore INPAND Technologies' portfolio of websites, software applications, digital solutions and innovative projects built for businesses.",
  image = '/images/inpand-logo.png',
  path = '',
  canonicalUrl,
  type = 'website',
  robots,
  noindex = false,
  keywords,
  breadcrumbs,
  structuredData,
}: SEOHeadProps) {
  useEffect(() => {
    // Determine accurate page title without redundant brand suffixes
    const fullTitle = exactTitle || title.includes('INPAND Technologies')
      ? title
      : `${title} | INPAND Technologies`;
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

    const domain = (COMPANY_CONFIG.showcaseDomain || 'https://portfolio.inpand.com').replace(/\/$/, '');
    const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '/';
    const computedCanonical = canonicalUrl || `${domain}${cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '')}`;
    const fullImage = image.startsWith('http')
      ? image
      : `${domain}${image.startsWith('/') ? image : `/${image}`}`;

    const robotsContent = noindex
      ? 'noindex, nofollow'
      : (robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    setMeta('description', description);
    setMeta('robots', robotsContent);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', fullImage, true);
    setMeta('og:url', computedCanonical, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', 'INPAND Technologies Portfolio', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImage);

    if (keywords) {
      const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      setMeta('keywords', keywordsString);
    }

    // Canonical link management
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', computedCanonical);

    // Build structured data graph (Breadcrumbs + Page + Custom)
    const scriptId = 'seo-structured-data';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

    const schemaGraph: Array<Record<string, unknown>> = [];

    // Add breadcrumb schema if available
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        '@id': `${computedCanonical}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${domain}${crumb.url === '/' ? '/' : crumb.url.replace(/\/$/, '')}`,
        })),
      });
    }

    // Add custom structured data if supplied
    if (structuredData) {
      if (Array.isArray(structuredData)) {
        schemaGraph.push(...structuredData);
      } else if (structuredData['@graph'] && Array.isArray(structuredData['@graph'])) {
        schemaGraph.push(...(structuredData['@graph'] as Array<Record<string, unknown>>));
      } else {
        schemaGraph.push(structuredData);
      }
    }

    if (schemaGraph.length > 0) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': schemaGraph,
      });
    }

    return () => {
      // Clean up dynamic structured data script on route change
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [
    title,
    exactTitle,
    description,
    image,
    path,
    canonicalUrl,
    type,
    robots,
    noindex,
    keywords,
    breadcrumbs,
    structuredData,
  ]);

  return null;
}
