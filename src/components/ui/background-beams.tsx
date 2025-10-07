// src/components/ui/background-beams.tsx
"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const [isVisible, setIsVisible] = useState(false);
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

    // Reduce number of paths for better performance (from 50 to 15)
    const paths = useMemo(() => [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
      "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
      "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
      "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
      "M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
      "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
      "M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
      "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
      "M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
      "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
      "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
      "M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
    ], []);

    // Pre-calculate animation configs
    const animationConfigs = useMemo(() => 
      paths.map(() => ({
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 6,
        y2Offset: 93 + Math.random() * 8
      })), [paths]
    );

    // Don't animate if reduced motion is preferred
    if (shouldReduceMotion) {
      return (
        <div
          ref={containerRef}
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-center opacity-20",
            className,
          )}
        >
          <svg
            className="pointer-events-none absolute z-0 h-full w-full"
            width="100%"
            height="100%"
            viewBox="0 0 696 316"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859"
              stroke="#6344F5"
              strokeOpacity="0.2"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]",
          className,
        )}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ willChange: isVisible ? 'transform' : 'auto' }}
        >
          {/* Render all path traces as static background */}
          {paths.map((path, index) => (
            <path
              key={`static-path-${index}`}
              d={path}
              stroke="url(#paint0_radial_242_278)"
              strokeOpacity="0.15"
              strokeWidth="0.5"
            />
          ))}

          {/* Animated beams on top of static traces */}
          {isVisible && paths.map((path, index) => (
            <motion.path
              key={`animated-path-${index}`}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.6"
              strokeWidth="0.5"
              style={{ willChange: 'auto' }}
            />
          ))}
          
          <defs>
            {paths.map((path, index) => {
              const config = animationConfigs[index];
              return (
                <motion.linearGradient
                  id={`linearGradient-${index}`}
                  key={`gradient-${index}`}
                  initial={{
                    x1: "0%",
                    x2: "0%",
                    y1: "0%",
                    y2: "0%",
                  }}
                  animate={isVisible ? {
                    x1: ["0%", "100%"],
                    x2: ["0%", "95%"],
                    y1: ["0%", "100%"],
                    y2: ["0%", `${config.y2Offset}%`],
                  } : {}}
                  transition={{
                    duration: config.duration,
                    ease: "linear",
                    repeat: Infinity,
                    delay: config.delay,
                    repeatType: "loop",
                  }}
                >
                  <stop stopColor="#18CCFC" stopOpacity="0" />
                  <stop stopColor="#18CCFC" />
                  <stop offset="32.5%" stopColor="#6344F5" />
                  <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
                </motion.linearGradient>
              );
            })}

            <radialGradient
              id="paint0_radial_242_278"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.0666667" stopColor="#9ca3af" />
              <stop offset="0.243243" stopColor="#6b7280" />
              <stop offset="0.43594" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";