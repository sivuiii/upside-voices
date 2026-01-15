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
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded max-w-md space-y-4 text-white">
        <h2 className="text-lg font-semibold">Trigger Warning</h2>

        <p className="text-sm text-zinc-300">
          This story may include content related to:
        </p>

        <ul className="list-disc list-inside text-sm text-zinc-400">
          {story.triggerTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <p className="text-xs text-zinc-500">
          Please continue only if you feel safe reading this.
        </p>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setAcknowledged(true)}
            className="px-4 py-2 bg-red-600 rounded"
          >
            I Understand
          </button>

          <button
            onClick={() => globalThis.history.back()}
            className="px-4 py-2 bg-zinc-700 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="p-6 text-white space-y-4">
      <TopNav />
      {story.title && (
        <h1 className="text-2xl font-semibold text-white">
          {story.title}
        </h1>
      )}
      <p className="whitespace-pre-wrap text-lg">
        {story.content ?? story.storyText}
      </p>
    </div>
  );
}
