document.querySelector("#pseudo").value = localStorage.getItem("pseudo");

document.querySelector("#pseudo").addEventListener("input", (e) => {
  if (e.target.value === "") {
    localStorage.removeItem("pseudo");
    return;
  }
  localStorage.setItem("pseudo", e.target.value);
});

document.querySelector("#play").addEventListener("click", (e) => {
  document.querySelector("#pseudo-error").style.display = "none";
  document.querySelector("#pseudo").classList.remove("error");
  if (!localStorage.hasOwnProperty("pseudo")) {
    document.querySelector("#pseudo-error").innerHTML = "You have to choose a pseudo";
    document.querySelector("#pseudo-error").style.display = "block";
    document.querySelector("#pseudo").classList.add("error");
    return;
  }
  window.location.href = "game.html";
});