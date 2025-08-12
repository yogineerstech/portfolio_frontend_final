
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const progress = progressRef.current;

    if (!overlay || !progress) return;

    // Initial page load animation
    const tl = gsap.timeline();

    // Progress bar animation
    tl.to(progress, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.out'
    })
    // Overlay fade out
    .to(overlay, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    })
    // Remove overlay
    .set(overlay, {
      display: 'none'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Page Load Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      >
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-2xl">Y</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-display-sm font-bold text-foreground"
            >
              Yogineers
            </motion.h1>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-border rounded-full mx-auto">
            <div
              ref={progressRef}
              className="h-full bg-primary rounded-full w-0"
            />
          </div>
        </div>
      </div>

      {/* Page Content with Stagger Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        {children}
      </motion.div>
    </>
  );
};
