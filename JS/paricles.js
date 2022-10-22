const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
  x: null,
  y: null,
  radius: calculateMouseRadius(),
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvas.radius = calculateMouseRadius();
  init();
});

function calculateMouseRadius() {
  return Math.pow(canvas.height / 80, 2);
}

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillsStyle = "#a4b494";
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0)
      this.directionY = -this.directionY;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && mouse.x < canvas.width - this.size * 10) {
        this.x += 10;
      }

      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }

      if (mouse.y < this.y && mouse.y < canvas.height - this.size * 10) {
        this.y += 10;
      }

      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let particlesNum = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < particlesNum; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directiony = Math.random() * 5 - 2.5;

    particlesArray.push(
      new Particle(x, y, directionX, directiony, size, "#a4b494")
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  connect();
}

function connect() {
  let opacity = 1;
  for (let i = 0; i < particlesArray.length; i++) {
    for (let k = i; k < particlesArray.length; k++) {
      let distance =
        Math.pow(particlesArray[i].x - particlesArray[k].x, 2) +
        Math.pow(particlesArray[i].y - particlesArray[k].y, 2);

      if (distance < Math.pow(canvas.width / 5, 2)) {
        opacity = 1 - distance / 20000;
        ctx.strokeStyle = `rgb(164, 180, 148, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[k].x, particlesArray[k].y);
        ctx.stroke();
      }
    }
  }
}

init();
animate();

//https://www.youtube.com/watch?v=d620nV6bp0A
