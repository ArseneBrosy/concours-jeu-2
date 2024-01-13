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
const MAX_STEER_ANGLE = 30;
const WHEEl_TURN_SPEED = 1;
const CAR_WIDTH = 50;
const CAR_LENGTH = 100;
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
  frontForce: {
    x: 0,
    y: 0,
  },
  speed: 0,
  steer_angle: 0,
  direction: 0,
  running: false,
  brakes: true,

  // constants
  maxSpeed: 3,
  acceleration: 0.05,
  free_wheels_friction: 0.006,
  brake_wheels_friction: 0.06
};

//region Functions
function round(x, decimals = 3) {
  return Math.floor(x * 10**decimals) / 10**decimals;
}

function moveCar(steer, speed, length) {
  const directionAngle = 180 - steer;
  const prop = Math.sin(directionAngle * (Math.PI/180)) / length;
  const turnAngle = round(Math.asin(speed * prop) * (180/Math.PI));
  const x = Math.cos(steer * (Math.PI/180)) * speed + length / 2;
  const y = Math.cos(turnAngle * (Math.PI/180)) * length;
  const xOffset = -0.5 * y + x;
  const yOffset = Math.sin(turnAngle * (Math.PI/180)) * length / 2;
  return [turnAngle, xOffset, yOffset];
}

function localToWorldTransform(rotation, x, y) {
  rotation -= 90;
  const localX = round(x * Math.cos(rotation * (Math.PI / 180)) - y * Math.sin(rotation * (Math.PI / 180)));
  const localY = round(x * Math.sin(rotation * (Math.PI / 180)) + y * Math.cos(rotation * (Math.PI / 180)));
  return [localX, localY];
}
//endregion

setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  //region Physics
  //region Car
  // speed
  if (car.running) {
    if (Math.abs(car.speed - car.maxSpeed) <= car.acceleration) {
      car.speed = car.maxSpeed;
    } else {
      car.speed += car.acceleration * (car.speed < car.maxSpeed ? 1 : -1);
    }
  } else {
    const brakeForce = car.brakes ? car.brake_wheels_friction : car.free_wheels_friction;
    if (Math.abs(car.speed) <= brakeForce) {
      car.speed = 0;
    } else {
      car.speed -= brakeForce * (car.speed > 0 ? 1 : -1);
    }
  }

  // wheel direction
  const frontForceTarget = MAX_STEER_ANGLE * car.direction;
  if (Math.abs(car.steer_angle - frontForceTarget) <= WHEEl_TURN_SPEED) {
    car.steer_angle = frontForceTarget;
  } else {
    car.steer_angle += WHEEl_TURN_SPEED * (car.steer_angle < frontForceTarget ? 1 : -1);
  }
  car.frontForce.x = Math.sin((car.rotation + car.steer_angle) * (Math.PI/180)) * car.speed;
  car.frontForce.y = Math.cos((car.rotation + car.steer_angle) * (Math.PI/180)) * -car.speed;

  // turning
  const transformValues = moveCar(car.steer_angle, car.speed, CAR_LENGTH);
  const localTranslate = localToWorldTransform(car.rotation, transformValues[1], transformValues[2]);
  car.rotation += transformValues[0];
  car.x += localTranslate[0];
  car.y += localTranslate[1];
  //endregion
  //endregion

  //region Draw
  //region Car
  ctx.translate(car.x, car.y);
  ctx.rotate(car.rotation * (Math.PI/180));
  ctx.drawImage(CAR_SPRITE, -CAR_WIDTH / 2, -CAR_LENGTH / 2, CAR_WIDTH, CAR_LENGTH);
  ctx.rotate(-car.rotation * (Math.PI/180));
  ctx.translate(-car.x, -car.y);
  //endregion

  //region Debug
  if (DEBUG_MODE) {
    // Velocity
    ctx.lineWidth = 2;
    const mul = 100 / car.maxSpeed;
    // front
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(car.x + Math.sin(car.rotation * (Math.PI/180)) * CAR_LENGTH / 2, car.y + Math.cos(car.rotation * (Math.PI/180)) * -CAR_LENGTH / 2);
    ctx.lineTo(car.x + Math.sin(car.rotation * (Math.PI/180)) * CAR_LENGTH / 2 + car.frontForce.x * mul, car.y + Math.cos(car.rotation * (Math.PI/180)) * -CAR_LENGTH / 2 + car.frontForce.y * mul);
    ctx.stroke();
    // transform
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(car.x + localTranslate[0] * mul, car.y + localTranslate[1] * mul, 5, 0, 2 * Math.PI);
    ctx.fill();
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