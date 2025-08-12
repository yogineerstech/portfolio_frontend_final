import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <About />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default AboutPage;