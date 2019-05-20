function clickRandom(){
    let t = tiles[Math.round(Math.random()*8)];
    if(t.value==null){
        t.click();
    }else{
        clickRandom();
    }
}
function highlightTiles (index) {
    for(let i of index){
        tiles[i].id.style.backgroundColor = tiles[i].value=="O"?"red":"rgb(47, 189, 47)";
    }
}
function checkWin(value){
    if(chekWinRange(value,"vertical",1) ||
       chekWinRange(value,"vertical",2) ||
       chekWinRange(value,"vertical",3) ||
       chekWinRange(value,"horizontal",1) ||
       chekWinRange(value,"horizontal",4) ||
       chekWinRange(value,"horizontal",7) ||
       chekWinRange(value,"diagonal",1) ||
       chekWinRange(value,"diagonal",2)){
           return true;
    }
    return false;
}
function chekWinRange(value,orientation,number){
    if(orientation == "vertical"){
        if(tiles[number-1].value==value &&
           tiles[number-1+3].value==value &&
           tiles[number-1+6].value==value){
               highlightTiles([number-1,number-1+3,number-1+6]);
               return true;
        }
    }else if(orientation == "horizontal"){
        if(tiles[number-1].value==value &&
           tiles[number-1+1].value==value &&
           tiles[number-1+2].value==value){
                highlightTiles([number-1,number-1+1,number-1+2]);
                return true;
        }
    }else{
        if(number==1){
            if(value==tiles[0].value &&
               value==tiles[4].value &&
               value==tiles[8].value){
                   highlightTiles([0,4,8]);
                   return true;
            }
        }else{
            if(value==tiles[2].value &&
               value==tiles[4].value &&
               value==tiles[6].value){
                    highlightTiles([2,4,6]);
                    return true;
            }
        }
    }
    return false;
}
