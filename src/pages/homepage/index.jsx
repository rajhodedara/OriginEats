import React from 'react';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import FeatureShowcase from './components/FeatureShowcase';
import WorkflowVisualization from './components/WorkflowVisualization';
import InteractiveSimulation from './components/InteractiveSimulation';
import TestimonialCarousel from './components/TestimonialCarousel';
import FAQAccordion from './components/FAQAccordion';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main>
        <HeroSection />
        <FeatureShowcase />
        <WorkflowVisualization />
        <InteractiveSimulation />
        <div id="testimonials">
          <TestimonialCarousel />
        </div>
        <FAQAccordion />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;