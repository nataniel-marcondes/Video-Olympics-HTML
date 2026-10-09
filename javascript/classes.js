class Obj{
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    } 
    desenha(){

    }
    collide(obj){
            if(this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y){
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