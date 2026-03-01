export default function WarburgIllustration() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Warm cream background */}
        <radialGradient id="wbg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5F0EA" />
          <stop offset="100%" stopColor="#EDE8E0" />
        </radialGradient>

        {/* Cell body — terracotta-to-gold warm glow */}
        <radialGradient id="wcell" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#E8A880" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#D4856A" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#B8694E" stopOpacity="0.75" />
        </radialGradient>

        {/* Inner nucleus */}
        <radialGradient id="wnucleus" cx="45%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#C4A265" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A8834A" stopOpacity="0.7" />
        </radialGradient>

        {/* Soft ambient glow behind cell */}
        <radialGradient id="wglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4856A" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#D4856A" stopOpacity="0" />
        </radialGradient>

        {/* Glucose molecule fill */}
        <radialGradient id="wgluc" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#C4A265" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9E7E45" stopOpacity="0.7" />
        </radialGradient>

        {/* Lactate arrow fill */}
        <linearGradient id="wlactate" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A9A7D" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#5B7B5E" stopOpacity="0.4" />
        </linearGradient>

        {/* Drop shadow filter for cell */}
        <filter id="wdrop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4856A" floodOpacity="0.22" />
        </filter>

        {/* Soft blur for glow layer */}
        <filter id="wblur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="url(#wbg)" />

      {/* Subtle sage ring border */}
      <circle cx="50" cy="50" r="47.5" stroke="#5B7B5E" strokeOpacity="0.08" strokeWidth="1" />

      {/* Ambient glow behind the cell */}
      <ellipse
        cx="50"
        cy="52"
        rx="22"
        ry="20"
        fill="url(#wglow)"
        filter="url(#wblur)"
      />

      {/* ── Glucose molecules orbiting inward ── */}
      {/* Each is a small hexagon (6-sided) rendered as a circle with a hex-like stroke */}

      {/* Glucose 1 — top-left, closest */}
      <g opacity="0.88">
        <circle cx="25" cy="28" r="5.5" fill="url(#wgluc)" />
        <circle cx="25" cy="28" r="5.5" stroke="#9E7E45" strokeOpacity="0.3" strokeWidth="0.8" />
        {/* hex inner mark */}
        <path
          d="M25 24.8 L27.2 26.2 L27.2 29 L25 30.4 L22.8 29 L22.8 26.2 Z"
          stroke="white"
          strokeOpacity="0.45"
          strokeWidth="0.7"
          fill="none"
        />
      </g>

      {/* Glucose 2 — top-right, mid-distance */}
      <g opacity="0.72">
        <circle cx="72" cy="22" r="4.5" fill="url(#wgluc)" />
        <circle cx="72" cy="22" r="4.5" stroke="#9E7E45" strokeOpacity="0.25" strokeWidth="0.7" />
        <path
          d="M72 19.4 L73.8 20.5 L73.8 22.8 L72 23.9 L70.2 22.8 L70.2 20.5 Z"
          stroke="white"
          strokeOpacity="0.4"
          strokeWidth="0.6"
          fill="none"
        />
      </g>

      {/* Glucose 3 — right side, incoming */}
      <g opacity="0.65">
        <circle cx="82" cy="46" r="4" fill="url(#wgluc)" />
        <circle cx="82" cy="46" r="4" stroke="#9E7E45" strokeOpacity="0.2" strokeWidth="0.6" />
        <path
          d="M82 43.8 L83.6 44.7 L83.6 46.5 L82 47.4 L80.4 46.5 L80.4 44.7 Z"
          stroke="white"
          strokeOpacity="0.38"
          strokeWidth="0.6"
          fill="none"
        />
      </g>

      {/* Glucose 4 — small, far top */}
      <g opacity="0.45">
        <circle cx="58" cy="12" r="3" fill="url(#wgluc)" />
        <path
          d="M58 10.3 L59.3 11 L59.3 12.5 L58 13.2 L56.7 12.5 L56.7 11 Z"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      {/* Glucose 5 — bottom-left, small, distant */}
      <g opacity="0.38">
        <circle cx="18" cy="60" r="3.2" fill="url(#wgluc)" />
        <path
          d="M18 58.2 L19.4 59 L19.4 60.7 L18 61.5 L16.6 60.7 L16.6 59 Z"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      {/* ── Motion trails — dashed arcs from glucose toward cell center ── */}
      {/* Trail from glucose 1 */}
      <path
        d="M29.5 31 Q36 38 42 44"
        stroke="#C4A265"
        strokeOpacity="0.28"
        strokeWidth="1.2"
        strokeDasharray="2 2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Trail from glucose 2 */}
      <path
        d="M68.5 25 Q62 34 56 43"
        stroke="#C4A265"
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeDasharray="2 2.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Trail from glucose 3 */}
      <path
        d="M79 47 Q72 48 63 50"
        stroke="#C4A265"
        strokeOpacity="0.18"
        strokeWidth="0.9"
        strokeDasharray="1.8 2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Cell body — main rounded blob ── */}
      {/* Slightly organic, not a perfect circle */}
      <ellipse
        cx="50"
        cy="52"
        rx="19"
        ry="18"
        fill="url(#wcell)"
        filter="url(#wdrop)"
      />

      {/* Cell membrane highlight — inner rim */}
      <ellipse
        cx="50"
        cy="52"
        rx="19"
        ry="18"
        stroke="white"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Cell outer shimmer — specular highlight top-left */}
      <ellipse
        cx="43"
        cy="44"
        rx="7"
        ry="5"
        fill="white"
        fillOpacity="0.12"
        transform="rotate(-20 43 44)"
      />

      {/* ── Nucleus ── */}
      <ellipse
        cx="50"
        cy="52"
        rx="8.5"
        ry="8"
        fill="url(#wnucleus)"
      />
      {/* Nucleus inner highlight */}
      <ellipse
        cx="47.5"
        cy="49.5"
        rx="3.5"
        ry="2.8"
        fill="white"
        fillOpacity="0.16"
        transform="rotate(-15 47.5 49.5)"
      />

      {/* ── Lactate arrow out (sage — metabolic byproduct leaving cell) ── */}
      {/* Small arrow pointing bottom-right from the cell */}
      <g opacity="0.72">
        <path
          d="M64 62 Q72 67 80 72"
          stroke="url(#wlactate)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M77.5 69.5 L80 72 L76.8 73.2"
          stroke="#5B7B5E"
          strokeOpacity="0.55"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* "Lact." tiny label */}
        <text
          x="69"
          y="77"
          fontFamily="serif"
          fontSize="5.2"
          fill="#5B7B5E"
          fillOpacity="0.5"
          fontStyle="italic"
        >
          lactate
        </text>
      </g>

      {/* ── Small energy burst dots inside cell (ATP-like) ── */}
      <circle cx="46" cy="55" r="1.2" fill="white" fillOpacity="0.3" />
      <circle cx="52" cy="57" r="0.9" fill="white" fillOpacity="0.22" />
      <circle cx="55" cy="50" r="1" fill="white" fillOpacity="0.2" />
    </svg>
  );
}
