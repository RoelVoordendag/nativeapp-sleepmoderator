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
    console.log('dit is het id waarmee je bent ingelodg' + global.loginId);
    //var for the objects in the page
    var page = args.object;

    drawer = view.getViewById(page, "sideDrawer");
    
    var name = view.getViewById(page, "name");

    page.bindingContext = {
        name:  "Roel Voordendag",
    
    sleepData : [
        { day:"Maandag", hours:2 , test: 2 }, { day:"Dinsdag", hours: 8 }, { day: "Woensdag",hours: 9 },
        { day: "Donderdag", hours: 8 }, { day:"Vrijdag", hours: 7 },{ day: "Zaterdag", hours: 8 },
        { day: "Zondag", hours: 7.5 }
      ],
      deepSleep : [
          { day:"Maandag", hours: 2}, { day:"Dinsdag", hours: 5 }, { day: "Woensdag",hours: 2 },
          { day: "Donderdag", hours: 4 }, { day:"Vrijdag", hours: 3 },{ day: "Zaterdag", hours:5 },
          { day: "Zondag", hours: 2.2 }
      ]
    };
}
exports.pageLoaded = pageLoaded;



exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};

exports.logOut = function(){
    global.logout = 1;

    frameModule.topmost().navigate('views/signin-page/signin');

}
