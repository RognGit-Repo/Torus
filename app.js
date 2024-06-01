let Torus = [];
let SNormal = [];

const R2 = 150;
const R1 = 75;
const i = new Array();
const j = new Array();
const k = new Array();
const Nj = new Array();
const Ni = new Array();
const Nk = new Array();
const c1 = 24;
const c2 = 60;
let a = Math.PI / 4;
let b = Math.PI / 4;
const speed = 100;
const init_delay = 1000;

function recalc() {
  Torus = [];
  SNormal = [];
  for (let x = 0; x < c2; x++) {
    for (let y = 0; y < c1; y++) {
      //solid of revolution

      let X = ((2 * Math.PI) / c2) * x;
      let Y = ((2 * Math.PI) / c1) * y;

      i[x * c2 + y] =
        Math.cos(b) * Math.cos(X) * (R2 + R1 * Math.cos(Y)) -
        Math.sin(b) *
          (R1 * Math.cos(a) * Math.sin(Y) -
            Math.sin(a) * Math.sin(X) * (R2 + R1 * Math.cos(Y)));
      j[x * c2 + y] =
        Math.sin(b) * Math.cos(X) * (R2 + R1 * Math.cos(Y)) +
        Math.cos(b) *
          (R1 * Math.cos(a) * Math.sin(Y) -
            Math.sin(a) * Math.sin(X) * (R2 + R1 * Math.cos(Y)));

      k[x * c2 + y] =
        R1 * Math.sin(Y) * Math.sin(a) +
        (R2 + R1 * Math.cos(Y)) * Math.sin(X) * Math.cos(a);

      Torus.push([i[x * c2 + y], j[x * c2 + y], k[x * c2 + y]]);
    }
  }

  for (let x = 0; x < c2; x++) {
    let X = ((2 * Math.PI) / c2) * x;

    Ni[x] =
      R2 * Math.cos(X) * Math.cos(b) +
      R2 * Math.sin(X) * Math.sin(b) * Math.sin(a);
    Nj[x] =
      R2 * Math.sin(b) * Math.cos(X) -
      R2 * Math.sin(X) * Math.sin(a) * Math.cos(b);

    Nk[x] = R2 * Math.sin(X) * Math.cos(a);

    SNormal.push([Ni[x], Nj[x], Nk[x]]);
  }
}
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("DOMContentLoaded", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  recalc();
  render();
  setTimeout(() => {
    setInterval(() => {
      recalc();
      render();
      a += 0.1;
      b += 0.1;
    }, speed);
  }, init_delay);
});

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Torus.forEach((coord, i) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    const l = luminance(coord[0], coord[1], coord[2], i);

    shadeMap(l, coord[0], coord[1]);
  });
};

function luminance(coordx, coordy, coordz, index) {
  //direction of light dot product with Surface normal
  //[0, 1, -1]
  console.log(
    0 * coordx +
      1 * (SNormal[Math.floor(index / c1)][1] - coordy) +
      0 * (SNormal[Math.floor(index / c1)][2] - coordz)
  );
  return (
    0 * (SNormal[Math.floor(index / c1)][0] - coordx) +
    1 * (SNormal[Math.floor(index / c1)][1] - coordy) +
    -1 * (SNormal[Math.floor(index / c1)][2] - coordz)
  );
}

const shadeMap = (l_value, coordx, coordy) => {
  if (l_value > 90) {
    ctx.fillText("@", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7) {
    ctx.fillText("$", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 2) {
    ctx.fillText("#", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 3) {
    ctx.fillText("*", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 4) {
    ctx.fillText("!", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 5) {
    ctx.fillText("=", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 6) {
    ctx.fillText(";", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 7) {
    ctx.fillText(":", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 8) {
    ctx.fillText("~", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 9) {
    ctx.fillText("-", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else if (l_value > 40 - 7 * 10) {
    ctx.fillText(",", coordx + canvas.width / 2, coordy + canvas.height / 2);
  } else {
    ctx.fillText(".", coordx + canvas.width / 2, coordy + canvas.height / 2);
  }
};
