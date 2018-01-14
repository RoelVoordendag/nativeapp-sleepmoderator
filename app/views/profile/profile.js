var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");

var drawer;

var pageData =  new Observable();

//function starts wen page is loaded
function pageLoaded(args){
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

exports.logout = function(){
    console.log('lmao')
}
