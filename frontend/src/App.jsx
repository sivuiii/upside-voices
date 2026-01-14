import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase/config";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Submitstory from "./pages/Submitstory";
import StoryView from "./pages/StoryView";
import profile from "./pages/profile";

export default function App() {
  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.error("Anonymous auth failed:", error);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/submit" element={<Submitstory />} />
      <Route path="/story/:id" element={<StoryView />} />
      <Route path="/profile" element={<profile />} />
    </Routes>
  );
}
