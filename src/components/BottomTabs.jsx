import React from "react";
import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/app/dashboard", label: "Dashboard", icon: "⌁" },
  { to: "/app/services", label: "Services", icon: "✦" },
  { to: "/app/membership", label: "Membership", icon: "◇" },
  { to: "/app/profile", label: "Profile", icon: "☺" }
];

export default function BottomTabs() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto max-w-md px-4 py-2 flex justify-between">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            className={({ isActive }) =>
              [
                "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs transition",
                isActive ? "text-emerald-300 bg-zinc-900/60" : "text-zinc-300 hover:bg-zinc-900/40"
              ].join(" ")
            }
          >
            <div className="text-base leading-none">{t.icon}</div>
            <div>{t.label}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
