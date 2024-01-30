import { init, Status } from "./grid-data.js";
import { renderAll } from "./grid-generator.js";
import { gameOverScreen } from "./canvas.js";
import * as Canvas from "./canvas.js";
export function run(e) {
  if (e.target.id == "play-again") {
    reload();
    disappearGameOverUI();
  }
}

function reload() {
  init();
  renderAll();
}
function disappearGameOverUI() {
  gameOverScreen.style.display = "none";
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
