function GameBoard(){
    const rows=3;
    const columns=3;
    const board=[];
    let cellMarked = false;

    for(i=0;i<rows;i++){
        board[i] = [];
        for(j=0;j<columns;j++){
            board[i].push(cell())
        }
    }

    const getCellMarked = () => cellMarked;


    const getBoard = () => board;

    const placeMark = (row,column,player)=>{

        if(board[row][column].getValue() === 0){
            board[row][column].addValue(player);
            cellMarked = false;
        }else{
            cellMarked = true;
            return;
        }

    }

    const printBoard = () =>{
        const boardWithCellValues = board.map((row)=>row.map(cell=>cell.getValue()));
        return boardWithCellValues;
    }

    const resetBoard = ()=>{
        for(i=0;i<rows;i++){
            for(j=0;j<columns;j++){
                board[i][j].resetValue();
            }
        }
    }

    return{getBoard,placeMark,resetBoard,printBoard,getCellMarked}

}

function cell(){
    let value = 0;

    const addValue = (player)=>{
        value = player;
    }

    const getValue = () => value;

    const resetValue = () => {value = 0};

    return{getValue,addValue,resetValue}

}


function GameController(){
    let playerOneName = '';
    let playerTwoName = '';

    const setNames = (name1,name2)=>{
        playerOneName = name1;
        playerTwoName = name2;
    
        players[0].name = playerOneName;
        players[1].name = playerTwoName;
    
        console.log(players[0].name ,players[1].name );
    
    }

    const board = GameBoard();

    let winner = false;

    const getWinner = () => winner;

    const players = [
        {
            name:playerOneName,
            value:1
        },

        {
            name:playerTwoName,
            value:2
        }
    ]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
        console.table(board.printBoard());
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const checkZero = (arr)=>{

        let newArr = []
    
        for(i=0;i<arr.length;i++){
            for(j=0;j<arr[i].length;j++){
                newArr.push(arr[i][j].getValue());
            }
        }
    
        for(q=0;q<newArr.length;q++){
            if(newArr[q] === 0){
                return false;
            }
        }
        return true;
    }

    const areAllEqualButNotZero = (arr)=>{
        // Check if the array is not empty
        if (arr.length === 0) {
          return false;
        }
      
        // Get the first non-zero element in the array
        const nonZeroElement = arr.find(element => element !== 0);
      
        // Check if all elements are equal to the first non-zero element
        return arr.every(element => element === nonZeroElement);
    }

    const playRound = (row,column)=>{
        console.log(`${getActivePlayer().name} is placing a mark`);
        board.placeMark(row,column,getActivePlayer().value);

        const currentBoardState = board.getBoard();

        if(!board.getCellMarked()){

            //Check horizontal 
            for(i=0;i<currentBoardState.length;i++){
                let currentArr = currentBoardState[i];
                const newArr = [];

                for(j=0;j<currentArr.length;j++){
                    newArr.push(currentArr[j].getValue());
                }

                if(areAllEqualButNotZero(newArr)){
                    console.log(`${getActivePlayer().name} is the winner`);
                    console.table(board.printBoard());
                    winner = true;
                    break;
                }

            }

            //check vertical
            for(k=0;k<3;k++){
                let newArr = []

                for(i=0;i<currentBoardState.length;i++){
                    let currentArr = currentBoardState[i];
                    newArr.push(currentArr[k].getValue());
                }

                if(areAllEqualButNotZero(newArr)){
                    console.log(`${getActivePlayer().name} is the winner`);
                    console.table(board.printBoard());
                    winner = true;
                    break;
                }

            }

            //check diagonal to the left
            const checkLeftSlant = (arr) =>{
                let newArr = [];

                for(i=0;i<arr.length;i++){
                    let currentArr = arr[i];
                    newArr.push(currentArr[i].getValue());
                };

                if(areAllEqualButNotZero(newArr)){
                    return true;
                };

                return false;
            }
            if(checkLeftSlant(currentBoardState))  {
                console.log(`${getActivePlayer().name} is the winner`);
                console.table(board.printBoard());
                winner = true;
            };


            //check diagonal to the right
            const checkRightSlant = (arr)=>{
                let q = 0;
                let newArr = [];

                for(i=arr.length-1;i>=0;i--){
                    let currentArr = arr[i];
                    newArr.push(currentArr[q].getValue())
                    q++
                };

                if(areAllEqualButNotZero(newArr)){
                    return true;
                };

                return false;
            }

            if(checkRightSlant(currentBoardState)) {
                console.log(`${getActivePlayer().name} is the winner`);
                console.table(board.printBoard());
                winner = true;
            };

            //check for potential ties
            if(checkZero(currentBoardState)){
                winner = null;
                console.log('tied');
            }

            if(winner || winner === null) return;
            switchPlayerTurn();
            printNewRound();

        }else{
            alert(`Can't place there`);
        }

    }

    function playAgain(){
        winner = false;
        board.resetBoard();
    }

    
    return{
        playRound,
        getWinner,
        playAgain,
        setNames,
        getActivePlayer,
        getBoard: board.getBoard
    }

}


function screenController(){
    const game = GameController();

    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const displayWinner = document.querySelector('.playAgainDiv');
    const introScreen = document.querySelector('.IntroScreen');
    const playAgainButton = document.querySelector('#playAgain');
    const startBtn = document.querySelector('.startBtn');
    const playerOneName = document.querySelector('#playerOneName');
    const playerTwoName = document.querySelector('#playertwoName');

    const updateScreen = ()=>{
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const winner = game.getWinner();
    
        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
    
        board.forEach((row,rowIndex) => {
            row.forEach((cell,columnIndex)=>{
                const cellButton = document.createElement("span");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                // cellButton.textContent = cell.getValue();

                if(cell.getValue() === 1){
                    cellButton.textContent = 'X';

                }else if(cell.getValue() === 2){
                    cellButton.textContent = 'O'
                }else{
                    cellButton.textContent = ''
                }

                boardDiv.appendChild(cellButton);
            });
        }); 

        if(winner){
            playerTurnDiv.textContent = `${activePlayer.name} is the winner`;
            displayWinner.style = `
                                  display: flex;
                                  justify-content: center;
                                  background-color: rgba(255, 255, 255, 0.658);
                                  align-items: center;`;
            playerOneName.value = '';
            playerTwoName.value = '';
            return;
        }else if(winner === null){
            playerTurnDiv.textContent = `A tie`;
            displayWinner.style = `
                                display: flex;
                                justify-content: center;
                                background-color: rgba(255, 255, 255, 0.658);
                                align-items: center;`;
            playerOneName.value = '';
            playerTwoName.value = '';
            return;
        }
 
    }

    function clickHandlerBoard(e){
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    playAgainButton.addEventListener("click",()=>{
        game.playAgain();
        updateScreen();
        displayWinner.style.display = 'none';
    
        introScreen.style = `
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                  flex-direction: column;
                                  z-index:100;
        `
    });

    startBtn.addEventListener("click",()=>{

        if(playerOneName.value === "" || playerTwoName.value === "" ){
          playerOneName.value = ''
          playerTwoName.value = ''
          alert("Insert Valid name");
          return;
        }
        game.setNames(playerOneName.value,playerTwoName.value);
        introScreen.style.display = 'none';
        updateScreen();
        
      })


}
screenController();