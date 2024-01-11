const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ROTATION_SPEED = 10;

let car = {
  rotation: 0
}

setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  ctx.fillRect(100, 100, 100, 100);
}, 0);

document.addEventListener("keydown", (e) => {
  console.log(e.code);

  if (e.code === "KeyA") {
    car.rotation -= ROTATION_SPEED;
  }

  if (e.code === "KeyD") {
    car.rotation += ROTATION_SPEED;
  }
});