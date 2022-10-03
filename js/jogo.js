const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const size = 20;
const snake = {'x': 20, 'y': 20, 'cells': [], 'maxcell' : 4, 'dx': 0, 'dy': size};
const apple = {'sx': 200, 'sy': 200};
let count = 0;

function clearScreem(){
    ctx.clearRect(0, 0, 400, 400);
}


function fillapple(){
    ctx.fillStyle = 'green';
    ctx.fillRect(apple.sx, apple.sy, size, size);

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


function colision(){
    if (snake.x === apple.sx && snake.y === apple.sy){
        snake.maxcell += 1;
    }
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
    if (event.key === 'ArrowUp') {
        snake.dx = 0;
        snake.dy = -size;

    }else if(event.key === 'ArrowDown'){
        snake.dx = 0;
        snake.dy = size;

    }else if(event.key === 'ArrowRight'){
        snake.dx = size;
        snake.dy = 0;

    }else if(event.key === 'ArrowLeft'){
        snake.dx = -size;
        snake.dy = 0;
    }  
});
requestAnimationFrame(main);
