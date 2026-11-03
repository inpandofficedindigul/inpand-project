import React, { useState } from 'react';
import { HomeHero } from '../components/sections/HomeHero';
import { HomeCategories } from '../components/sections/HomeCategories';
import { HomeFeatured } from '../components/sections/HomeFeatured';
import { HomeAbout } from '../components/sections/HomeAbout';
import { HomeProcess } from '../components/sections/HomeProcess';
import { HomeContactCTA } from '../components/sections/HomeContactCTA';
import { SEOHead } from '../components/common/SEOHead';
import { VideoModal } from '../components/common/VideoModal';
import { getFeaturedProjects, PROJECTS } from '../data/projects';

export const HomePage: React.FC = () => {
  const featured = getFeaturedProjects();
  const heroProject = featured[0] || PROJECTS[0];

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    videoUrl: string;
    title: string;
  }>({
    isOpen: false,
    videoUrl: '',
    title: '',
  });

  const handleOpenVideo = (videoUrl: string, title: string) => {
    setModalState({
      isOpen: true,
      videoUrl,
      title,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <SEOHead
        title="Digital Project Showcase"
        description="Explore websites, e-commerce platforms, and web applications engineered to make an impact by INPAND Technologies."
      />

      <HomeHero heroProject={heroProject} onOpenVideo={handleOpenVideo} />
      <HomeCategories />
      <HomeFeatured featuredProjects={featured} />
      <HomeAbout />
      <HomeProcess />
      <HomeContactCTA />

      <VideoModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        videoSrc={modalState.videoUrl}
        projectTitle={modalState.title}
      />
    </>
  );
};
