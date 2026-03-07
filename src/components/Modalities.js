'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// Modalities — clickable tags with image + description
//
// IMAGES — add to /public/:
//   /modalities/swedish.jpg
//   /modalities/deep-tissue.jpg
//   /modalities/myofascial.jpg
//   /modalities/trigger-point.jpg
//   /modalities/tui-na.jpg
//   /modalities/stretching.jpg
//
// Any image works — 800x600 or similar landscape ratio is ideal
// ─────────────────────────────────────────────────────────────

const MODALITIES = [
  {
    name: 'Swedish',
    image: '/modalities/swedish.jpg', // ← placeholder, swap for actual image file
    description:
      'A gentle, flowing style of massage that promotes relaxation, improves circulation, and eases muscle tension. Perfect for first-time clients or anyone looking to de-stress.',
  },
  {
    name: 'Deep Tissue',
    image: '/modalities/deep-tissue.jpg',
    description:
      "Targets the deeper layers of muscle and connective tissue. Ideal for chronic pain, stiffness, and areas of persistent tension that lighter massage can't reach.",
  },
  {
    name: 'Myofascial Release',
    image: '/modalities/myofascial.jpg',
    description:
      'Slow, sustained pressure applied to the fascial system to eliminate restrictions and restore movement. Highly effective for postural issues and chronic pain patterns.',
  },
  {
    name: 'Trigger Point',
    image: '/modalities/trigger-point.png',
    description:
      'Focused pressure on specific tight spots within muscle tissue that refer pain to other areas. Releases knots and restores normal muscle function.',
  },
  {
    name: 'Tui Na',
    image: '/modalities/tui-na.jpg',
    description:
      'A form of Chinese therapeutic massage that uses rhythmic compression and joint manipulation to stimulate the flow of qi and address both acute and chronic conditions.',
  },
  {
    name: 'Assisted Stretching',
    image: '/modalities/stretching.jpg',
    description:
      'Guided stretching that improves flexibility, range of motion, and athletic performance. Max assists each stretch to safely take you further than you could go alone.',
  },
];

export default function Modalities() {
  const [selected, setSelected] = useState(null);

  const toggle = (name) => setSelected((prev) => (prev === name ? null : name));

  const active = MODALITIES.find((m) => m.name === selected);

  return (
    <section
      id="modalities"
      style={{
        background: '#f2f1ec',
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
            color: '#537230',
            fontSize: 'clamp(11px, 1vw, 13px)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Modalities
        </motion.p>

        <div style={{ width: 48, height: 1, background: '#6d9040', marginBottom: 24 }} />

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 3vw, 44px)',
            color: '#1c1f18',
            marginBottom: 12,
          }}
        >
          A full toolkit for every body.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            color: '#9e9783',
            fontSize: 'clamp(12px, 1vw, 14px)',
            marginBottom: 28,
            fontStyle: 'italic',
          }}
        >
          Tap any modality to learn more.
        </motion.p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {MODALITIES.map((mod, i) => {
            const isActive = selected === mod.name;
            return (
              <motion.button
                key={mod.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => toggle(mod.name)}
                style={{
                  padding: 'clamp(10px, 1.2vw, 16px) clamp(20px, 2vw, 32px)',
                  border: `1px solid ${isActive ? '#415924' : '#8aab5d'}`,
                  background: isActive ? '#415924' : 'transparent',
                  color: isActive ? 'white' : '#415924',
                  fontSize: 'clamp(12px, 1vw, 14px)',
                  borderRadius: 999,
                  letterSpacing: '0.03em',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {mod.name}
                <span style={{ fontSize: 16, lineHeight: 1, fontWeight: 300, opacity: 0.7 }}>
                  {isActive ? '−' : '+'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded panel — image left, text right */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                background: 'white',
                borderLeft: '3px solid #6d9040',
                overflow: 'hidden',
              }}
            >
              {/* ── IMAGE ── */}
              <div
                style={{
                  position: 'relative',
                  minHeight:  'clamp(240px, 35vw, 520px)',
                  background: '#e5e2d8',
                  overflow: 'hidden',
                }}
              >
                {/* Actual image — shows when file exists in /public/modalities/ */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${active.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                
              </div>

              {/* ── TEXT ── */}
              <div style={{ padding: 'clamp(20px, 2.5vw, 36px)' }}>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(18px, 1.8vw, 24px)',
                  color: '#1c1f18',
                  marginBottom: 14,
                }}>
                  {active.name}
                </p>
                <p style={{
                  color: '#7a7468',
                  fontSize: 'clamp(13px, 1.1vw, 16px)',
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}>
                  {active.description}
                </p>

                {/* CTA inside panel */}
                <a
                  href="#contact"
                  style={{
                    display: 'inline-block',
                    padding: '10px 24px',
                    background: '#6d9040',
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 12,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Book this session
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
