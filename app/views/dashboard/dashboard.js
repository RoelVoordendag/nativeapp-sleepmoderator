var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
<<<<<<< HEAD
var http = require("http");
=======
var dialogs = require("ui/dialogs");

>>>>>>> 4237b786f049249f267c77a3655656adb794ffe7

var drawer;

var pageData =  new Observable();

//function starts wen page is loaded
function pageLoaded(args){
    //var for the objects in the page
    var page = args.object;

    //getting data from login page
    var data = page.navigationContext;
    //data.userId is the id of the login user 
    //this is variable to check if user is logged in
    global.loginId = data.userId;

    //checking if you are logged in
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

    drawer = view.getViewById(page, "sideDrawer");

    //timeslept section
    var timeSleptText = view.getViewById(page, "timeSleptText");
    var deepSleepText = view.getViewById(page, "deepSleepText");
    var healtySleepText = view.getViewById(page, "healtySleepText");
    var name = view.getViewById(page, "name");


    //give the var data for on the page
    var lmao= false;
    //with this if statemant we can show people a message based on their 
    //sleep time this we can repeat with other functies
    if(!lmao){
        page.bindingContext = {
            timeSleptText: "You slept to short last night",
            deepSleepText: "You had around 2 hours of deep sleep",
            healtySleepText: "You did not have enough sleep last night try to go to bed earlier",
            name:  "Roel Voordendag"
        }
    }
    if(lmao){
        page.bindingContext = { 
            timeSleptText: "test 322",
            deepSleepText: "test 322",
            healtySleepText: "test 322",
            

        }
    }


}
exports.pageLoaded = pageLoaded;



exports.toggleDrawer = function() {
    drawer.toggleDrawerState();
};
//for he graphgs we need to make a calculation 
// exports.login = function(){
//     drawer.toggleDrawerState();
// };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("tns-core-modules/ui/frame");
// >>W0gPSBNYXRoLnJhbmRvbSgpICogMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ== gauges-indicators-bars-animate
function onNavigatedTo(args) {

    //time Slept Gauge 

    //getting Gauge
    var gaugeView = frameModule.topmost().getViewById("gaugeView");
    
    timeSlept = 7;
    //creating title
    gaugeView.title = timeSlept + "H";
    //getting indicators to tell how far it need to go
    var scale = gaugeView.scales.getItem(0);
    var barIndicator = scale.indicators.getItem(1);
            
    barIndicator.maximum =  80;

    //Deep sleep Section Gauge
    var deepSleepGauge = frameModule.topmost().getViewById("DeepSleepGauge");
    deepSleep = 3;
    //title
    deepSleepGauge.title = deepSleep + "H";
    //indicator
    var deepScale = deepSleepGauge.scales.getItem(0);
    var indicatorDeepSleep = deepScale.indicators.getItem(1);

    indicatorDeepSleep.maximum = 40;

    //Healty Sleep Section
    var healtySleepGauge = frameModule.topmost().getViewById("healtySleepGauge");
    healtySleep = 8;
    //title
    healtySleepGauge.title = healtySleep + "H";
    //indicator
    var healtyScale= healtySleepGauge.scales.getItem(0);
    var indicatorHealtySleep = healtyScale.indicators.getItem(1);

    indicatorHealtySleep.maximum = 80;
    
    //Sleep Calculation
    
    //Get all sessions from this user

    //Latest session

        http.getJSON("http://markvonk.com/sleep/heartrates.php?user=1&session=1").then(function (r) {
            // Argument (r) is JSON!   

            //Already calculated?

            //Set total hours slept
            var startdate = r[0].date;
            var startime = startdate.substr(startdate.length - 8);
            var starttime = startime.substr(1, 5);
            var enddate = r[r.length-1].date;
            var endtime = enddate.substr(enddate.length - 8);
            var endtime = endtime.substr(1, 5);

            var dif = ( new Date("1970-1-1 " + endtime) - new Date("1970-1-1 " + starttime) ) / 1000 / 60 / 60;

            console.log(dif);


            //Calculate deep sleep

            //Set deep sleep
                     
        }, function (e) {
            //// Argument (e) is Error!
            var apidata = e;
            console.log(e);
        });
   
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsb0NBQW9DO0FBQ3BDLHVCQUE4QixJQUFJO0lBQzlCLElBQUksU0FBUyxHQUE2RCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pILFNBQVMsQ0FBQyxLQUFLLEdBQUUsS0FBSyxDQUFDO0lBQ3ZCLElBQUksSUFBSSxHQUE2RCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlHLElBQUksQ0FBQyxLQUFLLEdBQUUsT0FBTyxDQUFBO0lBQ25CLHNDQUFzQztJQUN0QyxJQUFJLEtBQUssR0FBdUQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQy9DLElBQUksWUFBWSxHQUFxRSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqSCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQWJELHNDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcbmltcG9ydCBnYXVnZXNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXByby11aS9nYXVnZXNcIik7XHJcbi8vID4+IGdhdWdlcy1pbmRpY2F0b3JzLWJhcnMtYW5pbWF0ZVxyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0ZWRUbyhhcmdzKSB7XHJcbiAgICBsZXQgZ2F1Z2VWaWV3OiBnYXVnZXNNb2R1bGUuUmFkUmFkaWFsR2F1Z2UgPSA8Z2F1Z2VzTW9kdWxlLlJhZFJhZGlhbEdhdWdlPmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImdhdWdlVmlld1wiKTtcclxuICAgIGdhdWdlVmlldy50aXRsZSA9XCJob2lcIjtcclxuICAgIGxldCBsbWFvOiBnYXVnZXNNb2R1bGUuUmFkUmFkaWFsR2F1Z2UgPSA8Z2F1Z2VzTW9kdWxlLlJhZFJhZGlhbEdhdWdlPmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInlvd1wiKTtcclxuICAgIGxtYW8udGl0bGUgPVwibG9sb2xcIlxyXG4gICAgLy8gZ2F1Z2VWaWV3LnRpdGxlLnN0eWxlLkNvbG9yID1cInJlZFwiO1xyXG4gICAgbGV0IHNjYWxlOiBnYXVnZXNNb2R1bGUuUmFkaWFsU2NhbGUgPSA8Z2F1Z2VzTW9kdWxlLlJhZGlhbFNjYWxlPmdhdWdlVmlldy5zY2FsZXMuZ2V0SXRlbSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NhbGUuaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBiYXJJbmRpY2F0b3I6IGdhdWdlc01vZHVsZS5SYWRpYWxCYXJJbmRpY2F0b3IgPSA8Z2F1Z2VzTW9kdWxlLlJhZGlhbEJhckluZGljYXRvcj5zY2FsZS5pbmRpY2F0b3JzLmdldEl0ZW0oaSk7XHJcbiAgICAgICAgaWYgKGJhckluZGljYXRvci5tYXhpbXVtID09IDApIHtcclxuICAgICAgICAgICAgYmFySW5kaWNhdG9yLm1heGltd

exports.logOut = function(){

    global.logout = true;    
    
    frameModule.topmost().navigate('views/signin-page/signin');

}
