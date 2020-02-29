const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave')
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const INITIAL_COLOR = "";
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE , CANVAS_SIZE);
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
}
function startPainting(){
    painting = true;
}

// 마우스를 움직일때마다 실행된다
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){ //painting =false. 클릭하지않은채 움직일때
        //console.log('creating path in' ,x, y);
        ctx.beginPath();
        ctx.moveTo(x,y);
        //패스는 만들고있으나 보이지않음, 많이 만들어졌으나 사용되지 않음
    }else{//painting =true //마우스가 움직이다가 클릭(드래그)을 시작하면
        //console.log('creating line in' ,x, y);
        ctx.lineTo(x,y); //내가 만들고있는 패스 중에서 라인 만들기
        ctx.stroke();
        //패스와 패스를 연결하는게 계속 그려지는 것처럼 보이는 것
    }
}

function handleColorClick(event){
    console.log(event.target.style)
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, CANVAS_SIZE , CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

if (canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(coloritem => coloritem.addEventListener('click', handleColorClick))

function handleRangeChange(event){
    const range = event.target.value
    ctx.lineWidth = range;
}
if(range){
    range.addEventListener('input', handleRangeChange)
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "채우기"
    }else{ //filling이 false일때
        filling = true;
        mode.innerText = "그리기"
    }
}
if(mode){
    mode.addEventListener('click', handleModeClick)
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement('a');
    link.href = image;
    link.download = "paintJS";
    link.click();
}
if(saveBtn){
    saveBtn.addEventListener('click',handleSaveClick)
}