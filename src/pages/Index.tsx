import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;
