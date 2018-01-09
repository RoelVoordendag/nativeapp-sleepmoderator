import frameModule = require("tns-core-modules/ui/frame");
import gaugesModule = require("nativescript-pro-ui/gauges");
// >> gauges-indicators-bars-animate
export function onNavigatedTo(args) {
    let gaugeView: gaugesModule.RadRadialGauge = <gaugesModule.RadRadialGauge>frameModule.topmost().getViewById("gaugeView");
    gaugeView.title ="hoi";
    let lmao: gaugesModule.RadRadialGauge = <gaugesModule.RadRadialGauge>frameModule.topmost().getViewById("yow");
    lmao.title ="lolol"
    // gaugeView.title.style.Color ="red";
    let scale: gaugesModule.RadialScale = <gaugesModule.RadialScale>gaugeView.scales.getItem(0);
    for (var i = 0; i < scale.indicators.length; i++) {
        let barIndicator: gaugesModule.RadialBarIndicator = <gaugesModule.RadialBarIndicator>scale.indicators.getItem(i);
        if (barIndicator.maximum == 0) {
            barIndicator.maximum = Math.random() * 100;
        }
    }
}