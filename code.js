var rows = 24
var cols = 24

const gridContainer = document.querySelector('#gridContainer');


var playing = false;



// initialize
function initialize(){
    createTable()
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
     }
     else{
        this.setAttribute("class","live")
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