import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Brain, 
  Heart, 
  GraduationCap, 
  Code2,
  Database,
  Smartphone
} from 'lucide-react';
import { CardSwipe } from '@/components/ui/card-swipe';

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const services = [
    {
      id: 'web-apps',
      icon: Globe,
      title: 'Web Applications',
      description: 'Custom web solutions with modern frameworks, responsive design, and seamless user experiences.',
      features: ['React & Next.js', 'Progressive Web Apps', 'E-commerce Platforms', 'API Development'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'ai-integration',
      icon: Brain,
      title: 'AI Integration',
      description: 'Cutting-edge AI solutions including machine learning, automation, and intelligent data processing.',
      features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'healthcare',
      icon: Heart,
      title: 'Healthcare Technology',
      description: 'HIPAA-compliant healthcare solutions that improve patient care and streamline medical processes.',
      features: ['Patient Management', 'Telemedicine Platforms', 'Health Analytics', 'Medical Devices'],
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'edtech',
      icon: GraduationCap,
      title: 'EdTech Platforms',
      description: 'Educational technology and government exam platforms with advanced assessment capabilities.',
      features: ['Exam Management', 'Learning Management', 'Assessment Tools', 'Analytics Dashboard'],
      color: 'from-green-500 to-emerald-500',
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
      '.card-swipe-container',
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
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We deliver comprehensive technology solutions across multiple domains, 
            combining innovation with reliability to drive your business forward.
          </p>
        </div>

        <div className="card-swipe-container">
          <CardSwipe cards={services} className="mb-16" />
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