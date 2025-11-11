// import the 35-concept array (same content from your compiled list)
const concepts = [
  {id:1, name:"Knapsack Problem", definition:"Choose items to maximize total benefit within a resource limit.",
   symbols:["i=1,…,n","v_i: value","w_i: cost","W: capacity","x_i∈{0,1}"],
   example:"Selecting which road segments to repave within a $75 000 budget."},
  // ... all 34 others + the 35th core-components entry
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
