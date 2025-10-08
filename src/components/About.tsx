// src/components/About.tsx
'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Heart, Building, Cpu } from 'lucide-react';
import DrawUnderlineButton from './AnimatedComponents/DrawUnderlineButton';

// Import images
import technicalExcellenceImg from '@/assets/Technical Excellence.png';
import webTechnologiesImg from '@/assets/Web Technologies.png';
import healthcareFocusImg from '@/assets/Healthcare Focus.png';
import governmentSolutionsImg from '@/assets/government_solutions.png';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const BentoGridItem = ({
  title,
  description,
  icon,
  image,
  className,
  size = 'small',
}: BentoGridItemProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        'group border-gray-200 dark:border-primary/10 bg-white dark:bg-background hover:border-primary/50 dark:hover:border-primary/30 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-lg hover:shadow-xl transition-all duration-500',
        className,
      )}
    >
      <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3d16165e_1px,transparent_1px),linear-gradient(to_bottom,#3d16165e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

      <div className="text-gray-100 dark:text-primary/5 group-hover:text-gray-200 dark:group-hover:text-primary/10 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {icon}
      </div>

      {/* Large image at top right */}
      {image && (
        <div className="absolute top-4 right-4 z-10 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-lg p-3">
          <img 
            src={image} 
            alt={title}
            className="h-20 w-20 object-contain opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
          />
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-primary/10 text-primary shadow-primary/10 group-hover:bg-primary/20 group-hover:shadow-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="text-primary mt-4 flex items-center text-sm">
          <span className="mr-1 text-gray-700 dark:text-gray-300">Learn more</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2 text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </motion.div>
  );
};

export const About = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const items = [
    {
      title: 'Technical Excellence',
      description: 'We leverage cutting-edge technologies including React, Node.js, Python, and cloud infrastructure to build scalable, high-performance applications. Our expert developers specialize in full-stack development, microservices architecture, and DevOps practices to deliver enterprise-grade solutions that stand the test of time.',
      icon: <Code className="size-6" />,
      image: technicalExcellenceImg,
      size: 'large' as const,
    },
    {
      title: 'AI & Machine Learning',
      description: 'Harnessing the power of artificial intelligence, machine learning, and data analytics to create intelligent systems. We develop custom AI models, implement computer vision solutions, natural language processing, and predictive analytics to automate processes and enhance user experiences across industries.',
      icon: <Cpu className="size-6" />,
      image: webTechnologiesImg,
      size: 'medium' as const,
    },
    {
      title: 'Healthcare Technology',
      description: 'Revolutionizing healthcare through innovative IT solutions including electronic health records (EHR), telemedicine platforms, patient management systems, and medical device integration. We ensure HIPAA compliance while delivering secure, user-friendly applications that improve patient care and streamline medical workflows.',
      icon: <Heart className="size-6" />,
      image: healthcareFocusImg,
      size: 'medium' as const,
    },
    {
      title: 'Government & Enterprise',
      description: 'Delivering robust, secure digital platforms for government agencies and large enterprises. Our solutions include exam management systems, citizen portals, document management, e-governance platforms, and enterprise resource planning (ERP) systems with advanced security protocols and scalable architectures.',
      icon: <Building className="size-6" />,
      image: governmentSolutionsImg,
      size: 'large' as const,
    },
  ];

  return (
    <section
      id="about"
      className="py-32 lg:py-40 bg-white dark:bg-background relative"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Us
            </span>
          </motion.div> */}

          <DrawUnderlineButton onBack={true} marginTop="32px" width="90%" thickness={3} autoAnimate={true}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-lg mb-6 text-foreground"
            >
              About Us
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

        {/* Bento Grid */}
        <div className="mx-auto max-w-6xl px-4 py-12">
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                icon={item.icon}
                image={item.image}
                size={item.size}
                className="h-80"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

