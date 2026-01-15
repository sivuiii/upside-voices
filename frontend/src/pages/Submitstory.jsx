
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { detectTriggers } from "../utils/detectTriggers";


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


 async function handleSubmit() {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    alert("Please sign in to submit a story.");
    return;
  }

  if (!publicStory.content || !publicStory.location) {
    alert("Story text and location are required.");
    return;
  }

  try {
    const triggers = detectTriggers(publicStory.content);

await addDoc(collection(db, "stories_public"), {
  storyId: crypto.randomUUID(),
  storyText: publicStory.content,
  fictionalLocation: publicStory.location,
  triggerTags: triggers,
  createdAt: serverTimestamp(),
});


    alert("Story shared anonymously.");

    // Reset state
    setFullStory({
      content: "",
      location: "",
      informAuthorities: false,
      openToConference: false,
    });

    setPublicStory({
      content: "",
      location: "",
    });
  } catch (err) {
    console.error("Submission failed:", err);
    alert("Submission failed. Check console.");
  }
}
 

  return (
  <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* LEFT: INPUT */}
   <div className="space-y-4">
  <h1 className="text-xl">Write your story</h1>

        <textarea
          className="w-full h-40 p-3 bg-zinc-800 rounded"
          placeholder="Write your story..."
          value={fullStory.content}
          onChange={(e) => {
            const text = e.target.value;

            setFullStory((prev) => ({
              ...prev,
              content: text,
            }));

      setPublicStory((prev) => ({
        ...prev,
        content: text,
      }));
    }}
  />

  <select
    className="w-full p-2 bg-zinc-800 rounded"
    value={fullStory.location}
    onChange={(e) => {
      const loc = e.target.value;

      setFullStory((prev) => ({
        ...prev,
        location: loc,
      }));

      setPublicStory((prev) => ({
        ...prev,
        location: loc,
      }));
    }}
  >
    <option value="">Select location</option>
    <option value="Hawkins High School">Hawkins High School</option>
    <option value="Starcourt Mall">Starcourt Mall</option>
    <option value="Byers House">Byers House</option>
  </select>

  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={fullStory.informAuthorities}
      onChange={(e) =>
        setFullStory((prev) => ({
          ...prev,
          informAuthorities: e.target.checked,
        }))
      }
    />
    <span>Inform relevant authorities</span>
  </label>

  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={fullStory.openToConference}
      onChange={(e) =>
        setFullStory((prev) => ({
          ...prev,
          openToConference: e.target.checked,
        }))
      }
    />
    <span>Open to anonymous group conference</span>
  </label>
  <button
  onClick={handleSubmit}
  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
>
  Submit
</button>

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
