var args = arguments[0] || {};
var navigation = Alloy.Globals.navigation;
var icomoonlib = require('icomoonlib');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;

if (args.email) {
	$.txt_email.setValue(args.email);
}


function back_down (e) {
  e.source.opacity = 0.5;
}
function back_up (e) {
	e.source.opacity = 1;
  //Alloy.Globals.navigator.goBack();
  	navigation.back();
}

function acceder_fb (e) {
	
}
function acceder (e) {
	
	var email = $.txt_email.getValue();
	var password = $.txt_contrasena.getValue();
	var dialog = Ti.UI.createAlertDialog({title:'',buttonNames:['Aceptar']});

	if (email == '' || password == '') {
		dialog.message = "Los campos de usuario y contraseña no pueden estar vacios";
		dialog.show();
	}else{
		Alloy.Globals.loading.show('Conectando...');
		Alloy.Globals.ws.login(email, password, function(status, obj){
			Alloy.Globals.loading.hide();
			if(status){
				Ti.API.info('Status: ' + obj.sessid);
				var username = obj.user.name + ' ' + obj.user.lastname;
				Ti.App.Properties.setString('email',obj.user.username);
				Ti.App.Properties.setString('userName',username);
				Ti.App.Properties.setString('userId',obj.user.id);
				Ti.App.Properties.setString('sessid',obj.sessid);
				
				var PushClient = require('PushClientComponent');
					PushClient.register();
					
				navigation.open('menu');
				navigation.clearHistory();
			}else{
				dialog.message = obj;
				dialog.show();
			}
		});
	}
	
}

function goToRegister (e) {
	
  	navigation.open('registro');

}
var backIcon = icomoonlib.getIconAsLabel("Aware-Icons","backIcon",screenHeight * 0.031,{color:"white",left:'20%'});
$.btn_back.add(backIcon);

// this.close = function(){
	// $.destroy();
// };