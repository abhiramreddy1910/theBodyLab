import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Stepper from "../components/Stepper.jsx";
import Toast from "../components/Toast.jsx";
import { setProfile, setSession } from "../lib/storage.js";

const STEPS = ["Profile", "Body", "Goals", "Consent"];

export default function SignUp() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goals: [],
    consent1: false,
    consent2: false
  });

  const canNext = useMemo(() => {
    if (step === 0) {
      return (
        form.name.trim() &&
        form.email.trim() &&
        form.username.trim() &&
        form.password.trim() &&
        form.password2.trim() &&
        form.password === form.password2 &&
        form.age.trim() &&
        form.gender.trim()
      );
    }
    if (step === 1) return form.height.trim() && form.weight.trim();
    if (step === 2) return form.goals.length > 0;
    if (step === 3) return form.consent1 && form.consent2;
    return false;
  }, [form, step]);

  function update(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function toggleGoal(goal) {
    setForm((p) => {
      const has = p.goals.includes(goal);
      return { ...p, goals: has ? p.goals.filter((g) => g !== goal) : [...p.goals, goal] };
    });
  }

  function next() {
    if (!canNext) {
      setToast("Please complete this step to continue.");
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  }

  function back() {
    if (step === 0) return nav("/");
    setStep((s) => Math.max(0, s - 1));
  }

  function finish() {
    if (!canNext) {
      setToast("Please accept consent to continue.");
      return;
    }
    const profile = {
      name: form.name,
      email: form.email,
      username: form.username,
      age: Number(form.age),
      gender: form.gender,
      height: form.height,
      weight: form.weight,
      goals: form.goals
    };
    setProfile(profile);
    setSession({ isAuthed: true, userId: profile.username, method: "signup" });
    nav("/app/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid">
      <div className="mx-auto max-w-md px-4 pt-10 pb-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-zinc-400">Join BodyLab</div>
            <div className="text-xl font-semibold">Create your profile</div>
            <div className="mt-3">
              <Stepper steps={STEPS} currentIndex={step} />
            </div>
          </div>
          <button className="text-xs text-zinc-400 hover:text-zinc-200" onClick={() => nav("/")}>
            Close
          </button>
        </div>

        <Card className="mt-6 p-5">
          {step === 0 ? (
            <div className="grid gap-3">
              <Input label="Full Name" placeholder="Abhiram Reddy" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <Input label="Email" placeholder="abhiram@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <Input label="Username" placeholder="abhiram" value={form.username} onChange={(e) => update("username", e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Age" placeholder="24" value={form.age} onChange={(e) => update("age", e.target.value)} />
                <Input label="Gender" placeholder="Male/Female/Other" value={form.gender} onChange={(e) => update("gender", e.target.value)} />
              </div>
              <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} />
              <Input
                label="Retype Password"
                type="password"
                placeholder="••••••••"
                value={form.password2}
                onChange={(e) => update("password2", e.target.value)}
                hint={form.password2 && form.password !== form.password2 ? "Passwords must match." : ""}
              />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-3">
              <Input label="Height" placeholder="5'10 or 178 cm" value={form.height} onChange={(e) => update("height", e.target.value)} />
              <Input label="Weight" placeholder="165 lb or 75 kg" value={form.weight} onChange={(e) => update("weight", e.target.value)} />
              <div className="text-xs text-zinc-500">
                Demo UI: these values only personalize your profile screen.
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-3">
              <div className="text-sm text-zinc-200">What are your goals?</div>
              <div className="grid grid-cols-2 gap-3">
                {["Longevity", "Recovery", "Performance", "Weight Management", "Stress", "Sleep"].map((g) => {
                  const active = form.goals.includes(g);
                  return (
                    <button
                      key={g}
                      className={[
                        "rounded-xl border px-3 py-3 text-sm text-left transition",
                        active
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-200"
                          : "border-zinc-800 bg-zinc-950/40 text-zinc-200 hover:bg-zinc-900/40"
                      ].join(" ")}
                      onClick={() => toggleGoal(g)}
                      type="button"
                    >
                      <div className="font-semibold">{g}</div>
                      <div className="text-xs text-zinc-400 mt-1">Tap to {active ? "remove" : "select"}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-4">
              <div className="text-sm text-zinc-200">Consent</div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 text-xs text-zinc-300 leading-relaxed">
                This is a demo onboarding screen for presentations. It does not provide medical advice.
                You can customize this copy later with legal/clinical review.
              </div>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.consent1}
                  onChange={(e) => update("consent1", e.target.checked)}
                  className="mt-1 h-4 w-4 accent-emerald-500"
                />
                <span className="text-zinc-200">
                  I agree to the Terms and Privacy Policy (demo).
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.consent2}
                  onChange={(e) => update("consent2", e.target.checked)}
                  className="mt-1 h-4 w-4 accent-emerald-500"
                />
                <span className="text-zinc-200">
                  I consent to data processing for personalization (demo).
                </span>
              </label>
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={back}>
              Back
            </Button>

            {step < 3 ? (
              <Button onClick={next} disabled={!canNext}>
                Next
              </Button>
            ) : (
              <Button onClick={finish} disabled={!canNext}>
                Finish → Dashboard
              </Button>
            )}
          </div>
        </Card>

        <Toast open={!!toast} message={toast} onClose={() => setToast("")} />
      </div>
    </div>
  );
}
