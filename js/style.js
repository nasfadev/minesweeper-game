import { screen } from "./canvas.js";
export default function init() {
  responsiveCanvas();
}
function responsiveCanvas() {
  console.log("screen" + screen.width + "view" + visualViewport.width);
  screen.style.width = minSize() + "px";
  screen.style.height = minSize() + "px";
}
function minSize() {
  return visualViewport.height > visualViewport.width
    ? visualViewport.width
    : visualViewport.height;
}
