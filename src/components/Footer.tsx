import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hello@yogineers.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { name: 'Web Development', href: '#services' },
        { name: 'AI Solutions', href: '#services' },
        { name: 'Healthcare Tech', href: '#services' },
        { name: 'EdTech Platforms', href: '#services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Process', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blogs', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Support', href: '#' },
        { name: 'Privacy Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">Y</span>
                </div>
                <span className="text-display-sm font-bold">
                  Yogineers
                </span>
              </div>
              
              <p className="text-body text-primary-foreground/80 mb-6 leading-relaxed">
                Crafting cutting-edge software solutions with AI integration, 
                healthcare technology, and government platforms.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-primary-foreground/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-display-sm font-semibold mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5 }}
                        className="text-body text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-8 border-t border-primary-foreground/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body text-primary-foreground/60">
              © 2025 Yogineers Technologies. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-body text-primary-foreground/60 hover:text-accent transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-body text-primary-foreground/60 hover:text-accent transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-body text-primary-foreground/60 hover:text-accent transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};