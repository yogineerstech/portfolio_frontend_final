// src/components/About.tsx
'use client';
import { motion } from 'framer-motion';
import { Code, Heart, Building, Cpu } from 'lucide-react';
import DrawUnderlineButton from './AnimatedComponents/DrawUnderlineButton';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';

// Import images
import technicalExcellenceImg from '@/assets/Technical Excellence.png';
import webTechnologiesImg from '@/assets/Web Technologies.png';
import healthcareFocusImg from '@/assets/Healthcare Focus.png';
import governmentSolutionsImg from '@/assets/government_solutions.png';

// Content for StickyScroll component
const aboutContent = [
  {
    title: "Technical Excellence",
    description: "We leverage cutting-edge technologies including React, Node.js, Python, and cloud infrastructure to build scalable, high-performance applications. Our expert developers specialize in full-stack development, microservices architecture, and DevOps practices to deliver enterprise-grade solutions that stand the test of time.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={technicalExcellenceImg}
          className="h-full w-full object-contain"
          alt="Technical Excellence"
        />
      </div>
    ),
  },
  {
    title: "AI & Machine Learning",
    description: "We develop custom AI models, implement computer vision solutions, natural language processing, and predictive analytics to automate processes and enhance user experiences across industries. Our intelligent systems transform raw data into actionable insights.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={webTechnologiesImg}
          className="h-full w-full object-contain"
          alt="AI & Machine Learning"
        />
      </div>
    ),
  },
  {
    title: "Healthcare Technology",
    description: "Transforming healthcare through secure, user-friendly IT solutions like EHR, telemedicine, and patient management systems that streamline workflows and improve care. We ensure HIPAA compliance while delivering exceptional user experiences.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={healthcareFocusImg}
          className="h-full w-full object-contain"
          alt="Healthcare Technology"
        />
      </div>
    ),
  },
  {
    title: "Government & Enterprise",
    description: "Delivering robust, secure digital platforms for government agencies and large enterprises. Our solutions include exam management systems, citizen portals, document management, e-governance platforms, and enterprise resource planning (ERP) systems with advanced security protocols.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={governmentSolutionsImg}
          className="h-full w-full object-contain"
          alt="Government & Enterprise"
        />
      </div>
    ),
  },
  {
    title: "Innovation & R&D",
    description: "Continuous research and development in emerging technologies to stay ahead of industry trends and deliver next-generation solutions. We invest in exploring new possibilities to solve tomorrow's challenges today.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={technicalExcellenceImg}
          className="h-full w-full object-contain"
          alt="Innovation & R&D"
        />
      </div>
    ),
  },
  {
    title: "Global Reach",
    description: "Serving clients worldwide with 24/7 support and localized solutions tailored to different markets and regulatory requirements. Our global presence ensures seamless collaboration across time zones and cultures.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={governmentSolutionsImg}
          className="h-full w-full object-contain"
          alt="Global Reach"
        />
      </div>
    ),
  },
];

export const About = () => {
  return (
    <section
      id="about"
      className="py-32 lg:py-40 bg-white dark:bg-background relative"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <DrawUnderlineButton onBack={true} marginTop="32px" width="90%" thickness={3} autoAnimate={true}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-lg mb-6 text-foreground"
            >
              Pioneering the Future of Software Development
            </motion.h2>
          </DrawUnderlineButton>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            At Yogineers Technologies, we transform ideas into exceptional digital experiences 
            through innovation, creativity, and cutting-edge technology.
          </motion.p>
        </div>

        {/* Sticky Scroll Reveal */}
        <div className="w-full">
          <StickyScroll content={aboutContent} />
        </div>
      </div>
    </section>
  );
};

