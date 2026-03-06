'use client';

export default function Footer() {
  return (
    <footer style={{ background: '#1c1f18', padding: '40px 24px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: 16, marginBottom: 6 }}>
        Deliberate Bodywork
      </p>
      <p style={{ color: '#7a7468', fontSize: 12, marginBottom: 16 }}>
        Max Goldman, CMT · Los Angeles, CA
      </p>
      <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 11 }}>
        © {new Date().getFullYear()} Deliberate Bodywork. All rights reserved.
      </p>
    </footer>
  );
}
