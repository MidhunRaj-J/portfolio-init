"use client";

import { motion } from "framer-motion";

export default function ScrollStoryTimeline({ projects = [] }) {
  return (
    <section className="story-timeline" aria-label="Project journey timeline">
      <div className="story-head">
        <p>Scroll Story</p>
        <h2>Problem → Build → Result</h2>
      </div>

      <div className="story-list">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className="story-item"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
          >
            <span className="story-dot" aria-hidden="true" />
            <p className="story-name">{project.name}</p>
            <p className="story-step"><strong>Problem:</strong> {project.problem}</p>
            <p className="story-step"><strong>Build:</strong> {project.approach}</p>
            <p className="story-step"><strong>Result:</strong> {project.impact}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
