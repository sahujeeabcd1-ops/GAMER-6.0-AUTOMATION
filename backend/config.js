require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  AI_API_KEY: process.env.AI_API_KEY || "",
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || ""
};
