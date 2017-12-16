var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;

var pageData = new Observable();
pageData.generationData = [
  { generation: "One", count: 15 },
  { generation: "Two", count: 10 }
];

exports.pageLoaded = function(args) {
  var page = args.object;
  page.bindingContext = pageData;
};