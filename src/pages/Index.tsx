import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import LogoStrip from "@/components/landing/LogoStrip";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import HowWeWork from "@/components/landing/HowWeWork";
import About from "@/components/landing/About";
import Testimonials from "@/components/landing/Testimonials";
import Plans from "@/components/landing/Plans";
import ContactSection from "@/components/landing/ContactSection";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  useScrollReveal();
  useSmoothScroll();
  return (
  <div style={{ width: "100%", overflowX: "clip", background: "#fff" }}>
    <div className="prog" aria-hidden="true" />
    <Header />
    <main>
      <Hero />
      <LogoStrip />
      <ProblemSolution />
      <Services />
      <Portfolio />
      <HowWeWork />
      <About />
      <Testimonials />
      <Plans />
      <ContactSection />
      <CTABanner />
    </main>
    <Footer />
  </div>
  );
};

export default Index;
