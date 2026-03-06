'use client';
import { motion } from 'framer-motion';

const PRICES = [
  { label: 'In-Studio', duration: '60 min', price: '$125', note: 'Studio sessions', highlight: false },
  { label: 'In-Office / In-Home', duration: '60 min', price: '$150', note: 'At your location or office', highlight: false },
  { label: 'In-Office / In-Home', duration: '90 min', price: '$180', note: 'Recommended for new clients', highlight: true },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: '#1c1f18', padding: '64px 24px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: '#6d9040', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
        >
          Rates
        </motion.p>
        <div style={{ width: 48, height: 1, background: '#415924', marginBottom: 40 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PRICES.map((plan, i) => (
            <motion.div
              key={`${plan.label}-${plan.duration}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                background: plan.highlight ? '#415924' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${plan.highlight ? '#6d9040' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <div>
                {plan.highlight && (
                  <p style={{ color: '#aac385', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Most Popular
                  </p>
                )}
                <p style={{ color: plan.highlight ? 'white' : '#d0ccbf', fontSize: 14, fontWeight: 500 }}>{plan.label}</p>
                <p style={{ color: '#7a7468', fontSize: 12, marginTop: 2 }}>{plan.duration} · {plan.note}</p>
              </div>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, color: plan.highlight ? 'white' : '#8aab5d' }}>
                {plan.price}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ color: '#415924', fontSize: 11, textAlign: 'center', marginTop: 20 }}
        >
          In-home sessions available throughout Greater Los Angeles.
        </motion.p>
      </div>
    </section>
  );
}
