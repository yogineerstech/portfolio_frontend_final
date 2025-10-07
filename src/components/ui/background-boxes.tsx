// src/components/ui/background-boxes.tsx
"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ rows: 40, cols: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Pause animations when component is not in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate grid dimensions based on viewport
  useEffect(() => {
    const calculateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Each box is roughly 96px wide (w-24) and 64px tall (h-16)
      // We add extra to ensure full coverage with the skew transform
      const cols = Math.ceil((width * 2) / 96);
      const rows = Math.ceil((height * 2) / 64);
      
      setDimensions({ rows, cols });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  // Generate arrays based on calculated dimensions
  const rows = useMemo(() => new Array(dimensions.rows).fill(1), [dimensions.rows]);
  const cols = useMemo(() => new Array(dimensions.cols).fill(1), [dimensions.cols]);
  
  const colors = useMemo(() => [
    "#93c5fd",
    "#f9a8d4",
    "#86efac",
    "#fde047",
    "#fca5a5",
    "#d8b4fe",
    "#93c5fd",
    "#a5b4fc",
    "#c4b5fd",
  ], []);

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Static version for reduced motion preference
  if (shouldReduceMotion) {
    return (
      <div
        ref={containerRef}
        style={{
          transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scale(1) rotate(0deg) translateZ(0)`,
        }}
        className={cn(
          "absolute top-1/2 left-1/2 z-0 flex h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 p-4 opacity-20",
          className,
        )}
        {...rest}
      >
        {rows.slice(0, Math.min(15, rows.length)).map((_, i) => (
          <div key={`row-${i}`} className="relative h-16 w-24 border-l border-slate-700">
            {cols.slice(0, Math.min(10, cols.length)).map((_, j) => (
              <div
                key={`col-${j}`}
                className="relative h-16 w-24 border-t border-r border-slate-700"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scale(1) rotate(0deg) translateZ(0)`,
        willChange: isVisible ? 'transform' : 'auto',
      }}
      className={cn(
        "absolute top-1/2 left-1/2 z-0 flex h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className="relative h-16 w-24 border-l border-slate-600"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={isVisible ? {
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              } : {}}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col-${j}`}
              className="relative h-16 w-24 border-t border-r border-slate-600"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[20px] -left-[28px] h-8 w-12 stroke-[1px] text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);