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
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-zinc-400">
          Anonymous login is disabled. Please continue with Google.
        </p>

        {error && (
          <div className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded p-3">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2 rounded bg-white text-black font-medium hover:bg-zinc-200 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Continue with Google"}
        </button>
        </div>
      </div>
    </div>
  );
}
