// import the 35-concept array (same content from your compiled list)
const concepts = [
  {
    id: 1,
    name: "Knapsack Problem",
    definition: "Choose a subset of items to maximize total benefit while staying within a resource limit.",
    symbols: ["i = 1,…,n", "v_i: benefit or value", "w_i: cost or weight", "W: total capacity or budget", "x_i ∈ {0,1}: decision variable"],
    example: "Selecting which pavement segments to repave within a $75,000 budget to maximize total user satisfaction."
  },
  {
    id: 2,
    name: "Dynamic Programming (DP)",
    definition: "A recursive optimization method dividing a multi-stage decision problem into smaller subproblems, using the principle of optimality.",
    symbols: ["V_t(s) = min_a [ c_t(s,a) + Σ_{s'} P_t(s'|s,a)V_{t+1}(s') ]", "s: state", "a: action", "t: stage index"],
    example: "Finding the minimum total maintenance cost over 10 years by solving backward from the final year."
  },
  {
    id: 3,
    name: "Reinforcement Learning (RL)",
    definition: "A learning-based approach that estimates optimal policies through repeated trial-and-error interaction with an environment.",
    symbols: ["Q(s,a) ← Q(s,a) + α [ r + γ max_{a'} Q(s',a') − Q(s,a) ]", "α: learning rate", "γ: discount factor"],
    example: "Training an algorithm to learn optimal pavement treatment decisions through simulated experience rather than known probabilities."
  },
  {
    id: 4,
    name: "Bottom-Up Modeling",
    definition: "Start from modeling individual components and aggregate results to understand overall system performance.",
    symbols: ["F = Σ_i f_i", "f_i: component performance metric"],
    example: "Simulating deterioration of each bridge and aggregating their expected maintenance costs to assess the total network cost."
  },
  {
    id: 5,
    name: "Top-Down Modeling",
    definition: "Start from system-level targets or policies and allocate resources downward to meet them.",
    symbols: ["Σ_i x_i ≤ B", "x_i: allocation", "B: total budget"],
    example: "Allocating maintenance budgets to districts to meet a target average pavement condition index ≥ 80."
  },
  {
    id: 6,
    name: "Markov Chain",
    definition: "A stochastic process where the future state depends only on the current state, not on prior history.",
    symbols: ["P = [p_{ij}]: transition probability matrix", "π_{t+1} = π_t P"],
    example: "Modeling road deterioration between Good, Fair, and Poor conditions using transition probabilities."
  },
  {
    id: 7,
    name: "Markov Decision Process (MDP)",
    definition: "An extension of the Markov chain that includes decision-making—actions influence both costs and transition probabilities.",
    symbols: ["V(s) = min_a [ c(s,a) + γ Σ_{s'} P(s'|s,a)V(s') ]"],
    example: "Choosing between 'Do Nothing,' 'Maintain,' or 'Resurface' each year for pavements based on condition and cost."
  },
  {
    id: 8,
    name: "Facility-Level Model",
    definition: "An optimization model applied to a single asset, ignoring system interactions.",
    symbols: ["s_t: facility state at time t", "a_t: treatment action"],
    example: "Determining optimal rehabilitation timing for a single bridge deck over 50 years."
  },
  {
    id: 9,
    name: "System-Level Model",
    definition: "A network-level optimization that coordinates decisions across multiple facilities under shared constraints.",
    symbols: ["Σ_i C_i(x_i) ≤ B", "C_i(x_i): cost for facility i", "B: total budget"],
    example: "Allocating annual budgets across city roads to minimize total user and agency costs."
  },
  {
    id: 10,
    name: "Finite-Horizon Problem",
    definition: "Optimization over a fixed number of decision stages, ending with a terminal value or salvage state.",
    symbols: ["t = 0,…,T", "V_{T+1}(s): terminal value"],
    example: "A 20-year pavement management plan ending with a residual value at year 20."
  },
  {
    id: 11,
    name: "Infinite-Horizon Problem",
    definition: "Optimization with no fixed endpoint, typically using discounting or steady-state assumptions.",
    symbols: ["V(s) = min_a [ c(s,a) + γ Σ_{s'} P(s'|s,a)V(s') ]"],
    example: "Steady-state maintenance policy for a city-wide road network assumed to operate indefinitely."
  },
  {
    id: 12,
    name: "Backward Induction",
    definition: "A specific dynamic programming technique for finite-horizon problems, solving from the last stage backward to the first.",
    symbols: ["V_T(s) = terminal cost", "V_t(s) = min_a [ c_t(s,a) + Σ P(s'|s,a)V_{t+1}(s') ]"],
    example: "Computing optimal treatments year-by-year from year 5 back to year 1 in a finite-horizon maintenance model."
  },
  {
    id: 13,
    name: "Value Iteration",
    definition: "Iterative Bellman updates of the value function until convergence, used for infinite-horizon MDPs.",
    symbols: ["V_{k+1}(s) = min_a [ c(s,a) + γ Σ P(s'|s,a)V_k(s') ]"],
    example: "Running iterative updates on pavement condition values until change < $1."
  },
  {
    id: 14,
    name: "Policy Iteration",
    definition: "Algorithm that alternates between evaluating a policy’s value and improving it until convergence.",
    symbols: ["V^π(s) = c(s,π(s)) + γ Σ P(s'|s,π(s))V^π(s')", "π'(s) = argmin_a [ c(s,a) + γ Σ P(s'|s,a)V^π(s') ]"],
    example: "Start with 'Do Nothing' policy, evaluate cost, then switch to cheaper actions until stable."
  },
  {
    id: 15,
    name: "Linear Programming Formulation (of MDP)",
    definition: "Solving MDPs as linear programs using Bellman inequalities and value variables.",
    symbols: ["Maximize Σ V(s)", "Subject to V(s) ≤ c(s,a) + γ Σ P(s'|s,a)V(s') ∀ s,a"],
    example: "Using Pyomo to find optimal values and policies for a 3-state pavement system."
  },
  {
    id: 16,
    name: "Stage",
    definition: "A discrete time or decision point in a sequential optimization model.",
    symbols: ["t = 0,1,…,T"],
    example: "Each year in a 20-year pavement management horizon."
  },
  {
    id: 17,
    name: "State",
    definition: "A description of the system’s condition at a given stage.",
    symbols: ["s ∈ S: set of states"],
    example: "Pavement condition: Good, Fair, or Poor."
  },
  {
    id: 18,
    name: "Action",
    definition: "A choice available to the decision maker at a specific state.",
    symbols: ["a ∈ A(s)"],
    example: "Choosing among 'Do Nothing,' 'Routine Maintenance,' or 'Reconstruction.'"
  },
  {
    id: 19,
    name: "Decision Variable",
    definition: "A mathematical variable representing a decision in the optimization model.",
    symbols: ["x_{s,a}: fraction or area treated in state s under action a"],
    example: "Area (sq yd) resurfaced in 'Poor' condition."
  },
  {
    id: 20,
    name: "Objective Function",
    definition: "The quantity to be minimized or maximized in an optimization problem.",
    symbols: ["Minimize Σ_{t,s,a} c_t(s,a)x_{t,s,a}"],
    example: "Minimize discounted total cost of maintenance and user delay."
  },
  {
    id: 21,
    name: "Constraint",
    definition: "A rule that feasible solutions must satisfy in an optimization problem.",
    symbols: ["Σ_a C(s,a)x_{s,a} ≤ B"],
    example: "Annual maintenance spending ≤ $75,000."
  },
  {
    id: 22,
    name: "Transition Probability",
    definition: "The probability of moving from one state to another given an action.",
    symbols: ["P(s'|s,a): transition probability"],
    example: "Probability that a Fair road remains Fair after routine maintenance = 0.8."
  },
  {
    id: 23,
    name: "Reward / Cost Function",
    definition: "Immediate payoff or expense from taking a specific action in a given state.",
    symbols: ["r(s,a): reward", "c(s,a): cost"],
    example: "Routine maintenance costs $10 per square yard."
  },
  {
    id: 24,
    name: "Discount Factor",
    definition: "A coefficient that reduces the weight of future costs or rewards relative to the present.",
    symbols: ["γ ∈ (0,1)"],
    example: "With γ = 0.97, $1 received next year equals $0.97 today."
  },
  {
    id: 25,
    name: "Bellman Equation",
    definition: "The recursive relationship defining the optimal value function based on immediate and future costs.",
    symbols: ["V(s) = min_a [ c(s,a) + γ Σ P(s'|s,a)V(s') ]"],
    example: "Used to calculate minimum expected lifetime cost of maintaining a pavement section."
  },
  {
    id: 26,
    name: "Steady-State Condition",
    definition: "A state distribution that remains constant over time in a Markov process.",
    symbols: ["π = πP"],
    example: "Long-run equilibrium: 40% Good, 35% Fair, 25% Poor."
  },
  {
    id: 27,
    name: "Budget Constraint",
    definition: "A restriction limiting the total amount of resources or cost per period.",
    symbols: ["Σ_i c_i x_i ≤ B"],
    example: "Total yearly maintenance cost ≤ $75,000."
  },
  {
    id: 28,
    name: "Feasible Region",
    definition: "The set of all solutions that satisfy every model constraint.",
    symbols: ["𝔽 = {x | Ax ≤ b, x ≥ 0}"],
    example: "All possible allocations of funds that meet the budget and nonnegativity conditions."
  },
  {
    id: 29,
    name: "State Transition Matrix",
    definition: "A matrix summarizing probabilities of moving between states for a specific action.",
    symbols: ["P_a = [p_{ij}^a]"],
    example: "Separate transition matrices for 'Do Nothing' and 'Resurface' actions."
  },
  {
    id: 30,
    name: "Expected Value",
    definition: "The probability-weighted average outcome across possible states or events.",
    symbols: ["E[X] = Σ_x x P(x)"],
    example: "Expected maintenance cost = 0.7(1000) + 0.3(5000) = $2,200."
  },
  {
    id: 31,
    name: "Policy",
    definition: "A rule or mapping that assigns an action to each state.",
    symbols: ["π: S → A"],
    example: "If Good → Do Nothing; Fair → Maintain; Poor → Resurface."
  },
  {
    id: 32,
    name: "Policy Evaluation",
    definition: "The process of computing the total expected value of a given policy.",
    symbols: ["V^π(s) = c(s,π(s)) + γ Σ P(s'|s,π(s))V^π(s')"],
    example: "Calculating 50-year expected cost if 'Maintain Fair, Resurface Poor' policy is followed."
  },
  {
    id: 33,
    name: "Policy Improvement",
    definition: "Selecting new actions that yield a lower expected cost based on the evaluated policy values.",
    symbols: ["π'(s) = argmin_a [ c(s,a) + γ Σ P(s'|s,a)V^π(s') ]"],
    example: "Switching from 'Maintain Fair' to 'Do Nothing' if it yields lower long-term cost."
  },
  {
    id: 34,
    name: "System Optimization (Overall)",
    definition: "Joint optimization of all facility, temporal, and budgetary decisions to minimize total cost or maximize performance.",
    symbols: ["Minimize Σ_{s,a} c(s,a)x_{s,a} subject to constraints"],
    example: "Optimizing all city road maintenance actions to minimize total discounted cost over time."
  },
  {
    id: 35,
    name: "Core Components of Every Optimization Problem",
    definition: "All optimization problems share four fundamental components that define their structure and solvability.",
    symbols: [
      "Decision Variables (x_i): unknowns to determine",
      "Parameters (p_i): fixed inputs such as costs, probabilities, capacities",
      "Constraints (g_j(x,p) ≤ 0): rules limiting feasible solutions",
      "Objective Function (f(x,p)): quantity to minimize or maximize"
    ],
    example: "In a pavement optimization model: decision variables are treated areas (x_{s,a}); parameters include costs and transition probabilities; constraints ensure total cost ≤ $75,000; and the objective function minimizes total discounted agency + user cost."
  }
];

const container = document.getElementById("card-container");

concepts.forEach(c=>{
  const card = document.createElement("div");
  card.className="card";
  card.innerHTML = `
    <h2>${c.id}. ${c.name}</h2>
    <div class="card-content">
      <p><strong>Definition:</strong> ${c.definition}</p>
      <p><strong>Symbols:</strong></p>
      <ul>${c.symbols.map(s=>`<li>${s}</li>`).join("")}</ul>
      <p><strong>Example:</strong> ${c.example}</p>
    </div>`;
  card.addEventListener("click",()=>card.classList.toggle("open"));
  container.appendChild(card);
});

// layout + print handlers
const layoutSelect=document.getElementById("layout");
layoutSelect.addEventListener("change",()=> {
  document.body.className="layout-"+layoutSelect.value;
});
document.getElementById("printBtn").addEventListener("click",()=>window.print());
