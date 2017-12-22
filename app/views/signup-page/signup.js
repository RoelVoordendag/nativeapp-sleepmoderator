var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");

var pageData = new Observable();

//this function starts when the page is loaded
function pageLoaded(args) {
    //var page are the objects in the page
    var page = args.object;
    //here I get the objects by id
    var name = view.getViewById(page, "name");
    var email = view.getViewById(page, "email");
    var password = view.getViewById(page, "password");
    //here i give the text data to use
    page.bindingContext = {
        name: "\uf007 Full Name",
        email: "\uf0e0 Email",
        password: "\uf023 Password",
        //these functions clear the textfield when they are clicked
        deleteName: function () {
            name.text = "";
        },
        deleteEmail: function(){
            email.text="";
        },
        deletePassword: function(){
            password.text = "";
        }
    };
}
exports.pageLoaded = pageLoaded;
//functoin to go to sign in page
exports.signInPage = function(){
    frameModule.topmost().navigate("views/signin-page/signin");
}
//function to go back to home page
exports.goBack = function(){
    frameModule.topmost().navigate("views/homepage/home")
}
