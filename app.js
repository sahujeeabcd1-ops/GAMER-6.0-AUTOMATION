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
        🔄 Connecting to backend...
    `;

    try {
        const response = await fetch(
            "https://gamer-6-0-automation.onrender.com/api/health"
        );

        const data = await response.json();

        result.innerHTML = `
            <b>Command received ✅</b><br>
            Selected: ${task}<br><br>
            🟢 Backend Connected!<br>
            Status: ${data.status}<br>
            Service: ${data.service}
        `;

    } catch (error) {
        result.innerHTML = `
            <b>Command received ✅</b><br>
            Selected: ${task}<br><br>
            🔴 Connection Error<br>
            ${error.message}
        `;

        console.error(error);
    }
};
