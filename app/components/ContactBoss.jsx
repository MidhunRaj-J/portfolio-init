"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";

const swaras = ["Sa", "Ri", "Ga", "Ma", "Pa", "Dha", "Ni", "Sa2"];
const freqs = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];

export default function ContactBoss() {
  const [terminalInput, setTerminalInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [decoded, setDecoded] = useState("");
  const [progress, setProgress] = useState(0);
  const fxRef = useRef(null);

  const contacts = useMemo(
    () => ({
      email: "contact@midhunraj.dev",
      github: "https://github.com/MidhunRaj-J",
      twitter: "https://twitter.com/MidhunRaj_J",
    }),
    []
  );

  const beep = (frequency) => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = frequency;
    osc.type = "triangle";
    gain.gain.value = 0.0001;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    osc.stop(ctx.currentTime + 0.24);
  };

  const unlockVisual = () => {
    setUnlocked(true);
    if (!fxRef.current) return;

    for (let i = 0; i < 40; i += 1) {
      const p = document.createElement("div");
      p.style.position = "absolute";
      p.style.left = "50%";
      p.style.top = "50%";
      p.style.width = "7px";
      p.style.height = "7px";
      p.style.borderRadius = "50%";
      p.style.background = "#d86cff";
      p.style.boxShadow = "0 0 12px #d86cff";
      fxRef.current.appendChild(p);

      gsap.to(p, {
        x: (Math.random() - 0.5) * 900,
        y: (Math.random() - 0.5) * 520,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.8,
        ease: "power2.out",
        onComplete: () => p.remove(),
      });
    }
  };

  const runTerminalCommand = async () => {
    if (terminalInput.trim().toLowerCase() !== "sudo contact --email") return;

    let out = "";
    for (const ch of contacts.email) {
      out += ch;
      setDecoded(out);
      await new Promise((resolve) => setTimeout(resolve, 45));
    }

    unlockVisual();
  };

  const playSwara = (index) => {
    beep(freqs[index]);

    if (index === progress) {
      const next = progress + 1;
      setProgress(next);
      if (next === swaras.length) {
        setProgress(0);
        unlockVisual();
      }
    } else {
      setProgress(0);
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#03050a",
        color: "#a9ffd9",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <div
        ref={fxRef}
        style={{
          width: "min(980px, 100%)",
          border: "1px solid rgba(120,245,200,0.45)",
          borderRadius: 16,
          padding: 20,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 0 30px rgba(63,255,182,0.12)",
          background: "rgba(5,10,18,0.75)",
        }}
      >
        <h2
          style={{
            margin: "0 0 20px",
            textAlign: "center",
            letterSpacing: "0.08em",
            fontFamily: "ui-monospace, Menlo, monospace",
          }}
        >
          FINAL BOSS CONTACT
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <div style={{ border: "1px solid rgba(120,245,200,0.45)", borderRadius: 12, padding: 14 }}>
            <p style={{ margin: "0 0 10px", fontFamily: "ui-monospace, Menlo, monospace" }}>HACKER ROUTE</p>
            <p style={{ margin: "0 0 10px", opacity: 0.8, fontSize: 13 }}>Type: sudo contact --email</p>
            <input
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runTerminalCommand()}
              placeholder=">"
              style={{
                width: "100%",
                background: "#02070d",
                color: "#a9ffd9",
                border: "1px solid rgba(120,245,200,0.45)",
                borderRadius: 8,
                padding: "10px 12px",
                outline: "none",
              }}
            />
            {decoded && <p style={{ marginTop: 10, color: "#66ffba", wordBreak: "break-all" }}>{decoded}</p>}
          </div>

          <div style={{ border: "1px solid rgba(216,108,255,0.55)", borderRadius: 12, padding: 14 }}>
            <p style={{ margin: "0 0 10px", fontFamily: "ui-monospace, Menlo, monospace", color: "#e4b0ff" }}>
              MUSICIAN ROUTE
            </p>
            <p style={{ margin: "0 0 10px", opacity: 0.85, fontSize: 13, color: "#e4b0ff" }}>
              Play: {swaras.join(" → ")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 8 }}>
              {swaras.map((note, i) => (
                <button
                  key={note}
                  type="button"
                  onClick={() => playSwara(i)}
                  style={{
                    border: "1px solid rgba(216,108,255,0.55)",
                    background: "rgba(216,108,255,0.08)",
                    color: "#f4d4ff",
                    padding: "8px 0",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  {note}
                </button>
              ))}
            </div>
            <p style={{ marginTop: 10, fontSize: 12, color: "#e4b0ff" }}>Progress: {progress}/{swaras.length}</p>
          </div>
        </div>

        {unlocked && (
          <div
            style={{
              marginTop: 18,
              border: "1px solid rgba(120,245,200,0.45)",
              borderRadius: 12,
              padding: 12,
              display: "grid",
              gap: 6,
            }}
          >
            <a href={`mailto:${contacts.email}`} style={{ color: "#80ffcb" }}>
              {contacts.email}
            </a>
            <a href={contacts.github} target="_blank" rel="noreferrer" style={{ color: "#80ffcb" }}>
              GitHub
            </a>
            <a href={contacts.twitter} target="_blank" rel="noreferrer" style={{ color: "#80ffcb" }}>
              Twitter
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
