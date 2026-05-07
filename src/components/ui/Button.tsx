import * as React from "react";
import { cn } from "@/lib/cn";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-300 text-black shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_40px_rgba(236,72,153,0.25)] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.55),0_0_60px_rgba(236,72,153,0.35)]",
  secondary:
    "bg-white/5 text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:bg-white/10",
  ghost:
    "bg-transparent text-zinc-100 hover:bg-white/5 shadow-none",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

