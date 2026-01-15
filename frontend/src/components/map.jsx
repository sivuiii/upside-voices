import HawkinsMap from "./HawkinsMap";
import StatsPanel from "./StatsPanel";
import TopNav from "./TopNav";

export default function MapPage() {

  return (
    <div className="min-h-screen bg-transparent text-default p-6 space-y-6 relative">
      <div className="fixed inset-0 -z-10 bg-scanlines opacity-10 pointer-events-none" />
      <TopNav />
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary tracking-widest uppercase text-glow border-b border-gray-800 pb-4">
          Hawkins Incident Overview
        </h2>

        <div className="bg-[#111] border-2 border-primary rounded-xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-10" />
          <div className="relative z-0">
            <HawkinsMap />
          </div>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 shadow-lg">
          <StatsPanel />
        </div>
      </div>
    </div>
  );
}