
import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import TopNav from "../components/TopNav";
import GlitchButton from "../components/GlitchButton";
import { detectTriggers } from "../utils/detectTriggers";


export default function Submitstory() {
  const [fullStory, setFullStory] = useState({
    title: "",
    content: "",
    personName: "",
    age: "",
    latitude: "",
    longitude: "",
    location: "",
    informAuthorities: false,
    openToConference: false,
  });

  const [publicStory, setPublicStory] = useState({
    title: "",
    content: "",
  });


  async function handleSubmit() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Please sign in to submit a story.");
      return;
    }

    if (!publicStory.title || !publicStory.content) {
      alert("Story title and content are required.");
      return;
    }

    try {
      const triggers = detectTriggers(publicStory.content);
      const storyId = crypto.randomUUID();

      const clamp01to100 = (value) => {
        const num = Number(value);
        if (!Number.isFinite(num)) return null;
        return Math.min(100, Math.max(0, num));
      };

      const lat = clamp01to100(fullStory.latitude);
      const lng = clamp01to100(fullStory.longitude);

      const coordinates =
        lat !== null && lng !== null
          ? {
            latitude: lat,
            longitude: lng,
          }
          : null;

      await setDoc(doc(db, "stories_public", storyId), {
        storyId,
        title: publicStory.title,
        content: publicStory.content,
        hasHotspot: Boolean(fullStory.informAuthorities && coordinates),
        hotspot: fullStory.informAuthorities && coordinates
          ? { lat: coordinates.latitude, lng: coordinates.longitude }
          : null,
        createdAt: serverTimestamp(),
      });

      await setDoc(doc(db, "stories_private", storyId), {
        storyId,
        title: fullStory.title,
        content: fullStory.content,
        personName: fullStory.personName,
        age: fullStory.age,
        coordinates,
        location: fullStory.location,
        userId: currentUser.uid,
        authorName: currentUser.displayName ?? "Anonymous",
        triggerTags: triggers,
        informAuthorities: fullStory.informAuthorities,
        openToConference: fullStory.openToConference,
        createdAt: serverTimestamp(),
      });


      alert("Story shared anonymously.");

      // Reset state
      setFullStory({
        title: "",
        content: "",
        personName: "",
        age: "",
        latitude: "",
        longitude: "",
        location: "",
        informAuthorities: false,
        openToConference: false,
      });

      setPublicStory({
        title: "",
        content: "",
      });
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission failed. Check console.");
    }
  }


  return (
    <div className="p-6 text-white grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <TopNav />
      </div>

      {/* LEFT: INPUT */}
      <div className="space-y-4">
        <h1 className="text-xl">Write your story</h1>

        <input
          className="w-full p-4 bg-black/40 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm"
          placeholder="Story title"
          value={fullStory.title}
          onChange={(e) => {
            const text = e.target.value;

            setFullStory((prev) => ({
              ...prev,
              title: text,
            }));

            setPublicStory((prev) => ({
              ...prev,
              title: text,
            }));
          }}
        />

        <textarea
          className="w-full h-40 p-4 bg-black/40 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm resize-none"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="w-full p-4 bg-black/40 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm"
            placeholder="Person's name (private)"
            value={fullStory.personName}
            onChange={(e) =>
              setFullStory((prev) => ({
                ...prev,
                personName: e.target.value,
              }))
            }
          />
          <input
            className="w-full p-4 bg-black/40 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm"
            placeholder="Age (private)"
            value={fullStory.age}
            onChange={(e) =>
              setFullStory((prev) => ({
                ...prev,
                age: e.target.value,
              }))
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="w-full p-4 bg-black/40 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm"
            placeholder="Latitude (private)"
            value={fullStory.latitude}
            onChange={(e) =>
              setFullStory((prev) => ({
                ...prev,
                latitude: e.target.value,
              }))
            }
          />
          <input
            className="w-full p-4 bg-black/40 border border-gray-700/50 rounded-lg text-gray-200 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-gray-600 backdrop-blur-sm"
            placeholder="Longitude (private)"
            value={fullStory.longitude}
            onChange={(e) =>
              setFullStory((prev) => ({
                ...prev,
                longitude: e.target.value,
              }))
            }
          />
        </div>

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
        <div className="pt-4">
          <GlitchButton onClick={handleSubmit} className="w-full md:w-auto">
            TRANSMIT SIGNAL
          </GlitchButton>
        </div>

      </div>


      {/* RIGHT: PREVIEW */}
      <div className="bg-zinc-900 p-4 rounded space-y-3">
        <h2 className="text-sm text-zinc-400">
          This is exactly what will be public
        </h2>

        {publicStory.content || publicStory.title ? (
          <>
            {publicStory.title && (
              <h3 className="text-lg font-semibold">{publicStory.title}</h3>
            )}
            {publicStory.content && <p>{publicStory.content}</p>}
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
