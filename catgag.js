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

window.Log = function(str) {
    var ts = Date.now().toString();
    ts = ts.substr(ts.length - 6);
    window.LogElem.value = ts + " " + str + "\n" + window.LogElem.value;
}

window.onload = function() {
    window.LogElem = document.getElementById("log");
    window.Log("window.onload()");
    Ticker.setFPS(30);
    Game.init();
}

