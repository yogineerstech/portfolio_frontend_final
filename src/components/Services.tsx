import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Brain, 
  Heart, 
  GraduationCap, 
  ArrowRight,
  Code2,
  Database,
  Smartphone
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Custom web solutions with modern frameworks, responsive design, and seamless user experiences.',
      features: ['React & Next.js', 'Progressive Web Apps', 'E-commerce Platforms', 'API Development'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Cutting-edge AI solutions including machine learning, automation, and intelligent data processing.',
      features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Healthcare Technology',
      description: 'HIPAA-compliant healthcare solutions that improve patient care and streamline medical processes.',
      features: ['Patient Management', 'Telemedicine Platforms', 'Health Analytics', 'Medical Devices'],
      color: 'from-red-500 to-orange-500',
    },
    {
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
      '.service-card',
      { y: 80, opacity: 0, rotationX: -15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card group"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-xl border border-border hover:shadow-2xl transition-all duration-500 h-full">
                {/* Icon with gradient background */}
                <div className="relative mb-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} p-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-display-sm text-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          delay: 0.6 + (index * 0.2) + (featureIndex * 0.1),
                          duration: 0.4 
                        }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-body text-muted-foreground">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-accent font-medium mt-6 group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
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