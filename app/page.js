"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import AnimatedLogo from "../AnimatedLogo";
import HeroCtaButtons from "./components/HeroCtaButtons";
import ProjectCard from "./components/ProjectCard";
import ProjectSpotlightModal from "./components/ProjectSpotlightModal";
import CommandPalette from "./components/CommandPalette";
import ScrollStoryTimeline from "./components/ScrollStoryTimeline";

const revealPanels = [
  { id: "panel-1", kicker: "Product Engineer", title: "I build AI products that are fast, useful, and memorable.", sub: "From idea to interface, I turn complex workflows into clear interactions." },
  { id: "panel-2", kicker: "Built by MJ", title: "Code, design, and Carnatic thinking in one workflow.", sub: "I ship production-ready systems with strong UX, clean architecture, and a distinctive product voice." },
  { id: "panel-3", kicker: "Focus", title: "Solve real problems, then make it feel effortless.", sub: "Reliable engineering, thoughtful motion, and details that earn trust." },
];

const projects = [
  {
    id: "nexusfleet",
    name: "NexusFleet",
    line: "P2P delivery platform that connects travelers with people who need items moved.",
    previewA: "Travel match flow",
    previewB: "Delivery routing",
    mood: "Role: Product build · Stack: MERN stack · Outcome: a clearer delivery handoff flow.",
    featured: "Featured because it is the most product-complete repo and maps directly to a real-world logistics use case.",
    problem: "People needed a simple way to move items through trusted traveler handoffs.",
    approach: "Designed the request, match, and handoff flow around a marketplace-style delivery experience.",
    impact: "Turns a logistics problem into a straightforward exchange flow.",
    role: "Product + Full-stack",
    stack: "MongoDB, Express, React, Node",
  },
  {
    id: "neuro-bridge",
    name: "Neuro-Bridge",
    line: "Health chatbot for people with speech difficulties using LLM support.",
    previewA: "Assistive care flow",
    previewB: "LLM response path",
    mood: "Role: AI prototype · Stack: Python + Groq + LLaMA · Outcome: more accessible conversation support.",
    featured: "Featured because it shows applied AI with an accessibility angle rather than a generic chatbot demo.",
    problem: "Communication support tools needed a more inclusive conversational path.",
    approach: "Built an AI assistant workflow geared toward speech-impaired users.",
    impact: "Makes support interactions feel more usable and less effortful.",
    role: "AI application design",
    stack: "Python, Groq, LLaMA",
  },
  {
    id: "lyra-audio-to-midi-converter",
    name: "Lyra Audio to MIDI Converter",
    line: "Converts audio ideas into MIDI-friendly musical sketches.",
    previewA: "Audio analysis",
    previewB: "MIDI export",
    mood: "Role: Music tooling · Stack: Jupyter Notebook + Python · Outcome: faster melody extraction.",
    featured: "Featured because it connects your music background with technical prototyping in a focused way.",
    problem: "Moving from audio inspiration to MIDI ideas is tedious by hand.",
    approach: "Explored audio-to-MIDI conversion in a notebook workflow.",
    impact: "Speeds up early composition and transcription experiments.",
    role: "Audio tooling + prototyping",
    stack: "Python, Jupyter Notebook",
  },
  {
    id: "emotion-based-music-recommender",
    name: "Emotion-based-Music-recommender",
    line: "Maps emotion signals to music recommendations.",
    previewA: "Mood detect panel",
    previewB: "Playlist handoff",
    mood: "Role: Frontend prototype · Stack: HTML UI + recommendation flow · Outcome: quicker music discovery.",
    featured: "Featured because it is simple, readable, and strongly aligned with your creative-tech story.",
    problem: "Generic playlists do not always match the listener's mood.",
    approach: "Built a lightweight recommendation flow driven by emotion state.",
    impact: "Delivers quicker music choices with less friction.",
    role: "UI + recommendation flow",
    stack: "HTML, CSS, JavaScript",
  },
  {
    id: "phantom-signal",
    name: "Phantom-Signal",
    line: "A Python project with a signal-and-pattern theme.",
    previewA: "Signal trace",
    previewB: "Pattern scan",
    mood: "Role: Experimental build · Stack: Python · Outcome: a compact signal-driven prototype.",
    featured: "Featured because it adds breadth to the portfolio and shows exploratory Python work.",
    problem: "Some ideas work best as small experiments before they become larger systems.",
    approach: "Used a lightweight Python prototype to explore signal logic and interaction patterns.",
    impact: "Keeps the concept sharp while staying easy to iterate on.",
    role: "Experimentation + Python engineering",
    stack: "Python, lightweight logic, prototyping",
  },
];

const communityMoments = ["Hackathons", "Student Chapters", "Campus Build Nights"];

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
  const [spotlightProject, setSpotlightProject] = useState(null);
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
        setGithubRepos(Array.isArray(repos) ? repos.slice(0, 5) : []);
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
      <CommandPalette projects={projects} />

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
        <HeroCtaButtons />
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
        <p className="identity-line">AI Product Engineer · Creative Technologist · Violin-first builder</p>
        <div className="identity-tags" aria-label="Identity tags">
          <span className="identity-tag">Product-First Engineering</span>
          <span className="identity-tag">Carnatic Audio Systems</span>
          <span className="identity-tag">Interactive Product Design</span>
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
        <p className="readme-title">How I Work</p>
        <p className="equation-line">Discover → Build → Test → Refine.</p>
        <p className="vibe-line">I combine system thinking, product design, and audio intuition to ship experiences that are both technical and human.</p>
        <p className="thought-line">Best sessions usually happen where architecture decisions and interface details meet.</p>

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
        id="selected-work"
        className="projects-block"
        aria-label="Selected project previews"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="projects-head">
          <p>Selected Work</p>
          <h2>Each project shows the problem, approach, and outcome.</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={activeProject === project.id}
              onActivate={() => {
                setActiveProject(project.id);
              }}
              onOpen={(selectedProject) => {
                setSpotlightProject(selectedProject);
              }}
            />
          ))}
        </div>
      </motion.section>

      <ScrollStoryTimeline projects={projects} />

      <motion.section
        id="community"
        className="community-block"
        aria-label="Community orchestration"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <p className="community-title">Building Community / Orchestrating Events</p>
        <p className="community-sub">Creating spaces where builders collaborate, prototype, and present fast.</p>
        <div className="community-strip" aria-label="Community highlights">
          {communityMoments.map((moment) => (
            <span key={moment} className="community-chip">
              {moment}
            </span>
          ))}
        </div>
        <p className="community-note">From chapter events to hack nights, I focus on structure, energy, and execution.</p>
      </motion.section>

      <footer id="contact" className="cine-contact" aria-label="Contact">
        <div className="contact-objects" aria-hidden="true">
          <span className="contact-comet-track">
            <span className="contact-comet" />
          </span>
          <span className="contact-pulse cp-1" />
          <span className="contact-pulse cp-2" />
        </div>

        <div className="contact-panel">
          <p className="contact-kicker">Contact</p>
          <h3>Open to product builds, AI systems work, and creative tech collaborations.</h3>
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

      <ProjectSpotlightModal
        project={spotlightProject}
        onClose={() => {
          setSpotlightProject(null);
        }}
      />
    </main>
  );
}
