import React from "react";

export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Ambient central amber glow behind the focal jaguar gaze */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 56% at 50% 46%, rgba(196, 143, 86, 0.17) 0%, rgba(70, 63, 50, 0.14) 38%, rgba(10, 10, 9, 0.92) 76%, #0A0A09 100%)",
        }}
      />

      {/* Full-bleed panoramic editorial jaguar & architectural backdrop */}
      <svg
        viewBox="0 0 1440 780"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full opacity-90"
      >
        <defs>
          <radialGradient id="heroAmberIris" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6B980" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#C48F56" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#7C5328" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0A0A09" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="heroGoldLine"
            x1="360"
            y1="80"
            x2="1080"
            y2="700"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#EFE4D4" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#C48F56" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#463F32" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Wide architectural editorial grid lines */}
        <line
          x1="720"
          y1="0"
          x2="720"
          y2="780"
          stroke="rgba(239, 228, 212, 0.06)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
        <line
          x1="0"
          y1="370"
          x2="1440"
          y2="370"
          stroke="rgba(196, 143, 86, 0.08)"
          strokeWidth="1"
        />
        <line
          x1="180"
          y1="0"
          x2="180"
          y2="780"
          stroke="rgba(239, 228, 212, 0.04)"
          strokeWidth="1"
        />
        <line
          x1="1260"
          y1="0"
          x2="1260"
          y2="780"
          stroke="rgba(239, 228, 212, 0.04)"
          strokeWidth="1"
        />

        {/* Subtle geometric rosettes spread across left & right flanks */}
        <g stroke="#C48F56" strokeOpacity="0.12" strokeWidth="1">
          {/* Left flank rosettes */}
          <path d="M210 190C226 172 254 176 262 198C268 218 248 238 226 232C206 226 198 204 210 190Z" />
          <circle cx="233" cy="204" r="5" fill="#463F32" fillOpacity="0.28" stroke="none" />
          <path d="M130 335C144 320 168 325 173 344C178 362 159 378 141 372C124 366 119 348 130 335Z" />
          <path d="M268 480C284 464 310 470 315 492C320 512 299 530 278 523C260 517 255 494 268 480Z" />
          <path d="M350 130C362 117 383 121 387 137C391 151 375 165 360 160C346 156 341 140 350 130Z" />

          {/* Right flank rosettes */}
          <path d="M1230 190C1214 172 1186 176 1178 198C1172 218 1192 238 1214 232C1234 226 1242 204 1230 190Z" />
          <circle cx="1207" cy="204" r="5" fill="#463F32" fillOpacity="0.28" stroke="none" />
          <path d="M1310 335C1296 320 1272 325 1267 344C1262 362 1281 378 1299 372C1316 366 1321 348 1310 335Z" />
          <path d="M1172 480C1156 464 1130 470 1125 492C1120 512 1141 530 1162 523C1180 517 1185 494 1172 480Z" />
          <path d="M1090 130C1078 117 1057 121 1053 137C1049 151 1065 165 1080 160C1094 156 1099 140 1090 130Z" />
        </g>

        {/* Centered monumental geometric jaguar head silhouette */}
        <path
          d="M475 96L592 186H848L965 96L1026 280L965 480L848 672L720 756L592 672L475 480L414 280L475 96Z"
          stroke="url(#heroGoldLine)"
          strokeWidth="1.25"
        />

        {/* Cranial and ear architectural facets */}
        <path
          d="M475 96L524 268L592 186M965 96L916 268L848 186"
          stroke="rgba(196, 143, 86, 0.18)"
          strokeWidth="1"
        />
        <path
          d="M592 186L656 328L720 270L784 328L848 186"
          stroke="rgba(196, 143, 86, 0.2)"
          strokeWidth="1"
        />
        <path
          d="M414 280L536 346L475 480M1026 280L904 346L965 480"
          stroke="rgba(239, 228, 212, 0.08)"
          strokeWidth="1"
        />

        {/* Focused Jaguar Eyes — subtle atmospheric amber gaze */}
        <g opacity="0.68">
          <path
            d="M524 346L648 380L602 418L530 384L524 346Z"
            fill="#141312"
            fillOpacity="0.65"
            stroke="#C48F56"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <circle cx="592" cy="382" r="21" fill="url(#heroAmberIris)" />
          <ellipse cx="592" cy="382" rx="4.5" ry="15" fill="#0A0A09" />
          <circle cx="598" cy="375" r="2.5" fill="#EFE4D4" fillOpacity="0.55" />

          <path
            d="M916 346L792 380L838 418L910 384L916 346Z"
            fill="#141312"
            fillOpacity="0.65"
            stroke="#C48F56"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <circle cx="848" cy="382" r="21" fill="url(#heroAmberIris)" />
          <ellipse cx="848" cy="382" rx="4.5" ry="15" fill="#0A0A09" />
          <circle cx="854" cy="375" r="2.5" fill="#EFE4D4" fillOpacity="0.55" />
        </g>

        {/* Precision target ring */}
        <circle
          cx="720"
          cy="370"
          r="250"
          stroke="rgba(196, 143, 86, 0.10)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />

        {/* Muzzle bridge */}
        <path
          d="M720 270V496M664 510L720 558L776 510H664Z"
          stroke="rgba(196, 143, 86, 0.22)"
          strokeWidth="1.1"
        />
      </svg>

      {/* Dark vignette overlay for maximum centered text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,9,0.72) 0%, rgba(10,10,9,0.48) 48%, rgba(10,10,9,0.88) 100%)",
        }}
      />
    </div>
  );
}
