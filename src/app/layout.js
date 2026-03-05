// src/app/layout.js
// ─────────────────────────────────────────────────────────────
// Root layout — wraps every page.
// • Loads Google Fonts (Playfair Display + DM Sans)
// • Sets default SEO metadata
// • Imports global Tailwind CSS
// ─────────────────────────────────────────────────────────────
import './globals.css';

export const metadata = {
  title: 'Deliberate Bodywork | Max Goldman, CMT',
  description:
    'Trauma-informed massage therapy in Los Angeles. ' +
    'Specializing in injury recovery, sports performance, and nervous system regulation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        We pull Google Fonts via a <link> in <head>.
        display=swap prevents invisible text while fonts load.
      */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-stone-50 text-bark antialiased">
        {children}
      </body>
    </html>
  );
}
