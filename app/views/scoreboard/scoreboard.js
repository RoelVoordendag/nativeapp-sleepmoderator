var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var dialogs = require("ui/dialogs");
var http = require("http");
var observableModule = require("data/observable");

var drawer;

var pageData =  new Observable();

var scoreGuus;
var scoreMark;
var scoreRoel;
var latestSessionId;


//function starts when page is loaded
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

    //calculating score for picture 
    if(global.totalScore <=70 ){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-brons.png";
    }else if(global.totalScore >=70 && global.totalScore<=430){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-silver.png";
    }else if(global.totalScore >= 431){
        page.getViewById("circle").backgroundImage = "~/images/badges/profile-gold.png";
    }
    
    var scoreBoard = view.getViewById(page, "scoreBoard");

    //get the scores and show on screen
    // for(var i = 1; i <3; i++){ 
    // var i = 3;
    //     console.log("Gelijk na for loop is i: "+i);
    console.log("doet log het nog?")
        //get latest session for user 1
        http.getJSON("http://markvonk.com/sleep/sessions.php?user=1").then(function (r){

            latestSessionId = r[r.length-1].session_id;
            console.log("na req 1 is i: "+i);
            console.log('session id: ' + latestSessionId);
            
            //get latest session for user 1
            http.getJSON("http://markvonk.com/sleep/sessions.php?user=1&session=" + latestSessionId).then(function (r){

                console.log("na req 2 is i: "+i);

                    totalscore = r[0].score;
                    scoreGuus = r[0].score;
                    console.log('wat is deze score' + totalscore)
                    if(totalscore <=70 ){
                        page.getViewById("guus").backgroundImage = "~/images/badges/score-brons.png";
                    }else if(totalscore >=70 && totalscore<=430){
                        page.getViewById("guus").backgroundImage = "~/images/badges/score-silver.png";
                    }else if(totalscore >= 431){
                        page.getViewById("guus").backgroundImage = "~/images/badges/score-gold.png";
                    }    
            }, function (e) {

                var apidata = e;
                console.log(e);
        
            });
        }, function (e) {

            var apidata = e;
            console.log(e);
    
        });

        //get latest session for user 2
        http.getJSON("http://markvonk.com/sleep/sessions.php?user=1").then(function (r){

            latestSessionId = r[r.length-1].session_id;
            console.log("na req 1 is i: "+i);
            console.log('session id: ' + latestSessionId);
            
            //get latest session for user 2
            http.getJSON("http://markvonk.com/sleep/sessions.php?user=1&session=" + latestSessionId).then(function (r){

                console.log("na req 2 is i: "+i);

                        totalscore = r[0].score;
                        scoreMark= r[0].score;
                        console.log('wat is deze score' + totalscore)
                    if(totalscore <=70 ){
                        page.getViewById("mark").backgroundImage = "~/images/badges/score-brons.png";
                    }else if(totalscore >=70 && totalscore<=430){
                        page.getViewById("mark").backgroundImage = "~/images/badges/score-silver.png";
                    }else if(totalscore >= 431){
                        page.getViewById("mark").backgroundImage = "~/images/badges/score-gold.png";
                    }
            }, function (e) {

                var apidata = e;
                console.log(e);
        
            });
        }, function (e) {

            var apidata = e;
            console.log(e);
    
        });

        //get latest session for user 3
        http.getJSON("http://markvonk.com/sleep/sessions.php?user=1").then(function (r){

            latestSessionId = r[r.length-1].session_id;
            console.log("na req 1 is i: "+i);
            console.log('session id: ' + latestSessionId);
            
            //get latest session for user 3
            http.getJSON("http://markvonk.com/sleep/sessions.php?user=1&session=" + latestSessionId).then(function (r){

                console.log("na req 2 is i: "+i);

                        totalscore = r[0].score;
                        scoreRoel= r[0].score;
                        console.log('wat is deze score' + totalscore)
                    if(totalscore <=70 ){
                        page.getViewById("roel").backgroundImage = "~/images/badges/score-brons.png";
                    }else if(totalscore >=70 && totalscore<=430){
                        page.getViewById("roel").backgroundImage = "~/images/badges/score-silver.png";
                    }else if(totalscore >= 431){
                        page.getViewById("roel").backgroundImage = "~/images/badges/score-gold.png";
                    }              
            }, function (e) {

                var apidata = e;
                console.log(e);
        
            });
        }, function (e) {

            var apidata = e;
            console.log(e);
    
        });
        
        var text = new observableModule.fromObject({
            name: global.currentUsername,
            guusScore: scoreGuus,
            markScore: scoreMark,
            roelScore: scoreRoel
        });
    

    page.bindingContext = text;   
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
