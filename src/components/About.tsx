import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Brain, Heart, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'We push the boundaries of what\'s possible with cutting-edge technology and innovative solutions.',
    },
    {
      icon: Brain,
      title: 'AI Innovation',
      description: 'Integrating artificial intelligence to create smarter, more intuitive digital experiences.',
    },
    {
      icon: Heart,
      title: 'Healthcare Focus',
      description: 'Developing life-changing healthcare technology solutions that improve patient outcomes.',
    },
    {
      icon: Users,
      title: 'Government Solutions',
      description: 'Building robust platforms for government exams and educational technology systems.',
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

    // Animate title
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    // Animate content with stagger
    tl.fromTo(
      '.about-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      '-=0.4'
    );
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-card/50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2
            ref={titleRef}
            className="text-display-lg mb-6 text-foreground"
          >
            Pioneering the Future of Software Development
          </h2>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            At Yogineers Technologies, we don't just write code – we architect digital experiences 
            that transform industries and improve lives. Our expertise spans across AI integration, 
            healthcare innovation, and government technology platforms.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="about-card group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="text-display-sm mb-4 text-foreground">
                  {value.title}
                </h3>
                
                <p className="text-body text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '150+', label: 'Projects Delivered' },
            { number: '50+', label: 'Happy Clients' },
            { number: '5+', label: 'Years Experience' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-display-md text-accent font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-body text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};