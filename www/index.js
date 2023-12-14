import init, { DT } from './pkg/startin_wasm.js';


async function main() {

  await init();

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

  let mydt = DT.new();

  document.getElementById("nov").innerHTML = mydt.number_of_vertices();
  document.getElementById("notr").innerHTML = mydt.number_of_triangles();


  const refreshcanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pts = mydt.all_vertices();
    //-- draw DT
    if (document.getElementById("cbdelaunay").checked == true) {
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
    }
    //-- draw VD
    if (document.getElementById("cbvoronoi").checked == true) {
      ctx.strokeStyle = "#f87826";
      const voroedges = mydt.all_voronoi_edges();
      // console.log(voroedges);
      for (let i = 0; i < voroedges.length; i += 4) {
        ctx.beginPath();
        ctx.moveTo(voroedges[i], voroedges[i+1]);
        ctx.lineTo(voroedges[i+2], voroedges[i+3]);
        ctx.closePath();
        ctx.stroke();    
      }  
    }
    //-- draw points
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
    var b = document.getElementById("rbinsert");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (b.checked == true) {
      mydt.insert_one_pt(x, y, 0.0);
      console.log('i: (' + x + ', ' + y +')');
    }
    else {
      if (mydt.number_of_triangles() >= 1) {
        const nv = mydt.closest_point(x, y);
        // if (nv == 0) {
        //   console.log('r: OUTSIDE' );
        // }
        if ((nv != 0) && (mydt.number_of_vertices() >= 4)) {
          // console.log(nv);
          // console.log('r: ' + nv);
          mydt.remove(nv);
        } 
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
    mydt = DT.new();

    refreshcanvas();
  });

  document.getElementById("cbdelaunay").addEventListener("click", function(){
    refreshcanvas();
  });
  document.getElementById("cbvoronoi").addEventListener("click", function(){
    refreshcanvas();
  });

}

main();