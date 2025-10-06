import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface ProfessionalTransitionProps {
  children: React.ReactNode;
}

export const ProfessionalTransition = ({ children }: ProfessionalTransitionProps) => {
  const location = useLocation();
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    const logo = logoRef.current;
    
    if (!curtain || !logo) return;

    // Skip animation on initial load
    if (location.pathname === '/' && !sessionStorage.getItem('hasNavigated')) {
      sessionStorage.setItem('hasNavigated', 'true');
      return;
    }

    // Professional curtain transition
    const tl = gsap.timeline();

    // Set initial state
    gsap.set(curtain, { 
      display: 'flex',
      scaleY: 0,
      transformOrigin: 'top center'
    });
    
    gsap.set(logo, {
      scale: 0.8,
      opacity: 0
    });

    // Animate curtain down
    tl.to(curtain, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power3.out'
    })
    // Animate logo in
    .to(logo, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, '-=0.3')
    // Hold
    .to({}, { duration: 0.2 })
    // Animate logo out
    .to(logo, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
    // Animate curtain up
    .to(curtain, {
      scaleY: 0,
      transformOrigin: 'bottom center',
      duration: 0.6,
      ease: 'power3.in'
    }, '-=0.1')
    // Hide curtain
    .set(curtain, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      {/* Professional Curtain Transition */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background to-background/95 backdrop-blur-sm flex items-center justify-center"
        style={{ display: 'none' }}
      >
        <div ref={logoRef} className="text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <img 
              src="/tr.png" 
              alt="Transition Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>
      </div>

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -15, filter: "blur(1px)" }}
        transition={{ 
          duration: 0.8, 
          delay: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </>
  );
};