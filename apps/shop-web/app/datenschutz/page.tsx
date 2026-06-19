import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz — FORMA",
};

export default function Datenschutz() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="font-display text-4xl text-ink">DATENSCHUTZ</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-mute">
        <p>
          Hier folgt die vollständige Datenschutzerklärung gemäß DSGVO /
          revDSG (u. a. Verantwortlicher, Zwecke der Datenverarbeitung,
          Rechtsgrundlagen, Cookies, Betroffenenrechte).
        </p>
        <p>
          Dies ist ein Platzhaltertext für das Grundgerüst — bitte mit der
          tatsächlichen Datenschutzerklärung ersetzen, idealerweise von
          juristischer Seite geprüft.
        </p>
      </div>
    </main>
  );
}
