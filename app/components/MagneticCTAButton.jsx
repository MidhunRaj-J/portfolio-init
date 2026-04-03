"use client";

import { useRef } from "react";

export default function MagneticCTAButton({ href, children, className = "", ariaLabel }) {
  const buttonRef = useRef(null);

  const handlePointerMove = (event) => {
    const node = buttonRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    node.style.setProperty("--mag-x", `${offsetX * 0.14}px`);
    node.style.setProperty("--mag-y", `${offsetY * 0.14}px`);
  };

  const handlePointerLeave = () => {
    const node = buttonRef.current;
    if (!node) {
      return;
    }

    node.style.setProperty("--mag-x", "0px");
    node.style.setProperty("--mag-y", "0px");
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      className={`contact-link hero-cta-link magnetic-cta ${className}`.trim()}
      aria-label={ariaLabel}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onBlur={handlePointerLeave}
    >
      <span>{children}</span>
    </a>
  );
}
