"use client";

export default function ProjectCard({ project, isActive, onActivate, onOpen }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(project);
    }
  };

  return (
    <article
      className={`project-card${isActive ? " is-active" : ""}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${project.name} case study`}
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
  );
}
