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

window.onload = initialize;