import HawkinsMap from "./HawkinsMap";
import StatsPanel from "./StatsPanel";
import ConferenceRoom from "./ConferenceRoom";
import { useState } from "react";

export default function map(){

  // demo group id (later backend will send this)
  const [groupId] = useState("demoGroup123");

  return (
    <div>

      <h2>Hawkins Incident Overview</h2>

      <HawkinsMap />

      <StatsPanel />

      <h3>Anonymous Group Conference</h3>

      <ConferenceRoom groupId={groupId} />

    </div>
  );
}