var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var dialogs = require("ui/dialogs");
var http = require("http");
var drawer;
var pageData =  new Observable();
var observableModule = require("data/observable");

//global for passing data
var timeSleptTextPlaceholder = "Geslapen Text Placeholder";
var deepSleepTextPlaceholder = " ";
var latestSession;
var latestBpm;
var latestSessionId;
var totalscore;



function pageLoaded(args){

    //Login check and user id pass
        //var for the objects in the page
        var page = args.object;

        if(global.logout){
            dialogs.alert({
                title: "Not logged in",
                message: "You must be logged in to be on this page. Please log in",
                okButtonText: "OK"
            }).then(function () {
                console.log("Dialog closed!");
            });

            frameModule.topmost().navigate('views/signin-page/signin');
        }

    //Sidedrawer            
    drawer = view.getViewById(page, "sideDrawer");

}
exports.pageLoaded = pageLoaded;


    //Please add some more comments Roel I have no idea what is going on
        exports.toggleDrawer = function() {
            drawer.toggleDrawerState();
        };


        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var frameModule = require("tns-core-modules/ui/frame");
        // >>W0gPSBNYXRoLnJhbmRvbSgpICogMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ== gauges-indicators-bars-animate

function onNavigatedTo(args) {

    var page = args.object;

    //get latest session
    http.getJSON("http://markvonk.com/sleep/sessions.php?user="+loginId).then(function (r){
        console.log("latest session plz"+r[r.length-1])
        var latestSession = r[r.length-1];
        console.dir(latestSession);
        var latestSessionId = r[r.length-1].session_id;

        console.log("the latest session id is " +latestSessionId);
        console.log("latest sessions total sleep is "+latestSession.total_sleep);

        //Check if the latest session's sleep total is undefined, start calculation
        if (latestSession.total_sleep == "") {

               console.log("ik voer de functie uit");
            //Calculate sleep hours
            http.getJSON("http://markvonk.com/sleep/heartrates.php?user="+loginId+"&session="+latestSessionId).then(function (r) {
                    
                //Set total hours slept
                var startdate = r[0].date;
                var starttime = startdate.substr(startdate.length - 8);
                var starttime = starttime.substr(0, 5);
                var enddate = r[r.length-1].date;
                var endtime = enddate.substr(enddate.length - 8);
                var endtime = endtime.substr(0, 5);

                console.log(starttime);
                console.log(endtime);

                var dif = ( new Date("1970-1-1 " + endtime) - new Date("1970-1-1 " + starttime) ) / 1000 / 60 / 60;
                var totaltimeslept = Math.round( dif * 10 ) / 10;         
                
                var totaldeepsleep = (totaltimeslept / 100) * 25;
                totaldeepsleep = Math.round(totaldeepsleep * 10 ) / 10; 

                //get date
                var sleepdate = startdate.substr(0, 10);
                console.log("datum is "+sleepdate);

                //load the processed data into the page

                //getting profile picture based on score
                if(totalscore <=70 ){
                    page.getViewById("circle").backgroundImage = "~/images/badges/profile-brons.png";
                }else if(totalscore >=70 && totalscore<=430){
                    page.getViewById("circle").backgroundImage = "~/images/badges/profile-silver.png";
                }else if(totalscore >= 431){
                    page.getViewById("circle").backgroundImage = "~/images/badges/profile-gold.png";
                }

                //total time Slept Gauge 

                //getting Gauge
                var gaugeView = frameModule.topmost().getViewById("gaugeView");

                //Calculate percentage for total sleep bar
                var targettotalslept = 7.5;
                var targetdeepsleep = (7.5/100)*22;

                var percentagetotalslept = (totaltimeslept / targettotalslept) * 100;
                var percentagedeepsleep = (totaldeepsleep / targetdeepsleep) * 100;

                if (percentagetotalslept > 100){
                    percentagetotalslept = 100;
                }

                if (percentagedeepsleep > 100){
                    percentagedeepsleep = 100;
                }

                //Set message on the side                
                if(totaltimeslept >= targettotalslept){
                    timeSleptTextPlaceholder = "That was a great night, keep it up!";
                } else if (totaltimeslept >= 6){                    
                    timeSleptTextPlaceholder = "Almost there, try to go to bed a little sooner tonight";
                } else if (totaltimeslept < 6){
                    timeSleptTextPlaceholder = "You didn't sleep enough last night";
                }

                totalscore = totaltimeslept * 100;

                //Push sleep hours to the database of this session
                    http.getJSON("http://markvonk.com/sleep/updateSession.php?session_id="+latestSessionId+"&user_id="+loginId+"&date="+sleepdate+"&sleep_start="+starttime+"&sleep_end="+endtime+"&total_sleep="+totaltimeslept+"&total_deep="+totaldeepsleep+"&score="+totalscore).then(function (r) {
                        var emptyfunction = "notsogoodbutdontknowotherway";
                    }, function (e) {
                        var apidata = e;
                        console.log(e);
                    });
                    
                //Set total time slept for gauge
                timeSlept = totaltimeslept;
                //create title in the gauge middle
                gaugeView.title = timeSlept + "H";
                //getting indicators to tell how far the bar goes
                var scale = gaugeView.scales.getItem(0);
                var barIndicator = scale.indicators.getItem(1);
                                    
                barIndicator.maximum =  percentagetotalslept;


                //Deep sleep Section Gauge
                var deepSleepGauge = frameModule.topmost().getViewById("DeepSleepGauge");
                deepSleep = totaldeepsleep;
                //title
                deepSleepGauge.title = deepSleep + "H";
                //indicator
                var deepScale = deepSleepGauge.scales.getItem(0);
                var indicatorDeepSleep = deepScale.indicators.getItem(1);

                indicatorDeepSleep.maximum = percentagedeepsleep;    
                        
                //set the messages that need to be shown on the page
                var sleeptext = new observableModule.fromObject({
                    timeSleptText : [timeSleptTextPlaceholder],
                    deepSleepText : [deepSleepTextPlaceholder],
                    name: global.currentUsername
                });

                page.bindingContext = sleeptext;     

            }, function (e) {
                var apidata = e;
                console.log(e);
            });

        } else {

        //if the data was already saves, get the processed data from the users latest session
        http.getJSON("http://markvonk.com/sleep/sessions.php?user="+loginId+"&session="+latestSessionId).then(function (r) {
            console.dir(r[0]);
            //save the data in vars to be used by the page
            var totaltimeslept = r[0].total_sleep;
            var totaldeepsleep = r[0].total_deep;
            totalscore = r[0].score;
            
            global.totalScore = totalscore;
            console.log("The user's score is: "+totalscore);

            console.log("total time slept from db is "+totaltimeslept);
            console.log("total deep slept from db is "+totaldeepsleep);

             //getting profile picture based on score
             if(totalscore <=70 ){
                page.getViewById("circle").backgroundImage = "~/images/badges/profile-brons.png";
            }else if(totalscore >=70 && totalscore<=430){
                page.getViewById("circle").backgroundImage = "~/images/badges/profile-silver.png";
            }else if(totalscore >= 431){
                page.getViewById("circle").backgroundImage = "~/images/badges/profile-gold.png";
            }

            //total time Slept Gauge 

            //getting Gauge
            var gaugeView = frameModule.topmost().getViewById("gaugeView");

            //Calculate percentage for total sleep bar
            var targettotalslept = 7.5;
            var targetdeepsleep = (7.5/100)*25;

            var percentagetotalslept = (totaltimeslept / targettotalslept) * 100;
            var percentagedeepsleep = (totaldeepsleep / targetdeepsleep) * 100;

            if (percentagetotalslept > 100){
                percentagetotalslept = 100;
            }

            if (percentagedeepsleep > 100){
                percentagedeepsleep = 100;
            }

            //Set message on the side                
            if(totaltimeslept >= targettotalslept){
                timeSleptTextPlaceholder = "That was a great night, keep it up!" 
            } else if (totaltimeslept >= 6){                    
                timeSleptTextPlaceholder = "Almost there, try to go to bed a little sooner tonight"
            } else if (totaltimeslept < 6){
                timeSleptTextPlaceholder = "You didn't sleep enough last night"
            }
            //Set total time slept for gauge
            timeSlept = totaltimeslept;
            //create title in the gauge middle
            gaugeView.title = timeSlept + "H";
            //getting indicators to tell how far the bar goes
            var scale = gaugeView.scales.getItem(0);
            var barIndicator = scale.indicators.getItem(1);
                                
            barIndicator.maximum =  percentagetotalslept;


            //Deep sleep Section Gauge
            var deepSleepGauge = frameModule.topmost().getViewById("DeepSleepGauge");
            deepSleep = totaldeepsleep;
            //title
            deepSleepGauge.title = deepSleep + "H";
            //indicator
            var deepScale = deepSleepGauge.scales.getItem(0);
            var indicatorDeepSleep = deepScale.indicators.getItem(1);

            indicatorDeepSleep.maximum = percentagedeepsleep;    
                    
            //set the messages that need to be shown on the page
            var sleeptext = new observableModule.fromObject({
                timeSleptText : [timeSleptTextPlaceholder],
                deepSleepText : [deepSleepTextPlaceholder],
                name: global.currentUsername
            });

            page.bindingContext = sleeptext;     

        }, function (e) {        
            var apidata = e;
            console.log(e);
        });     
        }       
            
    }, function (e) {

        var apidata = e;
        console.log(e);

    });
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsb0NBQW9DO0FBQ3BDLHVCQUE4QixJQUFJO0lBQzlCLElBQUksU0FBUyxHQUE2RCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pILFNBQVMsQ0FBQyxLQUFLLEdBQUUsS0FBSyxDQUFDO0lBQ3ZCLElBQUksSUFBSSxHQUE2RCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlHLElBQUksQ0FBQyxLQUFLLEdBQUUsT0FBTyxDQUFBO0lBQ25CLHNDQUFzQztJQUN0QyxJQUFJLEtBQUssR0FBdUQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQy9DLElBQUksWUFBWSxHQUFxRSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqSCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQWJELHNDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcbmltcG9ydCBnYXVnZXNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXByby11aS9nYXVnZXNcIik7XHJcbi8vID4+IGdhdWdlcy1pbmRpY2F0b3JzLWJhcnMtYW5pbWF0ZVxyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0ZWRUbyhhcmdzKSB7XHJcbiAgICBsZXQgZ2F1Z2VWaWV3OiBnYXVnZXNNb2R1bGUuUmFkUmFkaWFsR2F1Z2UgPSA8Z2F1Z2VzTW9kdWxlLlJhZFJhZGlhbEdhdWdlPmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImdhdWdlVmlld1wiKTtcclxuICAgIGdhdWdlVmlldy50aXRsZSA9XCJob2lcIjtcclxuICAgIGxldCBsbWFvOiBnYXVnZXNNb2R1bGUuUmFkUmFkaWFsR2F1Z2UgPSA8Z2F1Z2VzTW9kdWxlLlJhZFJhZGlhbEdhdWdlPmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInlvd1wiKTtcclxuICAgIGxtYW8udGl0bGUgPVwibG9sb2xcIlxyXG4gICAgLy8gZ2F1Z2VWaWV3LnRpdGxlLnN0eWxlLkNvbG9yID1cInJlZFwiO1xyXG4gICAgbGV0IHNjYWxlOiBnYXVnZXNNb2R1bGUuUmFkaWFsU2NhbGUgPSA8Z2F1Z2VzTW9kdWxlLlJhZGlhbFNjYWxlPmdhdWdlVmlldy5zY2FsZXMuZ2V0SXRlbSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NhbGUuaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBiYXJJbmRpY2F0b3I6IGdhdWdlc01vZHVsZS5SYWRpYWxCYXJJbmRpY2F0b3IgPSA8Z2F1Z2VzTW9kdWxlLlJhZGlhbEJhckluZGljYXRvcj5zY2FsZS5pbmRpY2F0b3JzLmdldEl0ZW0oaSk7XHJcbiAgICAgICAgaWYgKGJhckluZGljYXRvci5tYXhpbXVtID09IDApIHtcclxuICAgICAgICAgICAgYmFySW5kaWNhdG9yLm1heGltd

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