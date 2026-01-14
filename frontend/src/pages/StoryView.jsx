import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function StoryView() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      try {
        const ref = doc(db, "stories_public", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setStory(snap.data());
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
      <div className="p-6 text-zinc-400">
        Listening for the story…
      </div>
    );
  }

  if (!story) {
    return (
      <div className="p-6 text-zinc-500 italic">
        This story could not be found.
      </div>
    );
  }

  return (
    <div className="p-6 text-white space-y-4">
      <p className="whitespace-pre-wrap text-lg">
        {story.storyText}
      </p>

      {story.fictionalLocation && (
        <p className="text-sm text-zinc-400">
          Location: {story.fictionalLocation}
        </p>
      )}
    </div>
  );
}
