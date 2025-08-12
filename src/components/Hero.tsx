import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { WrapButton } from '@/components/ui/wrap-button';

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
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
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
            <WrapButton variant="primary" size="lg">
              Discover Excellence
            </WrapButton>

            <WrapButton variant="secondary" size="lg">
              View Portfolio
            </WrapButton>
          </div>
        </motion.div>

        {/* Elegant Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm font-display tracking-wider mb-3">Explore Further</span>
            <div className="w-6 h-12 border border-current rounded-full flex justify-center overflow-hidden">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-1 h-4 bg-current rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
