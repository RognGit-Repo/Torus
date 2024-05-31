let Torus = [];

const R2 = 100;
const R1 = 50;
const i = new Array();
const j = new Array();
const k = new Array();
const c1 = 20;
const c2 = 40;
let a = Math.PI / 4;

function recalc() {
  Torus = [];
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

      Torus.push([i[x * c2 + y], j[x * c2 + y]]);
    }
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
    }, 100);
  }, 1000);
});

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Torus.forEach((coord) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("@", coord[0] + 300, coord[1] + 300);
  });
};

function luminance(coordx, coordy) {}
