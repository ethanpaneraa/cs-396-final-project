"use client";

import React, { useRef, useEffect } from "react";
import { ASCIIBoxRenderer } from "@/lib/ascii-renderer";
import { useWindowSize } from "@/hooks/useWindowSize";

export const AsciiCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderer = new ASCIIBoxRenderer(ctx, width, height);
    let rafId: number;

    const loop = () => {
      renderer.render(canvas);
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => cancelAnimationFrame(rafId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
};
