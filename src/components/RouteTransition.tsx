import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export const RouteTransition = ({ children }: RouteTransitionProps) => {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const progress = progressRef.current;

    if (!overlay || !progress) return;

    // Route change animation
    const tl = gsap.timeline();

    // Show overlay with slide animation
    tl.set(overlay, {
      display: 'flex',
      x: '100%',
      opacity: 1
    })
    .to(overlay, {
      x: '0%',
      duration: 0.4,
      ease: 'power2.out'
    })
    // Progress bar
    .to(progress, {
      width: '100%',
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2')
    // Hold briefly
    .to({}, { duration: 0.2 })
    // Hide overlay
    .to(overlay, {
      x: '-100%',
      duration: 0.4,
      ease: 'power2.in'
    })
    .set(overlay, {
      display: 'none'
    })
    .set(progress, {
      width: '0%'
    });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      {/* Award-winning Route Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-black hidden items-center justify-center"
        style={{ display: 'none' }}
      >
        <div className="text-center">
          <div className="mb-12">
            <motion.div 
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <span className="text-black font-display font-bold text-3xl">Y</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white font-display font-light text-xl tracking-wide"
            >
              Transitioning...
            </motion.div>
          </div>
          
          {/* Sophisticated Progress Bar */}
          <div className="w-96 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-accent via-primary to-accent rounded-full w-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Page Content with Elegant Transition */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 30, filter: "blur(3px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(2px)" }}
        transition={{ 
          duration: 1, 
          delay: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.div>
    </>
  );
};