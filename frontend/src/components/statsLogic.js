export function buildStats(stories){

  const zoneCount = {};
  const timeCount = {};

  stories.forEach(s => {
    zoneCount[s.zone] = (zoneCount[s.zone] || 0) + 1;
    timeCount[s.month] = (timeCount[s.month] || 0) + 1;
  });

  return {
    zoneLabels: Object.keys(zoneCount),
    zoneValues: Object.values(zoneCount),

    timeLabels: Object.keys(timeCount),
    timeValues: Object.values(timeCount)
  };
}

export const ethicsText =
"Sensitive data is visualized only in aggregated and consent-approved form. No individual story, identity, or exact location is displayed.";