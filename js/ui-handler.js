import { init, Status } from "./grid-data.js";
import { renderAll } from "./grid-generator.js";
import { gameOverScreen, settingsScreen } from "./canvas.js";
import Config from "./config.js";
import * as Canvas from "./canvas.js";
export function run(e) {
  if (e.target.id == "play-again") {
    reload();
    disappearGameOverUI();
  } else if (e.target.id == "set-btn") {
    enableSettingsScreenUI();
  } else if (e.target.id == "apply-set-btn") {
    updateSettings();
  }
  console.log(e);
}

function reload() {
  init();
  renderAll();
}
function disappearGameOverUI() {
  gameOverScreen.style.display = "none";
}
function enableSettingsScreenUI() {
  document.getElementById("grid-size").value = Config.size;
  document.getElementById("bomb-count").value = Config.bomCount;
  settingsScreen.style.display = "flex";
}
function disableSettingsScreenUI() {
  settingsScreen.style.display = "none";
}
function updateSettings() {
  disableSettingsScreenUI();
  Config.size = parseInt(document.getElementById("grid-size").value);
  Config.bomCount = parseInt(document.getElementById("bomb-count").value);
  reload();
}
export function lose() {
  Canvas.gameOverScreen.style.display = "flex";
  Canvas.gameOverOption.innerHTML = "You lose.";
  stopTimer();
}
export function win() {
  Canvas.gameOverScreen.style.display = "flex";
  Canvas.gameOverOption.innerHTML = "You won.";
  stopTimer();
}
export function updateFlagMenu() {
  Canvas.flag.innerHTML = Status.flagCount;
}
let timer = null;
export function startTimer() {
  Status.time = 0;
  console.log("timerOn");
  timer = setInterval(() => {
    Status.time += 0.01;
    let num = "" + Status.time.toFixed(2).toString();
    let str = num.replace(".", "");
    Canvas.timer.innerHTML = str;
  }, 1000);
}
export function stopTimer() {
  Status.isTimer = false;
  clearInterval(timer);
}
