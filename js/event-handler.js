import { screen } from "./canvas.js";
import { partialRender, pointerRender } from "./grid-generator.js";
// init event
export function init() {
  // register event listener for prevent context menu
  screen.addEventListener("contextmenu", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  // register event listener for canvas element
  screen.addEventListener("mouseup", (e) => {
    // render just one part of the grid
    console.log(e);
    partialRender(e);
    e.stopPropagation();
    e.preventDefault();
  });
  // register event listener for canvas element
  screen.addEventListener("mousemove", (e) => {
    // render just one part of the grid
    console.log(e);
    pointerRender(e);
    e.stopPropagation();
    e.preventDefault();
  });
}
