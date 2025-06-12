import React from "react";
import { AsciiCanvas } from "@/app/components/landing/ascii-canvas";
import AsciiOverlay from "@/app/components/landing/ascii-overlay";

export const AsciiBackground: React.FC = () => (
  <div className="relative w-full h-screen overflow-hidden bg-white">
    {/* animated ASCII behind */}
    <div className="fixed inset-0 bg-white">
      <AsciiCanvas />
    </div>

    {/* semi‐opaque layer */}
    <div className="absolute inset-0 bg-white/60" />

    {/* content overlay */}
    <AsciiOverlay />
  </div>
);

export default AsciiBackground;
