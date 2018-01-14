var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var http = require("http");

var pageData =  new Observable();

//function starts wen page is loaded
function pageLoaded(args){
    //var for the objects in the page
    var page = args.object;

    //get object by id
    var email = view.getViewById(page,"email");
    var password = view.getViewById(page, "password");

    //give the var data for on the page
    page.bindingContext = {
        email: "\uf0e0 Email",
        password: "\uf023 Password",
        //function to clear input field
        deleteEmail: function(){
            email.text = "";
        },
        deletePassword: function(){
            password.text = "";
        },
        login : function(){
            console.log("before link");
            //getting data
            http.getJSON('http://markvonk.com/sleep/users.php').then(function (r) {

                console.log('after link');
                //looping through the users to check if u can log in 
                for(var i = 0; i<= r.length; i++){
                    var user = r[i];

                    if(email.text == user.email && password.text == user.password){
                        
                        console.log("deze user is ingelogd" + user.name + "met dit wachtwoord " + user.password);
                        
                        var path = "views/dashboard/dashboard";
                        //beacasue data.user keeps existing this variable is to check if you are still logged in
                        global.logout = 0;

                        //module name is the path to the page 
                        //context is the data u send to the nex page
                        var userData={
                                moduleName: path,
                                context:{
                                            userId: user.id
                                        }
                            }
                        
                        frameModule.topmost().navigate(userData);

                    }else{
                        console.log('eat a dick');
                    }

                    
                }              
            })

        }
    };
}
exports.pageLoaded = pageLoaded;

exports.goBack = function(){
    frameModule.topmost().navigate("views/homepage/home");
}
exports.registrationPage = function(){
    frameModule.topmost().navigate("views/signup-page/signup");
}
// exports.login = function(){
//     http.getJSON("http://markvonk.com/sleep/users.php").then(function (r) {
//         //// Argument (r) is JSON!    
//         console.dir(r);
//         console.log(r);

//         var user = r[0];

//         console.dir(user.name);

        
        
//     }, function (e) {
//         //// Argument (e) is Error!
//         var apidata = e;
//         console.log(e);
//     });





    // frameModule.topmost().navigate("views/dashboard/dashboard");
// }

