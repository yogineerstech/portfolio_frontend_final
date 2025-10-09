"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // Use the component as target instead of container for normal page scroll
    target: ref,
    // container: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#F7F5ED", // Light mode background - cream/off-white
    "#ffffffff", // Light mode background  
    "#F7F5ED", // Light mode background
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // repeat for more content
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // repeat for more content
    "linear-gradient(to bottom right, #f97316, #eab308)", // repeat for more content
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  // Handle theme-aware background colors
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    if (isDarkMode) {
      backgroundColors[0] = "hsl(var(--background))";
      backgroundColors[1] = "hsl(var(--background))"; 
      backgroundColors[2] = "hsl(var(--background))";
    } else {
      backgroundColors[0] = "#F7F5ED";
      backgroundColors[1] = "#F7F5ED";
      backgroundColors[2] = "#F7F5ED";
    }
  }, []);

  return (
    <motion.div
      className="relative flex min-h-[200vh] w-full justify-center space-x-10 p-10 bg-white dark:bg-[#0D0D0D]"
      ref={ref}
    >
      <div className="div relative flex items-start px-6 flex-1">
        <div className="max-w-3xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-32">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-display-lg font-bold text-black dark:text-white mb-6 leading-tight"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-lg max-w-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-10 hidden h-96 w-1/2 max-w-lg overflow-hidden lg:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
