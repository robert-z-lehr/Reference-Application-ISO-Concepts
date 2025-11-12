// =============================
// Concepts (35) with categories
// =============================

const concepts = [
  // Optimization Basics
  {
    id: 1, category: "optimization",
    name: "Knapsack Problem",
    definition: "Choose a subset of items to maximize total benefit while staying within a resource limit.",
    symbols: [
      "$i = 1,\\ldots,n$", "$v_i$: benefit or value", "$w_i$: cost or weight",
      "$W$: total capacity or budget", "$x_i \\in \\{0,1\\}$: decision variable"
    ],
    example: "Selecting which pavement segments to repave within a $75{,}000$ budget to maximize total user satisfaction."
  },
  {
    id: 19, category: "optimization",
    name: "Decision Variable",
    definition: "A mathematical variable representing a decision in the optimization model.",
    symbols: ["$x_{s,a}$: fraction or area treated in state $s$ under action $a$"],
    example: "Area (sq yd) resurfaced in 'Poor' condition."
  },
  {
    id: 20, category: "optimization",
    name: "Objective Function",
    definition: "The quantity to be minimized or maximized in an optimization problem.",
    symbols: ["$\\min \\sum_{t,s,a} c_t(s,a)\\,x_{t,s,a}$"],
    example: "Minimize discounted total cost of maintenance and user delay."
  },
  {
    id: 21, category: "optimization",
    name: "Constraint",
    definition: "A rule that feasible solutions must satisfy in an optimization problem.",
    symbols: ["$\\sum_a C(s,a)\\,x_{s,a} \\le B$"],
    example: "Annual maintenance spending $\\le \\$75{,}000$."
  },
  {
    id: 27, category: "optimization",
    name: "Budget Constraint",
    definition: "A restriction limiting the total amount of resources or cost per period.",
    symbols: ["$\\sum_i c_i x_i \\le B$"],
    example: "Total yearly maintenance cost $\\le \\$75{,}000$."
  },
  {
    id: 28, category: "optimization",
    name: "Feasible Region",
    definition: "The set of all solutions that satisfy every model constraint.",
    symbols: ["$\\mathcal{F} = \\{x \\mid Ax \\le b,\\; x \\ge 0\\}$"],
    example: "All possible allocations of funds that meet the budget and nonnegativity conditions."
  },
  {
    id: 35, category: "optimization",
    name: "Core Components of Every Optimization Problem",
    definition: "Four fundamental components define an optimization model’s structure and solvability.",
    symbols: [
      "Decision Variables $x_i$",
      "Parameters $p_i$ (costs, probabilities, capacities)",
      "Constraints $g_j(x,p) \\le 0$",
      "Objective $f(x,p)$ (minimize or maximize)"
    ],
    example: "For pavement optimization: $x_{s,a}$ are treated areas; parameters include costs and transition probabilities; constraints enforce $\\le \\$75{,}000$; objective minimizes total discounted agency + user cost."
  },

  // Markov Processes
  {
    id: 6, category: "markov",
    name: "Markov Chain",
    definition: "A stochastic process where the future state depends only on the current state.",
    symbols: ["$P = [p_{ij}]$ (transition matrix)", "$\\pi_{t+1} = \\pi_t P$"],
    example: "Modeling deterioration among Good, Fair, Poor."
  },
  {
    id: 22, category: "markov",
    name: "Transition Probability",
    definition: "Probability of moving from one state to another given an action (or passively in a chain).",
    symbols: ["$P(s'\\mid s,a)$"],
    example: "Fair remains Fair after routine maintenance with probability $0.8$."
  },
  {
    id: 29, category: "markov",
    name: "State Transition Matrix",
    definition: "Matrix summarizing transition probabilities for a specific action.",
    symbols: ["$P_a = [p_{ij}^a]$"],
    example: "Separate matrices for 'Do Nothing' vs 'Resurface'."
  },
  {
    id: 26, category: "markov",
    name: "Steady-State Condition",
    definition: "A state distribution that remains constant over time.",
    symbols: ["$\\pi = \\pi P$"],
    example: "Long-run mix: 40% Good, 35% Fair, 25% Poor."
  },
  {
    id: 30, category: "markov",
    name: "Expected Value",
    definition: "Probability-weighted average outcome across possible events.",
    symbols: ["$\\mathbb{E}[X] = \\sum_x x\\,P(x)$"],
    example: "Expected maintenance cost $= 0.7(1000)+0.3(5000)=2200$."
  },

  // Dynamic Programming
  {
    id: 2, category: "dynamic",
    name: "Dynamic Programming (DP)",
    definition: "Recursive optimization using the principle of optimality.",
    symbols: ["$V_t(s)=\\min_a [\\, c_t(s,a)+\\sum_{s'} P_t(s'\\mid s,a) V_{t+1}(s') \\,]$"],
    example: "Solve 10-year plan by backward recursion."
  },
  {
    id: 12, category: "dynamic",
    name: "Backward Induction",
    definition: "Finite-horizon DP solved from last stage backward.",
    symbols: ["$V_T(s)$ terminal; $V_t(s)=\\min_a[\\,c_t+\\sum P V_{t+1}\\,]$"],
    example: "Compute optimal treatments from year 5 to 1."
  },
  {
    id: 10, category: "dynamic",
    name: "Finite-Horizon Problem",
    definition: "Optimization over a fixed number of stages with terminal value.",
    symbols: ["$t=0,\\ldots,T$", "$V_{T+1}(s)$ terminal"],
    example: "20-year plan with residual value."
  },
  {
    id: 11, category: "dynamic",
    name: "Infinite-Horizon Problem",
    definition: "No fixed endpoint; uses discounting or steady-state assumptions.",
    symbols: ["$V(s)=\\min_a[\\,c(s,a)+\\gamma\\sum P V(s')\\,]$"],
    example: "Indefinite steady-state maintenance policy."
  },
  {
    id: 16, category: "dynamic",
    name: "Stage",
    definition: "A discrete time or decision point.",
    symbols: ["$t=0,1,\\ldots,T$"],
    example: "Each year in the horizon."
  },
  {
    id: 17, category: "dynamic",
    name: "State",
    definition: "System condition at a given stage.",
    symbols: ["$s\\in S$"],
    example: "Good, Fair, Poor."
  },
  {
    id: 18, category: "dynamic",
    name: "Action",
    definition: "A choice available at a state.",
    symbols: ["$a\\in A(s)$"],
    example: "'Do Nothing', 'Maintain', 'Reconstruct'."
  },
  {
    id: 25, category: "dynamic",
    name: "Bellman Equation",
    definition: "Recursive relation of optimal value via immediate and future costs.",
    symbols: ["$V(s)=\\min_a[\\,c(s,a)+\\gamma \\sum P V(s')\\,]$"],
    example: "Minimum expected lifetime cost of a section."
  },
  {
    id: 13, category: "dynamic",
    name: "Value Iteration",
    definition: "Iterative Bellman updates until convergence (infinite-horizon).",
    symbols: ["$V_{k+1}(s)=\\min_a[\\,c(s,a)+\\gamma\\sum P V_k(s')\\,]$"],
    example: "Stop when max change $< \\$1$."
  },
  {
    id: 14, category: "dynamic",
    name: "Policy Iteration",
    definition: "Alternate policy evaluation and improvement until convergence.",
    symbols: [
      "$V^{\\pi}(s)=c(s,\\pi(s))+\\gamma\\sum P V^{\\pi}(s')$",
      "$\\pi'(s)=\\arg\\min_a[\\,c+\\gamma\\sum P V^{\\pi}\\,]$"
    ],
    example: "Improve from 'Do Nothing' to cheaper actions."
  },
  {
    id: 31, category: "dynamic",
    name: "Policy",
    definition: "Mapping from states to actions.",
    symbols: ["$\\pi: S\\to A$"],
    example: "If Good→DN; Fair→Maintain; Poor→Resurface."
  },
  {
    id: 32, category: "dynamic",
    name: "Policy Evaluation",
    definition: "Compute total expected value of a given policy.",
    symbols: ["$V^{\\pi}(s)=c(s,\\pi(s))+\\gamma\\sum P V^{\\pi}(s')$"],
    example: "50-year expected cost under a fixed policy."
  },
  {
    id: 33, category: "dynamic",
    name: "Policy Improvement",
    definition: "Select actions that lower expected cost given evaluated values.",
    symbols: ["$\\pi'(s)=\\arg\\min_a[\\,c+\\gamma\\sum P V^{\\pi}\\,]$"],
    example: "Swap actions where cheaper in the long run."
  },
  {
    id: 24, category: "dynamic",
    name: "Discount Factor",
    definition: "Weights future costs/rewards relative to present.",
    symbols: ["$\\gamma\\in(0,1)$"],
    example: "With $\\gamma=0.97$, $1 next year \\approx 0.97$ today."
  },
  {
    id: 23, category: "dynamic",
    name: "Reward / Cost Function",
    definition: "Immediate payoff or expense for a state–action pair.",
    symbols: ["$r(s,a)$ reward; $c(s,a)$ cost"],
    example: "Routine maintenance costs $\\$10$/sq yd."
  },

  // Reinforcement Learning
  {
    id: 3, category: "rl",
    name: "Reinforcement Learning (RL)",
    definition: "Learn policies via trial-and-error interaction with an environment.",
    symbols: [
      "$Q(s,a)\\leftarrow Q(s,a)+\\alpha[\\,r+\\gamma\\max_{a'}Q(s',a')-Q(s,a)\\,]$",
      "$\\alpha$ learning rate; $\\gamma$ discount"
    ],
    example: "Learn pavement treatment policies from simulated experience."
  },

  // System-Level / LP
  {
    id: 8, category: "system",
    name: "Facility-Level Model",
    definition: "Optimization on a single asset, ignoring system interactions.",
    symbols: ["$s_t$ facility state at $t$; $a_t$ action"],
    example: "Optimal rehab timing for one bridge deck."
  },
  {
    id: 9, category: "system",
    name: "System-Level Model",
    definition: "Network-level optimization coordinating decisions under shared constraints.",
    symbols: ["$\\sum_i C_i(x_i) \\le B$"],
    example: "Allocate annual budgets across roads to minimize total cost."
  },
  {
    id: 34, category: "system",
    name: "System Optimization (Overall)",
    definition: "Joint optimization across facilities, time, and budget.",
    symbols: ["$\\min \\sum_{s,a} c(s,a)\\,x_{s,a}$ (subject to constraints)"],
    example: "Choose all actions to minimize discounted total network cost."
  },
  {
    id: 15, category: "system",
    name: "Linear Programming Formulation (of MDP)",
    definition: "LP equivalents for MDPs, written in cost-min or reward-max forms.",
    symbols: [
      "Cost form: $\\min \\sum_s V(s)$ s.t. $V(s)\\le c(s,a)+\\gamma\\sum P V(s')\\;\\forall s,a$",
      "Reward form: $\\max \\sum_s V(s)$ s.t. $V(s)\\ge r(s,a)+\\gamma\\sum P V(s')\\;\\forall s,a$"
    ],
    example: "Solve a 3-state pavement MDP via Pyomo LP."
  }
];

// =============================
// Rendering & interactions
// =============================

const container = document.getElementById("card-container");
const tabMenu = document.getElementById("tab-menu");
const practiceShell = document.getElementById("practice-shell");

// Build cards once, tag with category class
function renderCards(list) {
  container.innerHTML = "";
  list.forEach(c => {
    const card = document.createElement("div");
    card.className = `card category-${c.category}`;
    card.dataset.category = c.category;

    const symbolsList = c.symbols.map(s => `<li>${s}</li>`).join("");
    card.innerHTML = `
      <h2>${c.id}. ${c.name}</h2>
      <div class="card-content">
        <p class="field"><span class="label">Definition:</span> ${c.definition}</p>
        <p class="field"><span class="label">Symbols:</span></p>
        <ul>${symbolsList}</ul>
        <p class="field"><span class="label">Example:</span> ${c.example}</p>
      </div>
    `;
    card.addEventListener("click", (e) => {
      // Ignore clicks on links/buttons inside card
      if (e.target.closest("button, a, select, input, label")) return;
      card.classList.toggle("open");
      if (window.MathJax) MathJax.typesetPromise();
    });
    container.appendChild(card);
  });
  if (window.MathJax) MathJax.typesetPromise();
}

// Initial render (all)
renderCards(concepts);

// Tabs: filter cards + toggle practice visibility
tabMenu.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    tabMenu.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.category;
    if (cat === "all") {
      practiceShell.style.display = "";
      renderCards(concepts);
    } else if (cat === "examples") {
      // Hide practice for Examples tab
      practiceShell.style.display = "none";
      renderExamplesTab();
    } else {
      practiceShell.style.display = "";
      const filtered = concepts.filter(c => c.category === cat);
      renderCards(filtered);
    }
  });
});

// Examples tab scaffold
function renderExamplesTab() {
  container.innerHTML = `
    <div class="card open">
      <h2>Examples (Scaffold)</h2>
      <div class="card-content">
        <p>Level 1: Read a generated scenario and identify the underlying concept category.</p>
        <p>Level 2: Solve the scenario (outline variables, constraints, objective or Bellman form as appropriate).</p>
        <p>Level 3: Sensitivity idea (e.g., vary a parameter and predict policy changes).</p>
        <p><em>Note:</em> This page is static; AI generation would require adding a backend or client-side API integration.</p>
      </div>
    </div>
  `;
}

// Layout & print
const layoutSelect = document.getElementById("layout");
layoutSelect.addEventListener("change", () => {
  document.body.className = "layout-" + layoutSelect.value;
});
document.getElementById("printBtn").addEventListener("click", () => window.print());

// =============================
// Practice panel (per-category)
// =============================

const toggleBtn = document.querySelector(".toggle-practice");
const practiceContent = document.querySelector(".practice-content");
const difficultySelect = document.getElementById("difficulty");
const startBtn = document.getElementById("startPractice");
const revealBtn = document.getElementById("revealAll");
const newBtn = document.getElementById("newRandom");
const blurToggle = document.getElementById("blurToggle");
const practiceCard = document.getElementById("practice-card");

toggleBtn.addEventListener("click", () => {
  const isHidden = practiceContent.hasAttribute("hidden");
  if (isHidden) {
    practiceContent.removeAttribute("hidden");
    toggleBtn.setAttribute("aria-expanded", "true");
  } else {
    practiceContent.setAttribute("hidden", "");
    toggleBtn.setAttribute("aria-expanded", "false");
    // Unblur when closing practice
    container.classList.remove("blurred");
    blurToggle.checked = false;
  }
  if (window.MathJax) MathJax.typesetPromise();
});

blurToggle.addEventListener("change", () => {
  if (blurToggle.checked) container.classList.add("blurred");
  else container.classList.remove("blurred");
});

// Generate practice based on current tab category
function currentCategory() {
  const active = tabMenu.querySelector("button.active");
  const cat = active ? active.dataset.category : "all";
  return cat;
}

function poolForCategory(cat) {
  if (cat === "all") return concepts.slice();
  if (cat === "examples") return []; // no practice here
  return concepts.filter(c => c.category === cat);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// fields: name, definition, symbols, example
function buildPracticeCard(concept, shownCount) {
  // Decide which fields to show (randomly choose shownCount of 4)
  const fields = ["name","definition","symbols","example"];
  const shuffled = fields.sort(() => Math.random() - 0.5);
  const showSet = new Set(shuffled.slice(0, shownCount));

  const nameHTML = showSet.has("name")
    ? `<span class="value">${concept.name}</span>`
    : `<span class="masked">— hidden —</span>`;

  const defHTML = showSet.has("definition")
    ? `${concept.definition}`
    : `<span class="masked">— hidden —</span>`;

  const symHTML = showSet.has("symbols")
    ? `<ul>${concept.symbols.map(s=>`<li>${s}</li>`).join("")}</ul>`
    : `<span class="masked">— hidden —</span>`;

  const exHTML = showSet.has("example")
    ? `${concept.example}`
    : `<span class="masked">— hidden —</span>`;

  practiceCard.innerHTML = `
    <div class="field"><span class="label">Concept:</span> ${nameHTML}</div>
    <div class="field"><span class="label">Definition:</span> ${defHTML}</div>
    <div class="field"><span class="label">Symbols:</span> ${symHTML}</div>
    <div class="field"><span class="label">Example:</span> ${exHTML}</div>
  `;

  // Enable reveal/new
  revealBtn.disabled = false;
  newBtn.disabled = false;

  if (window.MathJax) MathJax.typesetPromise();
}

let lastConcept = null;

startBtn.addEventListener("click", () => {
  const cat = currentCategory();
  const pool = poolForCategory(cat);
  if (!pool.length) {
    practiceCard.innerHTML = `<em>No concepts available for practice on this tab.</em>`;
    return;
  }
  if (blurToggle.checked) container.classList.add("blurred");
  const shown = Number(difficultySelect.value);
  lastConcept = pickRandom(pool);
  buildPracticeCard(lastConcept, shown);
});

newBtn.addEventListener("click", () => {
  const cat = currentCategory();
  const pool = poolForCategory(cat);
  if (!pool.length) return;
  const shown = Number(difficultySelect.value);
  lastConcept = pickRandom(pool);
  buildPracticeCard(lastConcept, shown);
});

revealBtn.addEventListener("click", () => {
  if (!lastConcept) return;
  // Rebuild with all 4 shown
  buildPracticeCard(lastConcept, 4);
  // Unblur to compare with cards, if desired
  container.classList.remove("blurred");
  blurToggle.checked = false;
});
