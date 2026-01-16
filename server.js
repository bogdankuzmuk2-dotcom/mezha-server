import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get("/", (req, res) => {
  res.send("MEZHA Server is running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const userText = req.body.text;

    if (!userText) {
      return res.json({ error: "No text provided" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userText }],
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "No response";

    res.json({ reply: answer });
  } catch (err) {
    console.error(err);
    res.json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
