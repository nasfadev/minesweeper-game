import { init as initEventHandler } from "./js/event-handler.js";
import { init as initData } from "./js/grid-data.js";
import * as grid from "./js/grid-generator.js";
// init
initEventHandler();
// init
initData();
// render grid
grid.renderAll();
