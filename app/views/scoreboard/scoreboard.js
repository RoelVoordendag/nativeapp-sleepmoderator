var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var dialogs = require("ui/dialogs");

var drawer;

var pageData =  new Observable();

//function starts wen page is loaded
function pageLoaded(args){
    //checking if you are logged in
    if(global.logout){
        //popup message
        dialogs.alert({
            title: "Not logged in",
            message: "You must be logged in to be on this page. Please log in",
            okButtonText: "OK"
        }).then(function () {
            console.log("Dialog closed!");
        });

        frameModule.topmost().navigate('views/signin-page/signin');
    }
    //var for the objects in the page
    var page = args.object;

    drawer = view.getViewById(page, "sideDrawer");
    
    //getting name from sidedrawer
    var name = view.getViewById(page, "name");

    page.bindingContext = {
        name:  global.currentUsername,
    }
   
}
exports.pageLoaded = pageLoaded;

exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};


exports.logOut = function(){
    dialogs.alert({
        title: "Log Out",
        message: "You are logged out.",
        okButtonText: "OK"
    }).then(function () {
        global.logout = true;        

        frameModule.topmost().navigate('views/signin-page/signin');
    });
}


