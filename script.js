// Minimal concept dataset (replace with your full 35 later)
const concepts = [
  { id: 1, name: "Knapsack Problem", definition: "Choose subset...", symbols: ["$x_i \\in \\{0,1\\}$"], example: "Pick roads under budget.", category: "optimization" },
  { id: 2, name: "Dynamic Programming", definition: "Recursive method...", symbols: ["$V_t(s) = \\min_a [...]$"], example: "Backward optimization.", category: "markov" },
  { id: 3, name: "Reinforcement Learning", definition: "Trial and error...", symbols: ["$Q(s,a) \\leftarrow ...$"], example: "Agent learns policies.", category: "rl" },
  { id: 4, name: "System-Level Model", definition: "Network-level optimization.", symbols: ["$\\sum_i C_i(x_i) \\le B$"], example: "Allocate budget across roads.", category: "system" }
];

// render cards
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

// category filtering
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

// layout control
document.getElementById("layout").addEventListener("change", e => {
  document.body.className = "layout-" + e.target.value;
});

// print button
document.getElementById("printBtn").addEventListener("click", () => window.print());

// --- Practice Mode ---
const practiceBtn = document.getElementById("practiceBtn");
const checkBtn = document.getElementById("checkBtn");
const practiceCard = document.getElementById("practice-card");
let currentPractice = null;

practiceBtn.addEventListener("click", () => {
  const level = document.querySelector('input[name="level"]:checked').value;
  const random = concepts[Math.floor(Math.random() * concepts.length)];
  currentPractice = { ...random, level };

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
  practiceCard.querySelectorAll(".fuzzy").forEach(el => el.classList.remove("fuzzy"));
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
});
