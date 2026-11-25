import React from "react";

interface JagwarLogoProps {
  layout?: "horizontal" | "stacked";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function JagwarEmblem({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="jagwarGold"
          x1="8"
          y1="8"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#D8A874" />
          <stop offset="52%" stopColor="#C48F56" />
          <stop offset="100%" stopColor="#9E6D3B" />
        </linearGradient>
      </defs>

      {/* Outer symmetric geometric jaguar head silhouette */}
      <path
        d="M15 11L23 17H41L49 11L53 23L49 36L41 49L32 55L23 49L15 36L11 23L15 11Z"
        stroke="url(#jagwarGold)"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />

      {/* Inner ear notches */}
      <path
        d="M15 11L18 22L23 17M49 11L46 22L41 17"
        stroke="url(#jagwarGold)"
        strokeWidth="1.25"
        strokeLinejoin="miter"
      />

      {/* Brow & cranial symmetry lines */}
      <path
        d="M23 17L27 27L32 23L37 27L41 17"
        stroke="url(#jagwarGold)"
        strokeWidth="1.25"
        strokeLinejoin="miter"
      />

      {/* Focused predator eyes */}
      <path
        d="M19 29L27 31.5L23 34L19 29Z"
        fill="url(#jagwarGold)"
      />
      <path
        d="M45 29L37 31.5L41 34L45 29Z"
        fill="url(#jagwarGold)"
      />

      {/* Cheekbone structural facets */}
      <path
        d="M15 36L24 38.5L27 45M49 36L40 38.5L37 45"
        stroke="url(#jagwarGold)"
        strokeWidth="1.15"
        strokeOpacity="0.85"
      />

      {/* Nose bridge and muzzle */}
      <path
        d="M32 23V39M28 40L32 43.5L36 40H28Z"
        stroke="url(#jagwarGold)"
        strokeWidth="1.35"
        strokeLinejoin="miter"
      />

      {/* Chin vertical precision mark */}
      <path
        d="M32 43.5V55"
        stroke="url(#jagwarGold)"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function JagwarLogo({
  layout = "horizontal",
  size = "md",
  className = "",
}: JagwarLogoProps) {
  const sizes = {
    sm: {
      emblem: "w-8 h-8",
      wordmark: "text-sm sm:text-base tracking-[0.26em]",
      subtitle: "text-[8px] tracking-[0.28em]",
      gap: layout === "horizontal" ? "gap-3" : "gap-2",
    },
    md: {
      emblem: "w-9 h-9",
      wordmark: "text-base sm:text-lg tracking-[0.28em]",
      subtitle: "text-[8.5px] sm:text-[9px] tracking-[0.3em]",
      gap: layout === "horizontal" ? "gap-3.5" : "gap-2.5",
    },
    lg: {
      emblem: "w-11 h-11",
      wordmark: "text-xl tracking-[0.3em]",
      subtitle: "text-[10px] tracking-[0.34em]",
      gap: layout === "horizontal" ? "gap-4" : "gap-3",
    },
  }[size];

  return (
    <div
      className={`inline-flex ${
        layout === "stacked"
          ? "flex-col items-center text-center"
          : "flex-row items-center text-left"
      } ${sizes.gap} ${className}`}
    >
      <JagwarEmblem className={`${sizes.emblem} shrink-0`} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-medium uppercase text-[#F5F0E8] ${sizes.wordmark}`}
        >
          JAGWAR
        </span>
        <span
          className={`mt-1.5 font-display font-normal uppercase text-[#C48F56] ${sizes.subtitle}`}
        >
          PERFORMANCE &amp; GROWTH
        </span>
      </div>
    </div>
  );
}
