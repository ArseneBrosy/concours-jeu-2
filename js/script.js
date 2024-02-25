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
const GROUND_DECELERATION = 0.002;
const BACK_TO_TRACK_TIME = 1500;

const CURRENT_TRACK = "monaco";

const CAR_SPRITE = new Image();
CAR_SPRITE.src = "images/car.png";

let TRACK = [[1069,1754],[1114,1706],[1161,1658],[1207,1610],[1254,1562],[1300,1515],[1347,1467],[1393,1419],[1440,1371],[1486,1324],[1533,1276],[1579,1228],[1626,1180],[1672,1132],[1719,1085],[1765,1037],[1812,989],[1858,941],[1905,894],[1952,846],[2001,801],[2051,757],[2100,712],[2150,668],[2199,623],[2249,578],[2298,534],[2348,489],[2397,444],[2447,400],[2496,355],[2546,310],[2595,266],[2645,221],[2694,176],[2744,132],[2800,97],[2861,70],[2922,43],[2983,56],[3045,82],[3106,107],[3158,148],[3207,193],[3256,239],[3304,284],[3353,330],[3402,375],[3451,420],[3508,455],[3565,490],[3621,525],[3678,559],[3735,594],[3792,629],[3849,663],[3906,698],[3963,733],[4020,767],[4077,802],[4134,837],[4191,871],[4248,906],[4305,941],[4362,976],[4418,1010],[4475,1045],[4532,1080],[4589,1114],[4646,1149],[4703,1184],[4760,1218],[4817,1253],[4874,1288],[4931,1323],[4988,1357],[5045,1392],[5102,1427],[5159,1461],[5215,1496],[5272,1531],[5329,1565],[5386,1600],[5443,1635],[5500,1670],[5557,1704],[5618,1731],[5679,1758],[5740,1785],[5801,1812],[5862,1839],[5923,1866],[5984,1893],[6045,1920],[6106,1947],[6164,1978],[6220,2015],[6275,2053],[6330,2090],[6385,2128],[6440,2165],[6496,2202],[6551,2240],[6606,2277],[6661,2314],[6716,2352],[6772,2389],[6827,2427],[6882,2464],[6937,2501],[6992,2539],[7049,2572],[7114,2587],[7179,2601],[7245,2615],[7310,2624],[7375,2611],[7441,2599],[7506,2586],[7572,2574],[7623,2537],[7668,2488],[7714,2438],[7759,2389],[7804,2340],[7837,2284],[7864,2223],[7891,2162],[7917,2100],[7921,2034],[7926,1967],[7930,1901],[7935,1834],[7940,1768],[7944,1701],[7949,1635],[7955,1569],[7985,1509],[8014,1449],[8044,1390],[8098,1354],[8157,1323],[8216,1292],[8275,1261],[8340,1246],[8405,1235],[8471,1224],[8537,1212],[8602,1201],[8668,1190],[8734,1179],[8800,1168],[8865,1157],[8931,1145],[8997,1134],[9062,1123],[9128,1112],[9194,1101],[9260,1089],[9325,1078],[9391,1067],[9457,1056],[9522,1045],[9588,1033],[9654,1022],[9720,1011],[9785,1000],[9851,989],[9917,977],[9983,966],[10048,955],[10113,947],[10169,983],[10226,1019],[10219,1083],[10207,1148],[10196,1214],[10150,1262],[10104,1310],[10057,1358],[10011,1406],[9965,1454],[9918,1502],[9884,1559],[9851,1617],[9818,1675],[9785,1733],[9752,1791],[9719,1849],[9686,1907],[9656,1966],[9641,2031],[9638,2096],[9653,2161],[9688,2212],[9741,2253],[9802,2270],[9867,2266],[9915,2219],[9959,2170],[9996,2114],[10033,2059],[10070,2003],[10107,1948],[10144,1893],[10181,1837],[10219,1782],[10267,1736],[10328,1726],[10388,1748],[10444,1785],[10499,1822],[10555,1859],[10610,1896],[10666,1933],[10721,1970],[10756,2024],[10768,2086],[10743,2148],[10699,2194],[10643,2230],[10587,2266],[10530,2301],[10474,2337],[10418,2373],[10361,2408],[10305,2444],[10249,2480],[10193,2516],[10136,2551],[10080,2587],[10024,2623],[9967,2658],[9911,2694],[9855,2730],[9799,2766],[9742,2801],[9686,2837],[9630,2873],[9573,2908],[9517,2944],[9461,2980],[9404,3016],[9348,3051],[9292,3087],[9236,3123],[9179,3158],[9123,3194],[9067,3230],[9005,3254],[8941,3271],[8877,3288],[8812,3305],[8748,3322],[8683,3339],[8617,3340],[8550,3339],[8483,3338],[8417,3337],[8350,3336],[8283,3335],[8217,3334],[8150,3333],[8083,3332],[8017,3331],[7950,3330],[7883,3329],[7817,3327],[7750,3326],[7683,3325],[7617,3324],[7552,3311],[7490,3288],[7427,3265],[7364,3242],[7302,3220],[7239,3197],[7176,3174],[7114,3151],[7051,3129],[6988,3106],[6927,3080],[6869,3049],[6810,3017],[6751,2985],[6693,2953],[6634,2921],[6576,2889],[6517,2857],[6459,2825],[6400,2793],[6342,2762],[6283,2729],[6227,2694],[6170,2658],[6114,2623],[6057,2588],[6001,2552],[5944,2517],[5888,2482],[5831,2446],[5775,2411],[5718,2376],[5664,2337],[5614,2293],[5565,2248],[5502,2227],[5437,2215],[5371,2213],[5306,2221],[5247,2251],[5203,2300],[5148,2335],[5086,2361],[5020,2366],[4953,2371],[4888,2357],[4827,2331],[4772,2295],[4732,2242],[4709,2180],[4701,2114],[4694,2048],[4682,1982],[4640,1931],[4590,1887],[4537,1846],[4484,1806],[4432,1765],[4379,1725],[4326,1684],[4273,1644],[4220,1603],[4167,1563],[4114,1522],[4061,1482],[4008,1441],[3955,1401],[3902,1360],[3849,1319],[3796,1279],[3743,1238],[3691,1198],[3638,1157],[3585,1117],[3532,1076],[3479,1036],[3426,995],[3373,955],[3320,914],[3267,874],[3207,844],[3146,821],[3079,817],[3013,816],[2947,826],[2883,842],[2824,874],[2770,912],[2717,953],[2665,995],[2613,1036],[2561,1077],[2508,1119],[2456,1160],[2404,1202],[2390,1216],[2342,1262],[2294,1309],[2246,1355],[2199,1402],[2151,1448],[2112,1502],[2089,1564],[2085,1629],[2095,1695],[2114,1758],[2117,1824],[2105,1890],[2082,1952],[2049,2009],[2006,2060],[1962,2111],[1919,2162],[1876,2213],[1833,2263],[1790,2314],[1746,2365],[1703,2416],[1660,2467],[1617,2517],[1574,2568],[1512,2579],[1445,2579],[1379,2579],[1314,2563],[1250,2544],[1193,2568],[1138,2606],[1084,2644],[1055,2702],[1034,2765],[1013,2828],[992,2892],[971,2955],[962,3020],[962,3087],[962,3153],[962,3220],[962,3287],[962,3353],[962,3420],[962,3487],[962,3553],[962,3620],[962,3687],[962,3753],[962,3820],[962,3887],[977,3950],[1004,4011],[1030,4073],[1056,4134],[1083,4195],[1109,4256],[1128,4319],[1134,4386],[1140,4452],[1128,4513],[1084,4563],[1027,4588],[960,4588],[893,4587],[840,4549],[787,4508],[735,4467],[682,4426],[630,4384],[577,4343],[525,4302],[472,4261],[419,4221],[367,4180],[314,4139],[261,4098],[209,4057],[156,4016],[103,3975],[69,3920],[40,3860],[58,3798],[83,3736],[128,3689],[178,3645],[229,3601],[255,3541],[279,3478],[303,3416],[327,3354],[339,3289],[346,3223],[353,3156],[360,3090],[368,3024],[375,2957],[382,2891],[411,2831],[440,2771],[469,2711],[498,2651],[527,2591],[555,2531],[584,2471],[613,2410],[641,2350],[679,2295],[718,2241],[756,2187],[795,2132],[834,2078],[873,2024],[912,1970],[951,1916],[991,1862],[1030,1808]];
const TRACK_WIDTH = 250;
const MINI_TRACK_SIZE = 400;
const MINI_TRACK_MARGIN_X = 10;
const MINI_TRACK_MARGIN_Y = -200;

const TRACK_LAPS = 0.1;
for (let i = 0; i < TRACK_LAPS - 1; i++) {
  document.querySelector("#ends").innerHTML += "<div></div>";
}

let otherPlayers = [];

const RECORD_INTERVAL = 500;
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
  max_rotation_speed: 0.3,
  rotation_acceleration : 0.002,
  rotation_friction: 0.002,
  acceleration: 0.0005,
  max_speed: 0.65,
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
let startReturningToTrack = 0;
let timer = 0;
let startCountdown = 7;

let scoreboard = [];
let recorded = [];
let playerName = "TabouretSoyeux";
let trackPos = 0;
let position = 1;

let gameStarted = false;
let gameStartedAt = 0;
let gameEnded = false;
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

function timerToText(timer) {
  const minutes = Math.floor(timer / 60000);
  const seconds = Math.floor(timer / 1000) % 60;
  const millis = Math.floor(timer) % 1000;
  const minutesText = (minutes < 10 ? "0" : "") + minutes;
  const secondsText = (seconds < 10 ? "0" : "") + seconds;
  const millisText = (millis < 100 ? "0" : "") + (millis < 10 ? "0" : "") + millis;
  return `${minutesText}:${secondsText}.${millisText}`;
}

function returnToTrack(point, restart = true) {
  isReturningToTrack = false;
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
  if (!restart) {
    return;
  }
  setTimeout(() => {
    car.running = true;
  }, 500);
}
returnToTrack(0, false);
recorded.push({
  x: car.x,
  y: car.y,
  r: car.rotation,
  p: trackPos
});

function calcPlace() {
  let place = 0;
  for (let i of scoreboard) {
    if (i < timer) {
      place++;
    }
  }
  return place;
}

function endGame() {
  let place = calcPlace();
  localStorage.setItem("place", place);
  if (place < 10) {
    document.dispatchEvent(new CustomEvent("add-scoreboard", {
      detail: {
        place: place,
        name: playerName,
        recorded: recorded,
        time: timer
      }
    }));
  }
  setTimeout(() => {
    //window.location = "end.html";
  }, 2000);
}
//endregion

//region Loop variables
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
let camOffsetX, camOffsetY;
let isTooFar = false;
let nextSecond = Date.now() + 1000;
let frameCounter = 0;
let deltaTime = 1;
let nextRecord = 0;
//endregion
setInterval(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  //region Deltatime
  if (Date.now() < nextSecond) {
    frameCounter++;
  } else {
    deltaTime = 1000 / frameCounter;
    nextSecond = Date.now() + 1000;
    frameCounter = 0;
  }
  const deltaTimeSquare = deltaTime ** 2;
  //endregion

  //region Timer
  if (gameStarted) {
    timer = Date.now() - gameStartedAt;
  }
  //endregion

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
  if (Math.abs(car.groundFriction - gftarget) <= GROUND_DECELERATION * deltaTimeSquare) {
    car.groundFriction = gftarget;
  } else {
    car.groundFriction += GROUND_DECELERATION * (car.groundFriction < gftarget ? 1 : -1) * deltaTimeSquare;
  }
  //endregion

  //region rotation
  car.rVelocity += car.rotation_acceleration * car.direction * deltaTimeSquare;
  car.rVelocity = Math.max(Math.min(car.rVelocity, car.max_rotation_speed * deltaTime), -car.max_rotation_speed * deltaTime);
  //endregion

  //region rotation friction
  if (car.direction === 0 || car.running === false) {
    if (Math.abs(car.rVelocity) <= car.rotation_friction * deltaTimeSquare) {
      car.rVelocity = 0;
    } else {
      car.rVelocity += car.rotation_friction * (car.rVelocity > 0 ? -1 : 1) * deltaTimeSquare;
    }
  }
  car.rotation += car.rVelocity / car.groundFriction;
  //endregion

  //region speed
  //region target velocity
  car.xTargetVelocity = Math.sin(car.rotation * (Math.PI/180)) * car.max_speed * car.running * deltaTime;
  car.yTargetVelocity = Math.cos(car.rotation * (Math.PI/180)) * car.max_speed * car.running * -1 * deltaTime;
  //endregion

  //region actual velocity
  if (Math.abs(car.xTargetVelocity - car.xVelocity) <= car.acceleration * deltaTimeSquare) {
    car.xVelocity = car.xTargetVelocity;
  } else {
    car.xVelocity += car.acceleration * (car.xTargetVelocity > car.xVelocity ? 1 : -1) * deltaTimeSquare;
  }
  if (Math.abs(car.yTargetVelocity - car.yVelocity) <= car.acceleration * deltaTimeSquare) {
    car.yVelocity = car.yTargetVelocity;
  } else {
    car.yVelocity += car.acceleration * (car.yTargetVelocity > car.yVelocity ? 1 : -1) * deltaTimeSquare;
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
  camera.speed = car.max_speed * deltaTime;

  const camVelocityX = (camera.target.x - camera.x) / camera.range_radius * camera.speed;
  const camVelocityY = (camera.target.y - camera.y) / camera.range_radius * camera.speed;

  camera.x += camVelocityX;
  camera.y += camVelocityY;
  //endregion

  //region Return to track
  isTooFar = Math.sqrt((TRACK[trackPos][0] - car.x)**2 + (TRACK[trackPos][1] - car.y)**2) > TRACK_WIDTH * 1.5;
  if (isReturningToTrack && timeRemainingToTrack > 0) {
    timeRemainingToTrack = BACK_TO_TRACK_TIME - (Date.now() - startReturningToTrack)
    if (timeRemainingToTrack === 0) {
      const point = (trackPos - 5) % TRACK.length;
      returnToTrack(point);
    }
  } else {
    timeRemainingToTrack = BACK_TO_TRACK_TIME;
    startReturningToTrack = Date.now();
  }
  //endregion

  //region Draw
  //region Camera
  const camAdditionalX = camVelocityX * -camera.range_radius / camera.speed * 2;
  const camAdditionalY = camVelocityY * -camera.range_radius / camera.speed * 2;
  camOffsetX = -camera.x + camAdditionalX + canvas.clientWidth / 2;
  camOffsetY = -camera.y + camAdditionalY + canvas.height / 2;
  //endregion

  //region Track
  ctx.strokeStyle = "#4e5b5d";
  ctx.lineWidth  = TRACK_WIDTH;
  ctx.beginPath();
  ctx.moveTo(TRACK[0][0] + camOffsetX, TRACK[0][1] + camOffsetY);
  for (let point of TRACK) {
    ctx.lineTo(point[0] + camOffsetX, point[1] + camOffsetY);
  }
  ctx.closePath();
  ctx.stroke();
  //endregion

  //region Others
  for (let player of otherPlayers) {
    const recordedIndex = Math.floor(timer / 500);
    if (recordedIndex < player.length - 1) {
      // car
      const interpolation = (timer % 500) / 500;
      const recordX = player[recordedIndex].x + (player[recordedIndex + 1].x - player[recordedIndex].x) * interpolation;
      const recordY = player[recordedIndex].y + (player[recordedIndex + 1].y - player[recordedIndex].y) * interpolation;
      const recordR = player[recordedIndex].r + (player[recordedIndex + 1].r - player[recordedIndex].r) * interpolation;
      ctx.translate(recordX + camOffsetX, recordY + camOffsetY);
      ctx.rotate(recordR * (Math.PI / 180));
      ctx.drawImage(CAR_SPRITE, -car.width / 2, -car.height / 2, car.width, car.height);
      ctx.rotate(-recordR * (Math.PI / 180));
      ctx.translate(-recordX - camOffsetX, -recordY - camOffsetY);
    }
  }
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
  document.querySelector("#time").innerHTML = timerToText(timer);
  document.querySelector("#position").innerHTML = position.toString();
  document.querySelector("#position-suffix").innerHTML = "th";
  if (position === 1) {
    document.querySelector("#position-suffix").innerHTML = "st";
  }
  if (position === 2) {
    document.querySelector("#position-suffix").innerHTML = "nd";
  }
  if (position === 3) {
    document.querySelector("#position-suffix").innerHTML = "rd";
  }

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
  //region Others
  ctx.fillStyle = "yellow";
  position = 1;
  for (let player of otherPlayers) {
    const recordedIndex = Math.floor(timer / 500);
    if (recordedIndex < player.length - 1) {
      ctx.beginPath();
      ctx.arc(TRACK[player[recordedIndex].p % TRACK.length][0] / miniTrackMul + MINI_TRACK_MARGIN_X, TRACK[player[recordedIndex].p % TRACK.length][1] / miniTrackMul + canvas.height - MINI_TRACK_SIZE - MINI_TRACK_MARGIN_Y, 5, 0, 2 * Math.PI);
      ctx.fill();
      if (player[recordedIndex].p > trackPos + laps * TRACK.length) {
        position++;
      }
    }
  }
  //endregion
  // position
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(TRACK[trackPos][0] / miniTrackMul + MINI_TRACK_MARGIN_X, TRACK[trackPos][1] / miniTrackMul + canvas.height - MINI_TRACK_SIZE - MINI_TRACK_MARGIN_Y, 5, 0, 2 * Math.PI);
  ctx.fill();
  //endregion

  //region Back to track
  document.querySelector("#back-to-track").style.display = isTooFar ? "block": "none";
  ctx.strokeStyle = "red";
  ctx.lineWidth = canvas.width / 60;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 60, 0, 2 * Math.PI * (1 - (timeRemainingToTrack / BACK_TO_TRACK_TIME)));
  ctx.stroke();
  //endregion

  //region Progress bar
  const pos = laps * TRACK.length + trackPos;
  const normalizedPos = pos / (TRACK.length * TRACK_LAPS) * 100;
  if (normalizedPos >= 100 && !gameEnded) {
    car.running = false;
    gameEnded = true;
    endGame();
  }
  if (!gameEnded) {
    document.querySelector("#progression").style.width = `${normalizedPos}%`;
  }
  //endregion
  //endregion

  //region Debug
  if (DEBUG_MODE) {
    // Velocity
    ctx.lineWidth = 2;
    const mul = 100 / (car.max_speed * deltaTime);
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

  //region Record
  if (timer >= nextRecord && !gameEnded) {
    nextRecord += RECORD_INTERVAL;
    recorded.push({
      x: car.x,
      y: car.y,
      r: car.rotation,
      p: trackPos + laps * TRACK.length
    });
  }
  //endregion
}, 0);

function startTimer() {
  startCountdown--;
  document.querySelector("#start-countdown").src = `./images/lights-${startCountdown}.png`;
  if (startCountdown <= 0) {
    car.running = true;
    gameStarted = true;
    gameStartedAt = Date.now();
    setTimeout(() => {
      document.querySelector("#start-countdown").style.display = "none";
    }, 2000);
  } else {
    setTimeout(startTimer, 1000);
  }
}
startTimer();

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyA" && gameStarted) {
    car.direction = -1;
  }
  if (e.code === "KeyD" && gameStarted) {
    car.direction = 1;
  }
  if (e.code === "Space") {
    startCountdown = 1;
  }
  if (e.code === "KeyX" && isTooFar) {
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