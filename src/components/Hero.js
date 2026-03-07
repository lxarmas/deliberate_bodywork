'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// Hero — Fully Responsive
// Mobile  (<768px): photo top half, text bottom half (stacked)
// Desktop (≥768px): photo left half, text right half (split)
// ─────────────────────────────────────────────────────────────

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
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
          // Mobile: top half of screen
          // Desktop: full left half
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

        {/* Stats — hidden on small mobile to save space */}
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
  );
}
