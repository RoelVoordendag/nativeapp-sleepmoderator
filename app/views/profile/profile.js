var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");

var drawer;

var pageData =  new Observable();

//function starts wen page is loaded
function pageLoaded(args){
    //var for the objects in the page
    var page = args.object;

    drawer = view.getViewById(page, "sideDrawer");
    
    var name = view.getViewById(page, "name");

    page.bindingContext = {
        name:  "Roel Voordendag"
    }


}
exports.pageLoaded = pageLoaded;



exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};

exports.logout = function(){
    console.log('lmao')
}
