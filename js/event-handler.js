import { main as canvas } from "./canvas.js";
import { partialRender } from "./grid-generator.js";
export function init() {
  canvas.addEventListener("click", (e) => {
    partialRender(e);
  });
}
