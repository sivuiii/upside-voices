import { useEffect } from "react";

export default function ConferenceRoom({ groupId }) {

  const alias = "Participant-" + Math.floor(Math.random() * 9000);

  useEffect(() => {

    const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName: "UpsideVoices_" + groupId,
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        displayName: alias
      }
    });

    const timer = setTimeout(() => {
      api.dispose();
      alert("Session ended for safety.");
    }, 15 * 60 * 1000);

    return () => {
      clearTimeout(timer);
      api.dispose();
    };

  }, [groupId]);

  return (
    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 shadow-2xl">
      <p className="text-gray-300 mb-4 font-mono tracking-wide">
        Secure Link Established. Alias: <span className="text-primary font-bold text-glow">{alias}</span>
      </p>
      <div id="jitsi-container" className="w-full h-[500px] bg-black rounded-lg overflow-hidden border border-gray-700 shadow-inner"></div>
    </div>
  );
}