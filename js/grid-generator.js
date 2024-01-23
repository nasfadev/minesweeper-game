import Config from "./config.js";

const mainCanvas = document.getElementById("main-canvas");
const ctx = mainCanvas.getContext("2d", { alpha: false });
const gridWidth = mainCanvas.width / Config.size;
export function renderAll() {
  for (let i = 0; i < Config.size; i++) {
    for (let j = 0; j < Config.size; j++) {
      ctx.beginPath();
      ctx.fillStyle = "blue";
      ctx.fillRect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
      ctx.rect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
      ctx.fillStyle = "black";
      ctx.stroke();
    }
    console.log(i);
  }
}
