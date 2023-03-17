// have the game end if the snake tries to eat itself
// have the game end if the snake runs into a wall
// see how long my snake was when the game ended
// start the game over without having to reset the browser

let state;
let snake;
let move = 0;
const game = document.getElementById("game_box");
let apple = Math.floor(Math.random() * 900);



function gameLayout(){
    game.innerHTML = "";

    for (let i = 0; i < 900; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid_cell");
        game.appendChild(gridCell);
    };

    snake = {
        //[tail, middle, middle, head]
        body: [1, 2],
        direction: [0],
    };

    const gridList = document.querySelectorAll("#game_box .grid_cell");
    gridList[apple].classList.add("apple");
    
    setInterval(update, 200);
};

function renderState() {
    const gridList = document.querySelectorAll("#game_box .grid_cell");
    snake.body.forEach(function(index) {
        gridList[index].classList.add("snake");
    });
};

function moveSnake() {
    snake.direction = snake.body[snake.body.length-1];
    snake.direction += move;

    const gridList = document.querySelectorAll("#game_box .grid_cell");
    gridList[snake.body[0]].classList.remove("snake");

    snake.body.shift();
    snake.body.push(snake.direction);

    renderState();
};

function growSnake() {
    if (snake.body[snake.body.length-1] == apple) {
        snake.direction = apple;
        snake.direction += move;
    
        const gridList = document.querySelectorAll("#game_box .grid_cell");
        gridList[snake.body[snake.body.length-1]].classList.add("snake");
        gridList[apple].classList.remove("apple");

        snake.body.push(snake.direction);
         
        apple = Math.floor(Math.random() * 900);
        gridList[apple].classList.add("apple");
    };
};

function update() {
    renderState();
    moveSnake();
    growSnake();
};


document.getElementById("start_game").addEventListener('click', function() {
    gameLayout();
});

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