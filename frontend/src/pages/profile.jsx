import { dummyStories } from "../data/dummystories";

export default function Profile() {
  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-xl">Your stories</h1>

      {dummyStories.map(story => (
        <div key={story.id} className="p-4 bg-zinc-800 rounded">
          {story.content}
        </div>
      ))}
    </div>
  );
}
