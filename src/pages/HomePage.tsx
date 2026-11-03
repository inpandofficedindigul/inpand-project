import React from 'react';
import { HomeHero } from '../components/sections/HomeHero';
import { HomeCategories } from '../components/sections/HomeCategories';
import { HomeFeatured } from '../components/sections/HomeFeatured';
import { HomeAbout } from '../components/sections/HomeAbout';
import { HomeProcess } from '../components/sections/HomeProcess';
import { HomeContactCTA } from '../components/sections/HomeContactCTA';
import { SEOHead } from '../components/common/SEOHead';
import { getFeaturedProjects } from '../data/projects';
import { COMPANY_CONFIG } from '../lib/config';

export const HomePage: React.FC = () => {
  const featured = getFeaturedProjects();

  return (
    <>
      <SEOHead
        title="Digital Project Showcase"
        description={`${COMPANY_CONFIG.tagline}. Explore websites, e-commerce storefronts, and custom web applications developed by INPAND Technologies.`}
      />

      <HomeHero />
      <HomeCategories />
      <HomeFeatured featuredProjects={featured} />
      <HomeAbout />
      <HomeProcess />
      <HomeContactCTA />
    </>
  );
};
