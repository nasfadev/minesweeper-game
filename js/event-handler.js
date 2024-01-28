import { pointer } from "./canvas.js";
import { partialRender, pointerRender } from "./grid-generator.js";
// init event
export function init() {
  // register event listener for prevent context menu
  pointer.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  // register event listener for canvas element
  pointer.addEventListener("mouseup", (e) => {
    // render just one part of the grid
    console.log(e);
    partialRender(e);
    e.preventDefault();
  });
  // register event listener for canvas element
  pointer.addEventListener("mousemove", (e) => {
    // render just one part of the grid
    console.log(e);
    pointerRender(e);
    e.preventDefault();
  });
}
