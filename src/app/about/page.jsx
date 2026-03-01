'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { FadeUp, SlideIn, ScaleIn } from '@/app/components/motion-wrapper';
import { useRef, useEffect } from 'react';
import { Code2, Palette, Zap, Target, Heart, Coffee, Sparkles } from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const skills = [
    { name: 'Frontend Development', level: 95, icon: Code2, color: '#3b82f6' },
    { name: 'Backend Architecture', level: 85, icon: Target, color: '#8b5cf6' },
    { name: 'UI/UX Design', level: 80, icon: Palette, color: '#ec4899' },
    { name: 'Performance Optimization', level: 90, icon: Zap, color: '#f59e0b' },
  ];

  const values = [
    { 
      icon: Heart, 
      title: 'Passion', 
      desc: 'Obsessed with creating beautiful experiences that users love',
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Coffee, 
      title: 'Dedication', 
      desc: 'Going the extra mile for perfection, one cup at a time',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      icon: Zap, 
      title: 'Innovation', 
      desc: 'Always learning and pushing the boundaries of what\'s possible',
      gradient: 'from-blue-500 to-cyan-500'
    },
  ];

  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      });
    }
   
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
     
      <div className={styles.backgroundOrb} />
      <div className={styles.backgroundOrb2} />
      <div className={styles.decorativeLine} />
      <div className={styles.decorativeLine2} />

    
      <div className={styles.heroSection}>
        <ScaleIn>
          <motion.div 
            className={styles.avatarContainer}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.avatarGlow} />
            <motion.div
              style={{ scale, rotate }}
              className={styles.avatarWrapper}
            >
              <span className={styles.avatarText}>✨</span>
            </motion.div>
            <div className={styles.avatarRing} />
          </motion.div>
        </ScaleIn>

        <FadeUp>
          <motion.h1 
            className={styles.title}
            style={{ y }}
          >
            <span className="text-gradient">About Me</span>
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            I'm a creative developer with a passion for building immersive digital experiences 
            that blend beautiful design with cutting-edge technology.
          </motion.p>
        </FadeUp>
      </div>

      <div className={styles.bioSection}>
        <SlideIn direction="left">
          <div className={styles.bioContent}>
            <h2 className={styles.bioTitle}>Who am I?</h2>
            <p className={styles.bioText}>
              With over <span className={styles.highlight}>5 years of experience</span> in web development, 
              I've worked with startups and established companies to create solutions that users love. 
              My approach combines technical expertise with creative problem-solving.
            </p>
            <p className={styles.bioText}>
              I believe in writing clean, maintainable code that doesn't compromise on performance 
              or user experience. When I'm not coding, you'll find me exploring new technologies, 
              contributing to open source, or sharing knowledge with the dev community.
            </p>
            
           
            <motion.div 
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {['Creative', 'Analytical', 'Dedicated'].map((trait, i) => (
                <motion.div
                  key={trait}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-4 py-2 bg-white/5 rounded-full border border-white/10"
                >
                  <span className="text-sm text-white/70">{trait}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SlideIn>

        <SlideIn direction="right">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={styles.factsCard}
          >
            <h3 className={styles.factsTitle}>Quick Facts</h3>
            <div className={styles.factsList}>
              {[
                { label: '📍 Location', value: 'ALGERIA , ALGIERS' },
                { label: '💼 Experience', value: '5+ Years' },
                { label: '⚡ Favorite Stack', value: 'Next.js + Motion' },
                { label: '🌍 Work Style', value: 'Remote First' },
                { label: '🎯 Focus', value: 'Web Animation' },
                { label: '🌟 Status', value: 'Available' },
              ].map((fact, index) => (
                <motion.div
                  key={fact.label}
                  className={styles.factItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SlideIn>
      </div>

     
      <div className={styles.skillsSection}>
        <FadeUp>
          <h2 className={styles.sectionTitle}>
            <span>Skills & Expertise</span>
          </h2>
        </FadeUp>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <SlideIn key={skill.name} direction="up" delay={index * 0.1}>
              <motion.div
                className={styles.skillItem}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.skillHeader}>
                  <div className={styles.skillName}>
                    <skill.icon 
                      className={styles.skillIcon}
                      style={{ color: skill.color }}
                    />
                    <span>{skill.name}</span>
                  </div>
                  <motion.span 
                    className={styles.skillPercentage}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className={styles.skillBar}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className={styles.skillProgress}
                    style={{ background: `linear-gradient(90deg, ${skill.color}, #8b5cf6)` }}
                  />
                </div>
              </motion.div>
            </SlideIn>
          ))}
        </div>
      </div>

      <div className={styles.valuesSection}>
        <FadeUp>
          <h2 className={styles.sectionTitle}>
            <span>What Drives Me</span>
          </h2>
        </FadeUp>

        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <SlideIn key={value.title} direction="up" delay={index * 0.2}>
              <motion.div
                className={styles.valueCard}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 400 }
                }}
              >
                <div className={styles.valueIconWrapper}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className={styles.valueIcon} />
                  </motion.div>
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.desc}</p>
                
               
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="absolute bottom-4 right-4"
                >
                  <Sparkles size={16} className="text-blue-400/30" />
                </motion.div>
              </motion.div>
            </SlideIn>
          ))}
        </div>
      </div>

     
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-20"
      >
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium group"
        >
          <span>Let's Work Together</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </div>
  );
}