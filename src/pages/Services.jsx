import React, { useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Modal from "../components/Modal.jsx";
import Toast from "../components/Toast.jsx";
import { SERVICES, timeSlots } from "../lib/mockData.js";
import { addBooking } from "../lib/storage.js";
import { nowISO } from "../lib/format.js";

function todayPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function Services() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(todayPlus(1));
  const [time, setTime] = useState("10:00 AM");
  const [toast, setToast] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SERVICES;
    return SERVICES.filter((s) => (s.name + " " + s.desc).toLowerCase().includes(q));
  }, [query]);

  function book() {
    if (!selected) return;
    addBooking({
      id: nowISO(),
      serviceId: selected.id,
      serviceName: selected.name,
      badge: selected.badge,
      date,
      time
    });
    setOpen(false);
    setToast("Booked! (Demo saved locally)");
  }

  return (
    <div className="grid gap-4">
      <Card className="p-4">
        <input
          className="w-full rounded-xl bg-zinc-950/60 border border-zinc-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          placeholder="Search services…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card>

      <div className="grid gap-3">
        {list.map((s) => (
          <Card key={s.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{s.name}</div>
                <div className="text-sm text-zinc-400 mt-1">{s.desc}</div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="rounded-full border border-zinc-800 bg-zinc-950/40 px-2 py-1 text-zinc-300">
                    {s.duration}
                  </span>
                  <span className="rounded-full border border-emerald-800 bg-emerald-500/10 px-2 py-1 text-emerald-200">
                    {s.badge}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelected(s);
                  setDate(todayPlus(1));
                  setTime("10:00 AM");
                  setOpen(true);
                }}
              >
                Book
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={open}
        title={selected ? `Book: ${selected.name}` : "Book"}
        onClose={() => setOpen(false)}
      >
        <div className="grid gap-4">
          <div className="text-sm text-zinc-300">
            Select a date and time (demo only).
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <div className="mb-1 text-sm text-zinc-200">Date</div>
              <select
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              >
                {[1,2,3,4,5].map((d) => {
                  const t = todayPlus(d);
                  return <option key={t} value={t}>{t}</option>;
                })}
              </select>
            </label>

            <label className="block">
              <div className="mb-1 text-sm text-zinc-200">Time</div>
              <select
                className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm outline-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {timeSlots().map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => alert("Demo: reschedule flows can be added.")}>
              Add note
            </Button>
            <Button onClick={book}>Confirm Booking</Button>
          </div>

          <div className="text-xs text-zinc-500">
            Tip: For a pitch, book 1 service and then jump to Dashboard to show it appears instantly.
          </div>
        </div>
      </Modal>

      <Toast open={!!toast} message={toast} onClose={() => setToast("")} />
    </div>
  );
}
