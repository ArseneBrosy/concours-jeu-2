/**
 * 2nd Game Jam with Alex
 * @author Arsène Brosy
 * @since 09.11.2024
 */

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ROTATION_SPEED = 0.1;
const ROTATION_MAX_SPEED = 10;
const ROTATION_FRICTION = 0.1;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 100;
const CAR_SPRITE = new Image();
CAR_SPRITE.src = "images/car.png";

let car = {
  x: 100,
  y: 100,
  rotation: 0,
  rVelocity: 0,
  direction: 0
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
  if (car.direction === 0) {
    if (Math.abs(car.rVelocity) <= ROTATION_FRICTION) {
      car.rVelocity = 0;
    } else {
      car.rVelocity += ROTATION_FRICTION * (car.rVelocity > 0 ? -1 : 1);
    }
  }
  car.rotation += car.rVelocity;
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
  //endregion
}, 0);

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyA") {
    car.direction = -1;
  }

  if (e.code === "KeyD") {
    car.direction = 1;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyA" || e.code === "KeyD") {
    car.direction = 0;
  }
});