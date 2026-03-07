'use client';
import { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// BookingButton — Calendly popup
// Drop this component anywhere you want a "Book a Session" button
// When clicked, opens Calendly as a popup overlay
// 
// To switch to Max's account later, change CALENDLY_URL below
// ─────────────────────────────────────────────────────────────

const CALENDLY_URL = 'https://calendly.com/lxarmas'; // ← swap to Max's URL when ready

export default function BookingButton({ label = 'Book a Session', style = {} }) {
  const [loaded, setLoaded] = useState(false);

  // Load Calendly widget script + CSS once
  useEffect(() => {
    // Inject Calendly CSS
    if (!document.getElementById('calendly-css')) {
      const link = document.createElement('link');
      link.id = 'calendly-css';
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // Inject Calendly JS
    if (!document.getElementById('calendly-js')) {
      const script = document.createElement('script');
      script.id = 'calendly-js';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => setLoaded(true);
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  const openCalendly = () => {
    if (loaded && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <button
      onClick={openCalendly}
      style={{
        textAlign: 'center',
        padding: 'clamp(13px, 1.4vw, 18px) clamp(24px, 2vw, 40px)',
        background: '#6d9040',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(12px, 1vw, 14px)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        transition: 'background 0.2s',
        ...style, // allow custom overrides
      }}
      onMouseEnter={e => e.target.style.background = '#537230'}
      onMouseLeave={e => e.target.style.background = '#6d9040'}
    >
      {label}
    </button>
  );
}
