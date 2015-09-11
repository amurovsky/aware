Alloy.Globals.loading = Alloy.createWidget('com.caffeinalab.titanium.loader', {cancelable: false, useImages: false});
Alloy.Globals.PushClient = require('PushClientComponent');
var NavigatorComponent = require("NavigatorComponent");
Alloy.Globals.ws = require('WS');
Alloy.Globals.fb = require('facebook');
var fb = Alloy.Globals.fb;
Alloy.Globals.navigator         = new NavigatorComponent();
Alloy.Globals.currentWindow     = $.index;
Alloy.Globals.currentController = null;
var osname = Ti.Platform.osname;

Alloy.Globals.notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', {
	/* options */
	message: '', // the message to display.
    duration: 600000, // time after go away. Valid for iOS7+ and Android
    icon: '/appicon.png', // icon to display on the left
    style: 'info', // 'info', 'success', 'error', 'warn',  notification background blue, green, red or amber.
    elasticity: 0.5, // iOS7+ only
    pushForce: 30, // iOS7+ only
    usePhysicsEngine: true, // disable if you don't want on iOS7+
    animationDuration: 200, // animation sliding duration
});
var init = function(){
	Ti.UI.iPhone.appBadge = 0;
	Ti.API.info('verTour Bool: ' +Ti.App.Properties.getBool('verTour'));
	if(Ti.App.Properties.getBool('verTour')){
		Alloy.Globals.navigator.openWindow('tutorial',true,[],'forward');
	}else{
		if (Ti.App.Properties.getString('name')) {
			Ti.API.info('Estas Logeado.!');
			Alloy.Globals.PushClient.register();
			Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
		}else{
			Alloy.Globals.navigator.openLogin();
		}
	}

	$.index.addEventListener('android:back', function(e) {
		if(Alloy.Globals.currentController.android_Back != null){
			Alloy.Globals.currentController.android_Back(e);
			if(e.cancelBubble === true){
				return;
			}
		}
		
    	Alloy.Globals.navigator.goBack();
	});
	
	$.index.open();

	
};

init();
