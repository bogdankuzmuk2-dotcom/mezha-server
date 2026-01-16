import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Головна сторінка
app.get("/", (req, res) => {
  res.send("🚀 MEZHA Server is running!");
});

// API endpoint
app.post("/ask", async (req, res) => {
  try {
    const userText = req.body.text;

    if (!userText) {
      return res.json({ error: "No text provided" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Bearer ${OPENAI_API_KEY}
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are MEZHA assistant." },
          { role: "user", content: userText }
        ]
      })
    });

    const data = await response.json();

    const answer =
      data.choices?.[0]?.message?.content || "No response";

    res.json({ reply: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log("MEZHA server running on port", PORT);
});
