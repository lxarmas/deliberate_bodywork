'use client';
import { motion } from 'framer-motion';

const MODALITIES = [
  'Swedish',
  'Deep Tissue',
  'Myofascial Release',
  'Trigger Point',
  'Tui Na',
  'Assisted Stretching',
];

export default function Modalities() {
  return (
    <section id="modalities" style={{ background: '#f2f1ec', padding: '64px 24px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: '#537230', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
        >
          Modalities
        </motion.p>
        <div style={{ width: 48, height: 1, background: '#6d9040', marginBottom: 24 }} />
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, color: '#1c1f18', marginBottom: 32 }}
        >
          A full toolkit for every body.
        </motion.h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {MODALITIES.map((mod, i) => (
            <motion.span
              key={mod}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                padding: '8px 18px',
                border: '1px solid #8aab5d',
                color: '#415924',
                fontSize: 13,
                borderRadius: 999,
                letterSpacing: '0.03em',
              }}
            >
              {mod}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
