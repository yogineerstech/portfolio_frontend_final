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
      {/* Route Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-primary via-primary to-accent hidden items-center justify-center"
        style={{ display: 'none' }}
      >
        <div className="text-center">
          <div className="mb-8">
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="w-20 h-20 bg-primary-foreground rounded-xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <span className="text-primary font-bold text-3xl">Y</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-primary-foreground font-semibold text-lg"
            >
              Transitioning...
            </motion.div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="w-80 h-2 bg-primary-foreground/20 rounded-full mx-auto overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-primary-foreground to-accent rounded-full w-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {children}
      </motion.div>
    </>
  );
};