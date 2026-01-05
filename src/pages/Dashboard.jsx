import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { PERSONAS, metricsForPersona } from "../lib/mockData.js";
import { getBookings, getDemoMode } from "../lib/storage.js";

function MetricCard({ label, value, unit, trend }) {
  const up = trend?.startsWith("+");
  return (
    <Card className="p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <div className="text-2xl font-semibold">
          {value}
          <span className="text-sm text-zinc-400 ml-1">{unit}</span>
        </div>
        <div className={`text-xs ${up ? "text-emerald-300" : "text-zinc-400"}`}>
          {trend}
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const [persona, setPersona] = useState(getDemoMode().persona);
  const [bookings, setBookings] = useState(getBookings());

  useEffect(() => {
    const onMode = () => setPersona(getDemoMode().persona);
    window.addEventListener("bodylab_demo_mode_changed", onMode);
    return () => window.removeEventListener("bodylab_demo_mode_changed", onMode);
  }, []);

  useEffect(() => {
    const onStorage = () => setBookings(getBookings());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const personaMeta = useMemo(
    () => PERSONAS.find((p) => p.id === persona) ?? PERSONAS[0],
    [persona]
  );

  const m = useMemo(() => metricsForPersona(persona), [persona]);

  return (
    <div className="grid gap-4">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-zinc-400">Demo Persona</div>
            <div className="text-lg font-semibold">{personaMeta.name}</div>
            <div className="text-sm text-zinc-400 mt-1">{personaMeta.subtitle}</div>
          </div>

          <div className="text-right">
            <div className="text-xs text-zinc-400">Daily Body Score</div>
            <div className="text-4xl font-bold text-emerald-300">{m.bodyScore}</div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
          <div className="text-xs text-zinc-400">Suggested next action (demo)</div>
          <div className="mt-1 text-sm text-zinc-200">
            {persona === "strain"
              ? "Recovery looks stressed — consider a lighter day and book a recovery service."
              : persona === "recovery"
              ? "You’re trending strong — schedule a performance session or consult."
              : "Solid balance — keep consistency and book 1–2 recovery sessions this week."}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Sleep" value={m.sleep.v} unit={m.sleep.unit} trend={m.sleep.trend} />
        <MetricCard label="Recovery" value={m.recovery.v} unit={m.recovery.unit} trend={m.recovery.trend} />
        <MetricCard label="Strain" value={m.strain.v} unit={m.strain.unit} trend={m.strain.trend} />
        <MetricCard label="Calories" value={m.calories.v} unit={m.calories.unit} trend={m.calories.trend} />
        <MetricCard label="Steps" value={m.steps.v} unit={m.steps.unit} trend={m.steps.trend} />
        <Card className="p-4">
          <div className="text-xs text-zinc-400">Wearables</div>
          <div className="mt-2 text-sm text-zinc-200">WHOOP • Apple Health • Oura</div>
          <div className="mt-2">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => alert("Demo: wearable connect is UI-only.")}
            >
              Connect
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Recent Bookings</div>
            <div className="text-xs text-zinc-400 mt-1">Stored locally on this device</div>
          </div>
          <Button variant="secondary" onClick={() => setBookings(getBookings())}>
            Refresh
          </Button>
        </div>

        <div className="mt-4 grid gap-2">
          {bookings.length === 0 ? (
            <div className="text-sm text-zinc-400">No bookings yet. Book a service to see it here.</div>
          ) : (
            bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-semibold">{b.serviceName}</div>
                  <div className="text-xs text-zinc-400">{b.date} • {b.time}</div>
                </div>
                <div className="text-xs text-emerald-300">{b.badge}</div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
