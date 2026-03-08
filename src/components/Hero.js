'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// ANIMATION PLAN:
// 1. Dark charcoal overlay (#1c1f18) covers the full Hero on mount
//    and fades out over 1.2s — like morning light filling a room.
// 2. At 0.6s mid-fade, a canvas confetti burst fires from center:
//    thin rectangles + circles in sage, gold, and pale sage.
//    All particles gravity-fall and fade out by ~1.4s total.
// ─────────────────────────────────────────────────────────────

// ── Confetti particle factory ──────────────────────────────────
function createParticle(canvas) {
  const colors = ['#6d9040', '#c5b358', '#c5d4a8', '#a8c070', '#d4b84a'];
  const isRect = Math.random() > 0.4; // 60% rectangles, 40% circles

  return {
    x: canvas.width / 2 + (Math.random() - 0.5) * 80,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 22,        // wider horizontal spread
    vy: (Math.random() - 1.4) * 18,         // stronger upward launch
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: 1,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.25,
    width: isRect ? Math.random() * 16 + 8 : 0,   // rectangles 8–24px wide
    height: isRect ? Math.random() * 6 + 3 : 0,   // rectangles 3–9px tall
    radius: isRect ? 0 : Math.random() * 7 + 3,   // circles 3–10px
    isRect,
  };
}

// ── Canvas confetti component ──────────────────────────────────
function ConfettiCanvas({ fire }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    if (!fire) return;

    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // Spawn 260 particles in one burst — bigger, fuller explosion
    const particles = Array.from({ length: 260 }, () => createParticle(canvas));
    const gravity   = 0.45;
    const startTime = performance.now();
    const duration  = 1400; // ms — all done before 1.5s

    function draw(now) {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Physics
        p.vy       += gravity;
        p.x        += p.vx;
        p.y        += p.vy;
        p.rotation += p.rotationSpeed;

        // Fade out over last 40% of duration
        const fadeStart = duration * 0.6;
        if (elapsed > fadeStart) {
          p.alpha = Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart));
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.isRect) {
          // Thin elegant rectangle
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else {
          // Soft circle
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [fire]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,          // above everything, including the overlay
        pointerEvents: 'none', // never blocks clicks
      }}
    />
  );
}

// ── Main Hero component ────────────────────────────────────────
export default function Hero() {
  const [isMobile, setIsMobile]         = useState(false);
  const [confettiFire, setConfettiFire] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Re-triggerable on every click: reset to false then true next frame
  function handleBookClick() {
    setConfettiFire(false);
    requestAnimationFrame(() => setConfettiFire(true));
  }

  return (
    <>
      {/* ── STEP 1: Dark-to-beige reveal veil ───────────────────
          Sits on top of everything at z-index 100.
          Starts fully opaque (#1c1f18), fades to transparent in 1.2s.
          pointer-events:none so it never blocks interaction after fade. */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#1c1f18',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />

      {/* ── STEP 2: Confetti canvas (fires on Book a Session click) ── */}
      <ConfettiCanvas fire={confettiFire} />

      {/* ── HERO SECTION (unchanged layout) ──────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: '100svh',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          background: '#f2f1ec',
          paddingTop: 56,
        }}
      >
        {/* ── PHOTO ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'relative',
            width: isMobile ? '100%' : '50%',
            height: isMobile ? '55vw' : 'auto',
            minHeight: isMobile ? 320 : 'unset',
            flexShrink: 0,
            overflow: 'hidden',
            background: '#1c1f18',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/max.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: isMobile ? 'center 20%' : 'center 15%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Gradient fade — bottom on mobile, right on desktop */}
          <div style={{
            position: 'absolute', inset: 0,
            background: isMobile
              ? 'linear-gradient(to top, rgba(242,241,236,0.95) 0%, transparent 40%)'
              : 'linear-gradient(to right, transparent 55%, rgba(242,241,236,0.5) 100%)',
          }} />
        </motion.div>

        {/* ── TEXT ── */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '28px 24px 48px' : 'clamp(40px, 6vw, 90px)',
            gap: isMobile ? 20 : 'clamp(20px, 3vw, 36px)',
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 1, background: '#6d9040', flexShrink: 0 }} />
            <span style={{
              color: '#6d9040',
              fontSize: isMobile ? 10 : 'clamp(10px, 0.9vw, 14px)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}>
              Los Angeles · 10+ Years Experience
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: isMobile ? 52 : 'clamp(52px, 6.5vw, 100px)',
              fontWeight: 700,
              color: '#1c1f18',
              lineHeight: 0.95,
              marginBottom: 4,
            }}>
              Deliberate
            </h1>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: isMobile ? 52 : 'clamp(52px, 6.5vw, 100px)',
              fontWeight: 700,
              color: '#6d9040',
              lineHeight: 0.95,
            }}>
              Bodywork
            </h1>
          </div>

          {/* Divider */}
          <div style={{ width: 40, height: 1, background: '#c5d4a8' }} />

          {/* Name + subtitle */}
          <div>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: isMobile ? 17 : 'clamp(17px, 1.6vw, 22px)',
              color: '#1c1f18',
              marginBottom: 5,
            }}>
              Max Goldman, CMT
            </p>
            <p style={{
              color: '#9e9783',
              fontSize: isMobile ? 13 : 'clamp(13px, 1.1vw, 15px)',
              lineHeight: 1.6,
            }}>
              Trauma-Informed Massage Therapy
            </p>
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 10,
            maxWidth: isMobile ? '100%' : 360,
          }}>
            <a
              href="#contact"
              onClick={handleBookClick}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: isMobile ? '15px 0' : 'clamp(13px, 1.4vw, 18px) 0',
                background: '#6d9040',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: isMobile ? 13 : 'clamp(12px, 1vw, 14px)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Book a Session
            </a>
            <a
              href="tel:+15102200661"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: isMobile ? '15px 0' : 'clamp(13px, 1.4vw, 18px) 0',
                border: '1px solid #1c1f18',
                color: '#1c1f18',
                textDecoration: 'none',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: isMobile ? 13 : 'clamp(12px, 1vw, 14px)',
                letterSpacing: '0.04em',
              }}
            >
              (510) 220-0661
            </a>
          </div>

          {/* Stats — hidden on small mobile */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: 36, paddingTop: 8 }}>
              {[
                { num: '10+', label: 'Years Experience' },
                { num: '3',   label: 'Specialties' },
                { num: '6',   label: 'Modalities' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(22px, 2.4vw, 34px)',
                    color: '#1c1f18',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {stat.num}
                  </p>
                  <p style={{
                    color: '#9e9783',
                    fontSize: 'clamp(9px, 0.8vw, 11px)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
}
