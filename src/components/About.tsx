import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Brain, Heart, Users } from 'lucide-react';
import { CometCard } from '@/components/ui/comet-card';
import ScrollReveal from '@/components/ui/scroll-reveal';
import DrawUnderlineButton from './AnimatedComponents/DrawUnderlineButton';
import AnimatedGridBackground from './AnimatedComponents/AnimatedGridBackground';

gsap.registerPlugin(ScrollTrigger);

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(end * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);
  
  return (
    <div ref={countRef} className="text-display-md font-palo font-bold text-accent tracking-tight">
      {count}{suffix}
    </div>
  );
};

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
      className="py-24 lg:py-32 bg-white dark:bg-background relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <AnimatedGridBackground />
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <DrawUnderlineButton onBack={true} marginTop="65px" width="70%" thickness={2}   autoAnimate={true}>
          <h2
            ref={titleRef}
            className="text-display-lg mb-6 text-foreground"
          >
            <ScrollReveal
              containerClassName="my-0"
              textClassName="text-inherit font-inherit"
              enableBlur={true}
              baseOpacity={0.2}
              baseRotation={1}
              blurStrength={2}
            >
              Pioneering the Future of Software Development
            </ScrollReveal>
          </h2>
          </DrawUnderlineButton>
          <p className="text-body-lg text-muted-foreground leading-relaxed mt-7">
            <ScrollReveal
              containerClassName="my-0"
              textClassName="text-inherit font-inherit"
              enableBlur={true}
              baseOpacity={0.15}
              baseRotation={0.5}
              blurStrength={1.5}
            >
              At Yogineers Technologies, we don't just write code – we architect digital experiences 
              that transform industries and improve lives. Our expertise spans across AI integration, 
              healthcare innovation, and government technology platforms.
            </ScrollReveal>
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <CometCard
              key={value.title}
              className="about-card group !bg-gray-50 dark:!bg-card border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500"
              rotateDepth={0}
              translateDepth={0}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <value.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <h3 className="text-display-sm mb-4 text-foreground group-hover:text-accent transition-colors duration-300">
                  <ScrollReveal
                    containerClassName="my-0"
                    textClassName="text-inherit font-inherit"
                    enableBlur={true}
                    baseOpacity={0.3}
                    baseRotation={0.5}
                    blurStrength={1}
                  >
                    {value.title}
                  </ScrollReveal>
                </h3>
                
                <p className="text-body text-muted-foreground leading-relaxed flex-grow group-hover:text-foreground/80 transition-colors duration-300">
                  {value.description}
                </p>

                {/* Subtle bottom accent line */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-12 h-1 bg-gradient-to-r from-accent to-accent/50 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </CometCard>
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
            { number: 150, label: 'Projects Delivered', suffix: '+' },
            { number: 50, label: 'Happy Clients', suffix: '+' },
            { number: 5, label: 'Years Experience', suffix: '+' },
            { number: 24, label: 'Support Available', suffix: '/7' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="text-center group p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-accent/30 hover:bg-white dark:hover:bg-gray-750 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                delay: 1.2 + (index * 0.15), 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="mb-3 group-hover:transform group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter 
                  end={stat.number} 
                  duration={2.5} 
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-body font-palo text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};