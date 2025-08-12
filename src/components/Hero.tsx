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
      className="relative min-h-screen overflow-hidden bg-[hsl(var(--cream-background))] dark:bg-[hsl(var(--cream-background))]"
    >
      {/* Animated background elements */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(var(--cream-text))]/5 dark:bg-[hsl(var(--cream-text))]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[hsl(var(--cream-text))]/3 dark:bg-[hsl(var(--cream-text))]/8 rounded-full blur-2xl"></div>
      </div>

      {/* Main content */}
      <div
        ref={parallaxRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        {/* Main title */}
        <div ref={titleRef} className="mb-6">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-[hsl(var(--cream-text))] leading-none tracking-tight font-aftika">
            {splitText('YOGINEERS')}
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--cream-text))] tracking-wide font-palo">
            TECH
          </h2>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="mb-12 max-w-2xl">
          <p className="text-lg md:text-xl text-[hsl(var(--cream-text))]/80 leading-relaxed font-montserrat">
            Crafting digital experiences that inspire and innovate. 
            We transform ideas into beautiful, functional solutions 
            that make a difference.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <div className="cta-button">
            <WrapButton href="/services">
              Discover Excellence
            </WrapButton>
          </div>
          <div className="cta-button">
            <WrapButton href="/contact">
              View Portfolio
            </WrapButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[hsl(var(--cream-text))]/60"
      >
        <span className="text-sm font-medium mb-2 tracking-wider font-montserrat">
          SCROLL
        </span>
        <div className="w-px h-16 bg-[hsl(var(--cream-text))]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-[hsl(var(--cream-text))]/40 animate-scroll-down"></div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-[hsl(var(--cream-text))]/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-[hsl(var(--cream-text))]/15 rounded-full animate-float-delayed"></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-[hsl(var(--cream-text))]/25 rounded-full animate-float-slow"></div>
    </div>
  );
};
