'use client';

import { motion, AnimatePresence } from 'motion/react';
import { FadeUp, SlideIn } from '@/app/components/motion-wrapper';
import { useState, useRef, useEffect } from 'react';
import { Github, ExternalLink, Filter, Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';
import styles from './Projects.module.css';
import Image from 'next/image';

const projects = [
  {
    title: 'Redo Coffee',
    description: 'A premium coffee experience website with stunning visuals and smooth animations',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    tags: ['React', 'Animations', 'E-commerce'],
    category: 'Creative',
    github: 'https://github.com/yourusername/redo-coffee',
    live: 'https://bigredos.netlify.app',
    featured: true,
    color: '#3b82f6'
  },
  {
    title: 'Redo Opticien',
    description: 'Modern optician website with interactive product showcase and booking system',
    image: '/redoopticien.png',
    tags: ['Next.js', 'Booking', 'Responsive'],
    category: 'Business',
    github: 'https://github.com/yourusername/redo-opticien',
    live: 'https://redoopticien.netlify.app',
    featured: true,
    color: '#8b5cf6'
  },
  {
    title: 'Redo Shop',
    description: 'Full-featured e-commerce platform with cart, payments, and product management',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
    tags: ['E-commerce', 'Stripe', 'Full Stack'],
    category: 'Full Stack',
    github: 'https://github.com/yourusername/redo-shop',
    live: 'https://redoshop.netlify.app',
    featured: true,
    color: '#ec4899'
  },
  {
    title: 'AI Dashboard',
    description: 'Real-time analytics dashboard with machine learning insights and predictive modeling',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    tags: ['Next.js', 'TensorFlow', 'D3.js'],
    category: 'AI/ML',
    github: '#',
    live: '#',
    featured: false,
    color: '#3b82f6'
  },
  {
    title: '3D Portfolio',
    description: 'Immersive 3D portfolio experience using WebGL and Three.js',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop',
    tags: ['Three.js', 'React', 'WebGL'],
    category: 'Creative',
    github: '#',
    live: '#',
    featured: false,
    color: '#8b5cf6'
  },
  {
    title: 'Weather Visualization',
    description: 'Interactive weather maps with animated data visualization',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&auto=format&fit=crop',
    tags: ['D3.js', 'Mapbox', 'APIs'],
    category: 'Data Viz',
    github: '#',
    live: '#',
    featured: false,
    color: '#ec4899'
  }
];

const categories = ['All', 'AI/ML', 'Creative', 'Full Stack', 'Business', 'Data Viz'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  const handleCardClick = (liveUrl) => {
    if (liveUrl && liveUrl !== '#') {
      window.open(liveUrl, '_blank', 'noopener noreferrer');
    }
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation(); // Prevent card click when clicking on links
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  // Generate decorative dots
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots = [];
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.className = styles.decorativeDot;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animation = `floatDot ${Math.random() * 10 + 10}s linear infinite`;
      dot.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(dot);
      dots.push(dot);
    }

    return () => dots.forEach(dot => dot.remove());
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Animated background elements */}
      <div className={styles.backgroundOrb} />
      <div className={styles.backgroundOrb2} />

      {/* Header */}
      <div className={styles.headerSection}>
        <FadeUp>
          <h1 className={styles.title}>
            <span className="text-gradient">My Projects</span>
            <div className={styles.titleGlow} />
          </h1>
          <p className={styles.subtitle}>
            A collection of my best work, showcasing creativity, technical expertise, 
            and attention to detail.
          </p>
        </FadeUp>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        {/* Desktop Filters */}
        <div className={styles.desktopFilters}>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.filterButton} ${
                selectedCategory === category ? styles.filterButtonActive : ''
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Mobile Filter */}
        <div className={styles.mobileFilterContainer}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={styles.mobileFilterButton}
          >
            <span>{selectedCategory}</span>
            <Filter className={`${styles.mobileFilterIcon} ${isFilterOpen ? 'rotate-90' : ''}`} size={18} />
          </motion.button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.mobileFilterMenu}
              >
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`${styles.mobileFilterOption} ${
                      selectedCategory === category ? styles.mobileFilterOptionActive : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <SlideIn key={project.title} direction="up" delay={index * 0.1}>
            <motion.div
              className={styles.projectCard}
              onClick={() => handleCardClick(project.live)}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{ cursor: 'pointer' }}
            >
              {/* Image Container */}
              <div className={styles.imageContainer}>
                <div 
                  className={styles.projectImage}
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                  }}
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.viewProjectText}>
                    <Eye size={16} />
                    View Live Site
                  </span>
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    initial={{ x: 100, rotate: 45 }}
                    animate={{ x: 0, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={styles.featuredBadge}
                  >
                    <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Featured
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <span className={styles.projectCategory}>{project.category}</span>
                </div>
                
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className={styles.tagsContainer}>
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className={styles.tagMore}>
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Links */}
                <div className={styles.linksContainer}>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleLinkClick(e, project.github)}
                    className={styles.projectLink}
                    aria-label="View GitHub repository"
                  >
                    <Github size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleLinkClick(e, project.live)}
                    className={styles.projectLink}
                    aria-label="View live site"
                  >
                    <ExternalLink size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className={styles.hoverOverlay} />
            </motion.div>
          </SlideIn>
        ))}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.emptyState}
          >
            <p className={styles.emptyStateText}>No projects found in this category</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className={styles.emptyStateButton}
            >
              View All Projects
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}