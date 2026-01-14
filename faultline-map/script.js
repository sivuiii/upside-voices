// Create map
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 2
});

// SVG dimensions
const width = 826;
const height = 902;

// Define bounds
const bounds = [[0, 0], [height, width]];

// Load SVG image
const overlay = L.imageOverlay("hawkins%20(1).svg", bounds).addTo(map);

// Fit to screen
map.fitBounds(bounds);

// ---------------- GRID ----------------

function drawGrid(step) {

  // Vertical grid lines
  for (let x = 0; x <= width; x += step) {
    L.polyline([[0, x], [height, x]], {
      color: "#888",
      weight: 1,
      opacity: 0.4
    }).addTo(map);
  }

  // Horizontal grid lines
  for (let y = 0; y <= height; y += step) {
    L.polyline([[y, 0], [y, width]], {
      color: "#888",
      weight: 1,
      opacity: 0.4
    }).addTo(map);
  }
}

// Draw grid every 100 units
drawGrid(100);

// ---------------- CLICK TEST ----------------

map.on("click", function (e) {
  console.log(
    "X:", Math.round(e.latlng.lng),
    "Y:", Math.round(e.latlng.lat)
  );
});

