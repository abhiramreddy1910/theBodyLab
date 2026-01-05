import React from "react";

export default function Stepper({ steps, currentIndex }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const active = i === currentIndex;
        const done = i < currentIndex;
        return (
          <div key={s} className="flex items-center gap-2">
            <div
              className={[
                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border",
                done
                  ? "bg-emerald-500 text-zinc-950 border-emerald-400"
                  : active
                  ? "bg-zinc-900 text-emerald-300 border-emerald-700"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800"
              ].join(" ")}
              title={s}
            >
              {done ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 ? (
              <div className={`h-px w-8 ${done ? "bg-emerald-500/70" : "bg-zinc-800"}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
