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

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "unauthorized") {
      toast.error("Login in to access!", {
        duration: 4000,
        position: "top-center",
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email === "admin@gmail.com" && password === "123") {
        document.cookie = "auth-token=demo-token-123; path=/; max-age=86400";
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {error && (
        <div className="text-sm text-red-700 bg-red-50 p-2 rounded-md border border-red-100">
          {error}
        </div>
      )}

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
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            EMR Hospital
          </h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-4">Loading login form...</div>
          }
        >
          <LoginFormContent />
        </Suspense>
      </div>
    </div>
  );
}
