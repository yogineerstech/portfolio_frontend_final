import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  BookOpenText,
  Brain, 
  Heart, 
  GraduationCap, 
  Cloud,
  Store,
  Code2,
  TrendingUp,
  Monitor,
  Database,
  Smartphone
} from 'lucide-react';
import { CardSwap } from '@/components/ui/card-swap';

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

const services = [
  {
    id: 'exam-portals',
    icon: Globe,
    title: 'Custom Exam Portals',
    description: 'Expert development of exam portals, along with exam software with exam management system with automated processes',
    features: ['Exam Management System', 'Automated Processes', 'Secure Assessments', 'Analytics & Reports'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'e-learning',
    icon: BookOpenText,
    title: 'E-Learning Platforms',
    description: 'Comprehensive digital learning solutions with interactive content delivery and progress tracking.',
    features: ['Interactive Content', 'Progress Tracking', 'Course Management', 'Gamification'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'analytics',
    icon: Database,
    title: 'Data Analytics & AI',
    description: 'Advanced analytics and AI/ML solutions for intelligent business insights and automation.',
    features: ['Data Visualization', 'Predictive Analytics', 'AI Automation', 'ML Models'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'llm-solutions',
    icon: Brain,
    title: 'Custom LLM Solutions',
    description: 'Tailored language models and AI applications for specific industry requirements.',
    features: ['Custom Language Models', 'Industry-Specific AI', 'Chatbots & Virtual Assistants', 'Content Generation'],
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 'ecommerce',
    icon: Store,
    title: 'E-Commerce Solutions',
    description: 'Scalable and secure online shopping platforms with comprehensive management systems.',
    features: ['Online Stores', 'Payment Gateway Integration', 'Inventory Management', 'Custom Checkout'],
    color: 'from-orange-500 to-yellow-500',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    features: ['iOS Apps', 'Android Apps', 'Cross-Platform Development', 'App Store Deployment'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'desktop',
    icon: Monitor,
    title: 'Desktop Applications',
    description: 'High-performance desktop software solutions for Windows, macOS, and Linux.',
    features: ['Windows Applications', 'macOS Apps', 'Linux Support', 'Custom UI/UX'],
    color: 'from-gray-500 to-slate-500',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Enterprise-grade cloud infrastructure and deployment services.',
    features: ['Cloud Hosting', 'Scalable Infrastructure', 'CI/CD Pipelines', 'Serverless Applications'],
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'trading',
    icon: TrendingUp,
    title: 'Trading Bot',
    description: 'Custom AI-powered trading bots for automated trading strategies.',
    features: ['Automated Trading', 'Custom Strategies', 'Market Analysis', 'Real-Time Monitoring'],
    color: 'from-yellow-500 to-amber-500',
  },
];
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
          <h2
            ref={titleRef}
            className="text-display-lg mb-6 text-foreground"
          >
            Our Expertise & Services
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            We deliver comprehensive technology solutions across multiple domains, 
            combining innovation with reliability to drive your business forward.
          </p>
        </div>

        <div className="card-swap-container relative">
          <CardSwap 
            cards={services.map((service) => ({
              id: service.id,
              content: (
                <div className="h-full flex flex-col">
                  {/* Icon and Title */}
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                      <service.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-palo">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <button className="mt-auto w-full bg-accent/10 hover:bg-accent/20 text-accent font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                    Learn More
                  </button>
                </div>
              ),
            }))}
            className="mb-16"
          />
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-display-sm mb-8 text-foreground">
            Technologies We Master
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Code2, name: 'React & Next.js' },
              { icon: Database, name: 'Node.js & Python' },
              { icon: Smartphone, name: 'Mobile Development' },
              { icon: Brain, name: 'AI & ML' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.4 + (index * 0.1), duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
              >
                <tech.icon className="w-8 h-8 text-accent mb-3 mx-auto" />
                <p className="text-body font-medium text-foreground">
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};