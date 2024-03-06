// stored canvas element from html
export const main = document.getElementById("main-canvas");
export const pointer = document.getElementById("pointer-canvas");
export const stroke = document.getElementById("stroke-canvas");
export const screen = document.querySelector(".screen");
export const gameOverScreen = document.querySelector(".game-over");
export const settingsScreen = document.querySelector(".settings");
export const flag = document.querySelector(".menu .flags p");
export const timer = document.querySelector(".menu .timer p");
export const gameOverOption = document.querySelector(".game-over p");
export const root = document.querySelector(":root");
// get the context of the canvas for drawing pusposes;
export const ctx = main.getContext("2d", { alpha: false });
export const ptrCtx = pointer.getContext("2d");
export const strCtx = stroke.getContext("2d");
