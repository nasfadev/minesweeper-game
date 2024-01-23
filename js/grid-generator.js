import Config from "./config.js";
import * as Canvas from "./canvas.js";
const gridWidth = Canvas.main.width / Config.size;
const ctx = Canvas.ctx;
export function renderAll() {
  let chekeredFlag = false;
  for (let i = 0; i < Config.size; i++) {
    chekeredFlag = chekeredFlag ? false : true;
    for (let j = 0; j < Config.size; j++) {
      ctx.beginPath();
      ctx.fillStyle = chekeredFlag ? "#24A7C3" : "#11D4FF";
      ctx.fillRect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
      ctx.rect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
      chekeredFlag = chekeredFlag ? false : true;
    }
  }
}
