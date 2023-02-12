const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const strW = document.querySelector("#strokeW");
const colors = document.querySelectorAll("span");
const resetbtn = document.querySelector("#reset");
const erasebtn = document.querySelector("#eraease");
const imgInput = document.querySelector("#imgFile");
const saveBtn = document.querySelector("#saveBtn");
const fillBtn = document.querySelector("#fill");
const textInput = document.querySelector("#text");

canvas.width = 800;
canvas.height = 600;
ctx.lineCap = "round"; // square, round, butt(기본)
ctx.lineWidth = 4;

function fileImg() {
  const file_url = event.target.files[0];
  const img_url = URL.createObjectURL(file_url);
  const image = new Image();
  image.src = img_url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, 800, 600);
  };
}
imgInput.addEventListener("change", fileImg);

//const saveImage=function(){} const saveImage=()=>{}
function saveImage() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myArt.png"; // <a href="~" download> ~ </a>
  a.click();
}
saveBtn.addEventListener("click", saveImage);

function deleteAll() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 600);
}

function eraser() {
  ctx.strokeStyle = "white";
  isFilling = false;
  fillBtn.innerText = "배경 채우기";
}
resetbtn.addEventListener("click", deleteAll);
erasebtn.addEventListener("click", eraser);
function lineW(event) {
  ctx.lineWidth = event.target.value;
}
strW.addEventListener("change", lineW);

// for(let i=0; i<color.length; i++){
//   colors[0].addEventListener("click",function(e){
//     console.log(e.target);
//   });
// }
function colorChange(event) {
  ctx.strokeStyle = event.target.dataset.color; // console.dir(event.target);
  //              event.target.getAttribute("data-color")
  ctx.fillStyle = event.target.dataset.color;
  console.dir(event.target);
}
colors.forEach((span) => span.addEventListener("click", colorChange));

let isDrawing = false; // 드로잉 신호 상태변수 선언
let isFilling = false; // 채우기 신호 상태변수 선언

function downEventFucn() {
  isDrawing = true; // 상태변수 그림그리기 시작알림
}
function moveEventFunc() {
  // 반복 실행 - 마우스 좌표 lineTo 추적, stroke() <--- 그림그리기 시작 상태변수값일때만
  if (isDrawing) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
  ctx.beginPath(); // 새로 시작(선구분)
  ctx.moveTo(event.offsetX, event.offsetY);
}
function upEventFunc() {
  isDrawing = false; // 상태변수 그림그리기 종료
}
fillBtn.addEventListener("click", () => {
  if (isFilling) {
    isFilling = false;
    fillBtn.innerText = "배경 채우기";
  } else {
    isFilling = true;
    fillBtn.innerText = "선 그리기";
  }
});
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 600);
  }
}
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "36px Apple SD Gothic Neo";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}
canvas.addEventListener("mousedown", downEventFucn);
canvas.addEventListener("mousemove", moveEventFunc);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("mouseleave", upEventFunc);
document.addEventListener("mouseup", upEventFunc);
canvas.addEventListener("dblclick", onDoubleClick);
// canvas.addEventListener("mousedown",downEv)
// function downEv(event){
//   ctx.moveTo(event.offsetX, event.offsetY);
//   canvas.addEventListener("mousemove",moveEv);
//   function moveEv(event){
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
//   }
// }
