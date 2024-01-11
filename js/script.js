/**
 * 2nd Game Jam with Alex
 * @author Arsène Brosy
 * @since 09.11.2024
 */

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const DEBUG_MODE = true;

const ROTATION_SPEED = 0.02;
const ROTATION_MAX_SPEED = 2;
const ROTATION_FRICTION = 0.03;
const ACCELERATION_SPEED = 0.01;
const DIRECTION_SPEED = 1;
const SPEED = 2;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 100;
const CAR_SPRITE = new Image();
CAR_SPRITE.src = "images/car.png";

let car = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  rotation: 0,
  velocityAngle: 0,
  speed: 0,
  targetSpeed: 0,
  xVelocity: 0,
  yVelocity: 0,
  rVelocity: 0,
  direction: 0,
  running: true
};

//region Functions
//endregion

setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  //region Physics
  //region Car
  // rotation
  car.rVelocity += ROTATION_SPEED * car.direction;
  car.rVelocity = Math.max(Math.min(car.rVelocity, ROTATION_MAX_SPEED), -ROTATION_MAX_SPEED);
  // rotation friction
  if (car.direction === 0) {
    if (Math.abs(car.rVelocity) <= ROTATION_FRICTION) {
      car.rVelocity = 0;
    } else {
      car.rVelocity += ROTATION_FRICTION * (car.rVelocity > 0 ? -1 : 1);
    }
  }
  car.rotation += car.rVelocity;
  car.rotation = car.rotation % 360;

  // speed
  // target speed
  car.targetSpeed = SPEED * car.running;
  // actual speed
  if (Math.abs(car.speed - car.targetSpeed) <= ACCELERATION_SPEED) {
    car.speed = car.targetSpeed;
  } else {
    car.speed += ACCELERATION_SPEED * (car.speed < car.targetSpeed ? 1 : -1);
  }
  // velocity angle
  if (Math.abs(car.velocityAngle - car.rotation) <= DIRECTION_SPEED) {
    car.velocityAngle = car.rotation;
  } else {
    car.velocityAngle += DIRECTION_SPEED * (car.velocityAngle > car.rotation ? -1 : 1);
  }
  // calculate velocity
  car.xVelocity = Math.sin(car.velocityAngle * (Math.PI/180)) * car.speed;
  car.yVelocity = Math.cos(car.velocityAngle * (Math.PI/180)) * -car.speed;
  // move car
  //car.x += car.xVelocity;
  //car.y += car.yVelocity;
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
    ctx.lineTo(car.x + Math.sin(car.rotation * (Math.PI/180)) * 100, car.y + Math.cos(car.rotation * (Math.PI/180)) * -100);
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