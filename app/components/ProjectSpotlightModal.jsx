"use client";

import { useEffect } from "react";

export default function ProjectSpotlightModal({ project, onClose }) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div className="spotlight-modal" role="dialog" aria-modal="true" aria-label={`${project.name} spotlight`}>
      <div className="spotlight-backdrop" onClick={onClose} />
      <div className="spotlight-panel">
        <button type="button" className="spotlight-close" onClick={onClose} aria-label="Close project spotlight">
          Close
        </button>
        <p className="spotlight-kicker">Project Spotlight</p>
        <h3>{project.name}</h3>
        <p className="spotlight-line">{project.line}</p>

        <div className="spotlight-grid">
          <article>
            <p>Problem</p>
            <strong>{project.problem}</strong>
          </article>
          <article>
            <p>Approach</p>
            <strong>{project.approach}</strong>
          </article>
          <article>
            <p>Impact</p>
            <strong>{project.impact}</strong>
          </article>
        </div>

        <div className="spotlight-meta">
          <span>Role: {project.role}</span>
          <span>Stack: {project.stack}</span>
        </div>
      </div>
    </div>
  );
}
