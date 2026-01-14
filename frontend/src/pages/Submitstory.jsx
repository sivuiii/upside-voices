import { useState } from "react";

export default function Submitstory() {
  const [fullStory, setFullStory] = useState({
    content: "",
    location: "",
    informAuthorities: false,
    openToConference: false,
  });

  const [publicStory, setPublicStory] = useState({
    content: "",
    location: "",
  });

  return (
  <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* LEFT: INPUT */}
    <div className="space-y-4">
      <h1 className="text-xl">Write your story</h1>
    </div>

    {/* RIGHT: PREVIEW */}
    <div className="bg-zinc-900 p-4 rounded space-y-3">
      <h2 className="text-sm text-zinc-400">
        This is exactly what will be public
      </h2>

      {publicStory.content ? (
        <>
          <p>{publicStory.content}</p>
          {publicStory.location && (
            <p className="text-sm text-zinc-400">
              Location: {publicStory.location}
            </p>
          )}
        </>
      ) : (
        <p className="text-zinc-500 italic">
          Your public preview will appear here.
        </p>
      )}
    </div>

  </div>
);

}
