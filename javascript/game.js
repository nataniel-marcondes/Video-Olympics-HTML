var pincel = document.getElementById("canvas").getContext("2d");
var player1 = new Obj();
var player2 = new Obj();
var bola = new Bola();
var pts1 = new Text();
var pts2 = new Text();

document.addEventListener("keydown",function(event){
    if(event.key === "w"){
        player1.dir = 10;
    }
    if(event.key === "s"){
        player1.dir = -10;
    }
    if(event.key === "ArrowUp"){
        player2.dir = 10;
    }
    if(event.key === "ArrowDown"){
        player2.dir = -10;
    }
});
document.addEventListener("keyup",function(event){
    if(event.key === "w"){
        player1.dir = 0;
    }
    if(event.key === "s"){
        player1.dir = 0;
    }
    if(event.key === "ArrowUp"){
        player2.dir = 0;
    }
    if(event.key === "ArrowDown"){
        player2.dir = 0;
    }
});