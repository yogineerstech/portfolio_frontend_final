
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
      {/* Award-winning Page Load Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      >
        <div className="text-center">
          <div className="mb-12">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <span className="text-black font-display font-bold text-4xl">Y</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-hero text-white mb-4"
            >
              Yogineers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-elegant-italic text-white/80"
            >
              Your growth demands experts, <span className="text-hero-accent">not excuses.</span>
            </motion.p>
          </div>
          
          {/* Enhanced Progress Bar */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="h-1 bg-white/20 rounded-full mx-auto overflow-hidden"
          >
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-white to-orange-400 rounded-full w-0"
            />
          </motion.div>
        </div>
      </div>

      {/* Page Content with Sophisticated Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ 
          duration: 1.2, 
          delay: 2.4,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
