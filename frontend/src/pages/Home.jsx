import { dummyStories } from "../data/dummystories";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-xl">Stories from Hawkins</h1>

      {dummyStories.map((story) => (
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
