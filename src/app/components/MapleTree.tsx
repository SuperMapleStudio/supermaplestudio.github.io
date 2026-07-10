import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  swayOffset: number;
  swaySpeed: number;
}

const LEAF_COLORS = ["#C8601E", "#C9A84C", "#D4732A", "#B8962A", "#E07830", "#D4B860"];

export function MapleTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const createLeaf = (width: number, height: number): Leaf => ({
    x: Math.random() * width * 0.3,
    y: Math.random() * height * 0.6 + height * 0.1,
    size: Math.random() * 10 + 6,
    speed: Math.random() * 1.5 + 0.8,
    angle: Math.random() * 20 - 10,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 3,
    opacity: Math.random() * 0.5 + 0.5,
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    swayOffset: Math.random() * Math.PI * 2,
    swaySpeed: Math.random() * 0.02 + 0.01,
  });

  const drawLeaf = (ctx: CanvasRenderingContext2D, leaf: Leaf) => {
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate((leaf.rotation * Math.PI) / 180);
    ctx.globalAlpha = leaf.opacity;
    ctx.fillStyle = leaf.color;

    // Scale from a 100×100 viewBox to leaf.size
    const sc = leaf.size / 50;
    ctx.scale(sc, sc);
    ctx.translate(-50, -50);

    // 5-lobed maple leaf path (matches the SVG icon)
    ctx.beginPath();
    ctx.moveTo(50, 4);
    ctx.bezierCurveTo(50, 4, 44, 18, 38, 20);
    ctx.bezierCurveTo(32, 22, 20, 14, 20, 14);
    ctx.bezierCurveTo(20, 14, 26, 26, 24, 32);
    ctx.bezierCurveTo(22, 38, 8, 40, 8, 40);
    ctx.bezierCurveTo(8, 40, 18, 48, 18, 54);
    ctx.bezierCurveTo(18, 60, 10, 70, 10, 70);
    ctx.bezierCurveTo(10, 70, 24, 66, 30, 70);
    ctx.bezierCurveTo(36, 74, 36, 88, 36, 88);
    ctx.lineTo(44, 80);
    ctx.lineTo(46, 96);
    ctx.lineTo(50, 88);
    ctx.lineTo(54, 96);
    ctx.lineTo(56, 80);
    ctx.lineTo(64, 88);
    ctx.bezierCurveTo(64, 88, 64, 74, 70, 70);
    ctx.bezierCurveTo(76, 66, 90, 70, 90, 70);
    ctx.bezierCurveTo(90, 70, 82, 60, 82, 54);
    ctx.bezierCurveTo(82, 48, 92, 40, 92, 40);
    ctx.bezierCurveTo(92, 40, 78, 38, 76, 32);
    ctx.bezierCurveTo(74, 26, 80, 14, 80, 14);
    ctx.bezierCurveTo(80, 14, 68, 22, 62, 20);
    ctx.bezierCurveTo(56, 18, 50, 4, 50, 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const drawTree = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Trunk
    const trunkX = width * 0.5;
    const trunkBottom = height * 0.95;
    const trunkTop = height * 0.45;

    const trunkGrad = ctx.createLinearGradient(trunkX - 30, 0, trunkX + 30, 0);
    trunkGrad.addColorStop(0, "#1A1208");
    trunkGrad.addColorStop(0.3, "#3D2A14");
    trunkGrad.addColorStop(0.7, "#2D1F0E");
    trunkGrad.addColorStop(1, "#140E06");

    ctx.fillStyle = trunkGrad;
    ctx.beginPath();
    ctx.moveTo(trunkX - 28, trunkBottom);
    ctx.bezierCurveTo(trunkX - 22, trunkBottom - 100, trunkX - 18, trunkBottom - 200, trunkX - 12, trunkTop + 60);
    ctx.lineTo(trunkX + 12, trunkTop + 60);
    ctx.bezierCurveTo(trunkX + 18, trunkBottom - 200, trunkX + 22, trunkBottom - 100, trunkX + 28, trunkBottom);
    ctx.fill();

    // Branches
    const branches = [
      { startX: trunkX, startY: trunkTop + 80, endX: trunkX - 160, endY: trunkTop - 30, ctrl1X: trunkX - 40, ctrl1Y: trunkTop + 40 },
      { startX: trunkX, startY: trunkTop + 100, endX: trunkX + 150, endY: trunkTop - 10, ctrl1X: trunkX + 50, ctrl1Y: trunkTop + 50 },
      { startX: trunkX, startY: trunkTop + 40, endX: trunkX - 80, endY: trunkTop - 100, ctrl1X: trunkX - 20, ctrl1Y: trunkTop - 20 },
      { startX: trunkX, startY: trunkTop + 60, endX: trunkX + 90, endY: trunkTop - 80, ctrl1X: trunkX + 30, ctrl1Y: trunkTop },
      { startX: trunkX - 100, startY: trunkTop + 10, endX: trunkX - 220, endY: trunkTop - 60, ctrl1X: trunkX - 150, ctrl1Y: trunkTop - 20 },
      { startX: trunkX + 90, startY: trunkTop + 20, endX: trunkX + 200, endY: trunkTop - 40, ctrl1X: trunkX + 140, ctrl1Y: trunkTop - 10 },
    ];

    ctx.strokeStyle = "#2D1F0E";
    branches.forEach((b, i) => {
      const w = i < 4 ? 8 : 5;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(b.startX, b.startY);
      ctx.quadraticCurveTo(b.ctrl1X, b.ctrl1Y, b.endX, b.endY);
      ctx.stroke();
    });

    // Canopy foliage clusters
    const clusters = [
      { x: trunkX, y: trunkTop - 40, r: 130 },
      { x: trunkX - 160, y: trunkTop - 70, r: 100 },
      { x: trunkX + 150, y: trunkTop - 50, r: 95 },
      { x: trunkX - 80, y: trunkTop - 130, r: 80 },
      { x: trunkX + 80, y: trunkTop - 110, r: 75 },
      { x: trunkX - 210, y: trunkTop - 90, r: 65 },
      { x: trunkX + 190, y: trunkTop - 70, r: 60 },
      { x: trunkX, y: trunkTop - 160, r: 70 },
    ];

    clusters.forEach((c, i) => {
      const grad = ctx.createRadialGradient(c.x - c.r * 0.2, c.y - c.r * 0.2, c.r * 0.1, c.x, c.y, c.r);
      if (i % 3 === 0) {
        grad.addColorStop(0, "rgba(190, 70, 30, 0.85)");
        grad.addColorStop(0.5, "rgba(150, 50, 20, 0.7)");
        grad.addColorStop(1, "rgba(100, 30, 10, 0)");
      } else if (i % 3 === 1) {
        grad.addColorStop(0, "rgba(220, 140, 20, 0.8)");
        grad.addColorStop(0.5, "rgba(180, 100, 15, 0.65)");
        grad.addColorStop(1, "rgba(120, 60, 10, 0)");
      } else {
        grad.addColorStop(0, "rgba(170, 60, 25, 0.8)");
        grad.addColorStop(0.5, "rgba(130, 45, 18, 0.65)");
        grad.addColorStop(1, "rgba(90, 28, 10, 0)");
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Rope hanging from right branch
    const ropeStartX = trunkX + 190;
    const ropeStartY = trunkTop - 30;
    ctx.strokeStyle = "#3A2010";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ropeStartX, ropeStartY);
    ctx.bezierCurveTo(ropeStartX - 5, ropeStartY + 40, ropeStartX + 5, ropeStartY + 80, ropeStartX, ropeStartY + 100);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      leavesRef.current = Array.from({ length: 25 }, () => createLeaf(canvas.width, canvas.height));
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      timeRef.current += 0.016;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);
      // tree removed — leaves only

      // Update and draw leaves
      leavesRef.current.forEach((leaf) => {
        const sway = Math.sin(timeRef.current * leaf.swaySpeed * 60 + leaf.swayOffset) * 1.5;
        leaf.x += leaf.speed + sway;
        leaf.y += Math.sin(timeRef.current * 0.5 + leaf.swayOffset) * 0.3;
        leaf.rotation += leaf.rotSpeed;
        leaf.opacity -= 0.001;

        if (leaf.x > width + 20 || leaf.opacity <= 0) {
          Object.assign(leaf, createLeaf(width, height));
          leaf.x = Math.random() * width * 0.25;
        }
        drawLeaf(ctx, leaf);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
