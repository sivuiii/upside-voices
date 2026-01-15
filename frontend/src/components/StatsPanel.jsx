import { buildStats, ethicsText } from "./statsLogic";

export default function StatsPanel() {

  // demo data for now
  const stories = [
    { zone: "North", month: "Jan" },
    { zone: "North", month: "Feb" },
    { zone: "South", month: "Feb" },
    { zone: "East", month: "Jan" },
    { zone: "East", month: "Mar" }
  ];

  const stats = buildStats(stories);

  return (
    <div className="space-y-6 text-gray-300">

      <div>
        <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-wider">Zone Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.zoneLabels.map((z, i) => (
            <div key={z} className="bg-black/40 p-3 rounded border border-gray-800 flex justify-between">
              <span className="font-mono text-gray-400">{z}</span>
              <span className="text-primary font-bold">{stats.zoneValues[i]} reports</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-accent mb-3 uppercase tracking-wider">Timeline Trend</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.timeLabels.map((t, i) => (
            <div key={t} className="bg-black/40 p-3 rounded border border-gray-800 flex justify-between">
              <span className="font-mono text-gray-400">{t}</span>
              <span className="text-accent font-bold">{stats.timeValues[i]} reports</span>
            </div>
          ))}
        </div>
      </div>

      <p className="pt-4 border-t border-gray-800 text-xs text-gray-500 font-mono">
        {ethicsText}
      </p>

    </div>
  );
}