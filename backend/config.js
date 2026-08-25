require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",

  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-5.6-luna"
};
