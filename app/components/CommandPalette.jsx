"use client";

import { useEffect, useMemo, useState } from "react";

export default function CommandPalette({ projects = [] }) {
  const [open, setOpen] = useState(false);

  const commands = useMemo(
    () => [
      { id: "go-work", label: "Go to Selected Work", target: "#selected-work" },
      { id: "go-community", label: "Go to Community", target: "#community" },
      { id: "go-contact", label: "Go to Contact", target: "#contact" },
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        label: `Go to ${project.name}`,
        target: "#selected-work",
      })),
    ],
    [projects]
  );

  useEffect(() => {
    const handleKeydown = (event) => {
      const isK = event.key.toLowerCase() === "k";
      const hasModifier = event.metaKey || event.ctrlKey;

      if (isK && hasModifier) {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const jumpTo = (target) => {
    const node = document.querySelector(target);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="palette-trigger" onClick={() => setOpen(true)} aria-label="Open command palette">
        <span>⌘K</span>
      </button>

      {open && (
        <div className="palette-shell" role="dialog" aria-modal="true" aria-label="Command palette">
          <div className="palette-backdrop" onClick={() => setOpen(false)} />
          <div className="palette-panel">
            <p className="palette-kicker">Quick Navigate</p>
            <ul>
              {commands.map((command) => (
                <li key={command.id}>
                  <button type="button" onClick={() => jumpTo(command.target)}>
                    {command.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
