let Torus = [];
let SNormal = [];

const R2 = 100;
const R1 = 50;
const i = new Array();
const j = new Array();
const k = new Array();
const Nj = new Array();
const Ni = new Array();
const Nk = new Array();
const c1 = 20;
const c2 = 40;
let a = Math.PI / 4;
const speed = 100;
const init_delay = 1000;

function recalc() {
  Torus = [];
  SNormal = [];
  for (let x = 0; x < c2; x++) {
    for (let y = 0; y < c1; y++) {
      //solid of revolution

      //revolve plus rotate at x axis
      i[x * c2 + y] =
        (R2 + R1 * Math.cos(((2 * Math.PI) / c1) * y)) *
        Math.cos(((2 * Math.PI) / c2) * x);
      j[x * c2 + y] =
        R1 * Math.sin(((2 * Math.PI) / c1) * y) * -Math.cos(a) +
        -(R2 + R1 * Math.cos(((2 * Math.PI) / c1) * y)) *
          Math.sin(((2 * Math.PI) / c2) * x) *
          -Math.sin(a);

      k[x * c2 + y] =
        R1 * Math.sin(((2 * Math.PI) / c1) * y) * -Math.cos(a) * Math.sin(a) +
        -(R2 + R1 * Math.cos(((2 * Math.PI) / c1) * y)) *
          Math.sin(((2 * Math.PI) / c2) * x) *
          Math.cos(a);

      Torus.push([i[x * c2 + y], j[x * c2 + y], k[x * c2 + y]]);
    }
  }

  for (let x = 0; x < c2; x++) {
    Ni[c2] = R2 * Math.cos(((2 * Math.PI) / c2) * x);
    Nj[c2] = -R2 * Math.sin(((2 * Math.PI) / c2) * x) * Math.sin(a);
    Nk[c2] = R2 * Math.cos(((2 * Math.PI) / c2) * x) * Math.sin(a);

    SNormal.push([Ni[c2], Nj[c2], Nk[c2]]);
  }
}
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("DOMContentLoaded", () => {
  recalc();
  render();
  setTimeout(() => {
    setInterval(() => {
      recalc();
      render();
      a += 0.1;
    }, speed);
  }, init_delay);
});

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Torus.forEach((coord, i) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    const l = luminance(coord[0], coord[1], coord[2], i);

    if (l > 0) {
      ctx.fillText("@", coord[0] + 300, coord[1] + 300);
    } else {
      ctx.fillText(".", coord[0] + 300, coord[1] + 300);
    }
  });
};

function luminance(coordx, coordy, coordz, index) {
  //direction of light dot product with Surface normal
  //[0, 1, -1]
  //console.log([SNormal[Math.floor(index / c1)][1], coordy]);
  return (
    0 * coordx +
    1 * (SNormal[Math.floor(index / c1)][1] - coordy) +
    -1 * (SNormal[Math.floor(index / c1)][2] - coordz)
  );
}
