require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "MUBI AI ULTRA backend" });
});

app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Please send a message." });
  }

  const baseUrl = process.env.AI_BASE_URL;
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;

  if (!baseUrl || !apiKey || !model) {
    return res.status(503).json({
      error: "AI provider is not configured. Add AI_BASE_URL, AI_API_KEY and AI_MODEL privately in your hosting environment."
    });
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are MUBI AI ULTRA. Be helpful, accurate, and age-appropriate. You can reply in Urdu, Roman Urdu, or English." },
          ...history.filter(x => x && ["user", "assistant"].includes(x.role) && typeof x.content === "string"),
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "The AI provider returned an error."
      });
    }
    res.json({ reply: data.choices?.[0]?.message?.content || "No reply was returned." });
  } catch (_error) {
    res.status(502).json({ error: "Could not reach the configured AI provider." });
  }
});

// Educational information only; this endpoint does not diagnose or assess health.
app.post("/api/health-info", (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question : "";
  res.json({
    reply: "This section provides general health education only, not a diagnosis or personal medical assessment. For symptoms or health concerns, speak with a qualified healthcare professional. If it may be urgent, seek local emergency medical help.",
    receivedQuestion: question.slice(0, 300)
  });
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`MUBI AI ULTRA backend running on port ${port}`);
});
