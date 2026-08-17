import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  symbol?: string;
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for data mesh
    const particleCount = Math.min(45, Math.floor(width / 35));
    const particles: Particle[] = [];
    const colors = ['rgba(37, 99, 235,', 'rgba(14, 165, 233,', 'rgba(16, 185, 129,', 'rgba(99, 102, 241,'];
    const symbols = ['₹', '⚡', '🔒', '✓', '✦'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.4 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        symbol: Math.random() > 0.6 ? symbols[Math.floor(Math.random() * symbols.length)] : undefined,
      });
    }

    // Data packets travelling along invisible network lines
    interface Packet {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }
    const packets: Packet[] = [];
    for (let i = 0; i < 8; i++) {
      packets.push({
        fromIndex: Math.floor(Math.random() * particleCount),
        toIndex: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.007,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw node
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional symbol rendering
        if (p.symbol && p.alpha > 0.3) {
          ctx.font = '10px sans-serif';
          ctx.fillStyle = `${p.color} ${p.alpha * 0.7})`;
          ctx.fillText(p.symbol, p.x + 4, p.y - 4);
        }

        // Draw connections to nearby nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.14;
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // Update and draw live data packets
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.fromIndex = Math.floor(Math.random() * particleCount);
          pkt.toIndex = Math.floor(Math.random() * particleCount);
        }

        const p1 = particles[pkt.fromIndex];
        const p2 = particles[pkt.toIndex];
        if (p1 && p2) {
          const px = p1.x + (p2.x - p1.x) * pkt.progress;
          const py = p1.y + (p2.y - p1.y) * pkt.progress;

          // Glowing data packet
          ctx.fillStyle = 'rgba(37, 99, 235, 0.75)';
          ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Subtle mouse interactive radial glow
      const mouse = mousePosRef.current;
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          10,
          mouse.x,
          mouse.y,
          180
        );
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.07)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Ambient Radial Light Gradients */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-sky-500/6 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] bg-indigo-500/6 rounded-full blur-3xl" />
      <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl" />

      {/* Subtle Financial Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035]" 
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Dynamic Data Mesh Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
