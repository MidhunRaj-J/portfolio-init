"use client";

import { useEffect, useRef } from "react";

export default function QuantumVoid({ onCameraClick, onProceed }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let tick = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      tick += 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.fillStyle = "rgba(2,6,12,0.25)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      ctx.beginPath();
      for (let i = 0; i <= 140; i += 1) {
        const t = i / 140;
        const x = t * w;
        const y =
          cy +
          Math.sin(t * 24 + tick * 0.035) * 28 +
          Math.sin(t * 8 + tick * 0.01) * 24;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#4dffc3";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#4dffc3";
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      const cards = [
        { x: cx - 230, y: cy - 50, label: "HEALTH GRID" },
        { x: cx, y: cy - 130, label: "SWARA AI" },
        { x: cx + 230, y: cy - 40, label: "HACKATHON" },
      ];

      cards.forEach((card) => {
        ctx.strokeStyle = "rgba(77,255,195,0.8)";
        ctx.fillStyle = "rgba(77,255,195,0.08)";
        ctx.fillRect(card.x - 54, card.y - 54, 108, 108);
        ctx.strokeRect(card.x - 54, card.y - 54, 108, 108);
        ctx.fillStyle = "#b8ffe9";
        ctx.font = "12px ui-monospace, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(card.label, card.x, card.y + 72);
      });

      const camX = cx;
      const camY = h - 96;
      ctx.strokeStyle = "#ffe75f";
      ctx.strokeRect(camX - 42, camY - 28, 84, 56);
      ctx.beginPath();
      ctx.arc(camX, camY, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = "11px ui-monospace, Menlo, monospace";
      ctx.fillStyle = "#ffe75f";
      ctx.fillText("CAMERA", camX, camY + 46);

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const camX = canvas.clientWidth / 2;
    const camY = canvas.clientHeight - 96;

    if (Math.abs(x - camX) < 56 && Math.abs(y - camY) < 42) {
      onCameraClick?.();
    } else {
      onProceed?.();
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#020409",
        position: "relative",
        cursor: "crosshair",
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={onCanvasClick}
        style={{ width: "100%", height: "100vh", display: "block" }}
      />
    </section>
  );
}
