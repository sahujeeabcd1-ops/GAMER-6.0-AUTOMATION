const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    agent: "AI Agent",
    status: "ready"
  });
});

router.post("/generate", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Prompt is required"
    });
  }

  res.json({
    success: true,
    status: "received",
    prompt
  });
});

module.exports = router;
