const API_URL = "https://gamer-6-0-automation.onrender.com";

const command = document.getElementById("command");
const run = document.getElementById("run");
const result = document.getElementById("result");

run.addEventListener("click", async () => {
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
    🤖 Manager AI से response लिया जा रहा है...
  `;

  try {
    const response = await fetch(`${API_URL}/api/ai/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `
You are the Manager AI for GAMER 6.0.

Owner command:
${text}

Selected task:
${task}

Create a useful response for the owner.
If this is a GTA gaming request, provide a practical video idea,
title, short description, and suggested workflow.
        `
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "AI request failed");
    }

    result.innerHTML = `
      <b>🤖 GAMER 6.0 AI Response</b><br><br>
      ${escapeHTML(data.output).replace(/\n/g, "<br>")}
    `;

  } catch (error) {
    console.error("AI Error:", error);

    result.innerHTML = `
      <b>🔴 AI Error</b><br><br>
      ${escapeHTML(error.message)}
    `;
  }
});

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
