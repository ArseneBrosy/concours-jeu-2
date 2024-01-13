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
const MAX_STEER_ANGLE = 30;
const WHEEl_TURN_SPEED = 1;
const SPEED = 2;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 100;
const CAR_SPRITE = new Image();
CAR_SPRITE.src = "images/car.png";

let car = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  rotation: 0,
  velocity: {
    x: 0,
    y: 0,
    magnitude: 0
  },
  xTargetVelocity: 0,
  yTargetVelocity: 0,
  frontForce: {
    x: 0,
    y: 0,
  },
  steer_angle: 0,
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
  const frontForceTarget = MAX_STEER_ANGLE * car.direction;
  if (Math.abs(car.steer_angle - frontForceTarget) <= WHEEl_TURN_SPEED) {
    car.steer_angle = frontForceTarget;
  } else {
    car.steer_angle += WHEEl_TURN_SPEED * (car.steer_angle < frontForceTarget ? 1 : -1);
  }
  car.frontForce.x = Math.sin((car.rotation + car.steer_angle) * (Math.PI/180)) * SPEED * car.running;
  car.frontForce.y = Math.cos((car.rotation + car.steer_angle) * (Math.PI/180)) * -SPEED * car.running;
  /*
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
  */

  // speed
  /*
  // target velocity
  car.xTargetVelocity = Math.sin(car.rotation * (Math.PI/180)) * SPEED * car.running;
  car.yTargetVelocity = Math.cos(car.rotation * (Math.PI/180)) * SPEED * car.running * -1;
  // actual velocity
  if (Math.abs(car.xTargetVelocity - car.velocity.x) <= ACCELERATION_SPEED) {
    car.velocity.x = car.xTargetVelocity;
  } else {
    car.velocity.x += ACCELERATION_SPEED * (car.xTargetVelocity > car.velocity.x ? 1 : -1);
  }
  if (Math.abs(car.yTargetVelocity - car.velocity.y) <= ACCELERATION_SPEED) {
    car.velocity.y = car.yTargetVelocity;
  } else {
    car.velocity.y += ACCELERATION_SPEED * (car.yTargetVelocity > car.velocity.y ? 1 : -1);
  }
  // calculate velocity
  car.velocity.magnitude = Math.sqrt(car.velocity.x**2 + car.velocity.y**2);
  // move car
  car.x += car.velocity.x;
  car.y += car.velocity.y;
  */
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
    ctx.lineTo(car.x + car.velocity.x * mul, car.y + car.velocity.y * mul);
    ctx.stroke();
    // front
    ctx.strokeStyle = "green";
    ctx.beginPath();
    const fmul = 100 / Math.sqrt(car.frontForce.x**2 + car.frontForce.y**2);
    ctx.moveTo(car.x + Math.sin(car.rotation * (Math.PI/180)) * CAR_HEIGHT / 2, car.y + Math.cos(car.rotation * (Math.PI/180)) * -CAR_HEIGHT / 2);
    ctx.lineTo(car.x + Math.sin(car.rotation * (Math.PI/180)) * CAR_HEIGHT / 2 + car.frontForce.x * fmul, car.y + Math.cos(car.rotation * (Math.PI/180)) * -CAR_HEIGHT / 2 + car.frontForce.y * fmul);
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