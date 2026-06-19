"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // Hier später an die echte Newsletter-API anbinden.
    setStatus("success");
    setEmail("");
  }

  return (
    <section id="newsletter" className="bg-ink px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest2 text-paper/60">
            Bleib am Ball
          </p>
          <h2 className="font-display text-4xl text-paper md:text-5xl">
            10% AUF DEINE
            <br />
            ERSTE BESTELLUNG
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-paper/70">
            Melde dich an und erhalte exklusiven Zugang zu Drops, Trainingstipps
            und Angeboten — bevor sie öffentlich werden.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              E-Mail-Adresse
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.com"
              className="w-full border border-paper/30 bg-transparent px-5 py-4 text-sm text-paper placeholder:text-paper/40 focus:border-paper"
            />
            <button
              type="submit"
              className="shrink-0 bg-paper px-7 py-4 text-xs font-semibold uppercase tracking-widest2 text-ink transition-colors hover:bg-volt"
            >
              Anmelden
            </button>
          </form>

          <p
            role="status"
            className={`mt-4 text-xs text-volt transition-opacity ${
              status === "success" ? "opacity-100" : "opacity-0"
            }`}
          >
            Danke! Schau bald in dein Postfach.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
