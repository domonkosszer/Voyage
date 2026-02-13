export type EventStatus = "draft" | "published";

export type EventMeta = {
    id: string;
    title: string;
    startAt: string; // ISO
    endAt?: string;  // ISO
    location?: string;
    status: EventStatus;
    excerpt?: string;
    coverImage?: string;
};