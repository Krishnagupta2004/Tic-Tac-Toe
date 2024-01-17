const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newgameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Initialize the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    
    
    // Make Boxes Empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList = `box box${index+1}`;
    })
    newgameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();

// Add Event Listener to all Boxes to Get Player Input
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})

// Handle Click Game 
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}

// Swapping Turns 
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

// Check Game is Over or Not 
function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="" )
        && (gameGrid[position[0]]==gameGrid[position[1]]) && (gameGrid[position[1]]==gameGrid[position[2]]) ){
        
            if(gameGrid[position[0]]=="X"){
                answer="X";
            }
            else{
                answer="0";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[1]].classList.add("win");
            boxes[position[0]].classList.add("win");
            boxes[position[2]].classList.add("win");
    
        }
    });
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`
        newgameBtn.classList.add("active");
        return;
    }

     // Here is not winner yet Check for tie
     let fillCount = 0;
     gameGrid.forEach((box) => {
         if (box !== "") {
             fillCount++;
         }
     });
 
     if (fillCount === 9) {
         gameInfo.textContent = "Game Tied !";
         newgameBtn.classList.add("active");
     }

}

// Add Event Listener to Button 
newgameBtn.addEventListener('click',initGame);