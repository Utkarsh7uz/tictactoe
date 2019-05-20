let board;
let tiles = [];
let currentValue = "X";
let tilesFilled = 0;

window.onload = function(){
    board = new Board();
    for(let i=1 ; i<=9; i++){
        tiles[i-1]=new Tile(i);
    }
}
function won(value){
    //customAlert("*** "+value+" WINS ***");
    document.getElementById("state").firstChild.innerHTML=value +" WINS";
    document.getElementById("state").style.background = "yellow";
    currentValue = "won";
}
// function customAlert(message){
//     let al = document.getElementById("alertBox");
//     al.style.left= "10%";
//     let t = document.getElementById("text");
//     t.innerHTML = message;
// }
function restart(){
    board.reset();
    tilesFilled = 0;
    currentValue = "X";
    document.getElementById("state").style.background = "aquamarine";
    document.getElementById("state").firstChild.innerHTML = "Tic tac toe";
}
class Tile {
    constructor(index){
        this.index = index; //from 1-9 
        this.value = null;
        this.id = document.getElementsByClassName("tile")[index-1];
        this.textId = this.id.firstChild;
        this.LENGTH = board.LENGTH/3;
        this.fontSize = this.LENGTH/2;
        
        this.id.style.width = this.LENGTH + "px";
        this.id.style.height = this.LENGTH + "px";
        
        this.x = ((this.index-1)%3)*this.LENGTH;
        if(index<=3){
            this.y=0;
        }else if(this.index<=6) {
            this.y =this.LENGTH;
        }else{ 
            this.y=this.LENGTH*2;
        }

        this.id.style.left = this.x + "px";
        this.id.style.top = this.y + "px";

        this.textId.style.fontSize = this.fontSize+ "px";
        this.textId.style.top = this.LENGTH/2-this.fontSize/1.5+"px";

        let x = this;
        this.id.onclick = function(){
            x.click(); 
        }
    }
    click(){
        if(this.value!=null || currentValue=="won") return;
        
        this.value = currentValue;
        this.textId.innerHTML = this.value;
        this.textId.style.color = this.value=="X"?"tomato":"white";
        currentValue = currentValue=="X"?"O":"X";
        tilesFilled++;

        if(checkWin("X")){
            won("X");
        }else if(checkWin("O")){
            won("O");
        }else if(tilesFilled == 9){
            won("NO ONE")
            return;
        }else if(currentValue == "O"){
            clickRandom();
        }
    }
    reset(){
        this.value = null;
        this.textId.innerHTML = "";
        this.id.style.backgroundColor = "darkseagreen";
    }
}

class Board {
    constructor(){
        this.id = document.getElementById("board");
        if(innerHeight/innerWidth >= 3/2){
            this.LENGTH = innerWidth*0.8;
            this.x = innerWidth*0.1;
            this.y = (innerHeight -  this.LENGTH)/2;
        }else{
            this.LENGTH = innerHeight*0.5;
            this.x = (innerWidth - this.LENGTH)/2;
            this.y = innerHeight*0.25;
        }
        this.id.style.width = this.LENGTH + "px";
        this.id.style.height = this.LENGTH + "px";
        this.id.style.left = this.x + "px";
        this.id.style.top = this.y + "px";

        //document.getElementsByClassName("bar")[0].style.height = this.LENGTH+"px";
    }

    reset(){
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].reset();
        }
    }
}