import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface ShredTransitionProps {
  children: React.ReactNode;
}

export const ShredTransition = ({ children }: ShredTransitionProps) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create shredding rectangles
    const rectangles: HTMLDivElement[] = [];
    const numRectangles = 20;
    
    // Clear previous rectangles
    container.innerHTML = '';
    
    for (let i = 0; i < numRectangles; i++) {
      const rect = document.createElement('div');
      rect.className = `fixed top-0 bg-background z-[9999] h-screen transition-transform duration-700 ease-in-out`;
      rect.style.left = `${(i / numRectangles) * 100}%`;
      rect.style.width = `${100 / numRectangles}%`;
      rect.style.transform = 'translateY(-100%)';
      container.appendChild(rect);
      rectangles.push(rect);
    }

    // Animation timeline
    const tl = gsap.timeline();

    // Show rectangles with staggered animation
    tl.set(container, { display: 'block' })
      .to(rectangles, {
        y: 0,
        duration: 0.6,
        stagger: {
          amount: 0.3,
          from: "center"
        },
        ease: 'power2.out'
      })
      // Hold briefly
      .to({}, { duration: 0.3 })
      // Hide rectangles
      .to(rectangles, {
        y: '100vh',
        duration: 0.6,
        stagger: {
          amount: 0.3,
          from: "center"
        },
        ease: 'power2.in'
      })
      .set(container, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      {/* Shredding Transition Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.2,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.div>
    </>
  );
};