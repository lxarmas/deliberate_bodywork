'use client';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// About — Responsive
// All font sizes use clamp(mobile, fluid, desktop)
// maxWidth uses clamp so content spreads on large screens
// ─────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: '#f2f1ec',
        // Padding scales with screen size
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
      }}
    >
      {/* ── Inner container — spreads on desktop ── */}
      <div style={{
        maxWidth: 'clamp(480px, 70vw, 900px)', // ← key line for desktop spread
        margin: '0 left 18px',
      }}>

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            color: '#537230',
            fontSize: 'clamp(14px, 1vw, 13px)', // responsive
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          About
        </motion.p>

        {/* Thin rule */}
        <div style={{ width: 48, height: 1, background: '#6d9040', marginBottom: 28 }} />

        {/* Pull-quote headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 3vw, 44px)', // big on desktop
            color: '#1c1f18',
            lineHeight: 1.25,
            marginBottom: 24,
          }}
        >
          Bodywork that meets you<br />
          <span style={{ color: '#537230' }}>exactly where you are.</span>
        </motion.h2>

        {/* Body copy — two paragraphs side by side on desktop */}
        <div style={{
          display: 'grid',
          // Single column mobile, two columns desktop
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 3vw, 48px)',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: '#7a7468',
              fontSize: 'clamp(15px, 1.3vw, 18px)', // readable on all screens
              lineHeight: 1.8,
            }}
          >
            Max Goldman is a Certified Massage Therapist with over a decade of
            practice in Los Angeles. His approach blends clinical precision with
            deep presence — drawing on trauma-informed principles to create a
            space where your nervous system can genuinely unwind.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              color: '#7a7468',
              fontSize: 'clamp(15px, 1.3vw, 18px)',
              lineHeight: 1.8,
            }}
          >
            Whether you&rsquo;re recovering from injury, pushing athletic limits,
            or simply carrying tension that won&rsquo;t quit — every session is
            tailored, intentional, and built around <em>you</em>.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
