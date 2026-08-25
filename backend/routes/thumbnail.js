const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    agent: "Thumbnail Agent",
    status: "ready"
  });
});

router.post("/generate", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Thumbnail prompt is required"
    });
  }

  res.json({
    success: true,
    status: "queued",
    prompt
  });
});

module.exports = router;
