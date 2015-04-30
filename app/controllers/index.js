var NavigatorComponent = require("NavigatorComponent");

//Alloy.Globals.ws                = require('WS');
Alloy.Globals.panelLoading      = require('PanelLoading');
//Alloy.Globals.session           = require('Session');
Alloy.Globals.navigator         = new NavigatorComponent();
Alloy.Globals.currentWindow     = $.index;
Alloy.Globals.currentController = null;

var init = function(){
	
	if(Ti.App.Properties.getObject('userName') == null){
		Alloy.Globals.navigator.openLogin();
	}else{
		Alloy.Globals.navigator.openWindow('menu');
	}
	
	//Alloy.Globals.navigator.openWindow('menu');
	
	$.index.open();
	
};

init();
