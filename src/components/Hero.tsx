import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WrapButton } from '@/components/ui/wrap-button-new';

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
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
        }
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out' 
        },
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
      gsap.to(parallaxRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

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
    <div 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Animated background elements */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-2xl"></div>
      </div>

      {/* Main content */}
      <div
        ref={parallaxRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        {/* Main title */}
        <div ref={titleRef} className="mb-8 mt-32">
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black text-foreground leading-none tracking-tight font-aftika">
            {splitText('YOGINEERS')}
          </h1>
        </div>

        {/* Elegant subtitle */}
        <div ref={subtitleRef} className="mb-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-foreground/90 italic font-light tracking-wide font-serif leading-relaxed">
            We don't just grow brands
          </h2>
        </div>

        {/* Tech subtitle */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-wide font-palo">
            TECH
          </h3>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="mb-12 max-w-2xl">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-montserrat">
            At Yogineers, we craft cutting-edge software solutions that bridge 
            the gap between innovation and practicality. From AI-powered applications 
            to healthcare technology and government platforms.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <div className="cta-button">
            <WrapButton href="/contact">
              Start Your Project
            </WrapButton>
          </div>
          <div className="cta-button">
            <button className="px-8 py-4 border border-primary/20 bg-background/10 text-foreground rounded-full hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm font-medium tracking-wide">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground"
      >
        <span className="text-sm font-medium mb-2 tracking-wider font-montserrat">
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-16 bg-muted-foreground/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-muted-foreground/40 animate-scroll-down"></div>
        </div>
      </div>

      {/* Enhanced floating elements with more dots */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-accent/30 rounded-full animate-float shadow-lg shadow-accent/20"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-primary/25 rounded-full animate-float-delayed shadow-lg shadow-primary/20"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-accent/35 rounded-full animate-float-slow shadow-md shadow-accent/15"></div>
      <div className="absolute top-60 left-1/4 w-2.5 h-2.5 bg-secondary/20 rounded-full animate-float shadow-lg shadow-secondary/10"></div>
      <div className="absolute bottom-60 right-20 w-1 h-1 bg-muted-foreground/30 rounded-full animate-float-delayed shadow-sm"></div>
      <div className="absolute top-32 right-1/3 w-4 h-4 bg-primary/15 rounded-full animate-float-slow shadow-xl shadow-primary/10"></div>
      <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-accent/25 rounded-full animate-float shadow-md shadow-accent/20"></div>
      <div className="absolute top-72 right-16 w-2 h-2 bg-secondary/25 rounded-full animate-float-delayed shadow-lg shadow-secondary/15"></div>
      
      {/* Additional floating dots */}
      <div className="absolute top-1/3 left-10 w-1 h-1 bg-primary/20 rounded-full animate-float shadow-sm shadow-primary/10"></div>
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-accent/20 rounded-full animate-float-slow shadow-md shadow-accent/15"></div>
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-float-delayed shadow-lg shadow-secondary/20"></div>
      <div className="absolute top-1/4 right-1/5 w-3 h-3 bg-primary/10 rounded-full animate-float shadow-xl shadow-primary/5"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full animate-float-slow shadow-sm shadow-accent/25"></div>
      <div className="absolute top-3/4 left-1/6 w-2 h-2 bg-muted-foreground/25 rounded-full animate-float-delayed shadow-md"></div>
      <div className="absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-secondary/35 rounded-full animate-float shadow-lg shadow-secondary/15"></div>
      <div className="absolute bottom-1/5 left-2/3 w-2.5 h-2.5 bg-primary/20 rounded-full animate-float-slow shadow-xl shadow-primary/15"></div>
      <div className="absolute top-1/6 left-1/2 w-1 h-1 bg-accent/30 rounded-full animate-float-delayed shadow-sm shadow-accent/20"></div>
      <div className="absolute bottom-1/6 right-1/2 w-2 h-2 bg-secondary/20 rounded-full animate-float shadow-lg shadow-secondary/10"></div>
      <div className="absolute top-5/6 left-3/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-float-slow shadow-md shadow-primary/20"></div>
      <div className="absolute bottom-2/3 left-1/12 w-1 h-1 bg-accent/35 rounded-full animate-float-delayed shadow-sm shadow-accent/15"></div>
      <div className="absolute top-1/12 right-3/4 w-3 h-3 bg-muted-foreground/20 rounded-full animate-float shadow-xl"></div>
      <div className="absolute bottom-1/12 right-1/12 w-2 h-2 bg-secondary/30 rounded-full animate-float-slow shadow-lg shadow-secondary/25"></div>
    </div>
  );
};
