import { main as canvas } from "./canvas.js";
import { partialRender } from "./grid-generator.js";
// init event
export function init() {
  // register event listener for prevent context menu
  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  // register event listener for canvas element
  canvas.addEventListener("mouseup", (e) => {
    // render just one part of the grid
    console.log(e);
    partialRender(e);
    e.preventDefault();
  });
}
