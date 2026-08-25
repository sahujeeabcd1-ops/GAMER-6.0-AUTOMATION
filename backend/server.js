const express = require("express");
const cors = require("cors");
const config = require("./config");

const aiRoutes = require("./routes/ai");
const videoRoutes = require("./routes/video");
const thumbnailRoutes = require("./routes/thumbnail");
const youtubeRoutes = require("./routes/youtube");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "GAMER 6.0",
    message: "Backend is running 🎮",
    version: "1.0.0"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "online",
    service: "GAMER 6.0 Backend",
    time: new Date().toISOString()
  });
});

app.use("/api/ai", aiRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/thumbnail", thumbnailRoutes);
app.use("/api/youtube", youtubeRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

app.listen(config.PORT, () => {
  console.log(`GAMER 6.0 Backend running on port ${config.PORT}`);
});
