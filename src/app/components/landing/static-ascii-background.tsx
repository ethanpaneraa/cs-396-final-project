"use client";

import React, { useRef, useEffect } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;

const StaticAsciiBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = Math.floor(width / CHAR_WIDTH);
    const rows = Math.floor(height / CHAR_HEIGHT);
    const buffer: string[][] = Array.from({ length: rows }, (_, y) =>
      Array.from({ length: cols }, (_, x) => ((x + y) % 2 ? "·" : " "))
    );

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${CHAR_HEIGHT}px Monaco, monospace`;
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000000";
    for (let y = 0; y < rows; y++) {
      ctx.fillText(buffer[y].join(""), 0, y * CHAR_HEIGHT);
    }
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default StaticAsciiBackground;
