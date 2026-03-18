"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedLogo from "../AnimatedLogo";

const projects = [
  {
    id: "ai-os",
    name: "AI Operations OS",
    tagline: "Intelligence, Orchestrated.",
    detail: "A real-time orchestration layer that routes product events into actionable intelligence.",
    chips: ["React", "ML", "Event Architecture"],
    metrics: ["42ms routing", "99.95% uptime", "128 live flows"],
  },
  {
    id: "swara",
    name: "Carnatic Swara Generator",
    tagline: "Computation, in Raga.",
    detail: "A generative audio engine that maps intent to expressive Carnatic melodic motion.",
    chips: ["DSP", "Generative Audio", "Creative AI"],
    metrics: ["21 raga models", "7.1k phrase maps", "Real-time pitch glide"],
  },
];

const techSpecs = [
  { label: "Interface", value: "React + Next.js" },
  { label: "Systems", value: "ML + Event Streams" },
  { label: "Audio", value: "Real-time DSP + Lo-fi" },
  { label: "Runtime", value: "JavaScript / Node" },
  { label: "Design", value: "Cinematic Product UI" },
  { label: "Output", value: "Production-ready Experiences" },
];

const equationParts = ["Builder", "Event Systems", "Musician"];

const buildLab = [
  {
    name: "NexusFleet",
    summary: "A peer-to-peer delivery platform connecting travellers with people who need items moved quickly.",
    stack: "MERN Stack",
  },
  {
    name: "NeuroBridge",
    summary: "An assistive health chatbot for people with speech difficulties, powered by LLM workflows.",
    stack: "Python + LLMs",
  },
  {
    name: "Morse Mystique",
    summary: "A two-level Morse puzzle event site with audio cues and progression logic.",
    stack: "Web + Puzzle Logic",
  },
];

const ambientOrbs = [
  { x: "8%", y: "22%", size: 110, delay: 0.1 },
  { x: "22%", y: "72%", size: 54, delay: 0.3 },
  { x: "42%", y: "16%", size: 72, delay: 0.5 },
  { x: "62%", y: "78%", size: 64, delay: 0.7 },
  { x: "74%", y: "28%", size: 140, delay: 0.2 },
  { x: "90%", y: "68%", size: 48, delay: 0.6 },
];

const heroStars = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: `${8 + (index * 5) % 84}%`,
  y: `${12 + (index * 7) % 72}%`,
  delay: (index % 6) * 0.18,
}));

function SectionGate({ label, title, variant = "a" }) {
  return (
    <header className={`section-gate section-gate-${variant}`} aria-label={`${label} section header`}>
      <div className="section-gate-track" aria-hidden="true">
        <span className="section-gate-rect rect-1" />
        <span className="section-gate-rect rect-2" />
        <span className="section-gate-rect rect-3" />
        <span className="section-gate-rect rect-4" />
      </div>
      <div className="section-gate-ornaments" aria-hidden="true">
        <span className="gate-orb go-1" />
        <span className="gate-orb go-2" />
        <span className="gate-line" />
      </div>
      <p className="section-gate-label">{label}</p>
      <h2 className="section-gate-title">{title}</h2>
    </header>
  );
}

export default function Page() {
  const root = useRef(null);
  const audioReadyRef = useRef(false);
  const audioNodesRef = useRef(null);
  const floatingLogoRef = useRef(null);
  const burstTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFloatingLogo, setShowFloatingLogo] = useState(false);
  const [logoBurst, setLogoBurst] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cine-abstract",
        { autoAlpha: 0, scale: 0.92, filter: "blur(12px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 1.9, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-ambient .ambient-orb",
        { autoAlpha: 0, scale: 0.6 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      gsap.to(".hero-ambient .ambient-orb", {
        y: -14,
        x: 8,
        duration: 4.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: "random",
        },
      });

      gsap.to(".hero-stars .micro-star", {
        autoAlpha: 0.2,
        scale: 0.4,
        duration: 1.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.06,
          from: "random",
        },
      });

      gsap.to(".light-streak", {
        xPercent: 18,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      });

      gsap.fromTo(
        ".hero-stat-card",
        { autoAlpha: 0, y: 20, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.45,
        }
      );

      gsap.to(".hero-stat-card", {
        y: -8,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

      gsap.to(".hero-orbit-core", {
        rotate: 360,
        duration: 14,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".hero-grid-overlay .grid-glow", {
        xPercent: 140,
        duration: 4.2,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".hero-logo", {
        y: -10,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-ambient", {
        yPercent: -24,
        scrollTrigger: {
          trigger: ".cine-reveal",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      ScrollTrigger.create({
        trigger: ".cine-reveal",
        start: "bottom top+=72",
        onEnter: () => setShowFloatingLogo(true),
        onEnterBack: () => setShowFloatingLogo(true),
        onLeaveBack: () => setShowFloatingLogo(false),
      });

      gsap.to(".product-orb", {
        y: -12,
        x: 10,
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
      });

      gsap.to(".intro-objects .intro-orb", {
        y: -12,
        x: 8,
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".intro-objects .intro-beam", {
        xPercent: 90,
        duration: 3.1,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".scan-line", {
        xPercent: 180,
        duration: 2.6,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".mini-bars span", {
        scaleY: 0.24,
        transformOrigin: "bottom center",
        duration: 0.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.08,
          from: "random",
        },
      });

      gsap.fromTo(
        ".headline-word",
        { autoAlpha: 0, y: 38, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cine-intro",
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".cine-intro-sub",
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cine-intro",
            start: "top 68%",
            end: "top 38%",
            scrub: 1,
          },
        }
      );

      const mediaMatcher = gsap.matchMedia();

      mediaMatcher.add("(min-width: 981px)", () => {
        gsap.utils.toArray(".cine-feature").forEach((panel) => {
          const media = panel.querySelector(".cine-feature-media-track");
          const copy = panel.querySelector(".cine-feature-copy");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: "top top",
                end: "+=135%",
                scrub: 0.85,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(copy, { autoAlpha: 0.45, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.45 })
            .fromTo(media, { yPercent: 8 }, { yPercent: -30, duration: 1 }, 0);
        });
      });

      mediaMatcher.add("(max-width: 980px)", () => {
        gsap.utils.toArray(".cine-feature").forEach((panel) => {
          const copy = panel.querySelector(".cine-feature-copy");
          const media = panel.querySelector(".cine-feature-media");

          gsap.fromTo(
            [copy, media],
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.14,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 78%",
                once: true,
              },
            }
          );
        });
      });

      gsap.fromTo(
        ".cine-tech-grid .spec-card",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cine-tech",
            start: "top 68%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".cine-profile-copy",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cine-profile",
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".cine-profile-grid .profile-pill",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cine-profile",
            start: "top 66%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".vibe-equation .equation-chip, .vibe-lab .lab-card, .vibe-thought .thought-quote",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".vibe-section",
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.utils.toArray(".section-gate").forEach((gate) => {
        const rects = gate.querySelectorAll(".section-gate-rect");
        const texts = gate.querySelectorAll(".section-gate-label, .section-gate-title");

        gsap.fromTo(
          rects,
          { clipPath: "inset(0 100% 0 0)", x: -24, autoAlpha: 0.35 },
          {
            clipPath: "inset(0 0% 0 0)",
            x: 0,
            autoAlpha: 1,
            duration: 0.84,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gate,
              start: "top 86%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          texts,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gate,
              start: "top 84%",
              once: true,
            },
          }
        );
      });

      gsap.to(".gate-orb", {
        y: -4,
        duration: 1.7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
      });

      gsap.to(".gate-line", {
        xPercent: 30,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray(".feature-shot").forEach((shot) => {
        gsap.fromTo(
          shot,
          { autoAlpha: 0.38, scale: 0.95, y: 20 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.95,
            ease: "power2.out",
            scrollTrigger: {
              trigger: shot,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".feature-telemetry li",
        { autoAlpha: 0, x: -12 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cine-feature-media",
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".contact-panel, .contact-actions",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cine-contact",
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.to(".prism", {
        rotateY: 360,
        rotateX: 14,
        transformOrigin: "50% 50% -6px",
        duration: 6.2,
        ease: "none",
        repeat: -1,
        stagger: 0.24,
      });

      gsap.to(".holo-plate", {
        y: -8,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".shot-ring", {
        rotate: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".grid-sweep", {
        xPercent: 120,
        duration: 2.8,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".crazy-cube", {
        rotateY: 360,
        rotateX: 360,
        duration: 10,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".profile-helix", {
        rotate: 360,
        duration: 9,
        ease: "none",
        repeat: -1,
        stagger: 0.3,
      });

      gsap.to(".vibe-particle", {
        y: -10,
        x: 6,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.08,
      });

      gsap.to(".tech-gyro", {
        rotateY: 360,
        rotateX: 14,
        duration: 7,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".contact-comet", {
        xPercent: 120,
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const toggleLofi = async () => {
    if (!audioReadyRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const context = new AudioCtx();

      const master = context.createGain();
      master.gain.value = 0.22;
      master.connect(context.destination);

      const lowpass = context.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 980;
      lowpass.Q.value = 0.9;
      lowpass.connect(master);

      const chordProgression = [
        [130.81, 164.81, 196.0],
        [110.0, 138.59, 174.61],
        [87.31, 110.0, 130.81],
        [98.0, 123.47, 155.56],
      ];

      const bassLine = [65.41, 65.41, 55.0, 55.0, 43.65, 43.65, 49.0, 49.0];

      const playTone = (frequency, duration, type = "triangle", gainValue = 0.12) => {
        const now = context.currentTime;
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(gain);
        gain.connect(lowpass);
        osc.start(now);
        osc.stop(now + duration + 0.05);
      };

      const playHat = () => {
        const now = context.currentTime;
        const bufferSize = context.sampleRate * 0.05;
        const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i += 1) {
          output[i] = (Math.random() * 2 - 1) * 0.26;
        }

        const noise = context.createBufferSource();
        noise.buffer = noiseBuffer;

        const bandpass = context.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.value = 5800;
        bandpass.Q.value = 2.2;

        const gain = context.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

        noise.connect(bandpass);
        bandpass.connect(gain);
        gain.connect(master);
        noise.start(now);
        noise.stop(now + 0.05);
      };

      let chordStep = 0;
      let bassStep = 0;
      const quarterMs = 810;

      const beatInterval = window.setInterval(() => {
        const chord = chordProgression[chordStep % chordProgression.length];
        chord.forEach((frequency) => playTone(frequency, 1.65, "triangle", 0.09));
        playTone(bassLine[bassStep % bassLine.length], 0.45, "sine", 0.11);
        chordStep += 1;
        bassStep += 1;
      }, quarterMs * 2);

      const hatInterval = window.setInterval(() => {
        playHat();
      }, quarterMs / 2);

      audioNodesRef.current = { context, beatInterval, hatInterval, master, lowpass };
      audioReadyRef.current = true;
    }

    if (isPlaying) {
      await audioNodesRef.current.context.suspend();
      setIsPlaying(false);
    } else {
      await audioNodesRef.current.context.resume();
      setIsPlaying(true);
    }
  };

  const handleFloatingLogoClick = () => {
    setLogoBurst(true);

    if (floatingLogoRef.current) {
      gsap.fromTo(
        floatingLogoRef.current,
        { scale: 1, rotate: 0 },
        { scale: 1.08, rotate: 8, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }

    if (burstTimeoutRef.current) {
      window.clearTimeout(burstTimeoutRef.current);
    }

    burstTimeoutRef.current = window.setTimeout(() => {
      setLogoBurst(false);
    }, 760);
  };

  useEffect(() => {
    return () => {
      if (audioNodesRef.current) {
        window.clearInterval(audioNodesRef.current.beatInterval);
        window.clearInterval(audioNodesRef.current.hatInterval);
        audioNodesRef.current.master?.disconnect();
        audioNodesRef.current.lowpass?.disconnect();
        audioNodesRef.current.context?.close();
      }

      if (burstTimeoutRef.current) {
        window.clearTimeout(burstTimeoutRef.current);
      }
    };
  }, []);

  return (
    <main ref={root} className="cine-page">
      <button
        ref={floatingLogoRef}
        type="button"
        className={`floating-logo-btn${showFloatingLogo ? " is-visible" : ""}${logoBurst ? " is-bursting" : ""}`}
        aria-label="Open logo animation"
        onClick={handleFloatingLogoClick}
      >
        <AnimatedLogo className="floating-logo-mark" />
        <span className="logo-burst-dot d1" aria-hidden="true" />
        <span className="logo-burst-dot d2" aria-hidden="true" />
        <span className="logo-burst-dot d3" aria-hidden="true" />
        <span className="logo-burst-ring" aria-hidden="true" />
      </button>

      <section className="cine-reveal" aria-label="Opening reveal">
        <div className="cine-abstract-wrap">
          <div className="cine-abstract">
            <div className="hero-welcome">
              <p className="hero-welcome-kicker">Midhun Raj · MJ</p>
              <h2>Midhun Raj (MJ)</h2>
              <p>AI Product Engineer · Creative Technologist · Music Technologist</p>
              <div className="hero-welcome-tags">
                <span>Product Systems</span>
                <span>Realtime Interfaces</span>
                <span>Music + Code</span>
              </div>
            </div>
            <AnimatedLogo className="hero-logo" />
            <div className="hero-ambient" aria-hidden="true">
              {ambientOrbs.map((orb, index) => (
                <span
                  key={`${orb.x}-${orb.y}-${index}`}
                  className="ambient-orb"
                  style={{
                    "--orb-x": orb.x,
                    "--orb-y": orb.y,
                    "--orb-size": `${orb.size}px`,
                    "--orb-delay": `${orb.delay}s`,
                  }}
                />
              ))}
            </div>
            <div className="hero-stars" aria-hidden="true">
              {heroStars.map((star) => (
                <span
                  key={star.id}
                  className="micro-star"
                  style={{
                    "--star-x": star.x,
                    "--star-y": star.y,
                    "--star-delay": `${star.delay}s`,
                  }}
                />
              ))}
            </div>
            <div className="hero-streaks" aria-hidden="true">
              <span className="light-streak s1" />
              <span className="light-streak s2" />
              <span className="light-streak s3" />
            </div>
            <div className="hero-density-layer" aria-hidden="true">
              <div className="hero-stat-stack">
                <article className="hero-stat-card">
                  <span>Live flows</span>
                  <strong>128</strong>
                </article>
                <article className="hero-stat-card">
                  <span>Routing speed</span>
                  <strong>42ms</strong>
                </article>
                <article className="hero-stat-card">
                  <span>Systems uptime</span>
                  <strong>99.95%</strong>
                </article>
              </div>
              <div className="hero-orbit-shell">
                <span className="hero-orbit-core">
                  <span className="hero-ring hr-1" />
                  <span className="hero-ring hr-2" />
                  <span className="hero-dot" />
                </span>
              </div>
              <div className="hero-grid-overlay">
                <span className="grid-glow" />
              </div>
            </div>
            <div className="wave w1" />
            <div className="wave w2" />
            <div className="wave w3" />
            <div className="music-bars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="music-orbits" aria-hidden="true">
              <span className="orbit o1" />
              <span className="orbit o2" />
              <span className="orbit o3" />
            </div>
          </div>
        </div>
      </section>

      <section className="cine-intro" aria-label="Introduction">
        <p className="cine-intro-kicker">MJ</p>
        <h1 className="cine-intro-headline">
          <span className="headline-word">AI</span>{" "}
          <span className="headline-word">Systems.</span>{" "}
          <span className="headline-word">Musical</span>{" "}
          <span className="headline-word">Interfaces.</span>
        </h1>
        <p className="cine-intro-sub">
          Kerala-based builder turning complex systems into fast, expressive product experiences.
        </p>
        <div className="cine-intro-tags" aria-label="Personality tags">
          <span>Build with Intent</span>
          <span>Ship with Craft</span>
          <span>Design with Rhythm</span>
        </div>
        <div className="intro-objects" aria-hidden="true">
          <span className="intro-orb io-1" />
          <span className="intro-orb io-2" />
          <span className="intro-orb io-3" />
          <span className="intro-beam-track">
            <span className="intro-beam" />
          </span>
        </div>
        <p className="cine-scroll-hint">Scroll to explore selected work</p>
      </section>

      <SectionGate label="Identity" title="Systems Thinking. Creative Execution." variant="a" />

      <section className="cine-profile" aria-label="Profile introduction">
        <div className="cine-profile-copy">
          <p className="profile-kicker">Profile</p>
          <h2>Building intelligent digital products with musical precision.</h2>
          <p>
            I design and ship product experiences for teams, communities, and events by combining
            AI systems, live interaction design, and sound-driven thinking.
          </p>
        </div>
        <div className="cine-profile-grid" aria-label="Core identity">
          <span className="profile-pill">AI Product Architecture</span>
          <span className="profile-pill">Realtime Event Systems</span>
          <span className="profile-pill">Carnatic + Lo-fi Experiments</span>
          <span className="profile-pill">React Experience Engineering</span>
        </div>
        <div className="studio-meter" aria-label="Musical activity">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="profile-objects" aria-hidden="true">
          <span className="profile-helix ph-1" />
          <span className="profile-helix ph-2" />
          <span className="profile-node" />
        </div>
      </section>

      <SectionGate label="Lab" title="Fast Experiments, Useful Outcomes." variant="b" />

      <section className="vibe-section" aria-label="GitHub profile vibe">
        <div className="vibe-objects" aria-hidden="true">
          <span className="vibe-particle vp-1" />
          <span className="vibe-particle vp-2" />
          <span className="vibe-particle vp-3" />
          <span className="vibe-particle vp-4" />
          <span className="vibe-wave" />
        </div>
        <div className="vibe-equation">
          <p className="vibe-kicker">The Equation</p>
          <div className="equation-row">
            {equationParts.map((part) => (
              <span key={part} className="equation-chip">
                {part}
              </span>
            ))}
            <span className="equation-result">= MJ</span>
          </div>
        </div>

        <div className="vibe-lab">
          <p className="vibe-kicker">The Build Lab</p>
          <div className="lab-grid">
            {buildLab.map((item) => (
              <article key={item.name} className="lab-card">
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <span>{item.stack}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="vibe-thought">
          <p className="vibe-kicker">Random Thought</p>
          <p className="thought-quote">
            “Most nights start with one tiny fix and end with a shipped feature or a new melody.”
          </p>
        </div>
      </section>

      <SectionGate label="Features" title="Selected Product Highlights" variant="c" />

      {projects.map((project) => (
        <section key={project.id} className="cine-feature" aria-label={project.name}>
          <div className="cine-feature-grid">
            <aside className="cine-feature-copy">
              <p className="feature-label">Feature</p>
              <h2>{project.name}</h2>
              <p className="feature-tagline feature-glow">{project.tagline}</p>
              <p className="feature-detail">{project.detail}</p>
            </aside>

            <div className="cine-feature-media">
              <div className="cine-feature-media-track">
                <article className="feature-shot first">
                  <span>01</span>
                  <h3>High-fidelity interaction canvas</h3>
                  <div className="shot-objects">
                    <div className="product-orb orb-a" />
                    <div className="product-orb orb-b" />
                    <div className="product-orb orb-c" />
                    <div className="prism-cluster" aria-hidden="true">
                      <span className="prism prism-1" />
                      <span className="prism prism-2" />
                      <span className="prism prism-3" />
                    </div>
                    <div className="ring-cluster" aria-hidden="true">
                      <span className="shot-ring r1" />
                      <span className="shot-ring r2" />
                    </div>
                    <div className="cube-dock" aria-hidden="true">
                      <span className="crazy-cube">
                        <span className="cube-face face-front" />
                        <span className="cube-face face-back" />
                        <span className="cube-face face-left" />
                        <span className="cube-face face-right" />
                        <span className="cube-face face-top" />
                        <span className="cube-face face-bottom" />
                      </span>
                    </div>
                    <div className="scan-track">
                      <div className="scan-line" />
                    </div>
                    <div className="holo-plate" aria-hidden="true">
                      <span className="holo-dot" />
                      <span className="holo-dot" />
                      <span className="holo-dot" />
                    </div>
                    <div className="mini-bars" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </article>
                <article className="feature-shot second">
                  <span>02</span>
                  <h3>Telemetry-driven response engine</h3>
                  <div className="grid-track" aria-hidden="true">
                    <span className="grid-sweep" />
                  </div>
                  <ul className="feature-telemetry" aria-label="Feature telemetry">
                    {project.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </article>
                <article className="feature-chip-row" aria-label="Technology stack">
                  {project.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </article>
              </div>
            </div>
          </div>
        </section>
      ))}

      <SectionGate label="Specs" title="Technology and Delivery Stack" variant="a" />

      <section className="cine-tech" aria-label="Tech specs">
        <div className="tech-objects" aria-hidden="true">
          <span className="tech-gyro">
            <span className="tech-ring tr-1" />
            <span className="tech-ring tr-2" />
            <span className="tech-ring tr-3" />
          </span>
        </div>
        <p className="spec-caption">Tech Specs</p>
        <div className="cine-tech-grid">
          {techSpecs.map((spec) => (
            <article key={spec.label} className="spec-card">
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <SectionGate label="Contact" title="Open to Meaningful Collaborations." variant="b" />

      <footer className="cine-contact" aria-label="Contact">
        <div className="contact-objects" aria-hidden="true">
          <span className="contact-comet-track">
            <span className="contact-comet" />
          </span>
          <span className="contact-pulse cp-1" />
          <span className="contact-pulse cp-2" />
        </div>
        <div className="contact-panel">
          <p className="contact-kicker">Contact Me</p>
          <h3>Let’s build your next product with speed and clarity.</h3>
          <p>
            Available for product engineering, AI-powered interface work, and creative technology collaborations.
          </p>
          <div className="contact-tags" aria-label="Availability tags">
            <span>Open for freelance</span>
            <span>Project collaborations</span>
            <span>Remote ready</span>
          </div>
        </div>

        <div className="contact-actions">
          <a className="cine-mail" href="mailto:contact@midhunraj.dev">
            contact@midhunraj.dev
          </a>
          <div className="contact-action-row">
            <a className="contact-link" href="https://github.com/MidhunRaj-J" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <button
              type="button"
              className="cine-play"
              onClick={toggleLofi}
              aria-label={isPlaying ? "Pause lo-fi track" : "Play lo-fi track"}
            >
              <span className="play-icon" aria-hidden="true" />
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
