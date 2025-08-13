import React, {
  useRef,
  useEffect,
  ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardSwapProps {
  cards: Array<{
    id: string;
    content: ReactNode;
  }>;
  className?: string;
}

export const CardSwap: React.FC<CardSwapProps> = ({ cards, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<number>(1.5); // Increased base speed for faster idle scrolling
  const positionRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;

    if (!container || !scroller) return;

    // Create duplicated cards for infinite scroll
    const cardElements = scroller.children;
    const totalCards = cardElements.length;
    
    // Clone cards for seamless infinite scroll
    for (let i = 0; i < totalCards; i++) {
      const clone = cardElements[i].cloneNode(true) as HTMLElement;
      scroller.appendChild(clone);
    }

    // Calculate dimensions
    const cardWidth = 300; // Fixed card width
    const gap = 24; // Gap between cards
    const totalWidth = (cardWidth + gap) * totalCards;

    const animate = () => {
      positionRef.current -= speedRef.current;
      
      // Reset position when we've scrolled past original cards
      if (positionRef.current <= -totalWidth) {
        positionRef.current = 0;
      }
      
      if (scroller) {
        scroller.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Scroll trigger for speed modification
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const scrollSpeed = Math.abs(velocity) > 0 ? 3 : 1;
        speedRef.current = isHoveredRef.current ? 0.3 : 1.5 * scrollSpeed; // Increased base speed
      },
    });

    // Mouse events for hover effect
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      speedRef.current = 0.3;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      speedRef.current = 1.5; // Increased base speed
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      scrollTrigger.kill();
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cards]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`} // Removed py-12 to eliminate extra space
    >
      <div
        ref={scrollerRef}
        className="flex gap-6"
        style={{
          width: "fit-content",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-[300px] h-[400px] bg-white/10 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/40 transition-all duration-300"
          >
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};
