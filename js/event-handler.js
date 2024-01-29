import { pointer, gameOverScreen } from "./canvas.js";
import { partialRender, pointerRender } from "./grid-generator.js";
import { run as runUI } from "./ui-handler.js";
// init event
export function init() {
  // register event listener for prevent context menu
  pointer.addEventListener("contextmenu", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  // register event listener for canvas element
  gameOverScreen.addEventListener("mouseup", (e) => {
    // render just one part of the grid
    runUI(e);
    e.stopPropagation();
    e.preventDefault();
  });
  // register event listener for canvas element
  pointer.addEventListener("mouseup", (e) => {
    // render just one part of the grid
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    partialRender(e);
  });
  // register event listener for canvas element
  pointer.addEventListener("mousemove", (e) => {
    // render just one part of the grid
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    pointerRender(e);
  });
}
