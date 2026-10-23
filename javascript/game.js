var pincel = document.getElementById("canvas").getContext("2d");
var player1 = new Obj();
var player2 = new Obj();
var bola = new Bola();
var pts1 = new Text();
var pts2 = new Text();
var estado = "menu";

function main(){
    //clear rect
    pincel.clearRect(0,0, 800, 600)
    if (estado === "menu")
    {
        //DrawMenu
        //zera pontuaçoes
    }
    if (estado === "play")
    {
        desenha();
        //move bola e players
        //colide
        //pontuação
        //confirma gameover
    }
    if (estado === "over")
    {
        //DrawGameOver
    }
}
// menu
//jogo
//game over

function desenha (){
    pincel.fillRect(player1.x, player1.y, player1.w, player1.h);
    pincel.fillRect(player2.x, player2.y, player2.w, player2.h);
    pincel.fillRect(bola.x, bola.y, bola.w, bola.h);

    pincel.font = "20px.Arial";
    pincel.fillText("Pontos:" + player1.pts, 50, 50);
    pincel.fillText("Pontos:" + player1.pts, 50, 650);
}

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