# Stripe setup — Voyage shop

The code is done: `Add to bag` creates a Stripe Checkout session and redirects.
What's left is the account side, which only you can do (identity + banking).

## 1. Create the account (you, in the Dashboard)
- Sign up at https://dashboard.stripe.com — country **Switzerland**.
- Business profile: legal entity (Einzelfirma / GmbH), address, etc.
- Add your **payout bank account** (IBAN). This is the part I can't do for you.
- Stay in **Test mode** until you've tried a full order.

## 2. Enable payment methods
- Dashboard › Settings › Payment methods → turn on **Cards**, **TWINT**,
  **Apple Pay**, **Google Pay**. (TWINT needs no separate contract.)
- No code change — Checkout shows whatever you enable here.

## 3. Keys → env
- Dashboard › Developers › API keys → copy the **Secret key**.
- `cp .env.local.example .env.local` and paste it into `STRIPE_SECRET_KEY`.

## 4. Webhook (for fulfilment / order confirmation)
Local:
```
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Copy the `whsec_...` it prints into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

Production: Dashboard › Developers › Webhooks › Add endpoint
`https://your-domain/api/webhooks/stripe`, event `checkout.session.completed`,
then copy that endpoint's signing secret into your host's env vars.

The fulfilment hook lives in `app/api/webhooks/stripe/route.ts` — that's where
you'd trigger the heat-press order or send a confirmation mail.

## 5. Test
```
npm install
npm run dev
```
Buy a tee → use test card `4242 4242 4242 4242`, any future date / CVC.
You land on `/success`; the webhook logs the paid session.

## Notes
- Prices live in `lib/data.ts` (CHF, converted to Rappen in the checkout route).
  Single source of truth — no need to also create products in the Dashboard.
- Checkout collects a shipping address (CH/LI/DE/FR/AT/IT — edit in
  `app/api/checkout/route.ts`).
- This is a "buy now" per item. A multi-item cart = hold an array of
  `{id, quantity}` in client state and POST it to the same `/api/checkout`
  route; it already accepts multiple line items.
- Go live: flip to live keys, swap the webhook secret, set the same env vars on
  your host. The shop needs a Node/serverless runtime (it's not a static export).
