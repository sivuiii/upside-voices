import HawkinsMap from "./HawkinsMap";
import StatsPanel from "./StatsPanel";
import TopNav from "./TopNav";

export default function MapPage(){

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-4">
      <TopNav />
      <h2 className="text-2xl font-semibold">Hawkins Incident Overview</h2>

      <HawkinsMap />

      <StatsPanel />

    </div>
  );
}