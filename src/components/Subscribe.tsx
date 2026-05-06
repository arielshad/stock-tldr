import { useState } from "react";
import { track } from "../lib/analytics";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        track("subscribe:submit", { ok: true });
        setStatus("success");
        setEmail("");
      } else {
        track("subscribe:submit", { ok: false });
        setStatus("error");
      }
    } catch {
      track("subscribe:submit", { ok: false });
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="subscribe subscribe-success">
        <span className="subscribe-check">OK</span> You&rsquo;re subscribed
      </div>
    );
  }

  return (
    <form className="subscribe" onSubmit={handleSubmit}>
      <label className="subscribe-label">DAILY DIGEST</label>
      <div className="subscribe-row">
        <span className="subscribe-prompt">&gt;</span>
        <input
          type="email"
          name="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "..." : "SUBSCRIBE"}
        </button>
        {status === "error" && (
          <span className="subscribe-error">Error - try again</span>
        )}
      </div>
    </form>
  );
}
