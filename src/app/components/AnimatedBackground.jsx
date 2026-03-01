'use client';

import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Parallax layers
    let stars = {
      near: [],    // Fast moving stars
      medium: [],  // Medium speed stars
      far: []      // Slow moving stars
    };
    
    let nebulae = [];
    let galaxies = [];
    let comets = [];
    let planets = [];

    // Helper function for star colors
    const getStarColor = () => {
      const rand = Math.random();
      if (rand < 0.7) return '#ffffff'; // White
      if (rand < 0.9) return '#a5d8ff'; // Blue-white
      return '#ffd8a5'; // Yellow-white (less red for darker feel)
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create stars with parallax layers
      stars.near = [];
      stars.medium = [];
      stars.far = [];
      
      const starCount = Math.floor((canvas.width * canvas.height) / 1000); // Fewer stars for darker feel
      
      for (let i = 0; i < starCount; i++) {
        const layer = Math.random();
        const star = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2.5 + 0.3, // Smaller stars
          brightness: Math.random() * 0.6 + 0.2, // Dimmer stars
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: getStarColor(),
        };
        
        if (layer < 0.2) {
          stars.near.push({ ...star, speed: Math.random() * 0.5 + 0.2, radius: star.radius * 1.2 });
        } else if (layer < 0.6) {
          stars.medium.push({ ...star, speed: Math.random() * 0.2 + 0.1, radius: star.radius });
        } else {
          stars.far.push({ ...star, speed: Math.random() * 0.08 + 0.02, radius: star.radius * 0.6 });
        }
      }

      // Create nebulae (darker, more subtle)
      nebulae = [];
      const nebulaCount = 6; // Fewer nebulae
      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 350 + 250,
          hue: Math.random() * 40 + 200, // Blue to purple range
          saturation: 50 + Math.random() * 30, // Less saturation
          lightness: 30 + Math.random() * 20, // Darker
          opacity: Math.random() * 0.08 + 0.03, // Much lower opacity
          speedX: (Math.random() - 0.5) * 0.05,
          speedY: (Math.random() - 0.5) * 0.05,
          pulseSpeed: Math.random() * 0.008 + 0.002,
          pulsePhase: Math.random() * Math.PI * 2,
          distortion: Math.random() * 1.5 + 0.5,
        });
      }

      // Create galaxies (darker)
      galaxies = [];
      const galaxyCount = 1; // One main galaxy
      for (let i = 0; i < galaxyCount; i++) {
        galaxies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 180 + 120,
          arms: Math.floor(Math.random() * 3) + 3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.001,
          hue: Math.random() * 30 + 210,
          density: Math.random() * 0.4 + 0.2, // Less dense
        });
      }

      // Create comets (fewer, dimmer)
      comets = [];
      const cometCount = 2;
      for (let i = 0; i < cometCount; i++) {
        comets.push({
          active: false,
          x: 0,
          y: 0,
          speed: Math.random() * 4 + 3,
          angle: 0,
          tailLength: Math.random() * 40 + 20,
          hue: Math.random() * 30 + 200,
          timer: 0,
          interval: Math.random() * 300 + 200,
        });
      }

      // Create planets (darker, more subtle)
      planets = [];
      const planetCount = 3;
      for (let i = 0; i < planetCount; i++) {
        planets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 30 + 15,
          orbitRadius: Math.random() * 150 + 80,
          orbitSpeed: (Math.random() - 0.5) * 0.005,
          orbitAngle: Math.random() * Math.PI * 2,
          centerX: canvas.width / 2,
          centerY: canvas.height / 2,
          hue: Math.random() * 360,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          hasRing: Math.random() > 0.6,
          ringAngle: 0,
          atmosphere: Math.random() > 0.7,
        });
      }
    };

    // Draw nebula with distortion (darker)
    const drawNebula = (nebula) => {
      const pulse = 1 + Math.sin(time * nebula.pulseSpeed + nebula.pulsePhase) * 0.15;
      
      for (let i = 0; i < 2; i++) { // Fewer layers
        const distortedX = nebula.x + Math.sin(time + i) * 30;
        const distortedY = nebula.y + Math.cos(time + i) * 30;
        
        const gradient = ctx.createRadialGradient(
          distortedX, distortedY, 0,
          distortedX, distortedY, nebula.radius * pulse
        );
        
        gradient.addColorStop(0, `hsla(${nebula.hue}, ${nebula.saturation}%, ${nebula.lightness}%, ${nebula.opacity * pulse})`);
        gradient.addColorStop(0.5, `hsla(${nebula.hue - 20}, ${nebula.saturation}%, ${nebula.lightness - 10}%, ${nebula.opacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(distortedX, distortedY, nebula.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Draw spiral galaxy (darker)
    const drawGalaxy = (galaxy) => {
      galaxy.rotation += galaxy.rotationSpeed;
      
      for (let arm = 0; arm < galaxy.arms; arm++) {
        const armAngle = (arm / galaxy.arms) * Math.PI * 2 + galaxy.rotation;
        
        for (let i = 0; i < 40; i++) { // Fewer stars
          const distance = (i / 40) * galaxy.radius;
          const angle = armAngle + distance * 0.1;
          
          const x = galaxy.x + Math.cos(angle) * distance;
          const y = galaxy.y + Math.sin(angle) * distance * 0.7;
          
          const size = (1 - i / 40) * 3; // Smaller
          const opacity = (1 - i / 40) * galaxy.density * 0.7; // Dimmer
          
          if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            
            const hue = (galaxy.hue + i * 5 + time * 5) % 360;
            ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
            
            ctx.shadowColor = `hsla(${hue}, 70%, 60%, 0.3)`;
            ctx.shadowBlur = 8;
            
            ctx.fill();
          }
        }
      }
      
      // Galaxy core (darker)
      const coreGradient = ctx.createRadialGradient(
        galaxy.x, galaxy.y, 0,
        galaxy.x, galaxy.y, 40
      );
      coreGradient.addColorStop(0, `hsla(${galaxy.hue}, 80%, 60%, 0.5)`);
      coreGradient.addColorStop(0.7, `hsla(${galaxy.hue}, 80%, 40%, 0.2)`);
      coreGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(galaxy.x, galaxy.y, 40, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.shadowBlur = 0;
    };

    // Draw comet (dimmer)
    const drawComet = (comet) => {
      if (!comet.active) return;
      
      // Move comet
      comet.x += Math.cos(comet.angle) * comet.speed;
      comet.y += Math.sin(comet.angle) * comet.speed;
      
      // Draw comet head
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${comet.hue}, 80%, 70%, 0.8)`;
      ctx.shadowColor = `hsla(${comet.hue}, 80%, 70%, 0.5)`;
      ctx.shadowBlur = 15;
      ctx.fill();
      
      // Draw tail
      for (let i = 1; i <= 15; i++) {
        const tailX = comet.x - Math.cos(comet.angle) * i * 4;
        const tailY = comet.y - Math.sin(comet.angle) * i * 4;
        const size = 3 * (1 - i / 15);
        const opacity = 0.3 * (1 - i / 15);
        
        ctx.beginPath();
        ctx.arc(tailX, tailY, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${comet.hue}, 70%, 60%, ${opacity})`;
        ctx.fill();
      }
      
      // Deactivate if off screen
      if (comet.x < -100 || comet.x > canvas.width + 100 || 
          comet.y < -100 || comet.y > canvas.height + 100) {
        comet.active = false;
        comet.timer = 0;
      }
      
      ctx.shadowBlur = 0;
    };

    // Draw planet with atmosphere (darker)
    const drawPlanet = (planet) => {
      // Orbital movement
      planet.orbitAngle += planet.orbitSpeed;
      planet.x = planet.centerX + Math.cos(planet.orbitAngle) * planet.orbitRadius;
      planet.y = planet.centerY + Math.sin(planet.orbitAngle) * planet.orbitRadius * 0.5;
      planet.rotation += planet.rotationSpeed;
      planet.ringAngle += 0.005;

      ctx.save();
      ctx.translate(planet.x, planet.y);
      ctx.rotate(planet.rotation);

      // Atmosphere glow (dimmer)
      if (planet.atmosphere) {
        const atmosGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, planet.radius * 1.2);
        atmosGradient.addColorStop(0, `hsla(${planet.hue}, 70%, 50%, 0.1)`);
        atmosGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = atmosGradient;
        ctx.beginPath();
        ctx.arc(0, 0, planet.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Planet shadow (subtle)
      ctx.shadowColor = `hsla(${planet.hue}, 70%, 40%, 0.3)`;
      ctx.shadowBlur = 20;

      // Planet body with texture (darker)
      const gradient = ctx.createRadialGradient(
        -planet.radius * 0.3, -planet.radius * 0.3, 0,
        0, 0, planet.radius
      );
      
      for (let i = 0; i <= 4; i++) {
        const pos = i / 4;
        gradient.addColorStop(pos, `hsla(${planet.hue + i * 8}, 70%, ${50 - i * 8}%, ${0.9 - i * 0.1})`);
      }

      ctx.beginPath();
      ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Planet rings (dimmer)
      if (planet.hasRing) {
        ctx.rotate(planet.ringAngle);
        
        // Main ring
        ctx.beginPath();
        ctx.ellipse(0, 0, planet.radius * 1.6, planet.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${planet.hue + 30}, 60%, 60%, 0.4)`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Ring particles
        for (let i = 0; i < 20; i++) {
          const ringAngle = (i / 20) * Math.PI * 2;
          const ringX = Math.cos(ringAngle) * planet.radius * 1.5;
          const ringY = Math.sin(ringAngle) * planet.radius * 0.3;
          
          ctx.beginPath();
          ctx.arc(ringX, ringY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${planet.hue + 30}, 60%, 70%, 0.2)`;
          ctx.fill();
        }
      }

      // Highlight (subtle)
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(-planet.radius * 0.2, -planet.radius * 0.2, planet.radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      time += 0.005;
      
      // MUCH darker background - pure black with slight dark blue tint
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#000000');
      bgGradient.addColorStop(0.3, '#03000a');
      bgGradient.addColorStop(0.7, '#050010');
      bgGradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nebulae (very subtle)
      nebulae.forEach(nebula => {
        nebula.x += nebula.speedX;
        nebula.y += nebula.speedY;
        
        if (nebula.x < -500) nebula.x = canvas.width + 500;
        if (nebula.x > canvas.width + 500) nebula.x = -500;
        if (nebula.y < -500) nebula.y = canvas.height + 500;
        if (nebula.y > canvas.height + 500) nebula.y = -500;
        
        drawNebula(nebula);
      });

      // Draw galaxies
      galaxies.forEach(galaxy => drawGalaxy(galaxy));

      // Draw planets
      planets.forEach(planet => drawPlanet(planet));

      // Draw stars with parallax (dimmer)
      Object.entries(stars).forEach(([layer, starArray]) => {
        starArray.forEach(star => {
          // Move stars based on layer speed
          if (layer === 'near') {
            star.x -= star.speed * 1.5;
          } else if (layer === 'medium') {
            star.x -= star.speed;
          } else {
            star.x -= star.speed * 0.3;
          }
          
          // Reset stars that go off screen
          if (star.x < -10) {
            star.x = canvas.width + 10;
            star.y = Math.random() * canvas.height;
          }
          
          // Twinkling (subtle)
          const twinkle = 0.5 + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3;
          const brightness = star.brightness * twinkle * 0.8; // Dimmer overall
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          
          // Glow for brighter stars (subtle)
          if (star.radius > 1.5) {
            ctx.shadowColor = star.color;
            ctx.shadowBlur = 8 * brightness;
          }
          
          ctx.fillStyle = star.color;
          ctx.globalAlpha = brightness;
          ctx.fill();
          
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        });
      });

      // Manage comets
      comets.forEach(comet => {
        comet.timer++;
        
        if (!comet.active && comet.timer > comet.interval) {
          comet.active = true;
          comet.x = Math.random() * canvas.width;
          comet.y = -50;
          comet.angle = Math.random() * 0.5 + 0.2;
          comet.timer = 0;
        }
        
        drawComet(comet);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};