"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const profileFallback = {
  name: "Midhun Raj J",
  login: "MidhunRaj-J",
  avatar_url: "https://avatars.githubusercontent.com/u/136164795?v=4",
  bio: "A guy who loves to innovate",
  public_repos: 8,
  followers: 3,
  following: 3,
  html_url: "https://github.com/MidhunRaj-J",
};

const featuredOrder = [
  "Neuro-Bridge",
  "Audio-to-MIDI",
  "Forms-Pilot",
  "Emotion-based-Music-recommender",
  "Web_Technologies",
  "MidhunRaj-J",
];

const signatureProjects = [
  {
    id: "P01",
    className: "nexus",
    title: "NexusFleet",
    oneLiner: "P2P delivery platform for travelers.",
  },
  {
    id: "P02",
    className: "healthcare",
    title: "NeuroBridge",
    oneLiner: "LLM health chatbot for speech support.",
  },
  {
    id: "P03",
    className: "arcade",
    title: "Morse Mystique",
    oneLiner: "2-level puzzle event with coded clues.",
  },
  {
    id: "P04",
    className: "energy",
    title: "Energy Research",
    oneLiner: "V2G optimization using HOMER tools.",
  },
  {
    id: "P05",
    className: "carnatic",
    title: "Mood Music",
    oneLiner: "Emotion-based music recommendation.",
  },
];

const typingLines = [
  "Full-Stack Dev + AI Enthusiast",
  "Producing Lo-fi Beats on FL Studio",
  "Researching Renewable Energy Systems",
  "Organizing Events + Hackathons",
  "Powered by Chai, Chaos & Deadlines",
];

export default function Page() {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef(null);
  const [profile, setProfile] = useState(profileFallback);
  const [repos, setRepos] = useState([]);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const styledConsole =
      "color:#8f7dff; font-weight:700; font-size:12px; letter-spacing:0.06em;";

    console.log("%c[Portfolio Console] If this is HR, yes I ship fast.", styledConsole);
    console.log(
      "%cMovie ping: All izz well... until prod logs wake up.",
      "color:#65f6d4; font-size:11px;"
    );
  }, []);

  useEffect(() => {
    const loadGitHub = async () => {
      try {
        const [profileRes, repoRes] = await Promise.all([
          fetch("/api/github?type=profile"),
          fetch("/api/github?type=repos"),
        ]);

        if (!profileRes.ok || !repoRes.ok) {
          return;
        }

        const profileJson = await profileRes.json();
        const reposJson = await repoRes.json();

        setProfile((current) => ({ ...current, ...profileJson }));
        if (Array.isArray(reposJson)) {
          setRepos(reposJson);
        }
      } catch {
        // Keep graceful fallback UI if API is unavailable.
      }
    };

    loadGitHub();
  }, []);

  const featuredRepos = useMemo(() => {
    if (!repos.length) {
      return [];
    }

    const byName = new Map(repos.map((repo) => [repo.name, repo]));
    const ordered = featuredOrder
      .map((name) => byName.get(name))
      .filter(Boolean)
      .slice(0, 6);

    if (ordered.length >= 4) {
      return ordered;
    }

    return repos.slice(0, 6);
  }, [repos]);

  const marqueeRepos = useMemo(() => {
    const pool = featuredRepos.length ? featuredRepos : repos.slice(0, 6);
    return [...pool, ...pool];
  }, [featuredRepos, repos]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypingIndex((current) => (current + 1) % typingLines.length);
    }, 1700);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return undefined;
    }

    const particles = [];
    const particleCount = 96;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;
      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          seed: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (tick) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const mouse = mouseRef.current;

      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const wave =
          Math.sin(p.x * 0.016 + tick * 0.019 + p.seed) * 24 +
          Math.sin(p.x * 0.041 + tick * 0.03 + p.seed) * 8;

        const waveTarget = height * 0.5 + wave;
        const morph = mouse.active ? 0.24 : 0.08;
        p.y += (waveTarget - p.y) * morph;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          const radius = 190;
          if (dist < radius) {
            const repel = (radius - dist) / radius;
            p.x += (dx / dist) * repel * 2;
            p.y += (dy / dist) * repel * 2;
          }
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);

          if (d < 118) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(100, 168, 255, ${(1 - d / 118) * 0.16})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      particles.forEach((p, idx) => {
        const r = 1.1 + Math.sin(idx + tick * 0.05) * 0.35;
        context.beginPath();
        context.arc(p.x, p.y, r, 0, Math.PI * 2);
        context.fillStyle = "rgba(104, 215, 255, 0.88)";
        context.fill();
      });

      if (mouse.active) {
        context.beginPath();
        context.arc(mouse.x, mouse.y, 54 + Math.sin(tick * 0.08) * 4, 0, Math.PI * 2);
        context.strokeStyle = "rgba(143, 125, 255, 0.34)";
        context.lineWidth = 1.4;
        context.stroke();
      }

      animationRef.current = window.requestAnimationFrame(() => draw(tick + 1));
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    draw(0);

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const showToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => setToast(""), 1800);
  };

  return (
    <>
      <header className="hero compact" id="overture">
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />

        <nav className="top-nav" aria-label="Primary navigation">
          <p className="brand pulse">Midhun Raj J // AI x Creative Tech</p>
          <div className="nav-links">
            <a href="#build-lab">Build Lab</a>
            <a href="#signatures">Signatures</a>
            <a href={profile.html_url} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-content minimal">
            <p className="hero-kicker">{profile.bio}</p>
            <h1>Less talk. More builds.</h1>
            <p className="typing-line">{typingLines[typingIndex]}</p>
            <div className="hero-actions">
              <a href="#build-lab" className="btn primary">
                View Repos
              </a>
              <a href="#signatures" className="btn secondary">
                Signature Work
              </a>
            </div>
          </section>

          <aside className="identity-orb glass-card" aria-label="GitHub identity">
            <img src={profile.avatar_url} alt={`${profile.name} avatar`} loading="lazy" />
            <h2>{profile.name}</h2>
            <p>@{profile.login}</p>
            <div className="metric-row">
              <span>{profile.public_repos} repos</span>
              <span>{profile.followers} followers</span>
              <span>{profile.following} following</span>
            </div>
          </aside>
        </div>

        <div className="skill-ribbon" aria-hidden="true">
          <span>½ Developer</span>
          <span>½ Event Organiser</span>
          <span>½ Musician</span>
          <span>MERN</span>
          <span>Hybrid Renewable Energy</span>
          <span>Lo-fi Production</span>
          <span>Raj Bhavan Covers</span>
          <span>Debugging Chords @ 2AM</span>
        </div>
      </header>

      <main>
        <section id="build-lab" className="section-block" aria-labelledby="build-lab-title">
          <div className="section-head compact-head">
            <p className="section-label">Live from GitHub</p>
            <h2 id="build-lab-title">Build Lab</h2>
          </div>

          <div className="repo-marquee-wrap">
            <div className="repo-marquee-track">
              {marqueeRepos.map((repo, index) => (
                <a
                  key={`${repo.id || repo.name}-${index}`}
                  className="repo-chip glass-card"
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => showToast(`Opening ${repo.name}`)}
                >
                  <strong>{repo.name}</strong>
                  <span>{repo.language || "Multi-stack"}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="repo-grid">
            {(featuredRepos.length ? featuredRepos : repos.slice(0, 6)).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass-card repo-card"
              >
                <p>{repo.language || "Code"}</p>
                <h3>{repo.name}</h3>
                <div className="repo-meta">
                  <span>★ {repo.stargazers_count ?? 0}</span>
                  <span>⑂ {repo.forks_count ?? 0}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="signatures" className="projects section-block" aria-labelledby="signature-title">
          <div className="section-head compact-head">
            <p className="section-label">Featured</p>
            <h2 id="signature-title">Signature Work</h2>
          </div>

          <div className="projects-strip static-fit" role="list" aria-label="Signature projects">
            {signatureProjects.map((project) => (
              <article
                key={project.id}
                role="listitem"
                className={`glass-card project-card ${project.className} lively`}
                tabIndex={0}
                onMouseEnter={() => showToast(`${project.id} active`)}
              >
                <div className="project-top">
                  <span>{project.id}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.oneLiner}</p>
                <div className="code-reveal" aria-hidden="true">
                  <p>idea.random() → build.real()</p>
                  <p>community.ignite()</p>
                  <p>ship.before_sunrise()</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" aria-label="Random thought">
          <div className="glass-card thought-card">
            <p>⚡ "I say I'll sleep early tonight"</p>
            <p>→ debugging code / arranging chords at 2 AM.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer compact-footer">
        <p>3rd-year CSE · Builder · Event Organiser · Musician</p>
        <p className="footer-hint">Comedy patch: "I’ll sleep early" // commit at 2:14 AM.</p>
      </footer>

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
