"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/admin";
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-5 shadow-lg sm:p-6">
        <h2 className="text-center text-lg font-bold sm:text-xl">
          Admin Access
        </h2>

        <input
          type="password"
          placeholder="Enter password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button onClick={handleLogin} className="btn-primary w-full">
          Enter
        </button>
      </div>
    </div>
  );
}
