import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WrapButton } from '@/components/ui/wrap-button-new';
import DarkVeil from '@/components/ui/dark-veil';
import { ImageVerticalCarousel } from '@/components/ImageVerticalCarousel';
import { AnimatedCTAButton } from '@/components/AnimatedCTAButton';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section entrance animation
      const tl = gsap.timeline({ delay: 2.7 });
      
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out' 
        },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out' 
        },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1, 
          ease: 'power2.out' 
        },
        '-=0.2'
      );

      // Parallax background movement
      gsap.to(backgroundRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Hero content parallax
  // Hero content parallax removed (was affecting document height) to help diagnose extra space
  // gsap.to(parallaxRef.current, {
  //   yPercent: -20,
  //   ease: 'none',
  //   scrollTrigger: {
  //     trigger: heroRef.current,
  //     start: 'top bottom',
  //     end: 'bottom top',
  //     scrub: true,
  //   },
  // });

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Micro-interactions for CTA buttons
      const ctaButtons = ctaRef.current?.querySelectorAll('.cta-button');
      ctaButtons?.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      // Text reveal animation for title
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
            delay: 3.0,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center justify-center bg-[#F8F3EA] dark:bg-gray-900">
      {/* Dark Veil Background - Only show in dark mode */}
      <div className="fixed inset-0 w-screen h-screen opacity-30 z-0 dark:block hidden">
        <DarkVeil 
          hueShift={25}
          noiseIntensity={0.03}
          scanlineIntensity={0.15}
          speed={0.2}
          scanlineFrequency={1.5}
          warpAmount={0.08}
          resolutionScale={1.0}
        />
      </div>
      
      {/* Animated background elements */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none z-10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl"></div>
      </div>

      {/* Main content - Three Column Layout */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] gap-0 w-full h-full">
        {/* Left column - Single animated marquee */}
        <div className="hidden lg:flex items-center justify-end ml-[16px]">
          <div className="w-full max-w-sm h-screen overflow-hidden">
            {/* Single column scrolling down */}
            <motion.div
              className="flex flex-col gap-8 h-full"
              animate={{
                y: [0, -50 * 5 + '%'] // Adjusted for 5 images
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[
                '/ai.png',
                '/cloud.png',
                '/cyber.png',
                '/data.png',
                '/desktop.png',
                '/ai.png',
                '/cloud.png',
                '/cyber.png',
                '/data.png',
                '/desktop.png',
              ].map((image, index) => (
                <div
                  key={`left-col-${index}`}
                  className="flex-shrink-0 h-80 md:h-96 lg:h-[28rem] relative overflow-hidden rounded-lg shadow-lg"
                  style={{ width: '280px' }}
                >
                  <img
                    src={image}
                    alt={`Service ${index + 1}`}
                    className="h-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{ width: '280px', objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Center column - Text content */}
        <div ref={parallaxRef} className="flex flex-col justify-center px-2 lg:px-12">
          {/* Elegant subtitle */}
          <div ref={subtitleRef} className="mb-4">
            <h2 className="text-xl md:text-3xl lg:text-4xl text-foreground/90 italic font-light tracking-wide font-serif leading-relaxed text-center">
              We don't just create products
            </h2>
          </div>

          {/* Main title */}
          <div ref={titleRef} className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-AftikaBold font-extrabold text-foreground leading-[0.75] tracking-tight text-center">
              We craft<br />
              Industry<br />
              Icons.
            </h1>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <div className="cta-button">
              <AnimatedCTAButton href="/contact" />
            </div>
          </div>
        </div>

        {/* Right column - Single animated marquee */}
        <div className="hidden lg:flex items-center justify-start -ml-10">
          <div className="w-full max-w-sm h-screen overflow-hidden">
            {/* Single column scrolling up */}
            <motion.div
              className="flex flex-col gap-8 h-full"
              animate={{
                y: [-50 * 5 + '%', 0] // Adjusted for 5 images, scrolling up
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[
                '/ecom.png',
                '/erp.png',
                '/exam.png',
                '/itconsulting.png',
                '/mobiledev.png',
                '/ecom.png',
                '/erp.png',
                '/exam.png',
                '/itconsulting.png',
                '/mobiledev.png',
              ].map((image, index) => (
                <div
                  key={`right-col-${index}`}
                  className="flex-shrink-0 h-80 md:h-96 lg:h-[28rem] relative overflow-hidden rounded-lg shadow-lg"
                  style={{ width: '280px' }}
                >
                  <img
                    src={image}
                    alt={`Service ${index + 1}`}
                    className="h-full object-cover transition-transform duration-300 hover:scale-105"
                    style={{ width: '280px', objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile version - Show original carousel for mobile */}
        <div className="lg:hidden col-span-1">
          <ImageVerticalCarousel className="w-full h-64" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground z-30"
      >
        <span className="text-sm font-medium mb-2 tracking-wider font-montserrat">
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-16 bg-muted-foreground/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-muted-foreground/40 animate-scroll-down"></div>
        </div>
      </div>

      {/* Enhanced floating elements with more dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-20 left-20 w-2 h-2 bg-accent/30 rounded-full animate-float shadow-lg shadow-accent/20" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-primary/25 rounded-full animate-float-delayed shadow-lg shadow-primary/20" />
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-accent/35 rounded-full animate-float-slow shadow-md shadow-accent/15" />
        <div className="absolute top-60 left-1/4 w-2.5 h-2.5 bg-secondary/20 rounded-full animate-float shadow-lg shadow-secondary/10" />
        <div className="absolute bottom-60 right-20 w-1 h-1 bg-muted-foreground/30 rounded-full animate-float-delayed shadow-sm" />
        <div className="absolute top-32 right-1/3 w-4 h-4 bg-primary/15 rounded-full animate-float-slow shadow-xl shadow-primary/10" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-accent/25 rounded-full animate-float shadow-md shadow-accent/20" />
        <div className="absolute top-72 right-16 w-2 h-2 bg-secondary/25 rounded-full animate-float-delayed shadow-lg shadow-secondary/15" />
        {/* Additional floating dots */}
        <div className="absolute top-1/3 left-10 w-1 h-1 bg-primary/20 rounded-full animate-float shadow-sm shadow-primary/10" />
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-accent/20 rounded-full animate-float-slow shadow-md shadow-accent/15" />
        <div className="absolute bottom-1/3 left-[20%] w-1.5 h-1.5 bg-secondary/30 rounded-full animate-float-delayed shadow-lg shadow-secondary/20" />
        <div className="absolute top-1/4 right-[20%] w-3 h-3 bg-primary/10 rounded-full animate-float shadow-xl shadow-primary/5" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-float-slow shadow-sm shadow-accent/25" />
        <div className="absolute top-3/4 left-[16%] w-2 h-2 bg-muted-foreground/25 rounded-full animate-float-delayed shadow-md" />
        <div className="absolute top-2/3 right-[16%] w-1.5 h-1.5 bg-secondary/35 rounded-full animate-float shadow-lg shadow-secondary/15" />
        <div className="absolute bottom-[20%] left-2/3 w-2.5 h-2.5 bg-primary/20 rounded-full animate-float-slow shadow-xl shadow-primary/15" />
        <div className="absolute top-[16%] left-1/2 w-1 h-1 bg-accent/30 rounded-full animate-float-delayed shadow-sm shadow-accent/20" />
        <div className="absolute bottom-[16%] right-1/2 w-2 h-2 bg-secondary/20 rounded-full animate-float shadow-lg shadow-secondary/10" />
        <div className="absolute top-[83%] left-3/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-float-slow shadow-md shadow-primary/20" />
        <div className="absolute bottom-[66%] left-[8%] w-1 h-1 bg-accent/35 rounded-full animate-float-delayed shadow-sm shadow-accent/15" />
        <div className="absolute top-[8%] right-3/4 w-3 h-3 bg-muted-foreground/20 rounded-full animate-float shadow-xl" />
        <div className="absolute bottom-[8%] right-[8%] w-2 h-2 bg-secondary/30 rounded-full animate-float-slow shadow-lg shadow-secondary/25" />
      </div>
    </div>
  );
};