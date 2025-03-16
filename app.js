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

//Initial Angles of rotation(90 deg)
let a = Math.PI / 4;
let b = Math.PI / 4;
const speed = 100;
const init_delay = 1000;


//Torus Calculation dependent to current rotation angles
//Independent to current translation coordinates
function recalc() {
  Torus = [];
  SNormal = [];

  //c1 and c2 are the quantity of characters circling through first and second circle of Torus
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
    //Normal to some plane of reference
    SNormal.push([Ni[x], Nj[x], Nk[x]]);
  }
}
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let translate_x, translate_y;
let trans_x_direction = 1;
let trans_y_direction = 1;
let delta_translate_x = 10;
let delta_translate_y = 10;

document.addEventListener("DOMContentLoaded", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  translate_x = canvas.width / 2;
  translate_y = canvas.height / 2;
  recalc();
  render();
  setTimeout(() => {
    setInterval(() => {
      recalc();
      render();

      //Rotation Delta
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
  if (translate_x < 150 + 75 || translate_x > canvas.width - 150 - 75) {
    trans_x_direction *= -1;
  } else {
    trans_x_direction *= 1;
  }

  if (translate_y < 150 + 75 || translate_y > canvas.height - 150 - 75) {
    trans_y_direction *= -1;
  } else {
    trans_y_direction *= 1;
  }
  //Translation delta
  translate_x += trans_x_direction * delta_translate_x;
  translate_y += trans_y_direction * delta_translate_y;
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

const sample = "";
//This is where the translation changes are being accounted not during the creation of TORUS 
const shadeMap = (l_value, coordx, coordy) => {
  if (l_value > 70) {
    ctx.fillText("@", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7) {
    ctx.fillText("$", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 2) {
    ctx.fillText("#", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 3) {
    ctx.fillText("*", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 4) {
    ctx.fillText("!", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 5) {
    ctx.fillText("=", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 6) {
    ctx.fillText(";", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 7) {
    ctx.fillText(":", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 8) {
    ctx.fillText("~", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 9) {
    ctx.fillText("-", coordx + translate_x, coordy + translate_y);
  } else if (l_value > 40 - 7 * 10) {
    ctx.fillText(",", coordx + translate_x, coordy + translate_y);
  } else {
    ctx.fillText(".", coordx + translate_x, coordy + translate_y);
  }
};
