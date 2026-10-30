var pincel = document.getElementById("canvas").getContext("2d");
var player1 = new Obj();
var player2 = new Obj();
var bola = new Bola();
var pts1 = new Text();
var pts2 = new Text();
var estado = "menu";

player1.x = 30;
player1.y = 250;
player1.w = 15;
player1.h = 100;
player1.dir = 0;

player2.x = 755;
player2.y = 250;
player2.w = 15;
player2.h = 100;
player2.dir = 0;

function main() {
   pincel.clearRect(0, 0, 800, 600)
    if (estado === "menu") {
        drawMenu();
    }
    if (estado === "play") {
        draw();
        move();
        //move bola e players
        //colide
        //pontuação
        //confirma gameover
    }
    if (estado === "over") {
        //DrawGameOver
    }
}

setInterval(main, 20)

// menu
//jogo
//game over
function drawMenu() {
    pincel.font = "50px Arial"
    pincel.textAlign = "center"
    pincel.fillText("Soccer", 400, 300)
    pincel.font = "22px Arial"
    pincel.fillText("Pressione ESPAÇO para Iniciar", 400, 380)
    pincel.textAlign = "left"
}
function drawGameOver() {
    pincel.font = "50px Arial"
    pincel.textAlign = "center"
    pincel.fillText("Coisas de GameOver", 400, 300)
    pincel.font = "22px Arial"
    pincel.fillText("Pressione ESPAÇO para Reiniciar", 400, 380)
    pincel.textAlign = "left"
}


function draw() {
    pincel.fillRect(player1.x, player1.y, player1.w, player1.h);
    pincel.fillRect(player2.x, player2.y, player2.w, player2.h);
    pincel.fillRect(bola.x, bola.y, bola.w, bola.h);

    pincel.fillStyle = "white";
    pincel.fillRect(395, 0, 10, 600);

    pincel.font = "40px.Arial";
    pincel.fillText("Pontos:" + player1.pts, 50, 50);
    pincel.fillText("Pontos:" + player1.pts, 650, 50);

    pincel.fillStyle = "#00ccff";
    pincel.fillRect(player1.x, player1.y, player1.w, player1.h);

    pincel.fillStyle = "#ffcc00";
    pincel.fillRect(player2.x, player2.y, player2.w, player2.h);

    pincel.fillStyle = "#ffffff";
    pincel.fillRect(bola.x, bola.y, bola.w, bola.h);
}

function moveBall() {
    bola.x += bola.dirX
    bola.y += bola.dirY
}

function move() {
    player1.y += player1.dir;
    player2.y += player2.dir;
    limits();
}

function limits() {
    /*if(player colide com parede) {
    player.y = posLimite
    }*/
}
function reiniciar() {
    player1.pts =0;
    player2.pts =0;
    estado = "play";
}

document.addEventListener("keydown", function (event) {
    if (["ArrowUp", "ArrowDown", "Space"].includes(event.code)) {
        event.preventDefault();
    }

    if (event.key === "w") {
        player1.dir = -10;
        
    }
    if (event.key === "s") {
        player1.dir = 10;
    }
    if (event.key === "ArrowUp") {
        player2.dir = -10;
    }
    if (event.key === "ArrowDown") {
        player2.dir = 10;
    }
    if (event.code === "Space"){
            reiniciar();
    }
});
document.addEventListener("keyup", function (event) {
    if (event.key === "w") {
        player1.dir = 0;
    }
    if (event.key === "s") {
        player1.dir = 0;
    }
    if (event.key === "ArrowUp") {
        player2.dir = 0;
    }
    if (event.key === "ArrowDown") {
        player2.dir = 0;
    }
});