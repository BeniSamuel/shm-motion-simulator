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

  // Swing animation (for pendulum) - now vertical
  const swingY = xm * Math.sin(omega * time + phi);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.02);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto text-center">
      <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 p-6 rounded-2xl mb-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          🌈 Amazing Spring Bouncer! 🎪
        </h1>
        <p className="text-white text-lg">
          Watch the colorful mass bounce up and down! 🎈
        </p>
      </div>

      {/* Fun Control Panel */}
      <div className="bg-yellow-100 p-6 rounded-2xl mb-6 shadow-lg border-4 border-yellow-300">
        <h2 className="text-xl font-bold text-purple-600 mb-4">
          🎮 Control Panel 🎮
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md border-2 border-orange-200">
            <label className="block font-bold text-sm text-orange-600 mb-2">
              📏 Amplitude (A)
            </label>
            <input
              type="number"
              value={xm}
              onChange={(e) => setXm(Number(e.target.value))}
              className="border-2 border-orange-300 rounded-lg p-2 w-full text-center font-bold focus:border-orange-500 focus:outline-none"
              placeholder="meters"
            />
            <p className="text-xs text-orange-500 mt-1">Maximum displacement</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-2 border-purple-200">
            <label className="block font-bold text-sm text-purple-600 mb-2">
              🔄 Angular Frequency (ω)
            </label>
            <input
              type="number"
              value={omega}
              onChange={(e) => setOmega(Number(e.target.value))}
              className="border-2 border-purple-300 rounded-lg p-2 w-full text-center font-bold focus:border-purple-500 focus:outline-none"
              placeholder="rad/s"
            />
            <p className="text-xs text-purple-500 mt-1">Radians per second</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-2 border-cyan-200">
            <label className="block font-bold text-sm text-cyan-600 mb-2">
              🎯 Phase Angle (φ)
            </label>
            <input
              type="number"
              value={phi}
              onChange={(e) => setPhi(Number(e.target.value))}
              className="border-2 border-cyan-300 rounded-lg p-2 w-full text-center font-bold focus:border-cyan-500 focus:outline-none"
              placeholder="radians"
            />
            <p className="text-xs text-cyan-500 mt-1">Initial phase shift</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 items-start">
        {/* Graph Section */}
        <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg border-4 border-blue-200">
          <Plot
            data={[
              {
                x: t,
                y: x,
                mode: "lines",
                name: "Displacement (x) 📍",
                line: { color: "#ff6b35", width: 3 },
              },
              {
                x: t,
                y: v,
                mode: "lines",
                name: "Velocity (v) 🏃",
                line: { color: "#8b5cf6", width: 3 },
              },
              {
                x: t,
                y: a,
                mode: "lines",
                name: "Acceleration (a) ⚡",
                line: { color: "#06b6d4", width: 3 },
              },
            ]}
            layout={{
              title: {
                text: "📊 Magic Motion Waves! 🌊",
                font: { size: 18, color: "#7c3aed" },
              },
              xaxis: {
                title: "Time (t) in seconds",
                titlefont: { color: "#059669", size: 14 },
                gridcolor: "#e5e7eb",
                showgrid: true,
                zeroline: true,
                zerolinecolor: "#374151",
              },
              yaxis: {
                title: "Displacement (m), Velocity (m/s), Acceleration (m/s²)",
                titlefont: { color: "#059669", size: 14 },
                gridcolor: "#e5e7eb",
                showgrid: true,
                zeroline: true,
                zerolinecolor: "#374151",
              },
              paper_bgcolor: "#fef3c7",
              plot_bgcolor: "#fffbeb",
              font: { family: "Arial, sans-serif" },
            }}
            style={{ width: "100%", height: "400px" }}
          />
        </div>

        {/* Spring Animation Section */}
        <div className="w-80 bg-gradient-to-b from-sky-100 to-blue-200 p-6 rounded-2xl shadow-lg border-4 border-sky-300">
          <h3 className="text-lg font-bold text-blue-700 mb-4 text-center">
            🎪 Live Spring Show! 🎪
          </h3>

          <div className="relative h-80 flex justify-center items-start">
            <div className="relative">
              {/* Ceiling/Fixed Support */}
              <div
                className="w-20 h-6 bg-gradient-to-b from-amber-400 to-amber-600 mb-2 rounded-t-lg shadow-md"
                style={{ marginLeft: "-10px" }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-amber-700 rounded-t-lg"></div>
                {/* Fun hatching pattern */}
                <div
                  className="absolute top-2 left-0 w-full h-4 bg-gradient-to-r from-amber-300 to-amber-500 rounded-b-lg"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 3px, #d97706 3px, #d97706 6px)",
                  }}
                ></div>
              </div>

              {/* Colorful Spring */}
              <div className="relative flex flex-col items-center">
                <svg
                  width="24"
                  height={`${140 + swingY * 60}`}
                  className="overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="springGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M 12 0 ${Array.from({ length: 18 }, (_, i) => {
                      const y = ((i + 1) * (140 + swingY * 60)) / 18;
                      const x = 12 + (i % 2 === 0 ? -10 : 10);
                      return `L ${x} ${y}`;
                    }).join(" ")} L 12 ${140 + swingY * 60}`}
                    stroke="url(#springGradient)"
                    strokeWidth="3"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                </svg>

                {/* Bouncy Ball */}
                <div
                  className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-full shadow-xl flex items-center justify-center text-white text-sm font-bold border-4 border-white transform transition-transform duration-75"
                  style={{
                    marginTop: "-10px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="text-center">
                    <div className="text-lg">⚽</div>
                    <div>10kg</div>
                  </div>
                </div>
              </div>

              {/* Fun Position Indicator */}
              <div className="absolute right-0 top-40 flex items-center">
                <div className="w-10 h-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-md"></div>
                <span className="ml-2 text-lg font-bold text-red-600 drop-shadow-sm">
                  📍 x
                </span>
              </div>

              {/* Sparkle Effects */}
              <div className="absolute top-20 left-16 text-yellow-400 text-xl animate-pulse">
                ✨
              </div>
              <div className="absolute top-32 right-8 text-pink-400 text-lg animate-bounce">
                ⭐
              </div>
              <div className="absolute bottom-20 left-8 text-blue-400 text-sm animate-pulse">
                💫
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
