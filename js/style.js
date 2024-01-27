import { main as canvas } from "./canvas.js";
export default function init() {
  responsiveCanvas();
}
function responsiveCanvas() {
  console.log("screen" + screen.width + "view" + visualViewport.width);
  canvas.style.width = minSize() + "px";
  canvas.style.height = minSize() + "px";
  console.log(canvas.style.width);
}
function minSize() {
  return visualViewport.height > visualViewport.width
    ? visualViewport.width
    : visualViewport.height;
}
