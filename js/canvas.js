// stored canvas element from html
export const main = document.getElementById("main-canvas");
export const pointer = document.getElementById("pointer-canvas");
// get the context of the canvas for drawing pusposes;
export const ctx = main.getContext("2d", { alpha: false });
export const ptrCtx = pointer.getContext("2d");
