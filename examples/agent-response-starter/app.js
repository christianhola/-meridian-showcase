const choices = [...document.querySelectorAll("[data-scenario]")];
const title = document.querySelector("#title");
const answer = document.querySelector("#answer");
const steps = document.querySelector("#steps");
const reload = document.querySelector("#reload");
let selected = "starter";
let requestId = 0;

async function loadScenario(id) {
  const current = ++requestId;
  choices.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.scenario === id)));
  title.textContent = "Loading local example…";
  answer.textContent = "";
  steps.replaceChildren();
  try {
    const response = await fetch("/api/demo?scenario=" + encodeURIComponent(id));
    if (!response.ok) throw new Error("The local server returned " + response.status);
    const data = await response.json();
    if (current !== requestId) return;
    title.textContent = data.title;
    answer.textContent = data.answer;
    for (const text of data.steps) {
      const li = document.createElement("li");
      li.textContent = text;
      steps.appendChild(li);
    }
  } catch {
    if (current !== requestId) return;
    title.textContent = "Could not load the example";
    answer.textContent = "Check that the local Node server is running, then try again.";
  }
}
for (const button of choices) button.addEventListener("click", () => {
  selected = button.dataset.scenario;
  loadScenario(selected);
});
reload.addEventListener("click", () => loadScenario(selected));
loadScenario(selected);
