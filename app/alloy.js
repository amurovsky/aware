// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.iphoneSmall = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 480); 
Alloy.Globals.iphoneTall = (OS_IOS && Ti.Platform.osname == "iphone" && Ti.Platform.displayCaps.platformHeight == 568);

Alloy.Globals.deviceWidth  = Ti.Platform.displayCaps.platformWidth;
Alloy.Globals.deviceHeight = Ti.Platform.displayCaps.platformHeight;

if(Ti.Platform.osname === 'android'){
	Alloy.Globals.deviceWidth = Alloy.Globals.deviceWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	Alloy.Globals.deviceHeight = Alloy.Globals.deviceHeight / Ti.Platform.displayCaps.logicalDensityFactor;
}

Alloy.Globals.smallDevice = Alloy.Globals.deviceHeight <= 500;
Alloy.Globals.bigDevice = Alloy.Globals.deviceHeight >= 650;

Ti.API.info('------ DisplayCaps -------');
Ti.API.info("smallDevice:", Alloy.Globals.smallDevice);
Ti.API.info("bigDevice:", Alloy.Globals.bigDevice);
Ti.API.info(Alloy.Globals.deviceWidth + " x " + Alloy.Globals.deviceHeight);

Ti.API.info('verTour Bool Alloy.js: ' +Ti.App.Properties.getBool('verTour'));
if (Ti.App.Properties.getBool('verTour') == null){
	Ti.App.Properties.setBool('verTour',true);
}

Alloy.Globals.isLogged = false;