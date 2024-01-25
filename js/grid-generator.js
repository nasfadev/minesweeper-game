import Config, { Theme } from "./config.js";
import * as Canvas from "./canvas.js";
import { datas as gridDatas } from "./grid-data.js";
const gridWidth = Canvas.main.width / Config.size;
const ctx = Canvas.ctx;
// function for render all grid in the canvas
export function renderAll() {
  let checkeredFlag = false;
  // this iterator for making grid in the canvas by using config.size for looping count
  for (let i = 0; i < Config.size; i++) {
    // this iterator for making grid in the canvas by using config.size for looping count
    for (let j = 0; j < Config.size; j++) {
      let index = Config.size * i + j;
      checkeredFlag = autoCheckeredGrid(checkeredFlag, Config.size, index);
      drawGrid(checkeredFlag, true, i, j);
    }
  }
}
// for render one part
export function partialRender(event) {
  let y = Math.floor(event.offsetX / (event.target.offsetHeight / Config.size));
  let x = Math.floor(event.offsetY / (event.target.offsetHeight / Config.size));
  let index = Config.size * x + y;
  let checkeredFlag;
  checkeredFlag = autoCheckeredGrid(checkeredFlag, Config.size, index);
  if (event.button === 2) {
    if (gridDatas[index].isTouched) {
      return;
    }
    if (gridDatas[index].isFlag) {
      drawGrid(checkeredFlag, true, x, y);
      gridDatas[index].isFlag = false;
      return;
    }
    drawImageInGrid(Theme.flagIconUrl, Theme.flagIconSize, x, y);
    gridDatas[index].isFlag = true;
    return;
  } else if (event.button === 0) {
    if (gridDatas[index].isFlag) {
      return;
    }
    drawGrid(checkeredFlag, false, x, y);
    gridDatas[index].isTouched = true;
    if (gridDatas[index].isBom) {
      drawImageInGrid(Theme.boomIconUrl, Theme.boomIconSize, x, y);
      return;
    }
    if (gridDatas[index].nearestBomCount > 0) {
      let fontSize = Theme.defaultFontSize / Config.size;
      ctx.font = fontSize + "px Arial";
      ctx.textAlign = "center";
      ctx.textContent = "center";
      ctx.fillStyle = "black";
      ctx.fillText(
        `${gridDatas[index].nearestBomCount}`,
        gridWidth * y + gridWidth / 2,
        gridWidth * x + gridWidth / 2 + fontSize / 2.5
      );
    }
  }
  console.log(gridDatas[index]);
}
function drawGrid(checkeredFlag, isFill, x, y) {
  ctx.beginPath();
  if (isFill) {
    ctx.fillStyle = checkeredFlag ? "#24A7C3" : "#11D4FF";
  } else {
    ctx.fillStyle = checkeredFlag ? "#D2D2D2" : "#E1E0E0";
  }
  ctx.fillRect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
  ctx.rect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
}
function drawImageInGrid(imageUrl, imageSize, x, y) {
  const image = new Image();
  image.src = imageUrl;
  image.onload = () =>
    ctx.drawImage(
      image,
      gridWidth * y + gridWidth / 2 - (gridWidth * imageSize) / 2,
      gridWidth * x + gridWidth / 2 - (gridWidth * imageSize) / 2,
      gridWidth * imageSize,
      gridWidth * imageSize
    );
}
// for make automatic checkered style depend on the grid size in config and some parameter
function autoCheckeredGrid(currentCheckeredFlag, size, index) {
  // check number in size is even or odd
  if (size % 2 == 0) {
    // check index divided by size is even or odd
    if (Math.floor(index / size) % 2 == 0) {
      // if index is even return true
      return (currentCheckeredFlag = index % 2 == 0);
    } else {
      // if index is even return false
      return (currentCheckeredFlag = index % 2 != 0);
    }
  } else {
    // if index is even return false
    return (currentCheckeredFlag = index % 2 != 0);
  }
}
