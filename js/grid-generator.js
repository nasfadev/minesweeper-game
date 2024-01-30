import Config, { Theme } from "./config.js";
import * as Canvas from "./canvas.js";
import {
  datas as gridDatas,
  getNearestGridIndex,
  bombIndexs,
  Status,
} from "./grid-data.js";
import { win, lose, updateFlagMenu } from "./ui-handler.js";
const gridWidth = Canvas.main.width / Config.size;
const ctx = Canvas.ctx;
const ptrCtx = Canvas.ptrCtx;
const strCtx = Canvas.strCtx;
const bombIcon = new Image();
bombIcon.src = Theme.boomIconUrl;
const flagIcon = new Image();
flagIcon.src = Theme.flagIconUrl;
// function for render all grid in the canvas
export function renderAll() {
  updateFlagMenu();
  lineDrawer();
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
  const y = Math.floor(
    event.offsetX / (event.target.offsetHeight / Config.size)
  );
  const x = Math.floor(
    event.offsetY / (event.target.offsetHeight / Config.size)
  );
  const index = Config.size * x + y;
  ptrCtx.clearRect(0, 0, 2048, 2048);
  if (gridDatas[index].nearestBomCount < 1 && gridDatas[index].isTouched)
    return;
  if (gridDatas[index].nearestBomCount > 0 && gridDatas[index].isTouched) {
    let nearFlagCount = 0;
    let neverTouchedCount = 0;
    for (let i = 0; i < 8; i++) {
      const nearIndex = getNearestGridIndex(index, i + 1);
      if (nearIndex < 0) continue;

      if (gridDatas[nearIndex].isFlag) nearFlagCount++;
      if (!gridDatas[nearIndex].isTouched) neverTouchedCount++;
    }
    if (nearFlagCount !== gridDatas[index].nearestBomCount) return;
    if (neverTouchedCount == nearFlagCount) return;
  }
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
      Status.flagCount++;
      updateFlagMenu();
      return;
    }
    drawImageInGrid(flagIcon, Theme.flagIconSize, x, y);
    gridDatas[index].isFlag = true;
    Status.flagCount--;
    updateFlagMenu();
    return;
  } else if (event.button === 0) {
    if (gridDatas[index].isFlag) return;

    drawGrid(checkeredFlag, false, x, y);

    if (gridDatas[index].isBom) {
      showAllBombs();
      return;
    }
    if (gridDatas[index].nearestBomCount > 0) {
      drawNumber(index, x, y);
    }
    blankGridAutoSolver(index);
    flagGridAutoSolver(index);
    lineDrawer();
  }
  console.log(gridDatas[index]);
}
function lineDrawer() {
  strCtx.clearRect(0, 0, 2048, 2048);
  for (let i = 0; i < gridDatas.length; i++) {
    const data = gridDatas[i];
    if (!data.isTouched) continue;
    if (data.nearestBomCount < 1) {
      if (!data.isBom) {
        continue;
      }
    }
    const top = getNearestGridIndex(i, 2);
    const bottom = getNearestGridIndex(i, 6);
    const left = getNearestGridIndex(i, 8);
    const right = getNearestGridIndex(i, 4);
    const x = Math.floor(i / Config.size);
    const y = i % Config.size;
    strCtx.lineWidth = 15;
    const lineOffset = 15 / 2;
    strCtx.strokeStyle = "yellow";
    if (top != -9 && !gridDatas[top].isTouched) {
      const corX = gridWidth * y;
      const corY = gridWidth * x;
      strCtx.beginPath();
      strCtx.moveTo(corX - lineOffset, corY);
      strCtx.lineTo(corX + gridWidth + lineOffset, corY);
      strCtx.stroke();
    }
    if (bottom != -9 && !gridDatas[bottom].isTouched) {
      const corX = gridWidth * y;
      const corY = gridWidth * x;
      strCtx.beginPath();
      strCtx.moveTo(corX - lineOffset, corY + gridWidth);
      strCtx.lineTo(corX + gridWidth + lineOffset, corY + gridWidth);
      strCtx.stroke();
    }
    if (left != -9 && !gridDatas[left].isTouched) {
      const corX = gridWidth * y;
      const corY = gridWidth * x;
      strCtx.beginPath();
      strCtx.moveTo(corX, corY);
      strCtx.lineTo(corX, corY + gridWidth);
      strCtx.stroke();
    }
    if (right != -9 && !gridDatas[right].isTouched) {
      const corX = gridWidth * y;
      const corY = gridWidth * x;
      strCtx.beginPath();
      strCtx.moveTo(corX + gridWidth, corY);
      strCtx.lineTo(corX + gridWidth, corY + gridWidth);
      strCtx.stroke();
    }
  }
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
    drawImageInGrid(bombIcon, Theme.boomIconSize, x, y);
  }
  lose();
  lineDrawer();
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
  const index = Config.size * x + y;
  ctx.beginPath();
  if (isFill) {
    ctx.fillStyle = checkeredFlag ? "#24A7C3" : "#11D4FF";
  } else {
    if (!gridDatas[index].isTouched) {
      gridDatas[index].isTouched = true;
      Status.gridCount--;
    }
    if (Status.gridCount == Config.bomCount) {
      win();
    }
    ctx.fillStyle = checkeredFlag ? "#D2D2D2" : "#E1E0E0";
  }
  ctx.fillRect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
  ctx.rect(gridWidth * y, gridWidth * x, gridWidth, gridWidth);
}
function drawImageInGrid(image, imageSize, x, y) {
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
