// wild-animations.js
// Wild GSAP & ScrollTrigger Animations for Pixel Playgrounds Nashville
// Edited for visual impact on 2025-04-14 by Brent

// HERO SECTION: Neon text, parallax, and glow
window.addEventListener('DOMContentLoaded', () => {
  // Neon headline animation
  const heroHeadline = document.querySelector('.headline-glow');
  if (heroHeadline) {
    gsap.fromTo(heroHeadline, {
      opacity: 0,
      y: 80,
      filter: 'blur(10px) brightness(2)',
      textShadow: '0 0 40px #00f0ff, 0 0 80px #f000ff',
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px) brightness(1)',
      duration: 2,
      ease: 'power4.out',
      textShadow: '0 0 40px #00f0ff, 0 0 80px #f000ff, 0 0 120px #fff',
    });
    // Color cycling effect
    gsap.to(heroHeadline, {
      duration: 6,
      repeat: -1,
      yoyo: true,
      textShadow: '0 0 60px #f000ff, 0 0 120px #00f0ff, 0 0 200px #fff',
      color: '#f000ff',
      ease: 'sine.inOut',
    });
  }

  // Parallax background effect
  const hero = document.getElementById('hero-home');
  if (hero) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
  }

  // HERO overlay pulse
  const heroOverlay = document.querySelector('.hero-overlay');
  if (heroOverlay) {
    gsap.to(heroOverlay, {
      duration: 3,
      repeat: -1,
      yoyo: true,
      opacity: 0.7,
      background: 'linear-gradient(120deg, rgba(0,240,255,0.2), rgba(240,0,255,0.2))',
      ease: 'sine.inOut',
    });
  }

  // SCROLL-TRIGGERED SECTION ANIMATIONS
  gsap.utils.toArray('.section-padding').forEach((section, i) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 100,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'expo.out',
      delay: i * 0.1,
    });
  });

  // USP ICON BURST
  gsap.utils.toArray('.usp-icon').forEach((icon, i) => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: icon,
        start: 'top 85%',
      },
      scale: 0,
      rotate: 180,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(2)',
      delay: i * 0.1,
    });
    gsap.to(icon, {
      scrollTrigger: {
        trigger: icon,
        start: 'top 85%',
      },
      boxShadow: '0 0 40px 10px #00f0ff, 0 0 80px 20px #f000ff',
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: 'sine.inOut',
    });
  });

  // PORTFOLIO GRID: Card tilt and color shift on hover
  document.querySelectorAll('.portfolio-item-small').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = (x - xc) / xc;
      const dy = (y - yc) / yc;
      card.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) scale(1.05)`;
      card.style.boxShadow = `0 0 40px #00f0ff, 0 0 80px #f000ff`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // CUSTOM CURSOR: Glowing trailing dot
  let cursor = document.createElement('div');
  cursor.id = 'wild-cursor';
  document.body.appendChild(cursor);
  Object.assign(cursor.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, #00f0ff 0%, #f000ff 80%, transparent 100%)',
    boxShadow: '0 0 40px 10px #00f0ff, 0 0 80px 20px #f000ff',
    zIndex: 9999,
    mixBlendMode: 'screen',
    transition: 'background 0.2s',
  });
  window.addEventListener('mousemove', e => {
    gsap.to(cursor, { x: e.clientX - 12, y: e.clientY - 12, duration: 0.2, ease: 'power2.out' });
  });

  // Animate cursor pulse
  gsap.to(cursor, {
    scale: 1.4,
    repeat: -1,
    yoyo: true,
    duration: 0.7,
    ease: 'sine.inOut',
  });

  // HERO HEADLINE SCRAMBLE
  if (heroHeadline) {
    scrambleText(heroHeadline, heroHeadline.getAttribute('data-text') || heroHeadline.textContent, 1.5);
  }
});

// === WILD HERO SVG ANIMATIONS ===
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('wild-svg-bg');
if (svg) {
  // Remove the morphing blob for a cleaner look
  // Only keep animated lines for subtle effect
  // Animated gradient
  let grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', 'wild-gradient');
  grad.setAttribute('x1', '0%');
  grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%');
  grad.setAttribute('y2', '100%');
  let stop1 = document.createElementNS(svgNS, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#00f0ff');
  let stop2 = document.createElementNS(svgNS, 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#f000ff');
  grad.appendChild(stop1);
  grad.appendChild(stop2);
  let defs = document.createElementNS(svgNS, 'defs');
  defs.appendChild(grad);
  svg.appendChild(defs);
  // Animated lines only
  for (let i = 0; i < 3; i++) {
    let line = document.createElementNS(svgNS, 'polyline');
    line.setAttribute('stroke', '#fff');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('fill', 'none');
    line.setAttribute('opacity', '0.12');
    svg.appendChild(line);
    let pointsA = `0,${100 + i*40} 800,${120 + i*60}`;
    let pointsB = `0,${120 + i*60} 800,${100 + i*40}`;
    function animateLine() {
      line.setAttribute('points', pointsA);
      gsap.to(line, {
        duration: 5 + i*2,
        attr: { points: pointsB },
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    animateLine();
  }
  // Animate gradient stops
  gsap.to(stop1, { stopColor: '#f000ff', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to(stop2, { stopColor: '#00f0ff', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}

// === HERO PARTICLE SYSTEM ===
const particleContainer = document.getElementById('wild-particles');
if (particleContainer) {
  // Reduce particle count and opacity, especially on mobile
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 10 : 24;
  let particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let p = document.createElement('div');
    p.className = 'wild-particle';
    Object.assign(p.style, {
      position: 'absolute',
      width: `${6 + Math.random()*10}px`,
      height: `${6 + Math.random()*10}px`,
      borderRadius: '50%',
      background: `radial-gradient(circle, #00f0ff 0%, #f000ff 80%, transparent 100%)`,
      opacity: isMobile ? 0.12 + Math.random()*0.18 : 0.18 + Math.random()*0.22,
      left: `${Math.random()*100}%`,
      top: `${Math.random()*100}%`,
      filter: 'blur(1px)',
      pointerEvents: 'none',
      zIndex: 2,
      mixBlendMode: 'screen',
    });
    particleContainer.appendChild(p);
    particles.push(p);
    // Animate float
    gsap.to(p, {
      y: `+=${-20 + Math.random()*40}`,
      x: `+=${-20 + Math.random()*40}`,
      duration: 6 + Math.random()*6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random()*2
    });
  }
  // Mouse repulsion effect (disable on mobile)
  if (!isMobile) {
    window.addEventListener('mousemove', e => {
      const rect = particleContainer.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      particles.forEach(p => {
        const px = parseFloat(p.style.left) / 100 * rect.width;
        const py = parseFloat(p.style.top) / 100 * rect.height;
        const dx = mx - px;
        const dy = my - py;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 80) {
          gsap.to(p, { x: (dx/Math.abs(dx+0.1))*20, y: (dy/Math.abs(dy+0.1))*20, duration: 0.5, overwrite: 'auto' });
        } else {
          gsap.to(p, { x: 0, y: 0, duration: 1, overwrite: 'auto' });
        }
      });
    });
  }
}

// === HERO HEADLINE: TEXT SCRAMBLE + LETTER REVEAL ===
function scrambleText(element, text, duration = 1.2) {
  const chars = '!<>-_\/[]{}—=+*^?#________';
  let frame = 0;
  let scramble = '';
  let reveal = '';
  let interval = setInterval(() => {
    scramble = '';
    for (let i = 0; i < text.length; i++) {
      if (i < frame) {
        scramble += text[i];
      } else {
        scramble += chars[Math.floor(Math.random()*chars.length)];
      }
    }
    element.textContent = scramble;
    frame++;
    if (frame > text.length) {
      clearInterval(interval);
      // Letter-by-letter glow reveal
      let letters = text.split('');
      element.innerHTML = letters.map(l => `<span class="wild-letter">${l}</span>`).join('');
      gsap.fromTo(element.querySelectorAll('.wild-letter'),
        { opacity: 0, filter: 'blur(8px)', color: '#fff' },
        { opacity: 1, filter: 'blur(0px)', color: '#00f0ff', stagger: 0.03, duration: 0.7, ease: 'power2.out' }
      );
    }
  }, duration * 40 / text.length);
}

// === WAVE SECTION TRANSITIONS ===
gsap.utils.toArray('.wild-wave-svg').forEach((svg, i) => {
  // SVG wave morphing
  const wavePaths = [
    'M0,40 Q200,80 400,40 T800,40 V80 H0 Z',
    'M0,40 Q200,0 400,40 T800,40 V80 H0 Z',
    'M0,40 Q200,60 400,20 T800,40 V80 H0 Z',
  ];
  let wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  wave.setAttribute('fill', 'url(#wild-wave-gradient'+i+')');
  svg.appendChild(wave);

  // Animated gradient for wave
  let grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', 'wild-wave-gradient'+i);
  grad.setAttribute('x1', '0%');
  grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%');
  grad.setAttribute('y2', '100%');
  let stop1 = document.createElementNS(svgNS, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', '#00f0ff');
  let stop2 = document.createElementNS(svgNS, 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', '#f000ff');
  grad.appendChild(stop1);
  grad.appendChild(stop2);
  let defs = document.createElementNS(svgNS, 'defs');
  defs.appendChild(grad);
  svg.appendChild(defs);

  // Morphing animation
  let waveIndex = 0;
  function morphWave() {
    wave.setAttribute('d', wavePaths[waveIndex]);
    waveIndex = (waveIndex + 1) % wavePaths.length;
    gsap.to(wave, {
      duration: 5 + Math.random()*2,
      attr: { d: wavePaths[waveIndex] },
      ease: 'power1.inOut',
      onComplete: morphWave
    });
  }
  morphWave();
  // Animate gradient stops
  gsap.to(stop1, { stopColor: '#f000ff', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to(stop2, { stopColor: '#00f0ff', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
});

// === ANIMATED GRADIENT BORDERS & PULSE ===
function addWildStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    .cta-button, .cta-button-secondary {
      position: relative;
      z-index: 2;
      overflow: hidden;
      border: 3px solid transparent;
      background-clip: padding-box;
      border-radius: 2em;
      box-shadow: 0 0 32px 4px #00f0ff55, 0 0 64px 8px #f000ff33;
      transition: box-shadow 0.3s;
    }
    .cta-button::before, .cta-button-secondary::before {
      content: '';
      position: absolute;
      inset: -3px;
      z-index: -1;
      border-radius: 2em;
      background: linear-gradient(120deg, #00f0ff, #f000ff, #00f0ff 80%);
      background-size: 200% 200%;
      animation: wild-gradient-border 3s linear infinite;
      filter: blur(2px);
    }
    @keyframes wild-gradient-border {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .cta-button, .cta-button-secondary {
      animation: wild-cta-pulse 2.5s infinite alternate;
    }
    @keyframes wild-cta-pulse {
      0% { box-shadow: 0 0 32px 4px #00f0ff55, 0 0 64px 8px #f000ff33; }
      100% { box-shadow: 0 0 64px 16px #f000ff99, 0 0 128px 32px #00f0ff66; }
    }
    .site-footer {
      border-top: 6px solid transparent;
      position: relative;
      z-index: 1;
    }
    .site-footer::before {
      content: '';
      position: absolute;
      left: 0; right: 0; top: -6px; height: 6px;
      background: linear-gradient(90deg, #00f0ff, #f000ff, #00f0ff 80%);
      background-size: 200% 200%;
      animation: wild-footer-border 6s linear infinite;
      z-index: 2;
    }
    @keyframes wild-footer-border {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
}
addWildStyles();

// === FLOATING, SPINNING 3D SHAPES ===
const floatingShapes = document.getElementById('wild-floating-shapes');
if (floatingShapes) {
  const ICONS = [
    '<i class="fas fa-microchip"></i>',
    '<i class="fas fa-bolt"></i>',
    '<i class="fas fa-gamepad"></i>',
    '<i class="fas fa-headset"></i>',
    '<i class="fas fa-podcast"></i>',
    '<i class="fas fa-project-diagram"></i>',
    '<i class="fas fa-cogs"></i>',
    '<i class="fas fa-star"></i>',
    '<i class="fas fa-magic"></i>',
    '<i class="fas fa-lightbulb"></i>',
    '<i class="fas fa-cube"></i>',
    '<i class="fas fa-atom"></i>',
  ];
  const isMobile = window.innerWidth < 768;
  const SHAPE_COUNT = isMobile ? 4 : 8;
  for (let i = 0; i < SHAPE_COUNT; i++) {
    let el = document.createElement('div');
    el.className = 'wild-floating-shape';
    el.innerHTML = ICONS[i % ICONS.length];
    Object.assign(el.style, {
      position: 'fixed',
      left: `${Math.random()*100}%`,
      top: `${Math.random()*100}%`,
      fontSize: `${isMobile ? 18 + Math.random()*18 : 32 + Math.random()*32}px`,
      color: `hsl(${Math.random()*360},100%,70%)`,
      opacity: isMobile ? 0.08 + Math.random()*0.10 : 0.14 + Math.random()*0.18,
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 8px #00f0ff) drop-shadow(0 0 16px #f000ff) blur(0.5px)',
      transition: 'color 0.5s',
    });
    floatingShapes.appendChild(el);
    // Animate float, spin, and parallax
    gsap.to(el, {
      y: `+=${-30 + Math.random()*60}`,
      x: `+=${-30 + Math.random()*60}`,
      rotationY: 360,
      rotationX: 360,
      duration: 16 + Math.random()*8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: Math.random()*4
    });
    // Parallax on scroll
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      el.style.transform = `translateY(${Math.sin(scrollY/200 + i)*12}px) rotateY(${scrollY/7 + i*20}deg) rotateX(${scrollY/9 + i*10}deg)`;
    });
  }
}

// === ADVANCED TEXT EFFECTS ===
function wildGlitchText(element) {
  if (!element) return;
  let original = element.textContent;
  function glitch() {
    let glitched = original.split('').map(l => Math.random() < 0.08 ? String.fromCharCode(33 + Math.random()*94) : l).join('');
    element.textContent = glitched;
    setTimeout(() => { element.textContent = original; }, 80);
  }
  setInterval(glitch, 900 + Math.random()*600);
}
function wildTypewriterText(element) {
  if (!element) return;
  let text = element.getAttribute('data-text') || element.textContent;
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, 30 + Math.random()*40);
    }
  }
  type();
}
function wildColorCycleText(element) {
  if (!element) return;
  gsap.to(element, {
    color: '#00f0ff',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    onUpdate: function() {
      element.style.textShadow = `0 0 24px #f000ff, 0 0 48px #00f0ff`;
    }
  });
}
window.addEventListener('DOMContentLoaded', () => {
  // Glitch effect on all h2s
  document.querySelectorAll('h2').forEach(wildGlitchText);
  // Typewriter effect on all h3s
  document.querySelectorAll('h3').forEach(wildTypewriterText);
  // Color cycle on all h4s
  document.querySelectorAll('h4').forEach(wildColorCycleText);
});

// === SECTION-SPECIFIC WILD EFFECTS ===
// Portfolio cards: explode/scatter on hover
const portfolioCards = document.querySelectorAll('.portfolio-item-small');
portfolioCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.15,
      rotate: (Math.random()-0.5)*30,
      x: (Math.random()-0.5)*60,
      y: (Math.random()-0.5)*60,
      boxShadow: '0 0 80px 20px #f000ff, 0 0 120px 40px #00f0ff',
      duration: 0.4,
      ease: 'expo.out',
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      boxShadow: '',
      duration: 0.7,
      ease: 'expo.inOut',
    });
  });
});
// Guide cards: pulse and cycle colors
const guideCards = document.querySelectorAll('.guide-card');
guideCards.forEach(card => {
  gsap.to(card, {
    boxShadow: '0 0 32px 8px #00f0ff, 0 0 64px 16px #f000ff',
    background: 'linear-gradient(120deg, #00f0ff33, #f000ff33)',
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: Math.random()*2
  });
});
// Service cards: holographic shine sweep
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  let shine = document.createElement('div');
  shine.className = 'wild-holo-shine';
  Object.assign(shine.style, {
    position: 'absolute',
    top: 0,
    left: '-60%',
    width: '60%',
    height: '100%',
    background: 'linear-gradient(120deg, rgba(0,240,255,0.12) 0%, rgba(255,255,255,0.33) 50%, rgba(240,0,255,0.12) 100%)',
    filter: 'blur(8px)',
    pointerEvents: 'none',
    zIndex: 3,
    borderRadius: 'inherit',
    transition: 'none',
  });
  card.style.position = 'relative';
  card.appendChild(shine);
  function animateShine() {
    gsap.fromTo(shine, { left: '-60%' }, {
      left: '120%',
      duration: 2.5 + Math.random()*1.5,
      ease: 'power2.inOut',
      onComplete: animateShine,
      delay: Math.random()*2
    });
  }
  animateShine();
});
// Add style for .wild-holo-shine
(function(){
  const style = document.createElement('style');
  style.innerHTML = `.wild-holo-shine { pointer-events:none !important; }`;
  document.head.appendChild(style);
})(); 