var args = arguments[0] || {};
var navigation = Alloy.Globals.navigation;
var icomoonlib = require('icomoonlib');
var screenWidth = Alloy.Globals.deviceWidth;
var screenHeight = Alloy.Globals.deviceHeight;
var fb = Alloy.Globals.fb;
fb.appid = Ti.App.Properties.getString('ti.facebook.appid');
fb.forceDialogAuth=false;

var backIcon = icomoonlib.getIconAsLabel("Aware-Icons","backIcon",screenHeight * 0.031,{color:"white",left:'20%'});
$.btn_back.add(backIcon);

$.alertDialog.style = (OS_IOS) ? Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT : '';


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
	Alloy.Globals.PushClient.register();
	if ( fb.loggedIn == true){
		fb.logout();
	}else{
		fb.addEventListener('login',facebookLoginEvent);
		Alloy.Globals.loading.show('Conectando con Facebook');
  		fb.authorize();
	}
}

function facebookLogin (token) {
	Alloy.Globals.ws.loginFb(token,function(status, obj){
		if (status){
			var lastname;
			if (obj.user.lastname) {
				Ti.API.info('si hay apellido.!');
				//lastname = obj.user.lastname;
				Ti.App.Properties.setString('lastname',obj.user.lastname);
			}
			else{
				Ti.App.Properties.setString('lastname','');
			}
			//var username = obj.user.name + ' ' + lastname;
			Ti.App.Properties.setString('name',obj.user.name);
		    Ti.App.Properties.setString('profileImg',obj.user.image);
			Ti.App.Properties.setString('email',obj.user.username);
			//Ti.App.Properties.setString('userName',username);
			Ti.App.Properties.setString('sessid',obj.sessid);
			Alloy.Globals.loading.hide();
			Alloy.Globals.navigator.openWindow('menu',true,[],'forward');
			//navigation.open('menu');
		}else{
			var dialog = Ti.UI.createAlertDialog({title:'',buttonNames:['Aceptar']});
			Alloy.Globals.loading.hide();
			dialog.message = obj;
			dialog.show();
		}
	});
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
				//var username = obj.user.name + ' ' + obj.user.lastname;
				Ti.App.Properties.setString('name',obj.user.name);
				Ti.App.Properties.setString('lastname',obj.user.lastname);
				Ti.App.Properties.setString('email',obj.user.username);
				//Ti.App.Properties.setString('userName',username);
				Ti.App.Properties.setString('userId',obj.user.id);
				Ti.App.Properties.setString('sessid',obj.sessid);
				Ti.App.Properties.setString('profileImg', obj.user.image);
				
				Alloy.Globals.PushClient.register();
					
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

function olvideMiContrasena (e) {
	$.alertDialog.show();
	
}

$.alertDialog.addEventListener('click', function(e){
	var email;
	email = (OS_IOS) ? e.text : $.txt_ingresaemail.getValue();
	Ti.API.info('Respuesta: ' + JSON.stringify(e));
	if (e.index === 1){
		Ti.API.info('The cancel button was clicked');
		(OS_IOS) ? '' : $.txt_ingresaemail.value = '';
    }else{
    	Alloy.Globals.loading.show('Cargando...');
    	Alloy.Globals.ws.restorePassword(email, function(status, obj){
			if(status){
				Ti.API.info('Operacion: ' + obj.operacion);
				(OS_IOS) ? '' : $.txt_ingresaemail.value = '';
				var dialog = Ti.UI.createAlertDialog({
					buttonNames:['OK'],
					title:''
				});
				if (obj.operacion == 'not_sent') {
					Alloy.Globals.loading.hide();
					dialog.message = 'Correo no registrado';
				}else{
					Alloy.Globals.loading.hide();
					dialog.message = 'Hemos enviado una nueva contraseña a tu correo';
				}
				
				dialog.show();
			}else{
				dialog.message = obj;
				dialog.show();
			}
		});
    }
	
});



function facebookLoginEvent (e) {
	fb.removeEventListener('login',facebookLoginEvent);
  // You *will* get this event if loggedIn == false below
    // Make sure to handle all possible cases of this event
    var dialog = Ti.UI.createAlertDialog({title:'',buttonNames:['Aceptar']});
    if (e.success) {
    	var token = fb.getAccessToken();
    	Ti.API.info('Token: ' + token);
    	facebookLogin(token);
    }
    else if (e.cancelled) {
        // user cancelled 
        Ti.API.info('cancelled');
        Alloy.Globals.loading.hide();
    }
    else {
        Ti.API.info('cancelado por usuario: '+e.error);
        Alloy.Globals.loading.hide();         
    }
}

fb.addEventListener('logout', function(e) {
    Ti.API.info('logged out');
    Ti.API.info('Logged In: ' + fb.loggedIn);
    //Alloy.Globals.navigator.openLogin();
});

$.txt_email.addEventListener('return',function(){
	Ti.API.info('Entro Return en Mail ');
	$.txt_contrasena.focus();
});
$.txt_contrasena.addEventListener('return',function(){
	Ti.API.info('Entro Return en Contraseña');
	acceder();
});


this.close = function(){
	$.destroy();
};