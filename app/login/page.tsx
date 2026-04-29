"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include", // IMPORTANT
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 border rounded space-y-3 w-80">
        <h2 className="text-lg font-bold text-center">
          Admin Access
        </h2>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2"
        >
          Enter
        </button>
      </div>
    </div>
  );
}