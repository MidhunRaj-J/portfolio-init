"use client";

import MagneticCTAButton from "./MagneticCTAButton";

export default function HeroCtaButtons() {
  return (
    <div className="hero-cta-row" aria-label="Primary actions">
      <MagneticCTAButton href="#selected-work" className="is-primary" ariaLabel="Go to selected work">
        View Work
      </MagneticCTAButton>
      <MagneticCTAButton href="#contact" className="is-secondary" ariaLabel="Go to contact">
        Contact
      </MagneticCTAButton>
    </div>
  );
}
