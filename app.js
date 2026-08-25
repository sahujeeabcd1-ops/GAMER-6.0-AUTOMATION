const API_URL = "https://gamer-6-0-automation.onrender.com";

const command = document.getElementById("command");
const run = document.getElementById("run");
const result = document.getElementById("result");

run.onclick = async () => {
  const text = command.value.trim();

  if (!text) {
    result.textContent = "पहले command लिखो।";
    return;
  }

  const t = text.toLowerCase();

  let task;

  if (t.includes("gta") || t.includes("gamer")) {
    task = "Task 1 — GAMER 6.0";
  } else if (t.includes("api") || t.includes("github")) {
    task = "Task 3 — AI API Library";
  } else {
    task = "Task 2 — Personal AI Studio";
  }

  result.innerHTML = `
    <b>Command received ✅</b><br>
    Selected: ${task}<br><br>
    🤖 AI से response लिया जा रहा है...
  `;

  try {
    const response = await fetch(`${API_URL}/api/ai/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `
You are the AI Manager of GAMER 6.0.

User command:
${text}

Selected task:
${task}

Give a useful response for this gaming automation project.
If the user asks for a video idea, give a clear gaming video idea.
If the user asks for a script, create a short script.
If the user asks for a title, give suitable YouTube titles.
        `
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "AI request failed");
    }

    result.innerHTML = `
      <b>🤖 GAMER 6.0 AI Response</b><br><br>
      ${formatResponse(data.output)}
    `;

  } catch (error) {
    console.error("AI Error:", error);

    result.innerHTML = `
      <b>🔴 AI connection failed</b><br><br>
      ${error.message}
    `;
  }
};

function formatResponse(text) {
  if (!text) {
    return "AI ने कोई response नहीं दिया।";
  }

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}
