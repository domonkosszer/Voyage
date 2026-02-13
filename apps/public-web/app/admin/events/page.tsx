import Link from "next/link";
import { listEvents } from "@/lib/events";

export default function AdminEventsPage() {
    const events = listEvents();

    return (
        <div className="mx-auto w-full max-w-4xl p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Events</h1>
                    <p className="mt-1 text-sm opacity-70">
                        Create, edit, and publish club events.
                    </p>
                </div>

                <Link
                    href="/admin/events/new"
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                    + New event
                </Link>
            </div>

            <div className="divide-y rounded-xl border">
                {events.length === 0 ? (
                    <div className="p-6 text-sm opacity-70">No events yet.</div>
                ) : (
                    events.map((e) => (
                        <div key={e.id} className="flex items-center justify-between p-4">
                            <div>
                                <div className="font-medium">{e.title}</div>
                                <div className="mt-1 text-sm opacity-70">
                                    {new Date(e.startAt).toLocaleString()}
                                    {e.location ? ` • ${e.location}` : ""} •{" "}
                                    <span className="uppercase tracking-wider text-xs">
                    {e.status}
                  </span>
                                </div>
                            </div>

                            <Link
                                href={`/admin/events/${e.id}`}
                                className="text-sm underline opacity-80 hover:opacity-100"
                            >
                                Edit
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}