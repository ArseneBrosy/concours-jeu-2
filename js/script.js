/**
 * 2nd Game Jam with Alex
 * @author Arsène Brosy
 * @since 09.11.2024
 */

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const DEBUG_MODE = true;

const CAR_SPRITE = new Image();
CAR_SPRITE.src = "images/car.png";

const TRACK = [
  [0, 0],
  [0, 400],
  [400, 400],
  [100, 0],
];

let car = {
  x: canvas.clientWidth / 2,
  y: canvas.clientHeight / 2,
  rotation: 0,
  xVelocity: 0,
  yVelocity: 0,
  xTargetVelocity: 0,
  yTargetVelocity: 0,
  rVelocity: 0,
  direction: 0,
  acceleration: 0.01,
  rotation_acceleration : 0.02,
  rotation_friction: 0.03,
  running: false,

  // constants
  max_rotation_speed: 2,
  max_speed: 2,
  width: 50,
  height: 100,
};

let camera = {
  speed: car.max_speed,
  target: {
    x: car.x,
    y: car.y
  },
  x: car.x,
  y: car.y,
  range_radius: canvas.clientHeight / 3
};

//region Functions
function pointToLine(x, y, x1, y1, x2, y2) {

  let A = x - x1;
  let B = y - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let len_sq = C * C + D * D;
  let param = -1;
  if (len_sq !== 0) //in case of 0 length line
    param = dot / len_sq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  let dx = x - xx;
  let dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

function distanceToTrack(x, y) {
  let minDistance = Infinity;
  for (let i = 0; i < TRACK.length; i++) {
    const nextIndex = (i + 1) % TRACK.length;
    const distance = pointToLine(x, y, TRACK[i][0], TRACK[i][1], TRACK[nextIndex][0], TRACK[nextIndex][1]);
    minDistance = Math.min(distance, minDistance);
  }
  return minDistance;
}
//endregion

setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  //region Physics
  //region Car
  //region rotation
  car.rVelocity += car.rotation_acceleration * car.direction;
  car.rVelocity = Math.max(Math.min(car.rVelocity, car.max_rotation_speed), -car.max_rotation_speed);
  //endregion

  //region rotation friction
  if (car.direction === 0 || car.running === false) {
    if (Math.abs(car.rVelocity) <= car.rotation_friction) {
      car.rVelocity = 0;
    } else {
      car.rVelocity += car.rotation_friction * (car.rVelocity > 0 ? -1 : 1);
    }
  }
  car.rotation += car.rVelocity;
  //endregion

  //region speed
  //region target velocity
  car.xTargetVelocity = Math.sin(car.rotation * (Math.PI/180)) * car.max_speed * car.running;
  car.yTargetVelocity = Math.cos(car.rotation * (Math.PI/180)) * car.max_speed * car.running * -1;
  //endregion

  //region actual velocity
  if (Math.abs(car.xTargetVelocity - car.xVelocity) <= car.acceleration) {
    car.xVelocity = car.xTargetVelocity;
  } else {
    car.xVelocity += car.acceleration * (car.xTargetVelocity > car.xVelocity ? 1 : -1);
  }
  if (Math.abs(car.yTargetVelocity - car.yVelocity) <= car.acceleration) {
    car.yVelocity = car.yTargetVelocity;
  } else {
    car.yVelocity += car.acceleration * (car.yTargetVelocity > car.yVelocity ? 1 : -1);
  }
  //endregion

  //region move car
  car.x += car.xVelocity;
  car.y += car.yVelocity;
  //endregion
  //endregion
  //endregion
  //endregion

  //region Camera
  camera.target.x = car.x;
  camera.target.y = car.y;

  const camVelocityX = (camera.target.x - camera.x) / camera.range_radius * camera.speed;
  const camVelocityY = (camera.target.y - camera.y) / camera.range_radius * camera.speed;

  camera.x += camVelocityX;
  camera.y += camVelocityY;
  //endregion

  //region Draw
  //region Camera
  const camOffsetX = -camera.x + canvas.clientWidth / 2;
  const camOffsetY = -camera.y + canvas.height / 2;
  //endregion

  //region Car
  ctx.translate(car.x + camOffsetX, car.y + camOffsetY);
  ctx.rotate(car.rotation * (Math.PI/180));
  ctx.drawImage(CAR_SPRITE, -car.width / 2, -car.height / 2, car.width, car.height);
  ctx.rotate(-car.rotation * (Math.PI/180));
  ctx.translate(-car.x - camOffsetX, -car.y - camOffsetY);
  //endregion

  //region Track
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(TRACK[0][0] + camOffsetX, TRACK[0][1] + camOffsetY);
  for (let point of TRACK) {
    ctx.lineTo(point[0] + camOffsetX, point[1] + camOffsetY);
  }
  ctx.closePath();
  ctx.stroke();
  //endregion

  //region Debug
  if (DEBUG_MODE) {
    // Velocity
    ctx.lineWidth = 2;
    const mul = 100 / car.max_speed;
    // target
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(car.x + camOffsetX, car.y + camOffsetY);
    ctx.lineTo(car.x + car.xTargetVelocity * mul + camOffsetX, car.y + car.yTargetVelocity * mul + camOffsetY);
    ctx.stroke();
    // actual
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(car.x + camOffsetX, car.y + camOffsetY);
    ctx.lineTo(car.x + car.xVelocity * mul + camOffsetX, car.y + car.yVelocity * mul + camOffsetY);
    ctx.stroke();
    // distance to road
    const distTest = distanceToTrack(car.x, car.y);
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(car.x + camOffsetX, car.y + camOffsetY, distTest, 0, 2 * Math.PI);
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
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyA" || e.code === "KeyD") {
    car.direction = 0;
  }
});