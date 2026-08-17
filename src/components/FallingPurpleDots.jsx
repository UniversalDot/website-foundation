import { useEffect, useRef } from "react";

const DOT_DENSITY = 14000;
const MAX_DOTS = 90;

const FallingPurpleDots = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots = [];
    let animationFrame;
    let previousTime = performance.now();

    const createDot = (width, height, startAtBack = false) => {
      const depth = startAtBack ? Math.random() * 0.08 : Math.random();

      return {
        worldX: (Math.random() - 0.5) * width,
        worldY: (Math.random() - 0.65) * height,
        depth,
        radius: 1.25 + Math.random() * 1.75,
        fallSpeed: 14 + Math.random() * 24,
        approachSpeed: 0.09 + Math.random() * 0.1,
        drift: -4 + Math.random() * 8,
        opacity: 0.45 + Math.random() * 0.45,
      };
    };

    const drawDots = () => {
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      dots.forEach((dot) => {
        // Project each dot from a shared vanishing point. As its depth increases,
        // it grows, brightens, and spreads outward to appear to approach the viewer.
        const scale = 0.18 + Math.pow(dot.depth, 1.65) * 1.9;
        const x = canvas.clientWidth / 2 + dot.worldX * scale;
        const y = canvas.clientHeight * 0.2 + dot.worldY * scale + dot.depth * canvas.clientHeight * 0.16;
        const radius = dot.radius * scale;
        const opacity = dot.opacity * (0.2 + dot.depth * 0.8);

        context.beginPath();
        context.fillStyle = `rgba(168, 85, 247, ${opacity})`;
        context.shadowColor = "rgba(192, 132, 252, 0.75)";
        context.shadowBlur = radius * (1 + dot.depth * 3);
        context.arc(x, y, Math.max(0.35, radius), 0, Math.PI * 2);
        context.fill();
      });
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const dotCount = Math.min(MAX_DOTS, Math.max(24, Math.round((width * height) / DOT_DENSITY)));
      dots = Array.from({ length: dotCount }, () => createDot(width, height));
      drawDots();
    };

    const animate = (time) => {
      const elapsed = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      dots.forEach((dot, index) => {
        dot.depth += dot.approachSpeed * elapsed;
        dot.worldY += dot.fallSpeed * elapsed;
        dot.worldX += dot.drift * elapsed;

        if (dot.depth > 1 || dot.worldY > height * 0.55) {
          dots[index] = createDot(width, height, true);
        }
      });

      drawDots();
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      animationFrame = window.requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
};

export default FallingPurpleDots;
