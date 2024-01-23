import Config from "./config.js";
import * as Canvas from "./canvas.js";
const gridWidth = Canvas.main.width / Config.size;
const ctx = Canvas.ctx;
export function renderAll() {
  let checkeredFlag = false;
  for (let i = 0; i < Config.size; i++) {
    checkeredFlag = checkeredFlag ? false : true;
    for (let j = 0; j < Config.size; j++) {
      ctx.beginPath();
      ctx.fillStyle = checkeredFlag ? "#24A7C3" : "#11D4FF";
      ctx.fillRect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
      ctx.rect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
      checkeredFlag = checkeredFlag ? false : true;
    }
  }
}
