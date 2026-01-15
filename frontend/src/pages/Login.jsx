import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-default p-6 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-scanlines opacity-20 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md bg-[#111111] border border-gray-800 rounded-xl p-8 space-y-6 shadow-2xl shadow-red-900/10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary tracking-widest uppercase text-glow">Sign in</h1>
          <p className="text-gray-400 text-sm tracking-wider">
            Clearance Level 1 Required
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-300 bg-red-900/20 border border-red-800/50 rounded p-4">
            {error}
          </div>
        )}

        <div className="pt-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all border border-zinc-700 hover:border-zinc-500 flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <span className="relative z-10">{loading ? "Authenticating..." : "Continue with Google"}</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="text-center text-xs text-gray-600 uppercase tracking-widest pt-4">
          Property of Hawkins National Laboratory
        </div>
      </div>
    </div>
  );
}
