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

    const createDot = (width, height, startAbove = false) => {
      const radius = 1 + Math.random() * 2.25;

      return {
        x: Math.random() * width,
        y: startAbove ? -radius * 2 : Math.random() * height,
        radius,
        speed: 18 + Math.random() * 34,
        drift: -5 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.6,
      };
    };

    const drawDots = () => {
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      dots.forEach((dot) => {
        context.beginPath();
        context.fillStyle = `rgba(168, 85, 247, ${dot.opacity})`;
        context.shadowColor = "rgba(192, 132, 252, 0.75)";
        context.shadowBlur = dot.radius * 3;
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
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
        dot.y += dot.speed * elapsed;
        dot.x += dot.drift * elapsed;

        if (dot.y - dot.radius > height || dot.x < -10 || dot.x > width + 10) {
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
