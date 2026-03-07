'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// Specialties — clickable cards with image + expanded detail
//
// IMAGES — add to /public/specialties/:
//   /specialties/injury-recovery.jpg
//   /specialties/sports-performance.jpg
//   /specialties/nervous-system.jpg
// ─────────────────────────────────────────────────────────────

const SPECIALTIES = [
  {
    icon: '⟁',
    title: 'Injury Recovery + Pain Management',
    image: '/specialties/injury-recovery.jpg',
    body: 'Targeted work to reduce acute and chronic pain, speed healing, and restore your full range of motion.',
    detail:
      'Whether you are recovering from a sports injury, surgery, or dealing with chronic pain, Max uses a combination of deep tissue, myofascial release, and trigger point therapy to address the root cause — not just the symptoms. Sessions are tailored to your recovery timeline and goals.',
  },
  {
    icon: '◈',
    title: 'Sports Performance + Rehabilitation',
    image: '/specialties/sports-performance.jpg',
    body: 'Pre- and post-event sessions that prime muscles, accelerate recovery, and keep you performing at your peak.',
    detail:
      'Used by athletes at every level, sports massage improves circulation, reduces muscle soreness, and prevents injury. Pre-event sessions activate and prepare the body. Post-event sessions flush lactic acid and accelerate recovery so you can get back to training faster.',
  },
  {
    icon: '◎',
    title: 'Nervous System Regulation',
    image: '/specialties/nervous-system.jpg',
    body: 'Trauma-informed, somatic techniques that down-regulate a chronically activated stress response and restore calm.',
    detail:
      'For those living with chronic stress, anxiety, or trauma stored in the body — this work goes beyond relaxation. Using trauma-informed touch, breathwork cues, and somatic awareness, Max guides the nervous system out of fight-or-flight and into genuine rest and repair.',
  },
];

export default function Specialties() {
  const [selected, setSelected] = useState(null);

  const toggle = (title) => setSelected((prev) => (prev === title ? null : title));

  const active = SPECIALTIES.find((s) => s.title === selected);

  return (
    <section
      id="specialties"
      style={{
        background: '#1c1f18',
        padding: 'clamp(64px, 10vw, 140px) clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 'clamp(480px, 92vw, 1400px)', margin: '0 auto' }}>

        {/* Eyebrow */}
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

       
    

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
          marginBottom: 24,
        }}>
          {SPECIALTIES.map((spec, i) => {
            const isActive = selected === spec.title;
            return (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                onClick={() => toggle(spec.title)}
                style={{
                  borderLeft: `3px solid ${isActive ? '#8aab5d' : '#537230'}`,
                  paddingLeft: 'clamp(16px, 2vw, 28px)',
                  paddingTop: 'clamp(16px, 2vw, 24px)',
                  paddingBottom: 'clamp(16px, 2vw, 24px)',
                  paddingRight: 'clamp(16px, 2vw, 24px)',
                  background: isActive ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {/* Icon */}
                <span style={{
                  color: '#6d9040',
                  fontSize: 'clamp(22px, 4.5vw, 32px)',
                  display: 'block',
                  marginBottom: 14,
                }}>
                  {spec.icon}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  color: 'white',
                  fontSize: 'clamp(17px, 1.6vw, 24px)',
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}>
                  {spec.title}
                </h3>

                {/* Body */}
                <p style={{
                  color: '#9e9783',
                  fontSize: 'clamp(13px, 1.1vw, 16px)',
                  lineHeight: 1.8,
                  marginBottom: 14,
                }}>
                  {spec.body}
                </p>

                {/* + / - indicator */}
                <span style={{
                  color: isActive ? '#8aab5d' : '#537230',
                  fontSize: 'clamp(11px, 1vw, 13px)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  {isActive ? 'Close' : 'Learn more'}
                  <span style={{ fontSize: 18, fontWeight: 300 }}>
                    {isActive ? '−' : '+'}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}
