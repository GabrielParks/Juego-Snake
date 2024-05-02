const pantalla = document.querySelector("#pantalla");
const scoreTotal = document.querySelector("#score");
const record = document.querySelector("#high-score");

let gameOver = false;
let manzanaX;
let manzanaY;
let score = 0;
let highScore = localStorage.getItem("high-score");

record.innerHTML = `Max Score: ${highScore}`; //trae el max puntaje de localStorage

let snakeX = 15;
let snakeY = 15;
let cuerpoSnake = [];

let velocidadX = 0;
let velocidadY = 0;

let setIntervalId;

const creacionDeManzana = () =>{ //lugar random donde aparezca la fruto
    manzanaX = Math.floor(Math.random()*30) +1;
    manzanaY = Math.floor(Math.random()*30) +1;
}

const reinicio = ()=>{
    clearInterval(setInterval)
    location.reload(); //recarga el navegador
}

const direcciones = (e) => {
    if(e.key === "ArrowUp" && velocidadY != 1){ // && velocidadY != 1 => anula que se pueda retroceder
        velocidadX = 0;
        velocidadY = -1;
    }    else if(e.key === "ArrowDown" && velocidadY != -1){
        velocidadX = 0;
        velocidadY = 1;
    }else if(e.key === "ArrowLeft" && velocidadX != 1){
        velocidadX = -1;
        velocidadY = 0;
    }else if(e.key === "ArrowRight" && velocidadX != -1){
        velocidadX = 1;
        velocidadY = 0;
    }
    iniciarJuego();
}

const iniciarJuego = () => {
    if (gameOver) {
        alert("Perdiste!!")
        return reinicio();
    }

    snakeX += velocidadX
    snakeY += velocidadY

    let elementos = `<div class="fa-solid fa-apple-whole" style="color: #e50b0b; grid-area: ${manzanaY} / ${manzanaX}"></div>`

    if(snakeX === manzanaX && snakeY === manzanaY){
        creacionDeManzana()
        cuerpoSnake.push([manzanaX, manzanaY]) //agrega el cuerpo de la serpiente
        score++
        if (score >= 10) {
            setIntervalId = setInterval(iniciarJuego,400)
        }else if (score >= 20) {
            setIntervalId = setInterval(iniciarJuego,300)
        }else if (score >= 30) {
            setIntervalId = setInterval(iniciarJuego,200)
        }

        highScore = score >= highScore ? score : highScore
        localStorage.setItem("high-score", highScore)
        scoreTotal.innerHTML = `Score: ${score}`;
        record.innerHTML = `Max Score: ${highScore}`;
    }

    let snake= ` <div class="fa-regular fa-circle-dot" style="color: #18145d; grid-area: ${snakeY} / ${snakeX}"></div>` //crea la serpiente
    elementos += snake

    for (let i = cuerpoSnake.length - 1; i > 0; i--){
        cuerpoSnake[i] = cuerpoSnake[i - 1]
    }

    cuerpoSnake[0] = [snakeX, snakeY];

    if (snakeX < 0 || snakeY > 30 || snakeX > 30 || snakeY < 0) {
        gameOver = true;
    }

    for (let i = 0; i < cuerpoSnake.length; i++) {
        elementos += ` <div class="fa-regular fa-circle-dot" style="color: #18145d; grid-area: ${cuerpoSnake[i][1]} / ${cuerpoSnake[i][0]}"></div>` //agrega a la serpiente
        if (i !== 0 && cuerpoSnake[0][1] === cuerpoSnake[i][1] && cuerpoSnake[0][0] === cuerpoSnake[i][0]) {
            gameOver = true;
        }
    }
 
    pantalla.innerHTML = elementos
}

creacionDeManzana()
setIntervalId = setInterval(iniciarJuego,500)

document.addEventListener("keydown", direcciones);