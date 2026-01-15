import { useEffect } from "react";
import L from "leaflet";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export default function HawkinsMap() {
  useEffect(() => {
    const map = L.map("hawkins-map", {
      crs: L.CRS.Simple,
      minZoom: -1,
    });

    const bounds = [
      [0, 0],
      [1000, 1000],
    ]; // match your SVG size

    L.imageOverlay("/maps/hawkins (1).svg", bounds).addTo(map);
    map.fitBounds(bounds);

    const clamp = (val) => Math.min(1000, Math.max(0, val));
    const jitter = () => Math.random() * 20 - 10; // soft privacy offset

    const markers = [];

    async function plotHotspots() {
      try {
        const hotspotQuery = query(
          collection(db, "stories_private"),
          where("informAuthorities", "==", true)
        );
        const snap = await getDocs(hotspotQuery);

        snap.forEach((docSnap) => {
          const data = docSnap.data();
          const coords = data?.coordinates;
          if (!coords) return;

          const { latitude, longitude } = coords;
          if (typeof latitude !== "number" || typeof longitude !== "number") return;

          const scaledY = clamp(latitude * 10 + jitter());
          const scaledX = clamp(longitude * 10 + jitter());

          const circle = L.circle([scaledY, scaledX], {
            radius: 30,
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.35,
            stroke: true,
            weight: 1,
          }).addTo(map);

          markers.push(circle);
        });
      } catch (err) {
        console.error("Failed to load hotspots", err);
      }
    }

    plotHotspots();

    return () => {
      markers.forEach((m) => m.remove());
      map.remove();
    };
  }, []);

  return <div id="hawkins-map" style={{ height: "500px" }} />;
}