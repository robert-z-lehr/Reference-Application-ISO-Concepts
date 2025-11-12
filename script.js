/* =========================================================================
   ISO Concept Cards — FULL script.js (explicit, no omissions)
   - Renders all 35 concepts with MathJax LaTeX
   - Category tabs (All / Optimization / Markov-DP / RL / System)
   - Print / layout
   - Practice mode with Levels 1–3, exact string match, per-level scores
   - Dynamic vertical expansion: if equation is wider than card, card spans full row
   ========================================================================== */

/* -----------------------------
   1) DATA: 35 Concepts (FULL)
   Each object: id, name, definition, symbols[], example, category
   Categories used:
     - "optimization"
     - "markov"
     - "rl"
     - "system"
   ----------------------------- */
const concepts = [
  {
    id: 1,
    name: "Knapsack Problem",
    definition: "Choose a subset of items to maximize total benefit while staying within a resource limit.",
    symbols: [
      "$i = 1,\\ldots,n$",
      "$v_i$: benefit or value",
      "$w_i$: cost or weight",
      "$W$: total capacity or budget",
      "$x_i \\in \\{0,1\\}$: decision variable"
    ],
    example: "Selecting which pavement segments to repave within a $75{,}000$ budget to maximize total user satisfaction.",
    category: "optimization"
  },
  {
    id: 2,
    name: "Dynamic Programming (DP)",
    definition: "A recursive optimization method dividing a multi-stage decision problem into smaller subproblems, using the principle of optimality.",
    symbols: [
      "$V_t(s) = \\min_a\\Big[\\, c_t(s,a) + \\sum_{s'} P_t(s'\\mid s,a)\\,V_{t+1}(s') \\,\\Big]$",
      "$s$: state",
      "$a$: action",
      "$t$: stage index"
    ],
    example: "Finding the minimum total maintenance cost over $10$ years by solving backward from the final year.",
    category: "markov"
  },
  {
    id: 3,
    name: "Reinforcement Learning (RL)",
    definition: "A learning-based approach that estimates optimal policies through repeated trial-and-error interaction with an environment.",
    symbols: [
      "$Q(s,a) \\leftarrow Q(s,a) + \\alpha\\big[\\, r + \\gamma\\,\\max_{a'} Q(s',a') - Q(s,a) \\,\\big]$",
      "$\\alpha$: learning rate",
      "$\\gamma$: discount factor"
    ],
    example: "Training an algorithm to learn optimal pavement treatment decisions through simulated experience rather than relying on known transition probabilities.",
    category: "rl"
  },
  {
    id: 4,
    name: "Bottom-Up Modeling",
    definition: "Start from modeling individual components and aggregate results to understand overall system performance.",
    symbols: [
      "$F = \\sum_i f_i$",
      "$f_i$: component performance metric"
    ],
    example: "Simulating deterioration of each bridge and aggregating their expected maintenance costs to assess the total network cost.",
    category: "system"
  },
  {
    id: 5,
    name: "Top-Down Modeling",
    definition: "Start from system-level targets or policies and allocate resources downward to meet them.",
    symbols: [
      "$\\sum_i x_i \\le B$",
      "$x_i$: allocation",
      "$B$: total budget"
    ],
    example: "Allocating maintenance budgets to districts to meet a target average pavement condition index $\\ge 80$.",
    category: "system"
  },
  {
    id: 6,
    name: "Markov Chain",
    definition: "A stochastic process where the future state depends only on the current state, not on prior history.",
    symbols: [
      "$P = [p_{ij}]$: transition probability matrix",
      "$\\pi_{t+1} = \\pi_t\\,P$"
    ],
    example: "Modeling road deterioration among Good, Fair, and Poor conditions using a transition probability matrix.",
    category: "markov"
  },
  {
    id: 7,
    name: "Markov Decision Process (MDP)",
    definition: "An extension of the Markov chain that includes decision-making—actions influence both costs and transition probabilities.",
    symbols: [
      "$V(s) = \\min_a\\Big[\\, c(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V(s') \\,\\Big]$"
    ],
    example: "Choosing between 'Do Nothing,' 'Maintain,' or 'Resurface' each year for pavements based on condition and cost.",
    category: "markov"
  },
  {
    id: 8,
    name: "Facility-Level Model",
    definition: "An optimization model applied to a single asset, ignoring system interactions.",
    symbols: [
      "$s_t$: facility state at time $t$",
      "$a_t$: treatment action"
    ],
    example: "Determining optimal rehabilitation timing for a single bridge deck over $50$ years.",
    category: "system"
  },
  {
    id: 9,
    name: "System-Level Model",
    definition: "A network-level optimization that coordinates decisions across multiple facilities under shared constraints.",
    symbols: [
      "$\\sum_i C_i(x_i) \\le B$",
      "$C_i(x_i)$: cost for facility $i$",
      "$B$: total budget"
    ],
    example: "Allocating annual budgets across city roads to minimize total user and agency costs.",
    category: "system"
  },
  {
    id: 10,
    name: "Finite-Horizon Problem",
    definition: "Optimization over a fixed number of decision stages, ending with a terminal value or salvage state.",
    symbols: [
      "$t = 0,\\ldots,T$",
      "$V_{T+1}(s)$: terminal value"
    ],
    example: "A $20$-year pavement management plan ending with a residual value at year $20$.",
    category: "markov"
  },
  {
    id: 11,
    name: "Infinite-Horizon Problem",
    definition: "Optimization with no fixed endpoint, typically using discounting or steady-state assumptions.",
    symbols: [
      "$V(s) = \\min_a\\Big[\\, c(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V(s') \\,\\Big]$"
    ],
    example: "Steady-state maintenance policy for a city-wide road network assumed to operate indefinitely.",
    category: "markov"
  },
  {
    id: 12,
    name: "Backward Induction",
    definition: "A dynamic programming technique for finite-horizon problems, solving from the last stage backward to the first.",
    symbols: [
      "$V_T(s)$: terminal cost",
      "$V_t(s) = \\min_a\\Big[\\, c_t(s,a) + \\sum_{s'} P(s'\\mid s,a)\\,V_{t+1}(s') \\,\\Big]$"
    ],
    example: "Computing optimal treatments year-by-year from year $5$ back to year $1$ in a finite-horizon maintenance model.",
    category: "markov"
  },
  {
    id: 13,
    name: "Value Iteration",
    definition: "Iterative Bellman updates of the value function until convergence, used for infinite-horizon MDPs.",
    symbols: [
      "$V_{k+1}(s) = \\min_a\\Big[\\, c(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V_k(s') \\,\\Big]$"
    ],
    example: "Running iterative updates on pavement condition values until the change is smaller than a threshold (e.g., $<\\$1$).",
    category: "markov"
  },
  {
    id: 14,
    name: "Policy Iteration",
    definition: "Algorithm that alternates between evaluating a policy’s value and improving it until convergence.",
    symbols: [
      "$V^\\pi(s) = c(s,\\pi(s)) + \\gamma \\sum_{s'} P(s'\\mid s,\\pi(s))\\,V^\\pi(s')$",
      "$\\pi'(s) = \\arg\\min_a\\Big[\\, c(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V^\\pi(s') \\,\\Big]$"
    ],
    example: "Start with a simple policy, evaluate its value, then update actions to reduce long-run cost, and repeat until no change.",
    category: "markov"
  },
  {
    id: 15,
    name: "Linear Programming Formulation (of MDP)",
    definition: "Solving MDPs as linear programs using Bellman inequalities and value variables.",
    symbols: [
      "$\\max \\sum_s V(s)$",
      "\\text{subject to }\\; V(s) \\le c(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V(s')\\;\\; \\forall s,a"
    ],
    example: "Using a linear program in Pyomo to find optimal values and derive a policy for a $3$-state pavement system.",
    category: "optimization"
  },
  {
    id: 16,
    name: "Stage",
    definition: "A discrete time or decision point in a sequential optimization model.",
    symbols: [
      "$t = 0,1,\\ldots,T$"
    ],
    example: "Each year in a $20$-year pavement management horizon.",
    category: "markov"
  },
  {
    id: 17,
    name: "State",
    definition: "A description of the system’s condition at a given stage.",
    symbols: [
      "$s \\in S$: set of states"
    ],
    example: "Pavement condition: Good, Fair, or Poor.",
    category: "markov"
  },
  {
    id: 18,
    name: "Action",
    definition: "A choice available to the decision maker at a specific state.",
    symbols: [
      "$a \\in A(s)$"
    ],
    example: "Choosing among 'Do Nothing,' 'Routine Maintenance,' or 'Reconstruction.'",
    category: "markov"
  },
  {
    id: 19,
    name: "Decision Variable",
    definition: "A mathematical variable representing a decision in the optimization model.",
    symbols: [
      "$x_{s,a}$: fraction or area treated in state $s$ under action $a$"
    ],
    example: "Area (sq yd) resurfaced in 'Poor' condition.",
    category: "optimization"
  },
  {
    id: 20,
    name: "Objective Function",
    definition: "The quantity to be minimized or maximized in an optimization problem.",
    symbols: [
      "$\\min \\sum_{t,s,a} c_t(s,a)\\,x_{t,s,a}$"
    ],
    example: "Minimize discounted total cost of maintenance and user delay.",
    category: "optimization"
  },
  {
    id: 21,
    name: "Constraint",
    definition: "A rule that feasible solutions must satisfy in an optimization problem.",
    symbols: [
      "$\\sum_a C(s,a)\\,x_{s,a} \\le B$"
    ],
    example: "Annual maintenance spending $\\le \\$75{,}000$.",
    category: "optimization"
  },
  {
    id: 22,
    name: "Transition Probability",
    definition: "The probability of moving from one state to another given an action.",
    symbols: [
      "$P(s'\\mid s,a)$"
    ],
    example: "Probability that a Fair road remains Fair after routine maintenance $= 0.8$.",
    category: "markov"
  },
  {
    id: 23,
    name: "Reward / Cost Function",
    definition: "Immediate payoff or expense from taking a specific action in a given state.",
    symbols: [
      "$r(s,a)$: reward",
      "$c(s,a)$: cost"
    ],
    example: "Routine maintenance costs $\\$10$ per square yard.",
    category: "markov"
  },
  {
    id: 24,
    name: "Discount Factor",
    definition: "A coefficient that reduces the weight of future costs or rewards relative to the present.",
    symbols: [
      "$\\gamma \\in (0,1)$"
    ],
    example: "With $\\gamma = 0.97$, $1$ received next year equals $0.97$ today.",
    category: "markov"
  },
  {
    id: 25,
    name: "Bellman Equation",
    definition: "The recursive relationship defining the optimal value function based on immediate and future costs.",
    symbols: [
      "$V(s) = \\min_a\\Big[\\, c(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V(s') \\,\\Big]$"
    ],
    example: "Used to calculate minimum expected lifetime cost of maintaining a pavement section.",
    category: "markov"
  },
  {
    id: 26,
    name: "Steady-State Condition",
    definition: "A state distribution that remains constant over time in a Markov process.",
    symbols: [
      "$\\pi = \\pi\\,P$"
    ],
    example: "Long-run equilibrium: $40\\%$ Good, $35\\%$ Fair, $25\\%$ Poor.",
    category: "markov"
  },
  {
    id: 27,
    name: "Budget Constraint",
    definition: "A restriction limiting the total amount of resources or cost per period.",
    symbols: [
      "$\\sum_i c_i\\,x_i \\le B$"
    ],
    example: "Total yearly maintenance cost $\\le \\$75{,}000$.",
    category: "optimization"
  },
  {
    id: 28,
    name: "Feasible Region",
    definition: "The set of all solutions that satisfy every model constraint.",
    symbols: [
      "$\\mathcal{F} = \\{\\, x \\mid A\\,x \\le b,\\; x \\ge 0\\,\\}$"
    ],
    example: "All allocations of funds that meet the budget and nonnegativity conditions.",
    category: "optimization"
  },
  {
    id: 29,
    name: "State Transition Matrix",
    definition: "A matrix summarizing probabilities of moving between states for a specific action.",
    symbols: [
      "$P_a = [\\,p_{ij}^{(a)}\\,]$"
    ],
    example: "Separate transition matrices for 'Do Nothing' and 'Resurface' actions.",
    category: "markov"
  },
  {
    id: 30,
    name: "Expected Value",
    definition: "The probability-weighted average outcome across possible states or events.",
    symbols: [
      "$\\mathbb{E}[X] = \\sum_x x\\,P(x)$"
    ],
    example: "Expected maintenance cost $= 0.7\\cdot 1000 + 0.3\\cdot 5000 = 2200$.",
    category: "optimization"
  },
  {
    id: 31,
    name: "Policy",
    definition: "A rule or mapping that assigns an action to each state.",
    symbols: [
      "$\\pi: S \\to A$"
    ],
    example: "If Good $\\to$ Do Nothing; Fair $\\to$ Maintain; Poor $\\to$ Resurface.",
    category: "markov"
  },
  {
    id: 32,
    name: "Policy Evaluation",
    definition: "The process of computing the total expected value of a given policy.",
    symbols: [
      "$V^{\\pi}(s) = c(s,\\pi(s)) + \\gamma \\sum_{s'} P(s'\\mid s,\\pi(s))\\,V^{\\pi}(s')$"
    ],
    example: "Calculating $50$-year expected cost if 'Maintain Fair, Resurface Poor' policy is followed.",
    category: "markov"
  },
  {
    id: 33,
    name: "Policy Improvement",
    definition: "Selecting new actions that yield a lower expected cost based on the evaluated policy values.",
    symbols: [
      "$\\pi'(s) = \\arg\\min_a\\Big[\\, c(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V^{\\pi}(s') \\,\\Big]$"
    ],
    example: "Switching from 'Maintain Fair' to 'Do Nothing' if it yields lower long-term cost.",
    category: "markov"
  },
  {
    id: 34,
    name: "System Optimization (Overall)",
    definition: "Joint optimization of all facility, temporal, and budgetary decisions to minimize total cost or maximize performance.",
    symbols: [
      "$\\min \\sum_{s,a} c(s,a)\\,x_{s,a}$ subject to constraints"
    ],
    example: "Optimizing all city road maintenance actions to minimize total discounted cost over time.",
    category: "optimization"
  },
  {
    id: 35,
    name: "Core Components of Every Optimization Problem",
    definition: "All optimization problems share four fundamental components that define their structure and solvability.",
    symbols: [
      "Decision Variables $x_i$: unknowns to determine",
      "Parameters $p_i$: fixed inputs such as costs, probabilities, capacities",
      "Constraints $g_j(x,p) \\le 0$: rules limiting feasible solutions",
      "Objective Function $f(x,p)$: quantity to minimize or maximize"
    ],
    example: "In a pavement optimization model: decision variables are treated areas ($x_{s,a}$); parameters include costs and transition probabilities; constraints ensure total cost $\\le \\$75{,}000$; and the objective function minimizes total discounted agency $+$ user cost.",
    category: "optimization"
  }
];

/* -------------------------------------------
   2) RENDERING: Cards + MathJax + Dynamic sizing
   - Creates .card elements into #card-container
   - Each card toggles open/closed
   - After typeset, if content wider than card, card spans full row
   ------------------------------------------- */
const container = document.getElementById("card-container");

function needsFullRow(cardElem) {
  // Determine if the inner content exceeds the card width AFTER MathJax typeset.
  // We measure the .card-content's scrollWidth vs clientWidth.
  const content = cardElem.querySelector(".card-content");
  if (!content) return false;
  // small epsilon to avoid jitter
  return content.scrollWidth > content.clientWidth + 2;
}

function adjustCardWidth(cardElem) {
  // If content is wider than available width, span full row (grid-column: 1/-1)
  if (needsFullRow(cardElem)) {
    cardElem.style.gridColumn = "1 / -1";
  } else {
    cardElem.style.gridColumn = ""; // reset to default (auto-fit grid)
  }
}

function renderCards() {
  container.innerHTML = "";
  concepts.forEach(c => {
    const card = document.createElement("div");
    card.className = `card category-${c.category}`;
    // Compose symbols as bullet list to preserve MathJax chunks
    const symbolsList = `<ul>${c.symbols.map(s => `<li>${s}</li>`).join("")}</ul>`;
    card.innerHTML = `
      <h2>${c.id}. ${c.name}</h2>
      <div class="card-content">
        <p><strong>Definition:</strong> ${c.definition}</p>
        <p><strong>Symbols:</strong></p>
        ${symbolsList}
        <p><strong>Example:</strong> ${c.example}</p>
      </div>`;
    // Toggle
    card.addEventListener("click", () => {
      card.classList.toggle("open");
      if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([card]).then(() => {
          adjustCardWidth(card);
        });
      } else {
        adjustCardWidth(card);
      }
    });
    container.appendChild(card);
  });
  // Initial typeset + adjust all
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([container]).then(() => {
      document.querySelectorAll(".card").forEach(adjustCardWidth);
    });
  } else {
    document.querySelectorAll(".card").forEach(adjustCardWidth);
  }
}

// Initial render
renderCards();

/* -------------------------------------------
   3) TABS: Filter by category
   ------------------------------------------- */
document.querySelectorAll(".tab-menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-menu button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category; // "all", "optimization", "markov", "rl", "system"
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      const show = (cat === "all") || card.classList.contains(`category-${cat}`);
      card.style.display = show ? "" : "none";
    });
    // After filtering, re-check widths for visible cards
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([container]).then(() => {
        document.querySelectorAll(".card").forEach(card => {
          if (card.style.display !== "none") adjustCardWidth(card);
        });
      });
    } else {
      document.querySelectorAll(".card").forEach(card => {
        if (card.style.display !== "none") adjustCardWidth(card);
      });
    }
  });
});

/* -------------------------------------------
   4) LAYOUT + PRINT controls
   ------------------------------------------- */
const layoutSelect = document.getElementById("layout");
if (layoutSelect) {
  layoutSelect.addEventListener("change", e => {
    document.body.className = "layout-" + e.target.value;
    // after layout change, re-check widths
    setTimeout(() => {
      document.querySelectorAll(".card").forEach(adjustCardWidth);
    }, 0);
  });
}
const printBtn = document.getElementById("printBtn");
if (printBtn) {
  printBtn.addEventListener("click", () => window.print());
}

/* -------------------------------------------
   5) PRACTICE MODE:
   - Levels:
       1 => fuzz Definition
       2 => fuzz Definition + Symbols
       3 => fuzz Definition + Symbols + Example
   - Exact string match (case-insensitive, trimmed) against the concatenated fuzzed fields
   - Separate score per level; colors:
       > 90% green, > 80% yellow, > 70% orange, else red
       None (no attempts) => gray
   ------------------------------------------- */
const practiceBtn = document.getElementById("practiceBtn");
const checkBtn = document.getElementById("checkBtn");
const practiceCard = document.getElementById("practice-card");
const answerBox = document.getElementById("answerBox");
const scoreBoxes = {
  1: document.getElementById("score1"),
  2: document.getElementById("score2"),
  3: document.getElementById("score3")
};
let scores = {
  1: { correct: 0, total: 0 },
  2: { correct: 0, total: 0 },
  3: { correct: 0, total: 0 }
};
let currentPractice = null;

// Initialize score boxes to "None" (gray)
function updateScoreDisplay() {
  [1, 2, 3].forEach(level => {
    const s = scores[level];
    const box = scoreBoxes[level];
    if (!box) return;
    if (s.total === 0) {
      box.textContent = "None";
      box.style.background = "var(--gray)";
    } else {
      const acc = Math.round((s.correct / s.total) * 100);
      box.textContent = acc + "%";
      let bg = "var(--red)";
      if (acc > 90) bg = "var(--green)";
      else if (acc > 80) bg = "var(--yellow)";
      else if (acc > 70) bg = "var(--orange)";
      box.style.background = bg;
    }
  });
}
updateScoreDisplay();

// Helper: build expected string based on level (concatenate fuzzed fields)
function expectedAnswerForLevel(concept, level) {
  const parts = [];
  if (level >= 1) parts.push(concept.definition); // fuzzed at L1
  if (level >= 2) parts.push(concept.symbols.join(" ")); // fuzzed at L2
  if (level >= 3) parts.push(concept.example); // fuzzed at L3
  return parts.join(" ").trim().toLowerCase();
}

if (practiceBtn) {
  practiceBtn.addEventListener("click", () => {
    const level = Number(document.querySelector('input[name="level"]:checked').value);
    const random = concepts[Math.floor(Math.random() * concepts.length)];
    currentPractice = { ...random, level }; // snapshot
    answerBox.value = "";

    // Build practice card HTML; fuzz depending on level
    const defClass = (level >= 1) ? "fuzzy" : "";
    const symClass = (level >= 2) ? "fuzzy" : "";
    const exClass  = (level >= 3) ? "fuzzy" : "";

    // Symbols as list to preserve MathJax blocks
    const symList = `<ul>${random.symbols.map(s => `<li>${s}</li>`).join("")}</ul>`;

    const html = `
      <h3>${random.name}</h3>
      <p class="${defClass}"><strong>Definition:</strong> ${random.definition}</p>
      <div class="${symClass}">
        <p><strong>Symbols:</strong></p>
        ${symList}
      </div>
      <p class="${exClass}"><strong>Example:</strong> ${random.example}</p>
    `;
    practiceCard.innerHTML = html;

    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([practiceCard]).then(() => {
        // Nothing to adjust here; practice card is full-width by design
      });
    }
  });
}

if (checkBtn) {
  checkBtn.addEventListener("click", () => {
    if (!currentPractice) return; // nothing to check
    const lvl = currentPractice.level;
    const userAns = (answerBox.value || "").trim().toLowerCase();
    const expected = expectedAnswerForLevel(currentPractice, lvl);

    scores[lvl].total += 1;
    if (userAns === expected) {
      scores[lvl].correct += 1;
    }

    updateScoreDisplay();

    // Reveal fuzzed text
    practiceCard.querySelectorAll(".fuzzy").forEach(el => el.classList.remove("fuzzy"));
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([practiceCard]);
    }
  });
}

/* -------------------------------------------
   6) WINDOW RESIZE HANDLER
   - If window resizes, re-check card widths to decide full-row spans
   ------------------------------------------- */
window.addEventListener("resize", () => {
  // Debounce-like minimal reflow
  clearTimeout(window.__iso_resize_timer);
  window.__iso_resize_timer = setTimeout(() => {
    document.querySelectorAll(".card").forEach(adjustCardWidth);
  }, 50);
});
