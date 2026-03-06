'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" style={{ background: '#f2f1ec', padding: '64px 24px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: '#537230', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
        >
          About
        </motion.p>
        <div style={{ width: 48, height: 1, background: '#6d9040', marginBottom: 24 }} />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: '#1c1f18', lineHeight: 1.3, marginBottom: 20 }}
        >
          Bodywork that meets you<br />
          <span style={{ color: '#537230' }}>exactly where you are.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ color: '#7a7468', fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}
        >
          Max Goldman is a Certified Massage Therapist with over a decade of practice in
          Los Angeles. His approach blends clinical precision with deep presence —
          drawing on trauma-informed principles to create a space where your nervous
          system can genuinely unwind.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ color: '#7a7468', fontSize: 14, lineHeight: 1.75 }}
        >
          Whether you&rsquo;re recovering from injury, pushing athletic limits, or simply
          carrying tension that won&rsquo;t quit — every session is tailored, intentional,
          and built around <em>you</em>.
        </motion.p>
      </div>
    </section>
  );
}
