"use client";

import type { AnchorHTMLAttributes, CSSProperties, MouseEventHandler } from "react";
import Link from "next/link";
import { WandSparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type GlassmorphismCtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string;
  spread?: string;
  shimmerColor?: string;
  speed?: string;
  size?: "sm" | "md" | "lg";
  asSpan?: boolean;
};

export default function GlassmorphismCta({
  label = "Configurar meu projeto",
  spread = "90deg",
  shimmerColor = "rgba(216,173,123,0.75)",
  speed = "4s",
  size = "md",
  asSpan = false,
  className,
  href = "/configurar-projeto",
  onClick,
  style,
  ...props
}: GlassmorphismCtaProps) {
  const innerPadding =
    size === "sm"
      ? "gap-2 text-sm py-2 px-4"
      : size === "lg"
        ? "gap-3 text-base md:text-[17px] py-3.5 px-6"
        : "gap-2.5 text-[15px] py-2.5 px-5";

  const iconBoxDim = size === "sm" ? "w-6 h-6" : "w-7 h-7";

  const sharedClass = cn(
    "group isolate inline-flex cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_6px_rgba(196,143,86,0.38)] rounded-full relative shadow-[0_8px_36px_rgba(196,143,86,0.22)]",
    className,
  );

  const sharedStyle = {
    "--spread": spread,
    "--shimmer-color": shimmerColor,
    "--radius": "9999px",
    "--speed": speed,
    "--cut": "1px",
    "--bg": "rgba(255, 255, 255, 0.05)",
    ...style,
  } as CSSProperties;

  const content = (
    <>
      <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="block absolute inset-[-200%] w-[400%] h-[400%] [animation:rotate-gradient_var(--speed)_linear_infinite]">
          <span className="block absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </span>
      </span>
      <span
        className="absolute rounded-full [background:var(--bg)] [inset:var(--cut)] backdrop-blur pointer-events-none"
        aria-hidden="true"
      />
      <span
        className={cn(
          "z-10 flex w-full overflow-hidden font-medium text-[#F5F0E8] relative items-center justify-center text-center leading-none",
          innerPadding,
        )}
        style={{ borderRadius: "9999px" }}
      >
        <span
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            width: "200%",
            height: "200%",
            background:
              "linear-gradient(90deg, transparent, rgba(216,173,123,0.22), rgba(245,240,232,0.24), rgba(216,173,123,0.22), transparent)",
            animation: "borderBeamRotation 4s infinite linear",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <span
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            inset: "1px",
            background: "rgba(10, 10, 9, 0.86)",
            borderRadius: "9999px",
            backdropFilter: "blur(8px)",
          }}
        />
        <span className="whitespace-nowrap relative z-10 font-sans tracking-[-0.01em] leading-none">
          {label}
        </span>
        <span
          className={cn(
            "inline-flex items-center justify-center z-10 bg-[#C48F56]/20 ring-1 ring-[#D8AD7B]/30 rounded-full relative flex-none transition-transform duration-300 group-hover:rotate-12",
            iconBoxDim,
          )}
        >
          <WandSparkles className="w-[15px] h-[15px] text-[#D8AD7B]" strokeWidth={1.6} />
        </span>
      </span>
    </>
  );

  if (asSpan) {
    return (
      <span className={sharedClass} style={sharedStyle}>
        {content}
      </span>
    );
  }

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (href === "#") event.preventDefault();
    onClick?.(event);
  };

  if (href.startsWith("/")) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={sharedClass}
        style={sharedStyle}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={sharedClass}
      style={sharedStyle}
      {...props}
    >
      {content}
    </a>
  );
}
