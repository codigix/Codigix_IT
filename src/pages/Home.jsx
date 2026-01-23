import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ClientSection from '../components/ClientSection';
import WorkingProcess from '../components/WorkingProcess';
import AboutSection from '../components/AboutSection';
import ServiceSection from '../components/ServiceSection';
import ProjectSection from '../components/ProjectSection';
import TestimonialSection from '../components/TestimonialSection';
import PricingSection from '../components/PricingSection';
import BlogSection from '../components/BlogSection';

const Home = () => {
  return (
    <main>
      <HeroSlider />
      <ClientSection />
      <WorkingProcess />
      <AboutSection />
      <ServiceSection />
      <ProjectSection />
      <TestimonialSection />
      <PricingSection />
      <BlogSection />
    </main>
  );
};

export default Home;
