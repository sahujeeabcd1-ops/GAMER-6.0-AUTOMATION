const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    agent: "YouTube Agent",
    status: "ready"
  });
});

router.post("/upload", (req, res) => {
  const { title, description, videoId } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Video title is required"
    });
  }

  res.json({
    success: true,
    status: "waiting_for_approval",
    title,
    description: description || "",
    videoId: videoId || null
  });
});

module.exports = router;
