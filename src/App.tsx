// SHMVisualizer.js
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

export default function SHMVisualizer() {
  const [xm, setXm] = useState(1);
  const [omega, setOmega] = useState(2 * Math.PI);
  const [phi, setPhi] = useState(0);
  const [time, setTime] = useState(0);

  // Time steps
  const t = Array.from({ length: 1000 }, (_, i) => i * 0.002);

  // SHM equations
  const x = t.map((time) => xm * Math.sin(omega * time + phi));
  const v = t.map((time) => omega * xm * Math.cos(omega * time + phi));
  const a = t.map((time) => omega ** 2 * xm * Math.sin(omega * time + phi));

  // Swing animation (for pendulum)
  const swingX = xm * Math.sin(omega * time + phi);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.02);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">
        🎠 Fun with Simple Harmonic Motion 🎶
      </h1>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block font-semibold text-sm">Amplitude (Xm)</label>
          <input
            type="number"
            value={xm}
            onChange={(e) => setXm(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold text-sm">Speed (ω)</label>
          <input
            type="number"
            value={omega}
            onChange={(e) => setOmega(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold text-sm">Starting Push 🎯 (φ)</label>
          <input
            type="number"
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </div>
      </div>

      {/* Plot */}
      <Plot
        data={[
          { x: t, y: x, mode: "lines", name: "Position 🟠", line: { color: "orange" } },
          { x: t, y: v, mode: "lines", name: "Speed 💨", line: { color: "purple" } },
          { x: t, y: a, mode: "lines", name: "Acceleration ⚡", line: { color: "cyan" } },
        ]}
        layout={{
          title: "Watch the Swing Move! 🎢",
          xaxis: { title: "Time (s)" },
          yaxis: { title: "Value" },
          paper_bgcolor: "#fff8e7",
        }}
      />

      {/* Pendulum Animation */}
      <div className="relative w-full h-60 flex justify-center items-start mt-10">
        {/* String */}
        <div
          style={{
            position: "absolute",
            top: 0,
            height: "150px",
            width: "2px",
            backgroundColor: "black",
            transform: `translateX(${swingX * 100}px)`,
            transformOrigin: "top center",
          }}
        />
        {/* Bob */}
        <div
          style={{
            transform: `translateX(${swingX * 100}px) translateY(150px)`,
          }}
          className="w-12 h-12 bg-orange-400 rounded-full shadow-md"
        />
      </div>
    </div>
  );
}
