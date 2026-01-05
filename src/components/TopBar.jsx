import React from "react";
import Button from "./Button.jsx";
import { PERSONAS } from "../lib/mockData.js";
import { getDemoMode, setDemoMode } from "../lib/storage.js";

export default function TopBar({ title }) {
  const mode = getDemoMode();

  function onChangePersona(e) {
    setDemoMode({ persona: e.target.value });
    window.dispatchEvent(new Event("bodylab_demo_mode_changed"));
  }

  return (
    <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur border-b border-zinc-900">
      <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-zinc-400">BodyLab</div>
          <div className="text-lg font-semibold">{title}</div>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-zinc-100 outline-none"
            value={mode.persona}
            onChange={onChangePersona}
            title="Demo Persona"
          >
            {PERSONAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <Button
            variant="secondary"
            className="px-3"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Scroll to top"
          >
            ↑
          </Button>
        </div>
      </div>
    </div>
  );
}
