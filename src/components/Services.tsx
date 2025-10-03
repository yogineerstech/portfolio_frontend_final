import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { 
  Code2,
  Database,
  Smartphone,
  Brain,
} from 'lucide-react';
import { CardSwap } from '@/components/ui/card-swap';
import { CometCard } from '@/components/ui/comet-card';
import { fetchServices, Service } from '@/lib/api';
import { getIconComponent } from '@/lib/icons';
import DrawUnderlineButton from './AnimatedComponents/DrawUnderlineButton';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import LogoLoop from './LogoLoop';



const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static features for each service type (to maintain design)
  const serviceFeatures: Record<string, string[]> = {
    'Custom Exam Portals': ['Exam Management System', 'Automated Processes', 'Secure Assessments', 'Analytics & Reports'],
    'E-Learning Platforms': ['Interactive Content', 'Progress Tracking', 'Course Management', 'Gamification'],
    'Data Analytics & AI': ['Data Visualization', 'Predictive Analytics', 'AI Automation', 'ML Models'],
    'Custom LLM Solutions': ['Custom Language Models', 'Industry-Specific AI', 'Chatbots & Virtual Assistants', 'Content Generation'],
    'E-Commerce Solutions': ['Online Stores', 'Payment Gateway Integration', 'Inventory Management', 'Custom Checkout'],
    'Mobile Development': ['iOS Apps', 'Android Apps', 'Cross-Platform Development', 'App Store Deployment'],
    'Desktop Applications': ['Windows Applications', 'macOS Apps', 'Linux Support', 'Custom UI/UX'],
    'Cloud Solutions': ['Cloud Hosting', 'Scalable Infrastructure', 'CI/CD Pipelines', 'Serverless Applications'],
    'Trading Bot': ['Automated Trading', 'Custom Strategies', 'Market Analysis', 'Real-Time Monitoring'],
  };

  // Static colors for each service (to maintain design)
  const serviceColors: Record<string, string> = {
    'Custom Exam Portals': 'from-blue-500 to-cyan-500',
    'E-Learning Platforms': 'from-green-500 to-emerald-500',
    'Data Analytics & AI': 'from-purple-500 to-pink-500',
    'Custom LLM Solutions': 'from-indigo-500 to-violet-500',
    'E-Commerce Solutions': 'from-orange-500 to-yellow-500',
    'Mobile Development': 'from-pink-500 to-rose-500',
    'Desktop Applications': 'from-gray-500 to-slate-500',
    'Cloud Solutions': 'from-teal-500 to-cyan-500',
    'Trading Bot': 'from-yellow-500 to-amber-500',
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch (err) {
        setError('Failed to load services');
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleViewProjects = (serviceId: number) => {
    navigate(`/projects/${serviceId}`);
  };
  useEffect(() => {
    if (!isInView) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      '.card-swap-container',
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
      },
      '-=0.4'
    ).fromTo(
      '.tech-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    );
  }, [isInView]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <DrawUnderlineButton onBack={true} marginTop="32px" width="90%" thickness={3}>
          <h2
            ref={titleRef}
            className="text-display-lg mb-6 text-foreground"
          >
            Our Expertise & Services
          </h2>
          </DrawUnderlineButton>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            We deliver comprehensive technology solutions across multiple domains, 
            combining innovation with reliability to drive your business forward.
          </p>
        </div>

        <div className="card-swap-container relative">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <CardSwap 
              cards={services.map((service) => {
                const IconComponent = getIconComponent(service.service_icon);
                const features = serviceFeatures[service.service_name] || ['Feature 1', 'Feature 2', 'Feature 3'];
                const color = serviceColors[service.service_name] || 'from-gray-500 to-slate-500';
                
                return {
                  id: service.service_id.toString(),
                  content: (
                    <div className="h-full flex flex-col">
                      {/* Icon and Title */}
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                          <IconComponent className="w-7 h-7 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground font-palo">
                          {service.service_name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                        {service.service_description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Call to Action */}
                      <button 
                        onClick={() => handleViewProjects(service.service_id)}
                        className="mt-auto w-full bg-accent/10 hover:bg-accent/20 text-accent font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                      >
                        View Projects
                      </button>
                    </div>
                  ),
                };
              })}
              className="mb-16"
            />
          )}
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-32 text-center"
        >
          <DrawUnderlineButton onBack={true} marginTop="35px" width="80%" thickness={3}>
          <h2 className="text-display-lg mb-6 text-foreground">
            Technologies We Master
          </h2>
          </DrawUnderlineButton>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-16">
            Leveraging cutting-edge technologies and frameworks to build scalable, 
            robust solutions that meet modern business demands.
          </p>


 <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>


          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: Code2, 
                name: 'React & Next.js',
                description: 'Modern frontend frameworks for dynamic web applications',
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Database, 
                name: 'Node.js & Python',
                description: 'Powerful backend technologies for scalable APIs',
                gradient: 'from-green-500 to-emerald-500'
              },
              { 
                icon: Smartphone, 
                name: 'Mobile Development',
                description: 'Cross-platform apps for iOS and Android devices',
                gradient: 'from-purple-500 to-pink-500'
              },
              { 
                icon: Brain, 
                name: 'AI & ML',
                description: 'Intelligent solutions with machine learning capabilities',
                gradient: 'from-orange-500 to-yellow-500'
              },
            ].map((tech, index) => (
              <div
                key={tech.name}
                className="tech-card"
              >
                <CometCard
                  className="group h-full"
                  rotateDepth={12}
                  translateDepth={15}
                >
                  <div className="p-8 h-full flex flex-col">
                    {/* Icon Container */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${tech.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <tech.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="text-center flex-1 flex flex-col">
                      <h4 className="text-lg font-bold text-foreground mb-3 font-palo group-hover:text-accent transition-colors duration-300">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </CometCard>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};