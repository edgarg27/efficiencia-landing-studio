import React, { useState, Suspense, lazy } from "react";

// 1. IMPORTACIONES CRÍTICAS (Se cargan de inmediato)
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import LogoStrip from "@/components/landing/LogoStrip";

// 2. IMPORTACIONES PEREZOSAS (Se cargan en segundo plano)
const ProblemSolution = lazy(() => import("@/components/landing/ProblemSolution"));
const Services = lazy(() => import("@/components/landing/Services"));
const HowWeWork = lazy(() => import("@/components/landing/HowWeWork"));
const Testimonials = lazy(() => import("@/components/landing/Testimonials"));
const ContactSection = lazy(() => import("@/components/landing/ContactSection"));
const CTABanner = lazy(() => import("@/components/landing/CTABanner"));
const Footer = lazy(() => import("@/components/landing/Footer"));
const ContactModal = lazy(() => import("@/components/landing/ContactModal"));

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Componentes de carga inmediata */}
      <Header onCtaClick={() => setModalOpen(true)} />
      <Hero onCtaClick={() => setModalOpen(true)} />
      <LogoStrip />

      {/* 3. LÍMITE DE SUSPENSE */}
      <Suspense fallback={null}>
        <ProblemSolution />
        <Services />
        <HowWeWork />
        <Testimonials />
        <ContactSection />
        <CTABanner onCtaClick={() => setModalOpen(true)} />
        <Footer />
        <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
      </Suspense>
    </div>
  );
};

export default Index;