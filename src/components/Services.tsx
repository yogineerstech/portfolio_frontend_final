import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { 
  Code2,
  Database,
  Smartphone,
  Brain,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardSwap } from '@/components/ui/card-swap';
import { CometCard } from '@/components/ui/comet-card';
import { fetchServices, Service } from '@/lib/api';
import { getIconComponent } from '@/lib/icons';
import DrawUnderlineButton from './AnimatedComponents/DrawUnderlineButton';
import AnimatedGridBackground from './AnimatedComponents/AnimatedGridBackground';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiGithub,
  SiFigma,
  SiRedis,
  SiGraphql,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiJenkins,
  SiTerraform
} from 'react-icons/si';
import LogoLoop from './LogoLoop';



const techLogosOne = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython />, title: "Python", href: "https://python.org" },
  { node: <SiDocker />, title: "Docker", href: "https://docker.com" },
  { node: <SiAmazon />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
];
const techLogosTwo = [
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://postgresql.org" },
  { node: <SiKubernetes />, title: "Kubernetes", href: "https://kubernetes.io" },
  { node: <SiGooglecloud />, title: "Google Cloud", href: "https://cloud.google.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
];


gsap.registerPlugin(ScrollTrigger);

interface TechBentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: string[];
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const TechBentoGridItem = ({
  title,
  description,
  icon,
  technologies,
  className,
  size = 'small',
}: TechBentoGridItemProps) => {
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
        'group border-gray-200 dark:border-accent/20 bg-white dark:bg-background hover:border-accent/60 dark:hover:border-accent/50 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-lg hover:shadow-xl transition-all duration-500',
        className,
      )}
    >
  <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px] dark:bg-[size:32px_32px]"></div>

      <div className="text-accent/10 dark:text-accent/10 group-hover:text-accent/20 dark:group-hover:text-accent/20 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {icon}
      </div>

      {/* Technology icons at top right */}
      <div className="absolute top-4 right-4 z-10 flex flex-wrap gap-1">
        {technologies.slice(0, 3).map((tech, idx) => (
          <div key={idx} className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-md p-1">
            <span className="text-xs font-mono text-gray-700 dark:text-gray-300">{tech}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-accent/10 text-accent shadow-accent/10 group-hover:bg-accent/20 group-hover:shadow-accent/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">{title}</h3>
          <p className="text-gray-600 dark:text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
          
          {/* Technology list */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, idx) => (
              <span key={idx} className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="text-accent mt-auto flex items-center text-sm pt-2">
          <span className="mr-1 text-gray-700 dark:text-gray-300">View Projects</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2 text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const techItems = [
  {
    title: 'Frontend Development',
    description: 'We design and develop modern, responsive web applications that combine aesthetic appeal with powerful functionality. Using cutting-edge frontend technologies such as React, Next.js, and TypeScript, we create seamless, high-performance digital experiences optimized for speed, accessibility, and scalability. Every interface is crafted with precision to ensure intuitive navigation, exceptional responsiveness, and a truly engaging user journey across all devices.',
    icon: <Code2 className="size-6" />,
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vue.js'],
    size: 'large' as const,
  },
  {
    title: 'Backend & APIs',
    description: 'Scalable server-side solutions and robust APIs built with industry-leading backend technologies.',
    icon: <Database className="size-6" />,
    technologies: ['Node.js', 'Python', 'FastAPI', 'Express', 'PostgreSQL', 'MongoDB'],
    size: 'medium' as const,
  },
  {
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications for iOS and Android with native performance and user experience.',
    icon: <Smartphone className="size-6" />,
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase'],
    size: 'medium' as const,
  },
  {
    title: 'AI & Machine Learning',
    description: 'We develop intelligent digital solutions powered by artificial intelligence, machine learning, and advanced data analytics. Our systems leverage predictive algorithms, natural language processing, and automation to uncover insights, optimize decision-making, and enhance operational efficiency. By transforming raw data into actionable intelligence, we help businesses innovate faster, reduce costs, and deliver smarter, more personalized user experiences.',
    icon: <Brain className="size-6" />,
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Langchain', 'Scikit-learn', 'Pandas'],
    size: 'large' as const,
  },
  {
    title: 'Cloud & DevOps',
    description: 'Scalable cloud infrastructure and automated deployment pipelines for reliable, high-performance applications.',
    icon: <SiAmazon className="size-6" />,
    technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Vercel'],
    size: 'medium' as const,
  },
  {
    title: 'Database Solutions',
    description: 'Optimized database architectures and data management systems for efficient data storage and retrieval.',
    icon: <SiPostgresql className="size-6" />,
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Prisma', 'Supabase'],
    size: 'medium' as const,
  },
  {
    title: 'Web3 & Blockchain',
    description: 'Decentralized applications, smart contracts, and blockchain solutions for the next generation of web applications.',
    icon: <SiGit className="size-6" />,
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'IPFS', 'MetaMask', 'Polygon'],
    size: 'medium' as const,
  },
];

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static features for each service type (to maintain design)
  const serviceFeatures: Record<string, string[]> = {
    'Custom Exam Portals': ['Exam Management System', 'Automated Processes', 'Secure Assessments', 'Analytics & Reports'],
    'E-Learning Platforms': ['Interactive Content', 'Progress Tracking', 'Course Management', 'Gamification'],
    'Data Analytics & AI': ['Data Visualization', 'Predictive Analytics', 'AI Automation', 'ML Models'],
    'Custom LLM Solutions': ['Custom Language Models', 'Industry-Specific AI', 'Chatbots & Virtual Assistants', 'Content Generation'],
    'E-Commerce Solutions': ['Online Stores', 'Payment Gateway Integration', 'Inventory Management', 'Custom Checkout'],
    'Mobile Development': ['iOS Apps', 'Android Apps', 'Cross-Platform Development', 'App Store Deployment'],
    'Desktop Applications': ['Windows Applications', 'macOS Apps', 'Linux Support', 'Custom UI/UX'],
    'Cloud Solutions': ['Cloud Hosting', 'Scalable Infrastructure', 'CI/CD Pipelines', 'Serverless Applications'],
    'Trading Bot': ['Automated Trading', 'Custom Strategies', 'Market Analysis', 'Real-Time Monitoring'],
  };

  // Static colors for each service (to maintain design)
  const serviceColors: Record<string, string> = {
    'Custom Exam Portals': 'from-blue-500 to-cyan-500',
    'E-Learning Platforms': 'from-green-500 to-emerald-500',
    'Data Analytics & AI': 'from-purple-500 to-pink-500',
    'Custom LLM Solutions': 'from-indigo-500 to-violet-500',
    'E-Commerce Solutions': 'from-orange-500 to-yellow-500',
    'Mobile Development': 'from-pink-500 to-rose-500',
    'Desktop Applications': 'from-gray-500 to-slate-500',
    'Cloud Solutions': 'from-teal-500 to-cyan-500',
    'Trading Bot': 'from-yellow-500 to-amber-500',
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const servicesData = await fetchServices();
        setServices(servicesData);
      } catch (err) {
        setError('Failed to load services');
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleViewProjects = (serviceId: number) => {
    navigate(`/projects/${serviceId}`);
  };
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
    ).fromTo(
      '.card-swap-container',
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
      },
      '-=0.4'
    ).fromTo(
      '.tech-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      '-=0.2'
    );
  }, [isInView]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white dark:bg-background relative"
    >


      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <DrawUnderlineButton onBack={true} marginTop="32px" width="90%" thickness={3} autoAnimate={true} >
          <h2
            ref={titleRef}
            className="text-display-lg mb-6 text-foreground"
          >
            Our Expertise & Services
          </h2>
          </DrawUnderlineButton>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            We deliver comprehensive technology solutions across multiple domains, 
            combining innovation with reliability to drive your business forward.
          </p>
        </div>

        <div className="card-swap-container relative">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-accent text-accent-foreground px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <CardSwap 
              cards={services.map((service) => {
                const IconComponent = getIconComponent(service.service_icon);
                const features = serviceFeatures[service.service_name] || ['Feature 1', 'Feature 2', 'Feature 3'];
                const color = serviceColors[service.service_name] || 'from-gray-500 to-slate-500';
                
                return {
                  id: service.service_id.toString(),
                  content: (
                    <div className="h-full flex flex-col">
                      {/* Icon and Title */}
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                          <IconComponent className="w-7 h-7 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground font-palo">
                          {service.service_name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                        {service.service_description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Call to Action */}
                      <button 
                        onClick={() => handleViewProjects(service.service_id)}
                        className="mt-auto w-full bg-accent/10 hover:bg-accent/20 text-accent font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                      >
                        View Projects
                      </button>
                    </div>
                  ),
                };
              })}
              className="mb-16"
            />
          )}
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-32 text-center"
        >
          <DrawUnderlineButton onBack={true} marginTop="35px" width="80%" thickness={3} autoAnimate={true} >
          <h2 className="text-display-lg mb-6 text-foreground">
            Technologies We Master
          </h2>
          </DrawUnderlineButton>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-16">
            Leveraging cutting-edge technologies and frameworks to build scalable, 
            robust solutions that meet modern business demands.
          </p>


          <div style={{ height: '400px', position: 'relative'}}>
            {/* Frontend Technologies Row */}
            <div style={{ position: 'absolute', top: '0', width: '100%', height: '150px' }}>
              <LogoLoop
                logos={techLogosOne}
                speed={100}
                direction="left"
                logoHeight={64}
                gap={70}
                pauseOnHover
                scaleOnHover
                fadeOut
                ariaLabel="Frontend Technologies"
              />
            </div>
            
            {/* Backend Technologies Row */}
            <div style={{ position: 'absolute', top: '150px', width: '100%', height: '150px' }}>
              <LogoLoop
                logos={techLogosTwo}
                speed={110}
                direction="right"
                logoHeight={68}
                gap={70}
                pauseOnHover
                scaleOnHover
                fadeOut
                ariaLabel="Backend Technologies"
              />
            </div>

          </div>


          
          {/* Technology Bento Grid */}
          <div className="mx-auto max-w-6xl px-4 py-12">
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              {techItems.map((item, i) => (
                <TechBentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  technologies={item.technologies}
                  size={item.size}
                  className={item.size === 'large' ? 'lg:col-span-2 h-96' : 'h-96'}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};