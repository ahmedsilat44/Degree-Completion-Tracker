/* rows: [rowLabelTitle, rowLabelTerm, cells[5]]  cell = null for empty, or {n, credit, lab, cls, khidmat:false} */
const rows = [
 ["Semester 1","Fall 2023",[
   {n:"Rhetoric and Communication", credit:"4", lab:"0", cls:"c-core-orange"},
   {n:"Calculus I", credit:"3", lab:"0", cls:"c-gray"},
   {n:"Natural Science", credit:"3", lab:"1", cls:"c-natsci"},
   {n:"Algorithmic Problem Solving", credit:"3", lab:"1", cls:"c-blue"},
   {n:"Design your Habib Experience", credit:"0", lab:"1", cls:"c-purpledeep"},
 ]],
 ["Semester 2","Spring 2024",[
   {n:"What is Modernity?", credit:"4", lab:"0", cls:"c-core-orange"},
   {n:"Calculus II", credit:"3", lab:"0", cls:"c-gray"},
   {n:"Natural Science", credit:"3", lab:"0/1", cls:"c-natsci"},
   {n:"Discrete Mathematics", credit:"3", lab:"0", cls:"c-blue"},
   {n:"Data Structures and Algorithms", credit:"3", lab:"1", cls:"c-blue"},
 ]],
 ["Semester 3","Fall 2024",[
   {n:"Pakistan and Modern South Asia", credit:"4", lab:"0", cls:"c-core-orange"},
   {n:"Engineering Mathematics", credit:"3", lab:"0", cls:"c-gray"},
   {n:"Digital Logic and Design", credit:"3", lab:"1", cls:"c-purpledeep"},
   {n:"Database Systems", credit:"3", lab:"1", cls:"c-purple"},
   {n:"Object-Oriented Programming and Design Methodologies", credit:"3", lab:"1", cls:"c-purple"},
 ]],
 ["Semester 4","Spring 2025",[
   {n:"Hikma I", credit:"4", lab:"0", cls:"c-core-orange"},
   {n:"Linear Algebra", credit:"3", lab:"0", cls:"c-gray"},
   {n:"Probability and Statistics", credit:"3", lab:"0", cls:"c-green"},
   {n:"Data Structures II", credit:"3", lab:"0", cls:"c-purple"},
   {n:"CS Systems Requirement*", credit:"3", lab:"1", cls:"c-purple"},
 ]],
 ["Summer","Semester 2", null, true],
 ["Semester 5","Fall 2025",[
   {n:"Scientific Methods", credit:"3", lab:"0", cls:"c-core-orange"},
   {n:"Artificial Intelligence", credit:"3", lab:"0", cls:"c-purple"},
   {n:"Nature of Computation", credit:"3", lab:"0", cls:"c-purple"},
   {n:"Operating Systems", credit:"3", lab:"1", cls:"c-purple"},
   {n:"CS Elective (1 of 5)", credit:"3", lab:"0/1", cls:"c-purpledeep"},
 ]],
 ["Semester 6","Spring 2026",[
   {n:"Philosophy Elective", credit:"3/4", lab:"0", cls:"c-core-orange"},
   {n:"Jehan-e-Urdu", credit:"4", lab:"0", cls:"c-core-orange"},
   {n:"Algorithms: Design and Analysis", credit:"3", lab:"0", cls:"c-purple"},
   {n:"Software Engineering", credit:"3", lab:"0", cls:"c-yellow"},
   {n:"CS Elective (2 of 5)", credit:"3", lab:"0/1", cls:"c-purpledeep"},
 ]],
 ["Semester 7","Fall 2026",[
   {n:"Professional Practices", credit:"3", lab:"0", cls:"c-gray"},
   {n:"Free Elective*", credit:"3", lab:"0/1", cls:"c-gray"},
   {n:"Free Elective*", credit:"3", lab:"0/1", cls:"c-gray"},
   {n:"Kaavish I", credit:"0", lab:"3", cls:"c-purpledeep"},
   {n:"CS Elective (3 of 5)", credit:"3", lab:"0/1", cls:"c-purpledeep"},
 ]],
 ["Semester 8","Spring 2027",[
   null,
   {n:"Free Elective*", credit:"3", lab:"0/1", cls:"c-gray"},
   {n:"Free Elective*", credit:"3", lab:"0/1", cls:"c-gray"},
   {n:"Kaavish II", credit:"0", lab:"3", cls:"c-purpledeep"},
   {n:"CS Elective (5 of 5)", credit:"3", lab:"0/1", cls:"c-purpledeep"},
 ]],
];
// Note: Semester 7 has "CS Elective (4 of 5)" too — add as 6th col via wide row handling below
rows[7][2].push({n:"CS Elective (4 of 5)", credit:"3", lab:"0/1", cls:"c-purpledeep"});

const maingrid = document.getElementById("maingrid");
let idCounter = 0;

rows.forEach(r => {
  const [title, term, cells, isKhidmat] = r;

  if(isKhidmat){
    const row = document.createElement("div");
    row.className = "row khidmat-row";
    const id = "c" + (idCounter++);
    row.innerHTML = `
      <div class="row-label">${title}<span class="term">${term}</span></div>
      <div class="khidmat-bar" data-key="${id}">
        <input type="checkbox" id="${id}">
        <label for="${id}" style="cursor:pointer;">Khidmat (Field Practice) — non-credit component</label>
      </div>`;
    maingrid.appendChild(row);
    return;
  }

  const row = document.createElement("div");
  row.className = "row";
  // adjust template columns if 6 cells (semester 7)
  if(cells.length === 6){
    row.style.gridTemplateColumns = "120px repeat(6,1fr)";
  }
  const label = document.createElement("div");
  label.className = "row-label";
  label.innerHTML = `${title}<span class="term">${term}</span>`;
  row.appendChild(label);

  cells.forEach(c => {
    if(!c){
      const empty = document.createElement("div");
      empty.className = "box empty";
      row.appendChild(empty);
      return;
    }
    const id = "c" + (idCounter++);
    const box = document.createElement("div");
    box.className = "box " + c.cls;
    box.dataset.key = id;
    box.innerHTML = `
      <div class="bname">${c.n}</div>
      <div class="box-bottom">
        <span class="credit-tag">${c.credit}-${c.lab}</span>
        <input type="checkbox" id="${id}">
      </div>`;
    row.appendChild(box);
  });

  maingrid.appendChild(row);
});

/* ---------- Cookie helpers (for GitHub Pages / static hosting persistence) ---------- */
const COOKIE_NAME = "cs2027_checklist_state";
const COOKIE_DAYS = 3650; // ~10 years

function setCookie(name, value, days){
  const d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function getCookie(name){
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
function loadState(){
  const raw = getCookie(COOKIE_NAME);
  if(!raw) return {};
  try{ return JSON.parse(raw); } catch(e){ return {}; }
}
function saveState(state){
  setCookie(COOKIE_NAME, JSON.stringify(state), COOKIE_DAYS);
}

let checklistState = loadState();

function updateProgress(){
  const boxes = document.querySelectorAll('input[type="checkbox"]');
  const total = boxes.length;
  let checked = 0;
  boxes.forEach(b => { if(b.checked) checked++; });
  document.getElementById("barInner").style.width = (total? (checked/total*100):0) + "%";
  document.getElementById("progressLabel").textContent = `${checked} of ${total} requirements checked`;
}

function applyStateToDOM(){
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    const key = cb.id;
    const isChecked = !!checklistState[key];
    cb.checked = isChecked;
    const container = cb.closest(".box") || cb.closest(".khidmat-bar");
    if(container) container.classList.toggle("checked", isChecked);
  });
  updateProgress();
}

maingrid.addEventListener("click", e => {
  const box = e.target.closest(".box:not(.empty)");
  const khidmat = e.target.closest(".khidmat-bar");
  const target = box || khidmat;
  if(!target) return;

  // if the click was directly on the checkbox, let default behavior handle it, then sync
  const checkbox = target.querySelector('input[type="checkbox"]');
  if(e.target !== checkbox){
    checkbox.checked = !checkbox.checked;
  }
  target.classList.toggle("checked", checkbox.checked);

  checklistState[checkbox.id] = checkbox.checked;
  saveState(checklistState);
  updateProgress();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  document.querySelectorAll('input[type="checkbox"]').forEach(b => b.checked = false);
  document.querySelectorAll(".box, .khidmat-bar").forEach(c => c.classList.remove("checked"));
  checklistState = {};
  saveState(checklistState);
  updateProgress();
});

applyStateToDOM();
