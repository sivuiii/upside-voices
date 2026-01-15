import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
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
      <TopNav />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Your stories</h1>
        <Link
          to="/submit"
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
        >
          Share a story
        </Link>
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
          <div key={story.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded">
            <p className="text-lg">{story.storyText ?? story.content}</p>
            {(story.fictionalLocation ?? story.location) && (
              <p className="text-sm text-zinc-400 mt-2">
                Location: {story.fictionalLocation ?? story.location}
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
                className="p-4 bg-zinc-900 border border-zinc-800 rounded flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <p className="text-lg">{meeting.title}</p>
                  <p className="text-sm text-zinc-400">{meeting.startsAt}</p>
                </div>
                <a
                  href={meeting.joinUrl}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
                >
                  Join meeting
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
