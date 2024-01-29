import { init } from "./grid-data.js";
import { renderAll } from "./grid-generator.js";
import { gameOverScreen } from "./canvas.js";
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
