import { useState } from "react";

export default function SubmitStory() {
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
    <div className="p-6 text-white">
      Submit Story
    </div>
  );
}
