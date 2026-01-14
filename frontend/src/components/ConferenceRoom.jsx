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
    <div>
      <p>You are joining as <b>{alias}</b></p>
      <div id="jitsi-container" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
}