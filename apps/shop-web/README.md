# FORMA — Premium Sportswear Grundgerüst

Ein produktionsreifes Grundgerüst für einen Premium-Sportswear-Shop im Stil
von Nike, Gymshark, Alo Yoga und Represent. Gebaut mit Next.js 15 (App
Router), React, TypeScript und Tailwind CSS — ohne externe UI-Libraries.

## Stack

- **Next.js 15** (App Router, `next/font`, `next/image`)
- **React 19** + **TypeScript**
- **Tailwind CSS** mit eigenem Design-Token-System (Farben, Typografie, Animationen)
- Animationen rein über CSS + `IntersectionObserver` (`components/Reveal.tsx`) — keine Animationsbibliothek nötig

## Schnellstart

```bash
npm install
npm run dev
```

Anschließend [http://localhost:3000](http://localhost:3000) öffnen.

## Projektstruktur

```
app/
  layout.tsx        Root-Layout, Fonts (Anton + Inter), SEO-Metadaten
  page.tsx           Setzt alle Sections zur Startseite zusammen
  globals.css        Design-Tokens, Smooth Scroll, Marquee-Animation, Reveal-Utility
  impressum/         Platzhalterseite
  datenschutz/       Platzhalterseite

components/
  Header.tsx          Sticky Navigation, Mobile-Menü
  Hero.tsx             Vollbild-Hero mit Athleten-Foto, Slogan, CTA
  Marquee.tsx           Endlos-Laufband als wiederkehrendes Markenelement
  FeaturedProducts.tsx  Produktgrid (nutzt ProductCard)
  ProductCard.tsx        Produktkarte mit Bild-Crossfade beim Hover
  BrandStory.tsx          Bild/Text-Split über die Markenphilosophie
  Categories.tsx          Men / Women / Performance / Lifestyle
  Testimonials.tsx        Kundenstimmen mit Sternebewertung
  Newsletter.tsx           E-Mail-Anmeldung mit Client-State
  Footer.tsx                Social Links, Impressum, Datenschutz
  Reveal.tsx                 Fade-In-Wrapper via IntersectionObserver

lib/
  data.ts   Zentrale Beispieldaten: Produkte, Kategorien, Testimonials
```

## Design-System

- **Farben:** `ink` (#0A0A0A), `paper` (#FAFAF8), `graphite`, `mute`, `line`,
  und ein einziger Akzent `volt` (#D7FF3F) — bewusst sparsam eingesetzt für
  CTA-Hover, Badges und Statusmeldungen.
- **Typografie:** `Anton` für große, athletische Display-Headlines, `Inter`
  für Fließtext und UI. Beide über `next/font/google` performant eingebunden
  (kein FOIT, kein externes CSS).
- **Bewegung:** Smooth Scroll über native CSS, Fade-Ins über
  `IntersectionObserver`, Hover-Mikrointeraktionen rein über Tailwind-
  Transitions. `prefers-reduced-motion` wird respektiert.

## Nächste Schritte für dein Projekt

1. **Eigene Produktbilder & Texte** in `lib/data.ts` einsetzen (aktuell
   Platzhalterbilder von Unsplash für die Vorschau).
2. **Echten Warenkorb / Checkout** anbinden (z. B. Shopify, Medusa, eigenes
   Backend) — `Bag (0)`-Button in `Header.tsx` ist als Einstiegspunkt
   vorbereitet.
3. **Newsletter-API** in `Newsletter.tsx` ergänzen (aktuell nur lokaler
   Form-State, kein echter Versand).
4. **Rechtliche Texte** in `app/impressum` und `app/datenschutz` durch echte
   Inhalte ersetzen.
5. **Favicon & OG-Image** in `app/` bzw. `public/` ergänzen.

## Bildquellen

Die Platzhalterbilder stammen von Unsplash (frei nutzbar) und sind nur als
Demo-Inhalt gedacht — für den Live-Shop durch eigene Produktfotografie
ersetzen.
