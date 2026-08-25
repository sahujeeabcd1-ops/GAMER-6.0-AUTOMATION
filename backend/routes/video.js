const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    agent: "Video Agent",
    status: "ready"
  });
});

router.post("/generate", (req, res) => {
  const { prompt, duration } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Video prompt is required"
    });
  }

  res.json({
    success: true,
    status: "queued",
    prompt,
    duration: duration || "auto"
  });
});

module.exports = router;
