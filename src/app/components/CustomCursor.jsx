'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor = () => {
  // All hooks must be called at the top level, unconditionally
  const [isVisible, setIsVisible] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Separate spring for inner dot for smoother follow
  const innerX = useSpring(cursorX, { damping: 40, stiffness: 500 });
  const innerY = useSpring(cursorY, { damping: 40, stiffness: 500 });

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Main cursor effects - only run if not mobile
  useEffect(() => {
    // Don't set up cursor effects on mobile
    if (isMobile) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHover = () => setIsLink(true);
    const handleLinkLeave = () => setIsLink(false);
    
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile, cursorX, cursorY]); // Added dependencies

  // Don't render on mobile
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          pointerEvents: 'none',
          zIndex: 999999,
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isLink ? 1.8 : 1,
            opacity: isLink ? 0.8 : 0.4,
            borderColor: isLink ? '#8b5cf6' : '#3b82f6',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid #3b82f6',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          }}
        />
      </motion.div>
      
      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 999999,
          x: innerX,
          y: innerY,
        }}
      >
        <motion.div
          animate={{
            scale: clicked ? 1.5 : 1,
            backgroundColor: isLink ? '#8b5cf6' : '#3b82f6',
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            boxShadow: '0 0 20px #3b82f6',
          }}
        />
      </motion.div>

      {/* Click effect */}
      {clicked && (
        <motion.div
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            left: cursorX.get() + 8,
            top: cursorY.get() + 8,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 999998,
          }}
        />
      )}

      {/* Cursor text on links */}
      {isLink && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          style={{
            position: 'fixed',
            top: cursorYSpring.get() + 30,
            left: cursorXSpring.get() + 30,
            pointerEvents: 'none',
            zIndex: 999999,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(5px)',
          }}
        >
          ✨ Click me
        </motion.div>
      )}
    </>
  );
};