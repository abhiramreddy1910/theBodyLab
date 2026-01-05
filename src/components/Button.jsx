import React from "react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";
  const styles = {
    primary: "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 glow",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
    ghost: "bg-transparent text-zinc-100 hover:bg-zinc-800 border border-zinc-800",
    danger: "bg-red-500 text-zinc-950 hover:bg-red-400"
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
