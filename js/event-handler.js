import { pointer } from "./canvas.js";
import { partialRender, pointerRender } from "./grid-generator.js";
import { run as runUI } from "./ui-handler.js";
import initStyle from "./style.js";
// init event
export function init() {
  console.log(window.navigator.userAgentData);
  // register event listener for prevent context menu
  addEventListener("resize", (e) => {
    if (screen.width < screen.height) return;
    initStyle();
    e.stopPropagation();
    e.preventDefault();
  });
  pointer.addEventListener("contextmenu", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  // register event listener for canvas element
  window.addEventListener("mouseup", (e) => {
    // render just one part of the grid
    runUI(e);
    e.stopPropagation();
    e.preventDefault();
  });
  if (!navigator.userAgentData.mobile) {
    // register event listener for canvas element
    pointer.addEventListener("mousedown", (e) => {
      // render just one part of the grid
      e.stopPropagation();
      e.preventDefault();
      console.log(e);

      partialRender(e, false, false);
    });
    // register event listener for canvas element
    pointer.addEventListener("mousemove", (e) => {
      // render just one part of the grid
      e.stopPropagation();
      e.preventDefault();
      pointerRender(e);
    });
    return;
  }
  let holding = null;
  let isCancel = false;
  let isDown = false;
  pointer.addEventListener("touchstart", (e) => {
    // render just one part of the grid
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    isDown = true;
    holding = setTimeout(() => {
      partialRender(e, true, true);
      isCancel = true;
    }, 300);
  });
  // register event listener for canvas element
  // if (isCancel) return;
  pointer.addEventListener("touchend", (e) => {
    // render just one part of the grid
    clearTimeout(holding);
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    isDown = false;
    if (isCancel) {
      isCancel = false;
      return;
    }
    partialRender(e, false, true);
  });
  pointer.addEventListener("touchmove", (e) => {
    clearTimeout(holding);
    // render just one part of the grid
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    if (isDown) isCancel = true;
    pointerRender(e, false, true);
  });
}
