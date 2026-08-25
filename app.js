const navs=document.querySelectorAll(".nav"),pages=document.querySelectorAll(".page");
navs.forEach(n=>n.onclick=()=>{navs.forEach(x=>x.classList.remove("active"));n.classList.add("active");pages.forEach(p=>p.classList.remove("active"));document.getElementById(n.dataset.page).classList.add("active")});

const command=document.getElementById("command"),run=document.getElementById("run"),reviewBox=document.getElementById("reviewBox"),approve=document.getElementById("approve"),reject=document.getElementById("reject"),historyList=document.getElementById("historyList");
let jobs=JSON.parse(localStorage.getItem("gamer60_jobs")||"[]");

function renderHistory(){historyList.innerHTML=jobs.length?jobs.map(j=>`<article><b>${j.title}</b><p>${j.command}</p><small>Status: ${j.status}</small></article>`).join(""):"<p>No jobs yet.</p>"}
function setReview(job){reviewBox.innerHTML=`<h3>Ready for Owner Approval</h3><p><b>Command:</b> ${job.command}</p><p><b>Task:</b> ${job.task}</p><p><b>Next:</b> ${job.next}</p>`;approve.disabled=false;reject.disabled=false}
run.onclick=()=>{
  const text=command.value.trim(); if(!text)return alert("पहले command लिखो।");
  const lower=text.toLowerCase();
  const task=lower.includes("gta")||lower.includes("gamer")?"Task 1 — GAMER 6.0":lower.includes("api")||lower.includes("github")?"Task 3 — AI API Library":"Task 2 — Personal AI Studio";
  const job={id:Date.now(),command:text,task,status:"AWAITING_APPROVAL",title:"New Automation Job",next:"Research → Script → Review → Media Pipeline"};
  jobs.unshift(job);localStorage.setItem("gamer60_jobs",JSON.stringify(jobs));renderHistory();setReview(job);
  document.querySelector('[data-page="review"]').click();
};
approve.onclick=()=>{if(!jobs.length)return;jobs[0].status="APPROVED";localStorage.setItem("gamer60_jobs",JSON.stringify(jobs));renderHistory();reviewBox.innerHTML="<h3>✅ Approved</h3><p>अगला execution backend/API connector जुड़ने के बाद होगा।</p>";approve.disabled=true;reject.disabled=true};
reject.onclick=()=>{if(!jobs.length)return;jobs[0].status="REJECTED";localStorage.setItem("gamer60_jobs",JSON.stringify(jobs));renderHistory();reviewBox.innerHTML="<h3>❌ Rejected</h3><p>Job वापस correction workflow में भेजा जा सकता है।</p>";approve.disabled=true;reject.disabled=true};
renderHistory();
