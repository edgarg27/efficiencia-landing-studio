import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Services from "@/components/landing/Services";
import HowWeWork from "@/components/landing/HowWeWork";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProblemSolution />
      <Services />
      <HowWeWork />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
