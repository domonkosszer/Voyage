"use client";

import { useEffect, useMemo, useState } from "react";

type OverviewRow = {
  skuId: number;
  skuCode: string;
  productName: string;
  category: string | null;
  size: string | null;
  color: string | null;
  price: number;
  currentStock: number;
};

type MovementPayload = {
  skuId: number;
  delta: number;
  reason: "PRODUCTION" | "SALE" | "ADJUSTMENT" | "RETURN";
  reference?: string;
};

export default function Home() {
  const [rows, setRows] = useState<OverviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState<OverviewRow | null>(null);
  const [delta, setDelta] = useState<number>(0);
  const [reason, setReason] = useState<MovementPayload["reason"]>("ADJUSTMENT");
  const [reference, setReference] = useState("");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inventory/overview", { credentials: "include" });
      if (res.status === 401 || res.status === 302) {
        // If you're not logged in, Spring may redirect. In the browser, just go to /login.
        setError("Not logged in. Open /login in the browser.");
        setRows([]);
        return;
      }
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const data = (await res.json()) as OverviewRow[];
      setRows(data);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/logout", { method: "POST", credentials: "include" });
    window.location.href = "/login";
  }

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.category && set.add(r.category));
    return ["ALL", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesQ =
        !qq ||
        r.productName.toLowerCase().includes(qq) ||
        r.skuCode.toLowerCase().includes(qq);
      const matchesCat = category === "ALL" || r.category === category;
      return matchesQ && matchesCat;
    });
  }, [rows, q, category]);

  function openMovement(row: OverviewRow) {
    setSelectedSku(row);
    setDelta(0);
    setReason("ADJUSTMENT");
    setReference("");
    setModalOpen(true);
  }

  async function submitMovement() {
    if (!selectedSku) return;
    if (!Number.isFinite(delta) || delta === 0) {
      alert("Delta must be a non-zero number (e.g. 10 or -1).");
      return;
    }

    const payload: MovementPayload = {
      skuId: selectedSku.skuId,
      delta,
      reason,
      reference: reference.trim() || undefined,
    };

    const res = await fetch("/api/inventory/movements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text();
      alert(`Failed: ${res.status}\n${txt}`);
      return;
    }

    setModalOpen(false);
    setSelectedSku(null);
    await load();
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Workspace Inventory</h1>
            <p className="text-sm text-gray-600">
              Data from <code className="px-1">/api/inventory/overview</code>
            </p>
          </div>

          <div className="flex gap-2">
            <a
              className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
              href="/login"
            >
              Login
            </a>

            <button 
              className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={logout}
            >
              Logout
            </button>

            <button
              className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={load}
            >
              Refresh
            </button>
          </div>
        </header>

        <section className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            className="w-full rounded border px-3 py-2 text-sm"
            placeholder="Search product name or SKU code…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded border px-3 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </section>

        {loading && <p className="text-sm text-gray-600">Loading…</p>}
        {error && (
          <p className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </p>
        )}

        <section className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Size</th>
                <th className="p-3">Color</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.skuId} className="border-t">
                  <td className="p-3">{r.productName}</td>
                  <td className="p-3">{r.category ?? "-"}</td>
                  <td className="p-3 font-mono">{r.skuCode}</td>
                  <td className="p-3">{r.size ?? "-"}</td>
                  <td className="p-3">{r.color ?? "-"}</td>
                  <td className="p-3">{Number(r.price).toFixed(2)}</td>
                  <td className="p-3 font-semibold">{r.currentStock}</td>
                  <td className="p-3 text-right">
                    <button
                      className="rounded border px-3 py-1.5 text-xs hover:bg-gray-50"
                      onClick={() => openMovement(r)}
                    >
                      Add movement
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td className="p-3 text-gray-600" colSpan={8}>
                    No rows. (Did you create SKUs + movements in the backend?)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {modalOpen && selectedSku && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded bg-white p-4 shadow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Add movement</h2>
                  <p className="text-sm text-gray-600">
                    {selectedSku.productName} — <span className="font-mono">{selectedSku.skuCode}</span>
                  </p>
                </div>
                <button
                  className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs text-gray-600">Delta</label>
                  <input
                    type="number"
                    className="w-full rounded border px-3 py-2 text-sm"
                    value={delta}
                    onChange={(e) => setDelta(Number(e.target.value))}
                    placeholder="e.g. 10 or -1"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600">Reason</label>
                  <select
                    className="w-full rounded border px-3 py-2 text-sm"
                    value={reason}
                    onChange={(e) => setReason(e.target.value as any)}
                  >
                    <option value="PRODUCTION">PRODUCTION</option>
                    <option value="SALE">SALE</option>
                    <option value="RETURN">RETURN</option>
                    <option value="ADJUSTMENT">ADJUSTMENT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600">Reference (optional)</label>
                  <input
                    className="w-full rounded border px-3 py-2 text-sm"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder='e.g. "Order #1001"'
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded bg-black px-3 py-2 text-sm text-white hover:opacity-90"
                    onClick={submitMovement}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
