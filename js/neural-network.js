function calcAngle() {
  const targetIndex = (trackPos + 5) % TRACK.length;
  const target = TRACK[targetIndex];
  const dis = Math.sqrt((target[0] - car.x) ** 2 + (target[1] - car.y) ** 2);
  let angle = Math.acos((target[0] - car.x) / dis) * (180/Math.PI);
  if ((target[1] - car.y) < 0) {
    angle = 360 - angle;
  }

  return angle;
}

function drawInputs() {
  const x = car.x + camOffsetX;
  const y = car.y + camOffsetY;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  const angle = calcAngle();
  const diffAngle = angleDifference(angle, (car.rotation - 90) % 360);
  ctx.beginPath();
  if (diffAngle >= 0) {
    ctx.arc(x, y, 100, (car.rotation - 90) * (Math.PI / 180), (car.rotation - 90 + diffAngle) * (Math.PI / 180));
  } else {
    ctx.arc(x, y, 100, (car.rotation - 90 + diffAngle) * (Math.PI / 180), (car.rotation - 90) * (Math.PI / 180));
  }
  ctx.stroke();

  const angleX = Math.cos(angle * (Math.PI/180));
  const angleY = Math.sin(angle * (Math.PI/180));
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + angleX * 100, y + angleY * 100);
  ctx.stroke();

  const carAngleX = Math.cos((car.rotation - 90) * (Math.PI/180));
  const carAngleY = Math.sin((car.rotation - 90) * (Math.PI/180));
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + carAngleX * 100, y + carAngleY * 100);
  ctx.stroke();
}

function angleDifference(x, y) {
  /*let difference = Math.abs(y - x);
  if (difference > 180) {
    difference = 360 - difference;
  }
  if (x - y > 0) {
    difference *= -1;
  }*/
  x *= (Math.PI / 180);
  y *= (Math.PI / 180);
  return Math.atan2(Math.sin(x-y), Math.cos(x-y)) * (180/Math.PI);
}