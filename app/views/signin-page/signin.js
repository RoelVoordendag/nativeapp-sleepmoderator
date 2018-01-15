var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var http = require("http");
var dialogs = require("ui/dialogs");

var pageData =  new Observable();

// loginButton
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


            //getting data
            http.getJSON('http://markvonk.com/sleep/users.php').then(function (r) {

                //looping through the users to check if u can log in 
                for(var i = 0; i<= r.length; i++){
                    var user = r[i];

                    if(email.text == user.email && password.text == user.password){
                        
                        console.log("deze user is ingelogd" + user.name + "met dit wachtwoord " + user.password);
                        
                        //beacasue data.user keeps existing this variable is to check if you are still logged in
                        global.logout = 0;

                        global.loginId = user.id;
                        //name of current logged in user
                        global.currentUsername = user.name;

                        global.falseLogin = false;

    
                        frameModule.topmost().navigate("views/dashboard/dashboard");
                    }else{
                        global.falseLogin = true;
                    }
                }  
            })
            //if login is not correct message is shown
            if(global.falseLogin){
                dialogs.alert({
                    title: "Your data is not correct",
                    message: "Try to login again.",
                    okButtonText: "Try Again"
                })        
            }
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