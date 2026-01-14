import { buildStats, ethicsText } from "./statsLogic";

export default function StatsPanel(){

  // demo data for now
  const stories = [
    {zone:"North", month:"Jan"},
    {zone:"North", month:"Feb"},
    {zone:"South", month:"Feb"},
    {zone:"East", month:"Jan"},
    {zone:"East", month:"Mar"}
  ];

  const stats = buildStats(stories);

  return (
    <div style={{padding:"10px", border:"1px solid #444"}}>

      <h3>Zone Statistics</h3>
      {stats.zoneLabels.map((z,i)=>(
        <p key={z}>{z}: {stats.zoneValues[i]} reports</p>
      ))}

      <h3>Timeline Trend</h3>
      {stats.timeLabels.map((t,i)=>(
        <p key={t}>{t}: {stats.timeValues[i]} reports</p>
      ))}

      <p style={{marginTop:"10px", fontSize:"12px", color:"gray"}}>
        {ethicsText}
      </p>

    </div>
  );
}