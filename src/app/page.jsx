'use client';

import { motion } from 'motion/react';
import { FadeUp, SlideIn } from '@/app/components/motion-wrapper';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from '@/app/components/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('idle');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailStatus('submitting');
    setTimeout(() => {
      setEmailStatus('success');
      setEmail('');
      setTimeout(() => setEmailStatus('idle'), 3000);
    }, 1000);
  };

  const specialties = [
    'UI/UX Design',
    'Responsive Web',
    'Visual Dev',
    'Animations'
  ];

  return (
    <div className={styles.container}>
      {/* Animated background elements */}
      <div className={styles.floatingShape} />
      <div className={styles.floatingShape2} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Right Column - Photo (shows first on mobile) */}
          <SlideIn direction={isMobile ? 'up' : 'right'} delay={0.2}>
            <div className={styles.rightColumn}>
              <div className={styles.photoContainer}>
                <div className={styles.photoGlow} />
                <Image
                  src="/myimage.jpg" // Replace with your photo
                  alt="Profile"
                  width={500}
                  height={500}
                  className={styles.photo}
                  priority
                />
              </div>
            </div>
          </SlideIn>

          {/* Left Column - Text */}
          <div className={styles.leftColumn}>
            <FadeUp>
              <p className={styles.greeting}>✨ Hello, I'm</p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className={styles.title}>
                <span className={styles.titleLine}>Building digital</span>
                <span className={styles.titleLine}>products, brands</span>
                <span className={styles.titleLine}>
                  <span className={styles.highlight}>experience.</span>
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className={styles.bio}>
                a <span>Product Designer</span> and <span>Visual Developer</span>
                <br />
                specializing in UI/UX, responsive design, and animations.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className={styles.specialties}>
                {specialties.map((specialty, index) => (
                  <motion.span
                    key={specialty}
                    className={styles.specialtyTag}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {specialty}
                  </motion.span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className={styles.emailContainer}>
                <p className={styles.emailLabel}>📬 Let's connect</p>
                <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.emailInput}
                  />
                  <motion.button
                    type="submit"
                    className={styles.emailButton}
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={emailStatus === 'submitting'}
                  >
                    {emailStatus === 'submitting' ? '...' : 
                     emailStatus === 'success' ? '✓' : 
                     'Connect'}
                  </motion.button>
                </form>
              </div>
            </FadeUp>

            <FadeUp delay={0.5}>
              <Link href="/projects">
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mt-6 text-sm"
                >
                  <span>View my work</span>
                  <ArrowRight size={14} />
                </motion.div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
}