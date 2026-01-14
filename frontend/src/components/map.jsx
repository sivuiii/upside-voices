import HawkinsMap from "./HawkinsMap";
import StatsPanel from "./StatsPanel";

export default function map(){

  return (
    <div>
      <h2>Hawkins Incident Overview</h2>

      <HawkinsMap />

      <StatsPanel />
    </div>
  );
}