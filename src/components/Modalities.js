'use client';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// Modalities — cinematic scroll-triggered reveal
//
// SCROLL ANIMATIONS:
//   Section heading   → fades up once when it enters the viewport
//   Each pill tag     → staggered fade+scale in as the row enters view
//   Expanded panel    → image slides in from left, text from right
//   Panel exit        → fades up and out (mode="wait" for clean swap)
//
// IMAGES — add to /public/modalities/:
//   swedish.jpg · deep-tissue.jpg · myofascial.jpg
//   trigger-point.png · tui-na.jpg · stretching.jpg
// ─────────────────────────────────────────────────────────────

const MODALITIES = [
  {
    name: 'Swedish',
    image: '/modalities/swedish.jpg',
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

// Reusable fade-up wrapper triggered when element enters viewport
function FadeUp({ children, delay = 0, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      style={style}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0, 0.1, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Modalities() {
  const [selected, setSelected] = useState(null);
  const tagsRef  = useRef(null);
  const tagsInView = useInView(tagsRef, { once: true, margin: '-60px 0px' });

  const toggle = (name) => setSelected((prev) => (prev === name ? null : name));
  const active  = MODALITIES.find((m) => m.name === selected);

  // Scroll-driven cinematic fade — tracks section entering + leaving viewport
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'end 0.05'],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [0, 1, 1, 0]);
  const sectionY       = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [50, 0, 0, -40]);

  return (
    <section id="modalities" ref={sectionRef}>
    <motion.div
      style={{
        background: '#f2f1ec',
        padding: 'clamp(64px, 10vw, 140px) clamp(24px, 6vw, 80px)',
        opacity: sectionOpacity,
        y: sectionY,
        willChange: 'opacity, transform',
      }}
    >
      <div style={{ maxWidth: 'clamp(480px, 92vw, 1400px)', margin: '0 auto' }}>

        {/* ── Eyebrow ── */}
        <FadeUp delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 1, background: '#6d9040' }} />
            <p style={{
              color: '#537230',
              fontSize: 'clamp(11px, 1vw, 13px)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Modalities
            </p>
          </div>
        </FadeUp>

        {/* ── Headline ── */}
        <FadeUp delay={0.1}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 3vw, 44px)',
            color: '#1c1f18',
            marginBottom: 10,
            lineHeight: 1.1,
          }}>
            A full toolkit<br />
            <span style={{ color: '#6d9040' }}>for every body.</span>
          </h2>
        </FadeUp>

        {/* ── Subtitle ── */}
        <FadeUp delay={0.18} style={{ marginBottom: 36 }}>
          <p style={{
            color: '#9e9783',
            fontSize: 'clamp(12px, 1vw, 14px)',
            fontStyle: 'italic',
          }}>
            Tap any modality to learn more.
          </p>
        </FadeUp>

        {/* ── Pill tags — staggered on scroll ── */}
        <div ref={tagsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
          {MODALITIES.map((mod, i) => {
            const isActive = selected === mod.name;
            return (
              <motion.button
                key={mod.name}
                // Staggered fade+scale as the row scrolls into view
                animate={tagsInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.88, y: 12 }
                }
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0, 0.1, 1] }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
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
                  transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
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

        {/* ── Expanded panel ── */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.name}
              // Whole panel: fade + very slight rise on enter, fade + rise on exit
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0, 0.1, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                background: 'white',
                borderLeft: '3px solid #6d9040',
                overflow: 'hidden',
              }}
            >
              {/* ── IMAGE — slides in from left ── */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0, 0.1, 1] }}
                style={{
                  position: 'relative',
                  minHeight: 'clamp(240px, 35vw, 520px)',
                  background: '#e5e2d8',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${active.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                {/* Subtle right-edge fade into white panel */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.18) 100%)',
                }} />
              </motion.div>

              {/* ── TEXT — slides in from right ── */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0, 0.1, 1] }}
                style={{ padding: 'clamp(20px, 2.5vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                {/* Name */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(18px, 1.8vw, 24px)',
                    color: '#1c1f18',
                    marginBottom: 14,
                  }}
                >
                  {active.name}
                </motion.p>

                {/* Thin accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ transformOrigin: 'left', height: 1, background: '#6d9040', opacity: 0.4, marginBottom: 16 }}
                />

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.45 }}
                  style={{
                    color: '#7a7468',
                    fontSize: 'clamp(13px, 1.1vw, 16px)',
                    lineHeight: 1.85,
                    marginBottom: 28,
                  }}
                >
                  {active.description}
                </motion.p>

                {/* CTA */}
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42, duration: 0.35 }}
                  href="#contact"
                  style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    padding: '12px 28px',
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
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
    </section>
  );
}
