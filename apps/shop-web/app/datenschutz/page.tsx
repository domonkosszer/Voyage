import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Datenschutz — VOYAGE" };

export default function Datenschutz() {
  return (
    <main className="wrap" style={{ maxWidth: 760, paddingTop: 160, paddingBottom: 120 }}>
      <Link href="/" className="eyebrow" style={{ display: "inline-block", marginBottom: 28 }}>
        ← Back
      </Link>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(40px,6vw,68px)", letterSpacing: "-.02em" }}>
        Datenschutz
      </h1>
      <div style={{ marginTop: 28, color: "var(--stone)", lineHeight: 1.8, fontSize: 15 }}>
        <p>
          Hier folgt die vollständige Datenschutzerklärung gemäss revDSG / DSGVO
          (Verantwortlicher, Zwecke, Rechtsgrundlagen, Cookies,
          Betroffenenrechte).
        </p>
        <p style={{ marginTop: 16 }}>
          Platzhaltertext — bitte mit der tatsächlichen, idealerweise juristisch
          geprüften Datenschutzerklärung ersetzen.
        </p>
      </div>
    </main>
  );
}
