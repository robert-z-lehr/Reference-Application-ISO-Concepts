// --- All 35 concepts (abbreviated here for clarity, use your full version) ---
const concepts = [
  { id: 1, name: "Knapsack Problem", definition: "Choose subset of items to maximize benefit while within capacity.", symbols: ["$x_i \\in \\{0,1\\}$"], example: "Selecting which pavement segments to repave.", category: "optimization" },
  { id: 2, name: "Dynamic Programming", definition: "Recursive optimization method using subproblems.", symbols: ["$V_t(s) = \\min_a [...]$"], example: "Find minimum total maintenance cost.", category: "markov" },
  { id: 3, name: "Reinforcement Learning", definition: "Learning by trial-and-error interaction with environment.", symbols: ["$Q(s,a) \\leftarrow Q(s,a) + \\alpha[...]$"], example: "Training an algorithm to learn actions.", category: "rl" },
  { id: 4, name: "System-Level Model", definition: "Network-level optimization coordinating multiple assets.", symbols: ["$\\sum_i C_i(x_i) \\le B$"], example: "Allocate budget across city roads.", category: "system" },
  // ... (include your full 35 objects from previous version)
];

// --- Render cards ---
const container = document.getElementById("card-container");
function renderCards() {
  container.innerHTML = "";
  concepts.forEach(c => {
    const card = document.createElement("div");
    card.className = `card category-${c.category}`;
    card.innerHTML = `
      <h2>${c.id}. ${c.name}</h2>
      <div class="card-content">
        <p><strong>Definition:</strong> ${c.definition}</p>
        <p><strong>Symbols:</strong> ${c.symbols.join(", ")}</p>
        <p><strong>Example:</strong> ${c.example}</p>
      </div>`;
    card.addEventListener("click", () => {
      card.classList.toggle("open");
      if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
    });
    container.appendChild(card);
  });
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
}
renderCards();

// --- Category Filtering ---
document.querySelectorAll(".tab-menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-menu button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category;
    document.querySelectorAll(".card").forEach(card => {
      if (cat === "all" || card.classList.contains(`category-${cat}`))
        card.style.display = "";
      else
        card.style.display = "none";
    });
  });
});

// --- Layout & Print ---
document.getElementById("layout").addEventListener("change", e => {
  document.body.className = "layout-" + e.target.value;
});
document.getElementById("printBtn").addEventListener("click", () => window.print());

// --- Practice Mode ---
const practiceBtn = document.getElementById("practiceBtn");
const checkBtn = document.getElementById("checkBtn");
const practiceCard = document.getElementById("practice-card");
const answerBox = document.getElementById("answerBox");
const scoreDisplay = document.getElementById("scoreDisplay");

let currentPractice = null;
let totalAttempts = 0;
let correctAttempts = 0;

practiceBtn.addEventListener("click", () => {
  const level = document.querySelector('input[name="level"]:checked').value;
  const random = concepts[Math.floor(Math.random() * concepts.length)];
  currentPractice = { ...random, level };
  answerBox.value = "";

  let html = `
    <h3>${random.name}</h3>
    <p class="${level >= 1 ? "fuzzy" : ""}"><strong>Definition:</strong> ${random.definition}</p>
    <p class="${level >= 2 ? "fuzzy" : ""}"><strong>Symbols:</strong> ${random.symbols.join(", ")}</p>
    <p class="${level >= 3 ? "fuzzy" : ""}"><strong>Example:</strong> ${random.example}</p>
  `;
  practiceCard.innerHTML = html;
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
});

checkBtn.addEventListener("click", () => {
  if (!currentPractice) return;
  const answer = answerBox.value.trim().toLowerCase();
  const target = (currentPractice.definition + " " + currentPractice.symbols.join(" ") + " " + currentPractice.example).toLowerCase();

  totalAttempts++;
  let matchScore = 0;
  if (answer) {
    const words = answer.split(/\s+/);
    let matches = words.filter(w => target.includes(w)).length;
    matchScore = (matches / words.length) * 100;
  }

  if (matchScore >= 70) correctAttempts++;

  const accuracy = totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
  scoreDisplay.textContent = accuracy + "%";

  // Color scale
  let bg = "var(--red)";
  if (accuracy > 90) bg = "var(--green)";
  else if (accuracy > 80) bg = "var(--yellow)";
  else if (accuracy > 70) bg = "var(--orange)";
  scoreDisplay.style.background = bg;

  // Reveal fuzzy text
  practiceCard.querySelectorAll(".fuzzy").forEach(el => el.classList.remove("fuzzy"));
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
});
