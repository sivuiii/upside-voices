import React from "react";

export default function SceneFX() {
  const bats = [
    { top: "12%", left: "-8%", delay: "0s", duration: "28s" },
    { top: "24%", left: "-12%", delay: "6s", duration: "26s" },
    { top: "38%", left: "-10%", delay: "12s", duration: "24s" },
    { top: "55%", left: "-15%", delay: "3s", duration: "30s" },
    { top: "68%", left: "-18%", delay: "9s", duration: "27s" },
    { top: "82%", left: "-14%", delay: "15s", duration: "25s" },
  ];

  return (
    <div className="fx-layer" aria-hidden>
      <div className="fx-bg-gradient" />
      <div className="fx-scanlines" />
      <div className="fx-mindflayer" />
      <div className="fx-vines fx-vines-left" />
      <div className="fx-vines fx-vines-right" />
      <div className="fx-bats">
        {bats.map((bat, i) => (
          <span
            key={i}
            className="fx-bat"
            style={{
              top: bat.top,
              left: bat.left,
              animationDelay: bat.delay,
              animationDuration: bat.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
