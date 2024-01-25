import Config from "./config.js";
// for store grid data
class Data {
  isTouched = false;
  isBom = false;
  nearestBomCount = 0;
  isFlag = false;
}
// array that stored instances of Data class
export const datas = [];
// init datas array
export function init() {
  for (let i = 0; i < Config.size * Config.size; i++) {
    datas.push(new Data());
    datas[i].isBom = i < Config.bomCount;
  }
  bomRandomizer();
  checkNearestBom();
}
function bomRandomizer() {
  let n = datas.length;
  for (let i = 0; i < n; i++) {
    let randomIndex = Math.floor(Math.random() * (n - i) + i);
    let temp = datas[i].isBom;
    datas[i].isBom = datas[randomIndex].isBom;
    datas[randomIndex].isBom = temp;
  }
}
function checkNearestBom() {
  for (let i = 0; i < datas.length; i++) {
    for (let j = 0; j < 8; j++) {
      let nearestIndex = getNearestGridIndex(i, j + 1);
      if (nearestIndex == -9) continue;
      if (datas[nearestIndex].isBom) {
        datas[i].nearestBomCount++;
      }
    }
  }
}
export function getNearestGridIndex(index, dataId) {
  // 1 | 2 | 3 |
  // 8 | 0 | 4 |
  // 7 | 6 | 5 |
  let canTop = !(index - Config.size < 0);
  let canBottom = !(index + Config.size >= Config.size * Config.size - 1);
  let canRight = !(index % Config.size === Config.size - 1);
  let canLeft = !(index % Config.size === 0);
  if (dataId == 1 && canTop && canLeft) {
    return index - Config.size - 1;
  } else if (dataId == 2 && canTop) {
    return index - Config.size;
  } else if (dataId == 3 && canTop && canRight) {
    return index - Config.size + 1;
  } else if (dataId == 4 && canRight) {
    return index + 1;
  } else if (dataId == 5 && canRight && canBottom) {
    return index + Config.size + 1;
  } else if (dataId == 6 && canBottom) {
    return index + Config.size;
  } else if (dataId == 7 && canBottom && canLeft) {
    return index + Config.size - 1;
  } else if (dataId == 8 && canLeft) {
    return index - 1;
  } else {
    return -9;
  }
}
