class Obj{
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    } 
    desenha(pincel) {
        pincel.fillStyle = this.color;
        pincel.fillRect(this.x, this.y, this.w, this.h);
    }
    collide(obj){
            if(
                this.x < obj.x + obj.w &&
                this.x + this.w > obj.x &&
                this.y < obj.y + obj.h &&
                this.y + this.h > obj.y){
                    return true;
                }else {
                    return false;

                }
        }
}

class Bola extends Obj{
    dirX = 8;
    dirY = 2;
}

class Player extends Obj{
    pts = 0;
    dir = 0;
}

class Text{

}