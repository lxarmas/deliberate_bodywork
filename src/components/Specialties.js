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
    <section id="specialties" style={{ background: '#1c1f18', padding: '64px 24px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: '#6d9040', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
        >
          Specializing In
        </motion.p>
        <div style={{ width: 48, height: 1, background: '#415924', marginBottom: 32 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {SPECIALTIES.map((spec, i) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              style={{ borderLeft: '2px solid #537230', paddingLeft: 20 }}
            >
              <span style={{ color: '#6d9040', fontSize: 20, display: 'block', marginBottom: 8 }}>{spec.icon}</span>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 17, marginBottom: 8 }}>{spec.title}</h3>
              <p style={{ color: '#9e9783', fontSize: 13, lineHeight: 1.7 }}>{spec.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
