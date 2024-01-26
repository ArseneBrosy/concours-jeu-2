/**
 * 2nd Game Jam with Alex
 * @author Arsène Brosy
 * @since 09.11.2024
 */

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

//region Constants
const DEBUG_MODE = false;
const GROUND_FRICTION = 3;
const GROUND_DECELERATION = 0.01;
const BACK_TO_TRACK_TIME = 1500;

const CAR_SPRITE = new Image();
CAR_SPRITE.src = "images/car.png";

const TRACK = [[2404,1202],[2456,1160],[2508,1119],[2561,1077],[2613,1036],[2665,995],[2717,953],[2770,912],[2824,874],[2883,842],[2947,826],[3013,816],[3079,817],[3146,821],[3207,844],[3267,874],[3320,914],[3373,955],[3426,995],[3479,1036],[3532,1076],[3585,1117],[3638,1157],[3691,1198],[3743,1238],[3796,1279],[3849,1319],[3902,1360],[3955,1401],[4008,1441],[4061,1482],[4114,1522],[4167,1563],[4220,1603],[4273,1644],[4326,1684],[4379,1725],[4432,1765],[4484,1806],[4537,1846],[4590,1887],[4640,1931],[4682,1982],[4694,2048],[4701,2114],[4709,2180],[4732,2242],[4772,2295],[4827,2331],[4888,2357],[4953,2371],[5020,2366],[5086,2361],[5148,2335],[5203,2300],[5247,2251],[5306,2221],[5371,2213],[5437,2215],[5502,2227],[5565,2248],[5614,2293],[5664,2337],[5718,2376],[5775,2411],[5831,2446],[5888,2482],[5944,2517],[6001,2552],[6057,2588],[6114,2623],[6170,2658],[6227,2694],[6283,2729],[6342,2762],[6400,2793],[6459,2825],[6517,2857],[6576,2889],[6634,2921],[6693,2953],[6751,2985],[6810,3017],[6869,3049],[6927,3080],[6988,3106],[7051,3129],[7114,3151],[7176,3174],[7239,3197],[7302,3220],[7364,3242],[7427,3265],[7490,3288],[7552,3311],[7617,3324],[7683,3325],[7750,3326],[7817,3327],[7883,3329],[7950,3330],[8017,3331],[8083,3332],[8150,3333],[8217,3334],[8283,3335],[8350,3336],[8417,3337],[8483,3338],[8550,3339],[8617,3340],[8683,3339],[8748,3322],[8812,3305],[8877,3288],[8941,3271],[9005,3254],[9067,3230],[9123,3194],[9179,3158],[9236,3123],[9292,3087],[9348,3051],[9404,3016],[9461,2980],[9517,2944],[9573,2908],[9630,2873],[9686,2837],[9742,2801],[9799,2766],[9855,2730],[9911,2694],[9967,2658],[10024,2623],[10080,2587],[10136,2551],[10193,2516],[10249,2480],[10305,2444],[10361,2408],[10418,2373],[10474,2337],[10530,2301],[10587,2266],[10643,2230],[10699,2194],[10743,2148],[10768,2086],[10756,2024],[10721,1970],[10666,1933],[10610,1896],[10555,1859],[10499,1822],[10444,1785],[10388,1748],[10328,1726],[10267,1736],[10219,1782],[10181,1837],[10144,1893],[10107,1948],[10070,2003],[10033,2059],[9996,2114],[9959,2170],[9915,2219],[9867,2266],[9802,2270],[9741,2253],[9688,2212],[9653,2161],[9638,2096],[9641,2031],[9656,1966],[9686,1907],[9719,1849],[9752,1791],[9785,1733],[9818,1675],[9851,1617],[9884,1559],[9918,1502],[9965,1454],[10011,1406],[10057,1358],[10104,1310],[10150,1262],[10196,1214],[10207,1148],[10219,1083],[10226,1019],[10169,983],[10113,947],[10048,955],[9983,966],[9917,977],[9851,989],[9785,1000],[9720,1011],[9654,1022],[9588,1033],[9522,1045],[9457,1056],[9391,1067],[9325,1078],[9260,1089],[9194,1101],[9128,1112],[9062,1123],[8997,1134],[8931,1145],[8865,1157],[8800,1168],[8734,1179],[8668,1190],[8602,1201],[8537,1212],[8471,1224],[8405,1235],[8340,1246],[8275,1261],[8216,1292],[8157,1323],[8098,1354],[8044,1390],[8014,1449],[7985,1509],[7955,1569],[7949,1635],[7944,1701],[7940,1768],[7935,1834],[7930,1901],[7926,1967],[7921,2034],[7917,2100],[7891,2162],[7864,2223],[7837,2284],[7804,2340],[7759,2389],[7714,2438],[7668,2488],[7623,2537],[7572,2574],[7506,2586],[7441,2599],[7375,2611],[7310,2624],[7245,2615],[7179,2601],[7114,2587],[7049,2572],[6992,2539],[6937,2501],[6882,2464],[6827,2427],[6772,2389],[6716,2352],[6661,2314],[6606,2277],[6551,2240],[6496,2202],[6440,2165],[6385,2128],[6330,2090],[6275,2053],[6220,2015],[6164,1978],[6106,1947],[6045,1920],[5984,1893],[5923,1866],[5862,1839],[5801,1812],[5740,1785],[5679,1758],[5618,1731],[5557,1704],[5500,1670],[5443,1635],[5386,1600],[5329,1565],[5272,1531],[5215,1496],[5159,1461],[5102,1427],[5045,1392],[4988,1357],[4931,1323],[4874,1288],[4817,1253],[4760,1218],[4703,1184],[4646,1149],[4589,1114],[4532,1080],[4475,1045],[4418,1010],[4362,976],[4305,941],[4248,906],[4191,871],[4134,837],[4077,802],[4020,767],[3963,733],[3906,698],[3849,663],[3792,629],[3735,594],[3678,559],[3621,525],[3565,490],[3508,455],[3451,420],[3402,375],[3353,330],[3304,284],[3256,239],[3207,193],[3158,148],[3106,107],[3045,82],[2983,56],[2922,43],[2861,70],[2800,97],[2744,132],[2694,176],[2645,221],[2595,266],[2546,310],[2496,355],[2447,400],[2397,444],[2348,489],[2298,534],[2249,578],[2199,623],[2150,668],[2100,712],[2051,757],[2001,801],[1952,846],[1905,894],[1858,941],[1812,989],[1765,1037],[1719,1085],[1672,1132],[1626,1180],[1579,1228],[1533,1276],[1486,1324],[1440,1371],[1393,1419],[1347,1467],[1300,1515],[1254,1562],[1207,1610],[1161,1658],[1114,1706],[1069,1754],[1030,1808],[991,1862],[951,1916],[912,1970],[873,2024],[834,2078],[795,2132],[756,2187],[718,2241],[679,2295],[641,2350],[613,2410],[584,2471],[555,2531],[527,2591],[498,2651],[469,2711],[440,2771],[411,2831],[382,2891],[375,2957],[368,3024],[360,3090],[353,3156],[346,3223],[339,3289],[327,3354],[303,3416],[279,3478],[255,3541],[229,3601],[178,3645],[128,3689],[83,3736],[58,3798],[40,3860],[69,3920],[103,3975],[156,4016],[209,4057],[261,4098],[314,4139],[367,4180],[419,4221],[472,4261],[525,4302],[577,4343],[630,4384],[682,4426],[735,4467],[787,4508],[840,4549],[893,4587],[960,4588],[1027,4588],[1084,4563],[1128,4513],[1140,4452],[1134,4386],[1128,4319],[1109,4256],[1083,4195],[1056,4134],[1030,4073],[1004,4011],[977,3950],[962,3887],[962,3820],[962,3753],[962,3687],[962,3620],[962,3553],[962,3487],[962,3420],[962,3353],[962,3287],[962,3220],[962,3153],[962,3087],[962,3020],[971,2955],[992,2892],[1013,2828],[1034,2765],[1055,2702],[1084,2644],[1138,2606],[1193,2568],[1250,2544],[1314,2563],[1379,2579],[1445,2579],[1512,2579],[1574,2568],[1617,2517],[1660,2467],[1703,2416],[1746,2365],[1790,2314],[1833,2263],[1876,2213],[1919,2162],[1962,2111],[2006,2060],[2049,2009],[2082,1952],[2105,1890],[2117,1824],[2114,1758],[2095,1695],[2085,1629],[2089,1564],[2112,1502],[2151,1448],[2199,1402],[2246,1355],[2294,1309],[2342,1262],[2390,1216]];
const TRACK_WIDTH = 250;
const MINI_TRACK_SIZE = 400;
const MINI_TRACK_MARGIN_X = 10;
const MINI_TRACK_MARGIN_Y = -200;
//endregion

//region Global variables
let car = {
  x: TRACK[0][0],
  y: TRACK[0][1],
  rotation: 45,
  xVelocity: 0,
  yVelocity: 0,
  xTargetVelocity: 0,
  yTargetVelocity: 0,
  rVelocity: 0,
  direction: 0,
  groundFriction: 1,
  running: false,

  // constants
  max_rotation_speed: 2,
  rotation_acceleration : 0.02,
  rotation_friction: 0.03,
  acceleration: 0.01,
  max_speed: 3,
  width: 60,
  height: 120,
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

let isReturningToTrack = false;
let timeRemainingToTrack = BACK_TO_TRACK_TIME;
//endregion

//region Functions
function pointToPoint(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);
}

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

function returnToTrack(point) {
  const nextPoint = (point + 1) % TRACK.length;
  const xOffset = TRACK[nextPoint][0] - TRACK[point][0];
  const yOffset = TRACK[nextPoint][1] - TRACK[point][1];
  const dis = Math.sqrt(xOffset**2 + yOffset**2);
  const xAngle = xOffset / dis;
  const yAngle = yOffset / dis;
  let angle = Math.acos(xAngle) * (180/Math.PI);
  if (yAngle > 0) {
    angle = 360 - angle;
  }
  car.rotation = -angle + 90;
  car.x = TRACK[point][0];
  car.y = TRACK[point][1];
  camera.x = car.x;
  camera.y = car.y;
  car.rVelocity = 0;
  car.xVelocity = 0;
  car.yVelocity = 0;
  car.running = 0;
}
returnToTrack(0);
//endregion

let trackPos = 0;
let laps = 0;
let trackMinX = Infinity;
let trackMaxX = -Infinity;
let trackMinY = Infinity;
let trackMaxY = -Infinity;
for (let point of TRACK) {
  trackMinX = Math.min(trackMinX, point[0]);
  trackMaxX = Math.max(trackMaxX, point[0]);
  trackMinY = Math.min(trackMinY, point[1]);
  trackMaxY = Math.max(trackMaxY, point[1]);
}
const trackWidth = trackMaxX - trackMinX;
const trackHeight = trackMaxY - trackMinY;
const miniTrackMul = Math.max(trackWidth / MINI_TRACK_SIZE, trackHeight / MINI_TRACK_SIZE);
setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  //region Physics
  //region Track
  const trackDis = distanceToTrack(car.x, car.y);
  const onTrack = trackDis <= TRACK_WIDTH / 2;
  if (pointToPoint(car.x, car.y, TRACK[trackPos][0], TRACK[trackPos][1]) <= TRACK_WIDTH) {
    trackPos++;
    if (trackPos >= TRACK.length) {
      trackPos = 0;
      laps++;
    }
  }
  //endregion

  //region Car
  //region ground friction
  const gftarget = onTrack ? 1 : GROUND_FRICTION;
  if (Math.abs(car.groundFriction - gftarget) <= GROUND_DECELERATION) {
    car.groundFriction = gftarget;
  } else {
    car.groundFriction += GROUND_DECELERATION * (car.groundFriction < gftarget ? 1 : -1);
  }
  //endregion

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
  car.rotation += car.rVelocity / car.groundFriction;
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
  car.x += car.xVelocity / car.groundFriction;
  car.y += car.yVelocity / car.groundFriction;
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
  const camAdditionalX = camVelocityX * -camera.range_radius / camera.speed * 2;
  const camAdditionalY = camVelocityY * -camera.range_radius / camera.speed * 2;
  const camOffsetX = -camera.x + camAdditionalX + canvas.clientWidth / 2;
  const camOffsetY = -camera.y + camAdditionalY + canvas.height / 2;
  //endregion

  //region Track
  ctx.strokeStyle = "black";
  ctx.lineWidth  = TRACK_WIDTH;
  ctx.beginPath();
  ctx.moveTo(TRACK[0][0] + camOffsetX, TRACK[0][1] + camOffsetY);
  for (let point of TRACK) {
    ctx.lineTo(point[0] + camOffsetX, point[1] + camOffsetY);
  }
  ctx.closePath();
  ctx.stroke();
  //endregion

  //region Car
  ctx.translate(car.x + camOffsetX, car.y + camOffsetY);
  ctx.rotate(car.rotation * (Math.PI/180));
  ctx.drawImage(CAR_SPRITE, -car.width / 2, -car.height / 2, car.width, car.height);
  ctx.rotate(-car.rotation * (Math.PI/180));
  ctx.translate(-car.x - camOffsetX, -car.y - camOffsetY);
  //endregion

  //region HUD
  document.querySelector("#off-track").style.display = onTrack ? "none" : "block";

  //region Minitrack
  ctx.strokeStyle = "grey";
  ctx.lineWidth  = 10;
  ctx.beginPath();
  ctx.moveTo(TRACK[0][0] / miniTrackMul + MINI_TRACK_MARGIN_X, TRACK[0][1] / miniTrackMul + canvas.height - MINI_TRACK_SIZE - MINI_TRACK_MARGIN_Y);
  for (let point of TRACK) {
    ctx.lineTo(point[0] / miniTrackMul + MINI_TRACK_MARGIN_X, point[1] / miniTrackMul + canvas.height - MINI_TRACK_SIZE - MINI_TRACK_MARGIN_Y);
  }
  ctx.closePath();
  ctx.stroke();
  // position
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(TRACK[trackPos][0] / miniTrackMul + MINI_TRACK_MARGIN_X, TRACK[trackPos][1] / miniTrackMul + canvas.height - MINI_TRACK_SIZE - MINI_TRACK_MARGIN_Y, 5, 0, 2 * Math.PI);
  ctx.fill();
  //endregion

  //region Back to track
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, 2 * Math.PI * (1 - (timeRemainingToTrack / BACK_TO_TRACK_TIME)));
  ctx.stroke();
  //endregion
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
    // camera
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, camera.range_radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.strokeStyle = "green";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + camVelocityX * 100, canvas.height / 2 + camVelocityY * 100);
    ctx.stroke();
    // distance to road
    ctx.strokeStyle = onTrack ? "green": "red";
    ctx.beginPath();
    ctx.arc(car.x + camOffsetX, car.y + camOffsetY, trackDis, 0, 2 * Math.PI);
    ctx.stroke();
  }
  //endregion
  //endregion
}, 0);

setInterval(() => {
  if (isReturningToTrack && timeRemainingToTrack > 0) {
    timeRemainingToTrack -= 10;
    if (timeRemainingToTrack === 0) {
      const point = (trackPos - 5) % TRACK.length;
      returnToTrack(point);
    }
  } else {
    timeRemainingToTrack = BACK_TO_TRACK_TIME;
  }
}, 10);

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyA") {
    car.direction = -1;
  }
  if (e.code === "KeyD") {
    car.direction = 1;
  }
  if (e.code === "Space") {
    car.running = true;
  }
  if (e.code === "KeyX") {
    isReturningToTrack = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "KeyA" || e.code === "KeyD") {
    car.direction = 0;
  }
  if (e.code === "KeyX") {
    isReturningToTrack = false;
  }
});