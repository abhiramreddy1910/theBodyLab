import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Toast from "../components/Toast.jsx";
import { clearSession, getProfile, setProfile } from "../lib/storage.js";
import Input from "../components/Input.jsx";
import { initials } from "../lib/format.js";

export default function Profile() {
  const nav = useNavigate();
  const existing = getProfile();
  const [toast, setToast] = useState("");

  const [edit, setEdit] = useState({
    name: existing?.name ?? "Demo User",
    email: existing?.email ?? "demo@bodylab.com",
    username: existing?.username ?? "demo_user",
    height: existing?.height ?? "",
    weight: existing?.weight ?? ""
  });

  const avatar = useMemo(() => initials(edit.name), [edit.name]);

  function save() {
    setProfile({ ...(existing ?? {}), ...edit });
    setToast("Saved (local only).");
  }

  function logout() {
    clearSession();
    nav("/");
  }

  return (
    <div className="grid gap-4">
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-emerald-500 text-zinc-950 flex items-center justify-center text-xl font-black glow">
            {avatar}
          </div>
          <div>
            <div className="text-xl font-semibold">{edit.name}</div>
            <div className="text-sm text-zinc-400">@{edit.username}</div>
          </div>
        </div>
      </Card>

      <Card className="p-5 grid gap-3">
        <Input label="Name" value={edit.name} onChange={(e) => setEdit((p) => ({ ...p, name: e.target.value }))} />
        <Input label="Email" value={edit.email} onChange={(e) => setEdit((p) => ({ ...p, email: e.target.value }))} />
        <Input label="Username" value={edit.username} onChange={(e) => setEdit((p) => ({ ...p, username: e.target.value }))} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Height" value={edit.height} onChange={(e) => setEdit((p) => ({ ...p, height: e.target.value }))} />
          <Input label="Weight" value={edit.weight} onChange={(e) => setEdit((p) => ({ ...p, weight: e.target.value }))} />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <Button onClick={save}>Save</Button>
          <Button variant="danger" onClick={logout}>
            Log out
          </Button>
        </div>

        <div className="text-xs text-zinc-500">
          Demo only. All data is stored in your browser localStorage.
        </div>
      </Card>

      <Toast open={!!toast} message={toast} onClose={() => setToast("")} />
    </div>
  );
}
