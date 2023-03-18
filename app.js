// have the game end if the snake tries to eat itself
// + have the game end if the snake runs into a wall
// start the game over without having to reset the browser

let state;
let snake;
let move = 1;
let apple = Math.floor(Math.random() * 900);

const game = document.getElementById('game_box');
const scoreDiv = document.getElementById('score');
const startGame = document.getElementById('start_game');

function gameLayout(){
    game.innerHTML = '';

    for (let i = 0; i < 900; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid_cell');
        game.appendChild(gridCell);
    };

    snake = {
        //[tail, middle, middle, head]
        body: [1, 2],
        direction: [0],
    };

    const gridList = document.querySelectorAll('#game_box .grid_cell');
    gridList[apple].classList.add('apple');
    
    setInterval(update, 200);
};

function moveSnake() {
    snake.direction = snake.body[snake.body.length-1];
    snake.direction += move;

    if (snake.direction < 0 || snake.direction > 899) {
        endGame();
    };

    const gridList = document.querySelectorAll('#game_box .grid_cell');
    gridList[snake.body[0]].classList.remove('snake');

    snake.body.shift();
    snake.body.push(snake.direction);

    renderState();
};

function renderState() {
    const gridList = document.querySelectorAll('#game_box .grid_cell');
    snake.body.forEach(function(index) {
        gridList[index].classList.add('snake');
    });
};

function getApplePo(){
    let position = Math.floor(Math.random() * 900);

    snake.body.forEach(function(index) {
        if (index == position){
            getApplePo();
        };
    });

    return position;
};

function growSnake() {
    if (snake.body[snake.body.length-1] == apple) {
        snake.direction = apple;
        snake.direction += move;
    
        const gridList = document.querySelectorAll('#game_box .grid_cell');
        gridList[snake.body[snake.body.length-1]].classList.add('snake');
        gridList[apple].classList.remove('apple');

        snake.body.push(snake.direction);
         
        apple = getApplePo();
        gridList[apple].classList.add('apple');
    };
};

function score(){
    if (snake.body.length > 2){
        scoreDiv.innerText = "SCORE: " + (snake.body.length - 2);
    };
};

function update() {
    renderState();
    moveSnake();
    growSnake();
    score();
};

startGame.addEventListener('click', function() {
    document.getElementById('buttons').removeChild(startGame);
    gameLayout();
});

function endGame(){
    scoreDiv.innerText = "Game Over!! Your score is " + (snake.body.length-2);
    document.body.removeChild(game);
    document.getElementById('buttons').appendChild(startGame);
}

document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowRight') {
        move = 1;
    }
    else if (event.code == 'ArrowLeft') {
        move = -1;          
    }
    else if (event.code == 'ArrowUp') {
        move = -30;
    }
    else if (event.code == 'ArrowDown') {
        move = 30;
    };
});