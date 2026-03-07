'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
// Contact — wired to Formspree
// Form ID: https://formspree.io/f/mdawoyog
// Change recipient email in Formspree dashboard anytime
// ─────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm]       = useState({ name: '', phone: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/mdawoyog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          phone:   form.phone,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: '#f2f1ec',
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 8vw, 120px)',
      }}
    >
      <div style={{ maxWidth: 'clamp(480px, 70vw, 900px)', margin: '0 auto' }}>

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
          Get In Touch
        </motion.p>
        <div style={{ width: 48, height: 1, background: '#6d9040', marginBottom: 32 }} />

        {/* Two column layout on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px, 5vw, 80px)',
        }}>

          {/* LEFT — direct contact links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              color: '#1c1f18',
              marginBottom: 8,
            }}>
              Let&rsquo;s connect.
            </h3>
            <p style={{
              color: '#9e9783',
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              lineHeight: 1.7,
              marginBottom: 28,
            }}>
              Reach out directly or send a booking inquiry and Max will get back to you shortly.
            </p>

            {/* Phone */}
            <a
              href="tel:+15102200661"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 'clamp(14px, 1.5vw, 18px)',
                background: 'white', border: '1px solid #e5e2d8',
                color: '#1c1f18', textDecoration: 'none',
                fontSize: 'clamp(13px, 1.1vw, 16px)',
                marginBottom: 10,
                transition: 'background 0.15s',
              }}
            >
              <span style={{ color: '#6d9040', fontSize: 'clamp(16px, 1.5vw, 20px)' }}>✆</span>
              (510) 220-0661
            </a>

            {/* Email */}
            <a
              href="mailto:lxarmas@gmail.com"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 'clamp(14px, 1.5vw, 18px)',
                background: 'white', border: '1px solid #e5e2d8',
                color: '#1c1f18', textDecoration: 'none',
                fontSize: 'clamp(13px, 1.1vw, 16px)',
                transition: 'background 0.15s',
              }}
            >
              <span style={{ color: '#6d9040', fontSize: 'clamp(16px, 1.5vw, 20px)' }}>✉</span>
              maxgoldman@protonmail.com
            </a>
          </motion.div>

          {/* RIGHT — booking form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              color: '#1c1f18',
              marginBottom: 20,
            }}>
              Send a booking inquiry
            </h3>

            {/* Success message */}
            {status === 'success' && (
              <div style={{
                padding: 16,
                background: '#e8f0dc',
                border: '1px solid #6d9040',
                color: '#415924',
                fontSize: 14,
                marginBottom: 20,
              }}>
                ✓ Message sent! Max will be in touch soon.
              </div>
            )}

            {/* Error message */}
            {status === 'error' && (
              <div style={{
                padding: 16,
                background: '#fce8e8',
                border: '1px solid #e07070',
                color: '#8b2020',
                fontSize: 14,
                marginBottom: 20,
              }}>
                Something went wrong. Please call directly at (510) 220-0661.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 'clamp(10px, 0.9vw, 12px)',
                  color: '#9e9783',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                  Your name *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 1.2vw, 14px) 16px',
                    background: 'white',
                    border: '1px solid #e5e2d8',
                    color: '#1c1f18',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 'clamp(10px, 0.9vw, 12px)',
                  color: '#9e9783',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                  Phone (optional)
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(310) 555-0100"
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 1.2vw, 14px) 16px',
                    background: 'white',
                    border: '1px solid #e5e2d8',
                    color: '#1c1f18',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 'clamp(10px, 0.9vw, 12px)',
                  color: '#9e9783',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}>
                  What brings you in?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell Max what you're dealing with — injuries, goals, anything helpful."
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 1.2vw, 14px) 16px',
                    background: 'white',
                    border: '1px solid #e5e2d8',
                    color: '#1c1f18',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  padding: 'clamp(14px, 1.5vw, 18px)',
                  background: status === 'sending' ? '#9e9783' : '#6d9040',
                  color: 'white',
                  border: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(12px, 1vw, 14px)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
