var args = arguments[0] || {};
var navigation = Alloy.Globals.navigation;
var icomoonlib = require('icomoonlib');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var fb = require('facebook');
fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
fb.forceDialogAuth=false;

var backIcon = icomoonlib.getIconAsLabel("Aware-Icons","backIcon",screenHeight * 0.031,{color:"white",left:'20%'});
$.btn_back.add(backIcon);

if (args.email) {
	$.txt_email.setValue(args.email);
}


function back_down (e) {
  e.source.opacity = 0.5;
}
function back_up (e) {
	e.source.opacity = 1;
  	Alloy.Globals.navigator.goBack();
  	//navigation.back();
}

function acceder_fb (e) {
	Alloy.Globals.loading.show('Conectando con Facebook');
  	fb.authorize();
}
function acceder (e) {
	
	var email = $.txt_email.getValue();
	var password = $.txt_contrasena.getValue();
	var dialog = Ti.UI.createAlertDialog({title:'',buttonNames:['Aceptar']});

	if (email == '' || password == '') {
		dialog.message = "Los campos de usuario y contraseña no pueden estar vacios";
		dialog.show();
	}else{
		//Alloy.Globals.loading.show('Conectando...');
		Alloy.Globals.ws.login(email, password, function(status, obj){
			//Alloy.Globals.loading.hide();
			if(status){
				Ti.API.info('Status: ' + obj.sessid);
				var username = obj.user.name + ' ' + obj.user.lastname;
				Ti.App.Properties.setString('email',obj.user.username);
				Ti.App.Properties.setString('userName',username);
				Ti.App.Properties.setString('userId',obj.user.id);
				Ti.App.Properties.setString('sessid',obj.sessid);
				Ti.App.Properties.setString('profileImg', obj.user.image);
				
				var PushClient = require('PushClientComponent');
					PushClient.register();
					
				Alloy.Globals.navigator.openWindow('menu',true,[],'forward');	
				// navigation.open('menu');
				// navigation.clearHistory();
			}else{
				dialog.message = obj;
				dialog.show();
			}
		});
	}
	
}

function goToRegister (e) {
	Alloy.Globals.navigator.openWindow('registro',false,[],'forward');
  	//navigation.open('registro');

}

fb.addEventListener('login',function(e) {
    // You *will* get this event if loggedIn == false below
    // Make sure to handle all possible cases of this event
    
    if (e.success) {
    
    	var results =  (OS_IOS) ? e.data : JSON.parse(e.data);
    	var token = fb.getAccessToken();
    	
    	Alloy.Globals.ws.loginFb(token,function(status, obj){
    		if (status){
		        Ti.App.Properties.setString('profileImg',obj.user.image);
				Ti.App.Properties.setString('email',obj.user.username);
				Ti.App.Properties.setString('userName',obj.user.name);
				Ti.App.Properties.setString('sessid',obj.sessid);
				Alloy.Globals.loading.hide();
				Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
				//navigation.open('menu');
    		}else{
				dialog.message = obj;
				dialog.show();
			}
    	});
    	
    }
    else if (e.cancelled) {
        // user cancelled 
        Ti.API.info('cancelled');
    }
    else {
        Ti.API.info('cancelado por usuario: '+e.error);         
    }
    
});

fb.addEventListener('logout', function(e) {
    Ti.API.info('logged out');
    Ti.API.info('Logged In: ' + fb.loggedIn);
    //Alloy.Globals.navigator.openLogin();
});


this.close = function(){
	$.destroy();
};