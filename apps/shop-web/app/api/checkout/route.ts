import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { products } from "@/lib/data";

export const runtime = "nodejs";

interface LineItemInput {
  id: string;
  quantity?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: LineItemInput[] };
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const origin = req.nextUrl.origin;
    const stripe = getStripe();

    const line_items = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) throw new Error(`Unknown product: ${item.id}`);
      return {
        quantity: Math.max(1, Math.min(item.quantity ?? 1, 10)),
        price_data: {
          currency: "chf",
          unit_amount: product.price * 100, // CHF -> Rappen
          product_data: {
            name: `${product.name} — ${product.line}`,
            images: [`${origin}${product.image}`],
            metadata: { product_id: product.id },
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      // Payment methods (cards, TWINT, Apple/Google Pay) are controlled in the
      // Stripe Dashboard. Enable TWINT there once — no code change needed.
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["CH", "LI", "DE", "FR", "AT", "IT"],
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
