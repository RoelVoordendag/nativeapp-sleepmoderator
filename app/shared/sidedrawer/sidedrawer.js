var view = require("ui/core/view");
var drawer;
var frameModule = require("ui/frame"); 

exports.pageLoaded = function(args) {
    var page = args.object;
    drawer = view.getViewById(page, "sideDrawer");
};

exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};

exports.goToDashboard = function(){
    frameModule.topmost().navigate("views/dashboard/dashboard");
};
exports.goToAlarm = function(){
    frameModule.topmost().navigate("views/alarm/alarm");
};
exports.goToScore =  function(){
    frameModule.topmost().navigate("views/scoreboard/scoreboard");
};
exports.goToNotification =  function(){
    frameModule.topmost().navigate("views/notification/notification")
};