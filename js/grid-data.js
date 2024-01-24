import Config from "./config.js";
class Data {
  isTouched = false;
}
export const datas = [];
export function init() {
  for (let i = 0; i < Config.size * Config.size; i++) {
    datas.push(new Data());
  }
}
