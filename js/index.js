let inputDir={x:0,y:0};
const bite=new Audio("assets/food.mp3");
const gameover=new Audio("assets/Game over.mp3");
const bg=new Audio("assets/bg.mp3")
let speed=7;
let score=0;
let lastPaintTime=0;
let snakeArr=[
{x:11 , y:15}
]
let food = {x: 6, y: 7};

function main(ctime)  {
    window.webkitRequestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
        if(snake[0].x<=0 || snake[0].x>=18||snake[0].y<=0 || snake[0].y>=18){
            return true;
        }
        
    }
    return false;
    
}

function gameEngine() {
    bg.play();
        
    //part 1 Updating the snake array
    if(isCollide(snakeArr)){
        gameover.play();
        bg.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again.");
        snakeArr=[{x:13 , y:15}];
        bg.play();
        score=0;
    }
    //Now displace the food when the snake eats it
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        bite.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Hi Score: "+ hiscoreval;
        }
        scoreBox.innerText="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-1)*Math.random()),y:Math.round(a+(b-1)*Math.random())}
    }

    //Moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
    }
        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;


    //part 2 display the snake and the food
    //Display the snake
       board.innerHTML="";
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
             snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        
        
    });
         foodElement = document.createElement('div');
                 foodElement.style.gridRowStart = food.y;
                 foodElement.style.gridColumnStart = food.x;
                 foodElement.classList.add('food')
                 board.appendChild(foodElement);
    
 }

    


 let hiscore=localStorage.getItem("hiscore");
 if(hiscore==null){
     hiscoreval=0;
     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
 }else{
     hiscoreval=JSON.parse(hiscore);
     hiscoreBox.innerHTML="Hi Score: "+ hiscore;
 }




window.webkitRequestAnimationFrame(main);
window.addEventListener('keydown', e=>{
inputDir={x:0,y:1} //start the game
    switch(e.key){
        case "ArrowUp":
            
            inputDir.x=0;
            inputDir.y=-1;
            break;
            case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
            case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
            case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;   
            default:
                break;         
    }
})