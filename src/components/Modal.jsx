import React, { useEffect } from "react";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-x-0 top-10 mx-auto w-[92%] max-w-lg">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 shadow-soft">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
            <div className="text-base font-semibold">{title}</div>
            <button
              className="rounded-lg px-2 py-1 text-zinc-300 hover:bg-zinc-900"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
