import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid">
      <div className="mx-auto max-w-md px-4 pt-14 pb-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center text-2xl font-black glow">
            BL
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">BodyLab</h1>
          <p className="mt-2 text-zinc-300">
            Luxury preventive health — <span className="text-emerald-300">powered by data</span>.
          </p>
        </div>

        <Card className="mt-10 p-5">
          <div className="text-sm text-zinc-300">
            Demo app for presentations: onboarding, dashboard, booking, membership — no backend needed.
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3">
            <Button onClick={() => nav("/signup")}>Join Us</Button>
            <Button variant="secondary" onClick={() => nav("/signin")}>
              Sign In
            </Button>
          </div>

          <div className="mt-4 text-xs text-zinc-500">
            Note: FaceID/Fingerprint buttons are UI-only in this demo.
          </div>
        </Card>

        <div className="mt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} BodyLab • Demo UI
        </div>
      </div>
    </div>
  );
}
