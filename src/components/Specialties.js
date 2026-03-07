'use client';
import { motion } from 'framer-motion';

const SPECIALTIES = [
  {
    icon: '⟁',
    title: 'Injury Recovery + Pain Management',
    body: 'Targeted work to reduce acute and chronic pain, speed healing, and restore your full range of motion.',
  },
  {
    icon: '◈',
    title: 'Sports Performance + Rehabilitation',
    body: 'Pre- and post-event sessions that prime muscles, accelerate recovery, and keep you performing at your peak.',
  },
  {
    icon: '◎',
    title: 'Nervous System Regulation',
    body: 'Trauma-informed, somatic techniques that down-regulate a chronically activated stress response and restore calm.',
  },
];

export default function Specialties() {
  return (
    <section
      id="specialties"
      style={{
        background: '#1c1f18',
        // 1. PADDING — breathes on desktop
        padding: 'clamp(64px, 10vw, 140px) clamp(24px, 6vw, 80px)'
      }}
    >
      {/* 2. MAX WIDTH — spreads on desktop */}
      <div style={{ maxWidth: 'clamp(480px, 70vw, 900px)', margin: '0 auto' }}>

        {/* 3. EYEBROW — bigger on desktop */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            color: '#6d9040',
            fontSize: 'clamp(11px, 1vw, 13px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Specializing In
        </motion.p>

        <div style={{ width: 48, height: 1, background: '#415924', marginBottom: 32 }} />

        {/* 4. GRID — single column mobile, three columns desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(24px, 3vw, 48px)',
        }}>
          {SPECIALTIES.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              style={{ borderLeft: '2px solid #537230', paddingLeft: 20 }}
            >
              {/* 5. ICON — scales up */}
              <span style={{
                color: '#6d9040',
                fontSize: 'clamp(20px, 2vw, 28px)',
                display: 'block',
                marginBottom: 12,
              }}>
                {spec.icon}
              </span>

              {/* 6. TITLE — bigger on desktop */}
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'white',
                fontSize: 'clamp(17px, 1.6vw, 22px)',
                lineHeight: 1.3,
                marginBottom: 10,
              }}>
                {spec.title}
              </h3>

              {/* 7. BODY — readable on all screens */}
              <p style={{
                color: '#9e9783',
                fontSize: 'clamp(13px, 1.1vw, 16px)',
                lineHeight: 1.8,
              }}>
                {spec.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}