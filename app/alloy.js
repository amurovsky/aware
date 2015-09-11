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
Alloy.Globals.comeFromMenu = false;