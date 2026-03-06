'use client';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// Hero — Split Screen Layout
// Desktop: Max full height left | text right
// Mobile:  Max photo top | text bottom (stacked)
// ─────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        display: 'grid',
        // On mobile: single column (stacked)
        // On desktop: two columns via media query workaround using clamp
        gridTemplateColumns: 'clamp(0px, 45vw, 50%) 1fr',
        background: '#f2f1ec',
        paddingTop: 56,
      }}
    >
      {/* ── LEFT: Max full height photo ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{
          position: 'relative',
          minHeight: '50vw',
          background: '#1c1f18',
          overflow: 'hidden',
        }}
      >
        {/* Full image — contain so nothing is cropped */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/max.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 55%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Subtle right-side fade to blend into content */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, transparent 60%, rgba(242,241,236,0.6) 100%)',
        }} />
        {/* Bottom fade for mobile stacked view */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(242,241,236,0.8) 0%, transparent 40%)',
        }} />
      </motion.div>

      {/* ── RIGHT: Text content ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(32px, 5vw, 80px)',
          gap: 'clamp(24px, 3vw, 40px)',
        }}
      >
        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 1, background: '#6d9040' }} />
          <span style={{
            color: '#6d9040',
            fontSize: 'clamp(10px, 1vw, 12px)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}>
            Los Angeles · 10+ Years Experience
          </span>
        </div>

        {/* Headline */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(48px, 6.5vw, 100px)',
              fontWeight: 700,
              color: '#1c1f18',
              lineHeight: 0.95,
              marginBottom: 4,
            }}
          >
            Deliberate
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(48px, 6.5vw, 100px)',
              fontWeight: 700,
              color: '#6d9040',
              lineHeight: 0.95,
            }}
          >
            Bodywork
          </motion.h1>
        </div>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: '#c5d4a8' }} />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(15px, 1.6vw, 20px)',
            color: '#1c1f18',
            marginBottom: 6,
            fontWeight: 400,
          }}>
            Max Goldman, CMT
          </p>
          <p style={{
            color: '#9e9783',
            fontSize: 'clamp(12px, 1.2vw, 15px)',
            lineHeight: 1.6,
          }}>
            Trauma-Informed Massage Therapy
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320 }}
        >
          <a
            href="#contact"
            style={{
              textAlign: 'center',
              padding: 'clamp(13px, 1.5vw, 18px) 0',
              background: '#6d9040',
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Book a Session
          </a>
          <a
            href="tel:5102200661"
            style={{
              textAlign: 'center',
              padding: 'clamp(13px, 1.5vw, 18px) 0',
              border: '1px solid #1c1f18',
              color: '#1c1f18',
              textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              letterSpacing: '0.05em',
            }}
          >
            (510) 220-0661
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{ display: 'flex', gap: 32, paddingTop: 8 }}
        >
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '3',   label: 'Specialties' },
            { num: '6',   label: 'Modalities' },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                color: '#1c1f18',
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {stat.num}
              </p>
              <p style={{
                color: '#9e9783',
                fontSize: 'clamp(9px, 0.9vw, 11px)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
