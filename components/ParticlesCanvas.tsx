"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  phase: number;
  speed: number;
}

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];
    let t = 0;

    const mobile = () => window.innerWidth < 768;

    const init = () => {
      canvas.width  = canvas.offsetWidth  || 800;
      canvas.height = canvas.offsetHeight || 300;
      const n = mobile() ? 28 : 60;
      particles = Array.from({ length: n }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.38,
        vy:    (Math.random() - 0.5) * 0.38,
        r:     Math.random() * 1.6 + 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.008,
      }));
    };

    init();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    const MAX_DIST = mobile() ? 90 : 130;

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const md = mobile() ? 90 : 130;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)             { p.x = 0;              p.vx = Math.abs(p.vx);  }
        if (p.x > canvas.width)  { p.x = canvas.width;   p.vx = -Math.abs(p.vx); }
        if (p.y < 0)             { p.y = 0;              p.vy = Math.abs(p.vy);  }
        if (p.y > canvas.height) { p.y = canvas.height;  p.vy = -Math.abs(p.vy); }

        const pulse = Math.max(0.01, p.r + Math.sin(t * p.speed + p.phase) * 0.6);

        // Glow halo
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulse * 6);
        grd.addColorStop(0, "rgba(0,212,255,0.45)");
        grd.addColorStop(1, "rgba(0,212,255,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.85)";
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < md) {
            const alpha = (1 - dist / md) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.65 }}
    />
  );
}
