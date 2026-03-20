"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import AnimatedLogo from "../AnimatedLogo";

const revealPanels = [
  { id: "panel-1", kicker: "Product Reveal", title: "Hi, I'm MJ. Welcome to my digital workspace.", sub: "Building intelligent AI systems with personality. Let's explore some bold ideas." },
  { id: "panel-2", kicker: "Built by MJ", title: "Fusing Code, Design, and Carnatic Music.", sub: "I build precise, production-ready systems with playful, highly interactive user interfaces." },
  { id: "panel-3", kicker: "Focus", title: "Show, then smile.", sub: "Motion, interaction, personality." },
];

const projects = [
  {
    id: "ai-os",
    name: "AI Operations OS",
    line: "Signals become decisions in real time.",
    previewA: "Event mesh flow",
    previewB: "Routing telemetry",
    mood: "A robust data engine paired with a highly dynamic, intuitive interface.",
  },
  {
    id: "swara",
    name: "Carnatic Swara Generator",
    line: "Expressive melodic motion from intent.",
    previewA: "Raga phrase orbit",
    previewB: "Pitch glide engine",
    mood: "Classical Indian music theory driven by modern generative algorithms.",
  },
  {
    id: "morse",
    name: "Morse Mystique",
    line: "Puzzle logic with kinetic audio cues.",
    previewA: "Interactive level gate",
    previewB: "Signal timeline",
    mood: "game energy, clean craft",
  },
  {
    id: "energy",
    name: "Energy Research",
    line: "V2G simulations for smarter campus power.",
    previewA: "Grid optimization pass",
    previewB: "Scenario simulator",
    mood: "Academic-grade power grid simulations built with production-level speed.",
  },
  {
    id: "mood-music",
    name: "Mood Music",
    line: "Emotion-to-track recommendation playground.",
    previewA: "Mood detect panel",
    previewB: "Playlist handoff",
    mood: "lightweight, fun, useful",
  },
];

const communityMoments = ["Hack Arcade", "Student Chapters", "Campus Build Nights"];

const toolbox = [
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "React",
  "Node",
  "Express",
  "MongoDB",
  "Git",
  "VS Code",
  "FL Studio",
  "HOMER Pro",
  "Groq",
  "LLaMA",
];

const atmosphereFrames = [
  { id: "frame-1", label: "Sunset frame 01" },
  { id: "frame-2", label: "Sunset frame 02" },
  { id: "frame-3", label: "Sunset frame 03" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Page() {
  const root = useRef(null);
  const floatingLogoRef = useRef(null);
  const burstTimeoutRef = useRef(null);

  const [showFloatingLogo, setShowFloatingLogo] = useState(false);
  const [logoBurst, setLogoBurst] = useState(false);
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [githubProfile, setGithubProfile] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);

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
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-stage",
        { autoAlpha: 0, y: 24, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" }
      );

      gsap.to(".reveal-orb", {
        y: -16,
        x: 8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
      });

      gsap.utils.toArray(".reveal-panel").forEach((panel) => {
        const kicker = panel.querySelector(".reveal-kicker");
        const title = panel.querySelector(".reveal-title");
        const sub = panel.querySelector(".reveal-sub");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "+=120%",
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
            },
          })
          .fromTo(kicker, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.26 })
          .fromTo(title, { autoAlpha: 0, y: 50, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.32 }, 0.04)
          .fromTo(sub, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.12)
          .to([kicker, title, sub], { autoAlpha: 0.12, y: -28, duration: 0.3 }, "+=0.22");
      });

      ScrollTrigger.create({
        trigger: ".reveal-zone",
        start: "bottom top+=72",
        onEnter: () => setShowFloatingLogo(true),
        onEnterBack: () => setShowFloatingLogo(true),
        onLeaveBack: () => setShowFloatingLogo(false),
      });

      gsap.fromTo(
        ".project-card",
        { autoAlpha: 0, y: 30, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 74%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".identity-line, .identity-tag, .community-chip",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".identity-block",
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".readme-title, .equation-line, .vibe-line, .thought-line, .tool-chip, .pulse-card",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".readme-block",
            start: "top 74%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".community-title, .community-sub, .community-strip",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".community-block",
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.to(".contact-comet", {
        xPercent: 120,
        duration: 4,
        ease: "none",
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const loadGithub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("/api/github?type=profile", { cache: "no-store" }),
          fetch("/api/github?type=repos", { cache: "no-store" }),
        ]);

        const profile = await profileRes.json();
        const repos = await reposRes.json();

        setGithubProfile(profile || null);
        setGithubRepos(Array.isArray(repos) ? repos.slice(0, 4) : []);
      } catch {
        setGithubProfile(null);
        setGithubRepos([]);
      }
    };

    loadGithub();
  }, []);

  useEffect(() => {
    return () => {
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

      <section className="reveal-stage" aria-label="Opening reveal">
        <div className="reveal-orbs" aria-hidden="true">
          <span className="reveal-orb ro-1" />
          <span className="reveal-orb ro-2" />
          <span className="reveal-orb ro-3" />
        </div>
        <AnimatedLogo className="reveal-logo" />
        <p className="reveal-sticker">Midhun Raj | Digital Portfolio</p>
        <p className="reveal-stage-kicker">Midhun Raj · MJ</p>
      </section>

      <section className="reveal-zone" aria-label="Product reveal statements">
        {revealPanels.map((panel) => (
          <article key={panel.id} className="reveal-panel">
            <p className="reveal-kicker">{panel.kicker}</p>
            <h1 className="reveal-title">{panel.title}</h1>
            <p className="reveal-sub">{panel.sub}</p>
          </article>
        ))}
      </section>

      <section className="atmosphere-block" aria-label="Atmospheric visual layer">
        <div className="atmo-header">
          <p>Atmosphere</p>
          <h2>Your frames. Your texture.</h2>
        </div>
        <div className="atmo-grid">
          {atmosphereFrames.map((frame) => (
            <article key={frame.id} className="atmo-frame" aria-label={frame.label}>
              <span>{frame.label}</span>
            </article>
          ))}
        </div>
      </section>

      <motion.section
        className="identity-block"
        aria-label="Identity statement"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="identity-line">AI Product Engineer. Creative Technologist. Violin-first builder.</p>
        <div className="identity-tags" aria-label="Identity tags">
          <span className="identity-tag">Realtime Interfaces</span>
          <span className="identity-tag">Carnatic Audio Systems</span>
          <span className="identity-tag">Cinematic Product Design</span>
        </div>
      </motion.section>

      <motion.section
        className="readme-block"
        aria-label="README identity details"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="readme-title">From my GitHub README</p>
        <p className="equation-line">½ Developer + ½ Event Organiser + ½ Musician = Me.</p>
        <p className="vibe-line">Fusing Code, Design, and Carnatic Music. I build precise, production-ready systems that feature playful, highly interactive user interfaces.</p>
        <p className="thought-line">“I’ll sleep early tonight” usually becomes debugging code or arranging chords at 2 AM.</p>

        <div className="toolbox-grid" aria-label="Tech toolbox marquee">
          <Marquee speed={42} gradient={false} pauseOnHover>
            {toolbox.map((item) => (
              <span key={item} className="tool-chip marquee-chip">
                {item}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="github-pulse" aria-label="GitHub pulse">
          <article className="pulse-card">
            <p>Followers</p>
            <strong>{githubProfile?.followers ?? "--"}</strong>
          </article>
          <article className="pulse-card">
            <p>Public Repos</p>
            <strong>{githubProfile?.public_repos ?? "--"}</strong>
          </article>
          <article className="pulse-card repo-list">
            <p>Recent Repos</p>
            <ul>
              {githubRepos.length > 0 ? (
                githubRepos.map((repo) => <li key={repo.id}>{repo.name}</li>)
              ) : (
                <li>Loading pulse…</li>
              )}
            </ul>
          </article>
        </div>
      </motion.section>

      <motion.section
        className="projects-block"
        aria-label="Selected project previews"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="projects-head">
          <p>Selected Work</p>
          <h2>Interactive previews over long explanations.</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-card${activeProject === project.id ? " is-active" : ""}`}
              onMouseEnter={() => {
                setActiveProject(project.id);
              }}
              onFocus={() => {
                setActiveProject(project.id);
              }}
              tabIndex={0}
              aria-label={project.name}
            >
              <span className="goofy-spark gs-1" aria-hidden="true" />
              <span className="goofy-spark gs-2" aria-hidden="true" />
              <p className="project-name">{project.name}</p>
              <div className="project-reveal-wrap">
                <h3>{project.line}</h3>
                <p className="project-mood">{project.mood}</p>
                <div className="project-preview" aria-hidden="true">
                  <div className="preview-panel">
                    <span>{project.previewA}</span>
                    <div className="preview-wave" />
                  </div>
                  <div className="preview-panel alt">
                    <span>{project.previewB}</span>
                    <div className="preview-grid-scan" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="community-block"
        aria-label="Community orchestration"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="community-title">Building Community / Orchestrating Events</p>
        <p className="community-sub">Designing real-world momentum, with just the right amount of chaos.</p>
        <div className="community-strip" aria-label="Community highlights">
          {communityMoments.map((moment) => (
            <span key={moment} className="community-chip">
              {moment}
            </span>
          ))}
        </div>
        <p className="community-note">For college fests, chapter ecosystems, and hack nights where ideas become demos overnight.</p>
      </motion.section>

      <footer className="cine-contact" aria-label="Contact">
        <div className="contact-objects" aria-hidden="true">
          <span className="contact-comet-track">
            <span className="contact-comet" />
          </span>
          <span className="contact-pulse cp-1" />
          <span className="contact-pulse cp-2" />
        </div>

        <div className="contact-panel">
          <p className="contact-kicker">Contact</p>
          <h3>Open for sharp product collaborations.</h3>
          <div className="contact-tags" aria-label="Availability tags">
            <span>Freelance</span>
            <span>Collaborations</span>
            <span>Remote</span>
          </div>
        </div>

        <div className="contact-actions">
          <a className="cine-mail" href="mailto:jmidhunraj100@gmail.com">
            jmidhunraj100@gmail.com
          </a>
          <div className="contact-action-row">
            <a className="contact-link" href="https://github.com/MidhunRaj-J" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="contact-link" href="https://www.linkedin.com/in/midhunrajj/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="contact-link" href="https://instagram.com/midhunraj_j" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
