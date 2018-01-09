"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("tns-core-modules/ui/frame");
// >> gauges-indicators-bars-animate
function onNavigatedTo(args) {
    var gaugeView = frameModule.topmost().getViewById("gaugeView");
    gaugeView.title = "hoi";
    var lmao = frameModule.topmost().getViewById("yow");
    lmao.title = "lolol";
    // gaugeView.title.style.Color ="red";
    var scale = gaugeView.scales.getItem(0);
    for (var i = 0; i < scale.indicators.length; i++) {
        var barIndicator = scale.indicators.getItem(i);
        if (barIndicator.maximum == 0) {
            barIndicator.maximum = Math.random() * 100;
        }
    }
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBMEQ7QUFFMUQsb0NBQW9DO0FBQ3BDLHVCQUE4QixJQUFJO0lBQzlCLElBQUksU0FBUyxHQUE2RCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pILFNBQVMsQ0FBQyxLQUFLLEdBQUUsS0FBSyxDQUFDO0lBQ3ZCLElBQUksSUFBSSxHQUE2RCxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlHLElBQUksQ0FBQyxLQUFLLEdBQUUsT0FBTyxDQUFBO0lBQ25CLHNDQUFzQztJQUN0QyxJQUFJLEtBQUssR0FBdUQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQy9DLElBQUksWUFBWSxHQUFxRSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqSCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQWJELHNDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7XHJcbmltcG9ydCBnYXVnZXNNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXByby11aS9nYXVnZXNcIik7XHJcbi8vID4+IGdhdWdlcy1pbmRpY2F0b3JzLWJhcnMtYW5pbWF0ZVxyXG5leHBvcnQgZnVuY3Rpb24gb25OYXZpZ2F0ZWRUbyhhcmdzKSB7XHJcbiAgICBsZXQgZ2F1Z2VWaWV3OiBnYXVnZXNNb2R1bGUuUmFkUmFkaWFsR2F1Z2UgPSA8Z2F1Z2VzTW9kdWxlLlJhZFJhZGlhbEdhdWdlPmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcImdhdWdlVmlld1wiKTtcclxuICAgIGdhdWdlVmlldy50aXRsZSA9XCJob2lcIjtcclxuICAgIGxldCBsbWFvOiBnYXVnZXNNb2R1bGUuUmFkUmFkaWFsR2F1Z2UgPSA8Z2F1Z2VzTW9kdWxlLlJhZFJhZGlhbEdhdWdlPmZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nZXRWaWV3QnlJZChcInlvd1wiKTtcclxuICAgIGxtYW8udGl0bGUgPVwibG9sb2xcIlxyXG4gICAgLy8gZ2F1Z2VWaWV3LnRpdGxlLnN0eWxlLkNvbG9yID1cInJlZFwiO1xyXG4gICAgbGV0IHNjYWxlOiBnYXVnZXNNb2R1bGUuUmFkaWFsU2NhbGUgPSA8Z2F1Z2VzTW9kdWxlLlJhZGlhbFNjYWxlPmdhdWdlVmlldy5zY2FsZXMuZ2V0SXRlbSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2NhbGUuaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBiYXJJbmRpY2F0b3I6IGdhdWdlc01vZHVsZS5SYWRpYWxCYXJJbmRpY2F0b3IgPSA8Z2F1Z2VzTW9kdWxlLlJhZGlhbEJhckluZGljYXRvcj5zY2FsZS5pbmRpY2F0b3JzLmdldEl0ZW0oaSk7XHJcbiAgICAgICAgaWYgKGJhckluZGljYXRvci5tYXhpbXVtID09IDApIHtcclxuICAgICAgICAgICAgYmFySW5kaWNhdG9yLm1heGltdW0gPSBNYXRoLnJhbmRvbSgpICogMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==