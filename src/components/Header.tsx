
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import { Spotlight } from '@/components/ui/spotlight-new';
import { WrapButton } from '@/components/ui/wrap-button-new';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/companyblogs' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href !== location.pathname) {
      navigate(href);
    }
  };

  return (
    <>
      {/* Professional Spotlight Effect (constrained) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="hsl(var(--primary))"
        />
      </div>
      
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0 }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/20 backdrop-blur-3xl border-b border-white/10 shadow-2xl' 
            : 'bg-background/10 backdrop-blur-2xl border-b border-white/5 shadow-xl'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavClick('/')}
            >
              <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg font-mono">Y</span>
              </div>
              <span className="text-display-sm font-bold text-foreground tracking-tight font-sans">
                Yogineers
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ 
                      y: -2,
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17,
                      duration: 0.2
                    }}
                    className={`relative font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                      isActive 
                        ? 'text-primary bg-primary/5' 
                        : 'text-foreground hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <motion.span
                      whileHover={{ letterSpacing: "0.05em" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ 
                  scale: 0.9,
                  rotate: -15
                }}
                initial={{ opacity: 1, scale: 1, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17
                }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "light" ? 0 : 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {theme === "light" ? 
                    <Moon className="h-5 w-5 text-foreground" /> : 
                    <Sun className="h-5 w-5 text-foreground" />
                  }
                </motion.div>
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0 }}
              >
                <WrapButton href="/contact" className="scale-75">
                  Get Started
                </WrapButton>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17
              }}
              className="md:hidden p-2 text-foreground rounded-lg transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-white/10 bg-white/5 backdrop-blur-md rounded-b-2xl"
            >
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ 
                      x: 10,
                      backgroundColor: isActive ? "rgba(var(--primary), 0.1)" : "rgba(var(--accent), 0.05)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 17
                    }}
                    className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'text-primary font-medium bg-primary/5' 
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    <motion.span
                      whileHover={{ letterSpacing: "0.02em" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  </motion.button>
                );
              })}
              <motion.button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                whileHover={{ 
                  x: 10,
                  backgroundColor: "rgba(var(--accent), 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: navItems.length * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                className="flex items-center justify-center w-full py-3 px-4 text-foreground hover:text-accent transition-all duration-300 rounded-lg"
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  {theme === "light" ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
                  <motion.span
                    whileHover={{ letterSpacing: "0.02em" }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </motion.span>
                </motion.div>
              </motion.button>
              <div className="w-full mt-4 flex justify-center">
                <WrapButton href="/contact" className="scale-90">
                  Get Started
                </WrapButton>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
};
