import React, { useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Toast from "../components/Toast.jsx";
import { MEMBERSHIPS } from "../lib/mockData.js";

export default function Membership() {
  const [toast, setToast] = useState("");

  return (
    <div className="grid gap-4">
      <Card className="p-5">
        <div className="text-sm text-zinc-400">Your Plan</div>
        <div className="text-xl font-semibold mt-1">Founding Member</div>
        <div className="mt-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-300">
          Demo view: This is a presentation-only subscription screen. Payments are not enabled.
        </div>
      </Card>

      <div className="grid gap-3">
        {MEMBERSHIPS.map((m) => (
          <Card key={m.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{m.name}</div>
                <div className="text-sm text-emerald-300 mt-1">{m.price}</div>
                <ul className="mt-3 text-sm text-zinc-300 list-disc ml-5 space-y-1">
                  {m.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <Button
                variant="secondary"
                onClick={() => setToast(`Demo: selected ${m.name} (UI only).`)}
              >
                Select
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Toast open={!!toast} message={toast} onClose={() => setToast("")} />
    </div>
  );
}
