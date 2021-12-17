let points = [];
let thetaDegs = 0;
let r = 1;
let incrementDeg = 0.5;
let incrementR = 0.2;
let sep = 4;
let width, height;
let shapeSize = 1;
let shapeIncrement = 1;

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

const point = (r, thetaRads) => {
  const x = r * Math.cos(thetaRads);
  const y = r * Math.sin(thetaRads);
  return [x, y];
};

class Circle {
  constructor(r, thetaDegs, radius = shapeSize, color = "lime") {
    this.radius = radius;
    this.color = color;
    const thetaRads = degToRad(thetaDegs);
    [this.x, this.y] = point(r, thetaRads);

    this.draw = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = this.color;
      ctx.stroke();
    };
  }
}

function initCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  return ctx;
}

const addNewShape = () => {
  if ((thetaDegs % sep === 0 || thetaDegs === 0) && r < width / 2) {
    // let color = colorGradient[cycle() % colorGradient.length];
    points.push(new Circle(r, thetaDegs));
  }
};

function draw() {
  // let ctx = initCanvas();
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  points.forEach((shape) => {
    shape.draw(ctx);
  });

  addNewShape();

  thetaDegs += incrementDeg;
  r += incrementR;
  shapeSize += shapeIncrement;

  window.requestAnimationFrame(draw);
}

draw();
