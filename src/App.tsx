import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfessionalTransition } from "@/components/ProfessionalTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import Index from "./pages/Index";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { CompanyBlogs } from "./pages/CompanyBlogs";
import { BlogDetail } from "./pages/BlogDetail";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { BlogForm } from "./pages/BlogForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="yogineers-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ProfessionalTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/projects/:serviceId" element={<ProjectsShowcase />} />
              <Route path="/companyblogs" element={<CompanyBlogs />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/create" element={<BlogForm />} />
              <Route path="/admin/edit/:id" element={<BlogForm />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProfessionalTransition>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
