import React from "react";
import { AsciiCanvas } from "@/app/components/landing/ascii-canvas";
import AsciiOverlay from "@/app/components/landing/ascii-overlay";

export const AsciiBackground: React.FC = () => (
  <div className="relative w-full h-screen overflow-hidden bg-white">
    <div className="absolute inset-0 bg-white">
      <AsciiCanvas />
    </div>
    <div className="absolute inset-0 bg-white/60" />
    <AsciiOverlay />
  </div>
);

export default AsciiBackground;
