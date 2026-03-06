'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Booking Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:maxgoldman@protonmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" style={{ background: '#f2f1ec', padding: '64px 24px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: '#537230', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}
        >
          Get In Touch
        </motion.p>
        <div style={{ width: 48, height: 1, background: '#6d9040', marginBottom: 32 }} />

        {/* Direct contact links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}
        >
          <a
            href="tel:5102200661"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 16, background: 'white', border: '1px solid #e5e2d8',
              color: '#1c1f18', textDecoration: 'none', fontSize: 14,
            }}
          >
            <span style={{ color: '#6d9040', fontSize: 18 }}>✆</span>
            <span>(510) 220-0661</span>
          </a>
          <a
            href="mailto:maxgoldman@protonmail.com"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 16, background: 'white', border: '1px solid #e5e2d8',
              color: '#1c1f18', textDecoration: 'none', fontSize: 14,
            }}
          >
            <span style={{ color: '#6d9040', fontSize: 18 }}>✉</span>
            <span>maxgoldman@protonmail.com</span>
          </a>
        </motion.div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#1c1f18', marginBottom: 20 }}>
            Send a booking inquiry
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#9e9783', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                Your name
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'white', border: '1px solid #e5e2d8',
                  color: '#1c1f18', fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14, outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#9e9783', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                Phone (optional)
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(310) 555-0100"
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'white', border: '1px solid #e5e2d8',
                  color: '#1c1f18', fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14, outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#9e9783', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                What brings you in?
              </label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell Max what you're dealing with — injuries, goals, anything helpful."
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'white', border: '1px solid #e5e2d8',
                  color: '#1c1f18', fontFamily: 'DM Sans, sans-serif',
                  fontSize: 14, outline: 'none', resize: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%', padding: 16,
                background: '#6d9040', color: 'white', border: 'none',
                fontFamily: 'DM Sans, sans-serif', fontSize: 12,
                letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
