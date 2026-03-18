import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" aria-labelledby="not-found-title">
      <section className="not-found-card">
        <p className="not-found-code">Error // 404</p>
        <h1 id="not-found-title">You jumped to an uncharted timeline.</h1>
        <p>
          The page you requested is outside this sector. The navigation AI suggests a
          clean jump back to the command deck before the anomaly expands.
        </p>
        <p>Witty log: "In space, no one can hear your broken link."</p>

        <div className="not-found-actions">
          <Link href="/" className="btn primary">
            Return Home
          </Link>
          <a href="/#innovation-lab" className="btn secondary">
            Open Innovation Lab
          </a>
        </div>
      </section>
    </main>
  );
}
