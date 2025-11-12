// === ISO Concept Cards (All 35 concepts, categorized) ===
const concepts = [
  { id: 1, name: "Knapsack Problem", definition: "Choose a subset of items to maximize total benefit while staying within a resource limit.", symbols: ["$i = 1,\\ldots,n$", "$v_i$: benefit or value", "$w_i$: cost or weight", "$W$: total capacity or budget", "$x_i \\in \\{0,1\\}$: decision variable"], example: "Selecting which pavement segments to repave within a $75,000$ budget to maximize total user satisfaction.", category: "optimization" },
  { id: 2, name: "Dynamic Programming (DP)", definition: "A recursive optimization method dividing a multi-stage decision problem into smaller subproblems, using the principle of optimality.", symbols: ["$V_t(s) = \\min_a [\\, c_t(s,a) + \\sum_{s'} P_t(s'|s,a)V_{t+1}(s') \\,]$", "$s$: state", "$a$: action", "$t$: stage index"], example: "Finding the minimum total maintenance cost over 10 years by solving backward from the final year.", category: "markov" },
  { id: 3, name: "Reinforcement Learning (RL)", definition: "A learning-based approach that estimates optimal policies through repeated trial-and-error interaction with an environment.", symbols: ["$Q(s,a) \\leftarrow Q(s,a) + \\alpha [\\, r + \\gamma \\max_{a'} Q(s',a') - Q(s,a) \\,]$", "$\\alpha$: learning rate", "$\\gamma$: discount factor"], example: "Training an algorithm to learn optimal pavement treatment decisions through simulated experience rather than known probabilities.", category: "rl" },
  { id: 4, name: "Bottom-Up Modeling", definition: "Start from modeling individual components and aggregate results to understand overall system performance.", symbols: ["$F = \\sum_i f_i$", "$f_i$: component performance metric"], example: "Simulating deterioration of each bridge and aggregating their expected maintenance costs to assess the total network cost.", category: "system" },
  { id: 5, name: "Top-Down Modeling", definition: "Start from system-level targets or policies and allocate resources downward to meet them.", symbols: ["$\\sum_i x_i \\le B$", "$x_i$: allocation", "$B$: total budget"], example: "Allocating maintenance budgets to districts to meet a target average pavement condition index ≥ 80.", category: "system" },
  { id: 6, name: "Markov Chain", definition: "A stochastic process where the future state depends only on the current state, not on prior history.", symbols: ["$P = [p_{ij}]$", "$\\pi_{t+1} = \\pi_t P$"], example: "Modeling road deterioration between Good, Fair, and Poor conditions using transition probabilities.", category: "markov" },
  { id: 7, name: "Markov Decision Process (MDP)", definition: "An extension of the Markov chain that includes decision-making—actions influence both costs and transition probabilities.", symbols: ["$V(s) = \\min_a [\\, c(s,a) + \\gamma \\sum_{s'} P(s'|s,a)V(s') \\,]$"], example: "Choosing between 'Do Nothing,' 'Maintain,' or 'Resurface' each year for pavements based on condition and cost.", category: "markov" },
  { id: 8, name: "Facility-Level Model", definition: "An optimization model applied to a single asset, ignoring system interactions.", symbols: ["$s_t$: facility state at time $t$", "$a_t$: treatment action"], example: "Determining optimal rehabilitation timing for a single bridge deck over 50 years.", category: "system" },
  { id: 9, name: "System-Level Model", definition: "A network-level optimization that coordinates decisions across multiple facilities under shared constraints.", symbols: ["$\\sum_i C_i(x_i) \\le B$", "$C_i(x_i)$: cost for facility $i$", "$B$: total budget"], example: "Allocating annual budgets across city roads to minimize total user and agency costs.", category: "system" },
  { id: 10, name: "Finite-Horizon Problem", definition: "Optimization over a fixed number of decision stages, ending with a terminal value or salvage state.", symbols: ["$t = 0,\\ldots,T$", "$V_{T+1}(s)$: terminal value"], example: "A 20-year pavement management plan ending with a residual value at year 20.", category: "markov" },
  { id: 11, name: "Infinite-Horizon Problem", definition: "Optimization with no fixed endpoint, typically using discounting or steady-state assumptions.", symbols: ["$V(s) = \\min_a [\\, c(s,a) + \\gamma \\sum_{s'} P(s'|s,a)V(s') \\,]$"], example: "Steady-state maintenance policy for a city-wide road network assumed to operate indefinitely.", category: "markov" },
  { id: 12, name: "Backward Induction", definition: "A dynamic programming technique for finite-horizon problems, solving from the last stage backward to the first.", symbols: ["$V_T(s)$: terminal cost", "$V_t(s) = \\min_a [\\, c_t(s,a) + \\sum P(s'|s,a)V_{t+1}(s') \\,]$"], example: "Computing optimal treatments year-by-year from year 5 back to year 1 in a finite-horizon maintenance model.", category: "markov" },
  { id: 13, name: "Value Iteration", definition: "Iterative Bellman updates of the value function until convergence, used for infinite-horizon MDPs.", symbols: ["$V_{k+1}(s) = \\min_a [\\, c(s,a) + \\gamma \\sum P(s'|s,a)V_k(s') \\,]$"], example: "Running iterative updates on pavement condition values until change < 1.", category: "markov" },
  { id: 14, name: "Policy Iteration", definition: "Algorithm that alternates between evaluating a policy’s value and improving it until convergence.", symbols: ["$V^\\pi(s) = c(s,\\pi(s)) + \\gamma \\sum P(s'|s,\\pi(s))V^\\pi(s')$", "$\\pi'(s) = \\arg\\min_a [\\, c(s,a) + \\gamma \\sum P(s'|s,a)V^\\pi(s') \\,]$"], example: "Start with 'Do Nothing' policy, evaluate cost, then switch to cheaper actions until stable.", category: "markov" },
  { id: 15, name: "Linear Programming Formulation (of MDP)", definition: "Solving MDPs as linear programs using Bellman inequalities and value variables.", symbols: ["$\\max \\sum_s V(s)$", "subject to $V(s) \\le c(s,a) + \\gamma \\sum P(s'|s,a)V(s') \\; \\forall s,a$"], example: "Using Pyomo to find optimal values and policies for a 3-state pavement system.", category: "optimization" },
  { id: 16, name: "Stage", definition: "A discrete time or decision point in a sequential optimization model.", symbols: ["$t = 0,1,\\ldots,T$"], example: "Each year in a 20-year pavement management horizon.", category: "markov" },
  { id: 17, name: "State", definition: "A description of the system’s condition at a given stage.", symbols: ["$s \\in S$: set of states"], example: "Pavement condition: Good, Fair, or Poor.", category: "markov" },
  { id: 18, name: "Action", definition: "A choice available to the decision maker at a specific state.", symbols: ["$a \\in A(s)$"], example: "Choosing among 'Do Nothing,' 'Routine Maintenance,' or 'Reconstruction.'", category: "markov" },
  { id: 19, name: "Decision Variable", definition: "A mathematical variable representing a decision in the optimization model.", symbols: ["$x_{s,a}$: fraction or area treated in state $s$ under action $a$"], example: "Area resurfaced in 'Poor' condition.", category: "optimization" },
  { id: 20, name: "Objective Function", definition: "The quantity to be minimized or maximized in an optimization problem.", symbols: ["$\\min \\sum_{t,s,a} c_t(s,a)x_{t,s,a}$"], example: "Minimize discounted total cost of maintenance and user delay.", category: "optimization" },
  { id: 21, name: "Constraint", definition: "A rule that feasible solutions must satisfy in an optimization problem.", symbols: ["$\\sum_a C(s,a)x_{s,a} \\le B$"], example: "Annual maintenance spending ≤ $75,000$.", category: "optimization" },
  { id: 22, name: "Transition Probability", definition: "The probability of moving from one state to another given an action.", symbols: ["$P(s'|s,a)$"], example: "Probability that a Fair road remains Fair after routine maintenance = 0.8.", category: "markov" },
  { id: 23, name: "Reward / Cost Function", definition: "Immediate payoff or expense from taking a specific action in a given state.", symbols: ["$r(s,a)$", "$c(s,a)$"], example: "Routine maintenance costs $10$ per square yard.", category: "markov" },
  { id: 24, name: "Discount Factor", definition: "A coefficient that reduces the weight of future costs or rewards relative to the present.", symbols: ["$\\gamma \\in (0,1)$"], example: "With $\\gamma = 0.97$, $1$ received next year equals $0.97$ today.", category: "markov" },
  { id: 25, name: "Bellman Equation", definition: "The recursive relationship defining the optimal value function.", symbols: ["$V(s) = \\min_a [\\, c(s,a) + \\gamma \\sum P(s'|s,a)V(s') \\,]$"], example: "Used to calculate minimum expected lifetime cost of maintaining a pavement section.", category: "markov" },
  { id: 26, name: "Steady-State Condition", definition: "A state distribution that remains constant over time in a Markov process.", symbols: ["$\\pi = \\pi P$"], example: "Long-run equilibrium: 40% Good, 35% Fair, 25% Poor.", category: "markov" },
  { id: 27, name: "Budget Constraint", definition: "A restriction limiting total resources per period.", symbols: ["$\\sum_i c_i x_i \\le B$"], example: "Total yearly maintenance cost ≤ $75,000$.", category: "optimization" },
  { id: 28, name: "Feasible Region", definition: "The set of all solutions that satisfy every model constraint.", symbols: ["$\\mathcal{F} = \\{x \\mid Ax \\le b, x \\ge 0\\}$"], example: "All allocations meeting budget and nonnegativity conditions.", category: "optimization" },
  { id: 29, name: "State Transition Matrix", definition: "A matrix summarizing probabilities of moving between states for a specific action.", symbols: ["$P_a = [p_{ij}^a]$"], example: "Separate transition matrices for 'Do Nothing' and 'Resurface' actions.", category: "markov" },
  { id: 30, name: "Expected Value", definition: "The probability-weighted average outcome across possible states or events.", symbols: ["$E[X] = \\sum_x x P(x)$"], example: "Expected maintenance cost = $0.7(1000) + 0.3(5000) = 2200$.", category: "markov" },
  { id: 31, name: "Policy", definition: "A rule or mapping that assigns an action to each state.", symbols: ["$\\pi: S \\to A$"], example: "If Good → Do Nothing; Fair → Maintain; Poor → Resurface.", category: "markov" },
  { id: 32, name: "Policy Evaluation", definition: "Computing the total expected value of a given policy.", symbols: ["$V^\\pi(s) = c(s,\\pi(s)) + \\gamma \\sum P(s'|s,\\pi(s))V^\\pi(s')$"], example: "Calculating 50-year expected cost for 'Maintain Fair, Resurface Poor'.", category: "markov" },
  { id: 33, name: "Policy Improvement", definition: "Selecting new actions that yield a lower expected cost based on evaluated policy values.", symbols: ["$\\pi'(s) = \\arg\\min_a [\\, c(s,a) + \\gamma \\sum P(s'|s,a)V^\\pi(s') \\,]$"], example: "Switching from 'Maintain Fair' to 'Do Nothing' if it yields lower long-term cost.", category: "markov" },
  { id: 34, name: "System Optimization (Overall)", definition: "Joint optimization of all facility, temporal, and budgetary decisions.", symbols: ["$\\min \\sum_{s,a} c(s,a)x_{s,a}$ subject to constraints"], example: "Optimizing all city road maintenance actions to minimize total discounted cost.", category: "system" },
  { id: 35, name: "Core Components of Every Optimization Problem", definition: "All optimization problems share four fundamental components defining structure and solvability.", symbols: ["Decision Variables $x_i$", "Parameters $p_i$", "Constraints $g_j(x,p) \\le 0$", "Objective Function $f(x,p)$"], example: "Decision variables: $x_{s,a}$; parameters: costs/probabilities; constraints: cost ≤ $75,000$; objective: minimize total discounted cost.", category: "optimization" }
];

// === RENDERING ===
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

// === TABS ===
document.querySelectorAll(".tab-menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-menu button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category;
    document.querySelectorAll(".card").forEach(card => {
      card.style.display =
        cat === "all" || card.classList.contains(`category-${cat}`) ? "" : "none";
    });
  });
});

// === LAYOUT + PRINT ===
document.getElementById("layout").addEventListener("change", e => {
  document.body.className = "layout-" + e.target.value;
});
document.getElementById("printBtn").addEventListener("click", () => window.print());

// === PRACTICE ===
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

  let bg = "var(--red)";
  if (accuracy > 90) bg = "var(--green)";
  else if (accuracy > 80) bg = "var(--yellow)";
  else if (accuracy > 70) bg = "var(--orange)";
  scoreDisplay.style.background = bg;

  practiceCard.querySelectorAll(".fuzzy").forEach(el => el.classList.remove("fuzzy"));
  if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
});
