// ---------- Typing effect ----------
const phrases = ["whoami", "cat skills.txt", "open portfolio.html"];
const typedEl = document.getElementById("typed");
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ---------- Project demo toggles ----------
document.querySelectorAll(".log-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    const isOpen = target.classList.toggle("open");
    btn.textContent = isOpen ? "close demo ↑" : "open demo ↴";
  });
});

// ---------- To-Do App ----------
const todoInput = document.getElementById("todoInput");
const todoAdd = document.getElementById("todoAdd");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");

function updateCount() {
  const remaining = todoList.querySelectorAll("li:not(.done)").length;
  todoCount.textContent = remaining;
}

function addTask() {
  const text = todoInput.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text"></span>
    <span class="task-actions">
      <button class="task-done">done</button>
      <button class="task-remove">remove</button>
    </span>
  `;
  li.querySelector(".task-text").textContent = text;
  todoList.appendChild(li);
  todoInput.value = "";
  updateCount();
}

todoAdd.addEventListener("click", addTask);
todoInput.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });

todoList.addEventListener("click", e => {
  if (e.target.classList.contains("task-done")) {
    e.target.closest("li").classList.toggle("done");
    updateCount();
  }
  if (e.target.classList.contains("task-remove")) {
    e.target.closest("li").remove();
    updateCount();
  }
});

// ---------- Calculator ----------
const calcScreen = document.getElementById("calcScreen");
let calcValue = "";

document.querySelectorAll(".calc-grid button").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.val;
    if (val === "C") {
      calcValue = "";
    } else if (val === "back") {
      calcValue = calcValue.slice(0, -1);
    } else if (val === "=") {
      try {
        // Safe-ish evaluation restricted to numbers and basic operators
        if (/^[0-9+\-*/(). ]+$/.test(calcValue)) {
          calcValue = String(Function(`"use strict"; return (${calcValue})`)());
        }
      } catch {
        calcValue = "Error";
      }
    } else {
      calcValue += val;
    }
    calcScreen.value = calcValue || "0";
  });
});
