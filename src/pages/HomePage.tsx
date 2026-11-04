import React from 'react';
import { HomeHero } from '../components/sections/HomeHero';
import { HomeCategories } from '../components/sections/HomeCategories';
import { HomeFeatured } from '../components/sections/HomeFeatured';
import { HomeSoftwareFeatured } from '../components/sections/HomeSoftwareFeatured';
import { HomeAbout } from '../components/sections/HomeAbout';
import { HomeProcess } from '../components/sections/HomeProcess';
import { HomeContactCTA } from '../components/sections/HomeContactCTA';
import { SEOHead } from '../components/common/SEOHead';
import { getFeaturedProjects } from '../data/projects';

export const HomePage: React.FC = () => {
  const featured = getFeaturedProjects();

  return (
    <>
      <SEOHead
        title="INPAND Technologies Portfolio | Our Projects & Digital Solutions"
        exactTitle={true}
        description="Explore INPAND Technologies' portfolio of websites, software applications, digital solutions and innovative projects built for businesses."
        canonicalUrl="https://portfolio.inpand.com/"
        path="/"
      />

      <HomeHero />
      <HomeCategories />
      <HomeFeatured featuredProjects={featured} />
      <HomeSoftwareFeatured />
      <HomeAbout />
      <HomeProcess />
      <HomeContactCTA />
    </>
  );
};
