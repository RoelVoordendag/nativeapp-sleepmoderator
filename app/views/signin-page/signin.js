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
                        
                        var path = "views/dashboard/dashboard";
                        //beacasue data.user keeps existing this variable is to check if you are still logged in
                        global.logout = 0;

                        //module name is the path to the page 
                        //context is the data u send to the nex page
                        var userData={
                                moduleName: path,
                                context:{
                                            username: user.name,
                                            userId: user.id
                                        }
                            }
    
                        frameModule.topmost().navigate(userData);

                        global.falseLogin = false;

                    }else{
                        global.falseLogin = true;
                    }
                    console.log(falseLogin);
                }  
            })
            //if login is not correct message is shown
            if(global.falseLogin){
                dialogs.alert({
                    title: "Not logged in",
                    message: "You must be logged in to be on this page. Please log in",
                    okButtonText: "OK"
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