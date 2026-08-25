const express = require("express");
const OpenAI = require("openai");
const config = require("../config");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    agent: "GAMER 6.0 AI Agent",
    status: "ready",
    model: config.OPENAI_MODEL
  });
});

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required"
      });
    }

    if (!config.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OPENAI_API_KEY is not configured on the server"
      });
    }

    const client = new OpenAI({
      apiKey: config.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: config.OPENAI_MODEL,
      input: prompt
    });

    res.json({
      success: true,
      model: config.OPENAI_MODEL,
      output: response.output_text
    });

  } catch (error) {
    console.error("OpenAI API Error:", error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message
    });
  }
});

module.exports = router;
