const display = document.getElementById("display");
const historyBox = document.getElementById("history");
const themeToggle = document.getElementById("theme-toggle");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let history = [];

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function updateHistory(entry) {
  history.push(entry);
  historyBox.innerHTML = history.map(h => `<div>${h}</div>`).join("");
  historyBox.scrollTop = historyBox.scrollHeight;
}

function calculate() {
  try {
    const result = eval(currentInput);
    updateHistory(`${currentInput} = ${result}`);
    currentInput = result.toString();
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}

function handleInput(key) {
  if (key === "C") {
    currentInput = "";
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (key === "=" || key === "Enter") {
    calculate();
    return;
  } else {
    currentInput += key;
  }
  updateDisplay();
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key;
    handleInput(key);
    animatePress(btn);
  });
});

document.addEventListener("keydown", e => {
  const key = e.key;
  const validKeys = "0123456789+-*/.=BackspaceEnterEscape";
  if (validKeys.includes(key)) {
    handleInput(key === "Escape" ? "C" : key === "Enter" ? "=" : key);
    const btn = [...buttons].find(b => b.dataset.key === key || (key === "Enter" && b.dataset.key === "="));
    if (btn) animatePress(btn);
  }
});

function animatePress(btn) {
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 150);
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
