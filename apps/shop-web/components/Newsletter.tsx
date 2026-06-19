"use client";
import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setOk(true);
    setEmail("");
  }
  return (
    <section className="news" id="newsletter">
      <Reveal className="wrap">
        <p className="eyebrow">Join the few</p>
        <h2>First access to every drop.</h2>
        <p className="copy">
          Quiet emails, only when there&rsquo;s something worth wearing. No
          noise, ever.
        </p>
        <form onSubmit={submit}>
          <label htmlFor="nl-email" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
            Email address
          </label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <button type="submit">Sign up</button>
        </form>
        <p className={`ok ${ok ? "show" : ""}`} role="status">
          You&rsquo;re on the list. See you at the drop.
        </p>
        <p className="fine">By signing up you agree to our privacy policy.</p>
      </Reveal>
    </section>
  );
}
