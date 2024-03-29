import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue, set} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

let lastShowedUserUID;

const firebaseConfig = {
  databaseURL: "https://drifting-race-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
let currentTrack = [];
let gotValues = false;

onValue(ref(database, CURRENT_TRACK), (snapshot) => {
  if (gotValues) {
    return;
  }
  gotValues = true;

  const value = snapshot.val();
  if (value === null) {
    return;
  }
  for (let player of Object.values(value)) {
    otherPlayers.push(player.playback);
    scoreboard.push(player.time);
  }
  currentTrack = value;
});

function getTodayDate() {
  const today = new Date();
  const day = (today.getDate() < 10 ? "0" : "") + today.getDate();
  const month = (today.getMonth() + 1 < 10 ? "0" : "") + (today.getMonth() + 1);
  return `${day}.${month}.${today.getFullYear()}`;
}

function addPlayerToScoreBoard(place, playerName, recorded, time) {
  set(ref(database, `${CURRENT_TRACK}/${place}`), {
    name: playerName,
    playback: recorded,
    time: time,
    date: getTodayDate()
  });
}

document.addEventListener("add-scoreboard", (e) => {
  let scoreboardLength = Object.keys(currentTrack).length;
  for (let i = scoreboardLength - (scoreboardLength < 10 ? 0 : 1); i > e.detail.place; i--) {
    addPlayerToScoreBoard(i, currentTrack[i - 1].name, currentTrack[i - 1].playback, currentTrack[i - 1].time);
  }
  addPlayerToScoreBoard(e.detail.place, e.detail.name, e.detail.recorded, e.detail.time);
});