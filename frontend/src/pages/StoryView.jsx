import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import TopNav from "../components/TopNav";

export default function StoryView() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);



  useEffect(() => {
    async function fetchStory() {
      try {
        const ref = doc(db, "stories_public", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setStory(data);

          if (data.triggerTags && data.triggerTags.length > 0) {
            setShowWarning(true);
          } else {
            // Auto-detect keywords for warning
            const KEYWORDS = {
              "violence": ["blood", "kill", "murder", "hurt", "knife", "gun", "attack", "dead", "death", "die", "suicide", "corpse", "gore"],
              "substance abuse": ["drug", "alcohol", "drunk", "high", "addiction", "pills", "weed", "cocaine", "overdose"],
              "psychological horror": ["scared", "terrified", "panic", "monster", "demon", "nightmare", "stalk", "insane", "madness"],
              "profanity": ["fuck", "shit", "bitch", "damn"]
            };

            const textToCheck = ((data.title || "") + " " + (data.content || data.storyText || "")).toLowerCase();
            const detectedTags = new Set();

            Object.entries(KEYWORDS).forEach(([category, keywords]) => {
              if (keywords.some(k => textToCheck.includes(k))) {
                detectedTags.add(category);
              }
            });

            if (detectedTags.size > 0) {
              // Update local data with detected tags to show in the modal
              data.triggerTags = Array.from(detectedTags);
              // Update state if we already set it, or rely on the fact that we modified the object reference if setStory wasn't deep copy? 
              // Actually setStory was called before. We should call it again or modify before.
              // The current code calls setStory(data) on line 24.
              // If I modify 'data' here, I should call setStory(data) again to be safe, or move this logic up.
              // Since I can't move line 24 easily with this tool without expanding context, I will update state.
              setStory({ ...data });
              setShowWarning(true);
            }
          }
        } else {
          setStory(null);
        }

      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-zinc-400 space-y-4">
        <TopNav />
        <div>Listening for the story…</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="p-6 text-zinc-500 italic space-y-4">
        <TopNav />
        <div>This story could not be found.</div>
      </div>
    );
  }
  if (showWarning && !acknowledged) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div className="relative bg-[#111] border-2 border-primary rounded-lg p-8 max-w-md space-y-6 text-white shadow-[0_0_50px_rgba(220,38,38,0.2)] overflow-hidden">
          <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />

          <h2 className="text-xl font-bold text-primary tracking-widest uppercase text-glow border-b border-gray-800 pb-2">Warning: Sensitive Content</h2>

          <p className="text-sm text-gray-300">
            Analysis indicates potential psychological hazards:
          </p>

          <ul className="list-disc list-inside text-sm text-red-400 font-mono bg-black/50 p-4 rounded border border-red-900/30">
            {story.triggerTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Proceed with caution.
          </p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setAcknowledged(true)}
              className="flex-1 px-4 py-2 bg-primary hover:bg-red-700 text-white font-bold rounded shadow-lg transition-all"
            >
              PROCEED
            </button>

            <button
              onClick={() => globalThis.history.back()}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded transition-all uppercase text-sm font-medium"
            >
              ABORT
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-transparent text-default p-6 space-y-6 relative">
      <div className="fixed inset-0 -z-10 bg-scanlines opacity-10 pointer-events-none" />
      <TopNav />
      <article className="max-w-3xl mx-auto bg-[#111] border border-gray-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        {story.title && (
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 tracking-wide text-glow border-b border-gray-800 pb-4">
            {story.title}
          </h1>
        )}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-light tracking-wide">
          <p className="whitespace-pre-wrap">
            {story.content ?? story.storyText}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
          <span>Signal Received: {new Date().toLocaleDateString()}</span>
          <span>End of Transmission</span>
        </div>
      </article>
    </div>
  );
}
