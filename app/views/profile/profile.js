var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var dialogs = require("ui/dialogs");
var http = require("http");
var drawer;

//vars for graph
var dates = [];
var sleephours = [];
var deepsleephours =[];

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
        page.getViewById("icon").backgroundImage = "~/images/badges/profile-brons.png";
    }else if(global.totalScore >=70 && global.totalScore<=430){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-silver.png";
        page.getViewById("icon").backgroundImage = "~/images/badges/profile-silver.png";
    }else if(global.totalScore >= 431){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-gold.png";
        page.getViewById("icon").backgroundImage = "~/images/badges/profile-gold.png";
    }

    drawer = view.getViewById(page, "sideDrawer");
    
    var name = view.getViewById(page, "name");
    
    //get all sessions, select the latest 5 and store them as a var
    http.getJSON("http://markvonk.com/sleep/sessions.php?user="+loginId).then(function (r) {

        console.dir(r);

        var sessionnumber = r.length;
        
        if(sessionnumber > 5){
            sessionnumber = 5; 
        }
        console.log("sessies die er nu zijn: "+sessionnumber);

        for (i = 0; i < sessionnumber; i++) { 
            dates[i] = r[i].date;
            sleephours[i] = [r[i].total_sleep];
            deepsleephours[i] =[r[i].total_deep];
        }

        console.dir(dates);
        console.dir(sleephours);
        console.dir(deepsleephours);
        console.log(dates[0]);
        console.log(sleephours[0]);
        page.bindingContext = {
            name:  global.currentUsername,
        
        sleepData : [
            { day: dates[0], hours: parseInt(sleephours[0][0]) }, { day: dates[1], hours: parseInt(sleephours[1][0]) }, { day: dates[2], hours: parseInt(sleephours[2][0]) },
            { day: dates[3], hours: parseInt(sleephours[3][0]) }, { day: dates[4], hours: parseInt(sleephours[4][0]) }
          ],
          deepSleep : [
            { day: dates[0], hours: parseInt(deepsleephours[0][0]) }, { day: dates[1], hours: parseInt(deepsleephours[2][0]) }, { day: dates[2], hours: parseInt(deepsleephours[2][0]) },
            { day: dates[3], hours: parseInt(deepsleephours[3][0]) }, { day: dates[4], hours: parseInt(deepsleephours[4][0]) }
          ]
        };

    }, function (e) {        
        var apidata = e;
        console.log(e);
    });
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
