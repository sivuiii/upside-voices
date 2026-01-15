import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const snapshot = await getDocs(collection(db, "stories_public"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.15),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="relative p-6 md:p-10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-red-400/80">Upside Voices</p>
              <h1 className="text-3xl md:text-4xl font-semibold">
                The Hawkins Signal Board
              </h1>
              <p className="text-zinc-400 mt-2 max-w-xl">
                Anonymous echoes from the Upside Down. Read, listen, and leave a trace.
              </p>
            </div>
            <Link
              to="/profile"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2 border border-red-500/50 rounded-full text-sm text-red-100 hover:bg-red-500/10"
            >
              Profile
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/submit"
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
            >
              Share a story
            </Link>
            <Link
              to="/map"
              className="px-4 py-2 rounded border border-zinc-700 text-zinc-200 text-sm hover:border-red-500/60"
            >
              View Hawkins map
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-4">
        <h2 className="text-lg uppercase tracking-[0.35em] text-zinc-400">Recent stories</h2>

        {loading && (
          <p className="text-zinc-400">Listening for stories…</p>
        )}

        {!loading && stories.length === 0 && (
          <p className="text-zinc-500 italic">
            No stories have been shared yet.
          </p>
        )}

        {!loading &&
          stories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="block p-4 bg-zinc-900/70 border border-zinc-800 rounded-lg hover:border-red-500/40 transition"
            >
              <p className="line-clamp-2 text-lg">{story.storyText ?? story.content}</p>
              {(story.fictionalLocation ?? story.location) && (
                <p className="text-sm text-zinc-400 mt-2">
                  Location: {story.fictionalLocation ?? story.location}
                </p>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
}
