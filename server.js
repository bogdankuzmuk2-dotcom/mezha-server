import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Перевірка що сервер живий
app.get("/", (req, res) => {
  res.send("MEZHA Server is running 🚀");
});

// API для запиту до OpenAI
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key not set" });
    }

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
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
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
