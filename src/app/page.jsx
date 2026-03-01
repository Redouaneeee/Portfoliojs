'use client';

import { motion } from 'motion/react';
import { FadeUp, SlideIn } from '@/app/components/motion-wrapper';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from '@/app/components/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('idle');

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
    'Responsive Web Design',
    'Visual Development',
    'Interactive Animations'
  ];

  return (
    <div className={styles.container}>

      <div className={styles.floatingShape} />
      <div className={styles.floatingShape2} />

     
      <section className={styles.hero}>
        <div className={styles.heroContent}>
         
          <div className={styles.leftColumn}>
            <FadeUp>
              <p className={styles.greeting}>👋 Hello, I'm REDOUANE</p>
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
                a <span>Product Designer</span> and <span>Visual Developer</span> in SF.
                <br />
                I specialize in UI/UX Design, Responsive Web Design,
                and Visual Development.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className={styles.specialties}>
                {specialties.map((specialty, index) => (
                  <motion.span
                    key={specialty}
                    className={styles.specialtyTag}
                    whileHover={{ y: -2, scale: 1.05 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {specialty}
                  </motion.span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className={styles.emailContainer}>
                <p className={styles.emailLabel}>📧 Connect With Me</p>
                <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.emailInput}
                  />
                  <motion.button
                    type="submit"
                    className={styles.emailButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={emailStatus === 'submitting'}
                  >
                    {emailStatus === 'submitting' ? 'Sending...' : 
                     emailStatus === 'success' ? '✓ Sent!' : 
                     'Connect With Me'}
                  </motion.button>
                </form>
              </div>
            </FadeUp>
          </div>

         
          <SlideIn direction="right" delay={0.2}>
            <div className={styles.rightColumn}>
              <div className={styles.photoContainer}>
                <div className={styles.photoGlow} />
                <Image
                  src="/myimage.jpg" 
                  alt="Profile"
                  width={500}
                  height={500}
                  className={styles.photo}
                  priority
                />
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center pb-8"
      >
        <Link href="/projects">
          <motion.span
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            View my work
            <ArrowRight size={14} />
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}