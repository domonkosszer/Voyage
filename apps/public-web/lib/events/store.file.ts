import fs from "fs";
import path from "path";
import { EventMeta } from "./types";

const EVENTS_DIR = path.join(process.cwd(), "public", "content", "events");

function ensureDir(p: string) {
    fs.mkdirSync(p, { recursive: true });
}

export function listEvents(): EventMeta[] {
    if (!fs.existsSync(EVENTS_DIR)) return [];

    const slugs = fs
        .readdirSync(EVENTS_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

    const events = slugs
        .map((id) => {
            const metaPath = path.join(EVENTS_DIR, id, "event.json");
            if (!fs.existsSync(metaPath)) return null;
            const raw = fs.readFileSync(metaPath, "utf-8");
            return JSON.parse(raw) as EventMeta;
        })
        .filter(Boolean) as EventMeta[];

    events.sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );

    return events;
}

export function getEvent(id: string): EventMeta | null {
    const metaPath = path.join(EVENTS_DIR, id, "event.json");
    if (!fs.existsSync(metaPath)) return null;
    const raw = fs.readFileSync(metaPath, "utf-8");
    return JSON.parse(raw) as EventMeta;
}

export function createEvent(meta: EventMeta): EventMeta {
    ensureDir(EVENTS_DIR);

    const dir = path.join(EVENTS_DIR, meta.id);
    if (fs.existsSync(dir)) {
        throw new Error(`Event already exists: ${meta.id}`);
    }

    ensureDir(dir);
    const metaPath = path.join(dir, "event.json");
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");
    return meta;
}

export function updateEvent(id: string, patch: Partial<EventMeta>): EventMeta {
    const existing = getEvent(id);
    if (!existing) throw new Error(`Event not found: ${id}`);

    const next: EventMeta = { ...existing, ...patch, id: existing.id };
    const metaPath = path.join(EVENTS_DIR, id, "event.json");
    fs.writeFileSync(metaPath, JSON.stringify(next, null, 2), "utf-8");
    return next;
}

export function deleteEvent(id: string) {
    const dir = path.join(EVENTS_DIR, id);
    if (!fs.existsSync(dir)) return;
    fs.rmSync(dir, { recursive: true, force: true });
}