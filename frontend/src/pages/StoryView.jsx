
import { useParams } from "react-router-dom";
import { dummyStories } from "../data/dummystories";

export default function StoryView() {
  const { id } = useParams();
  const story = dummyStories.find(s => s.id === id);

  if (!story) {
    return <div className="p-6 text-white">Story not found.</div>;
  }

  return (
    <div className="p-6 text-white space-y-4">
      <p>{story.content}</p>
      <p className="text-sm text-zinc-400">
        Location: {story.location}
      </p>
    </div>
  );
}
