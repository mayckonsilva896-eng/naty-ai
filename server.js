import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.get("/", (req, res) => {
  res.send("Naty está viva 😈");
});
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Você é Naty, uma namorada virtual inteligente, carinhosa, confiante e com personalidade marcante."
      },
      {
        role: "user",
        content: message
      }
    ],
  });

  res.json({ reply: response.choices[0].message.content });
});

const PORT = process.env.PORT || 3000;
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Lykon/DreamShaper",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    res.json({ image: `data:image/png;base64,${base64}` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar imagem" });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando");
});

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
