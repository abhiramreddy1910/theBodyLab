import React, { useEffect } from "react";

export default function Toast({ message, open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 2200);
    return () => clearTimeout(t);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm shadow-soft">
        {message}
      </div>
    </div>
  );
}
