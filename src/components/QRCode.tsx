import React from 'react';

interface QRCodeProps {
  upiId?: string;
  amount?: number;
  size?: number;
}

export const QRCode: React.FC<QRCodeProps> = ({ size = 150 }) => {
  const N = 25;
  const seed = 20260918;
  let currentSeed = seed;

  function rnd() {
    currentSeed = (currentSeed * 1103515245 + 12345) % 2147483648;
    return currentSeed / 2147483648;
  }

  function inFinder(x: number, y: number) {
    return (
      (x < 8 && y < 8) ||
      (x > N - 9 && y < 8) ||
      (x < 8 && y > N - 9)
    );
  }

  const modules: { x: number; y: number }[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (inFinder(x, y)) continue;
      // Timing pattern
      if ((y === 6 || x === 6) && (x % 2 === 0 || y % 2 === 0)) {
        modules.push({ x, y });
        continue;
      }
      if (rnd() > 0.52) {
        modules.push({ x, y });
      }
    }
  }

  return (
    <div
      className="bg-white p-2 rounded-2xl shadow-sm border border-[#F0ECE9] flex flex-col items-center justify-center"
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg
        viewBox={`0 0 ${N} ${N}`}
        width={size}
        height={size}
        shapeRendering="crispEdges"
        className="w-full h-full"
      >
        <rect width={N} height={N} fill="#ffffff" />
        {/* Finder pattern Top-Left */}
        <rect x={0} y={0} width={7} height={7} fill="#1A1A1A" />
        <rect x={1} y={1} width={5} height={5} fill="#FFFFFF" />
        <rect x={2} y={2} width={3} height={3} fill="#1A1A1A" />

        {/* Finder pattern Top-Right */}
        <rect x={N - 7} y={0} width={7} height={7} fill="#1A1A1A" />
        <rect x={N - 6} y={1} width={5} height={5} fill="#FFFFFF" />
        <rect x={N - 5} y={2} width={3} height={3} fill="#1A1A1A" />

        {/* Finder pattern Bottom-Left */}
        <rect x={0} y={N - 7} width={7} height={7} fill="#1A1A1A" />
        <rect x={1} y={N - 6} width={5} height={5} fill="#FFFFFF" />
        <rect x={2} y={N - 5} width={3} height={3} fill="#1A1A1A" />

        {/* Modules */}
        {modules.map((m, i) => (
          <rect key={i} x={m.x} y={m.y} width={1} height={1} fill="#1A1A1A" />
        ))}
      </svg>
    </div>
  );
};
