import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-3xl font-semibold">404</div>
        <div className="mt-2 text-zinc-400">This page doesn’t exist.</div>
        <Link className="mt-6 inline-block text-emerald-300 hover:text-emerald-200" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
