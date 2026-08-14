import { useEffect, useRef } from "react";

const DOT_COUNT = 90;
const LINK_DISTANCE = 150;

const FallingDots = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: -1000, y: -1000 };
    let dots = [];
    let frameId;
    let width = 0;
    let height = 0;

    const createDot = (randomY = true) => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -8,
      radius: 1 + Math.random(),
      speed: 0.35 + Math.random() * 0.85,
      drift: (Math.random() - 0.5) * 0.25,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      dots = Array.from({ length: DOT_COUNT }, () => createDot());
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      dots.forEach((dot, index) => {
        if (!reduceMotion.matches) {
          dot.y += dot.speed;
          dot.x += dot.drift;

          const pointerDistance = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
          if (pointerDistance < 75 && pointerDistance > 0) {
            const repulse = (75 - pointerDistance) / 75;
            dot.x += ((dot.x - pointer.x) / pointerDistance) * repulse * 2.5;
            dot.y += ((dot.y - pointer.y) / pointerDistance) * repulse * 2.5;
          }

          if (dot.y > height + 8 || dot.x < -8 || dot.x > width + 8) {
            dots[index] = createDot(false);
            return;
          }
        }

        for (let linkedIndex = index + 1; linkedIndex < dots.length; linkedIndex += 1) {
          const linkedDot = dots[linkedIndex];
          const distance = Math.hypot(dot.x - linkedDot.x, dot.y - linkedDot.y);
          if (distance < LINK_DISTANCE) {
            context.beginPath();
            context.moveTo(dot.x, dot.y);
            context.lineTo(linkedDot.x, linkedDot.y);
            context.strokeStyle = `rgba(255, 255, 255, ${0.28 * (1 - distance / LINK_DISTANCE)})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 255, 255, 0.8)";
        context.fill();
      });

      frameId = window.requestAnimationFrame(draw);
    };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const clearPointer = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", updatePointer);
    canvas.addEventListener("pointerleave", clearPointer);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-[5] h-full w-full"
      aria-hidden="true"
    />
  );
};

export default FallingDots;
