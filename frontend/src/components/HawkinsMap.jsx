import { useEffect } from "react";
import L from "leaflet";

export default function HawkinsMap(){

  useEffect(()=>{

    const map = L.map("hawkins-map", {
      crs: L.CRS.Simple,
      minZoom: -1
    });

    const bounds = [[0,0],[1000,1000]]; // match your SVG size

    L.imageOverlay("/maps/hawkins (1).svg", bounds).addTo(map);

    map.fitBounds(bounds);

  },[]);

  return <div id="hawkins-map" style={{height:"500px"}}></div>;
}