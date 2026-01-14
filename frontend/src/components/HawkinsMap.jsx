import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

export default function HawkinsMap(){

  useEffect(()=>{

    const map = L.map("hawkins-map").setView([28.61,77.21],13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const zones = {
      North:[28.62,77.22],
      South:[28.60,77.21],
      East:[28.61,77.24],
      West:[28.61,77.19]
    };

    const stories = [
      {zone:"North", intensity:4},
      {zone:"North", intensity:5},
      {zone:"South", intensity:3},
      {zone:"East", intensity:4},
      {zone:"East", intensity:5}
    ];

    function blur(p){
      return [
        p[0] + (Math.random()-0.5)*0.01,
        p[1] + (Math.random()-0.5)*0.01
      ];
    }

    const heatData = [];

    stories.forEach(s=>{
      const pos = blur(zones[s.zone]);
      heatData.push([pos[0],pos[1],s.intensity]);
    });

    L.heatLayer(heatData,{
      radius:30,
      blur:25,
      minOpacity:0.4
    }).addTo(map);

  },[]);

  return <div id="hawkins-map" style={{height:"500px", width:"100%"}}></div>;
}