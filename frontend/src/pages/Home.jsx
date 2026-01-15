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
    <div className="relative min-h-screen bg-[#050505] text-gray-100">
      <div className="fixed inset-0 z-50 bg-scanlines opacity-20 pointer-events-none" />

      <div className="relative w-full">
        <div className="absolute inset-0 h-[600px] w-full overflow-hidden z-0">
          <img
            alt="Dark atmospheric street scene resembling Hawkins"
            className="w-full h-full object-cover object-center opacity-40 grayscale-[30%]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKiSitY2nMyoOzGO99ggN5sKXZIIkNeg3p8EIBi_PNonjuExv__Z5Yngf2DwG1c72zBkWGElI5BcrFsjPzHI6yoJV6w9JxYKUwFD-robl1YQqRQs30x3H7GyYU6ikahw9FGdOwjxkPVp_PHHMvh2E-evyjFSlwuvfD7GFrtPpPbLcshE6sTMyQ5gwYAVTQ0aDU4YFfm0eHC-2WWiHRb8NnpKrI3_EiGE49XA9-_V29I_PJ6BLIs94Sz1ztMdO8IZ-HrMk5smCrzm_w"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent" />
        </div>

        <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-[#dc2626] font-bold tracking-widest text-sm md:text-base opacity-0">
            HAWKINS
          </div>
          <Link
            to="/profile"
            className="px-5 py-2 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all text-sm font-medium backdrop-blur-sm bg-black/20"
          >
            Profile
          </Link>
        </header>

        <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-20">
          <div className="max-w-3xl">
            <p className="text-[#f87171] tracking-[0.3em] font-semibold text-sm mb-4 uppercase text-glow">
              Upside Voices
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              The Hawkins <br /> Signal Board
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Anonymous echoes from the Upside Down. Read, listen, and leave a trace before the gate closes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/submit"
                className="bg-[#dc2626] hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-lg shadow-red-900/20 transition-all transform hover:scale-105"
              >
                Share a story
              </Link>
              <Link
                to="/map"
                className="bg-transparent border border-gray-600 text-gray-200 hover:border-gray-400 hover:text-white font-medium py-3 px-8 rounded transition-all backdrop-blur-sm bg-black/30"
              >
                View Hawkins map
              </Link>
            </div>
          </div>
        </main>
      </div>

      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20 -mt-10">
        <div className="mb-6 border-b border-gray-800 pb-2">
          <h2 className="text-gray-400 uppercase tracking-[0.25em] text-sm font-semibold">
            Recent Stories
          </h2>
        </div>

        {loading && (
          <p className="text-gray-400">Listening for stories…</p>
        )}

        {!loading && stories.length === 0 && (
          <p className="text-gray-500 italic">No stories have been shared yet.</p>
        )}

        {!loading && (
          <div className="space-y-4">
            {stories.map((story) => (
              <Link
                key={story.id}
                to={`/story/${story.id}`}
                className="group bg-[#111111] border border-gray-800 hover:border-gray-600 rounded-lg p-5 transition-all duration-300 hover:bg-[#1a1a1a] cursor-pointer relative overflow-hidden block"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-[#6366f1] font-semibold text-xl mb-2 text-glow-blue group-hover:text-indigo-400">
                  {story.storyText ?? story.content}
                </h3>
                {(story.fictionalLocation ?? story.location) && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <span className="mr-2 opacity-70">Location:</span>
                    <span className="text-gray-300">
                      {story.fictionalLocation ?? story.location}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="w-full text-center py-8 text-gray-600 text-xs tracking-wider">
        <p>© 1986 HAWKINS SIGNAL BOARD. DO NOT DISTRIBUTE.</p>
      </footer>
    </div>
  );
}
