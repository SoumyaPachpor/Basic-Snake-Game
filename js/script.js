//constants

let inputDir = { x: 0, y: 0 };

let bgm = new Audio("bgm.mp3");
let eat = new Audio("eat.mp3");
let move = new Audio("move.mp3")

let scores = 0;

let speed = 12;
let lastPainTime = 0;

let snakeArr = [
    { x: 9, y: 9 }
];

let food = { x: 12, y: 14 };


//Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPainTime) / 1000 < 1 / speed) {
        return;
    }

    lastPainTime = ctime;

    gameEngine();
}

function isCollide(snake) {
    //if you eat your self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }

    //Collision with Wall
    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18) {
        return true;
    }

    return false;
}

function gameEngine() {

    // Step 1. Updating the snakeArr and Food

    if (isCollide(snakeArr)) {
        let gamerOver = new Audio("over.mp3");
        gamerOver.play();
        bgm.pause();
        localStorage.setItem('highScore', highScores);
        highScore.innerHTML = `${highScores}`;
        inputDir = { x: 0, y: 0 };
        let a = alert("Game over Press any key to Play again");
        snakeArr = [
            { x: 9, y: 9 }
        ];
        scores = 0;
        score.innerHTML = `${scores}`;
    }

    // food eaten increment the score and keep food on different place
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        eat.play();
        scores++;
        if (scores > highScores) {
            highScores = scores;
        }
        score.innerHTML = `${scores}`;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }


    // Moving the Snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Step 2. Display the Snake and Food
    // Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
            snakeElement.style.borderRadius = "100%"
        } else {
            snakeElement.classList.add('snake');
        }
        if (index && index === snakeArr.length - 1) {
            snakeElement.style.borderRadius = "100%"
        }
        board.appendChild(snakeElement);
    });
    // Display the Food
    snakeFood = document.createElement('div');
    snakeFood.style.gridRowStart = food.y;
    snakeFood.style.gridColumnStart = food.x;
    snakeFood.classList.add('food');
    board.appendChild(snakeFood);
}







//Main Logic =>

let highScores = localStorage.getItem('highScore');
if (highScores === null) {
    highScores = 0;
} else {
    highScores = parseInt(highScores); // Ensure to parse from string to integer if needed
}

localStorage.setItem('highScore', highScores);
highScore.innerHTML = `${highScores}`;

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    bgm.play();
    switch (e.key) {
        case "ArrowUp":
            move.play();
            if (inputDir.y === 1 && snakeArr.length > 1) {
                console.log(inputDir);
                inputDir = { x: 0, y: 1 }
            }else{
                inputDir = { x: 0, y: -1 }
            }
            break;
        case "ArrowDown":
            move.play();
            if (inputDir.y === -1 && snakeArr.length > 1) {
                console.log(inputDir);
                inputDir = { x: 0, y: -1 }
            }else{
                inputDir = { x: 0, y: 1 }
            }
            break;
        case "ArrowRight":
            move.play();
            if (inputDir.x === -1 && snakeArr.length > 1) {
                console.log(inputDir);
                inputDir = { x: -1, y: 0 }
            }else{
                inputDir = { x: 1, y: 0 }
            }
            break;
        case "ArrowLeft":
            move.play();
            if (inputDir.x === 1 && snakeArr.length > 1) {
                console.log(inputDir);
                inputDir = { x: 1, y: 0 }
            }else{
                inputDir = { x: -1, y: 0 }
            }
            break;
        default:
            break;
    }
});