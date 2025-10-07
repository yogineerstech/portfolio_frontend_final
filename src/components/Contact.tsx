// src/components/Contact.tsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm, ContactFormData } from '@/lib/api';
import DrawUnderlineButton from './AnimatedComponents/DrawUnderlineButton';
import { BackgroundBeams } from './ui/background-beams';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'admin@yogineers.in',
      description: 'Send us an email anytime!',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 72494 17317',
      description: 'Mon-Fri from 8am to 5pm',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Vasant Vihar, Thane',
      description: 'Come say hello at our office',
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
    )
      .fromTo(
        '.contact-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
  }, [isInView]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const contactData: ContactFormData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await submitContactForm(contactData);
      
      setIsSubmitted(true);
      setSubmitStatus({
        type: 'success',
        message: response.message || 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white dark:bg-background relative overflow-hidden"
    >
      {/* Background Beams */}
      <BackgroundBeams className="z-0" />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-20 right-10 w-80 h-80 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <DrawUnderlineButton onBack={true} marginTop="45px" width="90%" thickness={3} autoAnimate={true}>
            <h2
              ref={titleRef}
              className="text-display-lg mb-6 text-foreground"
            >
              Let's Build Something Amazing Together
            </h2>
          </DrawUnderlineButton>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4">
            Ready to transform your ideas into reality? Get in touch with our team of experts 
            and let's discuss how we can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="contact-card"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-display-sm mb-2 text-foreground">
                        {info.title}
                      </h3>
                      <p className="text-body font-medium text-foreground mb-1">
                        {info.content}
                      </p>
                      <p className="text-body text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-8 lg:p-10 shadow-xl border border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-body font-medium text-foreground mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-foreground"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-body font-medium text-foreground mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-foreground"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-body font-medium text-foreground mb-3">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-foreground"
                  placeholder="What's this about?"
                />
              </div>

              <div className="mb-8">
                <label className="block text-body font-medium text-foreground mb-3">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-foreground resize-none"
                  placeholder="Tell us about your project, timeline, and requirements..."
                />
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl border ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isSubmitted || isLoading}
                className="w-full btn-premium group flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10">Sending...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="relative z-10">Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};