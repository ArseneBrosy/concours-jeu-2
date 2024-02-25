import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://drifting-race-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const CURRENT_TRACK = "monaco";

function timerToText(timer) {
  const minutes = Math.floor(timer / 60000);
  const seconds = Math.floor(timer / 1000) % 60;
  const millis = Math.floor(timer) % 1000;
  const minutesText = (minutes < 10 ? "0" : "") + minutes;
  const secondsText = (seconds < 10 ? "0" : "") + seconds;
  const millisText = (millis < 100 ? "0" : "") + (millis < 10 ? "0" : "") + millis;
  return `${minutesText}:${secondsText}.${millisText}`;
}

onValue(ref(database, CURRENT_TRACK), (snapshot) => {
  const value = snapshot.val();
  let index = 0;
  let me = parseInt(localStorage.getItem("place"));
  document.querySelector("#scoreboard").innerHTML = "";
  for (let player of Object.values(value)) {
    document.querySelector("#scoreboard").innerHTML += `<div class="line${index === me ? " me" : ""}"><div class="place"><p></p></div><div class="name"><p>${player.name}</p></div><div class="time"><p>${timerToText(player.time)}</p></div></div>`;
    index++;
  }
});