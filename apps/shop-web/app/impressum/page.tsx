import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — FORMA",
};

export default function Impressum() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <h1 className="font-display text-4xl text-ink">IMPRESSUM</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-mute">
        <p>
          Hier folgen die gesetzlich vorgeschriebenen Anbieterangaben
          (Firmenname, Adresse, Vertretungsberechtigte, Handelsregister,
          USt-IdNr., Kontaktdaten).
        </p>
        <p>
          Dies ist ein Platzhaltertext für das Grundgerüst — bitte mit den
          tatsächlichen Unternehmensangaben ersetzen.
        </p>
      </div>
    </main>
  );
}
