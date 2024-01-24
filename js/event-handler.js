import { main as canvas } from "./canvas.js";
export function init() {
  canvas.addEventListener("click", (e) => {
    console.log(e);
  });
}
