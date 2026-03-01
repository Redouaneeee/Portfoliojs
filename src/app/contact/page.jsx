'use client';

import { motion } from 'motion/react';
import { FadeUp, SlideIn } from '@/app/components/motion-wrapper';
import { MagneticButton } from '@/app/components/MagneticButton';
import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle');
  const containerRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
   
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:hello@devportfolio.com', color: '#3b82f6' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/Redouaneeee', color: '#ffffff' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/username', color: '#0a66c2' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/username', color: '#1da1f2' },
  ];

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: 'ALGERIA , ALGIERS' },
    { icon: Mail, label: 'Email', value: 'mohamedredouanetali@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+213 555 123 4567' },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
  ];

  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => particles.forEach(p => p.remove());
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
     
      <div className={styles.backgroundOrb} />
      <div className={styles.backgroundOrb2} />

      <div className={styles.headerSection}>
        <FadeUp>
          <h1 className={styles.title}>
            <span className="text-gradient">Get in Touch</span>
            <div className={styles.titleGlow} />
          </h1>
          <p className={styles.subtitle}>
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </FadeUp>
      </div>

      <div className={styles.grid}>
      
        <SlideIn direction="left">
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Let's Connect</h2>
            
            
            <div className={styles.contactDetails}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.contactItem}
                >
                  <div className={styles.iconWrapper}>
                    <info.icon className={styles.icon} />
                  </div>
                  <div className={styles.contactText}>
                    <p className={styles.contactLabel}>{info.label}</p>
                    <p className={styles.contactValue}>{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          
            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Follow me</h3>
              <div className={styles.socialGrid}>
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.socialLink}
                  >
                    <link.icon className={styles.socialIcon} style={{ color: link.color }} />
                  </motion.a>
                ))}
              </div>
            </div>

            
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className={styles.availabilityBadge}
            >
              <div className={styles.availabilityContent}>
                <div className={styles.statusDot} />
                <div className={styles.availabilityText}>
                  <p className={styles.availabilityTitle}>Available for work</p>
                  <p className={styles.availabilitySubtext}>Freelance & Full-time</p>
                </div>
                <Sparkles size={20} style={{ color: '#22c55e', opacity: 0.5 }} />
              </div>
            </motion.div>
          </div>
        </SlideIn>

        
        <SlideIn direction="right">
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send a Message</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Your Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Your Email</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Subject</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Project Inquiry"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Message</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={styles.textarea}
                  placeholder="Tell me about your project..."
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={formStatus !== 'idle'}
                className={styles.submitButton}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <div className={styles.spinner} />
                    Sending...
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <Send className={styles.buttonIcon} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className={styles.buttonIcon} />
                    Send Message
                  </>
                )}
              </MagneticButton>
            </form>

            
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.successMessage}
              >
                <p>✨ Thank you! I'll get back to you soon.</p>
              </motion.div>
            )}
          </div>
        </SlideIn>
      </div>

      
    </div>
  );
}