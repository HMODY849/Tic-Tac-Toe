const optionFriend = document.getElementById("oFriend");
const optionCom = document.getElementById("oCom");
const contrnerOne = document.getElementById("contrnerOne");
const body = document.getElementById("body");
const contrnerTwo = document.getElementById("contrnerTwo");
const GameBoard = document.getElementById("gameBoard");
const chosse = document.getElementById("chosse");
const optionX = document.getElementById("OptionX");
const optionO = document.getElementById("OptionO");
const resulte = document.getElementById("resulte");
const reset = document.getElementById("reset");
const form = document.getElementById("form");
const next = document.getElementById("Next");
const home = document.getElementById("home");
const playerOneInput = document.getElementById("playerone");
const playerTwoInput = document.getElementById("playertwo");
const nextButton = document.getElementById("Next");
const item0 = document.getElementById(`item0`)
const item1 = document.getElementById("item1");
const item2 = document.getElementById("item2");
const item3 = document.getElementById("item3");
const item4 = document.getElementById("item4");
const item5 = document.getElementById("item5");
const item6 = document.getElementById("item6");
const item7 = document.getElementById("item7");
const item8 = document.getElementById("item8");

let gameBoard =
 [
    ["" ,"" , ""],
    ["" ,"" , ""],
    ["" ,"" , ""]
]

let turn = ""

function Player (Name,Marker){
    this.Name = Name;
    this.Marker = Marker;
}

let Player1 = new Player("","");
let Player2 = new Player("","");
let PlayerCom = new Player ("Computer","")

function PlayerOneMove(palce,palce2){
    if(gameBoard[palce][palce2] !== ""){
        resulte.innerHTML= "You Can't Play Here"
        resulte.style.color ="red"
    }else{
        resulte.style.color ="#F95959"
        gameBoard[palce][palce2] = Player1.Marker
        CurentPlayer=CurentPlayer === "X" ? "O":"X"
        turn = "PlayerTwo";
        resulte.innerHTML = `It's ${Player2.Name}'s Turn`;
        resulte.style.color = "#F95959";
        checkWinner();

    }
}

function PlayerTowMove(palce,palce2){
    if(gameBoard[palce][palce2] !== ""){
        resulte.innerHTML= "You Can't Play Here"
        resulte.style.color ="red"
    }else{
        resulte.style.color ="#F95959"
        gameBoard[palce][palce2] = Player2.Marker
        CurentPlayer=CurentPlayer === "X" ? "O":"X"
        turn = "PlayerOne";
        resulte.innerHTML = `It's ${Player1.Name}'s Turn`;
        resulte.style.color = "#F95959";
        checkWinner();
    }
}

function PlayerOneMoveCom(palce,palce2){
    if(gameBoard[palce][palce2] !== ""){
        resulte.innerHTML= "You Can't Play Here"
        resulte.style.color ="red"
    }else{
        resulte.style.color ="#F95959"
        gameBoard[palce][palce2] = Player1.Marker
        turn="PlayerCom"
        checkWinner();
    }
}

function computerMove() {
    if (turn === "PlayerCom") {
      let bestMove = findBestMove();
      let row = bestMove.row;
      let col = bestMove.col;
  
      gameBoard[row][col] = PlayerCom.Marker;
      let itemId = `item${row * 3 + col}`;
      document.getElementById(itemId).innerHTML = `<p class="marker">${gameBoard[row][col]}</p>`;
  
      CurentPlayer = CurentPlayer === "X" ? "O" : "X";
      turn = "PlayerOne";
      checkWinner();
    }
}
  
function findBestMove() {
    let bestScore = -Infinity;
    let bestMove = { row: -1, col: -1 };
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[i][j] === "") {
          gameBoard[i][j] = PlayerCom.Marker;
          let score = minimax(gameBoard, 0, false);
          gameBoard[i][j] = ""; // Undo the move
  
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row: i, col: j };
          }
        }
      }
    }
    return bestMove;
}
  
function minimax(board, depth, isMaximizing) {
let scores = {
    X: -1,
    O: 1,
    tie: 0
};

let winner = checkWinnerMinimax(board);
if (winner) {
    return scores[winner];
}

if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
        board[i][j] = PlayerCom.Marker;
        let score = minimax(board, depth + 1, false);
        board[i][j] = "";
        bestScore = Math.max(score, bestScore);
        }
    }
    }
    return bestScore;
} else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
        board[i][j] = Player1.Marker;
        let score = minimax(board, depth + 1, true);
        board[i][j] = "";
        bestScore = Math.min(score, bestScore);
        }
    }
    }
    return bestScore;
}
}

function checkWinnerMinimax(board) {
const winningCombos = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] &&
    board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
    return board[a[0]][a[1]];
    }
}

let isDraw = true;
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
    if (board[i][j] === "") {
        isDraw = false;
    }
    }
}
if (isDraw) {
    return "tie";
}
return null;
}

function checkWinner() {
    const winningCombos = [
        [[0, 0], [0, 1], [0, 2]], 
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]], 
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]], 
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a[0]][a[1]] && gameBoard[a[0]][a[1]] === gameBoard[b[0]][b[1]] &&
            gameBoard[a[0]][a[1]] === gameBoard[c[0]][c[1]]
        ) {
            if (gameBoard[a[0]][a[1]] === Player1.Marker) {
                resulte.innerHTML="The Winner is " + Player1.Name;
                resulte.style.color="white"
            } else if(gameBoard[a[0]][a[1]] === Player2.Marker){
                resulte.innerHTML="The Winner is " + Player2.Name;
                resulte.style.color="white"
            } else{
               resulte.innerHTML="The Winner is " + PlayerCom.Name;
                resulte.style.color="white"
            }
            return true;
        }
    }

    let isDraw = true;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(gameBoard[i][j] === ""){
                isDraw = false;
            }
        }
    }
    if(isDraw){
        resulte.innerHTML="it's a draw";
        resulte.style.color="white"
        return true; 
    }
    return false; 
}

function resetBoard(){
    gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
}

let CurentPlayer = ""

optionFriend.addEventListener("click",function(){
    optionFriend.classList.add("none");
    optionCom.classList.add("none");
    contrnerOne.classList.add("none");
    chosse.classList.add("none");
    form.classList.toggle("none")
    body.style.backgroundColor="#455D7A"
    item0.addEventListener("click",function(){
        if(turn === "PlayerOne"){
            PlayerOneMove(0,0);
            item0.innerHTML=
            `<p class="marker">${gameBoard[0][0]}</p>`
            
        }else{
            PlayerTowMove(0,0);
            item0.innerHTML=
            `<p class="marker">${gameBoard[0][0]}</p>`
}});
    item1.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(0,1);
        item1.innerHTML=
        `<p class="marker">${gameBoard[0][1]}</p>`
    }else{
        PlayerTowMove(0,1);
        item1.innerHTML=
        `<p class="marker">${gameBoard[0][1]}</p>`
}});
    item2.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(0,2);
        item2.innerHTML=
        `<p class="marker">${gameBoard[0][2]}</p>`

    }else{
        PlayerTowMove(0,2);
        item2.innerHTML=
        `<p class="marker">${gameBoard[0][2]}</p>`

}});
    item3.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(1,0);
        item3.innerHTML=
        `<p class="marker">${gameBoard[1][0]}</p>`

    }else{
        PlayerTowMove(1,0);
        item3.innerHTML=
        `<p class="marker">${gameBoard[1][0]}</p>`

}})
    item4.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(1,1);
        item4.innerHTML=
        `<p class="marker">${gameBoard[1][1]}</p>`

    }else{
        PlayerTowMove(1,1);
        item4.innerHTML=
        `<p class="marker">${gameBoard[1][1]}</p>`

}});
    item5.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(1,2);
        item5.innerHTML=
        `<p class="marker">${gameBoard[1][2]}</p>`
    }else{
        PlayerTowMove(1,2);
        item5.innerHTML=
        `<p class="marker">${gameBoard[1][2]}</p>`

}});
    item6.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(2,0);
        item6.innerHTML=
        `<p class="marker">${gameBoard[2][0]}</p>`

    }else{
        PlayerTowMove(2,0);
        item6.innerHTML=
        `<p class="marker">${gameBoard[2][0]}</p>`

}});
    item7.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(2,1);
        item7.innerHTML=
        `<p class="marker">${gameBoard[2][1]}</p>`

    }else{
        PlayerTowMove(2,1);
        item7.innerHTML=
        `<p class="marker">${gameBoard[2][1]}</p>`

}});
    item8.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMove(2,2);
        item8.innerHTML=
        `<p class="marker">${gameBoard[2][2]}</p>`

    }else{
        PlayerTowMove(2,2);
        item8.innerHTML=
        `<p class="marker">${gameBoard[2][2]}</p>`

}});

optionX.addEventListener("click",function(){
    form.classList.add("none");
    chosse.classList.add("none");
    chosse.classList.toggle("chosse")
    contrnerTwo.classList.toggle("contrnerTwo");
    contrnerTwo.classList.toggle("none");
    CurentPlayer = Player1.Marker = "X";
    if(Player1.Marker === "X"){
        Player2.Marker = "O"
        turn = "PlayerOne";
        resulte.innerHTML = `It's ${Player1.Name}'s Turn`;
        resulte.style.color = "#F95959";
    }
})

optionO.addEventListener("click",function(){
    chosse.classList.toggle("none");
    chosse.classList.toggle("chosse")
    contrnerTwo.classList.toggle("contrnerTwo");
    contrnerTwo.classList.toggle("none");
    CurentPlayer = Player1.Marker = "O";
    if(Player1.Marker === "O"){
        Player2.Marker = "X"
        turn = "PlayerOne"; // Set initial turn
        resulte.innerHTML = `It's ${Player1.Name}'s Turn`; //Show the first turn
        resulte.style.color = "#F95959";
    }
})
next.addEventListener("click",function(){
    const playerOneName = document.getElementById("playerone").value
    const playerTwoName = document.getElementById("playertwo").value
    Player1.Name = playerOneName;
    Player2.Name = playerTwoName;
    form.classList.toggle("none");
    chosse.classList.toggle("none");
    chosse.classList.toggle("chosse");
})
function checkInputs() {
    if (playerOneInput.value && playerTwoInput.value) {
      nextButton.disabled = false;
    } else {
      nextButton.disabled = true;
    }
  }
playerOneInput.addEventListener("input", checkInputs);
playerTwoInput.addEventListener("input", checkInputs);
nextButton.disabled = true;
});

reset.addEventListener("click",function(){
    resetBoard();
    resulte.innerHTML=""
    item0.innerHTML=""
    item1.innerHTML=""
    item2.innerHTML=""
    item3.innerHTML=""
    item4.innerHTML=""
    item5.innerHTML=""
    item6.innerHTML=""
    item7.innerHTML=""
    item8.innerHTML=""
    CurentPlayer = ""
    Player1.Marker=""
    Player2.Marker=""
    PlayerCom.Marker=""
    chosse.classList.toggle("none");
    chosse.classList.toggle("chosse");
    contrnerTwo.classList.toggle("contrnerTwo");
    contrnerTwo.classList.add("none");
})

home.addEventListener("click",function(){
    document.getElementById("playerone").value = "";
    document.getElementById("playertwo").value = "";
    nextButton.disabled = true;
    resetBoard();
    resulte.innerHTML=""
    item0.innerHTML=""
    item1.innerHTML=""
    item2.innerHTML=""
    item3.innerHTML=""
    item4.innerHTML=""
    item5.innerHTML=""
    item6.innerHTML=""
    item7.innerHTML=""
    item8.innerHTML=""
    CurentPlayer = ""
    Player1.Marker=""
    Player2.Marker=""
    PlayerCom.Marker=""
    Player1.Name = ""
    Player2.Name= ""
    PlayerCom.Name="Computer"
    turn = ""
    body.style.backgroundColor="#233142"
    contrnerTwo.classList.toggle("contrnerTwo");
    contrnerTwo.classList.add("none");
    optionFriend.classList.toggle("none");
    optionCom.classList.toggle("none");
    contrnerOne.classList.toggle("none");
})

optionCom.addEventListener("click", function() {
    optionFriend.classList.add("none");
    optionCom.classList.add("none");
    contrnerOne.classList.add("none");
    chosse.classList.toggle("none")
    chosse.classList.toggle("chosse")
    form.classList.add("none");
    body.style.backgroundColor = "#455D7A";
    Player1.Name = "You";
    PlayerCom.Name = "Computer";
    playerOneInput.value = "You";
    playerTwoInput.value = "Computer";
    item0.addEventListener("click",function(){
        if(turn === "PlayerOne"){
            PlayerOneMoveCom(0,0);
            item0.innerHTML=
            `<p class="marker">${gameBoard[0][0]}</p>`
            computerMove();
        }           
});
    item1.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(0,1);
        item1.innerHTML=
        `<p class="marker">${gameBoard[0][1]}</p>`
        computerMove();
    }  
});
    item2.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(0,2);
        item2.innerHTML=
        `<p class="marker">${gameBoard[0][2]}</p>`
        computerMove();

    }
});
    item3.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(1,0);
        item3.innerHTML=
        `<p class="marker">${gameBoard[1][0]}</p>`
       computerMove();

    }
});
    item4.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(1,1);
        item4.innerHTML=
        `<p class="marker">${gameBoard[1][1]}</p>`
        computerMove();

    }
});
    item5.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(1,2);
        item5.innerHTML=
        `<p class="marker">${gameBoard[1][2]}</p>`
        computerMove();

    }
});
    item6.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(2,0);
        item6.innerHTML=
        `<p class="marker">${gameBoard[2][0]}</p>`
        computerMove();

    }
});
    item7.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(2,1);
        item7.innerHTML=
        `<p class="marker">${gameBoard[2][1]}</p>`
        computerMove();

    }
});
    item8.addEventListener("click",function(){
    if(turn === "PlayerOne"){
        PlayerOneMoveCom(2,2);
        item8.innerHTML=
        `<p class="marker">${gameBoard[2][2]}</p>`
       computerMove();

    }
});
    optionX.addEventListener("click",function(){
    form.classList.add("none");
    chosse.classList.add("none");
    chosse.classList.toggle("chosse")
    contrnerTwo.classList.toggle("contrnerTwo");
    contrnerTwo.classList.toggle("none");
    CurentPlayer = Player1.Marker = "X";
    if(Player1.Marker === "X"){
        PlayerCom.Marker = "O"
        turn = "PlayerOne";
    }
});
    optionO.addEventListener("click",function(){
    chosse.classList.toggle("none");
    chosse.classList.toggle("chosse")
    contrnerTwo.classList.toggle("contrnerTwo");
    contrnerTwo.classList.toggle("none");
    CurentPlayer = Player1.Marker = "O";
    if(Player1.Marker === "O"){
        PlayerCom.Marker = "X"
        turn = "PlayerOne"; // Set initial turn
    }
}) ;  
});
