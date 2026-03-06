'use client';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        background: '#f2f1ec',
        paddingTop: 56, // offset for fixed navbar
      }}
    >

      {/* ── TOP: Photo strip grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr',
          gridTemplateRows: '1fr',
          gap: 3,
          height: '52vh',
          flexShrink: 0,
        }}
      >
        {/* Main large photo — Max portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            backgroundImage: 'url(/max.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 15%',
            position: 'relative',
          }}
        >
          {/* Subtle dark tint top-left so navbar is readable */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(28,31,24,0.25) 0%, transparent 55%)',
          }} />
        </motion.div>

        {/* Right column — two tiles stacked */}
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 3 }}>

          {/* Top-right: second photo — hands, table, detail shot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              backgroundImage: 'url(/max2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              filter: 'saturate(0.75) brightness(0.85)',
            }}
          />

          {/* Bottom-right: dark green tile with text badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{
              background: '#2d3d1d',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: 12,
            }}
          >
            <span style={{
              color: '#8aab5d',
              fontSize: 22,
              fontFamily: 'Playfair Display, serif',
              fontWeight: 600,
              lineHeight: 1,
            }}>
              10+
            </span>
            <span style={{
              color: '#6d9040',
              fontSize: 8,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center',
              lineHeight: 1.8,
            }}>
              Years{'\n'}Experience
            </span>
            <div style={{ width: 20, height: 1, background: '#415924', marginTop: 4 }} />
            <span style={{
              color: '#537230',
              fontSize: 8,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Los Angeles
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM: Text content ── */}
      <div
        style={{
          flex: 1,
          padding: '22px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          maxWidth: 480,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Text block */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              color: '#6d9040',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Trauma-Informed · Los Angeles
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 36,
              fontWeight: 700,
              color: '#1c1f18',
              lineHeight: 1.05,
              marginBottom: 2,
            }}
          >
            Deliberate
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 36,
              fontWeight: 700,
              color: '#6d9040',
              lineHeight: 1.05,
              marginBottom: 10,
            }}
          >
            Bodywork
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            style={{
              color: '#9e9783',
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            Max Goldman, CMT · Massage Therapy
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ display: 'flex', gap: 10 }}
        >
          <a
            href="#contact"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '14px 0',
              background: '#6d9040',
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
              letterSpacing: '0.06em',
            }}
          >
            Book a Session
          </a>
          <a
            href="tel:5102200661"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '14px 0',
              border: '1px solid #1c1f18',
              color: '#1c1f18',
              textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 12,
            }}
          >
            (510) 220-0661
          </a>
        </motion.div>
      </div>
    </section>
  );
}
