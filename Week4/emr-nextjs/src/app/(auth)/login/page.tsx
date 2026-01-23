"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputField from "@/components/ui/InputField";
import { toast, Toaster } from "react-hot-toast";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "unauthorized") {
      toast.error("Login to access!", {
        duration: 4000,
        position: "top-center",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${base_url}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access_token", data.access_token);
        document.cookie = `auth-token=${data.access_token}; Path=/; Max-Age=86400; SameSite=Lax`;
        router.push("/dashboard");
      } else {
        setLoading(false);
        setError(data.message || "Email or password invalid");
      }
    } catch (err) {
      setError("Cannot connect to Server (Port 3001)");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Email" type="email" value={email} onChange={setEmail} />
      <InputField label="Password" type="password" value={password} onChange={setPassword} />

      {error && <div className="text-sm text-red-700 bg-red-50 p-2 rounded-md border border-red-100">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
        <Toaster />
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto bg-blue-600 text-white rounded-lg flex items-center justify-center text-2xl shadow">
            🏥
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">EMR Hospital</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <Suspense fallback={<div className="text-center py-4">Loading login form...</div>}>
          <LoginFormContent />
        </Suspense>
      </div>
    </div>
  );
}
