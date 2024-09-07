let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO= true //playerX, playerO
let count=0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const enableBoxes= () => {
    for (box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const resetGame= () =>{
    turnO=true;
    count=0;
    enableBoxes()
    msgContainer.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnO===true){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();

        if (count===9 && !isWinner){
            gameDraw();
        }
    });
});   


const gameDraw=()=>{
    msg.innerText="game draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

/*
//this code is not required

//in this code, there are two event listeners for click, due to that turnO is flipped twice and O is not getting printed ever.
//to avoid that, here turnO is put to false, so that the value will be false here and O will pe printed in box once.

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO===false){                  //here ideally (turnO should be true) but since logic is repeated, its put to false to remove the bug
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled= true;

        checkWinner();
    });
});

*/

const disableBoxes= () => {
    for (box of boxes){
        box.disabled=true;
    }
};

const showWinner= (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes()
}

const checkWinner= () => {
    for (pattern of winPatterns) {
        //these accesses the array elements
//        console.log(pattern[0],pattern[1],pattern[2]);
        //this accesses the boxes for these elements in the array
//        console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        //this accesses the text in the boxes for these elements in the array
//        console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

let pos1Val= boxes[pattern[0]].innerText;
let pos2Val= boxes[pattern[1]].innerText;
let pos3Val= boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){
                console.log("Winner is", pos1Val);
                showWinner(pos1Val);
            }    
        }
    }
}