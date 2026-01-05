import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomTabs from "./BottomTabs.jsx";
import TopBar from "./TopBar.jsx";

function titleFromPath(pathname) {
  if (pathname.includes("/dashboard")) return "Health Snapshot";
  if (pathname.includes("/services")) return "Services";
  if (pathname.includes("/membership")) return "Membership";
  if (pathname.includes("/profile")) return "Profile";
  return "BodyLab";
}

export default function AppShell() {
  const loc = useLocation();
  const title = titleFromPath(loc.pathname);

  return (
    <div className="min-h-screen bg-zinc-950">
      <TopBar title={title} />
      <div className="mx-auto max-w-md px-4 pt-4 pb-24">
        <Outlet />
      </div>
      <BottomTabs />
    </div>
  );
}
