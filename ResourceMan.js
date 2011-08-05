(function(window) {

var ResourceMan = function() {
    this.initialize();
}
var p = ResourceMan.prototype;

ResourceMan.fileType = {
    "png": "image",
    "jpg": "image",
    "jpeg": "image",
};

ResourceMan.getFileType = function(url) {
    re = /\.(.+)$/
    
    suffix = re.exec(url)[1];
    
    if (suffix && suffix in ResourceMan.fileType) {
        return ResourceMan.fileType[suffix];
    }
    
    return "unknown";
}

    p._sources = null;
    p._loading = null;
    p._resources = null;
    
    p._progress = 0;
    
    // callback when loading is done
    p.done = null;
    
    // prefix every url with this
    p.root = "";

    p.initialize = function() {
        this._sources = new Array();
        this._loading = {}
        this._resources = {};
        this._progress = 0;
        this.done = null;
        this.root = "";
    }
    
    p.add = function(n, url) {
        var src = {};
        src.url = this.root + url;
        src.n = n;
        this._sources.push(src);
        //this._sources[n] = this.root + url;
    }
    
    p.get = function(n) {
        if (n in this._resources) {
            return this._resources[n];
        }
        
        return null;
    }

    p.progress = function() {
        return this._progress / this._sources.length * 100;
    }
    
    p.loadAll = function(onload) {
        var _this = this;
        
        for (var i = 0; i < this._sources.length; i++) {
            var src = this._sources[i];
            var ft = ResourceMan.getFileType(src.url);
            
            var res = {};
            res.n = src.n;
            res.onload = onload;
            res.type = ft;
            res.resman = this;
            
            switch (ft) {
                case "image":
                    res.img = new Image();
                    res.img.res = res;
                    res.img.onload = _this._resourceLoaded;
                    res.img.src = src.url;
                    break;
            }
            
            this._loading[res.n] = res;
        }
    }
    
    p._resourceLoaded = function(res) {
        var res = this.res;
        var resman = res.resman;
        
        switch (res.type) {
            case "image":
                resman._resources[res.n] = res.img;
                break;
        }
        
        resman._progress++;
        
        if (res.onload) res.onload();
        if (resman._progress == resman._sources.length && resman.done) resman.done();
    }

window.ResourceMan = ResourceMan;
}(window))
