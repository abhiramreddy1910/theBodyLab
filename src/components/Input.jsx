import React from "react";

export default function Input({ label, hint, className = "", ...props }) {
  return (
    <label className="block">
      {label ? <div className="mb-1 text-sm text-zinc-200">{label}</div> : null}
      <input
        className={`w-full rounded-xl bg-zinc-950/60 border border-zinc-800 px-3 py-2 text-sm outline-none focus:border-emerald-500 ${className}`}
        {...props}
      />
      {hint ? <div className="mt-1 text-xs text-zinc-400">{hint}</div> : null}
    </label>
  );
}
