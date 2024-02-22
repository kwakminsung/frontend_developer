const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const colorBtns = document.querySelectorAll(".pallet .button");
const eraserBtns = document.querySelector(".eraser");
const downloadBtns = document.querySelector(".download");

let isDrawing = false;
let isErasing = false;

ctx.lineWidth = 5;
ctx.strokeStyle = "red";

function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function Drawing(e) {
  if (!isDrawing) return;
  if (isErasing) {
    ctx.clearRect(e.offsetX, e.offsetY, 30, 30);
  } else {
    eraserBtns.classList.remove("selected");
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

function changeColor(e) {
  isErasing = false;
  ctx.strokeStyle = e.currentTarget.dataset.color;
  colorBtns.forEach((button) => {
    if(button === e.currentTarget) {
      button.classList.add("selected");
    }
    else {
      button.classList.remove("selected");
    }
  });
  eraserBtns.classList.remove("selected");
}

function startErasing(e) {
  isErasing = true;
  colorBtns.forEach((button) => button.classList.remove("selected"));
  e.currentTarget.classList.add("selected");
}

function startDownload(e) {
  const image = canvas.toDataURL("image/png", 1.0);
  const linkEl = document.createElement("a");
  linkEl.href = image;
  linkEl.download = "draw";
  linkEl.click();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", Drawing);
canvas.addEventListener("mouseup", stopDrawing);
colorBtns.forEach((button) => button.addEventListener("click", changeColor));
eraserBtns.addEventListener("click", startErasing);
downloadBtns.addEventListener("click", startDownload);