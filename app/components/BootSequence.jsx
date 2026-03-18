"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BootSequence({ onComplete }) {
  const textRef = useRef(null);
  const rootRef = useRef(null);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    const lines = [
      "Initializing Nimi_Core...",
      "Bypassing security protocols...",
      "Access Granted.",
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        setExplode(true);
        setTimeout(() => onComplete?.(), 850);
      },
    });

    lines.forEach((line, lineIndex) => {
      const row = document.createElement("div");
      row.style.opacity = "0";
      row.style.minHeight = "1.6em";

      line.split("").forEach((char) => {
        const s = document.createElement("span");
        s.textContent = char;
        s.style.opacity = "0";
        s.style.display = "inline-block";
        row.appendChild(s);
      });

      textRef.current?.appendChild(row);

      [...row.children].forEach((el, charIndex) => {
        tl.to(
          el,
          { opacity: 1, duration: 0.04, ease: "none" },
          0.2 + lineIndex * 0.9 + charIndex * 0.025
        );
      });

      tl.to(
        row,
        { opacity: 1, duration: 0.01 },
        0.2 + lineIndex * 0.9
      );
    });

    return () => tl.kill();
  }, [onComplete]);

  useEffect(() => {
    if (!explode || !rootRef.current) return;

    const particles = [];
    for (let i = 0; i < 120; i += 1) {
      const p = document.createElement("div");
      p.style.position = "absolute";
      p.style.left = "50%";
      p.style.top = "50%";
      p.style.width = "4px";
      p.style.height = "4px";
      p.style.borderRadius = "999px";
      p.style.background = "#4dffc3";
      p.style.boxShadow = "0 0 12px #4dffc3";
      rootRef.current.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 700,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    }

    return () => particles.forEach((p) => p.remove());
  }, [explode]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      <div
        ref={textRef}
        style={{
          color: "#4dffc3",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          letterSpacing: "0.06em",
          textShadow: "0 0 10px rgba(77,255,195,0.6)",
          fontSize: "clamp(14px, 2vw, 22px)",
          lineHeight: 1.8,
          textAlign: "left",
          minWidth: "min(92vw, 760px)",
          padding: "0 20px",
        }}
      />
    </div>
  );
}
