var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;

var pageData = new Observable();
pageData.dummyData = [
  { data: "One", count: 15 },
  { data: "Two", count: 10 }
];
exports.register = function() {
  frameModule.topmost().navigate("views/signup-page/signup");
};
exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = pageData;
};
exports.signIn = function(){
  frameModule.topmost().navigate("views/signin-page/signin")
}