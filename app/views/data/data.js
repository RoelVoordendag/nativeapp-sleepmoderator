var frameModule = require("ui/frame");
var Observable = require("data/observable").Observable;
var view = require("ui/core/view");
var http = require("http");

var pageData = new Observable();
var apidata;
var obj;

    
//this function starts when the page is loaded
function pageLoaded(args) {
    //var page are the objects in the page
    var page = args.object;
    //here I get the objects by id
    var data = view.getViewById(page, "data");
    //here i give the text data to use

    http.getJSON("http://188.226.174.141:8000/api/albums/5a31308a6c5e6e27dc5bbd6f/").then(function (r) {
        //// Argument (r) is JSON!    
        console.log(r.artist);
        
        page.bindingContext = {
            data: r.artist
        };
        
    }, function (e) {
        //// Argument (e) is Error!
        var apidata = e;
        console.log(e);
    });


    
}

exports.pageLoaded = pageLoaded;