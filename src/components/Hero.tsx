import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate title with stagger effect
    if (titleRef.current) {
      const chars = titleRef.current.textContent?.split('') || [];
      titleRef.current.innerHTML = chars
        .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      tl.fromTo(
        '.char',
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        }
      );
    }

    // Animate subtitle and CTA
    tl.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/90">
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'linear',
              }}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-display-xl mb-8 text-foreground leading-none"
          >
            Yogineers Technologies
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-body-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            We craft cutting-edge software solutions with AI integration, healthcare technology,
            and government platforms. Building the future of digital experiences with premium
            design and flawless execution.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium group flex items-center justify-center gap-3"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline-premium"
            >
              View Our Work
            </motion.button>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};