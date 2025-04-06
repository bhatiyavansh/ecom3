"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import signin from "@/app/actions/signin";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signin(form.email, form.password);
    localStorage.setItem("userId", res.user?.id?.toString() ?? ""); // 👈 save user ID
    localStorage.setItem("userRole", res.user?.role ?? "");
    if (res && res.success) {
      console.log("User logged in:", res.user);
      if (res.role?.toString() === "BUYER") {
        router.push("/dashboard/buyer");
      } else if (res.role?.toString() === "SELLER") {
        router.push("/dashboard/seller");
      }
    } else {
      alert(res?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="text-black w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="text-black w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
