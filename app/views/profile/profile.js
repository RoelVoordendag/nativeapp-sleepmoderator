var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var dialogs = require("ui/dialogs");
var http = require("http");


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

    if(global.totalScore <=70 ){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-brons.png";
    }else if(global.totalScore >=70 && global.totalScore<=430){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-silver.png";
    }else if(global.totalScore >= 431){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-gold.png";
    }

    
    page.getViewById("icon").backgroundImage = "https://cdn.shopify.com/s/files/1/0185/5092/products/persons-0024_grande.png?v=1369543702";


    drawer = view.getViewById(page, "sideDrawer");
    
    var name = view.getViewById(page, "name");

    page.bindingContext = {
        name:  global.currentUsername,
    
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
    dialogs.alert({
        title: "Log Out",
        message: "You are logged out.",
        okButtonText: "OK"
    }).then(function () {
        global.logout = true;        

        frameModule.topmost().navigate('views/signin-page/signin');
    });
}
