var rows = 24
var cols = 24

const gridContainer = document.querySelector('#gridContainer');


var playing = false;


let grid = new Array(rows)
let nextGrid = new Array(rows)


// initializing the grids

function initializeGrid(){

     for(let i = 0; i < rows; i++){
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols)
     }


}

// resets grid

function resetGrids(){

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){

            grid[i][j] = 0;
            nextGrid[i][j] = 0;

        }
    }


}


// initialize
function initialize(){
    createTable()
    initializeGrid()
    resetGrids()
    setupControlsButtons()

}


// layout the board

function createTable(){
    var table = document.createElement("table");

    if(!gridContainer){
        throw new Error('no table for rows')
    }

    for(var i = 0; i < rows; i++){
        var tr = document.createElement("tr");
        for(var j = 0; j < cols; j++){
            var cell = document.createElement("td")
            cell.setAttribute("id",i +"_"+ j);
            cell.setAttribute("class","dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr)
    }
 
      gridContainer.appendChild(table)


}

function cellClickHandler(){

    let rowcol = this.id.split("_");
    let row = rowcol[0]
    let col = rowcol[1]

     let classes = this.getAttribute('class');
     if(classes.indexOf("live") > -1){
         this.setAttribute("class","dead")
         grid[row][col] = 0 ;
     }
     else{
        this.setAttribute("class","live")
        grid[row][col] = 1;
     }

}



// start everthing

function setupControlsButtons(){
    // button to start 

    let startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;

    // button to clear

    let clearButton = document.querySelector('#clear')
    clearButton.onclick = clearButtonHandler;





}

function clearButtonHandler(){
    playing = false;
    let startButton = document.querySelector("#start");
    startButton.innerHTML = "start"

}

function startButtonHandler(){

    if(playing){
        playing = false
        this.innerHTML ="continue"
    }
    else{
        playing = true
        this.innerHTML ="pause"
        play()
    }

}


function computeNextGen(){
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                applyRules(i,j)
            }
        }

}

function applyRules(row,col){
      let numNeighbors = countNeighbors(row,col);

      if(grid[row][col] == 1){
          if(numNeighbors < 2){
            nextGrid[row][col] = 0;
          }
          else if(numNeighbors == 2 || numNeighbors == 3){
              nextGrid[row][col] = 1
          }
          else if (numNeighbors > 3) {
              nextGrid[row][col] = 0
          }

      }
        else if( grid[row][col] == 0 ) {
            if(numNeighbors == 3) {
                nextGrid[row][col] = 1
            }
        }
    
}


function countNeighbors(row,col){
     let count = 0 
     if(row - 1 >= 0){
        if(grid[row-1][col] == 1 ) count++;
     }
     if(row - 1 >= 0 && col-1 >= 0) {
        if(grid[row-1][col-1] == 1) count++
     }
     if(row - 1 >= 0 && cols + 1 < cols){
        if(grid[row-1][col + 1] == 1 ) count++
     }
     if(col-1 >= 0){
        if(grid[row][col-1] == 1) count++
     }
     if(col+1 < cols){
         if(grid[row][col+1] == 1) count++
     }
     if(row+1 < rows){
        if(grid[row+1][col] == 1 ) count ++
     }
     if(row+1 < rows && col-1 >= 0){
        if(grid[row+1][col-1] == 1) count++
     }
    
}


window.onload = initialize;