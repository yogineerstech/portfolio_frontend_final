import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';

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
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const contactMethods = [
    { icon: MessageSquare, title: 'Live Chat', detail: 'Available 24/7', color: 'from-blue-600 to-blue-400' },
    { icon: Mail, title: 'Email Us', detail: 'support@yogineers.com', color: 'from-purple-600 to-purple-400' },
    { icon: Phone, title: 'Call Us', detail: '+1 (555) 123-4567', color: 'from-indigo-600 to-indigo-400' },
    { icon: MapPin, title: 'Visit Us', detail: 'Tech Hub, Innovation Street', color: 'from-violet-600 to-violet-400' }
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
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground p-4 sm:p-8 mt-[10vh]">
      <div className="relative border border-primary/30 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1
              ref={titleRef}
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Let's Connect
            </h1>
            <p className="text-muted-foreground text-xl">Transform your ideas into reality with us</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`contact-card p-4 rounded-xl bg-gradient-to-br ${method.color} bg-opacity-10 backdrop-blur-sm border border-primary/20`}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className="w-6 h-6 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{method.title}</h3>
                        <p className="text-sm text-muted-foreground">{method.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field) => (
                  <motion.div key={field} whileTap={{ scale: 0.995 }}>
                    <div className="relative">
                      <motion.input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-primary/10 border ${
                          focusedField === field ? 'border-primary' : 'border-primary/20'
                        } rounded-lg p-4 text-foreground placeholder-muted-foreground backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
                        placeholder={
                          field === 'subject' ? 'Subject' :
                            field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        required={field !== 'subject'}
                      />
                    </div>
                  </motion.div>
                ))}
                
                <motion.div whileTap={{ scale: 0.995 }}>
                  <div className="relative">
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-primary/10 border ${focusedField === 'message' ? 'border-primary' : 'border-primary/20'
                        } rounded-lg p-4 text-foreground placeholder-muted-foreground backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300`}
                      placeholder="Message"
                      rows={4}
                      required
                    />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center space-x-2 text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-5 h-5" />
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-green-400 text-sm"
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-red-400 text-sm"
                    >
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </div>
              </motion.form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-3xl" />
              <div className="relative h-full border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="h-full w-full rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.418226163045!2d72.9702449!3d19.220596399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b95d538156e1%3A0x187b9472a813728!2sK.K.%20Computer%20Academy!5e0!3m2!1sen!2sin!4v1746008228104!5m2!1sen!2sin"
                    className="w-full h-full min-h-[600px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};