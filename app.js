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
    🔄 Backend से connection हो रहा है...
  `;

  try {
    const response = await fetch(API_URL + "/api/health", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    result.innerHTML = `
      <b>Command received ✅</b><br>
      Selected: ${task}<br><br>
      Workflow: Research → Script → AI Review → Media Generation → Final Approval.<br><br>
      🟢 Backend: ${data.status}<br>
      🎮 GAMER 6.0 Backend Connected!
    `;

  } catch (error) {

    result.innerHTML = `
      <b>Command received ✅</b><br>
      Selected: ${task}<br><br>
      🔴 Backend connection failed.<br>
      Error: ${error.message}
    `;

    console.error("Backend Error:", error);
  }
};
