
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import { Spotlight } from '@/components/ui/spotlight-new';

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
        className="fixed top-0 left-0 right-0 z-[9998] bg-white/10 dark:bg-black/10 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 shadow-2xl shadow-orange-400/10 dark:shadow-orange-500/8 transition-all duration-300"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">Y</span>
              </div>
              <span className="text-display-sm font-bold text-foreground">
                Yogineers
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0 }}
                  className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-card border border-border hover:bg-accent/10 transition-colors duration-300"
              >
                {theme === "light" ? 
                  <Moon className="h-5 w-5 text-foreground" /> : 
                  <Sun className="h-5 w-5 text-foreground" />
                }
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0 }}
                className="btn-premium group"
                onClick={() => handleNavClick('/contact')}
              >
                <span className="relative z-10">Get Started</span>
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0 }}
              className="md:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border"
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left py-3 text-foreground hover:text-accent transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex items-center justify-center w-full py-3 text-foreground hover:text-accent transition-colors duration-300"
              >
                {theme === "light" ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
              <button 
                onClick={() => handleNavClick('/contact')}
                className="w-full mt-4 btn-premium"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>
      </motion.header>
    </>
  );
};
