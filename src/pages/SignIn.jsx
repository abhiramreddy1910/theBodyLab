import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Toast from "../components/Toast.jsx";
import { getProfile, setSession } from "../lib/storage.js";

export default function SignIn() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  function doLogin(method) {
    const profile = getProfile();
    // frontend-only demo: any non-empty email/password works
    if (!email.trim() && method === "password") {
      setToast("Enter an email to continue.");
      return;
    }
    if (method === "password" && !password.trim()) {
      setToast("Enter a password to continue.");
      return;
    }

    const userId = profile?.username || email || "demo_user";
    setSession({ isAuthed: true, userId, method });
    nav("/app/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid">
      <div className="mx-auto max-w-md px-4 pt-10 pb-10">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-emerald-500 text-zinc-950 flex items-center justify-center font-black glow">
            BL
          </div>
          <div>
            <div className="text-sm text-zinc-400">Welcome back</div>
            <div className="text-xl font-semibold">Sign In</div>
          </div>
        </div>

        <Card className="mt-6 p-5">
          <div className="grid gap-3">
            <Input
              label="Email / Username"
              placeholder="abhiram@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={() => doLogin("password")}>Continue</Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => doLogin("faceid")}>
                Face ID
              </Button>
              <Button variant="secondary" onClick={() => doLogin("fingerprint")}>
                Fingerprint
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <button
                className="hover:text-zinc-200"
                onClick={() => setToast("Demo: password reset is UI-only.")}
              >
                Forgot password?
              </button>
              <Link className="hover:text-zinc-200" to="/signup">
                New here? Join Us
              </Link>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <button className="text-xs text-zinc-400 hover:text-zinc-200" onClick={() => nav("/")}>
            ← Back to Home
          </button>
        </div>

        <Toast open={!!toast} message={toast} onClose={() => setToast("")} />
      </div>
    </div>
  );
}
