/**
 * 2nd Game Jam with Alex
 * @author Arsène Brosy
 * @since 09.11.2024
 */

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const DEBUG_MODE = true;

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
  breakForce: 0,
  steer_angle: 0,
  direction: 0,
  running: false,
  brakes: false,
  prevX: canvas.clientWidth / 2,
  prevY: canvas.clientWidth / 2,

  // constants
  maxSpeed: 3,
  maxBreakForce: 2,
  maxSteerAngle: 30,
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
  return {
    r: turnAngle,
    x: xOffset,
    y: yOffset
  };
}

function drift(rotation) {
  const offsetX = Math.sin(rotation * (Math.PI/180)) * -speed;
  const offsetY = Math.cos(rotation * (Math.PI/180)) * speed;
  return {
    x: offsetX,
    y: offsetY
  };
}

function rotateAround(rotation, x, y, cx, cy) {
  rotation -= 90;
  const localX = round((x - cx) * Math.cos(rotation * (Math.PI / 180)) - (y - cy) * Math.sin(rotation * (Math.PI / 180))) + cx;
  const localY = round((x - cx) * Math.sin(rotation * (Math.PI / 180)) + (y - cy) * Math.cos(rotation * (Math.PI / 180))) + cy;
  return {
    x: localX,
    y: localY
  };
}
//endregion

setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  //region Physics
  //region Car
  //region speed
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
  //endregion

  //region brakes
  const maxBreakForce = car.brakes ? car.maxBreakForce : 0;
  if (Math.abs(car.breakForce - maxBreakForce) <= car.acceleration) {
    car.breakForce = maxBreakForce;
  } else {
    car.breakForce += car.acceleration * (car.breakForce < maxBreakForce ? 1 : -1);
  }
  //endregion

  //region wheel direction
  const frontForceTarget = car.maxSteerAngle * car.direction;
  if (Math.abs(car.steer_angle - frontForceTarget) <= WHEEl_TURN_SPEED) {
    car.steer_angle = frontForceTarget;
  } else {
    car.steer_angle += WHEEl_TURN_SPEED * (car.steer_angle < frontForceTarget ? 1 : -1);
  }
  car.frontForce.x = Math.sin((car.rotation + car.steer_angle) * (Math.PI/180)) * car.speed;
  car.frontForce.y = Math.cos((car.rotation + car.steer_angle) * (Math.PI/180)) * -car.speed;
  //endregion

  //region move
  const transformValues = moveCar(car.steer_angle, car.speed, CAR_LENGTH);
  const localTranslate = rotateAround(car.rotation, transformValues.x, transformValues.y, 0, 0);
  const frontX = car.x + Math.sin(car.rotation * (Math.PI/180)) * CAR_LENGTH / 2;
  const frontY = car.y + Math.cos(car.rotation * (Math.PI/180)) * -CAR_LENGTH / 2;
  const driftValues = rotateAround(20, car.x, car.y, frontX, frontY);
  const centrifugal = {
    x: Math.sin((car.rotation + 90) * (Math.PI/180)) * -car.speed * car.steer_angle / car.maxSteerAngle,
    y: Math.cos((car.rotation + 90) * (Math.PI/180)) * car.speed * car.steer_angle / car.maxSteerAngle,
  };
  car.rotation += transformValues.r;
  car.x += localTranslate.x;
  car.y += localTranslate.y;
  //endregion

  //region inertia
  const inertia = {
    x: car.x - car.prevX,
    y: car.y - car.prevY
  };
  const result = {
    x: inertia.x + centrifugal.x,
    y: inertia.y + centrifugal.y
  };
  //endregion

  //region previous
  car.prevX = car.x;
  car.prevY = car.y;
  //endregion
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
    ctx.moveTo(frontX, frontY);
    ctx.lineTo(frontX + car.frontForce.x * mul, frontY + car.frontForce.y * mul);
    ctx.stroke();
    // drift
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(car.x, car.y);
    ctx.lineTo(car.x + centrifugal.x * mul, car.y + centrifugal.y * mul);
    ctx.stroke();
    // transform
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(car.x + localTranslate.x * mul, car.y + localTranslate.y * mul, 5, 0, 2 * Math.PI);
    ctx.fill();
    // inertia
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(car.x + localTranslate.x * mul, car.y + localTranslate.y * mul, 5, 0, 2 * Math.PI);
    ctx.fill();
    // previous
    ctx.strokeStyle = "magenta";
    ctx.beginPath();
    ctx.moveTo(car.x, car.y);
    ctx.lineTo(car.x + inertia.x * mul, car.y + inertia.y * mul);
    ctx.stroke();
    // result
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(car.x, car.y);
    ctx.lineTo(car.x + result.x * mul, car.y + result.y * mul);
    ctx.stroke();
  }
  //endregion
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
  if (e.code === "KeyW") {
    car.brakes = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyA" || e.code === "KeyD") {
    car.direction = 0;
  }
  if (e.code === "KeyW") {
    car.brakes = false;
  }
});