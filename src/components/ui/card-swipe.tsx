import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardData {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  color: string;
}

interface CardSwipeProps {
  cards: CardData[];
  className?: string;
}

export const CardSwipe: React.FC<CardSwipeProps> = ({ cards, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate indicators
    indicatorRefs.current.forEach((indicator, index) => {
      if (indicator) {
        gsap.to(indicator, {
          scale: index === currentIndex ? 1.2 : 1,
          opacity: index === currentIndex ? 1 : 0.5,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  }, [currentIndex]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === cards.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? cards.length - 1 : prevIndex - 1;
      }
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <div className={cn('relative w-full max-w-4xl mx-auto', className)}>
      {/* Card Container */}
      <div 
        ref={containerRef}
        className="relative h-[500px] flex items-center justify-center perspective-1000"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full max-w-lg cursor-grab active:cursor-grabbing"
          >
            <div className="bg-card rounded-3xl p-8 shadow-2xl border border-border h-full">
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cards[currentIndex].color} p-4 shadow-lg`}>
                  {React.createElement(cards[currentIndex].icon, { className: "w-full h-full text-white" })}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-display-sm text-foreground">
                  {cards[currentIndex].title}
                </h3>
                
                <p className="text-body text-muted-foreground leading-relaxed">
                  {cards[currentIndex].description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {cards[currentIndex].features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-body text-muted-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent/10 transition-colors duration-200"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent/10 transition-colors duration-200"
          aria-label="Next card"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {cards.map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) indicatorRefs.current[index] = el;
            }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={cn(
              'w-3 h-3 rounded-full cursor-pointer transition-colors duration-200',
              index === currentIndex
                ? 'bg-accent'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
          />
        ))}
      </div>

      {/* Swipe instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-center text-sm text-muted-foreground mt-4"
      >
        Swipe or use arrows to navigate
      </motion.p>
    </div>
  );
};