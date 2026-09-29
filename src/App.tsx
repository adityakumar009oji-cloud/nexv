import React, { useState } from 'react';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Marquee } from './components/Marquee';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { CaseStudy } from './components/CaseStudy';
import { About } from './components/About';
import { Process } from './components/Process';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Industries } from './components/Industries';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { CTASection } from './components/CTASection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');
  const [modalPackage, setModalPackage] = useState('');

  const openProjectModal = (service = '', packageName = '') => {
    setModalService(service);
    setModalPackage(packageName);
    setProjectModalOpen(true);
  };

  const scrollToContact = (serviceName = '', packageName = '') => {
    // If on larger screens, we can open the project modal or scroll to contact
    openProjectModal(serviceName, packageName);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 selection:text-white relative">
      {/* Full-Page Dynamic Animated Background */}
      <BackgroundAnimation />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Top Bar Navigation */}
      <Navbar onOpenProjectModal={() => openProjectModal()} />

      {/* Main Content Landmark */}
      <main>
        {/* Hero Section */}
        <Hero onOpenProjectModal={() => openProjectModal()} />

        {/* Social Proof & Metrics */}
        <TrustBar />

        {/* Continuous Dynamic Marquee */}
        <Marquee />

        {/* Interactive Services Grid */}
        <Services onSelectServiceForInquiry={(service) => openProjectModal(service)} />

        {/* Featured Work / Portfolio */}
        <Portfolio onInquireProject={(project) => openProjectModal(`Project similar to ${project}`)} />

        {/* Featured Case Study: From Idea to Impact */}
        <CaseStudy onOpenInquiry={(subject) => openProjectModal(subject)} />

        {/* Reverse Secondary Marquee */}
        <Marquee reverse={true} />

        {/* About the Agency & Values */}
        <About onOpenProjectModal={() => openProjectModal()} />

        {/* Our Process 5-Stage Framework */}
        <Process />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Industries We Serve */}
        <Industries />

        {/* Transparent Pricing Packages */}
        <Pricing onSelectPackage={(pkg) => openProjectModal('', pkg)} />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* High-Impact Final CTA */}
        <CTASection onOpenProjectModal={() => openProjectModal()} />

        {/* Interactive Lead Capture Form */}
        <Contact initialService={modalService} initialPackage={modalPackage} />
      </main>

      {/* Comprehensive Footer */}
      <Footer onOpenProjectModal={() => openProjectModal()} />

      {/* Floating WhatsApp CTA */}
      <WhatsAppFloating />

      {/* Quick Discovery Brief Modal */}
      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        preselectedService={modalService}
        preselectedPackage={modalPackage}
      />
    </div>
  );
}
