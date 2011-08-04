(function(window) {

function Cat() {
    this.initialize();
}
var p = Cat.prototype = new Container();

    p._barrelRolling = false;
    p._rollState = 0;
    p._maxRollState = 0;
    p._gagging = false;
    p._gags = [];

    p.base_initialize = p.initialize;
    p.initialize = function() {
        p.base_initialize();
        
        var _this = this;
        
        this.img = new Image();
        this.img.onload = function() { _this.setup(); };
        this.img.src = "cat.jpg";
    };

    p.setup = function() {
        this.gfx = new Bitmap(this.img);
        this.addChild(this.gfx);
           
        this.regX = this.img.width / 2;
        this.regY = this.img.height / 2;
    }
    
    p.tick = function() {
        if (this._barrelRolling) {
            this.rotation += 360.0 / this._maxRollState;
            this._rollState++;
            
            if (this._rollState >= this._maxRollState) {
                this._rollState = 0;
                this._barrelRolling = false;
            }
        }
        
        for (i = 0; this._gags[i]; i++) {
            if (this._gags[i].escaped && this.rect().collidesWith(this._gags[i].rect())) {
                window.Log("CATCHED");
                this.getStage().removeChild(this._gags[i]);
                this._gags.splice(i, 1);
            }
        }
    }
    
    // Starts the barrelroll if the cat's not currently rolling about
    p.barrelRoll = function() {
        if (!this._barrelRolling) {
            this._rollState = 0;
            this._barrelRolling = true;
            this._maxRollState = Ticker.getFPS() * 1.5;
        }
    }
    
    // Makes the cat gag
    p.gag = function() {
        if (!this._gagging) {
            this._gagging = true;
            this._gags.push(new Gag(this, this.x, this.y, this.rotation));
            window.setTimeout(function(cat) { cat._gagging = false; }, 250, this);
        }
    }
    
    p.rect = function() {
        return new Rectangle(this.x-this.regX, this.y-this.regY, this.img.width, this.img.height);
    }

window.Cat = Cat;
}(window));
