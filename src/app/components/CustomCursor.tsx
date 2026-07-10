import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export function CustomCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        particlesRef.current.push({
          id: particleId.current++,
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 1,
          size: Math.random() * 4 + 2,
        });
      }
    };

    const tick = () => {
      particlesRef.current = particlesRef.current
        .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.05, life: p.life - 0.035 }))
        .filter((p) => p.life > 0);
      setParticles([...particlesRef.current]);
      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(242, 184, 36, ${p.life * 0.8})`,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 ${p.size * 2}px rgba(242, 184, 36, ${p.life * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}
