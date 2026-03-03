import { useState } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import LogoStrip from "@/components/landing/LogoStrip";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Services from "@/components/landing/Services";
import HowWeWork from "@/components/landing/HowWeWork";
import Testimonials from "@/components/landing/Testimonials";
import ContactSection from "@/components/landing/ContactSection";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";
import ContactModal from "@/components/landing/ContactModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCtaClick={() => setModalOpen(true)} />
      <Hero onCtaClick={() => setModalOpen(true)} />
      <LogoStrip />
      <ProblemSolution />
      <Services />
      <HowWeWork />
      <Testimonials />
      <ContactSection />
      <CTABanner onCtaClick={() => setModalOpen(true)} />
      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default Index;
