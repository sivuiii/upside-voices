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
    <div className="p-6 text-white space-y-4">
      <h1 className="text-xl">Stories from Hawkins</h1>

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
            className="block p-4 bg-zinc-800 rounded"
          >
            <p className="line-clamp-2">{story.content}</p>
          </Link>
        ))}
    </div>
  );
}
