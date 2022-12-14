const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const size = 20;
const snake = {'x': 20, 'y': 20, 'cells': [], 'maxcell' : 4, 'dx': 0, 'dy': size};
const apple = {'x': canvas.width/2, 'y': canvas.height/2};
let count = 0;

function clearScreem(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function fillapple(){
    ctx.fillStyle = 'green';
    ctx.fillRect(apple.x, apple.y, size, size);

}


function fillSnake(){
    ctx.fillStyle = 'red';

    snake.cells.unshift({'x': snake.x, 'y': snake.y})


    snake.cells.forEach((tm, index)=>{
        if (index === snake.maxcell){
            snake.cells.pop();
        }
        ctx.fillRect(tm.x, tm.y, size-1, size-1);

    })
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function colision(){
    if (snake.x === apple.x && snake.y === apple.y){
        snake.maxcell += 1;
        apple.x = getRandomInt(0, canvas.width / size) * size;
        apple.y = getRandomInt(0, canvas.height / size) * size;

    }else if(snake.x < 0){
        snake.x = canvas.width - size;

    }else if(snake.x >= canvas.width){
        snake.x = 0;

    }else if(snake.y < 0){
        snake.y = canvas.height - size;

    }else if(snake.y >= canvas.height){
        snake.y = 0;

    }

    snake.cells.forEach((cell) =>{
        if (snake.x === cell.x && snake.y === cell.y){
            snake.x = 20;
            snake.y = 20;
            snake.cells =  [];
            snake.maxcell = 4;
            snake.dx =  0;
            snake.dy =  size;

            apple.x = canvas.width/2
            apple.y = canvas.height/2
        }
    })
}


function main(){
    requestAnimationFrame(main);

    if (++count < 4) {
        return;
    }

    count = 0;

    snake.x += snake.dx;
    snake.y += snake.dy; 

    clearScreem();
    colision();
    fillSnake();
    fillapple();

}

document.addEventListener('keydown', (event)=>{
    if (event.key === 'ArrowUp' && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -size;

    }else if(event.key === 'ArrowDown' && snake.dy === 0){
        snake.dx = 0;
        snake.dy = size;

    }else if(event.key === 'ArrowRight' && snake.dx === 0){
        snake.dx = size;
        snake.dy = 0;

    }else if(event.key === 'ArrowLeft' && snake.dx === 0){
        snake.dx = -size;
        snake.dy = 0;
    }  
});
requestAnimationFrame(main);
