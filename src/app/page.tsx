"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

class ASCIIBoxRenderer {
  private ctx: CanvasRenderingContext2D;
  private cols: number;
  private rows: number;
  private charWidth = 10;
  private charHeight = 20;
  private baseW = 15;
  private baseH = 5;
  private spacingX = 4;
  private spacingY = 2;
  private message = "THINK INSIDE OF THE BOX";
  private staticBuffer: string[][];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.cols = Math.floor(width / this.charWidth);
    this.rows = Math.floor(height / this.charHeight);

    // Precompute static checkerboard background
    this.staticBuffer = Array.from({ length: this.rows }, (_, y) => {
      const row: string[] = [];
      for (let x = 0; x < this.cols; x++) {
        row.push((x + y) % 2 ? "·" : " ");
      }
      return row;
    });

    // Set font once
    this.ctx.font = `${this.charHeight}px Monaco, monospace`;
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "#000"; // Set text color to black
  }

  render(canvas: HTMLCanvasElement) {
    const { ctx, cols, rows, charHeight } = this;
    // Clone static buffer
    const buffer = this.staticBuffer.map((r) => r.slice());

    const t = performance.now() * 0.002 * 3;
    // Example margins then center logic
    let marginX = 3;
    let marginY = 2;
    const numX = Math.floor(
      (cols - marginX * 2) / (this.baseW + this.spacingX)
    );
    const numY = Math.floor(
      (rows - marginY * 2) / (this.baseH + this.spacingY)
    );
    marginX = Math.floor(
      (cols - numX * this.baseW - (numX - 1) * this.spacingX) / 2
    );
    marginY = Math.floor(
      (rows - numY * this.baseH - (numY - 1) * this.spacingY) / 2
    );

    // Overlay animated boxes
    for (let j = 0; j < numY; j++) {
      for (let i = 0; i < numX; i++) {
        const ox = Math.floor(Math.sin((i + j) * 0.6 + t) * this.spacingX);
        const oy = Math.floor(Math.cos((i + j) * 0.6 + t) * this.spacingY);
        const x = marginX + i * (this.baseW + this.spacingX) + ox;
        const y = marginY + j * (this.baseH + this.spacingY) + oy;
        this.overlayBox(buffer, x, y, i, j, numX);
      }
    }

    // Clear canvas with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color to black for visibility on white background
    ctx.fillStyle = "#000000";

    // Draw buffer to canvas
    for (let y = 0; y < rows; y++) {
      ctx.fillText(buffer[y].join(""), 0, y * charHeight);
    }
  }

  private overlayBox(
    buffer: string[][],
    x: number,
    y: number,
    i: number,
    j: number,
    numX: number
  ) {
    const { baseW, baseH, message } = this;

    // Clear full box area (background)
    for (let dy = 0; dy < baseH; dy++) {
      for (let dx = 0; dx < baseW; dx++) {
        if (buffer[y + dy]?.[x + dx] !== undefined)
          buffer[y + dy][x + dx] = " ";
      }
    }

    // Draw borders
    for (let dx = 0; dx < baseW; dx++) {
      if (buffer[y]?.[x + dx] !== undefined) buffer[y][x + dx] = "═"; // top
      if (buffer[y + baseH - 1]?.[x + dx] !== undefined)
        buffer[y + baseH - 1][x + dx] = "═"; // bottom
    }
    for (let dy = 0; dy < baseH; dy++) {
      if (buffer[y + dy]?.[x] !== undefined) buffer[y + dy][x] = "║"; // left
      if (buffer[y + dy]?.[x + baseW - 1] !== undefined)
        buffer[y + dy][x + baseW - 1] = "║"; // right
    }
    // Corners
    if (buffer[y]?.[x] !== undefined) buffer[y][x] = "╔";
    if (buffer[y]?.[x + baseW - 1] !== undefined)
      buffer[y][x + baseW - 1] = "╗";
    if (buffer[y + baseH - 1]?.[x] !== undefined)
      buffer[y + baseH - 1][x] = "╚";
    if (buffer[y + baseH - 1]?.[x + baseW - 1] !== undefined)
      buffer[y + baseH - 1][x + baseW - 1] = "╝";

    // Draw shadow
    for (let dx = 2; dx < baseW + 2; dx++) {
      if (buffer[y + baseH]?.[x + dx] !== undefined)
        buffer[y + baseH][x + dx] = "░";
    }
    for (let dy = 1; dy < baseH; dy++) {
      if (buffer[y + dy]?.[x + baseW] !== undefined)
        buffer[y + dy][x + baseW] = "░";
    }

    // Draw content
    const ch = message[(i + j * numX) % message.length];
    if (buffer[y + 1]?.[x + 2] !== undefined) buffer[y + 1][x + 2] = `*${ch}`;
    const pos = `pos:${x},${y}`;
    for (let k = 0; k < pos.length; k++) {
      if (buffer[y + 2]?.[x + 2 + k] !== undefined)
        buffer[y + 2][x + 2 + k] = pos[k];
    }
  }
}

const AsciiBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setDims({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dims.width === 0) return;
    canvas.width = dims.width;
    canvas.height = dims.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderer = new ASCIIBoxRenderer(ctx, dims.width, dims.height);
    let rafId: number;
    const loop = () => {
      renderer.render(canvas);
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafId);
  }, [dims]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed inset-0 bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <div className="absolute inset-0 bg-white/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-gray-400 p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-lg">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-black mb-4 font-mono mb-12">
              investigating the edge
            </h1>
            <p className="text-black leading-relaxed text-lowercase font-mono">
              an online lab where you can navigate through edge-detector
              behaviors and uncover vulnerabilities in vision models
            </p>
            <div className="pt-4 font-mono">
              <p className="text-sm text-black">
                created by{" "}
                <Link
                  target="_blank"
                  href="https://ethanpinedaa.dev"
                  className="hover:underline underline-offset-2 text-black font-bold"
                >
                  ethan pineda
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsciiBackground;
