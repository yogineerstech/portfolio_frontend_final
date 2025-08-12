import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { WrapButton } from '@/components/ui/wrap-button-new';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!title || !subtitle || !cta || !scrollIndicator) return;

    // Delay animations to start after page transition
    const tl = gsap.timeline({ delay: 2.2 });

    // Staggered text reveal
    tl.from(title.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    })
    .from(subtitle, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .from(cta.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.3')
    .from(scrollIndicator, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Enhanced Background Elements with floating animations */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-accent/30 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <h1 
            ref={titleRef}
            className="text-hero text-foreground mb-6 leading-[0.85]"
          >
            <span className="block font-light">Tired of mediocre</span>
            <span className="block font-light">solutions?</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-elegant-italic text-foreground/90 max-w-4xl mx-auto mb-12"
          >
            Your growth demands <span className="text-hero-accent">experts, not excuses.</span>
          </p>

          <div className="text-body text-muted-foreground max-w-2xl mx-auto mb-16">
            Premium software development, AI integration, and healthcare technology solutions 
            that transform ambitious ideas into award-winning digital experiences.
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
            <WrapButton href="/services">
              Discover Excellence
            </WrapButton>

            <WrapButton href="/contact">
              View Portfolio
            </WrapButton>
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator with magnetic effect */}
        <motion.div 
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          whileHover={{ scale: 1.1 }}
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="flex flex-col items-center text-muted-foreground cursor-pointer"
            whileHover={{ y: -5 }}
          >
            <span className="text-sm font-display tracking-wider mb-3">Explore Further</span>
            <div className="w-6 h-12 border border-current rounded-full flex justify-center overflow-hidden">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-1 h-4 bg-current rounded-full mt-2"
              />
            </div>
            
            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 border border-current rounded-full opacity-0"
              whileHover={{ 
                scale: [1, 1.5, 2],
                opacity: [0, 0.3, 0]
              }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
