var canvas = document.getElementById("canvas");
var pincel = canvas.getContext("2d");

var largura = 800;
var altura = 600;
var limitepts = 5;
var tCima = 200;
var tBaixo = 400;

var estado = "menu";

var player1 = new Player(30, 250, 15, 100, "#00ccff");
var player2 = new Player(755, 250, 15, 100, "#ffcc00");
var bola = new Bola((largura-16)/2, (altura-16)/2, 16, 16, "ffffff");

var pts1 = new Text();
var pts2 = new Text();

function centralizarBola(direcao = 1) {
    bola.x = (largura - bola.w) / 2;
    bola.y = (altura - bola.h) / 2;

    bola.dirX = 7 * direcao;
    bola.dirY = Math.random() < 0.5 ? -3 : 3;
}

function main() {
    pincel.clearRect(0, 0, largura, altura);

    if (estado === "menu") {
        drawMenu();
    } else if (estado === "play") {
        move();
        moveBall();
        collisions();
        checkGoal();
        checkGameOver();

        draw();
    } else if (estado === "over") {
        drawGameOver();
    }
}

setInterval(main, 20);

function drawMenu() {
    pincel.fillStyle = "white";
    pincel.textAlign = "center";

    pincel.font = "50px Arial";
    pincel.fillText("SOCCER", largura / 2, 260);

    pincel.font = "22px Arial";
    pincel.fillText(
        "Pressione ESPAÇO para iniciar",
        largura / 2,
        340
    );

    pincel.font = "16px Arial";
    pincel.fillText("Jogador 1: W / S", largura / 2, 410);
    pincel.fillText("Jogador 2: ↑ / ↓", largura / 2, 440);

    pincel.textAlign = "left";
}

function draw() {
    pincel.fillStyle = "white";
    pincel.strokeStyle = "white";
    pincel.lineWidth = 3;

    pincel.fillRect(395, 0, 10, altura);

    pincel.beginPath();
    pincel.arc(400, 300, 65, 0, Math.PI * 2);
    pincel.stroke();

    pincel.fillRect(0, 3, largura, 5);
    pincel.fillRect(0, altura - 8, largura, 5);


    pincel.fillStyle = "#ffffff";
    pincel.fillRect(0, tCima, 40, tBaixo-tCima);
    pincel.fillRect(largura - 40, tCima, 40, tBaixo-tCima);


    pincel.strokeStyle = "white";
    pincel.lineWidth = 2;
    
    pincel.strokeRect(0, tCima, 40, tBaixo-tCima);

    pincel.strokeRect(largura - 40, tCima, 40, tBaixo-tCima);

    pincel.font = "24px Arial";
    pincel.fillText("P1: " + player1.pts, 50, 50);
    pincel.fillText("P2: " + player2.pts, 650, 50);


    player1.desenha(pincel);
    player2.desenha(pincel);
    bola.desenha(pincel);

    pincel.textAlign = "left";
}

function drawGameOver() {
    pincel.fillStyle = "white";
    pincel.textAlign = "center";

    pincel.font = "42px Arial";

    if (player1.pts >= limitepts) {
        pincel.fillText("JOGADOR 1 VENCEU!", largura / 2, 250);
    } else if (player2.pts >= limitepts) {
        pincel.fillText("JOGADOR 2 VENCEU!", largura / 2, 250);
    }

    pincel.font = "22px Arial";
    pincel.fillText(
        "Pressione ESPAÇO para jogar novamente",
        largura / 2,
        330
    );

    pincel.textAlign = "left";
}

function move() {
    player1.y += player1.dir;
    player2.y += player2.dir;

    limits();
}

function limits() {
    player1.y = Math.max(
        8,
        Math.min(altura - player1.h - 8, player1.y)
    );

    player2.y = Math.max(
        8,
        Math.min(altura - player2.h - 8, player2.y)
    );
}

function moveBall() {
    bola.x += bola.dirX;
    bola.y += bola.dirY;

    if (bola.y <= 8) {
        bola.y = 8;
        bola.dirY = Math.abs(bola.dirY);
    }

    if (bola.y + bola.h >= altura - 8) {
        bola.y = altura - bola.h - 8;
        bola.dirY = -Math.abs(bola.dirY);
    }
}

function collisions() {
    if (bola.collide(player1) && bola.dirX < 0) {
        bola.x = player1.x + player1.w;
        bola.dirX = Math.abs(bola.dirX);

        var impacto =
            (bola.y + bola.h / 2 - (player1.y + player1.h / 2)) /(player1.h / 2);

        bola.dirY = impacto * 5;
    }

    if (bola.collide(player2) && bola.dirX > 0) {
        bola.x = player2.x - bola.w;
        bola.dirX = -Math.abs(bola.dirX);

        var impacto =
            (bola.y + bola.h / 2 -
            (player2.y + player2.h / 2)) /
            (player2.h / 2);

        bola.dirY = impacto * 5;
    }
}

function checkGoal() {
    var centroBolaY = bola.y + bola.h / 2;

    if (bola.x <= 0) {
        if (centroBolaY >= tCima && centroBolaY <= tBaixo) {
            player2.pts++;
            centralizarBola(-1);
        } else {
            bola.x = 0;
            bola.dirX = Math.abs(bola.dirX);
        }
    }

    if (bola.x + bola.w >= largura) {
        if (centroBolaY >= tCima && centroBolaY <= tBaixo) {
            player1.pts++;
            centralizarBola(1);
        } else {
            bola.x = largura - bola.w;
            bola.dirX = -Math.abs(bola.dirX);
        }
    }
}

function checkGameOver() {
    if (
        player1.pts >= limitepts ||
        player2.pts >= limitepts
    ) {
        estado = "over";
    }
}

function reiniciar() {
    player1.pts = 0;
    player2.pts = 0;

    player1.y = 250;
    player2.y = 250;

    player1.dir = 0;
    player2.dir = 0;

    centralizarBola(Math.random() < 0.5 ? -1 : 1);

    estado = "play";
}

document.addEventListener("keydown", function(event) {
    if (["ArrowUp", "ArrowDown", "Space"].includes(event.code)
    ) {
        event.preventDefault();
    }

    if (event.key === "w") {
        player1.dir = -7;
    }

    if (event.key === "s") {
        player1.dir = 7;
    }

    if (event.code === "ArrowUp") {
        player2.dir = -7;
    }

    if (event.code === "ArrowDown") {
        player2.dir = 7;
    }

    if (event.code === "Space") {
        if (estado === "menu" || estado === "over") {
            reiniciar();
            console.log(event.code);
        }
    }
});

document.addEventListener("keyup", function(event) {

    if (event.key === "w") {
        player1.dir = 0;
    }

    if (event.key === "s") {
        player1.dir = 0;
    }

    if (event.code === "ArrowUp") {
        player2.dir = 0;
    }

    if (event.code === "ArrowDown") {
        player2.dir = 0;
    }
});