const myArr = [
    [9,8,7],
    [5,4,7],
    [5,8,9]
]


function screenController(){
    const boardDiv = document.querySelector(".board");

    myArr.forEach((row,rowIndex)=>{
        row.forEach((cell,columnIndex)=>{
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.textContent = cell;
            cellButton.dataset.row = rowIndex;
            cellButton.dataset.column = columnIndex;

            boardDiv.appendChild(cellButton);

        });
    });
}

screenController();

//Check horizontal 
for(i=0;i<myArr.length;i++){
    let currentArr = myArr[i];
    const newArr = [];

    for(j=0;j<currentArr.length;j++){
        newArr.push(currentArr[j]);

    }

    if(areAllEqualButNotZero(newArr)){
        console.log(newArr);
        break;
    }

}

//check vertical
for(k=0;k<3;k++){
    let newArr = []

    for(i=0;i<myArr.length;i++){
        let currentArr = myArr[i];
        newArr.push(currentArr[k]);
    }

    if(areAllEqualButNotZero(newArr)){
        console.log(newArr);
        break;
    }

}
//check diagonal to the left
const checkLeftSlant = () =>{
    let newArr = [];

    for(i=0;i<myArr.length;i++){
        let currentArr = myArr[i];
        newArr.push(currentArr[i]);
    };

    if(areAllEqualButNotZero(newArr)){
        return true;
    };

    return false;
}

//check diagonal to the right
const checkRightSlant = (arr)=>{
    let q = 0;
    let newArr = [];

    for(i=arr.length-1;i>=0;i--){
        let currentArr = arr[i];
        newArr.push(currentArr[q])
        q++
    };

    if(areAllEqualButNotZero(newArr)){
        return true;
    };

    return false;
}

console.log(checkLeftSlant(myArr));


function areAllEqualButNotZero(arr){
    // Check if the array is not empty
    if (arr.length === 0) {
      return false;
    }
  
    // Get the first non-zero element in the array
    const nonZeroElement = arr.find(element => element !== 0);
  
    // Check if all elements are equal to the first non-zero element
    return arr.every(element => element === nonZeroElement);
}