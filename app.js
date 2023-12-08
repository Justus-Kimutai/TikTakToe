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
        console.table(boardWithCellValues);
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


function gameController(){
    let playerOneName = 'Captain';
    let playerTwoName = 'Winner';

    const board = GameBoard();

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
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row,column)=>{
        console.log(`${getActivePlayer().name} is placing a mark`);
        board.placeMark(row,column,getActivePlayer().value);

        if(board.getCellMarked()){
            console.log(`Can't place there men`);
        }else{
            switchPlayerTurn();
        }

        printNewRound()
    }

    return{
        playRound,
        resetBoard:board.resetBoard
    }
}

const game = gameController();

