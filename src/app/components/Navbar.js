'use client';
// src/components/Navbar.js
// ─────────────────────────────────────────────────────────────
// Sticky top navbar.
// • Transparent on load, goes bark-dark on scroll
// • Hamburger menu opens a full-screen overlay on mobile
// • All links are anchor-scroll (#section-id)
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Nav items — label shown + id of the target section
const NAV_ITEMS = [
  { label: 'About',       href: '#about'       },
  { label: 'Specialties', href: '#specialties'  },
  { label: 'Modalities',  href: '#modalities'   },
  { label: 'Pricing',     href: '#pricing'      },
  { label: 'Contact',     href: '#contact'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  // Detect scroll position to swap navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bark/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          {/* Brand wordmark */}
          <a href="#" className="font-display text-sm font-semibold tracking-widest text-white uppercase">
            Deliberate Bodywork
          </a>

          {/* Hamburger button — visible on all sizes for mobile-first */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5 p-2 group"
          >
            {/* Three lines animate into X when open */}
            <span className={`block w-6 h-px bg-white transition-all duration-300 origin-center
              ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300
              ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 origin-center
              ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bark flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="font-display text-3xl text-white hover:text-sage-400 transition-colors"
              >
                {item.label}
              </motion.a>
            ))}

            {/* CTA inside menu */}
            <motion.a
              href="tel:5102200661"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.07 }}
              className="mt-4 px-8 py-3 border border-sage-500 text-sage-400 font-body text-sm tracking-widest uppercase"
            >
              Call to Book
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
