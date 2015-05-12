var NavigatorComponent = require("NavigatorComponent");
var fb = require('facebook');
//Alloy.Globals.ws                = require('WS');
Alloy.Globals.panelLoading      = require('PanelLoading');
//Alloy.Globals.session           = require('Session');
Alloy.Globals.navigator         = new NavigatorComponent();
Alloy.Globals.currentWindow     = $.index;
Alloy.Globals.currentController = null;
var osname = Ti.Platform.osname;
var init = function(){
	//if (osname != 'android') {
		if(Ti.App.Properties.getObject('userName') == null){
			Alloy.Globals.navigator.openLogin();
		}else{
			Alloy.Globals.navigator.openWindow('menu');
		};
	// }else{
		// Alloy.Globals.navigator.openWindow('menu');
	// };
	
	//Alloy.Globals.navigator.openWindow('menu');
	
	$.index.open();
	
};

if (osname == 'android') {
		$.index.fbProxy = fb.createActivityWorker({lifecycleContainer: $.index});
	};

init();
