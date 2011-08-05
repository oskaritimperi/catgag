(function(window) {

var VacuumCleaner = function() {
    this.initialize();
}
var p = VacuumCleaner.prototype = Container;

    p.base_initialize = p.initialize();
    p.initialize = function() {
    }

window.VacuumCleaner = VacuumCleaner;
}(window))
