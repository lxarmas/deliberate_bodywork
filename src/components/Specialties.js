'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// Specialties — Cinematic expand + unique canvas animation per card
//
// ANIMATIONS:
//   Injury Recovery    → Pulse rings radiating from center (sonar)
//   Sports Performance → Diagonal streaks that decelerate to stillness
//   Nervous System     → Sine wave that breathes in and out
//
// Each canvas always runs — intensity eases from 0.25 (idle/collapsed)
// to 1.0 (expanded), so cards feel alive at all times.
// ─────────────────────────────────────────────────────────────

const SPECIALTIES = [
  {
    id: 'injury',
    index: '01',
    icon: '⟁',
    title: 'Injury Recovery + Pain Management',
    shortTitle: 'Injury Recovery',
    body: 'Targeted work to reduce acute and chronic pain, speed healing, and restore your full range of motion.',
    detail:
      'Whether you are recovering from a sports injury, surgery, or dealing with chronic pain, Max uses a combination of deep tissue, myofascial release, and trigger point therapy to address the root cause — not just the symptoms. Sessions are tailored to your recovery timeline and goals.',
    image: '/specialties/injury-recovery.jpg',
    accent: '#8aab5d',
  },
  {
    id: 'sports',
    index: '02',
    icon: '◈',
    title: 'Sports Performance + Rehabilitation',
    shortTitle: 'Sports Performance',
    body: 'Pre- and post-event sessions that prime muscles, accelerate recovery, and keep you performing at your peak.',
    detail:
      'Used by athletes at every level, sports massage improves circulation, reduces muscle soreness, and prevents injury. Pre-event sessions activate and prepare the body. Post-event sessions flush lactic acid and accelerate recovery so you can get back to training faster.',
    image: '/specialties/sports-performance.jpg',
    accent: '#c5b358',
  },
  {
    id: 'nervous',
    index: '03',
    icon: '◎',
    title: 'Nervous System Regulation',
    shortTitle: 'Nervous System',
    body: 'Trauma-informed, somatic techniques that down-regulate a chronically activated stress response and restore calm.',
    detail:
      'For those living with chronic stress, anxiety, or trauma stored in the body — this work goes beyond relaxation. Using trauma-informed touch, breathwork cues, and somatic awareness, Max guides the nervous system out of fight-or-flight and into genuine rest and repair.',
    image: '/specialties/nervous-system.jpg',
    accent: '#c5d4a8',
  },
];

// ── ANIMATION 1: Pulse rings — Injury Recovery ─────────────────
// Concentric rings radiate outward from center like sonar / heartbeat.
// Each ring fades to zero as it expands. Calm, precise, healing.
function drawPulseRings(ctx, w, h, t, accent, intensity) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.sqrt(cx * cx + cy * cy) * 0.85;
  const ringCount = 5;
  const speed = 0.0004;

  for (let i = 0; i < ringCount; i++) {
    const phase  = (t * speed + i / ringCount) % 1;
    const radius = phase * maxR;
    const alpha  = (1 - phase) * 0.55 * intensity;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // Origin dot
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.7 * intensity;
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ── ANIMATION 2: Diagonal streaks — Sports Performance ─────────
// Streaks fire diagonally top-left → bottom-right. Speed oscillates
// fast → slow on a cycle that mirrors pre-event burst → recovery rest.
function drawStreaks(ctx, w, h, t, accent, intensity) {
  ctx.clearRect(0, 0, w, h);

  // Speed pulses: burst every ~8s then settles
  const cycle = t * 0.001;
  const speedMult = 0.3 + Math.abs(Math.sin(cycle * 0.2)) * 2.2;

  const streakCount = 18;

  for (let i = 0; i < streakCount; i++) {
    // Deterministic pseudo-random per streak so they don't jump on re-render
    const rand  = ((i * 2654435761) >>> 0) / 4294967296;
    const rand2 = ((i * 1664525 + 1013904223) >>> 0) / 4294967296;

    const angle  = -0.45 + rand * 0.25;
    const speed  = (0.15 + rand2 * 0.25) * speedMult;
    const length = 30 + rand * 80;
    const offset = rand * 2000;

    const progress = ((t * speed * 0.05 + offset) % (w + length * 2));
    const x = progress - length;
    const y = rand2 * h * 1.4 - h * 0.2;
    const dx = Math.cos(angle) * length;
    const dy = Math.sin(angle) * length;

    const grad = ctx.createLinearGradient(x, y, x + dx, y + dy);
    grad.addColorStop(0, `${accent}00`);
    grad.addColorStop(0.5, accent);
    grad.addColorStop(1, `${accent}00`);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + dx, y + dy);
    ctx.strokeStyle = grad;
    ctx.globalAlpha = (0.15 + rand * 0.35) * intensity;
    ctx.lineWidth = 1 + rand * 1.5;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

// ── ANIMATION 3: Breathing wave — Nervous System ───────────────
// Sine wave whose amplitude swells (inhale) then shrinks (exhale)
// on a slow 8s breath cycle. Represents regulated, calm breathing.
function drawBreathingWave(ctx, w, h, t, accent, intensity) {
  ctx.clearRect(0, 0, w, h);

  const breathPhase = (t * 0.000125) % 1;
  const breathAmp   = 0.5 + Math.sin(breathPhase * Math.PI * 2) * 0.5;
  const amplitude   = (20 + breathAmp * 55) * intensity;
  const frequency   = 0.008 + breathAmp * 0.004;
  const speed       = t * 0.0012;
  const cy          = h / 2;

  // Soft glow pass
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const y = cy + Math.sin(x * frequency - speed) * amplitude;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.12 * intensity;
  ctx.lineWidth = 14;
  ctx.shadowBlur = 20;
  ctx.shadowColor = accent;
  ctx.stroke();

  // Sharp line pass
  ctx.beginPath();
  for (let x = 0; x <= w; x++) {
    const y = cy + Math.sin(x * frequency - speed) * amplitude;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.7 * intensity;
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 0;
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.shadowBlur  = 0;
}

const DRAW_FNS = {
  injury:  drawPulseRings,
  sports:  drawStreaks,
  nervous: drawBreathingWave,
};


// ── Botanical SVG illustrations — one per specialty ────────────
// All stroke-only, thin lines, accent color at low opacity.
// Drawn to sit in the upper 70% of the collapsed card.

// Injury Recovery → full lumbar spine cross-section, anatomically detailed
function SpineIllustration({ color }) {
  return (
    <svg viewBox="0 0 200 340" style={{ width: '100%', height: '100%', opacity: 0.22 }} fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">

      {/* ── L1 Vertebra ── */}
      <g strokeWidth="0.7">
        <ellipse cx="100" cy="30" rx="28" ry="12" />
        {/* Pedicles */}
        <path d="M 72 30 C 68 28, 64 22, 62 18 C 60 14, 58 10, 60 6" />
        <path d="M 128 30 C 132 28, 136 22, 138 18 C 140 14, 142 10, 140 6" />
        {/* Laminae */}
        <path d="M 60 6 C 70 2, 80 0, 100 0 C 120 0, 130 2, 140 6" />
        {/* Spinous process */}
        <path d="M 100 0 L 100 -8 C 100 -10, 98 -14, 100 -16" />
        {/* Transverse processes */}
        <path d="M 62 18 C 52 20, 40 22, 30 20 C 24 18, 18 14, 16 10" />
        <path d="M 138 18 C 148 20, 160 22, 170 20 C 176 18, 182 14, 184 10" />
        {/* Superior articular facets */}
        <path d="M 68 24 C 65 20, 63 16, 65 12" strokeWidth="0.5" />
        <path d="M 132 24 C 135 20, 137 16, 135 12" strokeWidth="0.5" />
        {/* Vertebral foramen */}
        <ellipse cx="100" cy="18" rx="10" ry="8" strokeWidth="0.5" opacity="0.6" />
        {/* Spinal cord cross-section */}
        <ellipse cx="100" cy="18" rx="5" ry="4" strokeWidth="0.4" strokeDasharray="1.5 2" opacity="0.5" />
        {/* Nerve roots */}
        <path d="M 90 22 C 84 26, 76 30, 68 32" strokeWidth="0.4" strokeDasharray="1 2" />
        <path d="M 110 22 C 116 26, 124 30, 132 32" strokeWidth="0.4" strokeDasharray="1 2" />
      </g>

      {/* ── Intervertebral disc L1-L2 ── */}
      <g strokeWidth="0.5" opacity="0.7">
        <path d="M 74 42 C 82 46, 92 48, 100 48 C 108 48, 118 46, 126 42" />
        <path d="M 74 50 C 82 54, 92 56, 100 56 C 108 56, 118 54, 126 50" />
        {/* Annulus fibrosus rings */}
        <ellipse cx="100" cy="46" rx="22" ry="7" />
        <ellipse cx="100" cy="46" rx="14" ry="4.5" strokeDasharray="2 2" opacity="0.5" />
        {/* Nucleus pulposus */}
        <ellipse cx="100" cy="46" rx="7" ry="2.5" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* ── L2 Vertebra ── */}
      <g strokeWidth="0.7">
        <ellipse cx="100" cy="68" rx="27" ry="11.5" />
        <path d="M 73 68 C 69 66, 65 61, 63 57 C 61 53, 60 49, 62 45" />
        <path d="M 127 68 C 131 66, 135 61, 137 57 C 139 53, 140 49, 138 45" />
        <path d="M 62 45 C 72 41, 82 39, 100 39 C 118 39, 128 41, 138 45" />
        <path d="M 100 39 L 100 31" />
        <path d="M 63 57 C 53 59, 41 60, 31 58 C 25 56, 19 52, 17 48" />
        <path d="M 137 57 C 147 59, 159 60, 169 58 C 175 56, 181 52, 183 48" />
        <ellipse cx="100" cy="57" rx="9.5" ry="7.5" strokeWidth="0.5" opacity="0.6" />
        <ellipse cx="100" cy="57" rx="4.5" ry="3.5" strokeWidth="0.4" strokeDasharray="1.5 2" opacity="0.5" />
        <path d="M 90.5 61 C 84 65, 76 69, 68 71" strokeWidth="0.4" strokeDasharray="1 2" />
        <path d="M 109.5 61 C 116 65, 124 69, 132 71" strokeWidth="0.4" strokeDasharray="1 2" />
        {/* Inferior articular facets */}
        <path d="M 69 72 C 66 76, 65 80, 67 84" strokeWidth="0.5" />
        <path d="M 131 72 C 134 76, 135 80, 133 84" strokeWidth="0.5" />
      </g>

      {/* ── Disc L2-L3 ── */}
      <g strokeWidth="0.5" opacity="0.7">
        <ellipse cx="100" cy="84" rx="21" ry="6.5" />
        <ellipse cx="100" cy="84" rx="13" ry="4" strokeDasharray="2 2" opacity="0.5" />
        <ellipse cx="100" cy="84" rx="6.5" ry="2" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* ── L3 Vertebra ── */}
      <g strokeWidth="0.7">
        <ellipse cx="100" cy="104" rx="26" ry="11" />
        <path d="M 74 104 C 70 102, 66 97, 64 93 C 62 89, 62 85, 64 81" />
        <path d="M 126 104 C 130 102, 134 97, 136 93 C 138 89, 138 85, 136 81" />
        <path d="M 64 81 C 74 77, 84 75, 100 75 C 116 75, 126 77, 136 81" />
        <path d="M 100 75 L 100 67" />
        <path d="M 64 93 C 54 95, 42 96, 32 94 C 26 92, 20 88, 18 84" />
        <path d="M 136 93 C 146 95, 158 96, 168 94 C 174 92, 180 88, 182 84" />
        <ellipse cx="100" cy="93" rx="9" ry="7" strokeWidth="0.5" opacity="0.6" />
        <ellipse cx="100" cy="93" rx="4" ry="3.2" strokeWidth="0.4" strokeDasharray="1.5 2" opacity="0.5" />
        <path d="M 91 97 C 85 101, 77 105, 69 107" strokeWidth="0.4" strokeDasharray="1 2" />
        <path d="M 109 97 C 115 101, 123 105, 131 107" strokeWidth="0.4" strokeDasharray="1 2" />
      </g>

      {/* ── Disc L3-L4 ── */}
      <g strokeWidth="0.5" opacity="0.7">
        <ellipse cx="100" cy="118" rx="20" ry="6" />
        <ellipse cx="100" cy="118" rx="12" ry="3.8" strokeDasharray="2 2" opacity="0.5" />
        <ellipse cx="100" cy="118" rx="6" ry="2" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* ── L4 Vertebra ── */}
      <g strokeWidth="0.7">
        <ellipse cx="100" cy="138" rx="25" ry="10.5" />
        <path d="M 75 138 C 71 136, 67 131, 65 127 C 63 123, 63 119, 65 115" />
        <path d="M 125 138 C 129 136, 133 131, 135 127 C 137 123, 137 119, 135 115" />
        <path d="M 65 115 C 75 111, 85 109, 100 109 C 115 109, 125 111, 135 115" />
        <path d="M 100 109 L 100 101" />
        <path d="M 65 127 C 55 129, 43 130, 33 128 C 27 126, 21 122, 19 118" />
        <path d="M 135 127 C 145 129, 157 130, 167 128 C 173 126, 179 122, 181 118" />
        <ellipse cx="100" cy="127" rx="8.5" ry="6.5" strokeWidth="0.5" opacity="0.6" />
        <ellipse cx="100" cy="127" rx="3.8" ry="3" strokeWidth="0.4" strokeDasharray="1.5 2" opacity="0.5" />
        <path d="M 91.5 131 C 85 135, 77 139, 69 141" strokeWidth="0.4" strokeDasharray="1 2" />
        <path d="M 108.5 131 C 115 135, 123 139, 131 141" strokeWidth="0.4" strokeDasharray="1 2" />
      </g>

      {/* ── Disc L4-L5 ── */}
      <g strokeWidth="0.5" opacity="0.7">
        <ellipse cx="100" cy="151" rx="19" ry="5.5" />
        <ellipse cx="100" cy="151" rx="11.5" ry="3.5" strokeDasharray="2 2" opacity="0.5" />
        <ellipse cx="100" cy="151" rx="5.5" ry="1.8" strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* ── L5 Vertebra ── */}
      <g strokeWidth="0.7">
        <ellipse cx="100" cy="170" rx="24" ry="10" />
        <path d="M 76 170 C 72 168, 68 163, 67 159 C 66 155, 66 151, 68 147" />
        <path d="M 124 170 C 128 168, 132 163, 133 159 C 134 155, 134 151, 132 147" />
        <path d="M 68 147 C 78 143, 88 141, 100 141 C 112 141, 122 143, 132 147" />
        <path d="M 100 141 L 100 133" />
        <path d="M 67 159 C 57 161, 45 162, 35 160 C 29 158, 22 153, 20 149" />
        <path d="M 133 159 C 143 161, 155 162, 165 160 C 171 158, 178 153, 180 149" />
        <ellipse cx="100" cy="159" rx="8" ry="6" strokeWidth="0.5" opacity="0.6" />
        <ellipse cx="100" cy="159" rx="3.5" ry="2.8" strokeWidth="0.4" strokeDasharray="1.5 2" opacity="0.5" />
        <path d="M 92 163 C 86 167, 78 171, 70 173" strokeWidth="0.4" strokeDasharray="1 2" />
        <path d="M 108 163 C 114 167, 122 171, 130 173" strokeWidth="0.4" strokeDasharray="1 2" />
      </g>

      {/* ── Lumbosacral disc L5-S1 ── */}
      <g strokeWidth="0.5" opacity="0.65">
        <ellipse cx="100" cy="183" rx="18" ry="5" />
        <ellipse cx="100" cy="183" rx="11" ry="3" strokeDasharray="2 2" opacity="0.5" />
      </g>

      {/* ── Sacrum ── */}
      <g strokeWidth="0.65">
        <path d="M 82 188 C 78 192, 76 200, 78 210 C 80 220, 86 228, 92 234 C 96 238, 100 240, 100 240 C 100 240, 104 238, 108 234 C 114 228, 120 220, 122 210 C 124 200, 122 192, 118 188 Z" />
        {/* Sacral foramina — 4 pairs */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <ellipse cx={92 - i*1.5} cy={196 + i*10} rx="3.5" ry="2" strokeWidth="0.5" opacity="0.6" />
            <ellipse cx={108 + i*1.5} cy={196 + i*10} rx="3.5" ry="2" strokeWidth="0.5" opacity="0.6" />
          </g>
        ))}
        {/* Median sacral crest */}
        <line x1="100" y1="190" x2="100" y2="235" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.4" />
        {/* Sacral ala */}
        <path d="M 82 190 C 70 192, 55 196, 44 204" strokeWidth="0.5" />
        <path d="M 118 190 C 130 192, 145 196, 156 204" strokeWidth="0.5" />
      </g>

      {/* ── Coccyx ── */}
      <g strokeWidth="0.6" opacity="0.7">
        <path d="M 92 240 C 94 246, 96 252, 97 258 C 98 264, 98 268, 100 270" />
        <path d="M 108 240 C 106 246, 104 252, 103 258 C 102 264, 102 268, 100 270" />
        <path d="M 97 258 C 98 262, 102 262, 103 258" strokeWidth="0.4" />
        <circle cx="100" cy="270" r="2.5" strokeWidth="0.5" />
      </g>

      {/* ── Ligaments — anterior longitudinal (dashed center line) ── */}
      <line x1="100" y1="18" x2="100" y2="270" stroke="white" strokeWidth="0.35" strokeDasharray="3 5" opacity="0.2" />

      {/* ── Sympathetic chain ganglia (lateral dotted) ── */}
      {[30,68,104,138,170].map((y, i) => (
        <g key={i}>
          <circle cx="22" cy={y} r="2" strokeWidth="0.4" opacity="0.3" />
          <circle cx="178" cy={y} r="2" strokeWidth="0.4" opacity="0.3" />
        </g>
      ))}
      <path d="M 22 30 C 22 50, 22 50, 22 68 C 22 86, 22 86, 22 104 C 22 122, 22 122, 22 138 C 22 154, 22 154, 22 170" stroke="white" strokeWidth="0.35" opacity="0.2" />
      <path d="M 178 30 C 178 50, 178 50, 178 68 C 178 86, 178 86, 178 104 C 178 122, 178 122, 178 138 C 178 154, 178 154, 178 170" stroke="white" strokeWidth="0.35" opacity="0.2" />
    </svg>
  );
}

// Sports Performance → detailed cross-section of skeletal muscle + bicep anatomy
function MuscleFibersIllustration({ color }) {
  return (
    <svg viewBox="0 0 200 340" style={{ width: '100%', height: '100%', opacity: 0.22 }} fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">

      {/* ── Bicep brachii — lateral view outline ── */}
      <g strokeWidth="0.8">
        {/* Long head tendon origin */}
        <path d="M 100 8 C 98 12, 96 18, 95 26" />
        <path d="M 100 8 C 102 12, 104 18, 105 26" />
        {/* Short head tendon origin */}
        <path d="M 85 14 C 87 20, 88 24, 90 30" />
        {/* Muscle belly — long head */}
        <path d="M 95 26 C 88 40, 82 70, 80 100 C 78 130, 80 160, 85 185" />
        <path d="M 105 26 C 112 40, 118 70, 120 100 C 122 130, 120 160, 115 185" />
        {/* Muscle belly — short head (inner) */}
        <path d="M 90 30 C 86 50, 84 80, 85 110 C 86 135, 88 158, 90 180" />
        {/* Belly cross-section ellipses at intervals — showing bulk */}
        <ellipse cx="100" cy="80" rx="22" ry="10" strokeWidth="0.5" opacity="0.5" />
        <ellipse cx="100" cy="120" rx="20" ry="9" strokeWidth="0.5" opacity="0.45" />
        <ellipse cx="100" cy="160" rx="17" ry="7.5" strokeWidth="0.5" opacity="0.4" />
        {/* Musculotendinous junction */}
        <path d="M 85 185 C 88 192, 92 198, 96 204" strokeWidth="0.7" />
        <path d="M 115 185 C 112 192, 108 198, 104 204" strokeWidth="0.7" />
        {/* Bicipital aponeurosis */}
        <path d="M 90 180 C 80 190, 68 200, 55 208" strokeWidth="0.6" />
        {/* Distal tendon */}
        <path d="M 96 204 C 97 216, 98 228, 98 240" strokeWidth="0.8" />
        <path d="M 104 204 C 103 216, 102 228, 102 240" strokeWidth="0.8" />
        <ellipse cx="100" cy="243" rx="5" ry="3" strokeWidth="0.6" />
      </g>

      {/* ── Muscle fiber detail — pennation lines ── */}
      <g strokeWidth="0.4" opacity="0.5">
        {[0,1,2,3,4,5,6,7,8].map(i => {
          const y = 40 + i * 16;
          const curve = Math.sin(i * 0.6) * 4;
          return (
            <path key={i}
              d={`M ${82 + curve} ${y} C ${88} ${y+4}, ${112} ${y+4}, ${118 - curve} ${y}`}
            />
          );
        })}
        {[0,1,2,3,4,5].map(i => {
          const y = 100 + i * 14;
          return (
            <path key={i}
              d={`M ${81} ${y} C ${88} ${y+3}, ${112} ${y+3}, ${119} ${y}`}
            />
          );
        })}
        {[0,1,2,3].map(i => {
          const y = 154 + i * 10;
          return (
            <path key={i}
              d={`M ${83} ${y} C ${90} ${y+3}, ${110} ${y+3}, ${117} ${y}`}
            />
          );
        })}
      </g>

      {/* ── Fascicle bundles (epimysium borders) ── */}
      <g strokeWidth="0.45" strokeDasharray="3 3" opacity="0.35">
        <path d="M 90 30 C 89 80, 88 130, 88 180" />
        <path d="M 100 26 C 100 80, 100 130, 100 185" />
        <path d="M 110 30 C 111 80, 112 130, 112 180" />
      </g>

      {/* ── Micro cross-section circle (lower right) — sarcomere detail ── */}
      <g strokeWidth="0.5" opacity="0.55">
        <circle cx="152" cy="200" r="28" />
        <circle cx="152" cy="200" r="20" strokeDasharray="2 3" opacity="0.5" />
        {/* Myofibrils within */}
        {[[-10,-10],[-10,0],[-10,10],[0,-10],[0,0],[0,10],[10,-10],[10,0],[10,10]].map(([dx,dy],i) => (
          <circle key={i} cx={152+dx} cy={200+dy} r="2.5" strokeWidth="0.4" />
        ))}
        {/* Z-lines */}
        <line x1="124" y1="200" x2="180" y2="200" strokeWidth="0.35" strokeDasharray="1 3" opacity="0.4" />
        <line x1="152" y1="172" x2="152" y2="228" strokeWidth="0.35" strokeDasharray="1 3" opacity="0.4" />
        {/* Leader line to main muscle */}
        <line x1="124" y1="192" x2="108" y2="160" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 3" />
      </g>

      {/* ── Brachialis (beneath bicep) — partial outline ── */}
      <g strokeWidth="0.55" opacity="0.35">
        <path d="M 76 90 C 72 110, 72 140, 76 170 C 80 185, 86 195, 90 200" />
        <path d="M 124 90 C 128 110, 128 140, 124 170 C 120 185, 114 195, 110 200" />
      </g>

      {/* ── Blood vessels — brachial artery + vein ── */}
      <g strokeWidth="0.5" opacity="0.3">
        {/* Artery */}
        <path d="M 78 50 C 76 80, 75 120, 76 160 C 77 180, 78 195, 80 210" strokeDasharray="none" />
        {/* Vein */}
        <path d="M 74 50 C 72 80, 71 120, 72 160 C 73 180, 74 195, 76 210" strokeDasharray="3 2" />
        {/* Capillary branches */}
        {[80,110,140].map((y,i) => (
          <path key={i} d={`M 77 ${y} C 79 ${y+4}, 82 ${y+6}, 86 ${y+4}`} strokeWidth="0.3" />
        ))}
      </g>

      {/* ── Annotation ticks — ruler-like marks ── */}
      <g strokeWidth="0.35" opacity="0.25">
        {[40,80,120,160].map(y => (
          <line key={y} x1="130" y1={y} x2="136" y2={y} />
        ))}
        <line x1="133" y1="40" x2="133" y2="160" strokeWidth="0.3" />
      </g>
    </svg>
  );
}

// Nervous System → detailed autonomic nervous system — vagus nerve + plexuses
function NeuronIllustration({ color }) {
  return (
    <svg viewBox="0 0 200 340" style={{ width: '100%', height: '100%', opacity: 0.22 }} fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">

      {/* ── Brain stem (medulla oblongata) — top ── */}
      <g strokeWidth="0.75">
        <path d="M 80 12 C 76 16, 74 22, 74 28 C 74 34, 76 38, 80 40" />
        <path d="M 120 12 C 124 16, 126 22, 126 28 C 126 34, 124 38, 120 40" />
        <path d="M 80 12 C 88 8, 112 8, 120 12" />
        <path d="M 80 40 C 88 44, 112 44, 120 40" />
        {/* Internal striations of medulla */}
        <line x1="80" y1="20" x2="120" y2="20" strokeWidth="0.4" opacity="0.5" />
        <line x1="78" y1="28" x2="122" y2="28" strokeWidth="0.4" opacity="0.5" />
        <line x1="80" y1="36" x2="120" y2="36" strokeWidth="0.4" opacity="0.5" />
        {/* Cranial nerve X exit points */}
        <circle cx="78" cy="32" r="2" strokeWidth="0.5" />
        <circle cx="122" cy="32" r="2" strokeWidth="0.5" />
      </g>

      {/* ── Vagus nerve — bilateral, main trunks ── */}
      <g strokeWidth="0.75">
        {/* Left vagus */}
        <path d="M 78 34 C 74 50, 70 70, 68 90 C 66 110, 66 130, 68 150 C 70 170, 72 185, 74 200 C 76 215, 78 228, 80 240" />
        {/* Right vagus */}
        <path d="M 122 34 C 126 50, 130 70, 132 90 C 134 110, 134 130, 132 150 C 130 170, 128 185, 126 200 C 124 215, 122 228, 120 240" />
      </g>

      {/* ── Cervical branches ── */}
      <g strokeWidth="0.5" opacity="0.7">
        <path d="M 72 50 C 62 48, 50 46, 38 50 C 30 53, 22 58, 18 64" />
        <path d="M 128 50 C 138 48, 150 46, 162 50 C 170 53, 178 58, 182 64" />
        <path d="M 70 65 C 58 62, 44 60, 30 65" />
        <path d="M 130 65 C 142 62, 156 60, 170 65" />
        {/* Superior laryngeal nerve */}
        <path d="M 74 55 C 70 52, 64 50, 56 52 C 50 54, 44 58, 42 64" strokeWidth="0.4" />
        <path d="M 126 55 C 130 52, 136 50, 144 52 C 150 54, 156 58, 158 64" strokeWidth="0.4" />
      </g>

      {/* ── Cardiac plexus ── */}
      <g strokeWidth="0.5" opacity="0.65">
        <path d="M 70 85 C 64 88, 56 90, 48 88 C 40 86, 34 80, 32 74" />
        <path d="M 130 85 C 136 88, 144 90, 152 88 C 160 86, 166 80, 168 74" />
        {/* Plexus weave */}
        <path d="M 48 88 C 52 95, 60 98, 68 96 C 76 94, 80 90, 80 86" strokeWidth="0.4" strokeDasharray="2 2" />
        <path d="M 152 88 C 148 95, 140 98, 132 96 C 124 94, 120 90, 120 86" strokeWidth="0.4" strokeDasharray="2 2" />
        <path d="M 68 96 C 72 100, 80 102, 90 100 C 100 98, 110 98, 120 96" strokeWidth="0.4" strokeDasharray="2 3" />
        {/* Cardiac ganglia */}
        <circle cx="60" cy="93" r="2.5" strokeWidth="0.5" />
        <circle cx="140" cy="93" r="2.5" strokeWidth="0.5" />
        <circle cx="100" cy="98" r="2" strokeWidth="0.4" />
      </g>

      {/* ── Pulmonary plexus ── */}
      <g strokeWidth="0.45" opacity="0.6">
        <path d="M 69 105 C 60 108, 50 114, 44 122 C 40 128, 40 135, 44 140" />
        <path d="M 131 105 C 140 108, 150 114, 156 122 C 160 128, 160 135, 156 140" />
        <path d="M 44 140 C 50 148, 60 152, 70 150" strokeWidth="0.4" strokeDasharray="2 2" />
        <path d="M 156 140 C 150 148, 140 152, 130 150" strokeWidth="0.4" strokeDasharray="2 2" />
        {/* Bronchial branches */}
        <path d="M 56 128 C 52 132, 46 136, 42 142 C 40 146, 40 152, 42 156" strokeWidth="0.35" />
        <path d="M 144 128 C 148 132, 154 136, 158 142 C 160 146, 160 152, 158 156" strokeWidth="0.35" />
      </g>

      {/* ── Esophageal plexus (midpoint, around esophagus) ── */}
      <g strokeWidth="0.5" opacity="0.6">
        {/* Esophagus outline */}
        <path d="M 94 44 C 93 80, 93 120, 94 160 C 95 185, 96 210, 96 230" strokeWidth="0.4" strokeDasharray="3 3" />
        <path d="M 106 44 C 107 80, 107 120, 106 160 C 105 185, 104 210, 104 230" strokeWidth="0.4" strokeDasharray="3 3" />
        {/* Plexus wrapping */}
        {[120, 140, 160, 180].map((y, i) => (
          <path key={i}
            d={`M ${68 + i*2} ${y} C ${80} ${y+4}, ${120} ${y+4}, ${132 - i*2} ${y}`}
            strokeWidth="0.35" opacity="0.5"
          />
        ))}
      </g>

      {/* ── Celiac plexus / solar plexus ── */}
      <g strokeWidth="0.55" opacity="0.65">
        <circle cx="100" cy="205" r="18" strokeWidth="0.6" />
        <circle cx="100" cy="205" r="10" strokeWidth="0.4" strokeDasharray="2 2" />
        {/* Ganglia */}
        <circle cx="86" cy="202" r="3" strokeWidth="0.5" />
        <circle cx="114" cy="202" r="3" strokeWidth="0.5" />
        <circle cx="100" cy="215" r="2.5" strokeWidth="0.4" />
        {/* Radiating branches — the "sun" */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
          const rad = deg * Math.PI / 180;
          const x1 = 100 + Math.cos(rad) * 18;
          const y1 = 205 + Math.sin(rad) * 18;
          const x2 = 100 + Math.cos(rad) * 30;
          const y2 = 205 + Math.sin(rad) * 30;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.4" opacity="0.5" />;
        })}
        {/* Vagal contribution lines */}
        <path d="M 80 240 C 82 248, 86 254, 88 260 C 90 266, 92 272, 94 278" />
        <path d="M 120 240 C 118 248, 114 254, 112 260 C 110 266, 108 272, 106 278" />
      </g>

      {/* ── Pelvic plexus / inferior hypogastric ── */}
      <g strokeWidth="0.45" opacity="0.55">
        <ellipse cx="100" cy="290" rx="22" ry="10" />
        {[0,1,2,3].map(i => {
          const x = 78 + i * 14;
          return (
            <g key={i}>
              <line x1={x} y1={280} x2={x - 4 + i * 2} y2={300} strokeWidth="0.4" />
              <circle cx={x - 4 + i * 2} cy={302} r="1.5" strokeWidth="0.4" />
            </g>
          );
        })}
        {/* Pelvic splanchnic nerves */}
        <path d="M 88 298 C 82 305, 76 310, 70 316" strokeWidth="0.4" />
        <path d="M 112 298 C 118 305, 124 310, 130 316" strokeWidth="0.4" />
      </g>

      {/* ── Sympathetic chain (paravertebral) — dashed lateral lines ── */}
      <g strokeWidth="0.4" strokeDasharray="2 4" opacity="0.25">
        <path d="M 30 44 C 28 80, 26 130, 26 180 C 26 220, 28 260, 30 295" />
        <path d="M 170 44 C 172 80, 174 130, 174 180 C 174 220, 172 260, 170 295" />
        {/* Ganglia dots along chain */}
        {[60,90,120,150,180,210,240,270].map(y => (
          <g key={y}>
            <circle cx="28" cy={y} r="2" strokeWidth="0.4" opacity="0.6" strokeDasharray="none" />
            <circle cx="172" cy={y} r="2" strokeWidth="0.4" opacity="0.6" strokeDasharray="none" />
          </g>
        ))}
      </g>

      {/* ── Communicating rami — connecting sympathetic to vagal ── */}
      {[70, 100, 130, 160, 190].map((y, i) => (
        <g key={i}>
          <line x1="30" y1={y} x2="68" y2={y + (i%2===0 ? 5 : -5)} strokeWidth="0.3" opacity="0.2" strokeDasharray="1 3" />
          <line x1="170" y1={y} x2="132" y2={y + (i%2===0 ? 5 : -5)} strokeWidth="0.3" opacity="0.2" strokeDasharray="1 3" />
        </g>
      ))}
    </svg>
  );
}

const ILLUSTRATIONS = {
  injury:  SpineIllustration,
  sports:  MuscleFibersIllustration,
  nervous: NeuronIllustration,
};

// ── Canvas — mounts once, runs its loop, eases intensity ───────
function SpecialtyCanvas({ specId, accent, isActive }) {
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const intensityRef = useRef(isActive ? 1 : 0.25);
  const drawFn       = DRAW_FNS[specId];

  useEffect(() => {
    const target = isActive ? 1 : 0.25;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = canvas.offsetWidth  || canvas.clientWidth  || 300;
      canvas.height = canvas.offsetHeight || canvas.clientHeight || 500;
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function loop(t) {
      // Smoothly ease intensity toward target on every frame
      intensityRef.current += (target - intensityRef.current) * 0.04;
      drawFn(ctx, canvas.width, canvas.height, t, accent, intensityRef.current);
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [isActive, accent, drawFn]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}

// ── Individual card ────────────────────────────────────────────
function SpecialtyCard({ spec, isActive, isCollapsed, onClick, isMobile }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      transition={{ duration: 0.65, ease: [0.32, 0, 0.08, 1] }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        height: isMobile ? (isActive ? 500 : 72) : 520,
        flexShrink: 0,
        borderLeft: `2px solid ${isActive ? spec.accent : '#2e3326'}`,
        background: '#0e100d',
      }}
    >


      {/* Canvas animation — expanded on all screen sizes */}
      {isActive && <SpecialtyCanvas specId={spec.id} accent={spec.accent} isActive={isActive} />}

      {/* Gradient for text legibility */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isActive
          ? 'linear-gradient(to top, rgba(14,16,13,0.97) 0%, rgba(14,16,13,0.35) 55%, transparent 100%)'
          : 'linear-gradient(to top, rgba(14,16,13,0.9) 0%, rgba(14,16,13,0.45) 100%)',
        transition: 'background 0.6s ease',
      }} />

      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: isActive ? spec.accent : 'transparent',
        transition: 'background 0.4s ease',
      }} />

      {/* Collapsed desktop — botanical SVG illustration top, text bottom-left */}
      {!isActive && !isMobile && (() => {
        const Illustration = ILLUSTRATIONS[spec.id];
        return (
          <div style={{ position: 'absolute', inset: 0 }}>

            {/* SVG illustration — upper 70%, centered, stroke-only */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '72%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 16px 0',
            }}>
              <Illustration color={spec.accent} />
            </div>

            {/* Soft gradient fade at bottom of illustration into card */}
            <div style={{
              position: 'absolute',
              bottom: '28%', left: 0, right: 0,
              height: 60,
              background: 'linear-gradient(to bottom, transparent, #0e100d)',
              pointerEvents: 'none',
            }} />

            {/* Bottom-left: icon → title → plus */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              display: 'flex', flexDirection: 'column', gap: 10,
              padding: '0 20px 24px',
            }}>
              <span style={{ color: spec.accent, fontSize: 'clamp(22px, 2.5vw, 30px)' }}>{spec.icon}</span>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                color: 'rgba(255,255,255,0.85)',
                fontSize: 'clamp(14px, 1.3vw, 18px)',
                lineHeight: 1.3,
                letterSpacing: '0.02em',
              }}>
                {spec.shortTitle}
              </p>
              <span style={{ color: spec.accent, fontSize: 22, fontWeight: 300, lineHeight: 1 }}>+</span>
            </div>
          </div>
        );
      })()}

      {/* Collapsed — horizontal pill (mobile) */}
      {!isActive && isMobile && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', paddingLeft: 24, gap: 14,
        }}>
          <span style={{ color: spec.accent, fontSize: 18 }}>{spec.icon}</span>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            color: 'rgba(255,255,255,0.6)', fontSize: 14, letterSpacing: '0.06em',
          }}>
            {spec.shortTitle}
          </p>
          <span style={{ color: 'rgba(255,255,255,0.25)', marginLeft: 'auto', paddingRight: 20, fontSize: 20 }}>+</span>
        </div>
      )}

      {/* Expanded — full content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: isMobile ? '28px 24px' : 'clamp(28px, 3vw, 48px)',
              pointerEvents: 'none',
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              style={{ color: spec.accent, fontSize: 'clamp(22px, 2.5vw, 32px)', display: 'block', marginBottom: 14 }}
            >
              {spec.icon}
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33, duration: 0.45 }}
              style={{
                fontFamily: 'Playfair Display, serif',
                color: 'white', fontSize: 'clamp(20px, 2.2vw, 30px)',
                lineHeight: 1.2, marginBottom: 14,
              }}
            >
              {spec.title}
            </motion.h3>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.55 }}
              style={{ transformOrigin: 'left', height: 1, background: spec.accent, marginBottom: 16, opacity: 0.4 }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              style={{ color: '#b0ac9c', fontSize: 'clamp(13px, 1.1vw, 15px)', lineHeight: 1.9, maxWidth: 520 }}
            >
              {spec.detail}
            </motion.p>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.58, duration: 0.3 }}
              style={{
                pointerEvents: 'auto',
                color: spec.accent, fontSize: 11,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                marginTop: 22, display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span style={{ fontWeight: 300, fontSize: 16 }}>−</span> Close
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────
export default function Specialties() {
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggle = (id) => setSelected((prev) => (prev === id ? null : id));

  return (
    <section
      id="specialties"
      style={{ background: '#1c1f18', padding: 'clamp(64px, 10vw, 140px) clamp(24px, 6vw, 80px)' }}
    >
      <div style={{ maxWidth: 'clamp(480px, 92vw, 1400px)', margin: '0 auto' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 1, background: '#6d9040' }} />
            <p style={{ color: '#6d9040', fontSize: 'clamp(11px, 1vw, 13px)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Specializing In
            </p>
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'white', fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 700, lineHeight: 1.1,
          }}>
            Three Areas of<br />
            <span style={{ color: '#6d9040' }}>Deep Expertise</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          layout
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 12 : 'clamp(16px, 1.5vw, 24px)',
            alignItems: 'stretch',
          }}
        >
          {SPECIALTIES.map((spec) => {
            const isActive    = selected === spec.id;
            const isCollapsed = selected !== null && !isActive;
            return (
              <motion.div
                key={spec.id}
                layout
                style={{
                  flex: isActive ? 4 : 1,
                  minWidth: isMobile ? 'unset' : (isActive ? 0 : 56),
                  transition: 'flex 0.65s cubic-bezier(0.32, 0, 0.08, 1)',
                }}
              >
                <SpecialtyCard
                  spec={spec}
                  isActive={isActive}
                  isCollapsed={isCollapsed}
                  onClick={() => toggle(spec.id)}
                  isMobile={isMobile}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Hint */}
        <AnimatePresence>
          {!selected && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.9 }}
              style={{
                color: '#3d5220', fontSize: 11,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                textAlign: 'center', marginTop: 20,
              }}
            >
              Select a specialty to explore
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
