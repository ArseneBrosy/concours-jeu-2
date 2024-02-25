import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

let lastShowedUserUID;

const firebaseConfig = {
  databaseURL: "https://drifting-race-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

onValue(ref(database, CURRENT_TRACK), (snapshot) => {
  const value = snapshot.val();
  for (let player of Object.values(value)) {
    otherPlayers.push(player.playback);
  }
});

function addPlayerToScoreBoard(playerName, recorded, time) {
  set(ref(database, `${CURRENT_TRACK}/${playerName}`), {
    playback: recorded,
    time: time
  });
}