interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  RESEND_API_KEY: string;
  RESEND_SEGMENT_ID: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

async function handleSubscribe(req: Request, env: Env): Promise<Response> {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  let email: string | undefined;
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const body = (await req.json().catch(() => null)) as { email?: string } | null;
    email = body?.email?.trim().toLowerCase();
  } else {
    const form = await req.formData().catch(() => null);
    email = form?.get("email")?.toString().trim().toLowerCase();
  }

  if (!email || !EMAIL_RE.test(email)) {
    return json(400, { error: "invalid_email" });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_SEGMENT_ID) {
    return json(500, { error: "not_configured" });
  }

  const res = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      segments: [{ id: env.RESEND_SEGMENT_ID }],
    }),
  });

  if (res.ok) return json(200, { ok: true });

  const text = await res.text();
  // Resend returns 409 when the contact already exists — treat as success
  // so the form doesn't punish returning visitors.
  if (res.status === 409 || /already exists/i.test(text)) {
    return json(200, { ok: true, existing: true });
  }
  return json(502, { error: "upstream", status: res.status });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === "/api/subscribe") return handleSubscribe(req, env);
    return env.ASSETS.fetch(req);
  },
};
