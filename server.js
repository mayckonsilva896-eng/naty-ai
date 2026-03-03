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

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
