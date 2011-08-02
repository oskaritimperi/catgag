function CatGAGGame() {
    //! Returns true if the item is outside the canvas.
    function outsideCanvas(item) {
        return (item.x < 0 || item.y < 0 || item.x > jaws.width || item.y > jaws.height);
    }
    
    //! Our hero, the Cat!
    var Cat = function() {
        this.barrelRolling = false;
        this.anchor("center");
        this.setImage("cat.jpg");
        
        this._rollState = 0;
        this._shooting = false;
        
        this.gags = new jaws.SpriteList();
        
        this.update = function() {
            if (this.barrelRolling) {
                this.rotate(360.0 / 45.0);
                
                this._rollState++;
                
                if (this._rollState >= 45) {
                    this._rollState = 0;
                    this.barrelRolling = false;
                }
            }
            
            for (i = 0; this.gags[i]; i++) {
                if (this.gags[i].escaped && this.rect().collideRect(this.gags[i].rect())) {
                    this.gags.splice(i, 1);
                }
            }
            
            this.gags.update();
            this.gags.deleteIf(outsideCanvas);
        }
        
        this.barrelRoll = function() {
            this.barrelRolling = true;
        }
        
        this.shoot = function() {
            if (!this._shooting) {
                this._shooting = true;
                this.gags.push(new CatGag(this, this.x, this.y, this.angle));
                window.setTimeout(function(cat) { cat._shooting = false; }, 250, this);
            }
        }
        
        this._old_draw = this.draw;
        this.draw = function() {
            this._old_draw();
            this.gags.draw();
        }
    };
    Cat.prototype = new jaws.Sprite({});
        
    var CatGag = function(cat, x, y, dir) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.cat = cat;
        this.escaped = false; //! False if the gag hasn't escaped the cat yet
        
        this.update = function() {
            if (!this.escaped && !this.rect().collideRect(this.cat.rect())) {
                this.escaped = true;
            }
        
            this.x += Math.cos(this.dir * Math.PI / 180.0) * 2;
            this.y += Math.sin(this.dir * Math.PI / 180.0) * 2;
        }
    };
    CatGag.prototype = new jaws.Sprite({image: "catgag.png"});
    
    var cat;
    
    this.setup = function() {
        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"])

        cat = new Cat();
        cat.x = 100; cat.y = 100;
    };
    
    this.update = function() {
        if (jaws.pressed("left")) {
            cat.x -= 5;
        }
        
        if (jaws.pressed("right")) {
            cat.x += 5;
        }
        
        if (jaws.pressed("up")) {
            cat.y -= 5;
        }
        
        if (jaws.pressed("down")) {
            cat.y += 5;
        }
        
        if (jaws.pressed("space") && !cat.barrelRolling) {
            cat.barrelRoll();
        }
        
        if (jaws.pressed("z")) {
            cat.shoot();
        }
        
        cat.update();
    };
    
    this.draw = function() {
        jaws.clear();
        cat.draw();
    };
}

window.onload = function() {
    jaws.assets.add("cat.jpg");
    jaws.assets.add("catgag.png");
    
    jaws.start(CatGAGGame, {fps: 30});
};
