import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Submitstory from "./pages/Submitstory";
import StoryView from "./pages/StoryView";
import Profile from "./pages/profile";
import MapPage from "./components/map";
import Login from "./pages/Login";
import SceneFX from "./components/SceneFX";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authReady) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-400 flex items-center justify-center">
        Checking session…
      </div>
    );
  }

  return (
    <div className="app-shell">
      <ThemeSwitcher />
      <SceneFX />
      <div className="app-content">
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/submit" element={<Submitstory />} />
              <Route path="/story/:id" element={<StoryView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/map" element={<MapPage />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </div>
    </div>
  );
}