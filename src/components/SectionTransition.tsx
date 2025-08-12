
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SectionTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const SectionTransition = ({ isActive, onComplete }: SectionTransitionProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !isActive) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    // Slide in from right
    tl.set(overlay, {
      display: 'block',
      x: '100%'
    })
    .to(overlay, {
      x: '0%',
      duration: 0.6,
      ease: 'power2.inOut'
    })
    // Hold for a moment
    .to(overlay, {
      x: '0%',
      duration: 0.1
    })
    // Slide out to left
    .to(overlay, {
      x: '-100%',
      duration: 0.6,
      ease: 'power2.inOut'
    })
    .set(overlay, {
      display: 'none'
    });

    return () => {
      tl.kill();
    };
  }, [isActive, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-primary hidden"
      style={{ display: 'none' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary font-bold text-lg">Y</span>
          </div>
          <div className="text-primary-foreground font-medium">Loading...</div>
        </div>
      </div>
    </div>
  );
};
