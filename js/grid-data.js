import Config from "./config.js";
// for store grid data
class Data {
  isTouched = false;
  isBom = false;
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
