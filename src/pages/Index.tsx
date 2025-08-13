
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { PageTransition } from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <PageTransition>
      <SmoothScrollProvider>
        <div className="bg-background">
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
    </PageTransition>
  );
};

export default Index;
