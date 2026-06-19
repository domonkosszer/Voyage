import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let email: string | null = null;
  let total: string | null = null;
  if (session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? null;
      if (session.amount_total != null) {
        total = `CHF ${(session.amount_total / 100).toFixed(2)}`;
      }
    } catch {
      // expired or invalid session id — fall through to generic thank-you
    }
  }

  return (
    <main
      className="wrap"
      style={{
        maxWidth: 640,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        paddingBlock: 120,
      }}
    >
      <p className="eyebrow">Order confirmed</p>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 500,
          fontSize: "clamp(40px,7vw,72px)",
          letterSpacing: "-.02em",
          margin: "16px 0 0",
        }}
      >
        Thank you.
      </h1>
      <p style={{ color: "var(--stone)", marginTop: 18, fontSize: 15.5, lineHeight: 1.7 }}>
        You&rsquo;re one of the few. {email ? `A receipt is on its way to ${email}.` : "A receipt is on its way."}
        {total ? ` Total ${total}.` : ""}
      </p>
      <div style={{ marginTop: 36 }}>
        <Link
          href="/"
          className="eyebrow"
          style={{ borderBottom: "1px solid var(--ink)", paddingBottom: 6, color: "var(--ink)" }}
        >
          ← Back to shop
        </Link>
      </div>
    </main>
  );
}
