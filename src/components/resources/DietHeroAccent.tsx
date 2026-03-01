/**
 * DietHeroAccent
 * Decorative background SVG for the /resources/diet hero section.
 * Renders at 400×400px, positioned absolute top-right, very low opacity (0.05).
 * Depicts overlapping organic petri-dish / watercolor cell shapes — warm, botanical.
 */
export default function DietHeroAccent() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 pointer-events-none select-none"
      style={{ opacity: 0.05, width: 400, height: 400 }}
    >
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sage fill for large organic shapes */}
          <radialGradient id="hacc-sage1" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#7A9A7D" />
            <stop offset="100%" stopColor="#5B7B5E" />
          </radialGradient>

          {/* Gold fill for accent shapes */}
          <radialGradient id="hacc-gold1" cx="55%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#D4B87A" />
            <stop offset="100%" stopColor="#C4A265" />
          </radialGradient>

          {/* Terracotta for small accent blobs */}
          <radialGradient id="hacc-terra1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8A880" />
            <stop offset="100%" stopColor="#D4856A" />
          </radialGradient>

          {/* Soft blur for watercolor bleed effect */}
          <filter id="hacc-blur-lg">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="hacc-blur-md">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="hacc-blur-sm">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* ── Layer 1: Large background cell / organism shapes (blurred = watercolor wash) ── */}

        {/* Large sage ellipse — main petri dish silhouette, top-right quadrant */}
        <ellipse
          cx="280"
          cy="120"
          rx="130"
          ry="110"
          fill="url(#hacc-sage1)"
          filter="url(#hacc-blur-lg)"
        />

        {/* Secondary sage blob — lower left, overlapping */}
        <ellipse
          cx="160"
          cy="240"
          rx="100"
          ry="90"
          fill="url(#hacc-sage1)"
          filter="url(#hacc-blur-lg)"
        />

        {/* Gold accent — mid-right, flowing water shape */}
        <ellipse
          cx="340"
          cy="260"
          rx="85"
          ry="70"
          fill="url(#hacc-gold1)"
          filter="url(#hacc-blur-md)"
        />

        {/* Small terracotta blob — adds warmth, top center */}
        <circle
          cx="200"
          cy="80"
          r="55"
          fill="url(#hacc-terra1)"
          filter="url(#hacc-blur-md)"
        />

        {/* ── Layer 2: Organic ring strokes — petri dish / cell membrane lines ── */}

        {/* Large outer ring — top-right */}
        <ellipse
          cx="300"
          cy="140"
          rx="110"
          ry="95"
          stroke="#5B7B5E"
          strokeWidth="1.5"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />

        {/* Inner ring — concentric cell */}
        <ellipse
          cx="300"
          cy="140"
          rx="72"
          ry="60"
          stroke="#5B7B5E"
          strokeWidth="1"
          strokeDasharray="6 5"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />

        {/* Nucleus ring — innermost */}
        <ellipse
          cx="296"
          cy="136"
          rx="36"
          ry="30"
          stroke="#C4A265"
          strokeWidth="1.2"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />

        {/* Second organism — bottom left quadrant */}
        <ellipse
          cx="120"
          cy="300"
          rx="88"
          ry="80"
          stroke="#5B7B5E"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />
        <ellipse
          cx="120"
          cy="300"
          rx="52"
          ry="46"
          stroke="#C4A265"
          strokeWidth="0.8"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />

        {/* Third small organism — mid-right */}
        <circle
          cx="360"
          cy="290"
          r="55"
          stroke="#D4856A"
          strokeWidth="1"
          strokeDasharray="3 5"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />
        <circle
          cx="360"
          cy="290"
          r="32"
          stroke="#C4A265"
          strokeWidth="0.7"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />

        {/* ── Layer 3: Flowing connection lines between organisms ── */}
        {/* Represents nutrient/signal flows — organic, calligraphic */}

        <path
          d="M210 140 Q240 200 190 280"
          stroke="#5B7B5E"
          strokeWidth="0.8"
          strokeDasharray="5 7"
          strokeLinecap="round"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />
        <path
          d="M300 210 Q310 250 340 275"
          stroke="#C4A265"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          strokeLinecap="round"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />
        <path
          d="M180 100 Q220 130 260 140"
          stroke="#D4856A"
          strokeWidth="0.7"
          strokeDasharray="3 5"
          strokeLinecap="round"
          fill="none"
          filter="url(#hacc-blur-sm)"
        />

        {/* ── Layer 4: Small detail dots — spores / molecules ── */}
        {/* These give the petri dish / living culture feel */}

        <circle cx="260" cy="85" r="4" fill="#C4A265" opacity="0.6" filter="url(#hacc-blur-sm)" />
        <circle cx="340" cy="110" r="3" fill="#5B7B5E" opacity="0.5" filter="url(#hacc-blur-sm)" />
        <circle cx="370" cy="180" r="5" fill="#D4856A" opacity="0.45" filter="url(#hacc-blur-sm)" />
        <circle cx="240" cy="195" r="3.5" fill="#C4A265" opacity="0.5" filter="url(#hacc-blur-sm)" />
        <circle cx="155" cy="175" r="4" fill="#5B7B5E" opacity="0.4" filter="url(#hacc-blur-sm)" />
        <circle cx="85" cy="250" r="5" fill="#C4A265" opacity="0.4" filter="url(#hacc-blur-sm)" />
        <circle cx="195" cy="335" r="3.5" fill="#D4856A" opacity="0.45" filter="url(#hacc-blur-sm)" />
        <circle cx="305" cy="355" r="4" fill="#5B7B5E" opacity="0.4" filter="url(#hacc-blur-sm)" />

        {/* ── Layer 5: Hexagonal glucose lattice — very faint, top area ── */}
        {/* A subtle repeating hex pattern alludes to molecular structure */}

        <g opacity="0.35" filter="url(#hacc-blur-sm)">
          {/* Row 1 */}
          <polygon points="230,40 238,44 238,52 230,56 222,52 222,44" stroke="#C4A265" strokeWidth="0.8" fill="none" />
          <polygon points="250,40 258,44 258,52 250,56 242,52 242,44" stroke="#C4A265" strokeWidth="0.8" fill="none" />
          <polygon points="270,40 278,44 278,52 270,56 262,52 262,44" stroke="#C4A265" strokeWidth="0.8" fill="none" />
          <polygon points="290,40 298,44 298,52 290,56 282,52 282,44" stroke="#C4A265" strokeWidth="0.8" fill="none" />
          {/* Row 2 — offset */}
          <polygon points="240,56 248,60 248,68 240,72 232,68 232,60" stroke="#C4A265" strokeWidth="0.7" fill="none" />
          <polygon points="260,56 268,60 268,68 260,72 252,68 252,60" stroke="#C4A265" strokeWidth="0.7" fill="none" />
          <polygon points="280,56 288,60 288,68 280,72 272,68 272,60" stroke="#C4A265" strokeWidth="0.7" fill="none" />
          {/* Row 3 */}
          <polygon points="230,72 238,76 238,84 230,88 222,84 222,76" stroke="#C4A265" strokeWidth="0.6" fill="none" />
          <polygon points="250,72 258,76 258,84 250,88 242,84 242,76" stroke="#C4A265" strokeWidth="0.6" fill="none" />
          <polygon points="270,72 278,76 278,84 270,88 262,84 262,76" stroke="#C4A265" strokeWidth="0.6" fill="none" />
        </g>
      </svg>
    </div>
  );
}
