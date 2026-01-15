import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import TopNav from "../components/TopNav";
import GlitchButton from "../components/GlitchButton";
import { auth, db } from "../firebase/config";

export default function Profile() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scheduledMeetings = [];

  useEffect(() => {
    async function fetchUserStories() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const storiesRef = collection(db, "stories_private");
        const userStoriesQuery = query(
          storiesRef,
          where("userId", "==", currentUser.uid)
        );
        const snapshot = await getDocs(userStoriesQuery);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(data);
      } catch (error) {
        console.error("Error fetching user stories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserStories();
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-default p-6 space-y-4 relative">
      <div className="fixed inset-0 -z-10 bg-scanlines opacity-10 pointer-events-none" />
      <TopNav />
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-primary tracking-widest uppercase text-glow">Personal Archives</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/submit"
            className="px-5 py-2 rounded bg-primary text-white font-semibold hover:bg-red-600 transition-all shadow-lg shadow-red-900/30 text-sm tracking-wide transform hover:scale-105"
          >
            NEW TRANSMISSION
          </Link>
          <button
            type="button"
            onClick={() => signOut(auth)}
            className="px-5 py-2 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 hover:bg-white/5 transition-all text-sm tracking-wide uppercase"
          >
            Terminate Session
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-zinc-400">Loading your submissions…</p>
      )}

      {!loading && stories.length === 0 && (
        <p className="text-zinc-500 italic">
          You haven’t shared any stories yet.
        </p>
      )}

      {!loading &&
        stories.map((story) => (
          <div key={story.id} className="p-6 bg-[#111] border border-gray-800 rounded-lg hover:border-gray-600 transition-all shadow-lg group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-xl font-semibold text-gray-200 group-hover:text-primary transition-colors">{story.title ?? story.storyText ?? story.content}</p>
            {story.content && (
              <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                {story.content}
              </p>
            )}
          </div>
        ))}

      <div className="pt-4 border-t border-zinc-800 space-y-3">
        <h2 className="text-xl font-semibold">Meetings</h2>
        {scheduledMeetings.length === 0 ? (
          <p className="text-zinc-500 italic">
            No meetings are scheduled right now.
          </p>
        ) : (
          <div className="space-y-3">
            {scheduledMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 bg-[#111] border border-gray-800 rounded-lg flex flex-wrap items-center justify-between gap-3 hover:border-accent/50 transition-colors shadow-lg"
              >
                <div>
                  <p className="text-lg font-medium text-gray-200">{meeting.title}</p>
                  <p className="text-sm text-accent">{meeting.startsAt}</p>
                </div>
                <a
                  href={meeting.joinUrl}
                  className="px-4 py-2 rounded bg-primary hover:bg-red-600 text-white text-sm font-semibold shadow-md transition-all"
                >
                  JOIN SIGNAL
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
