let snake;
let move = 1;
let width = 30;
let apple = Math.floor(Math.random() * 900);
let isRunning;

const game = document.getElementById('game_box');
const scoreDiv = document.getElementById('score');
const startGame = document.getElementById('start_game');
const playAgain = document.getElementById('play_again');
document.getElementById('buttons').removeChild(playAgain);

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

function renderState() {
    const gridList = document.querySelectorAll('#game_box .grid_cell');
    snake.body.forEach(function(index) {
        gridList[index].classList.add('snake');
    });
};

function moveSnake() {
    snake.direction = snake.body[snake.body.length-1];
    snake.direction += move;

    if (snake.direction < 0 || snake.direction >= 900 ||
        (snake.direction % 30 === 0 && move === -1) ||
        (snake.direction % 30 === 29 && move === 1)) {
      endGame();
      return;
    };

    const gridList = document.querySelectorAll('#game_box .grid_cell');
    gridList[snake.body[0]].classList.remove('snake');

    for (let i = 1; i < snake.body.length; i++){
        if (move == (snake.direction - move)){
            snake.direction = snake.body[snake.body.length-1];
            move = 1
            moveSnake();
        }
        else if(snake.direction == snake.body[i]){
            endGame();
        };
    };

    snake.body.shift();
    snake.body.push(snake.direction);

    renderState();
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
    if (isRunning){
        renderState();
        moveSnake();
        growSnake();
        score();
    };
};

startGame.addEventListener('click', function() {
    document.getElementById('buttons').removeChild(startGame);
    document.getElementById('buttons').appendChild(playAgain);
    isRunning = true;
    gameLayout();
});

playAgain.addEventListener('click', function(){
    location.reload();
})

function endGame(){
    scoreDiv.innerText = "Game Over!! Your score is " + (snake.body.length-2);
    document.body.removeChild(game);
    isRunning = false;
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

