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

Game.resMan = new ResourceMan();
Game.resMan.root = "gfx/";
Game.resMan.add("cat", "cat.jpg");
Game.resMan.add("catgag", "catgag.png");
Game.resMan.add("vacuum", "vacuum.png");
Game.resMan.add("vacuum1", "vacuum_1.png");
Game.resMan.add("vacuum2", "vacuum_2.png");
Game.resMan.add("vacuum11", "vacuum_11.png");
Game.resMan.add("vacuum12", "vacuum_12.png");
Game.resMan.add("vacuum21", "vacuum_21.png");
Game.resMan.add("vacuum22", "vacuum_22.png");
Game.resMan.done = function() {
    window.Log("done");
    Game.init();
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
    
    Game.resMan.loadAll(function() {
        window.Log(Game.resMan.progress() + "% loaded");
    });
    
    //Game.init();
}

