import * as wasm from "startin-wasm";

let canvas = document.getElementById("canv");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("onresize", (event) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


let ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let mydt = wasm.DT.new();

document.getElementById("nov").innerHTML = mydt.number_of_vertices();
document.getElementById("notr").innerHTML = mydt.number_of_triangles();


const refreshcanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const pts = mydt.all_vertices();
  const edges = mydt.all_edges();

  ctx.strokeStyle = "#6BCC60";
  ctx.lineWidth = 1;
  for (let i = 0; i < edges.length; i += 2) {
    let a = edges[i];
    let b = edges[i + 1];

    ctx.beginPath();
    ctx.moveTo(pts[2 * a], pts[2 * a + 1]);
    ctx.lineTo(pts[2 * b], pts[2 * b + 1]);
    ctx.closePath();
    ctx.stroke();    
  }  

  ctx.fillStyle = "#666";
  for (let i = 0; i < pts.length; i += 2) {
    ctx.beginPath();
    ctx.arc(pts[i], pts[i + 1], 2, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  document.getElementById("nov").innerHTML = mydt.number_of_vertices();
  document.getElementById("notr").innerHTML = mydt.number_of_triangles();

};

const leftclick = (event) => {
  var b = document.getElementById("bDelete");
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (b.checked == false) {
    mydt.insert_one_pt(x, y, 0.0);
  }
  else {
    const nv = mydt.closest_point(x, y);
    if ((nv != 0) && (mydt.number_of_vertices() >= 4)) {
      // console.log(nv);
      mydt.remove(nv);
    } 
  }
  refreshcanvas();
};

canvas.addEventListener('click', leftclick);

document.getElementById("btnRandom").addEventListener("click", function(){
  var num = document.getElementById("noRandom").value;
  // console.log(num);
  for (let i = 0; i < num; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    mydt.insert_one_pt(x, y, 0.0);
  }
  refreshcanvas();
});

document.getElementById("btnClear").addEventListener("click", function(){
  mydt = wasm.DT.new();

  refreshcanvas();
});
