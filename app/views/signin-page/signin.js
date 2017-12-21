var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");

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

