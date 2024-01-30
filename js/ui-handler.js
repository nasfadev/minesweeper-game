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
}
export function win() {
  Canvas.gameOverScreen.style.display = "flex";
  Canvas.gameOverOption.innerHTML = "You won.";
}
export function updateFlagMenu() {
  Canvas.flag.innerHTML = Status.flagCount;
}
