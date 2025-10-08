// src/components/mvpblocks/About-old.tsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '@/components/ui/scroll-reveal';
import DrawUnderlineButton from '../AnimatedComponents/DrawUnderlineButton';
import AnimatedGridBackground from '../AnimatedComponents/AnimatedGridBackground';

// Import images
import technicalExcellenceImg from '@/assets/Technical Excellence.png';
import webTechnologiesImg from '@/assets/Web Technologies.png';
import healthcareFocusImg from '@/assets/Healthcare Focus.png';
import governmentSolutionsImg from '@/assets/Government Solutions.jpg';

gsap.registerPlugin(ScrollTrigger);

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(end * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);
  
  return (
    <div ref={countRef} className="text-6xl font-bold bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
      {count}{suffix}
    </div>
  );
};

export const AboutOld = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const values = [
    {
      image: technicalExcellenceImg,
      title: 'Technical Excellence',
      description: 'We push the boundaries of what\'s possible with cutting-edge technology and innovative solutions.',
      gradient: 'from-purple-500 to-pink-500',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      image: webTechnologiesImg,
      title: 'AI Innovation',
      description: 'Integrating artificial intelligence to create smarter, more intuitive digital experiences.',
      gradient: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      image: healthcareFocusImg,
      title: 'Healthcare Focus',
      description: 'Developing life-changing healthcare technology solutions that improve patient outcomes.',
      gradient: 'from-green-500 to-emerald-500',
      shadowColor: 'shadow-green-500/20'
    },
    {
      image: governmentSolutionsImg,
      title: 'Government Solutions',
      description: 'Building robust platforms for government exams and educational technology systems.',
      gradient: 'from-orange-500 to-red-500',
      shadowColor: 'shadow-orange-500/20'
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo(
      '.value-card',
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '-=0.4'
    );
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 lg:py-40 bg-white dark:bg-background relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <AnimatedGridBackground />

      {/* Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Us
            </span>
          </motion.div>

          <DrawUnderlineButton onBack={true} marginTop="65px" width="80%" thickness={3} autoAnimate={true}>
            <h2
              ref={titleRef}
              className="text-6xl lg:text-7xl font-bold mb-8 text-foreground"
            >
              <ScrollReveal
                containerClassName="my-0"
                textClassName="text-inherit font-inherit"
                enableBlur={true}
                baseOpacity={0.2}
                baseRotation={1}
                blurStrength={2}
              >
                Pioneering the Future of Software Development
              </ScrollReveal>
            </h2>
          </DrawUnderlineButton>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <ScrollReveal
              containerClassName="my-0"
              textClassName="text-inherit font-inherit"
              enableBlur={true}
              baseOpacity={0.15}
              baseRotation={0.5}
              blurStrength={1.5}
            >
              At Yogineers Technologies, we don't just write code – we architect digital experiences 
              that transform industries and improve lives.
            </ScrollReveal>
          </p>
        </div>

        {/* Values Grid - New Premium Layout */}
        <div className="max-w-7xl mx-auto space-y-32 mb-32">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className={`value-card flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-16 lg:gap-20`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * index, duration: 0.8 }}
            >
              {/* Image Container with Premium White Background */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  {/* Premium Card with White Background */}
                  <div className={`
                    relative bg-white dark:bg-gray-800 rounded-3xl p-12 lg:p-16
                    shadow-2xl hover:shadow-3xl transition-all duration-500
                    border-2 border-gray-100 dark:border-gray-700
                    hover:border-transparent
                    overflow-hidden
                    ${value.shadowColor} hover:shadow-4xl
                  `}>
                    {/* Gradient Border Glow */}
                    <div className={`
                      absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                      bg-gradient-to-r ${value.gradient} p-[2px] -z-10
                      transition-opacity duration-500
                    `}>
                      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-3xl"></div>
                    </div>

                    {/* Floating Gradient Orb */}
                    <div className={`
                      absolute -top-20 -right-20 w-64 h-64 
                      bg-gradient-to-br ${value.gradient} 
                      rounded-full blur-3xl opacity-0 group-hover:opacity-20 
                      transition-opacity duration-700
                    `}></div>

                    {/* Large Image Display */}
                    <div className="relative aspect-[4/3] flex items-center justify-center">
                      <img 
                        src={value.image} 
                        alt={value.title}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Decorative Elements */}
                    <div className={`
                      absolute bottom-8 left-8 w-24 h-24 
                      bg-gradient-to-br ${value.gradient} 
                      rounded-full blur-2xl opacity-20
                    `}></div>
                  </div>

                  {/* Floating Badge */}
                  <div className={`
                    absolute -top-6 -right-6 
                    bg-gradient-to-r ${value.gradient}
                    text-white px-6 py-3 rounded-full 
                    font-bold text-sm shadow-xl
                    opacity-0 group-hover:opacity-100
                    transform translate-y-2 group-hover:translate-y-0
                    transition-all duration-500
                  `}>
                    Featured
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full">
                <div className="max-w-xl">
                  {/* Number Badge */}
                  <div className={`
                    inline-flex items-center justify-center w-14 h-14 
                    rounded-2xl bg-gradient-to-br ${value.gradient}
                    text-white font-bold text-xl mb-6
                    shadow-lg
                  `}>
                    {index + 1}
                  </div>

                  <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                    <ScrollReveal
                      containerClassName="my-0"
                      textClassName="text-inherit font-inherit"
                      enableBlur={true}
                      baseOpacity={0.3}
                      baseRotation={0.5}
                      blurStrength={1}
                    >
                      {value.title}
                    </ScrollReveal>
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {value.description}
                  </p>

                  {/* Decorative Line */}
                  <div className="flex items-center gap-4">
                    <div className={`h-1 w-20 bg-gradient-to-r ${value.gradient} rounded-full`}></div>
                    <div className="h-1 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-1 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: 150, label: 'Projects Delivered', suffix: '+', gradient: 'from-purple-600 to-pink-600' },
                { number: 50, label: 'Happy Clients', suffix: '+', gradient: 'from-blue-600 to-cyan-600' },
                { number: 5, label: 'Years Experience', suffix: '+', gradient: 'from-green-600 to-emerald-600' },
                { number: 24, label: 'Support Available', suffix: '/7', gradient: 'from-orange-600 to-red-600' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    delay: 1.2 + (index * 0.15), 
                    duration: 0.6,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Gradient background on hover */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                    bg-gradient-to-br ${stat.gradient} blur-xl
                    transition-opacity duration-500 -z-10
                  `}></div>

                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter 
                      end={stat.number} 
                      duration={2.5} 
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};