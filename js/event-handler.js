import { main as canvas } from "./canvas.js";
import { partialRender } from "./grid-generator.js";
// init event
export function init() {
  // register event listener for canvas element
  canvas.addEventListener("click", (e) => {
    // render just one part of the grid
    partialRender(e);
  });
}
