// src/app/page.js
// ─────────────────────────────────────────────────────────────
// Single-page layout — imports every section component in order.
// On mobile this renders as a stacked vertical scroll.
// ─────────────────────────────────────────────────────────────
import Navbar       from '@/components/Navbar';
import Hero         from '@/components/Hero';
import About        from '@/components/About';
import Specialties  from '@/components/Specialties';
import Modalities   from '@/components/Modalities';
import Pricing      from '@/components/Pricing';
import Contact      from '@/components/Contact';
import Footer       from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Specialties />
      <Modalities />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
