// ===== Edit your data here =====
const skillGroups = {
  "BI and visualization": ["Power BI", "DAX", "Power Query", "Advanced Excel", "Dashboard development", "Data visualization"],
  "Databases and query": ["SQL", "MySQL", "PostgreSQL", "MS SQL Server"],
  "Programming": ["Python", "Pandas", "NumPy", "Machine learning basics"],
  "Business systems": ["SAP Business One"],
  "Analysis and reporting": ["MIS reporting", "KPI tracking", "Variance analysis", "Profitability analysis", "Trend analysis", "Forecasting support"]
};

// Replace each link with the exact repository URL
const projects = [
  { featured: true, title: "Zomato Performance Dashboard", desc: "An interactive Power BI dashboard on Zomato sales and business performance. It shows sales, ratings and user activity across cities and customer segments, using DAX measures and interactive visuals.", tags: "Power BI, DAX", link: "https://github.com/vikas98SSS" },
  { title: "Pizza Hut Sales Analysis", desc: "Answers 12 business questions on pizza sales data in PostgreSQL using joins, subqueries and built-in functions. It covers total orders and revenue, top 5 pizza types, orders by hour, category sales and cumulative revenue. A PDF presentation of the findings is in the repository.", tags: "SQL, PostgreSQL", link: "https://github.com/vikas98SSS/pizzahut_sales--sql" },
  { title: "Sales Report Automation", desc: "Filters sales data by salesman in Google Sheets, creates a separate sheet for each salesman and emails it automatically. This removes the manual filtering and sending.", tags: "Google Sheets, Apps Script", link: "https://github.com/vikas98SSS" },
  { title: "Retail Sales Case Study", desc: "A retail sales case study done in a Jupyter Notebook using Python and Pandas. The full analysis is available on GitHub.", tags: "Python, Pandas, Jupyter Notebook", link: "https://github.com/vikas98SSS/Retail-Sales-Pandas-Case-Study/blob/main/Retail%20sales%20case%20study.ipynb" },
  { featured: true, title: "Amazon Sales Analysis Dashboard", desc: "An interactive Power BI dashboard to track overall sales, product performance and order status. It shows sales by city and state, a monthly sales trend, a product gallery and product details such as sale amount, units sold, returns and reviews, with filters and date range selectors.", tags: "Power BI, DAX", link: "https://github.com/vikas98SSS/Amazon_sales_analysis_dashboard",
    preview: "https://github.com/vikas98SSS/Amazon_sales_analysis_dashboard/raw/main/Capture1.PNG" },
  { featured: true, title: "Library Management System", desc: "A library database built with SQL. It includes tables for branches, employees, members, books, issued and returned books, CRUD operations, CTAS tables and 20 tasks with advanced queries, such as overdue books and fines, branch performance reports and stored procedures.", tags: "SQL, PostgreSQL", link: "https://github.com/vikas98SSS/Library_Management_project",
    preview: "https://github.com/vikas98SSS/Library_Management_project/raw/main/Library_database%20ERD%20Model.png" }
];
// ===============================

const skillsBox = document.getElementById("skills");
if (skillsBox) skillsBox.innerHTML = Object.entries(skillGroups).map(([name, items]) => `
  <div class="skillgroup">
    <h3>${name}</h3>
    <ul class="skills">${items.map(s => `<li>${s}</li>`).join("")}</ul>
  </div>`).join("");

function card(p){
  return `
  <article class="card">
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <span class="tags">${p.tags}</span>
    <div class="preview-wrap">
      <a class="repo-link" href="${p.link}" target="_blank" rel="noopener">View on GitHub</a>
      ${p.preview ? `<div class="preview" aria-hidden="true"><img src="${p.preview}" alt="Preview of ${p.title}" loading="lazy"></div>` : ""}
    </div>
  </article>`;
}
function fill(id, list){
  const box = document.getElementById(id);
  if (!box) return;
  box.innerHTML = list.map(card).join("");
  // If a preview image fails to load, remove it so no broken image shows
  box.querySelectorAll(".preview img").forEach(img =>
    img.addEventListener("error", () => img.closest(".preview").remove()));
}
fill("projectGrid", projects);
fill("featuredGrid", projects.filter(p => p.featured));

document.getElementById("year").textContent = new Date().getFullYear();

// Theme (the right side is dark by default)
const root = document.documentElement;
const btn = document.getElementById("themeBtn");
function setTheme(t){
  root.dataset.theme = t;
  btn.innerHTML = t === "dark" ? "&#9790;" : "&#9728;";
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");
btn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

// Photo: looks for my-photo.jpg / .jpeg / .png / .webp in this folder
(function(){
  const exts = ["jpg", "jpeg", "png", "webp"];
  (function tryNext(i){
    if (i >= exts.length) return;
    const t = new Image();
    t.onload = () => document.querySelectorAll(".photo-frame").forEach(f => {
      const img = f.querySelector(".photo");
      img.src = t.src; img.hidden = false;
      f.querySelector(".initials").hidden = true;
    });
    t.onerror = () => tryNext(i + 1);
    t.src = "my-photo." + exts[i];
  })(0);
})();

// Orange light that follows the mouse pointer (right side only)
(function(){
  const stage = document.querySelector(".stage");
  if (!stage) return;
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.setAttribute("aria-hidden", "true");
  stage.appendChild(glow);

  let tx = 0, ty = 0, x = 0, y = 0, cx = 0, cy = 0, running = false;

  function target(){
    const r = stage.getBoundingClientRect();
    tx = cx - r.left; ty = cy - r.top;
  }
  function loop(){
    x += (tx - x) * 0.14;
    y += (ty - y) * 0.14;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) requestAnimationFrame(loop);
    else running = false;
  }
  function kick(){ if (!running){ running = true; requestAnimationFrame(loop); } }

  stage.addEventListener("mousemove", e => {
    cx = e.clientX; cy = e.clientY;
    if (!glow.classList.contains("on")){ target(); x = tx; y = ty; glow.classList.add("on"); }
    target(); kick();
  });
  stage.addEventListener("mouseleave", () => glow.classList.remove("on"));
  window.addEventListener("scroll", () => { if (glow.classList.contains("on")){ target(); kick(); } }, { passive: true });
})();

// Sections fade in while scrolling
(function(){
  const items = document.querySelectorAll(".reveal");
  if (!items.length || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("js-reveal");
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.08 });
  items.forEach(el => io.observe(el));
})();

// Interactive demo dashboard (sample data)
(function(){
  const box = document.getElementById("demo");
  if (!box) return;
  const regions = ["North", "South", "East", "West"];
  const cats = ["Electronics", "Grocery", "Fashion", "Home"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function rng(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const rand = rng(42);
  const data = [];
  regions.forEach((r, ri) => cats.forEach((c, ci) => months.forEach((m, mi) => {
    const season = 1 + 0.35 * Math.sin((mi - 2) / 12 * 2 * Math.PI) + (mi > 8 ? 0.25 : 0);
    const sales = Math.round((60 + rand() * 90 + ci * 15 + ri * 8) * season) * 1000;
    const orders = Math.round(sales / (700 + rand() * 500));
    data.push({ r, c, mi, sales, orders });
  })));
  const rs = document.getElementById("fRegion"), cs = document.getElementById("fCat");
  rs.innerHTML = ["All regions", ...regions].map(x => `<option>${x}</option>`).join("");
  cs.innerHTML = ["All categories", ...cats].map(x => `<option>${x}</option>`).join("");
  const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
  function render(){
    const r = rs.selectedIndex ? regions[rs.selectedIndex - 1] : null;
    const c = cs.selectedIndex ? cats[cs.selectedIndex - 1] : null;
    const rows = data.filter(d => (!r || d.r === r) && (!c || d.c === c));
    const sales = rows.reduce((s, d) => s + d.sales, 0);
    const orders = rows.reduce((s, d) => s + d.orders, 0);
    const byM = months.map((_, i) => rows.filter(d => d.mi === i).reduce((s, d) => s + d.sales, 0));
    const best = byM.indexOf(Math.max(...byM));
    document.getElementById("kpis").innerHTML = [
      ["Total sales", inr(sales)], ["Orders", orders.toLocaleString("en-IN")],
      ["Average order value", inr(sales / orders)], ["Best month", months[best]]
    ].map(k => `<div><span>${k[0]}</span><strong>${k[1]}</strong></div>`).join("");
    const mx = Math.max(...byM);
    document.getElementById("chart").innerHTML = byM.map((v, i) =>
      `<div class="bar${i === best ? " top" : ""}" title="${months[i]}: ${inr(v)}"><i style="height:${Math.max(4, v / mx * 100)}%"></i><small>${months[i]}</small></div>`).join("");
    const byC = cats.map(k => ({ k, v: rows.filter(d => d.c === k).reduce((s, d) => s + d.sales, 0) }));
    const mc = Math.max(...byC.map(x => x.v), 1);
    document.getElementById("breakdown").innerHTML = byC.map(x =>
      `<div class="hrow"><span>${x.k}</span><div><i style="width:${x.v / mc * 100}%"></i></div><b>${x.v ? inr(x.v) : "-"}</b></div>`).join("");
  }
  rs.addEventListener("change", render); cs.addEventListener("change", render);
  document.getElementById("fReset").addEventListener("click", () => { rs.selectedIndex = 0; cs.selectedIndex = 0; render(); });
  render();
})();
