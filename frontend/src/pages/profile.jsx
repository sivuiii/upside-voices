import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function Profile() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserStories() {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const storiesRef = collection(db, "stories_public");
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
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your stories</h1>

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
          <div key={story.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded">
            <p className="text-lg">{story.storyText ?? story.content}</p>
            {(story.fictionalLocation ?? story.location) && (
              <p className="text-sm text-zinc-400 mt-2">
                Location: {story.fictionalLocation ?? story.location}
              </p>
            )}
          </div>
        ))}
    </div>
  );
}
