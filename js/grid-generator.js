import Config, { Theme } from "./config.js";
import * as Canvas from "./canvas.js";
import {
  datas as gridDatas,
  getNearestGridIndex,
  bombIndexs,
} from "./grid-data.js";
const gridWidth = Canvas.main.width / Config.size;
const ctx = Canvas.ctx;
const ptrCtx = Canvas.ptrCtx;
// function for render all grid in the canvas
export function renderAll() {
  // this iterator for making grid in the canvas by using config.size for looping count
  for (let i = 0; i < Config.size; i++) {
    // this iterator for making grid in the canvas by using config.size for looping count
    for (let j = 0; j < Config.size; j++) {
      let index = Config.size * i + j;
      let checkeredFlag = autoCheckeredGrid(Config.size, index);
      drawGrid(checkeredFlag, true, i, j);
    }
  }
}
export function pointerRender(event) {
  let y = Math.floor(event.offsetX / (event.target.offsetHeight / Config.size));
  let x = Math.floor(event.offsetY / (event.target.offsetHeight / Config.size));
  ptrCtx.clearRect(0, 0, 2048, 2048);
  drawPointer(x, y);
}
// for render one part
export function partialRender(event) {
  let y = Math.floor(event.offsetX / (event.target.offsetHeight / Config.size));
  let x = Math.floor(event.offsetY / (event.target.offsetHeight / Config.size));
  let index = Config.size * x + y;
  let checkeredFlag = autoCheckeredGrid(Config.size, index);
  if (event.button === 2) {
    if (gridDatas[index].isTouched) return;
    if (gridDatas[index].isFlag) {
      drawGrid(checkeredFlag, true, x, y);
      gridDatas[index].isFlag = false;
      return;
    }
    drawImageInGrid(Theme.flagIconUrl, Theme.flagIconSize, x, y);
    gridDatas[index].isFlag = true;
    return;
  } else if (event.button === 0) {
    if (gridDatas[index].isFlag) return;

    drawGrid(checkeredFlag, false, x, y);
    gridDatas[index].isTouched = true;
    if (gridDatas[index].isBom) {
      showAllBombs();
      return;
    }
    if (gridDatas[index].nearestBomCount > 0) {
      drawNumber(index, x, y);
    }
    blankGridAutoSolver(index);
    flagGridAutoSolver(index);
  }
  console.log(gridDatas[index]);
}
function flagGridAutoSolver(index) {
  const nearestBomCount = gridDatas[index].nearestBomCount;
  let bombCount = 0;
  for (let i = 0; i < 8; i++) {
    const nearIndex = getNearestGridIndex(index, i + 1);
    if (nearIndex < 0) continue;
    if (gridDatas[nearIndex].isFlag) bombCount++;
  }
  if (nearestBomCount !== bombCount) return;
  for (let i = 0; i < 8; i++) {
    const nearIndex = getNearestGridIndex(index, i + 1);
    if (nearIndex < 0) continue;
    if (gridDatas[nearIndex].isFlag) continue;
    const checkeredFlag = autoCheckeredGrid(Config.size, nearIndex);
    const x = Math.floor(nearIndex / Config.size);
    const y = nearIndex % Config.size;
    gridDatas[nearIndex].isTouched = true;
    drawGrid(checkeredFlag, false, x, y);
    if (gridDatas[nearIndex].isBom) {
      showAllBombs();
      continue;
    }
    drawNumber(nearIndex, x, y);
    blankGridAutoSolver(nearIndex);
  }
}
function showAllBombs() {
  for (let i = 0; i < bombIndexs.length; i++) {
    const index = bombIndexs[i];
    const checkeredFlag = autoCheckeredGrid(Config.size, index);
    const x = Math.floor(index / Config.size);
    const y = index % Config.size;
    drawGrid(checkeredFlag, false, x, y);
    drawImageInGrid(Theme.boomIconUrl, Theme.boomIconSize, x, y);
  }
  console.log(bombIndexs);
}
function blankGridAutoSolver(index) {
  const gridBlocksQueue = [];
  if (gridDatas[index].nearestBomCount > 0) return;
  gridBlocksQueue.push(index);
  while (gridBlocksQueue.length != 0) {
    for (let i = 0; i < 8; i++) {
      const nearIndex = getNearestGridIndex(gridBlocksQueue[0], i + 1);
      if (nearIndex < 0) continue;
      if (gridDatas[nearIndex].isTouched) continue;
      if (gridDatas[nearIndex].isFlag) continue;
      const checkeredFlag = autoCheckeredGrid(Config.size, nearIndex);
      const x = Math.floor(nearIndex / Config.size);
      const y = nearIndex % Config.size;
      drawGrid(checkeredFlag, false, x, y);
      drawNumber(nearIndex, x, y);
      gridDatas[nearIndex].isTouched = true;
      if (gridDatas[nearIndex].nearestBomCount > 0) continue;
      gridBlocksQueue.push(nearIndex);
    }
    gridBlocksQueue.shift();
  }
}
function drawNumber(index, x, y) {
  if (gridDatas[index].nearestBomCount < 1) return;
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
function drawPointer(x, y) {
  ptrCtx.beginPath();
  ptrCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ptrCtx.fillRect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
  ptrCtx.rect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
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
function autoCheckeredGrid(size, index) {
  // check number in size is even or odd
  if (size % 2 == 0) {
    // check index divided by size is even or odd
    if (Math.floor(index / size) % 2 == 0) {
      // if index is even return true
      return index % 2 == 0;
    } else {
      // if index is even return false
      return index % 2 != 0;
    }
  } else {
    // if index is even return false
    return index % 2 != 0;
  }
}
