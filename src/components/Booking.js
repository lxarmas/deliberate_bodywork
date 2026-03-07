'use client';
import { motion } from 'framer-motion';
import BookingButton from './BookingButton';

// ─────────────────────────────────────────────────────────────
// Booking section — full Calendly embed inline
// Sits between Pricing and Contact sections
// ─────────────────────────────────────────────────────────────

export default function Booking() {
  return (
    <section
      id="booking"
      style={{
        background: '#1c1f18',
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
      }}
    >
      <div style={{ maxWidth: 'clamp(480px, 70vw, 900px)', margin: '0 auto' }}>

        {/* Header */}
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
          Schedule
        </motion.p>
        <div style={{ width: 48, height: 1, background: '#415924', marginBottom: 24 }} />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 3vw, 44px)',
            color: 'white',
            marginBottom: 12,
          }}
        >
          Book your session.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            color: '#9e9783',
            fontSize: 'clamp(13px, 1.1vw, 16px)',
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Choose a time that works for you. Confirmation and details sent instantly to your email.
        </motion.p>

        {/* Calendly inline embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'white',
            borderRadius: 2,
            overflow: 'hidden',
            minHeight: 700,
          }}
        >
          <iframe
            src="https://calendly.com/lxarmas?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1"
            width="100%"
            height="700"
            frameBorder="0"
            title="Book a session with Max Goldman"
            style={{ display: 'block' }}
          />
        </motion.div>

        {/* Fallback CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 24 }}
        >
          <p style={{ color: '#537230', fontSize: 12, marginBottom: 12 }}>
            Prefer to book by phone?
          </p>
          <a
            href="tel:+15102200661"
            style={{
              color: '#8aab5d',
              fontSize: 14,
              textDecoration: 'none',
              borderBottom: '1px solid #415924',
              paddingBottom: 2,
            }}
          >
            (510) 220-0661
          </a>
        </motion.div>
      </div>
    </section>
  );
}
