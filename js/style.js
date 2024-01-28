import { main as canvas, pointer } from "./canvas.js";
const size = minSize();
export default function init() {
  responsiveCanvas();
}
function responsiveCanvas() {
  console.log("screen" + screen.width + "view" + visualViewport.width);
  canvas.style.width = size + "px";
  canvas.style.height = size + "px";
  pointer.style.width = size + "px";
  pointer.style.height = size + "px";
  console.log(canvas.style.width);
}
function minSize() {
  return visualViewport.height > visualViewport.width
    ? visualViewport.width
    : visualViewport.height;
}
