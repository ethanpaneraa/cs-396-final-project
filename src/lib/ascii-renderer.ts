export class ASCIIBoxRenderer {
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
    this.staticBuffer = Array.from({ length: this.rows }, (_, y) => {
      const row: string[] = [];
      for (let x = 0; x < this.cols; x++) {
        row.push((x + y) % 2 ? "·" : " ");
      }
      return row;
    });

    this.ctx.font = `${this.charHeight}px Monaco, monospace`;
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "#000";
  }

  render(canvas: HTMLCanvasElement) {
    const { ctx, cols, rows, charHeight } = this;
    const buffer = this.staticBuffer.map((r) => r.slice());

    const t = performance.now() * 0.002 * 3;

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

    for (let j = 0; j < numY; j++) {
      for (let i = 0; i < numX; i++) {
        const ox = Math.floor(Math.sin((i + j) * 0.6 + t) * this.spacingX);
        const oy = Math.floor(Math.cos((i + j) * 0.6 + t) * this.spacingY);
        const x = marginX + i * (this.baseW + this.spacingX) + ox;
        const y = marginY + j * (this.baseH + this.spacingY) + oy;
        this.overlayBox(buffer, x, y, i, j, numX);
      }
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
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
    for (let dy = 0; dy < baseH; dy++) {
      for (let dx = 0; dx < baseW; dx++) {
        if (buffer[y + dy]?.[x + dx] !== undefined)
          buffer[y + dy][x + dx] = " ";
      }
    }
    for (let dx = 0; dx < baseW; dx++) {
      if (buffer[y]?.[x + dx] !== undefined) buffer[y][x + dx] = "═";
      if (buffer[y + baseH - 1]?.[x + dx] !== undefined)
        buffer[y + baseH - 1][x + dx] = "═";
    }
    for (let dy = 0; dy < baseH; dy++) {
      if (buffer[y + dy]?.[x] !== undefined) buffer[y + dy][x] = "║";
      if (buffer[y + dy]?.[x + baseW - 1] !== undefined)
        buffer[y + dy][x + baseW - 1] = "║";
    }

    if (buffer[y]?.[x] !== undefined) buffer[y][x] = "╔";
    if (buffer[y]?.[x + baseW - 1] !== undefined)
      buffer[y][x + baseW - 1] = "╗";
    if (buffer[y + baseH - 1]?.[x] !== undefined)
      buffer[y + baseH - 1][x] = "╚";
    if (buffer[y + baseH - 1]?.[x + baseW - 1] !== undefined)
      buffer[y + baseH - 1][x + baseW - 1] = "╝";

    for (let dx = 2; dx < baseW + 2; dx++) {
      if (buffer[y + baseH]?.[x + dx] !== undefined)
        buffer[y + baseH][x + dx] = "░";
    }
    for (let dy = 1; dy < baseH; dy++) {
      if (buffer[y + dy]?.[x + baseW] !== undefined)
        buffer[y + dy][x + baseW] = "░";
    }

    const ch = message[(i + j * numX) % message.length];
    if (buffer[y + 1]?.[x + 2] !== undefined) buffer[y + 1][x + 2] = `*${ch}`;
    const pos = `pos:${x},${y}`;
    for (let k = 0; k < pos.length; k++) {
      if (buffer[y + 2]?.[x + 2 + k] !== undefined)
        buffer[y + 2][x + 2 + k] = pos[k];
    }
  }
}
