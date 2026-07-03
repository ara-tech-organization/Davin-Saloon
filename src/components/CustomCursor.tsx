import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;
    const mouse = { x: -100, y: -100, prevX: -100, prevY: -100 };
    const particles: Particle[] = [];
    const maxParticles = 24;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Add particle at cursor
      particles.push({
        x: mouse.x,
        y: mouse.y,
        alpha: 1,
        size: Math.random() * 2.5 + 1,
      });

      if (particles.length > maxParticles) {
        particles.shift();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw trailing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.alpha -= 0.025;
        p.size *= 0.97;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.6})`;
        ctx.fill();
      }

      // Draw cursor ring
      if (mouse.x > 0 && mouse.y > 0) {
        // Outer ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Crosshair lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 24, mouse.y);
        ctx.lineTo(mouse.x - 18, mouse.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouse.x + 18, mouse.y);
        ctx.lineTo(mouse.x + 24, mouse.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y - 24);
        ctx.lineTo(mouse.x, mouse.y - 18);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y + 18);
        ctx.lineTo(mouse.x, mouse.y + 24);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        mixBlendMode: 'difference',
      }}
    />
  );
}
