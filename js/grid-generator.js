import Config from "./config.js";
import * as Canvas from "./canvas.js";
const gridWidth = Canvas.main.width / Config.size;
const ctx = Canvas.ctx;
export function renderAll() {
  let checkeredFlag = false;
  for (let i = 0; i < Config.size; i++) {
    for (let j = 0; j < Config.size; j++) {
      let index = Config.size * i + j;
      checkeredFlag = autoCheckeredGrid(checkeredFlag, Config.size, index);
      ctx.beginPath();
      ctx.fillStyle = checkeredFlag ? "#24A7C3" : "#11D4FF";
      ctx.fillRect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
      ctx.rect(gridWidth * j, gridWidth * i, gridWidth, gridWidth);
    }
  }
}
export function partialRender(event) {
  let y = Math.floor(event.offsetX / (event.target.offsetHeight / Config.size));
  let x = Math.floor(event.offsetY / (event.target.offsetHeight / Config.size));
  let index = Config.size * y + x;
  let checkeredFlag;
  checkeredFlag = autoCheckeredGrid(checkeredFlag, Config.size, index);
  ctx.beginPath();
  ctx.fillStyle = checkeredFlag ? "#D2D2D2" : "#E1E0E0";
  ctx.fillRect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
  ctx.rect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
  // console.log(x + "-" + y + " grid" + gridWidth);
  // console.log(Canvas.main.width / Config.size);
  // console.log(event);
}

function autoCheckeredGrid(currentCheckeredFlag, size, index) {
  if (size % 2 == 0) {
    if (Math.floor(index / size) % 2 == 0) {
      return (currentCheckeredFlag = index % 2 == 0);
    } else {
      return (currentCheckeredFlag = index % 2 != 0);
    }
  } else {
    return (currentCheckeredFlag = index % 2 != 0);
  }
}
