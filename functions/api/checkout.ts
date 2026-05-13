/// <reference types="@cloudflare/workers-types" />
import Stripe from "stripe";

// -----------------------------------------------------------------------------
// STRIPE CHECKOUT — Cloudflare Pages Function
// -----------------------------------------------------------------------------
// Without STRIPE_SECRET_KEY + STRIPE_PRICE_ID_* set, this endpoint returns a
// clear 503 so the pricing page surfaces a readable error — no silent failures.
//
// To enable real checkout:
//   1. Set the env vars listed in .env.example as Cloudflare Pages secrets
//   2. That's it — stripe.checkout.sessions.create() runs below
//
// Test locally with wrangler:
//   npx wrangler pages dev dist --compatibility-date=2025-01-01
// -----------------------------------------------------------------------------

type Tier = "STUDIO" | "ENTERPRISE";

interface Env {
  STRIPE_SECRET_KEY?: string;
  STRIPE_PRICE_ID_STUDIO?: string;
  STRIPE_PRICE_ID_ENTERPRISE?: string;
  PUBLIC_SITE_URL?: string;
}

const PRICE_ENV: Record<Tier, keyof Env> = {
  STUDIO: "STRIPE_PRICE_ID_STUDIO",
  ENTERPRISE: "STRIPE_PRICE_ID_ENTERPRISE",
};

function readTier(body: unknown, formTier: string | null): Tier | null {
  const raw =
    formTier ??
    (body && typeof body === "object" && "tier" in body
      ? String((body as Record<string, unknown>).tier)
      : null);
  if (raw === "STUDIO" || raw === "ENTERPRISE") return raw;
  return null;
}

async function readRequest(request: Request): Promise<{ tier: Tier | null }> {
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    try {
      const json = (await request.json()) as Record<string, unknown>;
      return { tier: readTier(json, null) };
    } catch {
      return { tier: null };
    }
  }
  if (ct.includes("form")) {
    const form = await request.formData();
    return { tier: readTier(null, form.get("tier")?.toString() ?? null) };
  }
  return { tier: null };
}

function json(body: unknown, status = 200, extra: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { tier } = await readRequest(request);
  if (!tier) {
    return json(
      { error: "invalid_tier", todo: "Send { tier: 'STUDIO' | 'ENTERPRISE' }" },
      400,
    );
  }

  const secret = env.STRIPE_SECRET_KEY;
  const priceId = env[PRICE_ENV[tier]];

  if (!secret || !priceId) {
    return json(
      {
        error: "stripe_not_configured",
        tier,
        todo: `Set STRIPE_SECRET_KEY and ${PRICE_ENV[tier]} as Cloudflare Pages secrets to enable Stripe Checkout.`,
        env_example: "/.env.example",
      },
      503,
    );
  }

  const stripe = new Stripe(secret, {
    apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
    httpClient: Stripe.createFetchHttpClient(),
  });
  const url = new URL(request.url);
  const siteUrl = env.PUBLIC_SITE_URL ?? `${url.protocol}//${url.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: tier === "STUDIO" ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/docs/getting-started?checkout=success`,
      cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
      allow_promotion_codes: true,
      metadata: { tier },
    });

    return json({ url: session.url, id: session.id });
  } catch (err) {
    return json(
      {
        error: "stripe_error",
        message: err instanceof Error ? err.message : "unknown",
      },
      502,
    );
  }
};

export const onRequestGet: PagesFunction<Env> = () =>
  json(
    { error: "method_not_allowed", hint: "POST { tier } to begin checkout." },
    405,
    { Allow: "POST" },
  );
