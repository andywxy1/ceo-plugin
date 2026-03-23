/* ============================================================
   CEO Plugin Landing Page — Animations & Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Respect reduced motion ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     PARTICLE GRID BACKGROUND
     ========================================================== */
  function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles, cols, rows;
    const SPACING = 60;
    const DOT_RADIUS = 1;
    const CONNECTION_DIST = 100;
    let mouse = { x: -9999, y: -9999 };
    let raf;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / SPACING);
      rows = Math.ceil(height / SPACING);
      buildGrid();
    }

    function buildGrid() {
      particles = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          particles.push({
            x: c * SPACING + SPACING / 2,
            y: r * SPACING + SPACING / 2,
            baseX: c * SPACING + SPACING / 2,
            baseY: r * SPACING + SPACING / 2,
            vx: 0,
            vy: 0,
          });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Subtle attraction towards mouse
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += dx * force * 0.002;
          p.vy += dy * force * 0.002;
        }

        // Spring back to base
        p.vx += (p.baseX - p.x) * 0.02;
        p.vy += (p.baseY - p.y) * 0.02;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        // Opacity based on distance to mouse
        const proximity = Math.max(0, 1 - dist / 300);
        const alpha = 0.12 + proximity * 0.35;

        ctx.beginPath();
        ctx.arc(p.x, p.y, DOT_RADIUS + proximity * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.fill();

        // Connections to neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONNECTION_DIST) {
            const lineAlpha = (1 - d / CONNECTION_DIST) * 0.08 * (1 + proximity);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    // Throttled mouse tracking
    let mouseThrottle = false;
    document.addEventListener('mousemove', function (e) {
      if (mouseThrottle) return;
      mouseThrottle = true;
      requestAnimationFrame(function () {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouseThrottle = false;
      });
    });

    document.addEventListener('mouseleave', function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      resize();
      draw();
    });

    resize();
    draw();
  }

  /* ==========================================================
     GSAP ANIMATIONS
     ========================================================== */
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReduced) {
      // Just show everything immediately
      gsap.set('.hero-logo, .hero-title, .hero-subtitle, .hero-counters, .hero-ctas', {
        opacity: 1,
      });
      return;
    }

    /* --- Hero staggered entrance --- */
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .to('.hero-logo', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
      })
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(
        '.hero-counters',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        '.hero-ctas',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

    // Set initial state for logo (it starts with opacity: 0 in CSS)
    gsap.set('.hero-logo', { y: 20 });

    /* --- Feature cards --- */
    gsap.utils.toArray('.feature-card').forEach(function (card, i) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    /* --- Protocol timeline line fill --- */
    var protocolLine = document.querySelector('.protocol-line-fill');
    if (protocolLine) {
      gsap.to(protocolLine, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.protocol-timeline',
          start: 'top 75%',
          once: true,
        },
      });

      // On mobile the line is vertical
      if (window.innerWidth <= 768) {
        gsap.to(protocolLine, {
          height: '100%',
          width: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.protocol-timeline',
            start: 'top 75%',
            once: true,
          },
        });
      }
    }

    /* --- Protocol phases --- */
    gsap.utils.toArray('.protocol-phase').forEach(function (phase, i) {
      gsap.fromTo(
        phase,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3 + i * 0.15,
          scrollTrigger: {
            trigger: '.protocol-timeline',
            start: 'top 75%',
            once: true,
          },
        }
      );
    });

    /* --- Domain cards --- */
    gsap.utils.toArray('.domain-card').forEach(function (card, i) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.05,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    /* --- NEXUS timeline --- */
    var nexusLine = document.querySelector('.nexus-line-fill');
    if (nexusLine) {
      gsap.to(nexusLine, {
        height: '100%',
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.nexus-timeline',
          start: 'top 70%',
          once: true,
        },
      });
    }

    gsap.utils.toArray('.nexus-phase').forEach(function (phase, i) {
      gsap.fromTo(
        phase,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2 + i * 0.12,
          scrollTrigger: {
            trigger: '.nexus-timeline',
            start: 'top 70%',
            once: true,
          },
        }
      );
    });

    /* --- Installation steps --- */
    gsap.utils.toArray('.install-step').forEach(function (step, i) {
      gsap.fromTo(
        step,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    var installFooter = document.querySelector('.install-footer');
    if (installFooter) {
      gsap.fromTo(
        installFooter,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: installFooter,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }

  /* ==========================================================
     COUNT-UP ANIMATION
     ========================================================== */
  function initCounters() {
    var counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    var hasRun = false;

    function animateCounters() {
      if (hasRun) return;
      hasRun = true;

      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = prefersReduced ? 0 : 1800;
        var start = performance.now();

        function update(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target;
          }
        }

        if (duration === 0) {
          el.textContent = target;
        } else {
          requestAnimationFrame(update);
        }
      });
    }

    // Use IntersectionObserver for counter trigger
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounters();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(document.querySelector('.hero-counters'));
    } else {
      animateCounters();
    }
  }

  /* ==========================================================
     COPY TO CLIPBOARD
     ========================================================== */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        if (!text) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopied(btn);
          });
        } else {
          // Fallback
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showCopied(btn);
        }
      });
    });

    function showCopied(btn) {
      btn.classList.add('copied');
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';

      setTimeout(function () {
        btn.classList.remove('copied');
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
      }, 2000);
    }
  }

  /* ==========================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ==========================================================
     INIT
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initAnimations();
    initCounters();
    initCopyButtons();
    initSmoothScroll();
  });
})();
