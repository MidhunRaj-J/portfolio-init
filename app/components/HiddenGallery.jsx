"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HiddenGallery({ isVisible, onClose }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !rootRef.current) return;

    gsap.fromTo(
      rootRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );

    gsap.fromTo(
      ".hg-card",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out", delay: 0.1 }
    );
  }, [isVisible]);

  if (!isVisible) return null;

  const items = ["Street", "Studio", "Event", "Research", "Jam", "Night"];

  return (
    <div
      ref={rootRef}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(0,0,0,0.92)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(980px, 100%)",
          border: "1px solid rgba(120,245,200,0.45)",
          borderRadius: 16,
          padding: 16,
          background: "rgba(4,10,18,0.86)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: "#9effd8", fontFamily: "ui-monospace, Menlo, monospace" }}>
            CAPTURED MOMENTS
          </h3>
          <button
            onClick={onClose}
            style={{
              border: "1px solid rgba(120,245,200,0.45)",
              background: "transparent",
              color: "#9effd8",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            CLOSE
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
          {items.map((item) => (
            <div
              key={item}
              className="hg-card"
              style={{
                aspectRatio: "1 / 1",
                border: "1px solid rgba(120,245,200,0.45)",
                borderRadius: 10,
                display: "grid",
                placeItems: "center",
                color: "#a8ffd9",
                fontFamily: "ui-monospace, Menlo, monospace",
                background: "linear-gradient(135deg, rgba(158,255,216,0.06), rgba(90,153,255,0.08))",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
