(function(window) {

var Game = function() { };

Game.init = function() {
    this.canvas = document.getElementById("canvas");
    this.stage = new Stage(this.canvas);
    
    this.stage.preventDefaultKeys(["space", "up", "down", "left", "right"]);
    
    this.cat = new Cat();
    this.cat.x = this.canvas.width / 2;
    this.cat.y = this.canvas.height / 2;
    
    this.stage.addChild(this.cat);
    
    Ticker.addListener(this);
};

Game.tick = function() {
    this.handleKeys();
    this.stage.update();
};

Game.handleKeys = function() {
    var stage = this.stage;
    
    if (stage.isKeyPressed("space")) { this.cat.gag(); }
    
    if (stage.isKeyPressed("left")) { this.cat.x -= 5; }
    if (stage.isKeyPressed("right")) { this.cat.x += 5; }
    if (stage.isKeyPressed("up")) { this.cat.y -= 5; }
    if (stage.isKeyPressed("down")) { this.cat.y += 5; }
    
    if (stage.isKeyPressed("a")) { this.cat.barrelRoll(); }
}

window.Game = Game;
}(window));

window.onload = function() { Ticker.setFPS(30); Game.init(); }

