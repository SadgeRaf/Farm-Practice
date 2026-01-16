"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { simpleLogin } from "@/app/cookie-auth";

export default function CheckPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple cookie login
  const handleSimpleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = simpleLogin(email, password);
    
    if (success) {
      router.push("/");
      router.refresh();
    } else {
      setError("Invalid credentials. Use admin@khanagro.com / monterwhite");
    }
    setLoading(false);
  };

  // GitHub login (your original working method)
  const handleGitHubLogin = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold text-green-700">Khan Agro</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* GitHub Login Button */}
        <div className="mb-6">
          <button
            onClick={handleGitHubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Simple Login Form */}
        <form onSubmit={handleSimpleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="admin@khanagro.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Admin Login"}
          </button>
        </form>

        <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            Admin Credentials:
          </h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>Email: admin@khanagro.com</li>
            <li>Password: monterwhite</li>
          </ul>
        </div>
      </div>
    </div>
  );
}