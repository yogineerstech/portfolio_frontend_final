import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

const ServicesPage = () => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <Services />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default ServicesPage;