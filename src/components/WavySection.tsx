// src/components/WavySection.tsx
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export const WavySection = () => {
  return (
    <section id="wavy-section" className="bg-white dark:bg-background relative overflow-hidden">
      <WavyBackground
        containerClassName="min-h-screen"
        className="max-w-4xl mx-auto px-4"
        colors={[
          "#000000",
          "#1a1a1a",
          "#2c2c2c",
          "#3b1d0e",
          "#4a1f00",
          "#ff6600",
          "#ff7b00",
          "#ff8c1a",
          "#ff9f40",
          "#ffae42",
          "#ffd8a8"
        ]}
        waveWidth={50}
        backgroundFill="#ffffffff"
        blur={10}
        speed="fast"
        waveOpacity={0.5}
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black">
            Experience the Wave of Revolution
          </h2>
          <p className="text-lg md:text-xl text-black-200 max-w-2xl mx-auto">
            Powering innovation through intelligent IT — where technology meets design to deliver remarkable digital experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="bg-black text-white hover:bg-black/90 font-medium px-8 py-3 text-lg"
              duration={0.8}
              clockwise={true}
            >
              Get Started
            </HoverBorderGradient>
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="bg-white/90 text-black hover:bg-white font-medium px-8 py-3 text-lg"
              duration={0.8}
              clockwise={false}
            >
              Learn More
            </HoverBorderGradient>
          </div>
        </div>
      </WavyBackground>
    </section>
  );
};