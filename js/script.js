/**
 * 2nd Game Jam with Alex
 * @author Arsène Brosy
 * @since 09.11.2024
 */

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const DEBUG_MODE = false;

const ROTATION_SPEED = 0.02;
const ROTATION_MAX_SPEED = 2;
const ROTATION_FRICTION = 0.03;
const ACCELERATION_SPEED = 0.01;
const SPEED = 2;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 100;
const CAR_SPRITE = new Image();
CAR_SPRITE.src = "images/car.png";

let car = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  rotation: 0,
  xVelocity: 0,
  yVelocity: 0,
  velocity: 0,
  xTargetVelocity: 0,
  yTargetVelocity: 0,
  rVelocity: 0,
  direction: 0,
  running: false
};

setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  //region Physics
  //region Car
  // rotation
  car.rVelocity += ROTATION_SPEED * car.direction;
  car.rVelocity = Math.max(Math.min(car.rVelocity, ROTATION_MAX_SPEED), -ROTATION_MAX_SPEED);
  // rotation friction
  if (car.direction === 0 || !car.running) {
    if (Math.abs(car.rVelocity) <= ROTATION_FRICTION) {
      car.rVelocity = 0;
    } else {
      car.rVelocity += ROTATION_FRICTION * (car.rVelocity > 0 ? -1 : 1);
    }
  }
  car.rotation += car.rVelocity;

  // speed
  // target velocity
  car.xTargetVelocity = Math.sin(car.rotation * (Math.PI/180)) * SPEED * car.running;
  car.yTargetVelocity = Math.cos(car.rotation * (Math.PI/180)) * SPEED * car.running * -1;
  // actual velocity
  if (Math.abs(car.xTargetVelocity - car.xVelocity) <= ACCELERATION_SPEED) {
    car.xVelocity = car.xTargetVelocity;
  } else {
    car.xVelocity += ACCELERATION_SPEED * (car.xTargetVelocity > car.xVelocity ? 1 : -1);
  }
  if (Math.abs(car.yTargetVelocity - car.yVelocity) <= ACCELERATION_SPEED) {
    car.yVelocity = car.yTargetVelocity;
  } else {
    car.yVelocity += ACCELERATION_SPEED * (car.yTargetVelocity > car.yVelocity ? 1 : -1);
  }
  // calculate velocity
  car.velocity = Math.sqrt(car.xVelocity**2 + car.yVelocity**2);
  // move car
  car.x += car.xVelocity;
  car.y += car.yVelocity;
  //endregion
  //endregion

  //region Draw
  //region Car
  ctx.translate(car.x, car.y);
  ctx.rotate(car.rotation * (Math.PI/180));
  ctx.drawImage(CAR_SPRITE, -CAR_WIDTH / 2, -CAR_HEIGHT / 2, CAR_WIDTH, CAR_HEIGHT);
  ctx.rotate(-car.rotation * (Math.PI/180));
  ctx.translate(-car.x, -car.y);
  //endregion

  //region Debug
  if (DEBUG_MODE) {
    // Velocity
    ctx.lineWidth = 2;
    const mul = 100 / SPEED;
    // target
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(car.x, car.y);
    ctx.lineTo(car.x + car.xTargetVelocity * mul, car.y + car.yTargetVelocity * mul);
    ctx.stroke();
    // actual
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(car.x, car.y);
    ctx.lineTo(car.x + car.xVelocity * mul, car.y + car.yVelocity * mul);
    ctx.stroke();
    //endregion
  }
  //endregion
}, 0);

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyA") {
    car.direction = -1;
  }
  if (e.code === "KeyD") {
    car.direction = 1;
  }
  if (e.code === "Space") {
    car.running = !car.running;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyA" || e.code === "KeyD") {
    car.direction = 0;
  }
});